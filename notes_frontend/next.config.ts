import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export enabled. Note: dynamic routes or server actions are not used.
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
