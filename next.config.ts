import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // compiler: {
  //   removeConsole: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
