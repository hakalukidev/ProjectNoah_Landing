import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { ContactBrief } from "@/components/sections/contact-brief";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { company } from "@/lib/site-config";
import { getContactInfo } from "@/lib/server/contact";
import {
  contactAddressFull,
  contactWhatsappLink,
} from "@/lib/server/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Send ${company.legalName} (UEN ${company.uen}) a short project brief, or call, WhatsApp or email us directly - we reply within one business day.`,
};

/** The three things that happen after a brief lands, so a visitor knows
    exactly what they're signing up for before filling anything in. */
const NEXT_STEPS = [
  {
    step: "01",
    text: "Fill in a short brief. Takes about 2 minutes.",
  },
  {
    step: "02",
    text: "We review it and get back to you within one business day.",
  },
  {
    step: "03",
    text: "Site survey, then an itemised quotation with scope locked before works start.",
  },
];

const TRADES = [
  "Roofing",
  "Canopies",
  "Steel",
  "Glass & Aluminium",
  "ACP Cladding",
  "Waterproofing",
];

export default async function ContactPage() {
  const contact = await getContactInfo();

  const SOCIALS = [
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      href: contactWhatsappLink(contact.whatsapp),
    },
    { icon: YoutubeIcon, label: "YouTube", href: contact.social.youtube },
    { icon: FacebookIcon, label: "Facebook", href: contact.social.facebook },
    {
      icon: InstagramIcon,
      label: "Instagram",
      href: contact.social.instagram,
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Header contact={contact} />

      <main className="flex flex-1 flex-col">
        {/* Split layout - pitch on the left, brief form on the right. The
            lg gradient paints the right half a shade cooler so the form card
            reads as its own panel without a hard container edge. */}
        <section
          id="contact-form"
          className="scroll-mt-30 bg-background py-14 sm:py-20 lg:bg-[linear-gradient(to_right,var(--background)_50%,var(--surface-alt)_50%)]"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-8">
            {/* Left - pitch, process and credentials */}
            <div className="flex flex-col lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={260}
                  height={255}
                  className="h-12 w-12 object-contain"
                />
                <div className="border-l border-border pl-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Registered in Singapore
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <ShieldCheck className="size-4 text-primary" />
                    ACRA · UEN {company.uen} · Since 2008
                  </p>
                </div>
              </div>

              <h1 className="mt-8 max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                Let&apos;s build the structure your site{" "}
                <span className="italic text-primary">actually needs</span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tell us what you&apos;re building - or what&apos;s leaking.
                We&apos;ll take it from there.
              </p>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  What Happens Next
                </p>

                <ol className="mt-5 flex flex-col">
                  {NEXT_STEPS.map(({ step, text }) => (
                    <li
                      key={step}
                      className="flex items-start gap-4 border-t border-border py-4 last:border-b"
                    >
                      <span className="text-xs font-bold tracking-widest text-primary">
                        {step}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/80">
                        {text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Credentials panel - the reassurance block that sits where a
                  testimonial would, built from facts on the ACRA record
                  rather than borrowed praise. */}
              <div className="mt-10 border border-border bg-neutral-50 p-6">
                <p className="text-sm leading-relaxed text-foreground/80">
                  One accountable contractor from site survey to handover -
                  no chasing subcontractors, no gaps between trades. Every
                  phase is signed off against BCA and workplace safety
                  standards.
                </p>

                <dl className="mt-5 grid grid-cols-3 gap-px border-t border-border bg-border pt-px">
                  {[
                    { value: `${company.yearsInOperation}+`, label: "Years in operation" },
                    { value: "11", label: "Trades in-house" },
                    { value: "1 day", label: "Typical reply time" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-neutral-50 pt-5">
                      <dt className="text-2xl font-extrabold tracking-tight text-foreground">
                        {value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Work We Take On
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {TRADES.map((trade) => (
                    <span
                      key={trade}
                      className="text-sm font-bold tracking-tight text-foreground/45"
                    >
                      {trade}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      title={label}
                      className="flex size-10 shrink-0 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - the brief form / direct-contact card */}
            <ContactBrief contact={contact} />
          </div>
        </section>

        {/* Map - full width, at the end of the page */}
        <section className="border-t border-border bg-background py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Find Us
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Our Location
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
              {contactAddressFull(contact.address)}
            </p>

            <div className="mt-8 overflow-hidden border border-border shadow-sm">
              <iframe
                title="Registered office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  contactAddressFull(contact.address)
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full sm:h-[480px]"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer contact={contact} />
    </div>
  );
}
