import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import connectToDatabase from "../lib/db";
import GalleryImage from "../lib/models/GalleryImage";
import cloudinary from "../lib/cloudinary";

async function syncCloudinaryToMongo() {
  console.log("🚀 Syncing all Cloudinary images into MongoDB Atlas...");

  await connectToDatabase();
  console.log("✅ Connected to MongoDB Atlas.");

  try {
    const res = await cloudinary.api.resources({ max_results: 500 });
    console.log(`📷 Found ${res.resources.length} total images in Cloudinary account.`);

    let addedCount = 0;

    for (const item of res.resources) {
      const publicId = item.public_id;
      const imageUrl = item.secure_url;

      // Format clean caption from public_id basename
      const basename = publicId.split("/").pop() || publicId;
      const caption = basename
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      // Check if already in MongoDB Atlas
      const existing = await GalleryImage.findOne({ publicId });
      if (!existing) {
        await GalleryImage.create({
          imageUrl,
          publicId,
          caption,
          uploadedAt: new Date(item.created_at || Date.now()),
        });
        console.log(`✅ Synced to DB: ${caption} -> ${imageUrl}`);
        addedCount++;
      }
    }

    console.log(`🎉 Sync completed! Added ${addedCount} new Cloudinary images to MongoDB Atlas.`);
  } catch (err: any) {
    console.error("❌ Cloudinary sync error:", err);
  }

  process.exit(0);
}

syncCloudinaryToMongo();
