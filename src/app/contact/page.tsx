import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { ContactForm } from "@/components/sections/contact-form";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { Badge } from "@/components/ui/badge";
import { company } from "@/lib/site-config";
import { getContactInfo } from "@/lib/server/contact";
import {
  contactAddressFull,
  contactWhatsappLink,
} from "@/lib/server/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${company.legalName} (UEN ${company.uen}) - call, WhatsApp, email or visit our Pioneer office, or send your site details through the form.`,
};

export default async function ContactPage() {
  const contact = await getContactInfo();

  const CONTACT_DETAILS = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: `${contact.address.line1}, ${contact.address.line2}, Singapore ${contact.address.postalCode}`,
      href: `https://www.google.com/maps?q=${encodeURIComponent(
        contactAddressFull(contact.address)
      )}`,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Fri, 9:00 AM - 6:00 PM",
      href: undefined,
    },
  ];

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

  const QUICK_ACTIONS = [
    {
      icon: Phone,
      label: "Call Us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: WhatsappIcon,
      label: "WhatsApp Us",
      value: "Chat with our team",
      href: contactWhatsappLink(contact.whatsapp),
    },
    {
      icon: Mail,
      label: "Email Us",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Header contact={contact} />

      <main className="flex flex-1 flex-col">
        {/* Cover - fixed min-height matched with the About and Projects
            covers, so all three page banners hold the same height
            regardless of how much copy each carries. */}
        <section className="relative flex min-h-[420px] items-center overflow-hidden bg-neutral-950 py-10 text-white sm:min-h-[480px] sm:py-14 lg:min-h-[520px]">
          <Image
            src="/contact-hero.jpg"
            alt="Interior view of a glass-and-steel roof canopy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/25" />

          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              Let&apos;s Talk About Your Next Build
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Call, WhatsApp, email or visit our Pioneer office - or send your
              site details below and {company.legalName} will reply within
              one business day.
            </p>
          </div>
        </section>

        {/* Quick actions */}
        <section className="border-b border-border bg-white py-14 sm:py-16">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-3 lg:px-8">
            {QUICK_ACTIONS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group flex items-center gap-4 border border-border bg-card p-6 shadow-sm transition-colors duration-200 hover:border-primary hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-none border border-border text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary/5">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact info, address, map + message form */}
        <section
          id="contact-form"
          className="border-t border-border bg-neutral-50 py-20 scroll-mt-30 sm:py-28"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="flex flex-col gap-10">
              <div>
                <Badge
                  variant="outline"
                  className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
                >
                  Get in Touch
                </Badge>
                <h2 className="mt-5 max-w-lg text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Visit Us or Send a Message
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Reach us directly, or drop your site details in the form
                  and we&apos;ll reply within one business day.
                </p>
              </div>

              {/* Contact details - same document-panel system as the About
                  page (dark header bar + hairline-divided cells via the
                  gap-px/bg-border trick) for a consistent look site-wide. */}
              <div className="overflow-hidden border border-border bg-white shadow-sm">
                <div className="border-b border-border bg-neutral-950 px-6 py-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Contact Details
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
                  {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                    <div
                      key={label}
                      className="group flex items-start gap-3 bg-white p-5 transition-colors hover:bg-neutral-50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-4.5" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium text-foreground">
                          {href ? (
                            <a
                              href={href}
                              target={
                                href.startsWith("http") ? "_blank" : undefined
                              }
                              rel={
                                href.startsWith("http")
                                  ? "noreferrer noopener"
                                  : undefined
                              }
                              className="transition-colors hover:text-primary"
                            >
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Follow Us
                </p>
                <div className="mt-3 flex gap-3">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-none border border-border bg-white text-foreground/80 shadow-sm transition-colors duration-200 hover:border-primary hover:text-primary"
                    >
                      <Icon className="size-5.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm recipientEmail={contact.email} />
          </div>
        </section>

        {/* Map - full width, at the end of the page */}
        <section className="border-t border-border bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <Badge
              variant="outline"
              className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              Find Us
            </Badge>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Our Location
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              {contactAddressFull(contact.address)}
            </p>

            <div className="mt-10">
              <div className="overflow-hidden border border-border shadow-sm">
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
          </div>
        </section>
      </main>

      <Footer contact={contact} />
    </div>
  );
}
