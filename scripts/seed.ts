import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import connectToDatabase from "../lib/db";
import Admin from "../lib/models/Admin";
import BlogPost from "../lib/models/BlogPost";
import GalleryImage from "../lib/models/GalleryImage";
import { uploadToCloudinary } from "../lib/cloudinary";

const INITIAL_BLOG_POSTS = [
  {
    slug: "how-to-choose-the-right-safety-net-for-your-balcony",
    title: "How to Choose the Right Safety Net for Your Balcony",
    content: `Choosing the right safety net for your balcony can feel overwhelming with the many options available in the market. In this guide, we break down everything you need to know to make an informed decision.

## Material: HDPE vs. Nylon vs. Polypropylene
The three most common materials for balcony safety nets are HDPE (high-density polyethylene), nylon (polyamide), and polypropylene (PP). HDPE offers the best balance of UV resistance, strength, and cost — making it our top recommendation for residential balconies in Coimbatore's sunny climate.

## Mesh Size: Matching to Your Purpose
For child safety nets: 25 mm mesh or smaller — no gaps for small hands or feet. For pet nets (cats): 30 mm mesh — no escape gaps for most cat breeds. For pigeon/bird exclusion: 20 mm mesh. For general fall protection (adults): 50–100 mm mesh.

## UV Stabilisation: Essential for Coimbatore's Climate
Coimbatore receives intense UV radiation year-round. An un-stabilised net can become brittle and fail within 1–2 years. Always ask for UV-stabilised nets with a minimum 3-year warranty.

## Hardware: SS 304 vs. Galvanised
SS 304 stainless steel is our standard recommendation — it resists corrosion for decades. Galvanised steel is acceptable for inland areas. Mild plain steel hooks should be avoided as they rust rapidly.

Ready to choose the right safety net? Call Kovai Safety Nets at 7708414857 for a free consultation and site measurement.`,
    status: "published",
  },
  {
    slug: "invisible-grills-vs-safety-nets-which-is-better",
    title: "Invisible Grills vs Safety Nets — Which Is Better for Coimbatore Apartments?",
    content: `Two of our most popular services — invisible grills and safety nets — are often compared by customers. Here's a detailed breakdown to help you decide which is right for your home.

## What Are Invisible Grills?
Invisible grills use tensioned stainless steel cables (3 mm, 7×7 strand) run vertically between aluminium top and bottom tracks. The cables are spaced 75–100 mm apart, providing a nearly invisible barrier that meets child safety standards.

## What Are Safety Nets?
Safety nets use nylon or HDPE mesh stretched across the balcony opening using a wire rope or stainless steel frame. They are softer, can be removed and reinstalled, and are available in a range of mesh sizes for different applications.

## Cost Comparison
Safety nets are generally more affordable than invisible grills for the same balcony area. The cost difference can range from 30–60% depending on the specific configuration. However, invisible grills have a much longer service life (20+ years vs. 5–10 years for nets).

## Our Recommendation
For a premium, permanent solution with a view: Choose invisible grills. For a budget-friendly, removable, or pet-specific solution: Choose safety nets.

Contact Kovai Safety Nets at 7708414857 for a free consultation and measurement.`,
    status: "published",
  },
  {
    slug: "monkey-menace-in-coimbatore-how-to-protect-your-home",
    title: "Monkey Menace in Coimbatore — How to Protect Your Home Effectively",
    content: `Hillside areas like Kovaipudur and Vadavalli face increasing monkey intrusion. Here's everything you need to know about humane, effective monkey-proofing solutions.

## Heavy Duty Anti-Monkey Nets
Monkeys are strong and intelligent animals that can easily tear lightweight bird netting. Anti-monkey nets use thick 2.5mm HDPE braided twines with high breaking strength that monkeys cannot rip or chew through.

## Installation Techniques
Anchoring is critical for monkey safety nets. Anchor points must be fixed every 6 inches with SS expander bolts to prevent monkeys from squeezing beneath or pulling the net away from walls.

Call Kovai Safety Nets at 7708414857 to protect your balcony and home from monkey menace today.`,
    status: "published",
  },
];

async function seed() {
  console.log("🚀 Starting database seeding & Cloudinary image import...");

  await connectToDatabase();
  console.log("✅ Connected to MongoDB Atlas.");

  // 1. Seed Admin User
  const existingAdmin = await Admin.findOne({ email: "admin@kovaisafetynets.com" });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@Kovai2026", 10);
    await Admin.create({
      email: "admin@kovaisafetynets.com",
      passwordHash,
      createdAt: new Date(),
    });
    console.log("✅ Seeded Admin User: admin@kovaisafetynets.com / Admin@Kovai2026");
  } else {
    console.log("ℹ️ Admin user admin@kovaisafetynets.com already exists.");
  }

  // 2. Seed Blog Posts
  for (const postData of INITIAL_BLOG_POSTS) {
    const existingPost = await BlogPost.findOne({ slug: postData.slug });
    if (!existingPost) {
      await BlogPost.create({
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        status: postData.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Seeded Blog Post: "${postData.title}"`);
    } else {
      console.log(`ℹ️ Blog Post "${postData.slug}" already exists.`);
    }
  }

  // 3. Import & Seed Local Service Images to Cloudinary
  const servicesDir = path.join(process.cwd(), "public", "images", "services");
  if (fs.existsSync(servicesDir)) {
    const files = fs.readdirSync(servicesDir);
    console.log(`📷 Found ${files.length} service images to import into Cloudinary...`);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

      const captionName = file
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      // Check if image already exists in DB by caption or file name search
      const existingImg = await GalleryImage.findOne({ caption: captionName });
      if (existingImg) {
        console.log(`ℹ️ Gallery Image "${captionName}" already imported in DB.`);
        continue;
      }

      const filePath = path.join(servicesDir, file);
      const fileBuffer = fs.readFileSync(filePath);

      try {
        console.log(`Uploading ${file} to Cloudinary...`);
        const result = await uploadToCloudinary(fileBuffer, "kovai-safety-nets/gallery");

        await GalleryImage.create({
          imageUrl: result.secure_url,
          publicId: result.public_id,
          caption: captionName,
          uploadedAt: new Date(),
        });
        console.log(`✅ Imported & Saved to DB: ${captionName} -> ${result.secure_url}`);
      } catch (err: any) {
        console.error(`❌ Failed to upload ${file} to Cloudinary:`, err?.message || err);
      }
    }
  }

  console.log("🎉 Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed script error:", err);
  process.exit(1);
});
