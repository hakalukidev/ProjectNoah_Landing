"use client";

import type { ReactElement, ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";

/**
 * "Get a Free Quote" CTA - opens the contact form in a modal (dimmed,
 * blurred backdrop) instead of navigating to /contact#contact-form, so a
 * visitor never loses their place on the page they're already on.
 *
 * `render` is the trigger element - same polymorphic pattern as the
 * `Button`/`Link` composition used elsewhere in this app (see header.tsx,
 * hero.tsx): Dialog.Trigger merges its own handlers/aria attributes onto
 * whatever element you pass (a styled Button, a plain <button>, etc.),
 * and `children` becomes that element's content.
 */
export function QuoteDialog({
  email,
  render,
  children,
}: {
  email: string;
  render: ReactElement;
  children: ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={render}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] overflow-y-auto transition-[transform,opacity] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <Dialog.Close
            aria-label="Close"
            className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <X className="size-4" />
          </Dialog.Close>
          <ContactForm recipientEmail={email} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
