import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${slug}/`,
      images: [
        {
          url: `${SITE_URL}${service.image}`,
          width: 1200,
          height: 630,
          alt: `${service.title} in Coimbatore`,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="py-32 text-center text-white" data-theme="dark">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <Link href="/" className="mt-4 inline-block btn-primary-dark">
          Return Home
        </Link>
      </div>
    );
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: BUSINESS.name },
    areaServed: { "@type": "City", name: "Coimbatore" },
    url: `${SITE_URL}/services/${slug}/`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Banner (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/#services" },
              { label: service.title, href: `/services/${slug}/` },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-10 items-center mt-8">
            <div>
              <div className="text-4xl mb-3">{service.icon}</div>
              <h1 className="headline-display text-white mb-4">
                {service.title}
                <span className="block text-2xl font-semibold mt-1" style={{ color: "var(--accent)" }}>
                  in Coimbatore
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-6 font-semibold">{service.tagline}</p>
              <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_URL} className="btn-primary-dark" aria-label={`Call for ${service.title} quote`}>
                  📞 Call {BUSINESS.phone}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark"
                  aria-label={`WhatsApp about ${service.title}`}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
            <div className="rounded-[28px] overflow-hidden shadow-2xl hidden md:block border border-white/10">
              <Image
                src={service.image}
                alt={`${service.title} installed by Kovai Safety Nets in Coimbatore`}
                width={600}
                height={400}
                priority
                className="object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About This Service (LIGHT) */}
      <section data-theme="light" className="section-light py-16" aria-labelledby="about-service-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-service-heading" className="headline-section mb-6" style={{ color: "#14161a" }}>
            About Our {service.title} Service
          </h2>
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg">{service.longDescription}</p>
        </div>
      </section>

      {/* Benefits (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="benefits-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-heading" className="headline-section text-center mb-10" style={{ color: "#14161a" }}>
            Why Choose Our {service.shortTitle}?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="glass-card-light flex items-start gap-3 p-5 rounded-2xl"
              >
                <span className="shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  ✓
                </span>
                <span className="text-slate-800 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="materials-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="materials-heading" className="headline-section mb-8" style={{ color: "#14161a" }}>
            Materials &amp; Specifications
          </h2>
          <div className="space-y-4">
            {service.materials.map((mat, i) => (
              <div
                key={i}
                className="glass-card-light flex gap-4 p-5 rounded-2xl"
              >
                <div className="shrink-0 w-10 h-10 bg-[#ff8a3d] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#14161a" }}>{mat.name}</h3>
                  <p className="text-slate-600 text-sm">{mat.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="installation-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="installation-heading" className="headline-section mb-8 text-center" style={{ color: "#14161a" }}>
            Our Installation Process
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 stagger">
            {service.installationSteps.map((step, i) => (
              <div key={i} className="glass-card-light rounded-2xl p-6 relative">
                <span className="absolute top-4 right-4 text-4xl font-black text-black/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#14161a" }}>{step.step}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="gallery-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="gallery-heading" className="headline-section mb-8 text-center" style={{ color: "#14161a" }}>
            {service.title} — Gallery
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden shadow-md aspect-video border border-black/5">
                <Image
                  src={service.image}
                  alt={`${service.title} installation example ${n} — Kovai Safety Nets Coimbatore`}
                  width={400}
                  height={260}
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery/" className="btn-secondary-light inline-flex">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="headline-section text-center mb-8" style={{ color: "#14161a" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group glass-card-light rounded-2xl overflow-hidden p-2"
              >
                <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer font-bold list-none" style={{ color: "#14161a" }}>
                  <span>{faq.question}</span>
                  <span className="shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 text-slate-700 text-sm leading-relaxed border-t border-black/5 pt-3">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Form CTA (DARK) */}
      <section data-theme="dark" className="section-dark py-20" aria-labelledby="cta-form-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm
            heading={`Book Your ${service.title}`}
            subheading="Get a free site visit and instant quote across Coimbatore. No obligation."
            formId="service-detail-form"
          />
        </div>
      </section>

      {/* Related Services (LIGHT) */}
      <section data-theme="light" className="section-light py-16" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="related-heading" className="headline-section mb-8 text-center" style={{ color: "#14161a" }}>
            Other Safety Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((rel) => (
              <div key={rel.slug} className="glass-card-light p-6 rounded-[22px] flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{rel.icon}</div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#14161a" }}>{rel.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">{rel.description}</p>
                </div>
                <Link
                  href={`/services/${rel.slug}/`}
                  className="text-orange-500 text-xs font-bold hover:text-orange-600"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
