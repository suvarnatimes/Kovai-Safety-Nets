export const BUSINESS = {
  name: "Kovai Safety Nets",
  legalName: "Kovai Safety Nets",
  description:
    "Professional safety net installation services in Coimbatore. We install balcony safety nets, invisible grills, staircase nets, pet nets, child safety nets, and more.",
  phone: "7708414857",
  phoneE164: "+917708414857",
  whatsappNumber: "917708414857",
  whatsappMessage:
    "Hi! I'm interested in your safety net installation services. Please share more details.",
  email: "kovaisafetynets@gmail.com",
  address: {
    streetAddress: "Coimbatore",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641001",
    addressCountry: "IN",
  },
  geo: {
    latitude: "11.0168",
    longitude: "76.9558",
  },
  url: "https://kovaisafetynets.com",
  logo: "/images/logo.webp",
  openingHours: ["Mo-Sa 08:00-20:00", "Su 09:00-18:00"],
  openingHoursDisplay: {
    "Monday – Saturday": "8:00 AM – 8:00 PM",
    Sunday: "9:00 AM – 6:00 PM",
  },
  socialLinks: [],
  areaServed: [
    "Coimbatore",
    "RS Puram",
    "Saibaba Colony",
    "Gandhipuram",
    "Peelamedu",
    "Singanallur",
    "Vadavalli",
    "Saravanampatti",
    "Kovaipudur",
    "Pollachi",
    "Sulur",
  ],
  priceRange: "₹₹",
} as const;

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
  BUSINESS.whatsappMessage
)}`;

export const PHONE_URL = `tel:${BUSINESS.phone}`;

export const SITE_URL = BUSINESS.url;
