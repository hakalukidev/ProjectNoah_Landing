import {
  FileSignature,
  HardHat,
  KeyRound,
  Leaf,
  MessageSquare,
  ShieldCheck,
  Timer,
} from "lucide-react";

/**
 * Company facts sourced from ACRA / Singapore's public business registry
 * (sgpbusiness.com company profile for PROJECT NOAH PTE. LTD.).
 */
export const company = {
  legalName: "PROJECT NOAH PTE. LTD.",
  brandName: "Project Noah",
  uen: "200807961Z",
  entityType: "Exempt Private Company Limited by Shares",
  status: "Live",
  incorporationDate: "2008-04-23",
  incorporationDateLabel: "23 April 2008",
  countryOfIncorporation: "Singapore",
  address: {
    line1: "1 Soon Lee Street",
    line2: "#05-61 Pioneer Centre",
    postalCode: "Singapore 627605",
    full: "1 Soon Lee Street, #05-61 Pioneer Centre, Singapore 627605",
  },
  primaryActivity: "Building Construction (n.e.c.)",
  secondaryActivity: "Job Training & Vocational Rehabilitation Services",
  phone: "+65 9645 8471",
  whatsapp: "6596458471",
  email: "enquiries@projectnoah.com.sg",
  yearsInOperation: new Date().getFullYear() - 2008,
} as const;

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@ProjectNoahPTE",
  facebook:
    "https://www.facebook.com/profile.php?id=61591652714784&sk=followers",
  instagram: "https://www.instagram.com/noah200807961z/",
  whatsapp: `https://wa.me/${company.whatsapp}`,
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const SERVICE_CATEGORIES = [
  { slug: "roofing-shelter", label: "Roofing Services" },
  { slug: "steel-fabrication", label: "Steel Services" },
  { slug: "facade-renovation", label: "Glass Services" },
] as const;

export const SERVICES = [
  {
    slug: "roofing-systems",
    category: "roofing-shelter",
    image: "/services/roofing-systems.png",
    title: "Roofing Systems",
    description:
      "Design, supply and installation of roofing systems for industrial, commercial and residential buildings, built for Singapore's climate.",
  },
  {
    slug: "canopy-shelter",
    category: "roofing-shelter",
    image: "/services/canopy-shelter.png",
    title: "Roofing Canopy & Shelter",
    description:
      "Walkway canopies, carpark shelters and loading-bay covers engineered and installed for durability and weatherproofing.",
  },
  {
    slug: "awning-solutions",
    category: "roofing-shelter",
    image: "/services/awning-solutions.png",
    title: "Roofing Awnings",
    description:
      "Custom awnings for shopfronts, windows and outdoor areas, fabricated to spec and installed with minimal disruption.",
  },
  {
    slug: "steel-metal-fabrication",
    category: "steel-fabrication",
    image: "/services/steel-metal-fabrication.png",
    title: "Steel Fabrication",
    description:
      "In-house fabrication of steel and metal components, from brackets and frames to full structural assemblies.",
  },
  {
    slug: "structural-steel-works",
    category: "steel-fabrication",
    image: "/services/structural-steel-works.png",
    title: "Steel Structural Works",
    description:
      "Structural steel erection and reinforcement for new builds and additions, engineered to code and site-supervised.",
  },
  {
    slug: "glass-aluminium-works",
    category: "facade-renovation",
    image: "/services/glass-aluminium-works.png",
    title: "Glass & Aluminium",
    description:
      "Glass panelling, aluminium framing and curtain wall works for facades, windows and partitions.",
  },
  {
    slug: "acp-cladding",
    category: "facade-renovation",
    image: "/services/acp-cladding.png",
    title: "Glass ACP Cladding",
    description:
      "Aluminium Composite Panel (ACP) cladding installation for building facades, giving a durable, modern finish.",
  },
  {
    slug: "waterproofing-roof-repairs",
    category: "roofing-shelter",
    image: "/services/waterproofing-roof-repairs.png",
    title: "Roofing Waterproofing & Repairs",
    description:
      "Leak detection, membrane waterproofing and roof repair works that protect the building envelope long-term.",
  },
  {
    slug: "gutter-drainage-systems",
    category: "roofing-shelter",
    image: "/services/gutter-drainage-systems.png",
    title: "Roofing Gutter & Drainage",
    description:
      "Gutter, downpipe and drainage installation and repair to keep rainwater managed and structures protected.",
  },
  {
    slug: "custom-fabrication",
    category: "steel-fabrication",
    image: "/services/custom-fabrication.png",
    title: "Steel Custom Fabrication",
    description:
      "One-off fabrication and installation work scoped to a client's specific structural or architectural requirement.",
  },
  {
    slug: "renovation-maintenance",
    category: "facade-renovation",
    image: "/services/renovation-maintenance.png",
    title: "Glass Renovation & Maintenance",
    description:
      "Ongoing renovation, repair and maintenance services so buildings and installed works stay in top condition.",
  },
];

