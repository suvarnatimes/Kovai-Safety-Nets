"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BUSINESS, PHONE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="section-dark py-12 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* ONE large floating dark glass panel */}
        <div className="glass-card-dark p-8 md:p-11 rounded-[24px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4 group" aria-label="Kovai Safety Nets Home">
                <Image
                  src="/images/logo.svg"
                  alt="Kovai Safety Nets Logo"
                  width={180}
                  height={50}
                  className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--dark-text-secondary)" }}
              >
                Professional safety net installation for homes, apartments, and industries across Coimbatore and surrounding areas since 2015.
              </p>
              <div className="space-y-2.5 text-xs" style={{ color: "var(--dark-text-secondary)" }}>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Coimbatore, Tamil Nadu – 641001</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <a href={PHONE_URL} className="hover:text-white transition-colors">
                    {BUSINESS.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-white transition-colors">
                    {BUSINESS.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3
                className="text-sm font-bold text-white mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Services
              </h3>
              <ul className="space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className="footer-link text-[13.5px] block transition-colors"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3
                className="text-sm font-bold text-white mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Areas We Serve
              </h3>
              <ul className="space-y-2.5">
                {LOCATIONS.map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/locations/${loc.slug}/`}
                      className="footer-link text-[13.5px] block transition-colors"
                    >
                      {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links & Hours */}
            <div>
              <h3
                className="text-sm font-bold text-white mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  { href: "/about/", label: "About Us" },
                  { href: "/gallery/", label: "Gallery" },
                  { href: "/testimonials/", label: "Reviews" },
                  { href: "/contact/", label: "Contact Us" },
                  { href: "/blog/", label: "Blog" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-[13.5px] block transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4
                className="text-xs font-bold text-white mb-2 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Business Hours
              </h4>
              <div className="space-y-1 text-xs" style={{ color: "var(--dark-text-tertiary)" }}>
                {Object.entries(BUSINESS.openingHoursDisplay).map(([day, hours]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span style={{ color: "var(--accent)" }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar inside panel */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px]"
            style={{
              borderTop: "1px solid var(--dark-glass-border)",
              color: "var(--dark-text-tertiary)",
            }}
          >
            <p>© {year} Kovai Safety Nets. All rights reserved.</p>
            <p>
              Serving Coimbatore &amp; surrounding areas — Call{" "}
              <a href={PHONE_URL} style={{ color: "var(--accent)" }} className="hover:underline">
                {BUSINESS.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
