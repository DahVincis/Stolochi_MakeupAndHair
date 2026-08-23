import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Next's image optimizer needs paid Cloudflare Images; serve originals instead.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Silence "workspace root" warning (multiple package-lock.json files on machine).
  turbopack: {
    root: __dirname,
  },
};

// Makes Cloudflare bindings available in `next dev`.
initOpenNextCloudflareForDev();

export default nextConfig;
