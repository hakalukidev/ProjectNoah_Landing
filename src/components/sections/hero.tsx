"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { company } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Autoplaying video, embedded via <iframe src="/video-embed.html">
          (see public/video-embed.html) rather than a direct <video> tag - the
          actual <video>/<source> tags live in that same-origin document, which
          is a deterrent against casual "save video as" downloading (not real
          protection, since the file is still fetchable via dev tools). Swap
          the file at public/hero-video.mp4 to replace the video itself
          (currently 3840x2160, 16:9). video-embed.html sets autoplay + loop +
          muted on the <video> itself, so playback restarts on its own and
          never has to be re-triggered from here.
          Full-bleed: no max-width/padding wrapper and no border, so the video
          runs edge to edge at the full viewport width on every screen size.
          The box height is set with viewport-height units (h-[46vh] growing
          to h-[64vh] on larger screens) rather than a fixed aspect ratio, so
          it stays a sensible height whether the viewport is a narrow phone
          or an ultrawide monitor. video-embed.html pairs this with
          object-fit: cover (fills the box completely, cropping whatever
          doesn't fit) rather than contain, since a full-bleed box ruled out
          keeping pillarbox bars. No on-video controls - it's muted, looping
          decoration with no audio to toggle.

          The heading, CTAs and legal line sit in an absolutely-positioned
          overlay directly on top of the video (rather than above it). There
          is no hard dark panel behind them - only a soft radial scrim
          (see the gradient div just below the iframe) plus a drop-shadow on
          the text itself - so the video stays clear at the edges while the
          text zone gets enough contrast to stay legible over bright/foggy
          footage. The outline button keeps its own small translucent
          backing (it's a button, not a decorative panel) since plain
          white-on-video text there would be unreadable over a light frame. */}
      <div className="relative h-[46vh] w-full min-h-[320px] overflow-hidden sm:h-[54vh] lg:h-[64vh]">
        <iframe
          src="/video-embed.html"
          title="Hero background video"
          className="size-full border-0"
          allow="autoplay"
          loading="eager"
        />

        {/* Soft radial scrim, fading out toward the edges, so light/foggy
            video frames don't wash out the white text - without dropping a
            hard panel over the whole video. Its centre sits at 30% across
            to track the left-aligned text block rather than the middle of
            the frame. Kept deliberately light (0.26 at its darkest) so the
            footage stays legible; the heading's drop-shadow does most of
            the contrast work. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_center,rgba(0,0,0,0.26)_0%,rgba(0,0,0,0)_72%)]" />

        {/* Same mx-auto/max-w-7xl/px-10 container the rest of the page uses,
            so the hero copy starts on the same left gutter as every section
            below it. inset-0 plus a max-width still centres the box via the
            auto margins, and items-start pins the text to its left edge. */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-10 lg:px-16">
          <div className="pointer-events-auto flex max-w-3xl flex-col items-start gap-8 text-left">
            {/* Three stacked lines rather than one wrapping block, separated
                by an em-based gap so the spacing tracks the h1 font-size at
                every breakpoint instead of drifting. The script accent
                ("To Last", Dancing Script via font-script) sits on its own
                line with tight leading - its ascenders/descenders would
                otherwise push the gap open further than the two printed
                lines. */}
            <h1 className="flex max-w-3xl flex-col gap-[0.12em] text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-5xl">
              <span>Engineered</span>
              <span className="font-script text-[1.35em] font-bold normal-case leading-[0.95] tracking-normal text-[#e02424] drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
                To Last
              </span>
              <span>
                Built for{" "}
                {/* "Tomorrow" types itself in on load. The transparent copy
                    underneath reserves the final width so the line doesn't
                    reflow letter by letter while it types.
                    It's opacity-0 rather than hidden/invisible on purpose:
                    the word stays in the accessibility tree and in the
                    server-rendered HTML, which is all a screen reader or a
                    crawler gets - the animated span starts out empty. The
                    delay lets the rest of the heading land first. The
                    sketched underline is drawn around that same reserved
                    width, so it lands at full length instead of growing
                    with the letters. */}
                <Highlighter action="underline" color="#e02424" strokeWidth={3}>
                  <span className="relative inline-block text-[#e02424]">
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
                  className="h-11 rounded-none bg-[#ad1111] px-6 text-sm text-white shadow-lg shadow-[#ad1111]/25 hover:bg-[#8e0e0e]"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button
                  render={<Link href="/#services" />}
                  nativeButton={false}
                  variant="outline"
                  className="h-11 rounded-none border-white/50 bg-black/25 px-6 text-sm text-white hover:bg-black/40 hover:text-white"
                >
                  View Our Services
                </Button>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                {company.legalName} &middot; UEN {company.uen}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
