import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Static hosts cannot serve the dynamic /_next/image optimizer.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
