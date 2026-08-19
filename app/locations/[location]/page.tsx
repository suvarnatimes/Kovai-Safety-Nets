import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocationBySlug, getAllLocationSlugs } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

// ─── SSG: generate all 10 location pages at build time ───
export async function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocationBySlug(location);
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `${SITE_URL}/locations/${location}/` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `${SITE_URL}/locations/${location}/`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getLocationBySlug(location);
  if (!loc) notFound();

  // LocalBusiness with areaServed JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: BUSINESS.name,
    description: `Professional safety net installation in ${loc.name}, Coimbatore.`,
    telephone: BUSINESS.phoneE164,
    url: `${SITE_URL}/locations/${location}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: loc.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/#areas-heading" },
              { label: loc.name, href: `/locations/${location}/` },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4">
            Safety Net Installation in{" "}
            <span className="text-orange-400">{loc.name}</span>
            <span className="block text-2xl font-semibold mt-2 text-blue-200">
              {loc.district}, Tamil Nadu
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Professional safety net services in {loc.name} — balcony nets,
            invisible grills, pet &amp; child safety nets, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={PHONE_URL} className="btn-primary btn-pulse">
              📞 Call {BUSINESS.phone}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* About this area */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">
            Kovai Safety Nets in {loc.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {loc.description}
          </p>
          <div className="bg-brand-light rounded-2xl p-5">
            <p className="font-semibold text-brand-navy mb-2">Key Landmarks:</p>
            <div className="flex flex-wrap gap-2">
              {loc.landmarks.map((lm) => (
                <span key={lm} className="badge-orange text-sm">
                  📍 {lm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services available in this location */}
      <section className="py-16 gradient-section" aria-labelledby="loc-services-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="loc-services-heading" className="section-heading text-center mb-4">
            Our Services in {loc.name}
          </h2>
          <p className="text-center text-gray-600 mb-10">
            We provide all our safety net services in {loc.name}, {loc.district}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="card group p-5 flex flex-col gap-3"
                aria-label={`${service.title} in ${loc.name}`}
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-brand-navy group-hover:text-orange-500 transition-colors leading-tight">
                  {service.title} in {loc.name}
                </h3>
                <p className="text-xs text-gray-500 flex-1">{service.tagline}</p>
                <span className="text-orange-500 text-xs font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for this location */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">
            Why Residents of {loc.name} Choose Kovai Safety Nets
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "⚡",
                title: "Same-Day Site Visit",
                desc: `We can visit your property in ${loc.name} the same day you call.`,
              },
              {
                icon: "🗺️",
                title: "Local Knowledge",
                desc: `We know ${loc.name} well and understand the specific requirements of local buildings.`,
              },
              {
                icon: "💰",
                title: "Free Quote",
                desc: "Detailed written quote with no hidden charges and no advance payment required.",
              },
              {
                icon: "🛡️",
                title: "Guaranteed Work",
                desc: "1-year installation warranty. We stand behind every job we complete in " + loc.name + ".",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-brand-light rounded-2xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form + CTA */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-xl mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Get a Free Quote in {loc.name}
          </h2>
          <p className="text-blue-300">
            Same-day site visit available. Call {BUSINESS.phone} or fill the form below.
          </p>
        </div>
        <div className="max-w-xl mx-auto px-4">
          <LeadForm
            heading={`Safety Nets in ${loc.name}`}
            subheading={`We'll arrange a free site visit in ${loc.name} within 24 hours.`}
            formId={`location-${location}-form`}
          />
        </div>
      </section>

      {/* Other locations */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-6 text-center">
            Also Serving Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {LOCATIONS.filter((l) => l.slug !== location).map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}/`}
                className="badge-blue text-sm px-4 py-2 hover:bg-blue-200 transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