export const BENEFITS = [
  {
    icon: Timer,
    title: "Save Time",
    description:
      "A single accountable contractor from tender to handover means fewer handoffs, faster approvals and no lost time chasing subcontractors.",
  },
  {
    icon: ShieldCheck,
    title: "Top Quality & Reliability",
    description:
      "Every phase is signed off against BCA and workplace safety standards before the next trade moves in. Quality checked, not assumed.",
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    description:
      "Materials and methods chosen to reduce embodied carbon and long-term operating costs, in line with Singapore's Green Mark direction.",
  },
  {
    icon: HardHat,
    title: "Risk Reduction",
    description:
      "18+ years operating as a Singapore-registered entity (UEN 200807961Z), with trained crews and documented safety procedures on every site.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We meet on site or virtually to understand scope, budget and timeline before a single drawing is made.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Proposal & Contract",
    description:
      "A itemised quotation and construction programme are issued for sign-off, with scope locked before mobilisation.",
    icon: FileSignature,
  },
  {
    step: "03",
    title: "Construction",
    description:
      "Our site team executes against the programme with weekly progress reporting and safety walk-throughs.",
    icon: HardHat,
  },
  {
    step: "04",
    title: "Handover",
    description:
      "Final inspection, as-built documentation and defect rectification close out the contract, on schedule.",
    icon: KeyRound,
  },
];

/**
 * Short-form category labels used for the Projects page tabs and each
 * project's `category` field below - must match exactly, or a tab will
 * always render "No projects in this category yet."
 */
export const PROJECT_CATEGORIES = ["All", "Roofing", "Steel", "Glass"] as const;

export const PROJECTS = [
  {
    slug: "frameless-glass-roof",
    title: "Frameless Glass Roof Installation",
    category: "Roofing",
    location: "Pioneer Sector, Singapore",
    year: "2024",
    /** Static file under public/projects - not the admin-managed gallery. */
    image: "/projects/glass1.jpeg",
    description:
      "Design and installation of a frameless faceted glass roof for a private residence, engineered for clean sightlines and full weather sealing.",
  },
  {
    slug: "commercial-walkway-canopy",
    title: "Commercial Walkway Canopy",
    category: "Steel",
    location: "Tanjong Pagar, Singapore",
    year: "2023",
    image: "/projects/steel3.jpeg",
    description:
      "Fabrication and installation of a large steel-and-glass walkway canopy connecting blocks at commercial scale.",
  },
  {
    slug: "landed-home-facade-canopy",
    title: "Landed Home Facade & Canopy",
    category: "Glass",
    location: "Woodlands, Singapore",
    year: "2023",
    image: "/projects/glass2.jpeg",
    description:
      "Pergola and rooftop glass canopy integrated into a landed home's facade as part of a full renovation.",
  },
  {
    slug: "outdoor-pergola-deck",
    title: "Outdoor Pergola & Deck Shelter",
    category: "Roofing",
    location: "Jurong, Singapore",
    year: "2022",
    image: "/projects/roof1.jpeg",
    description:
      "Louvred pergola roof and deck built over an outdoor terrace, giving year-round shelter for outdoor entertaining.",
  },
  {
    slug: "inter-block-canopy-walkway",
    title: "Inter-Block Canopy Walkway",
    category: "Steel",
    location: "Pioneer, Singapore",
    year: "2022",
    image: "/projects/steel2.jpeg",
    description:
      "Steel-framed glass canopy walkway fabricated and installed between blocks, weatherproofing the connecting path.",
  },
  {
    slug: "high-rise-balcony-enclosure",
    title: "High-Rise Balcony Enclosure",
    category: "Glass",
    location: "Punggol, Singapore",
    year: "2021",
    image: "/projects/glass3.jpeg",
    description:
      "Balcony enclosure works for a high-rise residential unit, adding usable space with a clear skyline view.",
  },
];

/**
 * Extra site photos not tied to a specific project card - shown in the
 * "Photos From Our Sites" gallery. Static files under public/projects
 * (not the admin-managed gallery in data/images.json). Empty for now -
 * the placeholder AI-generated set was removed; real site photos go
 * through the admin gallery upload instead (which auto-watermarks them),
 * or can be re-added here once real files land in public/projects.
 */
export const SITE_PHOTOS: {
  id: string;
  categoryId: string;
  src: string;
  caption: string;
  width: number;
  height: number;
}[] = [];

export const FAQS = [
  {
    question: "Is Project Noah Pte Ltd a registered company in Singapore?",
    answer:
      "Yes. Project Noah Pte Ltd (UEN 200807961Z) is an Exempt Private Company Limited by Shares, incorporated in Singapore on 23 April 2008 and registered with ACRA.",
  },
  {
    question: "What is your registered business activity?",
    answer:
      "Our principal activity on record is Building Construction (n.e.c.), with Job Training & Vocational Rehabilitation Services registered as a secondary activity.",
  },
  {
    question: "Do you handle both new builds and renovation works?",
    answer:
      "Yes, we take on ground-up construction as well as addition & alteration (A&A), retrofitting and fit-out works for existing buildings.",
  },
  {
    question: "What trades do you specialise in?",
    answer:
      "Roofing, canopy & shelter installation, awnings, steel & metal fabrication, structural steel works, glass & aluminium works, ACP cladding, waterproofing, and gutter & drainage systems, plus custom fabrication and ongoing renovation & maintenance.",
  },
  {
    question: "How is a project typically scoped and priced?",
    answer:
      "After an initial site consultation we issue an itemised quotation and construction programme, so scope and cost are agreed before mobilisation begins.",
  },
  {
    question: "Where is Project Noah based?",
    answer:
      "Our registered office is at 1 Soon Lee Street, #05-61 Pioneer Centre, Singapore 627605, and we deliver projects island-wide.",
  },
];
