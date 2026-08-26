import type { MetadataRoute } from "next";

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
    background_color: "#07111f",
    theme_color: "#07111f",
    orientation: "any",
    categories: ["developer", "portfolio", "technology"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
