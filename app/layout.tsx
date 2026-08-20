import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import JsonLdLocalBusiness from "@/components/seo/JsonLdLocalBusiness";
import Script from "next/script";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kovai Safety Nets – Safety Net Installation in Coimbatore | 7708414857",
    template: "%s | Kovai Safety Nets Coimbatore",
  },
  description:
    "Professional safety net installation in Coimbatore. Balcony safety nets, invisible grills, pet nets, child nets, industrial nets & more. Call 7708414857 for a free quote.",
  keywords: [
    "safety nets Coimbatore",
    "balcony safety nets",
    "invisible grills Coimbatore",
    "pet safety nets",
    "child safety nets",
    "industrial safety nets",
  ],
  authors: [{ name: "Kovai Safety Nets" }],
  creator: "Kovai Safety Nets",
  publisher: "Kovai Safety Nets",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Kovai Safety Nets – Safety Net Installation in Coimbatore",
    description:
      "Professional safety net installation in Coimbatore. Balcony nets, invisible grills, pet & child nets. Call 7708414857.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Kovai Safety Nets – Professional Safety Net Installation Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kovai Safety Nets – Safety Net Installation in Coimbatore",
    description: "Professional safety net services in Coimbatore. Call 7708414857.",
    images: [`${SITE_URL}/images/og-image.webp`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/images/logo-icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f2240" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Coimbatore" />
        <meta name="geo.position" content="11.0168;76.9558" />
        <meta name="ICBM" content="11.0168, 76.9558" />
      </head>
      <body className="font-sans antialiased bg-[#0a0d12] text-slate-100">
        <Providers>
          <JsonLdLocalBusiness />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomBar />
        </Providers>
        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
