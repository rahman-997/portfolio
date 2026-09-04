import type { MetadataRoute } from "next";
import { THEME_COLOR } from "./portfolio-data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdulrahman Hajar — Software Engineering Portfolio",
    short_name: "Abdulrahman Hajar",
    description:
      "Software engineering portfolio featuring full-stack products, backend systems, APIs, data architecture, reliability, and AI-assisted workflows.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    orientation: "any",
    categories: ["developer", "portfolio", "technology"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
