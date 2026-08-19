import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = LOCATIONS.find((l) => l.slug === location);
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: [loc.name, `safety nets ${loc.name}`, `balcony safety nets ${loc.name}`, "Kovai Safety Nets"],
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
  const loc = LOCATIONS.find((l) => l.slug === location);

  if (!loc) {
    return (
      <div className="py-32 text-center text-white" data-theme="dark">
        <h1 className="text-3xl font-bold">Location Not Found</h1>
        <Link href="/" className="mt-4 inline-block btn-primary-dark">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/#locations" },
              { label: loc.name, href: `/locations/${location}/` },
            ]}
          />
          <h1 className="headline-display text-white mt-6 mb-4">
            Safety Nets in {loc.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
            Professional safety net services in {loc.name} — balcony nets,
            invisible grills, pet &amp; child safety nets, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={PHONE_URL} className="btn-primary-dark">
              📞 Call {BUSINESS.phone}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-dark"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* About this area (LIGHT) */}
      <section data-theme="light" className="section-light py-16" aria-labelledby="about-loc-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-loc-heading" className="headline-section mb-6" style={{ color: "#14161a" }}>
            Kovai Safety Nets in {loc.name}
          </h2>
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-6">
            {loc.description}
          </p>
          <div className="glass-card-light rounded-2xl p-6">
            <p className="font-bold text-sm mb-3" style={{ color: "#14161a" }}>Key Landmarks:</p>
            <div className="flex flex-wrap gap-2">
              {loc.landmarks.map((lm) => (
                <span key={lm} className="pill-badge-light text-xs" style={{ color: "var(--accent)" }}>
                  📍 {lm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services available in this location (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="loc-services-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="loc-services-heading" className="headline-section text-center mb-4" style={{ color: "#14161a" }}>
            Our Services in {loc.name}
          </h2>
          <p className="text-center text-slate-600 mb-10 text-sm sm:text-base">
            We provide all our safety net services in {loc.name}, {loc.district}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="glass-card-light group p-6 flex flex-col gap-3 rounded-[22px]"
                aria-label={`${service.title} in ${loc.name}`}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold group-hover:text-orange-500 transition-colors leading-tight" style={{ color: "#14161a" }}>
                  {service.title} in {loc.name}
                </h3>
                <p className="text-xs text-slate-600 flex-1">{service.tagline}</p>
                <span className="text-orange-500 text-xs font-bold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for this location (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="headline-section mb-8" style={{ color: "#14161a" }}>
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
              <div key={item.title} className="glass-card-light flex gap-4 p-5 rounded-2xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#14161a" }}>{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form + CTA (DARK) */}
      <section data-theme="dark" className="section-dark py-20">
        <div className="max-w-xl mx-auto px-4 text-center mb-8">
          <h2 className="headline-section text-white mb-3">
            Get a Free Quote in {loc.name}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
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

      {/* Other locations (LIGHT) */}
      <section data-theme="light" className="section-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="headline-section mb-6 text-center" style={{ color: "#14161a" }}>
            Also Serving Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {LOCATIONS.filter((l) => l.slug !== location).map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}/`}
                className="pill-badge-light text-xs hover:border-slate-800 transition-colors"
              >
                📍 {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
