"use client";

import { usePathname } from "next/navigation";

import { WhatsappIcon } from "@/components/site/social-icons";
import { SOCIAL_LINKS } from "@/lib/site-config";

export function WhatsappButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Project Noah on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-primary py-3.5 pl-4 pr-5 text-primary-foreground shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
    >
      <WhatsappIcon className="size-6 shrink-0" />
      <span className="text-sm font-semibold whitespace-nowrap">Chat with us</span>
    </a>
  );
}
