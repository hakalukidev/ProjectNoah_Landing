import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { HeroContent } from "@/components/hero/hero-content";

/**
 * The home page hero: a single still behind the headline.
 *
 * The two rules that matter if you touch this:
 *
 *   1. This section is a Server Component and the copy inside it is real
 *      DOM. The heading, the buttons and the UEN line are server-rendered
 *      and present in the HTML regardless of whether the backdrop has
 *      loaded. The image is decoration; it is never load-bearing for the
 *      message.
 *
 *   2. Nothing behind the copy intercepts input. The image and both scrims
 *      carry pointer-events: none, so every click lands on the buttons
 *      underneath.
 *
 * This hero has had two previous incarnations: a looping video
 * (public/hero-video.mp4, wrapped in public/video-embed.html) and a
 * real-time WebGL skyline (src/components/hero/, three.js + r3f). Both are
 * gone from the page; the video pair is still in the repo and still
 * cache-headered in next.config.ts. The 3D scene is in this file's history
 * if it is ever wanted back.
 */
export function Hero() {
  return (
    <section className="hero-viewport relative flex w-full items-center overflow-hidden bg-[#050912]">
      {/* Full-bleed backdrop. `fill` + object-cover rather than an intrinsic
          layout because the section is sized by the viewport, not by the
          image; `priority` because this is the LCP element on the home page
          and it should not wait behind lazy-loading. The source is a large
          PNG - next/image re-encodes and resizes it per request, so what
          ships is a fraction of what is in public/. */}
      <Image
        src="/hero_img.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />

      {/* Readability scrim. The gradient is horizontal and stops well short
          of the right edge, so it darkens the column the copy sits in
          without flattening the part of the image worth looking at. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(3,7,14,0.85)_0%,rgba(3,7,14,0.55)_34%,rgba(3,7,14,0.12)_62%,rgba(3,7,14,0)_85%)]"
      />
      {/* A little weight at the very top and bottom edges: the top is what
          the transparent header floats on - the nav's white text is read
          against this band rather than against whatever happens to be behind
          it - and the bottom settles the image down into the section
          boundary. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,14,0.45)_0%,rgba(3,7,14,0)_22%,rgba(3,7,14,0)_72%,rgba(3,7,14,0.5)_100%)]"
      />

      {/* Above both scrims and the image. This is the only layer in the
          section that accepts pointer events. */}
      <div className="relative z-10 w-full">
        <HeroContent />
      </div>

      {/* Scroll cue. Decorative and inert - the page below is reached by
          scrolling like any other, there is no scroll-jacking here and the
          hero hands off to the next section on its own. motion-safe keeps it
          still for anyone who has asked for reduced motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <ChevronDown className="size-6 text-white/45 motion-safe:animate-bounce" />
      </div>
    </section>
  );
}
