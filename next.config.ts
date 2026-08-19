import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static HTML export for SSG
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export; use a CDN or Vercel for optimisation
    formats: ["image/webp"],
  },
  // Ensure canonical domain; set in deployment environment
};

export default nextConfig;
