import Link from "next/link";

import { Logo } from "@/components/site/logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { NAV_LINKS, company } from "@/lib/site-config";
import { getFooterSettings } from "@/lib/footer-settings";

export async function Footer() {
  const settings = await getFooterSettings();

  const SOCIALS = [
    { icon: WhatsappIcon, label: "WhatsApp", href: settings.whatsappUrl },
    { icon: YoutubeIcon, label: "YouTube", href: settings.youtubeUrl },
    { icon: FacebookIcon, label: "Facebook", href: settings.facebookUrl },
    { icon: InstagramIcon, label: "Instagram", href: settings.instagramUrl },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-10 pt-16 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {settings.tagline}
            </p>
            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {settings.email}
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
                <dd className="font-medium text-foreground">{settings.uen}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Entity Type</dt>
                <dd className="font-medium text-foreground">
                  {settings.entityType}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Registered Office</dt>
                <dd className="font-medium text-foreground">
                  {settings.registeredOffice}
                </dd>
              </div>
            </dl>
          </div>

          <div className="aspect-square w-full overflow-hidden border border-red-500">
            <iframe
              title="Registered office location"
              src={settings.mapEmbedUrl}
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
          <p>Incorporated in Singapore &middot; UEN {settings.uen}</p>
        </div>
      </div>
    </footer>
  );
}
