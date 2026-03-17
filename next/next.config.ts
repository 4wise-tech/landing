import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next rooted in this folder (helps Vercel/monorepo detection)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
