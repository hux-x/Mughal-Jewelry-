import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

nextConfig.output = 'export'
if (!nextConfig.images) nextConfig.images = {};
nextConfig.images.unoptimized = true;

export default nextConfig;
