import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

// ─── SSG: generate all 11 service pages at build time ───
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata per service ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
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
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // JSON-LD schemas for this service page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.address.addressLocality,
        addressRegion: BUSINESS.address.addressRegion,
        addressCountry: BUSINESS.address.addressCountry,
      },
    },
    areaServed: {
      "@type": "City",
      name: "Coimbatore",
    },
    url: `${SITE_URL}/services/${slug}/`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Related services (exclude current)
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

      {/* Hero Banner */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/#services-heading" },
              { label: service.title, href: `/services/${slug}/` },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-10 items-center mt-8">
            <div>
              <div className="text-5xl mb-4">{service.icon}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                {service.title}
                <span className="block text-orange-400 text-2xl font-semibold mt-1">
                  in Coimbatore
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-6">{service.tagline}</p>
              <p className="text-blue-200 leading-relaxed mb-8">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_URL} className="btn-primary btn-pulse" aria-label={`Call for ${service.title} quote`}>
                  📞 Call {BUSINESS.phone}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  aria-label={`WhatsApp about ${service.title}`}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hidden md:block">
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

      {/* About This Service */}
      <section className="py-16 bg-white" aria-labelledby="about-service-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-service-heading" className="text-3xl font-bold text-brand-navy mb-6">
            About Our {service.title} Service
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{service.longDescription}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 gradient-section" aria-labelledby="benefits-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-heading" className="section-heading text-center mb-10">
            Why Choose Our {service.shortTitle}?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-card"
              >
                <span className="shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 bg-white" aria-labelledby="materials-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="materials-heading" className="section-heading mb-8">
            Materials &amp; Specifications
          </h2>
          <div className="space-y-4">
            {service.materials.map((mat, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-brand-light rounded-2xl"
              >
                <div className="shrink-0 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy">{mat.name}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">{mat.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 gradient-section" aria-labelledby="installation-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="installation-heading" className="section-heading mb-8 text-center">
            Our Installation Process
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 stagger">
            {service.installationSteps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card relative">
                <span className="absolute top-4 right-4 text-5xl font-black text-gray-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-brand-navy text-lg mb-2">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-white" aria-labelledby="gallery-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="gallery-heading" className="section-heading mb-8 text-center">
            {service.title} — Photo Gallery
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden shadow-card aspect-video">
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
          <div className="text-center mt-6">
            <Link href="/gallery/" className="btn-secondary inline-flex">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 gradient-section" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="section-heading text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl shadow-card overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-brand-navy list-none hover:bg-orange-50 transition-colors">
                  <span>{faq.question}</span>
                  <span className="shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-50">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Local CTA */}
      <section className="py-16 bg-brand-navy text-white" aria-label="Get a quote for this service">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Need {service.title} in Coimbatore?
          </h2>
          <p className="text-blue-300 mb-8">
            Call us or WhatsApp for a same-day free site visit and quote.
            Serving all areas of Coimbatore and surrounding towns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href={PHONE_URL} className="btn-primary text-lg py-4 px-8 btn-pulse">
              📞 Call {BUSINESS.phone}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg py-4 px-8"
            >
              💬 WhatsApp for Quick Quote
            </a>
          </div>
        </div>

        {/* Lead form embedded in CTA */}
        <div className="max-w-xl mx-auto px-4">
          <LeadForm
            heading={`Get a Quote for ${service.title}`}
            subheading="We'll call you back within 30 minutes."
            formId={`service-${slug}-form`}
            serviceOptions={[service.title, "Other / Not sure"]}
          />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white" aria-labelledby="related-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="related-heading" className="section-heading mb-8 text-center">
            Other Services We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {relatedServices.map((rs) => (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}/`}
                className="card p-5 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {rs.icon}
                </div>
                <h3 className="font-bold text-brand-navy text-sm group-hover:text-orange-500 transition-colors">
                  {rs.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
