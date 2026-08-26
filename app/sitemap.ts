import type { MetadataRoute } from "next";

const baseUrl = "https://abdulrahman-hajjar-dev.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/resume/",
    "/work/fitflow/",
    "/work/eventify/",
    "/work/bookhaven/",
    "/work/venues-api/",
  ];

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/resume/" ? 0.9 : 0.8,
  }));
}
