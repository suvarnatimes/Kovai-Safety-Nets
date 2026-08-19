"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme") as "dark" | "light";
            if (theme) {
              setHeaderTheme(theme);
            }
          }
        });
      },
      { rootMargin: "-70px 0px -85% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About Us" },
    { href: "/gallery/", label: "Gallery" },
    { href: "/testimonials/", label: "Reviews" },
    { href: "/contact/", label: "Contact" },
    { href: "/blog/", label: "Blog" },
  ];

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-3">
      <div
        className="nav-header-pill rounded-full px-5 py-2.5 flex items-center justify-between"
        data-theme={headerTheme}
      >
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Kovai Safety Nets Home">
          <Image
            src="/images/logo-icon.svg"
            alt="Kovai Safety Nets Logo Icon"
            width={42}
            height={42}
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span
            className="nav-brand-text text-base sm:text-lg font-bold tracking-tight transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Kovai Safety Nets
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-item px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div className="relative group">
            <button className="nav-link-item px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1">
              Services
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50 shadow-xl"
              style={{
                background: headerTheme === "dark" ? "rgba(10, 13, 18, 0.94)" : "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: headerTheme === "dark" ? "1px solid rgba(255, 255, 255, 0.16)" : "1px solid rgba(20, 24, 20, 0.12)",
              }}
            >
              <div className="grid grid-cols-1 gap-0.5">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      headerTheme === "dark"
                        ? "text-slate-300 hover:bg-white/10 hover:text-white"
                        : "text-slate-700 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    <span className="text-sm w-5 text-center">{service.icon}</span>
                    <span>{service.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <a
            href={PHONE_URL}
            className="nav-cta-btn inline-flex items-center justify-center gap-1.5 font-semibold rounded-full px-4 py-2 text-xs sm:text-sm shadow-md transition-all duration-300 active:scale-95"
            aria-label={`Call Kovai Safety Nets at ${BUSINESS.phone}`}
          >
            📞 Get Free Quote
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden mt-2 rounded-2xl p-4 shadow-xl"
          style={{
            background: headerTheme === "dark" ? "rgba(10, 13, 18, 0.95)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: headerTheme === "dark" ? "1px solid rgba(255, 255, 255, 0.16)" : "1px solid rgba(20, 24, 20, 0.12)",
            color: headerTheme === "dark" ? "#f6f7f8" : "#14161a",
          }}
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${
                  headerTheme === "dark"
                    ? "text-slate-300 hover:bg-white/10 hover:text-white"
                    : "text-slate-700 hover:bg-black/5 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <p className="text-[10px] font-semibold opacity-50 uppercase tracking-widest mb-2">Services</p>
              <div className="grid grid-cols-2 gap-1">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      headerTheme === "dark"
                        ? "text-slate-400 hover:bg-white/10 hover:text-white"
                        : "text-slate-600 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    <span>{service.icon}</span>
                    <span className="truncate">{service.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href={PHONE_URL}
                className="flex-1 nav-cta-btn inline-flex items-center justify-center gap-1.5 font-semibold rounded-full py-2.5 text-xs text-center"
                onClick={() => setMobileOpen(false)}
              >
                📞 Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full py-2.5 text-center border ${
                  headerTheme === "dark"
                    ? "border-white/20 text-white bg-white/10"
                    : "border-black/20 text-slate-800 bg-black/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                💬 WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
