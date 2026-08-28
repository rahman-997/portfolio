import type { MetadataRoute } from "next";
import { PROJECTS } from "./data";

export const dynamic = "force-static";

const baseUrl = "https://abdulrahman-hajar-dev.netlify.app";
const lastModified = new Date("2026-08-28T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resume/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECTS.map(({ slug }) => ({
      url: `${baseUrl}/work/${slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
