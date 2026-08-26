import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://abdulrahman-hajjar-dev.netlify.app/sitemap.xml",
    host: "https://abdulrahman-hajjar-dev.netlify.app",
  };
}
