import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, PHONE_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";
import LeadForm from "@/components/ui/LeadForm";
import HeroCarousel from "@/components/ui/HeroCarousel";

export const metadata: Metadata = {
  title: "Kovai Safety Nets – Safety Net Installation in Coimbatore | 7708414857",
  description:
    "Trusted safety net installation in Coimbatore since 2015. Balcony safety nets, invisible grills, pet nets, child nets, industrial nets & more. Free quote: 7708414857.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Kovai Safety Nets – Safety Net Installation in Coimbatore",
    description:
      "Trusted safety net installation in Coimbatore. Balcony nets, invisible grills, pet & child nets. Call 7708414857.",
    url: `${SITE_URL}/`,
  },
};

const TRUST_SIGNALS = [
  { icon: "🏠", value: "2,000+", label: "Homes Protected" },
  { icon: "⭐", value: "4.9/5", label: "Customer Rating" },
  { icon: "📅", value: "10+ Years", label: "Experience" },
  { icon: "🔧", value: "Same Day", label: "Site Visit" },
  { icon: "🛡️", value: "1 Year", label: "Installation Warranty" },
  { icon: "📍", value: "11 Areas", label: "Across Coimbatore" },
];

const TESTIMONIALS = [
  {
    name: "Priya Chandrasekaran",
    location: "RS Puram, Coimbatore",
    rating: 5,
    text: "Excellent service! The balcony safety nets were installed neatly in under 2 hours. My toddler can now play safely on the balcony. Highly recommended!",
  },
  {
    name: "Karthik Rajendran",
    location: "Saravanampatti, Coimbatore",
    rating: 5,
    text: "Got invisible grills fitted for our 8th floor apartment. The view is totally unobstructed and the cables are barely visible. Very professional team.",
  },
  {
    name: "Meena Subramaniam",
    location: "Vadavalli, Coimbatore",
    rating: 5,
    text: "Installed monkey nets for our house near the Maruthamalai road. No more monkey menace! The net is strong and well-anchored. Great pricing too.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── SECTION 1: HERO (DARK MODE) ─── */}
      <section
        id="hero"
        data-theme="dark"
        className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20 md:pb-28"
        aria-labelledby="hero-heading"
        style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}
      >
        {/* Real photo background — darkened & blurred */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-1.jpg"
            alt="Balcony safety net installation"
            fill
            priority
            className="object-cover"
            style={{ filter: "blur(3px) brightness(0.40) saturate(0.85)", transform: "scale(1.05)" }}
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,13,18,0.60) 0%, rgba(10,13,18,0.25) 45%, rgba(10,13,18,0.90) 100%)",
            }}
          />
        </div>

        {/* Ambient glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(255,138,61,0.12), transparent 45%), " +
              "radial-gradient(circle at 80% 75%, rgba(60,90,140,0.18), transparent 50%)",
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Copy Column */}
            <div className="animate-fade-up">
              <div className="pill-badge-dark hidden md:inline-flex mb-6">
                <span style={{ color: "var(--success)", fontSize: "8px" }}>●</span>
                Coimbatore&apos;s #1 Safety Net Installers
              </div>

              <h1 id="hero-heading" className="headline-display mb-6 text-white">
                Protect What{" "}
                <span style={{ color: "var(--accent)" }}>Matters&nbsp;Most</span>{" "}
                with Safety Nets
              </h1>

              {/* Mobile Hero Carousel */}
              <div className="block lg:hidden my-6">
                <HeroCarousel mode="horizontal" />
              </div>

              <p
                className="text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
                style={{ color: "var(--dark-text-secondary)" }}
              >
                Professional safety net installation in Coimbatore for homes,
                apartments &amp; businesses. Balcony nets, invisible grills,
                pet nets, child safety nets &amp; more — free on-site quote in 24 hours.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={PHONE_URL}
                  id="hero-call-btn"
                  className="btn-primary-dark"
                  aria-label={`Call Kovai Safety Nets at ${BUSINESS.phone}`}
                >
                  📞 Get Free Quote · {BUSINESS.phone}
                </a>
                <a
                  href={WHATSAPP_URL}
                  id="hero-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon />
                  WhatsApp Us
                </a>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: "var(--dark-text-tertiary)" }}>
                <span className="flex items-center gap-1">
                  <span style={{ color: "var(--success)" }}>✓</span> Free site visit
                </span>
                <span style={{ opacity: 0.25 }}>·</span>
                <span className="flex items-center gap-1">
                  <span style={{ color: "var(--success)" }}>✓</span> No advance payment
                </span>
                <span style={{ opacity: 0.25 }}>·</span>
                <span className="flex items-center gap-1">
                  <span style={{ color: "var(--success)" }}>✓</span> 1-year warranty
                </span>
              </div>
            </div>

            {/* Desktop Vertical Carousel */}
            <div className="hidden lg:block">
              <HeroCarousel mode="vertical" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: TRUST SIGNALS (LIGHT MODE) ─── */}
      <section data-theme="light" className="section-light py-12 border-y border-black/5" aria-label="Why choose Kovai Safety Nets">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger">
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal.label}
                className="glass-card-light text-center py-5 px-3 flex flex-col items-center justify-center"
              >
                <div className="text-2xl mb-2">{signal.icon}</div>
                <div
                  className="text-xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--light-text-primary)" }}
                >
                  {signal.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--light-text-secondary)" }}>
                  {signal.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SERVICES (LIGHT MODE) ─── */}
      <section
        id="services"
        data-theme="light"
        className="section-light py-20 md:py-24"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="pill-badge-light inline-flex mb-4">What We Do</div>
            <h2 id="services-heading" className="headline-section mb-4" style={{ color: "var(--light-text-primary)" }}>
              Our Safety Net Services
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ color: "var(--light-text-secondary)" }}>
              Explore our complete range of safety net installations across Coimbatore.
              Each service is customized to your needs with high quality materials &amp; expert craftsmanship.
            </p>
          </div>

          {/* Stacked Horizontal Service Bars (Left-Right Alternating Combination) */}
          <div className="space-y-8 stagger">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.slug}
                  className="glass-card-light rounded-[28px] p-6 sm:p-8 md:p-10 transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* IMAGE CONTAINER */}
                    <div
                      className={`lg:col-span-5 relative h-60 sm:h-72 lg:h-76 w-full overflow-hidden rounded-[22px] shadow-md ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to top, rgba(10,13,18,0.45) 0%, transparent 60%)",
                        }}
                      />
                      <div className="absolute top-4 left-4 glass rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 flex items-center gap-2 backdrop-blur-md">
                        <span className="text-base">{service.icon}</span>
                        <span>{service.shortTitle}</span>
                      </div>
                    </div>

                    {/* CONTENT CONTAINER */}
                    <div
                      className={`lg:col-span-7 flex flex-col justify-between ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Icon + Tagline */}
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs border border-orange-200/50"
                            style={{
                              background: "linear-gradient(135deg, rgba(255,138,61,0.20) 0%, rgba(255,138,61,0.06) 100%)",
                            }}
                          >
                            {service.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                            {service.tagline}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
                          style={{ fontFamily: "var(--font-display)", color: "var(--light-text-primary)" }}
                        >
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-sm sm:text-base leading-relaxed mb-6"
                          style={{ color: "var(--light-text-secondary)" }}
                        >
                          {service.description}
                        </p>

                        {/* Key Benefits Pill Strip */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {service.benefits.slice(0, 3).map((benefit, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/5 bg-white/60 text-slate-700"
                            >
                              <span style={{ color: "var(--success)" }} className="mr-1.5">✓</span>
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons: Read More & Quote */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
                        <a
                          href={PHONE_URL}
                          className="inline-flex items-center justify-center gap-2 bg-[#ff8a3d] hover:bg-[#ea6c0a] text-white font-semibold text-sm py-3 px-6 rounded-full shadow-md transition-all active:scale-95"
                          aria-label={`Get quote for ${service.title}`}
                        >
                          📋 Get Free Quote
                        </a>
                        <Link
                          href={`/services/${service.slug}/`}
                          className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-800 text-slate-800 hover:text-black font-semibold text-sm py-3 px-6 rounded-full transition-all active:scale-95"
                          aria-label={`Read more about ${service.title}`}
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHY CHOOSE US (DARK MODE) ─── */}
      <section data-theme="dark" className="section-dark py-20 md:py-24" aria-labelledby="why-us-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="pill-badge-dark inline-flex mb-4">Why Choose Us</div>
              <h2 id="why-us-heading" className="headline-section mb-8 text-white">
                Coimbatore&apos;s Most Trusted Safety Net Company
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: "⚡",
                    title: "Same-Day Site Visits",
                    desc: "Call us in the morning, get a free measurement and quote by afternoon — across all Coimbatore zones.",
                  },
                  {
                    icon: "🔬",
                    title: "Premium Materials Only",
                    desc: "UV-stabilised HDPE nets, SS 304/316 hardware. We never compromise on quality for cost.",
                  },
                  {
                    icon: "👷",
                    title: "Trained & Insured Installers",
                    desc: "Our installation team is factory-trained, insured, and safety-certified for work at height.",
                  },
                  {
                    icon: "📝",
                    title: "Written Warranty",
                    desc: "1-year installation warranty + manufacturer's material warranty, issued in writing.",
                  },
                  {
                    icon: "💰",
                    title: "Transparent Pricing",
                    desc: "Detailed written quote before any work starts. No hidden charges, no surprises.",
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card-dark p-4 flex gap-4 items-start">
                    <div className="icon-box-accent">{item.icon}</div>
                    <div>
                      <h3
                        className="text-sm font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--dark-text-secondary)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo with Glass Stat Overlay */}
            <div className="relative">
              <div className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/services/pet-safety-nets.webp"
                  alt="Cat safely enjoying the balcony with a pet safety net installed"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[420px]"
                  loading="lazy"
                />
              </div>
              {/* Stat Card */}
              <div className="absolute -bottom-6 -left-6 glass-card-dark p-5 max-w-[220px]">
                <p className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>
                  2,000+
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--dark-text-secondary)" }}>
                  Families protected across Coimbatore
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: HOW IT WORKS (LIGHT MODE) ─── */}
      <section
        data-theme="light"
        className="section-light py-20 md:py-24"
        aria-labelledby="process-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="pill-badge-light inline-flex mb-4">Simple Process</div>
          <h2 id="process-heading" className="headline-section mb-4" style={{ color: "var(--light-text-primary)" }}>
            How We Work
          </h2>
          <p className="text-sm max-w-lg mx-auto mb-14" style={{ color: "var(--light-text-secondary)" }}>
            From your first call to completed installation — a seamless, professional experience.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {[
              { step: "01", icon: "📞", title: "Call or WhatsApp", desc: "Contact us to describe your requirement — call, WhatsApp, or fill the form." },
              { step: "02", icon: "📐", title: "Free Site Survey", desc: "Our team visits, measures, and provides a detailed written quote. No charge." },
              { step: "03", icon: "🔧", title: "Professional Install", desc: "Our installers arrive with all materials and complete the work neatly and on-time." },
              { step: "04", icon: "✅", title: "Inspection & Warranty", desc: "We inspect every connection point and hand you a written installation warranty." },
            ].map((step) => (
              <div
                key={step.step}
                className="glass-card-light p-6 text-left relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <span
                    className="absolute top-3 right-4 text-4xl font-bold select-none opacity-15"
                    style={{ fontFamily: "var(--font-display)", color: "var(--light-text-primary)" }}
                  >
                    {step.step}
                  </span>
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--light-text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--light-text-secondary)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: TESTIMONIALS (DARK MODE) ─── */}
      <section data-theme="dark" className="section-dark py-20 md:py-24" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="pill-badge-dark inline-flex mb-4">Customer Reviews</div>
            <h2 id="testimonials-heading" className="headline-section text-white">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card-dark p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm" aria-hidden="true">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm italic leading-relaxed mb-6" style={{ color: "var(--dark-text-secondary)" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {t.name}
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--dark-text-tertiary)" }}>
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/testimonials/" className="btn-secondary-dark text-xs py-3 px-6">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: SERVICE AREAS (LIGHT MODE) ─── */}
      <section data-theme="light" className="section-light py-16" aria-labelledby="areas-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="pill-badge-light inline-flex mb-4">Service Areas</div>
            <h2 id="areas-heading" className="headline-section" style={{ color: "var(--light-text-primary)" }}>
              Serving All of Coimbatore
            </h2>
            <p className="text-sm mt-3" style={{ color: "var(--light-text-secondary)" }}>
              We install safety nets across Coimbatore city and surrounding towns.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Link
              href="/locations/coimbatore/"
              className="glass-card-light px-4 py-2 text-xs font-semibold rounded-full hover:border-orange-400 transition-colors"
              style={{ color: "var(--light-text-primary)" }}
            >
              📍 Coimbatore
            </Link>
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}/`}
                className="glass-card-light px-4 py-2 text-xs font-semibold rounded-full hover:border-orange-400 transition-colors"
                style={{ color: "var(--light-text-primary)" }}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: LEAD FORM (DARK MODE) ─── */}
      <section data-theme="dark" className="section-dark py-20 md:py-24" aria-labelledby="lead-form-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card-dark p-8 md:p-12">
            <LeadForm
              heading="Get Your Free Quote Today"
              subheading="Fill in the form below and we'll get back to you within 30 minutes during business hours."
              formId="home-lead-form"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
