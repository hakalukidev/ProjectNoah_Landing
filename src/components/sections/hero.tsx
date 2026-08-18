"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 pt-6 text-center sm:pt-8">
        <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Built to{" "}
          <span className="rounded bg-[#e01f22] px-1.5 text-white">
            Protect
          </span>
          , Built to{" "}
          <span className="underline decoration-[#e01f22] decoration-[3px] underline-offset-4">
            Last
          </span>
        </h1>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/#contact" />}
              nativeButton={false}
              className="h-11 rounded-none bg-[#e01f22] px-6 text-sm text-white shadow-lg shadow-[#e01f22]/25 hover:bg-[#b81a1c]"
            >
              Get a Free Quote
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              variant="outline"
              className="h-11 rounded-none border-foreground/15 px-6 text-sm hover:bg-muted"
            >
              View Our Projects
            </Button>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {company.legalName} &middot; UEN {company.uen}
          </p>
        </div>
      </div>

      {/* Full-bleed autoplaying video, embedded via <iframe src="/video-embed.html">
          (see public/video-embed.html) rather than a direct <video> tag - the
          actual <video>/<source> tags live in that same-origin document, which
          is a deterrent against casual "save video as" downloading (not real
          protection, since the file is still fetchable via dev tools). Swap
          the file at public/hero-video.mp4 to replace the video itself
          (currently 3840x2160, 16:9).
          `aspect-video` (16:9) matches the source file's own ratio exactly,
          so object-fit: contain in the embed always fills this box edge to
          edge at full width, on any screen size - no cropping and no black
          letterbox/pillarbox bars, unlike a fixed-height box whose ratio
          would rarely match the video's. If the replacement file ever has a
          different native ratio, swap this class for that ratio too, or
          bars will reappear. No on-video controls - it's muted, looping
          decoration with no audio to toggle. */}
      <div className="relative mt-6 aspect-video w-full sm:mt-8">
        <iframe
          src="/video-embed.html"
          title="Hero background video"
          className="size-full border-0"
          allow="autoplay"
          loading="eager"
        />
      </div>
    </section>
  );
}
