import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Static hosts cannot serve the runtime /_next/image optimization endpoint.
  images: { unoptimized: true },
};

export default nextConfig;
