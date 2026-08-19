import { BUSINESS, SITE_URL } from "@/lib/constants";

export default function JsonLdLocalBusiness() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo.webp`,
          width: 200,
          height: 60,
        },
        image: `${SITE_URL}/images/og-image.webp`,
        description: BUSINESS.description,
        telephone: BUSINESS.phoneE164,
        email: BUSINESS.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.streetAddress,
          addressLocality: BUSINESS.address.addressLocality,
          addressRegion: BUSINESS.address.addressRegion,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: BUSINESS.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "08:00",
            closes: "20:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: BUSINESS.priceRange,
        areaServed: BUSINESS.areaServed.map((area) => ({
          "@type": "City",
          name: area,
        })),
        hasMap: `https://www.google.com/maps?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
        sameAs: BUSINESS.socialLinks,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        description: BUSINESS.description,
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
