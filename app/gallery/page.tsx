import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE_URL, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import connectToDatabase from "@/lib/db";
import GalleryImage from "@/lib/models/GalleryImage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Safety Nets Gallery – Kovai Safety Nets Coimbatore",
  description:
    "Browse our gallery of safety net installations in Coimbatore — balcony nets, invisible grills, pet nets, staircase nets, and more.",
  alternates: { canonical: `${SITE_URL}/gallery/` },
};

export default async function GalleryPage() {
  await connectToDatabase();
  const dbImages = await GalleryImage.find({}).sort({ uploadedAt: -1 }).lean();

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

      {/* Filter Buttons (LIGHT) */}
      <section data-theme="light" className="section-light py-8 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase text-slate-500 mr-2 tracking-wider">Filter by:</span>
            <Link
              href="/gallery/"
              className="pill-badge-dark text-xs"
            >
              All Services
            </Link>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="pill-badge-light text-xs hover:border-slate-800 transition-colors"
              >
                {service.icon} {service.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid (LIGHT) - Dynamic Cloudinary Images from MongoDB */}
      <section data-theme="light" className="section-light py-16" aria-label="Gallery of safety net installations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {dbImages.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-base">
              No gallery images found. Upload photos via the Admin Panel.
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {dbImages.map((item: any) => (
                <div
                  key={item._id.toString()}
                  className="break-inside-avoid rounded-[22px] overflow-hidden shadow-md group relative border border-black/5 bg-slate-100"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || "Kovai Safety Nets installation photo in Coimbatore"}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-xs font-bold mb-1">
                        🛡️ {item.caption || "Safety Net Installation"}
                      </p>
                      <span className="text-orange-400 text-[11px] font-semibold">
                        Coimbatore, TN
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
