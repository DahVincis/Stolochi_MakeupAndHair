import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/demos/stolochi",
  trailingSlash: true,

  images: {
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

export default nextConfig;
