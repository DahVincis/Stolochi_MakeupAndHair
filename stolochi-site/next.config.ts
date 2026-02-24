import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: Do NOT use output: "export" — this site uses Next.js API routes
  // (contact form) and ISR (Google Sheets revalidation), which require a
  // server runtime.
  //
  // Recommended deployment to AWS S3 + CloudFront:
  //   Use OpenNext via SST (https://sst.dev).
  //   Run: npx sst@latest init  →  npx sst deploy --stage production
  //
  // Alternative: Vercel (zero-config, fully managed)

  images: {
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
