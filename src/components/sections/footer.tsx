import Link from "next/link";

import { Logo } from "@/components/site/logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { NAV_LINKS, SOCIAL_LINKS, company } from "@/lib/site-config";

const SOCIALS = [
  { icon: WhatsappIcon, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
  { icon: YoutubeIcon, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: FacebookIcon, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: InstagramIcon, label: "Instagram", href: SOCIAL_LINKS.instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-10 pt-16 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Singapore-registered construction and project management,
              delivering since {company.incorporationDateLabel}.
            </p>
            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${company.email}`}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {company.email}
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
                  className="flex size-9 items-center justify-center rounded-none border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Navigate
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Registration
            </h3>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">UEN</dt>
                <dd className="font-medium text-foreground">{company.uen}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Entity Type</dt>
                <dd className="font-medium text-foreground">
                  {company.entityType}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Registered Office</dt>
                <dd className="font-medium text-foreground">
                  {company.address.line1}, {company.address.line2},{" "}
                  {company.address.postalCode}
                </dd>
              </div>
            </dl>
          </div>

          <div className="aspect-square w-full overflow-hidden border border-red-500">
            <iframe
              title="Registered office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                company.address.full
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-40 contrast-[1.1]"
            />
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-10 py-8 text-xs text-muted-foreground sm:flex-row lg:px-16">
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
