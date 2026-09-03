import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { ImageProtection } from "@/components/site/image-protection";
import { VisitTracker } from "@/components/site/visit-tracker";
import { WhatsappButton } from "@/components/site/whatsapp-button";
import { company } from "@/lib/site-config";
import { getContactInfo, contactWhatsappLink } from "@/lib/server/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Handwritten script used for the accent line in the hero heading
// ("To Last"). Only the bold weight is loaded - it's a display accent, never
// body copy.
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const mirandaSans = localFont({
  src: "./fonts/miranda-sans-variable.woff2",
  variable: "--font-miranda-sans",
  weight: "400 700",
  display: "swap",
});

const SITE_URL = "https://www.projectnoah.com.sg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.brandName} Pte Ltd | Singapore Construction & Project Management`,
    template: `%s | ${company.brandName} Pte Ltd`,
  },
  description: `${company.legalName} (UEN ${company.uen}) delivers end-to-end construction and project management solutions engineered for speed, safety, and precision. Singapore-registered since ${company.incorporationDateLabel}.`,
  keywords: [
    "Project Noah",
    "Project Noah Pte Ltd",
    "Singapore construction company",
    "building construction Singapore",
    "design and build Singapore",
    "A&A works Singapore",
  ],
  authors: [{ name: company.legalName }],
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: `${company.brandName} Pte Ltd`,
    title: `${company.brandName} Pte Ltd | Singapore Construction & Project Management`,
    description: `Singapore-registered construction and project management (UEN ${company.uen}), delivering since ${company.incorporationDateLabel}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.brandName} Pte Ltd | Singapore Construction & Project Management`,
    description: `Singapore-registered construction and project management (UEN ${company.uen}), delivering since ${company.incorporationDateLabel}.`,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const contact = await getContactInfo();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mirandaSans.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <ImageProtection />
        <VisitTracker />
        <WhatsappButton whatsappLink={contactWhatsappLink(contact.whatsapp)} />
      </body>
    </html>
  );
}
