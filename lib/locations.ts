export interface Location {
  slug: string;
  name: string;
  district: string;
  description: string;
  landmarks: string[];
  metaTitle: string;
  metaDescription: string;
}

export const LOCATIONS: Location[] = [
  {
    slug: "rs-puram",
    name: "RS Puram",
    district: "Coimbatore",
    description:
      "RS Puram is a well-established residential neighbourhood in central Coimbatore, known for its apartment complexes and independent houses. Kovai Safety Nets provides prompt safety net installation services across RS Puram.",
    landmarks: ["Race Course Road", "Nehru Street", "Dr Nanjappa Road"],
    metaTitle: "Safety Nets in RS Puram, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Professional safety net installation in RS Puram, Coimbatore. Balcony nets, invisible grills, pet nets & more. Same-day quotes. Call 7708414857.",
  },
  {
    slug: "saibaba-colony",
    name: "Saibaba Colony",
    district: "Coimbatore",
    description:
      "Saibaba Colony is a prime residential area in Coimbatore with numerous gated communities and high-rise apartments. Kovai Safety Nets is a trusted safety net provider in Saibaba Colony.",
    landmarks: ["Saibaba Temple Road", "Avinashi Road", "Nehru Nagar"],
    metaTitle: "Safety Nets in Saibaba Colony, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Expert safety net services in Saibaba Colony, Coimbatore. Balcony safety nets, invisible grills, child safety nets. Call 7708414857 for free quote.",
  },
  {
    slug: "gandhipuram",
    name: "Gandhipuram",
    district: "Coimbatore",
    description:
      "Gandhipuram is the commercial and transport hub of Coimbatore, with dense residential apartment complexes. Kovai Safety Nets covers all safety net requirements in Gandhipuram and surrounding areas.",
    landmarks: ["Gandhipuram Bus Stand", "Cross Cut Road", "Big Bazaar Street"],
    metaTitle: "Safety Nets in Gandhipuram, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety net installation in Gandhipuram, Coimbatore. Balcony nets, pet nets, staircase nets, invisible grills. Call 7708414857 for instant service.",
  },
  {
    slug: "peelamedu",
    name: "Peelamedu",
    district: "Coimbatore",
    description:
      "Peelamedu is a rapidly developing residential and IT corridor in Coimbatore, home to many modern apartment complexes near PSG Tech and the Airport. Kovai Safety Nets serves Peelamedu with fast installation services.",
    landmarks: ["PSG Tech", "Coimbatore Airport", "Avinashi Road"],
    metaTitle: "Safety Nets in Peelamedu, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety nets in Peelamedu, Coimbatore — balcony nets, invisible grills, child nets, pet nets. Near PSG Tech and Airport. Call 7708414857.",
  },
  {
    slug: "singanallur",
    name: "Singanallur",
    district: "Coimbatore",
    description:
      "Singanallur is a large residential area in south-east Coimbatore with many apartment complexes and independent homes. Kovai Safety Nets offers full safety net services across Singanallur.",
    landmarks: ["Singanallur Lake", "Trichy Road", "Ondipudur"],
    metaTitle: "Safety Nets in Singanallur, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety net installation in Singanallur, Coimbatore. Balcony, staircase, pet, and child safety nets. Experienced local team. Call 7708414857.",
  },
  {
    slug: "vadavalli",
    name: "Vadavalli",
    district: "Coimbatore",
    description:
      "Vadavalli is a serene hillside locality on the western outskirts of Coimbatore, popular for villas and gated communities. Being near forested areas, monkey safety nets and bird nets are in high demand here.",
    landmarks: ["Maruthamalai Temple Road", "Siruvani Road", "Madukkarai Road"],
    metaTitle: "Safety Nets in Vadavalli, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety net services in Vadavalli, Coimbatore. Monkey nets, balcony nets, invisible grills for hillside homes. Call 7708414857.",
  },
  {
    slug: "saravanampatti",
    name: "Saravanampatti",
    district: "Coimbatore",
    description:
      "Saravanampatti is Coimbatore's fastest-growing IT suburb, home to tech parks and modern apartment complexes. Kovai Safety Nets serves the Saravanampatti corridor with premium safety net solutions.",
    landmarks: ["TIDEL Park", "Avinashi Road", "Neelikonampalayam"],
    metaTitle: "Safety Nets in Saravanampatti, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Premium safety net installation in Saravanampatti, Coimbatore. Balcony nets, invisible grills, pet safety nets. Call 7708414857.",
  },
  {
    slug: "kovaipudur",
    name: "Kovaipudur",
    district: "Coimbatore",
    description:
      "Kovaipudur is a picturesque hillside residential area on the southern outskirts of Coimbatore, popular for its calm environment and proximity to forests. Monkey intrusion and bird nesting are common concerns addressed by Kovai Safety Nets.",
    landmarks: ["Kovaipudur Main Road", "Perur Chettipalayam Road"],
    metaTitle: "Safety Nets in Kovaipudur, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety nets in Kovaipudur, Coimbatore. Monkey nets, balcony safety nets, bird nets for hillside villas and apartments. Call 7708414857.",
  },
  {
    slug: "pollachi",
    name: "Pollachi",
    district: "Coimbatore",
    description:
      "Pollachi is a major town south of Coimbatore known for its agricultural heritage and growing residential sector. Kovai Safety Nets extends its service to Pollachi with the same quality and quick turnaround.",
    landmarks: ["Pollachi Bus Stand", "Anaimalai Road", "Topslip Junction"],
    metaTitle: "Safety Nets in Pollachi | Kovai Safety Nets Coimbatore",
    metaDescription:
      "Safety net installation in Pollachi. Balcony nets, staircase nets, coconut tree nets by Kovai Safety Nets. Call 7708414857 for service in Pollachi.",
  },
  {
    slug: "sulur",
    name: "Sulur",
    district: "Coimbatore",
    description:
      "Sulur is a fast-growing suburban town north-east of Coimbatore, near the Coimbatore Air Force Station, with many new residential developments. Kovai Safety Nets provides timely safety net installation in Sulur.",
    landmarks: ["Sulur Air Force Station", "Trichy Road", "Avinashi Road"],
    metaTitle: "Safety Nets in Sulur, Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Safety net installation in Sulur, Coimbatore. Balcony nets, invisible grills, child & pet safety nets. Serving Sulur and nearby areas. Call 7708414857.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}
