import type { Metadata } from "next";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Contact Kovai Safety Nets – Coimbatore | 7708414857",
  description:
    "Contact Kovai Safety Nets in Coimbatore for safety net installation. Call 7708414857, WhatsApp, or fill the enquiry form. Free site visit in 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact/` },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Kovai Safety Nets",
    url: `${SITE_URL}/contact/`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        postalCode: "641001",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact/" },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Get a free site visit and quote within 24 hours. We serve all areas of Coimbatore.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white" aria-labelledby="contact-info-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="contact-info-heading" className="section-heading text-center mb-10">
            Reach Us Directly
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {/* Phone */}
            <a
              href={PHONE_URL}
              id="contact-call-btn"
              className="card p-6 text-center group"
              aria-label={`Call us at ${BUSINESS.phone}`}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-brand-navy transition-colors">
                📞
              </div>
              <h3 className="font-bold text-brand-navy mb-1">Call Us</h3>
              <p className="text-orange-500 font-semibold">{BUSINESS.phone}</p>
              <p className="text-xs text-gray-500 mt-1">Mon–Sat 8am–8pm</p>
            </a>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              id="contact-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 text-center group"
              aria-label="Chat with us on WhatsApp"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                💬
              </div>
              <h3 className="font-bold text-brand-navy mb-1">WhatsApp</h3>
              <p className="text-green-600 font-semibold">{BUSINESS.phone}</p>
              <p className="text-xs text-gray-500 mt-1">Quick response guaranteed</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="card p-6 text-center group"
              aria-label={`Email us at ${BUSINESS.email}`}
            >
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                ✉️
              </div>
              <h3 className="font-bold text-brand-navy mb-1">Email</h3>
              <p className="text-orange-500 font-semibold text-sm break-all">{BUSINESS.email}</p>
              <p className="text-xs text-gray-500 mt-1">We reply within 4 hours</p>
            </a>

            {/* Location */}
            <div className="card p-6 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                📍
              </div>
              <h3 className="font-bold text-brand-navy mb-1">Location</h3>
              <p className="text-gray-600 text-sm">Coimbatore, Tamil Nadu</p>
              <p className="text-xs text-gray-500 mt-1">Serving all city areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 gradient-section" aria-labelledby="hours-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="hours-heading" className="text-2xl font-bold text-brand-navy mb-6 text-center">
            Business Hours
          </h2>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {Object.entries(BUSINESS.openingHoursDisplay).map(([day, hours], i) => (
              <div
                key={day}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < Object.keys(BUSINESS.openingHoursDisplay).length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <span className="font-medium text-gray-700">{day}</span>
                <span className="text-orange-500 font-semibold">{hours}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Emergency calls welcome outside business hours — we&apos;ll do our best to assist.
          </p>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-16 bg-white" aria-labelledby="map-form-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Google Map Embed */}
            <div>
              <h2 id="map-form-heading" className="text-2xl font-bold text-brand-navy mb-5">
                Find Us in Coimbatore
              </h2>
              <div className="rounded-3xl overflow-hidden shadow-xl h-80 md:h-96 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125456.26744454682!2d76.89155259999999!3d11.016844199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kovai Safety Nets location map — Coimbatore, Tamil Nadu"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 p-4 bg-brand-light rounded-2xl">
                <p className="text-sm text-gray-700">
                  <strong>📍 Service Area:</strong> We come to you! Our team operates across all zones of Coimbatore including RS Puram, Saibaba Colony, Gandhipuram, Peelamedu, Singanallur, Vadavalli, Saravanampatti, Kovaipudur, Pollachi, and Sulur.
                </p>
              </div>
            </div>

            {/* Enquiry Form */}
            <div>
              <LeadForm
                heading="Send Us an Enquiry"
                subheading="Fill the form and we'll call you back within 30 minutes during business hours."
                formId="contact-lead-form"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
