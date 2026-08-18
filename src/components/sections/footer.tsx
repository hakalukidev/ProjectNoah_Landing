import Link from "next/link";

import { Logo } from "@/components/site/logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { NAV_LINKS, company } from "@/lib/site-config";
import type { ContactInfo } from "@/lib/server/contact";
import { contactAddressFull, contactWhatsappLink } from "@/lib/server/contact";

export function Footer({ contact }: { contact: ContactInfo }) {
  const SOCIALS = [
    { icon: WhatsappIcon, label: "WhatsApp", href: contactWhatsappLink(contact.whatsapp) },
    { icon: YoutubeIcon, label: "YouTube", href: contact.social.youtube },
    { icon: FacebookIcon, label: "Facebook", href: contact.social.facebook },
    { icon: InstagramIcon, label: "Instagram", href: contact.social.instagram },
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-dark">
      <div className="mx-auto w-full max-w-7xl px-10 pt-16 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Singapore-registered construction and project management,
              delivering since {company.incorporationDateLabel}.
            </p>
            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-white/60">
                  Phone
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="font-medium text-white transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-white/60">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-white transition-colors hover:text-primary"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-none border border-white/15 text-white/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Navigate
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Registration
            </h3>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-white/60">UEN</dt>
                <dd className="font-medium text-white">{company.uen}</dd>
              </div>
              <div>
                <dt className="text-white/60">Entity Type</dt>
                <dd className="font-medium text-white">
                  {company.entityType}
                </dd>
              </div>
              <div>
                <dt className="text-white/60">Registered Office</dt>
                <dd className="font-medium text-white">
                  {contact.address.line1}, {contact.address.line2},{" "}
                  {contact.address.postalCode}
                </dd>
              </div>
            </dl>
          </div>

          <div className="aspect-square w-full overflow-hidden border border-white/10">
            <iframe
              title="Registered office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                contactAddressFull(contact.address)
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-40 contrast-[1.1]"
            />
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-10 py-8 text-xs text-white/50 sm:flex-row lg:px-16">
          <p>
            &copy; {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p>Incorporated in Singapore &middot; UEN {company.uen}</p>
        </div>
      </div>
    </footer>
  );
}
