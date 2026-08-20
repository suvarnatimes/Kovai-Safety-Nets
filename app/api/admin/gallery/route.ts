import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import GalleryImage from "@/lib/models/GalleryImage";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let images: any[] = [];
    try {
      await connectToDatabase();
      images = await GalleryImage.find({}).sort({ uploadedAt: -1 }).lean();
    } catch (dbErr) {
      console.warn("Gallery API DB fetch error:", dbErr);
    }

    // If MongoDB Atlas is empty or unreachable, fetch live resources directly from Cloudinary account
    if (!images || images.length === 0) {
      try {
        const cldRes = await cloudinary.api.resources({ max_results: 100 });
        if (cldRes && cldRes.resources) {
          images = cldRes.resources.map((item: any) => {
            const basename = item.public_id.split("/").pop() || item.public_id;
            const caption = basename
              .replace(/\.[^/.]+$/, "")
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase());

            return {
              _id: item.public_id,
              imageUrl: item.secure_url,
              publicId: item.public_id,
              caption,
              uploadedAt: item.created_at || new Date().toISOString(),
            };
          });
        }
      } catch (cldErr) {
        console.warn("Gallery API Cloudinary fetch error:", cldErr);
      }
    }

    return NextResponse.json(images || []);
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

    try {
      await connectToDatabase();
      const newImage = await GalleryImage.create({
        imageUrl,
        publicId,
        caption: caption || "",
        uploadedAt: new Date(),
      });
      try {
        revalidatePath("/gallery");
        revalidatePath("/");
      } catch (revErr) {
        console.warn("Revalidate error:", revErr);
      }
      return NextResponse.json(newImage, { status: 201 });
    } catch (dbErr) {
      try {
        revalidatePath("/gallery");
        revalidatePath("/");
      } catch (revErr) {
        console.warn("Revalidate error:", revErr);
      }
      // Fallback response if MongoDB save fails but Cloudinary upload succeeded
      return NextResponse.json(
        {
          _id: publicId,
          imageUrl,
          publicId,
          caption: caption || "",
          uploadedAt: new Date().toISOString(),
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
