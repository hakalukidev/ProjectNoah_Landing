import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/sections/contact-form";
import type { ContactInfo } from "@/lib/server/contact";
import { contactWhatsappLink } from "@/lib/server/contact";

export function Contact({
  contact,
  serviceTitles,
}: {
  contact: ContactInfo;
  serviceTitles: string[];
}) {
  const SOCIALS = [
    { icon: WhatsappIcon, label: "WhatsApp", href: contactWhatsappLink(contact.whatsapp) },
    { icon: YoutubeIcon, label: "YouTube", href: contact.social.youtube },
    { icon: FacebookIcon, label: "Facebook", href: contact.social.facebook },
    { icon: InstagramIcon, label: "Instagram", href: contact.social.instagram },
  ];

  return (
    <section id="contact" className="scroll-mt-30 bg-background py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div>
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            Contact
          </Badge>
          <h2 className="mt-5 max-w-lg text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Talk to Us About Your Next Build
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Send us your site details and rough timeline, and we&apos;ll reply
            with next steps, typically within one business day.
          </p>

          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Follow Us
            </p>
            <p className="mt-1 text-right text-lg font-bold text-foreground">
              Connect to us
            </p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-none border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <ContactForm
          recipientEmail={contact.email}
          whatsapp={contact.whatsapp}
          serviceTitles={serviceTitles}
        />
      </div>
    </section>
  );
}
