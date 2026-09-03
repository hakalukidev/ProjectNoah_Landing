import type { NextConfig } from "next";

// Heavy static media, all served straight out of public/. Listed here so the
// cache header below is declared once instead of being repeated per file.
//
// hero-video.mp4, hero-poster.webp and video-embed.html are the retired
// video hero. The homepage now shows a still instead (public/hero_img.png,
// served through next/image, which needs no header here - the optimizer
// sets its own), so none of the three is fetched on a normal visit. They
// are kept because reverting to the clip is a one-import change.
//
// The numbered ones are the works-page gallery
// (src/components/sections/project-video-gallery.tsx).
const MEDIA_PATHS = [
  "/hero-video.mp4",
  "/hero-poster.webp",
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
  "/video5.mp4",
];

const nextConfig: NextConfig = {
  // Native addons with a platform-specific binary need to be required
  // natively rather than bundled, same as sharp (which Next.js already
  // externalizes by default).
  serverExternalPackages: ["@resvg/resvg-js"],
  experimental: {
    serverActions: {
      // Admin photo uploads go through a Server Action; the framework
      // default (1MB) is far too small for photo files. Keep this above
      // the 15MB app-level limit in src/lib/server/gallery.ts to leave
      // room for multipart overhead.
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      // Files under public/ are otherwise served with a cache that
      // revalidates on essentially every request, so these multi-megabyte
      // clips are re-fetched far more often than their contents change.
      // The hero one is the expensive case: it is the heaviest thing the
      // homepage pulls, so caching it properly is the single biggest lever
      // on how slow a return visit feels - a repeat visitor plays it out of
      // disk cache and spends no bandwidth at all.
      //
      // Deliberately NOT `immutable`, and a week rather than a year: these
      // files are swapped in place under fixed names (no content hash in
      // the URL), so an over-long cache would leave visitors watching the
      // old clip long after a new one is deployed. stale-while-revalidate
      // lets the cached copy play instantly while a newer one is picked up
      // in the background. If a swap ever needs to land immediately for
      // everyone, rename the file (and its reference in
      // public/video-embed.html) rather than lengthening this.
      ...MEDIA_PATHS.map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      })),
      {
        // The tiny same-origin document that wraps the hero <video> (see
        // public/video-embed.html). Cached far more briefly than the video
        // itself: it is a couple of KB, and it holds the markup most likely
        // to be tweaked, so there is nothing to gain from pinning it.
        source: "/video-embed.html",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
