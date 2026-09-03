"use client";

import { usePathname } from "next/navigation";

import { WhatsappIcon } from "@/components/site/social-icons";

export function WhatsappButton({ whatsappLink }: { whatsappLink: string }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Project Noah on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-13 items-center justify-center rounded-full bg-[#ad1111] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-8 sm:bottom-8 sm:size-auto sm:gap-2 sm:py-3.5 sm:pl-4 sm:pr-5"
    >
      <WhatsappIcon className="size-6 shrink-0" />
      <span className="hidden text-sm font-semibold whitespace-nowrap sm:inline">Chat with us</span>
    </a>
  );
}
