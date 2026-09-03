"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { company } from "@/lib/site-config";

/**
 * The hero copy, lifted out of the section so the backdrop and the message
 * stay independent of each other - the image can be swapped without any of
 * this moving.
 *
 * It is real, server-rendered DOM sitting on top of the backdrop: the
 * heading stays selectable and crawlable, the buttons stay real links, and
 * none of it waits on the image to load.
 */
export function HeroContent() {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-center gap-8 px-10 py-14 text-left lg:px-16 lg:py-20">
      {/* Three stacked lines rather than one wrapping block, separated by an
          em-based gap so the spacing tracks the h1 font-size at every
          breakpoint instead of drifting. The script accent ("To Last",
          Dancing Script via font-script) sits on its own line with tight
          leading - its ascenders/descenders would otherwise push the gap
          open further than the two printed lines. */}
      <h1 className="flex max-w-xl flex-col items-start gap-[0.12em] text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-white [text-shadow:0_2px_14px_rgb(0_0_0/0.6)] sm:text-3xl lg:text-4xl xl:text-5xl">
        <span>Engineered</span>
        {/* Lighter red than the dark-on-white version: #e02424 is dark enough
            that it disappears into the darker parts of the backdrop. */}
        <span className="font-script text-[1.35em] font-bold normal-case leading-[0.95] tracking-normal text-[#ff5a5a]">
          To Last
        </span>
        <span>
          Built for{" "}
          {/* "Tomorrow" types itself in on load. The transparent copy
              underneath reserves the final width so the line doesn't reflow
              letter by letter while it types.
              It's opacity-0 rather than hidden/invisible on purpose: the word
              stays in the accessibility tree and in the server-rendered HTML,
              which is all a screen reader or a crawler gets - the animated
              span starts out empty. The delay lets the rest of the heading
              land first. The sketched underline is drawn around that same
              reserved width, so it lands at full length instead of growing
              with the letters. */}
          <Highlighter action="underline" color="#ff5a5a" strokeWidth={3}>
            <span className="relative inline-block text-[#ff5a5a]">
              <span className="opacity-0">Tomorrow</span>
              <TypingAnimation
                as="span"
                aria-hidden="true"
                className="absolute inset-0 text-left tracking-tight"
                duration={90}
                delay={500}
              >
                Tomorrow
              </TypingAnimation>
            </span>
          </Highlighter>
        </span>
      </h1>

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            render={<Link href="/contact#contact-form" />}
            nativeButton={false}
            className="h-11 rounded-none bg-[#ad1111] px-6 text-sm text-white shadow-lg shadow-black/40 hover:bg-[#8e0e0e]"
          >
            Get a Free Quote
            <ArrowRight className="ml-1 size-4" />
          </Button>
          {/* Translucent black backing plus a blur, rather than a bare
              border: the label is white and the image behind it is not
              graded for it, so with nothing behind it the button loses
              contrast wherever the backdrop runs light. */}
          <Button
            render={<Link href="/#services" />}
            nativeButton={false}
            variant="outline"
            className="h-11 rounded-none border-white/40 bg-black/30 px-6 text-sm text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
          >
            View Our Services
          </Button>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-white/80 [text-shadow:0_1px_6px_rgb(0_0_0/0.6)]">
          {company.legalName} &middot; UEN {company.uen}
        </p>
      </div>
    </div>
  );
}
