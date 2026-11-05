import type { MetadataRoute } from "next";
import { PORTFOLIO_UPDATED_AT, PROJECT_LIST, SITE_URL } from "./portfolio-data";

export const dynamic = "force-static";

const lastModified = new Date(PORTFOLIO_UPDATED_AT);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/resume/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECT_LIST.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
