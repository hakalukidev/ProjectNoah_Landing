export const siteConfig = {
  name: "Noah Construction",
  shortName: "Noah",
  tagline: "Building Tomorrow, Today",
  description:
    "Noah Construction is a full-service design-and-build contractor delivering commercial, residential and roofing projects across Singapore — on time, on budget, built to last.",
  url: "https://www.noahconstruction.sg",
  ogImage: "/og-image.jpg",
  founded: 2013,
  yearsOfExcellence: new Date().getFullYear() - 2013,
  phone: "+65 6123 4567",
  phoneHref: "tel:+6561234567",
  whatsapp: "+65 8123 4567",
  whatsappHref: "https://wa.me/6581234567",
  email: "info@noahconstruction.sg",
  address: {
    line1: "21 Tuas Avenue 8, #04-15",
    line2: "Singapore 639231",
    full: "21 Tuas Avenue 8, #04-15, Singapore 639231",
  },
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
  social: {
    facebook: "https://facebook.com/noahconstruction",
    instagram: "https://instagram.com/noahconstruction",
    linkedin: "https://linkedin.com/company/noahconstruction",
    youtube: "https://youtube.com/@noahconstruction",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Coverage", href: "#coverage" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroHighlights = [
  { title: "Free Site Visit", icon: "MapPinned" },
  { title: "Budget Friendly", icon: "HandCoins" },
  { title: "Premium Materials", icon: "ShieldCheck" },
  { title: "Expert Installation", icon: "HardHat" },
] as const;

export const services = [
  {
    id: "design-build",
    number: "01",
    title: "Design & Build",
    icon: "Compass",
    description:
      "End-to-end design and construction under one roof — from concept sketches and permits to a finished, move-in-ready structure.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "commercial",
    number: "02",
    title: "Commercial Development",
    icon: "Building2",
    description:
      "Offices, retail units and industrial facilities engineered for durability, efficiency and a strong first impression.",
    image:
      "https://images.unsplash.com/photo-1462206092226-f46025ffe607?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "residential",
    number: "03",
    title: "Residential Development",
    icon: "Home",
    description:
      "Landed homes, condominiums and interior renovations built around how you actually live, with meticulous attention to finishing.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "roofing",
    number: "04",
    title: "Roofing & Canopy Solutions",
    icon: "Umbrella",
    description:
      "Custom metal roofing, canopies and car-porch shelters that stand up to Singapore's weather while looking sharp doing it.",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "renovation",
    number: "05",
    title: "Renovation & Fit-Out",
    icon: "Hammer",
    description:
      "Full-scale reinstatement, A&A works and interior fit-outs delivered with minimal disruption to your operations or household.",
    image:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "project-management",
    number: "06",
    title: "Project Management",
    icon: "ClipboardCheck",
    description:
      "Dedicated project managers coordinating consultants, subcontractors and timelines so your build stays on schedule and on budget.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80&auto=format&fit=crop",
  },
] as const;

export const projects = [
  {
    id: "hillview-residence",
    title: "Hillview Residence",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
    map: { x: 24, y: 32 },
  },
  {
    id: "tanjong-business-hub",
    title: "Tanjong Business Hub",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1200&q=80&auto=format&fit=crop",
    map: { x: 70, y: 24 },
  },
  {
    id: "serangoon-car-porch",
    title: "Serangoon Car Porch",
    category: "Roofing",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=80&auto=format&fit=crop",
    map: { x: 80, y: 58 },
  },
  {
    id: "yishun-industrial-facility",
    title: "Yishun Industrial Facility",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80&auto=format&fit=crop",
    map: { x: 38, y: 14 },
  },
  {
    id: "clementi-landed-home",
    title: "Clementi Landed Home",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop",
    map: { x: 14, y: 68 },
  },
  {
    id: "punggol-canopy-walk",
    title: "Punggol Canopy Walkway",
    category: "Roofing",
    image:
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1200&q=80&auto=format&fit=crop",
    map: { x: 62, y: 78 },
  },
] as const;

export const coverageAreas = [
  {
    id: "residential",
    title: "Residential Coverage",
    description:
      "Landed homes, condominiums and interior renovations island-wide — from Woodlands to Pasir Ris.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "commercial",
    title: "Commercial & Industrial Coverage",
    description:
      "Offices, retail fit-outs and industrial facilities across every planning region in Singapore.",
    image:
      "https://images.unsplash.com/photo-1462206092226-f46025ffe607?w=1200&q=80&auto=format&fit=crop",
  },
] as const;

export const certifications = [
  { name: "ISO 9001:2015", description: "Quality Management" },
  { name: "BCA Registered", description: "Contractor Grade A2" },
  { name: "bizSAFE Level 3", description: "Workplace Safety" },
  { name: "NEA Licensed", description: "Environmental Compliance" },
  { name: "ISO 45001", description: "Occupational Health & Safety" },
] as const;

export const clients = [
  "Skyline Holdings",
  "Meridian Property Group",
  "Harborview Developers",
  "Northgate Industries",
  "Crestwood Estates",
  "Silverline Retail",
  "Anchorpoint Logistics",
  "Bayfront Ventures",
] as const;
