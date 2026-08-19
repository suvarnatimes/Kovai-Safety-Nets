import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import LeadForm from "@/components/ui/LeadForm";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export const metadata: Metadata = {
  title: "About Us – Kovai Safety Nets Coimbatore",
  description:
    "Learn about Kovai Safety Nets — Coimbatore's trusted safety net installer since 2015. Our story, team, values, and commitment to safety.",
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title: "About Kovai Safety Nets – Coimbatore's Trusted Safety Net Company",
    url: `${SITE_URL}/about/`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Header Banner (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about/" },
            ]}
          />
          <h1 className="headline-display text-white mt-6 mb-4">
            About Kovai Safety Nets
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Coimbatore&apos;s trusted safety net installation company since 2015.
          </p>
        </div>
      </section>

      {/* Our Story (LIGHT) */}
      <section data-theme="light" className="section-light py-20" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="pill-badge-light inline-flex mb-3">Our Story</div>
              <h2 id="story-heading" className="headline-section mt-2 mb-6" style={{ color: "#14161a" }}>
                A Decade of Keeping Coimbatore Safe
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Kovai Safety Nets was founded in 2015 by a team of safety
                  professionals who saw a growing need for reliable, quality
                  safety net installations in Coimbatore. What started as a
                  small operation serving a few apartments in RS Puram has
                  grown into the city&apos;s most trusted safety net company —
                  with over <strong className="text-black">2,000 installations</strong> completed across
                  Coimbatore and surrounding areas.
                </p>
                <p>
                  Our founder brings over 15 years of experience in industrial
                  safety and construction, with certifications in fall
                  protection and work-at-height safety. We apply that
                  professional-grade knowledge to every residential installation
                  — because we believe your family deserves the same level of
                  protection as any industrial workplace.
                </p>
                <p>
                  Today, Kovai Safety Nets serves homes, apartment complexes,
                  housing associations, construction companies, and industries
                  across Coimbatore, Pollachi, Sulur, and beyond. We continue
                  to invest in training, tooling, and materials to stay ahead
                  of the industry standard.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] overflow-hidden shadow-xl border border-black/5">
              <Image
                src="/images/services/child-safety-nets.webp"
                alt="Happy child playing safely on a balcony with Kovai Safety Nets installation"
                width={600}
                height={420}
                className="object-cover w-full h-96"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values (LIGHT) */}
      <section data-theme="light" className="section-light py-20 border-t border-black/5" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="pill-badge-light inline-flex mb-3">Our Values</div>
            <h2 id="values-heading" className="headline-section mt-2" style={{ color: "#14161a" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {[
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "We never cut corners. Every installation follows safety standards and is tested before handover.",
              },
              {
                icon: "💎",
                title: "Quality Materials",
                desc: "UV-stabilised HDPE nets, marine-grade SS hardware — we source only the best materials for lasting performance.",
              },
              {
                icon: "🤝",
                title: "Customer Trust",
                desc: "Transparent pricing, honest advice, and a written warranty — we earn your trust through integrity.",
              },
              {
                icon: "⚡",
                title: "Prompt Service",
                desc: "We respect your time. Same-day site visits, on-schedule installations, and quick response to queries.",
              },
              {
                icon: "🔧",
                title: "Expert Installation",
                desc: "Factory-trained, height-certified installation teams who take pride in clean, neat, invisible finishes.",
              },
              {
                icon: "🌿",
                title: "Responsible Practice",
                desc: "We use humane, wildlife-safe solutions. Our monkey and bird nets deter — never harm — animals.",
              },
            ].map((v) => (
              <div key={v.title} className="glass-card-light p-7 flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#14161a" }}>{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones (DARK) */}
      <section data-theme="dark" className="section-dark py-20" aria-labelledby="milestones-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="milestones-heading" className="headline-section text-white mb-3">
              Our Journey in Numbers
            </h2>
            <p className="text-slate-300">A decade of growth — driven by customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center stagger">
            {[
              { value: "2015", label: "Founded in Coimbatore" },
              { value: "2,000+", label: "Installations Completed" },
              { value: "4.9 ⭐", label: "Average Customer Rating" },
              { value: "11", label: "Service Types Offered" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card-dark p-6">
                <p className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "var(--accent)" }}>{stat.value}</p>
                <p className="text-slate-300 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA (DARK) */}
      <section data-theme="dark" className="section-dark py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="headline-section text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Contact us today for a free, no-obligation quote. Same-day site visits available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
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
          <LeadForm
            heading="Send Us an Enquiry"
            subheading="We'll call you back within 30 minutes."
            formId="about-lead-form"
          />
        </div>
      </section>
    </>
  );
}
