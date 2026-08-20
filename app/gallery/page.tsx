import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE_URL, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import connectToDatabase from "@/lib/db";
import GalleryImage from "@/lib/models/GalleryImage";
import cloudinary, { optimizeCloudinaryUrl } from "@/lib/cloudinary";

import GalleryClient from "@/components/ui/GalleryClient";

export const revalidate = 60; // Cache page for 60 seconds (ISR with instant revalidation on update)

export const metadata: Metadata = {
  title: "Safety Nets Gallery – Kovai Safety Nets Coimbatore",
  description:
    "Browse our gallery of safety net installations in Coimbatore — balcony nets, invisible grills, pet nets, staircase nets, and more.",
  alternates: { canonical: `${SITE_URL}/gallery/` },
};

export default async function GalleryPage() {
  let galleryItems: { id: string; src: string; caption: string; category?: string }[] = [];

  // Method 1: Query MongoDB Atlas
  try {
    await connectToDatabase();
    const dbImages = await GalleryImage.find({}, "imageUrl caption uploadedAt")
      .sort({ uploadedAt: -1 })
      .limit(100)
      .lean();

    if (dbImages && dbImages.length > 0) {
      galleryItems = dbImages.map((img: any) => ({
        id: img._id.toString(),
        src: img.imageUrl,
        caption: img.caption || "Safety Net Installation",
      }));
    }
  } catch (err) {
    console.warn("Gallery MongoDB fetch error/fallback:", err);
  }

  // Method 2: If MongoDB Atlas has no records or fails to connect, query Cloudinary API directly
  if (galleryItems.length === 0) {
    try {
      const cldRes = await cloudinary.api.resources({ max_results: 60 });
      if (cldRes && cldRes.resources && cldRes.resources.length > 0) {
        galleryItems = cldRes.resources.map((item: any) => {
          const basename = item.public_id.split("/").pop() || item.public_id;
          const cleanCaption = basename
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase());

          return {
            id: item.public_id,
            src: item.secure_url,
            caption: cleanCaption || "Safety Net Installation",
          };
        });
      }
    } catch (cldErr) {
      console.warn("Direct Cloudinary API fetch error:", cldErr);
    }
  }

  // Method 3: Fallback to initial service images if Cloudinary & DB are both empty
  if (galleryItems.length === 0) {
    galleryItems = SERVICES.flatMap((service) =>
      [1, 2, 3].map((n) => ({
        id: `${service.slug}-${n}`,
        src: service.image,
        caption: `${service.title} installation in Coimbatore (Example ${n})`,
        category: service.slug,
      }))
    );
  }

  const serviceCategories = SERVICES.map((s) => ({
    slug: s.slug,
    shortTitle: s.shortTitle,
    icon: s.icon,
  }));

  return (
    <>
      {/* Hero (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Gallery", href: "/gallery/" },
            ]}
          />
          <h1 className="headline-display text-white mt-6 mb-4">
            Our Work Gallery
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Browse real installations by Kovai Safety Nets across Coimbatore homes, apartments, and businesses.
          </p>
        </div>
      </section>

      {/* Interactive Gallery with Instant Filters, Batch Loading, and Lightbox */}
      <GalleryClient items={galleryItems} services={serviceCategories} />

      {/* CTA (DARK) */}
      <section data-theme="dark" className="section-dark py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="headline-section text-white mb-3">
            Want a Similar Installation?
          </h2>
          <p className="text-slate-300 mb-6 text-sm sm:text-base">
            Call us for a free site visit and quote across Coimbatore.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={PHONE_URL} className="btn-primary-dark text-xs sm:text-sm">
              📞 Call Now
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-dark text-xs sm:text-sm"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
