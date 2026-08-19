export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: string[];
  materials: { name: string; detail: string }[];
  installationSteps: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  image: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    shortTitle: "Balcony Safety Nets",
    tagline: "Protect your loved ones from balcony falls",
    description:
      "High-quality nylon safety nets installed on balconies to prevent accidental falls of children, pets, and adults in apartments and houses across Coimbatore.",
    longDescription:
      "Balcony safety nets are one of our most requested services in Coimbatore. Our UV-stabilised nylon nets are tensioned tightly across your balcony opening, making them virtually invisible from the street while providing a robust barrier that can support significant impact loads. Whether you live on the 2nd floor or the 20th, our certified installers anchor the net frame securely into the wall and slab — no drilling into tiles. We offer custom sizing for any balcony shape, including L-shaped, curved, and extended balconies.",
    benefits: [
      "Prevents accidental falls of children and elderly",
      "Keeps pets safe and contained on the balcony",
      "UV-stabilised nets resist sun bleaching for 5+ years",
      "Transparent mesh — does not block light or views",
      "Rust-proof stainless steel frame and hooks",
      "Easy removable design for deep cleaning",
      "Pigeons and birds kept out naturally",
    ],
    materials: [
      {
        name: "HDPE Nylon Net",
        detail: "High-density polyethylene, UV-stabilised, 1.2 mm thickness",
      },
      {
        name: "Stainless Steel Hooks & Eye Bolts",
        detail: "Grade 304 SS, corrosion-resistant, load-tested",
      },
      {
        name: "Nylon Rope Border",
        detail: "6 mm braided nylon rope border for a clean finished edge",
      },
    ],
    installationSteps: [
      {
        step: "Site Survey",
        detail:
          "We measure the balcony opening precisely and assess anchor points.",
      },
      {
        step: "Frame Anchoring",
        detail:
          "Stainless steel eye bolts are installed at measured intervals into the wall and slab.",
      },
      {
        step: "Net Tensioning",
        detail:
          "The pre-cut net is laced tightly into the frame, eliminating any sag.",
      },
      {
        step: "Quality Inspection",
        detail:
          "We test pull-strength at multiple points and hand over a completion certificate.",
      },
    ],
    faqs: [
      {
        question: "How long does balcony safety net installation take?",
        answer:
          "A standard single balcony takes 1–2 hours. Larger or multi-balcony apartments may take 3–4 hours.",
      },
      {
        question: "Will the net damage my tiles or wall paint?",
        answer:
          "No. We drill only into the concrete wall or slab edges, avoiding tiles. Holes are sealed with weatherproof sealant after installation.",
      },
      {
        question: "What is the warranty on balcony safety nets?",
        answer:
          "We provide a 1-year installation warranty and our UV-stabilised nets carry a 3-year manufacturer warranty.",
      },
      {
        question: "Can the net be removed temporarily?",
        answer:
          "Yes. The net is designed with a lace-and-hook system that allows removal and re-installation in under 30 minutes.",
      },
      {
        question: "What colours are available?",
        answer:
          "We offer nets in black, white, dark green, and transparent. Black is the most popular as it blends with shadows.",
      },
    ],
    image: "/images/services/balcony-safety-nets.webp",
    icon: "🏠",
    metaTitle:
      "Balcony Safety Nets in Coimbatore | Kovai Safety Nets | 7708414857",
    metaDescription:
      "Expert balcony safety net installation in Coimbatore. UV-stabilised nylon nets to protect children, pets & elderly from balcony falls. Call 7708414857 for free quote.",
    keywords: [
      "balcony safety nets Coimbatore",
      "balcony net installation",
      "safety nets for balcony",
    ],
  },
  {
    slug: "balcony-invisible-grills",
    title: "Balcony Invisible Grills",
    shortTitle: "Invisible Grills",
    tagline: "Modern protection with an unobstructed view",
    description:
      "Stainless steel cable invisible grills for balconies that provide strong security without blocking your view. Sleek, modern, and extremely durable.",
    longDescription:
      "Invisible grills use tensioned stainless steel cables run vertically or horizontally between top and bottom tracks, creating a nearly invisible barrier that is structurally superior to traditional iron grills. With a cable gap of just 75–100 mm, they meet all child safety standards while delivering a premium modern look that complements any apartment design. Kovai Safety Nets is one of the leading invisible grill installers in Coimbatore, serving residential and commercial clients.",
    benefits: [
      "Unobstructed panoramic views from your balcony",
      "Stronger than iron grills — 316-grade SS cables",
      "No rust, no paint, no maintenance required",
      "Child-safe: cable spacing complies with IS safety standards",
      "Increases property aesthetic and resale value",
      "Available in straight and curved rail profiles",
      "5-year structural warranty",
    ],
    materials: [
      {
        name: "SS 316 Wire Cables",
        detail: "Marine-grade 316 stainless steel, 3 mm diameter, 7×7 strand",
      },
      {
        name: "Aluminium Channel Track",
        detail:
          "Powder-coated aluminium top and bottom tracks, available in silver/black",
      },
      {
        name: "SS Turnbuckles",
        detail: "Stainless steel turnbuckles for precise cable tension adjustment",
      },
    ],
    installationSteps: [
      {
        step: "Measurement & Design",
        detail:
          "Precise measurements of height and width for track fabrication.",
      },
      {
        step: "Track Fixing",
        detail:
          "Aluminium tracks are anchored to top slab and floor with SS bolts.",
      },
      {
        step: "Cable Threading",
        detail:
          "Individual cables are threaded through track holes at 75 mm spacing.",
      },
      {
        step: "Tensioning & Finishing",
        detail:
          "Each cable is tensioned uniformly with turnbuckles; caps and covers are fitted.",
      },
    ],
    faqs: [
      {
        question: "Are invisible grills safe for children?",
        answer:
          "Yes. Our cable spacing of 75–100 mm prevents children from squeezing through, and each cable is rated for 300 kg tensile load.",
      },
      {
        question: "How do invisible grills differ from safety nets?",
        answer:
          "Invisible grills use rigid stainless steel cables and are permanent fixtures. Safety nets use flexible nylon and can be removed. Grills offer a cleaner aesthetic; nets offer full enclosure.",
      },
      {
        question: "Will invisible grills rust or corrode?",
        answer:
          "No. We use marine-grade SS 316 cables and powder-coated aluminium tracks — both are designed for outdoor use in humid climates.",
      },
      {
        question: "What is the price range for invisible grills in Coimbatore?",
        answer:
          "Pricing depends on balcony size and cable count. Contact us at 7708414857 for a free on-site measurement and quote.",
      },
    ],
    image: "/images/services/balcony-invisible-grills.webp",
    icon: "🔒",
    metaTitle:
      "Invisible Grills for Balcony in Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Premium stainless steel invisible grills in Coimbatore. Modern, rust-free balcony grills with unobstructed views. Child-safe, 5-year warranty. Call 7708414857.",
    keywords: [
      "invisible grills Coimbatore",
      "balcony invisible grills",
      "SS cable grills Coimbatore",
    ],
  },
  {
    slug: "staircase-safety-nets",
    title: "Staircase Safety Nets",
    shortTitle: "Staircase Nets",
    tagline: "Safe stairways for children and elderly",
    description:
      "Durable nylon safety nets installed along staircase banisters and open sides to prevent children and pets from falling through railings.",
    longDescription:
      "Open staircase railings are one of the most common accident spots in homes and apartment complexes. Our staircase safety nets are installed along the inner side of the banister and around any open voids, using a concealed stainless steel wire rope frame that is tensioned and fixed to the floor and ceiling. The net itself is fine-mesh nylon that is invisible from a few feet away yet strong enough to stop a toddler or pet from squeezing through. Ideal for duplex homes, villas, and apartment common staircases in Coimbatore.",
    benefits: [
      "Prevents toddlers from falling through stair railings",
      "Pets safely contained on their floor",
      "Fine mesh — does not affect airflow or light",
      "Minimal visual impact; net blends with railings",
      "Fast installation with minimal disruption",
      "Covers open risers and side voids",
      "Durable — handles impact without tearing",
    ],
    materials: [
      {
        name: "HDPE Net",
        detail: "0.8 mm thick high-density polyethylene, 25 mm × 25 mm mesh",
      },
      {
        name: "SS Wire Rope",
        detail: "3 mm SS 304 wire rope for the border frame",
      },
      {
        name: "Hook & Lace System",
        detail: "Stainless steel hooks with nylon lacing cord",
      },
    ],
    installationSteps: [
      {
        step: "Assessment",
        detail: "We map all open staircase sections and banister heights.",
      },
      {
        step: "Frame Installation",
        detail:
          "Wire rope is anchored at top, bottom, and intermediate points of the staircase.",
      },
      {
        step: "Net Fitting",
        detail: "Net is laced to wire rope frame and tensioned for zero sag.",
      },
      {
        step: "Edge Finishing",
        detail:
          "All exposed edges are covered with protective sleeves for a clean finish.",
      },
    ],
    faqs: [
      {
        question: "Can staircase nets be installed in apartments with marble railings?",
        answer:
          "Yes. We use non-invasive clamps for marble and glass railings to avoid drilling and damage.",
      },
      {
        question: "How do I clean the staircase safety net?",
        answer:
          "Simply wipe with a damp cloth. The net can also be removed, washed, and reinstalled in under an hour.",
      },
      {
        question: "Will the net sag over time?",
        answer:
          "No. We use a wire rope frame that maintains tension. The nylon net is attached under tension to prevent any sag.",
      },
    ],
    image: "/images/services/staircase-safety-nets.webp",
    icon: "🪜",
    metaTitle: "Staircase Safety Nets in Coimbatore | Kovai Safety Nets",
    metaDescription:
      "Staircase safety net installation in Coimbatore for homes and apartments. Prevents children and pets from falling through railings. Call 7708414857.",
    keywords: [
      "staircase safety nets Coimbatore",
      "staircase net installation",
      "banister safety net",
    ],
  },
  {
    slug: "apartment-safety-nets",
    title: "Apartment Safety Nets",
    shortTitle: "Apartment Nets",
    tagline: "Comprehensive apartment-wide safety net solutions",
    description:
      "Complete safety net installations for apartments covering balconies, windows, terraces, and common areas — one-stop solution for housing societies.",
    longDescription:
      "Apartment safety nets from Kovai Safety Nets offer a complete solution for housing complexes and multi-storey apartments in Coimbatore. We work directly with apartment associations and builders to cover all open areas — balconies, windows, terraces, swimming pool fencing, and play areas. Our team can handle bulk installations efficiently, offering discounted rates for full-complex projects. All installations comply with NBC (National Building Code) safety guidelines.",
    benefits: [
      "One vendor for the entire complex",
      "Bulk pricing for housing associations",
      "Covers balconies, windows, terraces, and common areas",
      "NBC-compliant installations",
      "Minimal disruption to residents",
      "Uniform appearance across the building facade",
      "Annual maintenance contracts available",
    ],
    materials: [
      {
        name: "UV-Stabilised HDPE Net",
        detail: "5-year UV warranty, available in multiple mesh sizes",
      },
      {
        name: "Galvanised Steel Frame",
        detail:
          "Hot-dip galvanised steel for long-term corrosion resistance on building exteriors",
      },
      {
        name: "SS Fasteners",
        detail: "Grade 304 stainless steel anchors, rated for 500 kg pull-out",
      },
    ],
    installationSteps: [
      {
        step: "Project Survey",
        detail:
          "Full building survey and floor-by-floor measurement of all open areas.",
      },
      {
        step: "Proposal & Approval",
        detail:
          "Detailed quotation with material specs submitted to the association committee.",
      },
      {
        step: "Phased Installation",
        detail:
          "Floor-by-floor installation with minimal corridor access requirements.",
      },
      {
        step: "Inspection & Handover",
        detail:
          "Final inspection of every unit and common area; completion report issued.",
      },
    ],
    faqs: [
      {
        question: "Do you offer group/bulk discounts for apartment complexes?",
        answer:
          "Yes. We offer significant discounts for housing association orders of 10 or more units. Contact us for a customised quote.",
      },
      {
        question: "Can you coordinate with our building management?",
        answer:
          "Absolutely. We work directly with facility managers and RWAs to schedule installation with minimum disruption to residents.",
      },
      {
        question: "Do you provide maintenance after installation?",
        answer:
          "Yes. We offer annual maintenance contracts (AMC) for apartment complexes covering inspection, repairs, and replacements.",
      },
    ],
    image: "/images/services/apartment-safety-nets.webp",
    icon: "🏢",
    metaTitle: "Apartment Safety Nets Coimbatore | Housing Complex Nets",
    metaDescription:
      "Complete apartment safety net solutions in Coimbatore for housing societies and complexes. Bulk pricing, NBC-compliant. Call 7708414857.",
    keywords: [
      "apartment safety nets Coimbatore",
      "housing complex safety nets",
      "apartment net installation",
    ],
  },
  {
    slug: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    shortTitle: "Industrial Nets",
    tagline: "Fall protection for construction and industrial sites",
    description:
      "Heavy-duty safety nets for construction sites, warehouses, factories, and industrial buildings to protect workers from fall hazards.",
    longDescription:
      "Industrial safety nets are a critical component of fall protection systems at construction sites, warehouses, and factories. Kovai Safety Nets supplies and installs EN 1263-certified safety nets for construction sites and custom-engineered nets for warehouses, sky-lights, and elevated working platforms. Our industrial nets are rated for personnel fall arrest (3 m fall clearance, 100 kN energy absorption) and comply with IS 11057 and NBC Part 7 requirements.",
    benefits: [
      "EN 1263 and IS 11057 compliant safety nets",
      "Personnel fall arrest rated — tested to 100 kN",
      "Fast installation by trained riggers",
      "Reduces insurance premiums with documented safety compliance",
      "Protects workers and tools from falls",
      "Can span large unsupported spans",
      "Reusable — can be relocated as construction progresses",
    ],
    materials: [
      {
        name: "Polypropylene (PP) Net",
        detail:
          "High-tenacity PP, 100 mm mesh, 4 mm knotted rope — IS 11057 grade",
      },
      {
        name: "Steel Safety Cables",
        detail:
          "12 mm wire rope perimeter rope for frame — load-tested to 150 kN",
      },
      {
        name: "Scaffold Tube Brackets",
        detail: "Hot-dip galvanised scaffold brackets for quick system-net connection",
      },
    ],
    installationSteps: [
      {
        step: "Risk Assessment",
        detail:
          "Site walk-through to identify fall hazard areas and calculate net system dimensions.",
      },
      {
        step: "Anchor Point Design",
        detail:
          "Engineer-certified anchor points calculated for fall loads and installed by riggers.",
      },
      {
        step: "Net Deployment",
        detail:
          "Safety net panels are joined, edge-rope threaded, and tensioned across anchor points.",
      },
      {
        step: "Pre-Use Inspection",
        detail:
          "Inspection certificate issued before site operatives work above the net.",
      },
    ],
    faqs: [
      {
        question: "What standards do your industrial safety nets meet?",
        answer:
          "Our nets comply with EN 1263-1 (European standard for safety nets) and IS 11057 (Indian standard). Installation follows NBC Part 7 fall protection guidelines.",
      },
      {
        question: "How often should industrial safety nets be inspected?",
        answer:
          "Safety nets should be visually inspected before each shift and formally inspected weekly by a competent person. We offer on-site inspection services.",
      },
      {
        question: "Can you supply nets for high-rise construction sites?",
        answer:
          "Yes. We have experience installing and managing safety net systems on high-rise projects in Coimbatore and nearby districts.",
      },
    ],
    image: "/images/services/industrial-safety-nets.webp",
    icon: "🏗️",
    metaTitle: "Industrial Safety Nets Coimbatore | Construction Fall Protection",
    metaDescription:
      "EN 1263-certified industrial safety nets for construction sites and factories in Coimbatore. Fall protection, IS 11057 compliant. Call 7708414857.",
    keywords: [
      "industrial safety nets Coimbatore",
      "construction safety nets",
      "fall protection nets",
    ],
  },
  {
    slug: "duct-area-safety-nets",
    title: "Duct Area Safety Nets",
    shortTitle: "Duct Area Nets",
    tagline: "Seal open building ducts safely and invisibly",
    description:
      "Safety nets for building ventilation shafts, air ducts, and open duct areas to prevent accidents and keep birds and rodents out.",
    longDescription:
      "Open duct shafts in apartment buildings and commercial properties are a major safety hazard — both for residents who may accidentally fall in and for pest infiltration. Kovai Safety Nets installs custom-fitted safety nets across the top of duct openings using a lightweight aluminium frame anchored to the duct walls. Our nets are UV-stabilised and weatherproof, designed to last outdoors even in rain and sun without sagging. We serve housing complexes and commercial properties across Coimbatore.",
    benefits: [
      "Prevents accidental falls into open duct shafts",
      "Keeps birds, rodents, and pigeons out of ducts",
      "Lightweight aluminium frame — no structural load on duct walls",
      "Weatherproof UV-stabilised net lasts 5+ years",
      "Improves hygiene and air quality in apartment ducts",
      "Fast installation — typically completed in a few hours per duct",
      "Available in custom sizes for any duct dimension",
    ],
    materials: [
      {
        name: "HDPE Fine Mesh Net",
        detail:
          "20 mm × 20 mm fine mesh to exclude birds while allowing airflow",
      },
      {
        name: "Aluminium Frame",
        detail: "Lightweight powder-coated aluminium channel frame",
      },
      {
        name: "SS Expansion Bolts",
        detail: "Stainless steel expansion anchors for duct wall fixing",
      },
    ],
    installationSteps: [
      {
        step: "Duct Survey",
        detail: "Measure each duct opening and assess wall anchor points.",
      },
      {
        step: "Frame Fabrication",
        detail: "Custom aluminium frame fabricated to exact duct dimensions.",
      },
      {
        step: "Frame & Net Installation",
        detail:
          "Frame is anchored to duct walls; net is fitted and tensioned within frame.",
      },
      {
        step: "Waterproofing",
        detail:
          "All anchor points sealed with weatherproof sealant to prevent water ingress.",
      },
    ],
    faqs: [
      {
        question: "Will the duct safety net restrict ventilation?",
        answer:
          "No. We use 20 mm mesh which allows full airflow while excluding birds and pests.",
      },
      {
        question: "Can duct nets be installed in existing buildings?",
        answer:
          "Yes. All our duct area nets are retro-fitted into existing buildings without structural modifications.",
      },
      {
        question: "How do I clean the duct safety net?",
        answer:
          "Annual hosing down from above is usually sufficient. We also offer cleaning as part of our maintenance contracts.",
      },
    ],
    image: "/images/services/duct-area-safety-nets.webp",
    icon: "🏛️",
    metaTitle: "Duct Area Safety Nets Coimbatore | Building Shaft Nets",
    metaDescription:
      "Safety nets for building duct shafts and ventilation areas in Coimbatore. Prevents falls and keeps birds out. Call 7708414857 for a free quote.",
    keywords: [
      "duct area safety nets Coimbatore",
      "building shaft safety nets",
      "duct net installation",
    ],
  },
  {
    slug: "pet-safety-nets",
    title: "Pet Safety Nets",
    shortTitle: "Pet Safety Nets",
    tagline: "Keep your pets safe and secure at home",
    description:
      "Specially designed safety nets for cat and dog owners to prevent pets from jumping off balconies, windows, and open areas in apartments.",
    longDescription:
      "Cats are notoriously curious and agile — they can squeeze through balcony railings and jump from surprising heights. Dogs can also panic and fall from open balconies. Our pet safety nets are designed with a finer mesh size (30 mm for cats, 50 mm for dogs) and stronger tensile strength to contain even the most determined pets. The net is non-toxic, soft, and will not injure your pet if they press against it. Kovai Safety Nets has installed pet nets for hundreds of cat and dog owners across Coimbatore.",
    benefits: [
      "Cat-proof 30 mm mesh — no escape gaps",
      "Soft nylon will not injure curious pets",
      "Full balcony coverage including the ceiling if needed",
      "Non-toxic, pet-safe materials throughout",
      "Quick removable design for cleaning access",
      "Invisible from street level — preserves apartment aesthetics",
      "Tested up to 50 kg impact load",
    ],
    materials: [
      {
        name: "Soft Nylon Pet Net",
        detail: "30 mm mesh for cats, 50 mm for dogs — UV-stabilised nylon",
      },
      {
        name: "SS Spring Hooks",
        detail: "Stainless steel spring hooks for removable installation",
      },
      {
        name: "Nylon Rope Border",
        detail: "Soft 6 mm nylon rope border; no sharp edges",
      },
    ],
    installationSteps: [
      {
        step: "Pet Type Assessment",
        detail:
          "We assess your pet size and behaviour to select the appropriate mesh size.",
      },
      {
        step: "Full Coverage Measurement",
        detail:
          "All gaps — sides, top, and bottom — are measured for complete enclosure.",
      },
      {
        step: "Net Installation",
        detail:
          "Net is anchored with SS hooks and laced tightly with no gaps greater than 30 mm.",
      },
      {
        step: "Safety Check",
        detail:
          "We inspect every corner and connection point before leaving the site.",
      },
    ],
    faqs: [
      {
        question: "Is the pet net strong enough to hold a large dog?",
        answer:
          "Yes. Our nets are rated for 50 kg impact load, suitable for most domestic dog breeds.",
      },
      {
        question: "Will my cat be able to scratch through the net?",
        answer:
          "No. The nylon mesh is abrasion-resistant and designed to withstand normal cat scratching behaviour.",
      },
      {
        question: "Can I remove the net when I want to use the balcony?",
        answer:
          "Yes. We install a removable panel system so you can take down and reinstall the net easily.",
      },
      {
        question: "Is the netting material safe if my pet chews on it?",
        answer:
          "The nylon material is non-toxic. However, we do not recommend the net as a chew toy — if your pet is a persistent chewer, a heavier-gauge net can be specified.",
      },
    ],
    image: "/images/services/pet-safety-nets.webp",
    icon: "🐾",
    metaTitle: "Pet Safety Nets in Coimbatore | Cat & Dog Safety Nets",
    metaDescription:
      "Pet safety nets for cats and dogs in Coimbatore apartments. Balcony and window safety nets that are soft, non-toxic, and escape-proof. Call 7708414857.",
    keywords: [
      "pet safety nets Coimbatore",
      "cat safety nets",
      "dog safety nets Coimbatore",
    ],
  },
  {
    slug: "child-safety-nets",
    title: "Child Safety Nets",
    shortTitle: "Child Safety Nets",
    tagline: "Extra protection for your most precious ones",
    description:
      "Heavy-duty safety nets for windows, balconies, and terraces specifically designed to protect toddlers and young children from falling hazards.",
    longDescription:
      "Young children are naturally fearless and explore their environment without an awareness of danger. Child safety nets from Kovai Safety Nets provide a strong, reliable barrier on balconies, windows, and open terraces that will stop even an actively pushing toddler. Our child nets use a smaller 25 mm mesh and are installed with a reinforced edge rope and additional intermediate tie-off points to prevent any localised bulging. We are trusted by hundreds of families across Coimbatore and surrounding areas.",
    benefits: [
      "25 mm fine mesh — no gaps for small hands or feet",
      "Reinforced edge rope and additional tie points",
      "Passes IS 1432 child restraint load test",
      "Soft finish — no sharp edges that could injure children",
      "Bright colour option available for child-friendly aesthetics",
      "Covers windows, balconies, and open terraces",
      "Non-toxic, CE-marked materials",
    ],
    materials: [
      {
        name: "Fine Mesh Nylon Net",
        detail: "25 mm × 25 mm mesh, 1.5 mm knotted nylon — child-safe specification",
      },
      {
        name: "Reinforced Edge Rope",
        detail: "8 mm braided polyester edge rope for extra strength",
      },
      {
        name: "Double-Lock SS Hooks",
        detail: "Stainless steel double-lock carabiner hooks at all anchor points",
      },
    ],
    installationSteps: [
      {
        step: "Hazard Assessment",
        detail:
          "We walk through the property and identify all fall risk areas for children.",
      },
      {
        step: "Custom Net Fabrication",
        detail:
          "Nets are cut and edge-roped to precise dimensions of each opening.",
      },
      {
        step: "High-Strength Installation",
        detail:
          "Double anchor points at all four corners and intermediate points every 500 mm.",
      },
      {
        step: "Child-Safety Inspection",
        detail:
          "We test for gaps, sag, and anchor strength before completing the installation.",
      },
    ],
    faqs: [
      {
        question: "How strong is the child safety net?",
        answer:
          "Our child safety nets are tested to IS 1432 standards and can withstand a 75 kg body-form impact without failure.",
      },
      {
        question: "Can my child grab and pull the net?",
        answer:
          "Yes — that is exactly the load case we design for. The net and anchors are rated for sustained pulling and pushing by children.",
      },
      {
        question: "Do you offer window safety nets for ground floor homes?",
        answer:
          "Yes. We install nets on windows of all floors — even ground floor windows to prevent children from climbing out.",
      },
    ],
    image: "/images/services/child-safety-nets.webp",
    icon: "👶",
    metaTitle: "Child Safety Nets Coimbatore | Baby Proofing Nets",
    metaDescription:
      "Child safety nets in Coimbatore for balconies, windows, and terraces. Fine 25 mm mesh, IS 1432 tested, non-toxic. Protect your toddler. Call 7708414857.",
    keywords: [
      "child safety nets Coimbatore",
      "baby proofing nets",
      "kids safety nets Coimbatore",
    ],
  },
  {
    slug: "monkey-safety-nets",
    title: "Monkey Safety Nets",
    shortTitle: "Monkey Nets",
    tagline: "Stop monkey intrusions at your home or business",
    description:
      "Robust anti-monkey nets for homes and commercial properties near forest areas and hillside localities in Coimbatore to prevent monkey entry and property damage.",
    longDescription:
      "Coimbatore is surrounded by forested areas and hillside communities like Kovaipudur and Vadavalli where monkey intrusions are a serious problem. Monkeys can enter kitchens through open windows, destroy property, and even attack residents. Kovai Safety Nets installs heavy-duty monkey-proof nets on windows, doors, balconies, and terraces using a steel cable frame and high-tenacity polypropylene net that can withstand the strength and persistence of macaque monkeys. Our nets are approved by wildlife protection guidelines — they deter without harming the animals.",
    benefits: [
      "Prevents monkey entry through windows, balconies, and doors",
      "Heavy-duty PP net — monkey-proof tested",
      "Steel cable frame withstands monkey weight and pulling",
      "Protects food, kitchens, and valuables from monkey raids",
      "Humane — deters without harming wildlife",
      "Ideal for hillside properties in Kovaipudur, Vadavalli, and Madukarai",
      "Long-lasting — 5-year outdoor warranty",
    ],
    materials: [
      {
        name: "High-Tenacity PP Net",
        detail:
          "Heavy-duty 50 mm mesh polypropylene, 5 mm knotted rope — monkey-resistant",
      },
      {
        name: "6 mm SS Wire Rope Frame",
        detail: "Stainless steel 304, 6 mm wire rope frame for high load resistance",
      },
      {
        name: "SS Thimbles & Clamps",
        detail: "Grade 304 SS thimbles and wire rope clamps for secure frame joints",
      },
    ],
    installationSteps: [
      {
        step: "Property Survey",
        detail:
          "Assessment of all entry points and monkey movement patterns.",
      },
      {
        step: "Frame Engineering",
        detail:
          "Heavy-duty wire rope frame designed to withstand repeated monkey loading.",
      },
      {
        step: "Net Installation",
        detail:
          "PP net laced to frame with no gaps and secured with locking carabiners.",
      },
      {
        step: "Perimeter Check",
        detail:
          "Full perimeter walk to ensure no accessible gaps remain.",
      },
    ],
    faqs: [
      {
        question: "Will monkey nets harm the monkeys?",
        answer:
          "No. Our nets are a physical barrier only — the animals are turned away without injury. We comply with the Wildlife Protection Act.",
      },
      {
        question: "How strong are monkey nets compared to pet nets?",
        answer:
          "Monkey nets use heavier 5 mm rope and a steel cable frame rated for significantly higher loads than standard pet nets.",
      },
      {
        question: "Which areas of Coimbatore need monkey nets most?",
        answer:
          "Hillside localities including Kovaipudur, Vadavalli, Madukarai, and areas adjacent to the Nilgiri Biosphere commonly face monkey intrusions.",
      },
    ],
    image: "/images/services/monkey-safety-nets.webp",
    icon: "🐒",
    metaTitle: "Monkey Nets in Coimbatore | Anti-Monkey Safety Nets",
    metaDescription:
      "Monkey-proof safety nets for homes near forest areas in Coimbatore. Heavy-duty PP nets to prevent monkey entry. Humane and effective. Call 7708414857.",
    keywords: [
      "monkey nets Coimbatore",
      "anti-monkey nets",
      "monkey safety nets Coimbatore",
    ],
  },
  {
    slug: "coconut-tree-safety-nets",
    title: "Coconut Tree Safety Nets",
    shortTitle: "Coconut Tree Nets",
    tagline: "Catch fallen coconuts before they cause accidents",
    description:
      "Specialised catch nets installed below coconut trees to prevent injury and property damage from falling coconuts in residential and commercial properties.",
    longDescription:
      "A falling coconut can cause serious injury or property damage. Properties with coconut trees — whether in compound walls, terraces, or nearby public areas — are at risk every time the wind blows or the tree is harvested. Kovai Safety Nets installs custom-fitted catch nets below the crown of coconut trees using a radial frame system anchored to the tree trunk. The net catches falling coconuts and other debris before they reach the ground. This service is popular in gated communities and commercial properties across Coimbatore.",
    benefits: [
      "Prevents injury from falling coconuts",
      "Protects parked vehicles, roofs, and walkways below trees",
      "Non-invasive — tree health is not affected",
      "Radial frame follows tree trunk shape",
      "Net collects coconuts for easy harvesting",
      "Works on single or multiple trees",
      "Low maintenance — seasonal inspection recommended",
    ],
    materials: [
      {
        name: "Heavy HDPE Net",
        detail: "75 mm mesh, 4 mm UV-stabilised HDPE rope for impact absorption",
      },
      {
        name: "Galvanised Steel Radial Frame",
        detail: "Hot-dip galvanised steel radial arms fitted around the trunk",
      },
      {
        name: "Tree-Friendly Clamps",
        detail:
          "Rubber-padded clamps to avoid bark damage on the tree trunk",
      },
    ],
    installationSteps: [
      {
        step: "Tree Assessment",
        detail:
          "Height, crown radius, and fruit load assessed to size the net system.",
      },
      {
        step: "Frame Assembly",
        detail:
          "Galvanised radial frame assembled and fitted around trunk at the frond base.",
      },
      {
        step: "Net Deployment",
        detail:
          "HDPE net spread across the frame and tensioned from the trunk outward.",
      },
      {
        step: "Anchoring",
        detail:
          "Outer net edge anchored with ground stakes or wall brackets as required.",
      },
    ],
    faqs: [
      {
        question: "Will the net harm my coconut tree?",
        answer:
          "No. We use rubber-padded clamps that protect the bark. The tree grows normally and can still be harvested.",
      },
      {
        question: "How often do I need to empty the net?",
        answer:
          "This depends on fruit load. During harvest season you may need to collect weekly; at other times, monthly checks are sufficient.",
      },
      {
        question: "Can you install nets for very tall coconut trees?",
        answer:
          "Yes. Our riggers are trained to work at height. We have installed nets on trees up to 30 feet tall.",
      },
    ],
    image: "/images/services/coconut-tree-safety-nets.webp",
    icon: "🌴",
    metaTitle: "Coconut Tree Safety Nets Coimbatore | Falling Coconut Protection",
    metaDescription:
      "Coconut tree safety nets in Coimbatore to catch falling coconuts and protect people and property. Non-invasive installation. Call 7708414857.",
    keywords: [
      "coconut tree safety nets Coimbatore",
      "falling coconut protection net",
      "coconut net installation",
    ],
  },
  {
    slug: "cloth-hangers",
    title: "Balcony Cloth Drying Hangers",
    shortTitle: "Cloth Hangers",
    tagline: "Smart space-saving solutions for drying clothes",
    description:
      "Wall-mounted and ceiling-mounted cloth drying hangers for balconies and terraces — rust-proof, durable, and space-efficient solutions for apartments.",
    longDescription:
      "Limited balcony space in modern apartments makes cloth drying a daily challenge. Kovai Safety Nets installs wall-mounted and ceiling-mounted cloth drying hanger systems that maximise your drying space without clutter. Our hangers are made from powder-coated mild steel or stainless steel rods, mounted on wall brackets or ceiling hooks with precision. We offer pull-out systems, fold-flat systems, and automated electric hangers for convenience. Popular across apartments in Coimbatore, our cloth hangers are designed to last for years without rusting.",
    benefits: [
      "Maximises limited balcony space",
      "Rust-proof powder-coated or SS material",
      "Pull-out and fold-flat systems available",
      "Can hold 15–25 kg of wet clothes",
      "Multiple rod configurations (4-rod, 6-rod, 8-rod)",
      "Works on both wall and ceiling mounting",
      "Easy to use — glide out, hang clothes, push back",
    ],
    materials: [
      {
        name: "MS Powder-Coated Rods",
        detail:
          "25 mm diameter mild steel rods, powder-coated in white/grey — standard option",
      },
      {
        name: "SS 304 Rods",
        detail: "25 mm SS 304 rods — premium rust-proof option for coastal areas",
      },
      {
        name: "Wall/Ceiling Brackets",
        detail: "Heavy-gauge MS or SS brackets with epoxy anchor bolts",
      },
    ],
    installationSteps: [
      {
        step: "Space Assessment",
        detail:
          "We assess your balcony dimensions and suggest the best hanger configuration.",
      },
      {
        step: "Bracket Fixing",
        detail:
          "Brackets are anchored to the wall or ceiling slab with epoxy bolts.",
      },
      {
        step: "Hanger Assembly",
        detail:
          "Rods are assembled onto brackets and tested for smooth operation.",
      },
      {
        step: "Demo & Handover",
        detail:
          "We demonstrate the pull-out / fold mechanism and hand over care instructions.",
      },
    ],
    faqs: [
      {
        question: "How many clothes can the hanger hold?",
        answer:
          "Our standard 6-rod system can hold up to 20 kg of wet clothes — equivalent to a full washing machine load.",
      },
      {
        question: "Will the hanger rust in rainy weather?",
        answer:
          "Our standard option uses powder-coated mild steel which resists normal rain. For heavy coastal humidity, we recommend the SS 304 rod upgrade.",
      },
      {
        question: "Can you install hangers on a false ceiling?",
        answer:
          "Yes, but we install them through the false ceiling into the actual slab for structural strength.",
      },
    ],
    image: "/images/services/cloth-hangers.webp",
    icon: "👕",
    metaTitle: "Cloth Drying Hangers Coimbatore | Balcony Hanger Installation",
    metaDescription:
      "Balcony cloth drying hanger installation in Coimbatore. Wall-mounted and ceiling-mounted rust-proof hangers for apartments. Call 7708414857 for a free quote.",
    keywords: [
      "cloth hangers Coimbatore",
      "balcony cloth drying hanger",
      "cloth drying stand installation",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
