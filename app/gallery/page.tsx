import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Safety Nets Gallery – Kovai Safety Nets Coimbatore",
  description:
    "Browse our gallery of safety net installations in Coimbatore — balcony nets, invisible grills, pet nets, staircase nets, and more.",
  alternates: { canonical: `${SITE_URL}/gallery/` },
};

export default function GalleryPage() {
  // Build a flat gallery items list from all services
  const galleryItems = SERVICES.flatMap((service) =>
    [1, 2, 3].map((n) => ({
      id: `${service.slug}-${n}`,
      src: service.image,
      alt: `${service.title} installation in Coimbatore — example ${n}`,
      serviceTitle: service.title,
      serviceSlug: service.slug,
      icon: service.icon,
    }))
  );

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Gallery", href: "/gallery/" },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4">
            Our Work Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Browse real installations by Kovai Safety Nets across Coimbatore homes, apartments, and businesses.
          </p>
        </div>
      </section>

      {/* Filter Buttons (progressive enhancement — works without JS as static list) */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-500 mr-2">Filter by:</span>
            <Link
              href="/gallery/"
              className="badge-orange text-sm px-4 py-2"
            >
              All Services
            </Link>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="badge badge-blue text-sm px-4 py-2 hover:bg-blue-200 transition-colors"
              >
                {service.icon} {service.shortTitle}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Click any service name to see its dedicated page with installation details and more photos.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section
        className="py-12 bg-white"
        aria-label="Gallery of safety net installations"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-card group relative"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <p className="text-white text-xs font-semibold">
                      {item.icon} {item.serviceTitle}
                    </p>
                    <Link
                      href={`/services/${item.serviceSlug}/`}
                      className="text-orange-400 text-xs hover:underline"
                    >
                      View Service →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-brand-light text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-brand-navy mb-3">
            Want a Similar Installation?
          </h2>
          <p className="text-gray-600 mb-6">
            Call us for a free site visit and quote across Coimbatore.
          </p>
          <div className="flex gap-4 justify-center">
            <a href={`tel:7708414857`} className="btn-primary">
              📞 Call Now
            </a>
            <a
              href={`https://wa.me/917708414857?text=${encodeURIComponent("Hi! I saw your gallery and I'm interested in safety net installation.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
