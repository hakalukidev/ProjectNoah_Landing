import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { WhatsappButton } from "@/components/site/whatsapp-button";
import { company } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
