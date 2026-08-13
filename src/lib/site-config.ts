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
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const SERVICES = [
  {
    image: "/services/roofing-systems.png",
    title: "Roofing Systems",
    description:
      "Design, supply and installation of roofing systems for industrial, commercial and residential buildings, built for Singapore's climate.",
  },
  {
    image: "/services/canopy-shelter.png",
    title: "Canopy & Shelter Installation",
    description:
      "Walkway canopies, carpark shelters and loading-bay covers engineered and installed for durability and weatherproofing.",
  },
  {
    image: "/services/awning-solutions.png",
    title: "Awning Solutions",
    description:
      "Custom awnings for shopfronts, windows and outdoor areas, fabricated to spec and installed with minimal disruption.",
  },
  {
    image: "/services/steel-metal-fabrication.png",
    title: "Steel & Metal Fabrication",
    description:
      "In-house fabrication of steel and metal components, from brackets and frames to full structural assemblies.",
  },
  {
    image: "/services/structural-steel-works.png",
    title: "Structural Steel Works",
    description:
      "Structural steel erection and reinforcement for new builds and additions, engineered to code and site-supervised.",
  },
  {
    image: "/services/glass-aluminium-works.png",
    title: "Glass & Aluminium Works",
    description:
      "Glass panelling, aluminium framing and curtain wall works for facades, windows and partitions.",
  },
  {
    image: "/services/acp-cladding.png",
    title: "ACP Cladding",
    description:
      "Aluminium Composite Panel (ACP) cladding installation for building facades, giving a durable, modern finish.",
  },
  {
    image: "/services/waterproofing-roof-repairs.png",
    title: "Waterproofing & Roof Repairs",
    description:
      "Leak detection, membrane waterproofing and roof repair works that protect the building envelope long-term.",
  },
  {
    image: "/services/gutter-drainage-systems.png",
    title: "Gutter & Drainage Systems",
    description:
      "Gutter, downpipe and drainage installation and repair to keep rainwater managed and structures protected.",
  },
  {
    image: "/services/custom-fabrication.png",
    title: "Custom Fabrication & Installation",
    description:
      "One-off fabrication and installation work scoped to a client's specific structural or architectural requirement.",
  },
  {
    image: "/services/renovation-maintenance.png",
    title: "Renovation & Maintenance Services",
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

export const PROJECT_CATEGORIES = [
  "All",
  "Industrial",
  "Commercial",
  "Institutional",
  "A&A Works",
] as const;

export const PROJECTS = [
  {
    slug: "pioneer-industrial-facility",
    title: "Pioneer Industrial Facility",
    category: "Industrial",
    location: "Pioneer Sector, Singapore",
    year: "2024",
    description:
      "Ground-up construction of a multi-storey industrial facility with integrated loading bays and workshop floors.",
  },
  {
    slug: "tanjong-pagar-office-fitout",
    title: "Commercial Office Fit-Out",
    category: "Commercial",
    location: "Tanjong Pagar, Singapore",
    year: "2023",
    description:
      "Full interior fit-out and M&E coordination for a Grade A office floor, delivered in a live building.",
  },
  {
    slug: "woodlands-training-centre",
    title: "Vocational Training Centre",
    category: "Institutional",
    location: "Woodlands, Singapore",
    year: "2023",
    description:
      "Purpose-built training centre supporting workforce upskilling programmes, from structure to specialised workshop bays.",
  },
  {
    slug: "jurong-warehouse-extension",
    title: "Warehouse Extension & Reinforcement",
    category: "A&A Works",
    location: "Jurong, Singapore",
    year: "2022",
    description:
      "Structural reinforcement and floor-area extension to an operating warehouse, sequenced around client operations.",
  },
  {
    slug: "pioneer-centre-upgrading",
    title: "Facility Upgrading Works",
    category: "A&A Works",
    location: "Pioneer, Singapore",
    year: "2022",
    description:
      "Mechanical, electrical and structural upgrading of an existing industrial building to extend its operating life.",
  },
  {
    slug: "punggol-institutional-block",
    title: "Institutional Building Block",
    category: "Institutional",
    location: "Punggol, Singapore",
    year: "2021",
    description:
      "Design & build delivery of a low-rise institutional block, coordinated with authority submissions throughout.",
  },
];

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
