import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ContactInfo } from "@/lib/server/contact";

export function TopBar({
  contact,
  /**
   * Set while the header floats over the home page hero: the strip drops its
   * own dark fill and lets the hero show through, keeping the same white
   * text. See the `overlay` prop on Header.
   */
  transparent = false,
}: {
  contact: ContactInfo;
  transparent?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full transition-colors duration-300",
        transparent
          ? "bg-transparent text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
          : "bg-brand-dark text-brand-dark-foreground"
      )}
    >
      <div className="mx-auto flex h-10 w-full max-w-[1920px] items-center justify-between gap-4 px-6 text-xs font-semibold lg:px-12">
        <Link
          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
          className="flex items-center gap-1.5 whitespace-nowrap hover:opacity-80"
        >
          <Phone className="size-3.5" />
          <span>{contact.phone}</span>
        </Link>

        <p className="hidden truncate text-center uppercase tracking-wide md:block">
          Trusted Singapore Contractor Since 2008 &middot;{" "}
          <Link
            href="/contact#contact-form"
            className="underline underline-offset-2 hover:opacity-80"
          >
            Get a Free Quote
          </Link>
        </p>

        <div className="hidden items-center gap-4 whitespace-nowrap sm:flex">
          <Link
            href={`mailto:${contact.email}`}
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <Mail className="size-3.5" />
            <span className="hidden lg:inline">{contact.email}</span>
          </Link>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Singapore
          </span>
        </div>
      </div>
    </div>
  );
}
