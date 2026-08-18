import type { NextConfig } from "next";

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
};

export default nextConfig;
