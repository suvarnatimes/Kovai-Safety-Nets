import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import GalleryImage from "@/lib/models/GalleryImage";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const galleryItem = await GalleryImage.findById(id);

    if (!galleryItem) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Call Cloudinary destroy API FIRST
    if (galleryItem.publicId) {
      const cloudinarySuccess = await deleteFromCloudinary(galleryItem.publicId);
      if (!cloudinarySuccess) {
        return NextResponse.json(
          { error: "Failed to delete image from Cloudinary. Database document retained." },
          { status: 500 }
        );
      }
    }

    // Delete DB document ONLY IF Cloudinary deletion succeeded
    await GalleryImage.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
