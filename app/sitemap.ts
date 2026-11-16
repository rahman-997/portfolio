import type { MetadataRoute } from "next";
import { PORTFOLIO_UPDATED_AT, PROJECT_LIST, SITE_URL } from "./portfolio-data";

import { ALL_PROJECTS } from "./experience/projects";
import { projectPath } from "./experience/project-paths";
import { LOCALES } from "./experience/locale";

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
      url: `${SITE_URL}/ar/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/tr/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/resume/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...ALL_PROJECTS.flatMap(project=>LOCALES.map(locale=>({
      url:`${SITE_URL}${projectPath(locale,project.id)}`,
      lastModified,
      changeFrequency:"monthly" as const,
      priority:0.75,
      alternates:{languages:Object.fromEntries(LOCALES.map(language=>[language,`${SITE_URL}${projectPath(language,project.id)}`]))}
    }))),
    ...PROJECT_LIST.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
