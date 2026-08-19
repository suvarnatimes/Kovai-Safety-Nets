import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PHONE_URL, WHATSAPP_URL, BUSINESS } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials – Kovai Safety Nets Coimbatore",
  description:
    "Read what our customers in Coimbatore say about Kovai Safety Nets. 4.9/5 rating based on real reviews for balcony nets, invisible grills, pet nets, and more.",
  alternates: { canonical: `${SITE_URL}/testimonials/` },
};

const TESTIMONIALS = [
  {
    name: "Priya Chandrasekaran",
    location: "RS Puram, Coimbatore",
    service: "Balcony Safety Nets",
    rating: 5,
    date: "March 2024",
    text: "Excellent service! The balcony safety nets were installed neatly in under 2 hours. My toddler can now play safely on the balcony without me worrying every second. The finish is super clean and the net is barely visible. Highly recommended to all parents in Coimbatore!",
  },
  {
    name: "Karthik Rajendran",
    location: "Saravanampatti, Coimbatore",
    service: "Invisible Grills",
    rating: 5,
    date: "January 2024",
    text: "Got invisible grills fitted for our 8th floor apartment. The view is totally unobstructed and the cables are barely visible from inside. The team was punctual and professional. No mess left behind. Completed in one day.",
  },
  {
    name: "Meena Subramaniam",
    location: "Vadavalli, Coimbatore",
    service: "Monkey Safety Nets",
    rating: 5,
    date: "November 2023",
    text: "Installed monkey nets for our house near the Maruthamalai road. No more monkey menace! The net is strong, well-anchored, and has held up through two monsoon seasons. Great pricing too — much cheaper than I expected.",
  },
  {
    name: "Suresh Kumar",
    location: "Peelamedu, Coimbatore",
    service: "Pet Safety Nets",
    rating: 5,
    date: "October 2023",
    text: "We have two cats and were terrified they would jump off our balcony. The cat safety nets from Kovai Safety Nets have completely solved this problem. The mesh is fine enough that they cannot push through, and it's removable for cleaning.",
  },
  {
    name: "Anitha Rajan",
    location: "Saibaba Colony, Coimbatore",
    service: "Child Safety Nets",
    rating: 5,
    date: "September 2023",
    text: "My 3-year-old son was constantly trying to climb the balcony railings. After the child safety net was installed, he can play freely on the balcony and I don't have to hover over him. The installation was quick, neat, and affordable.",
  },
  {
    name: "Vijayakumar Narayanan",
    location: "Gandhipuram, Coimbatore",
    service: "Staircase Safety Nets",
    rating: 4,
    date: "August 2023",
    text: "Installed staircase safety nets in our duplex home. The net covers the full open side of the staircase banister. Good quality materials and professional installation. Took about 3 hours for the full staircase.",
  },
  {
    name: "Lakshmi Prabha",
    location: "Singanallur, Coimbatore",
    service: "Apartment Safety Nets",
    rating: 5,
    date: "July 2023",
    text: "Our apartment association hired Kovai Safety Nets to cover all balconies in our 48-unit complex. They completed the entire project in 4 days with minimum disruption to residents. Very professional and the bulk pricing was very reasonable.",
  },
  {
    name: "Ramesh Balaji",
    location: "Kovaipudur, Coimbatore",
    service: "Coconut Tree Safety Nets",
    rating: 5,
    date: "June 2023",
    text: "Had three big coconut trees in our compound whose falling coconuts were a danger to our car and family. The tree safety nets from Kovai Safety Nets have been a perfect solution. Even after heavy winds the nets held all the coconuts safely.",
  },
  {
    name: "Divya Srinivasan",
    location: "Sulur, Coimbatore",
    service: "Cloth Hangers",
    rating: 5,
    date: "May 2023",
    text: "Got the wall-mounted cloth hanger system for our small balcony. It's been a game-changer — we can now dry a full wash easily. The rods slide in and out smoothly and the powder coating hasn't rusted at all even in the rainy season.",
  },
];

export default function TestimonialsPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(TESTIMONIALS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      datePublished: t.date,
      reviewBody: t.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Hero (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Reviews", href: "/testimonials/" },
            ]}
          />
          <h1 className="headline-display text-white mt-6 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-6">
            Real reviews from our customers across Coimbatore.
          </p>
          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 glass-card-dark px-6 py-3 rounded-2xl">
            <div className="text-4xl font-black text-amber-400">4.9</div>
            <div>
              <div className="flex gap-1 text-amber-400 text-lg" aria-label="4.9 out of 5 stars">
                {[1,2,3,4,5].map(i => <span key={i} aria-hidden="true">★</span>)}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">Based on {TESTIMONIALS.length}+ verified reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid (LIGHT) */}
      <section data-theme="light" className="section-light py-20" aria-label="Customer testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="glass-card-light p-6 flex flex-col gap-3 rounded-[24px]"
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="reviewBody" content={t.text} />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-amber-500" aria-hidden="true">★</span>
                    ))}
                    <span className="sr-only">{t.rating} out of 5 stars</span>
                  </div>
                  <span className="pill-badge-light text-xs" style={{ color: "var(--accent)" }}>{t.service}</span>
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-black/5 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#14161a" }} itemProp="author">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <time className="text-xs text-slate-400" dateTime={t.date}>{t.date}</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Embed (LIGHT) */}
      <section data-theme="light" className="section-light py-16 border-t border-black/5" aria-labelledby="google-reviews-heading">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 id="google-reviews-heading" className="headline-section mb-4" style={{ color: "#14161a" }}>
            Find Us on Google
          </h2>
          <p className="text-slate-600 mb-8 text-sm sm:text-base">
            Leave us a review on Google — your feedback helps families in Coimbatore make safer choices.
          </p>
          <div className="glass-card-light rounded-[28px] p-8">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-3xl font-black mb-1" style={{ color: "#14161a" }}>4.9 / 5</p>
            <p className="text-slate-500 text-sm mb-6">on Google Reviews</p>
            <a
              href="https://www.google.com/search?q=Kovai+Safety+Nets+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-light inline-flex"
            >
              See Our Google Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* CTA (DARK) */}
      <section data-theme="dark" className="section-dark py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="headline-section text-white mb-3">
            Join 2,000+ Happy Customers
          </h2>
          <p className="text-slate-300 mb-6 text-sm sm:text-base">
            Call us for a free quote — we&apos;ll add your review to this page after installation!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_URL} className="btn-primary-dark">📞 Call {BUSINESS.phone}</a>
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
    </>
  );
}
