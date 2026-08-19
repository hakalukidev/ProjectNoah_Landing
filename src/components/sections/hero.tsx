"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { QuoteDialog } from "@/components/site/quote-dialog";
import { company } from "@/lib/site-config";

export function Hero({ email }: { email: string }) {
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
          is no dark/blurred panel behind them - only the text itself carries
          a drop-shadow for contrast - so the video stays fully crystal
          clear everywhere except the glyphs of the text. The outline button
          keeps its own small translucent backing (it's a button, not a
          decorative panel) since plain white-on-video text there would be
          unreadable over a light frame. */}
      <div className="relative h-[46vh] w-full min-h-[320px] overflow-hidden sm:h-[54vh] lg:h-[64vh]">
        <iframe
          src="/video-embed.html"
          title="Hero background video"
          className="size-full border-0"
          allow="autoplay"
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <div className="pointer-events-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-5xl">
              Built to{" "}
              <Highlighter action="highlight" color="#e01f22" padding={4}>
                <span className="text-white mix-blend-normal">Protect</span>
              </Highlighter>
              , Built to{" "}
              <Highlighter action="underline" color="#e01f22" strokeWidth={3}>
                Last
              </Highlighter>
            </h1>

            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <QuoteDialog
                  email={email}
                  render={
                    <Button className="h-11 rounded-none bg-[#e01f22] px-6 text-sm text-white shadow-lg shadow-[#e01f22]/25 hover:bg-[#b81a1c]" />
                  }
                >
                  Get a Free Quote
                  <ArrowRight className="ml-1 size-4" />
                </QuoteDialog>
                <Button
                  render={<Link href="/projects" />}
                  nativeButton={false}
                  variant="outline"
                  className="h-11 rounded-none border-white/50 bg-black/30 px-6 text-sm text-white backdrop-blur-sm hover:bg-black/45 hover:text-white"
                >
                  View Our Projects
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
