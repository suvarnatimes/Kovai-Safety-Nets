import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import GalleryImage from "@/lib/models/GalleryImage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const images = await GalleryImage.find({}).sort({ uploadedAt: -1 });
    return NextResponse.json(images);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrl, publicId, caption } = await req.json();

    if (!imageUrl || !publicId) {
      return NextResponse.json(
        { error: "Image URL and Public ID are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newImage = await GalleryImage.create({
      imageUrl,
      publicId,
      caption: caption || "",
      uploadedAt: new Date(),
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
