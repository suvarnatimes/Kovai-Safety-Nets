import Link from "next/link";
import { PHONE_URL, WHATSAPP_URL, BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export default function NotFound() {
  return (
    <main className="min-h-screen gradient-hero flex items-center justify-center px-4 py-20" role="main">
      <div className="max-w-2xl mx-auto text-center text-white">
        {/* 404 Illustration */}
        <div className="text-8xl font-black text-orange-400 mb-4 animate-fade-up">
          404
        </div>
        <div className="text-6xl mb-6">🕸️</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Oops! This Page Got Lost in the Net
        </h1>
        <p className="text-blue-200 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, but our safety nets are right here. Let us help you find what you need.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={PHONE_URL}
            id="not-found-call-btn"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 py-4 text-lg transition-all btn-pulse active:scale-95"
            aria-label={`Call Kovai Safety Nets at ${BUSINESS.phone}`}
          >
            📞 Call {BUSINESS.phone}
          </a>
          <a
            href={WHATSAPP_URL}
            id="not-found-whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-8 py-4 text-lg transition-all active:scale-95"
            aria-label="WhatsApp Kovai Safety Nets"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Navigation shortcuts */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-left">
          <p className="font-semibold text-blue-200 text-sm mb-4 uppercase tracking-wider">
            Find What You Need:
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { href: "/", label: "🏠 Home" },
              { href: "/about/", label: "ℹ️ About Us" },
              { href: "/gallery/", label: "🖼️ Gallery" },
              { href: "/contact/", label: "📞 Contact" },
              { href: "/testimonials/", label: "⭐ Reviews" },
              { href: "/blog/", label: "📰 Blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-semibold text-blue-200 text-sm mb-3 uppercase tracking-wider">
            Our Services:
          </p>
          <div className="grid grid-cols-2 gap-1">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              >
                <span>{service.icon}</span>
                <span>{service.shortTitle}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
