import type { MetadataRoute } from "next";
import { PORTFOLIO_UPDATED_AT, PROJECT_LIST, SITE_URL } from "./portfolio-data";
import { alternateLinks, localePath, type Locale } from "./i18n";

export const dynamic = "force-static";
const lastModified=new Date(PORTFOLIO_UPDATED_AT);
const locales:Locale[]=["en","ar","tr"];
const absolute=(path:string)=>SITE_URL+path;
function entry(locale:Locale,page:"home"|"resume"|"work",slug?:string):MetadataRoute.Sitemap[number]{
  const alternates=alternateLinks(page,slug);
  return {
    url:absolute(localePath(locale,page,slug)),
    lastModified,
    changeFrequency:page==="home"?"weekly":"monthly",
    priority:locale==="en"?(page==="home"?1:page==="resume"?.9:.85):(page==="home"?.9:page==="resume"?.8:.76),
    alternates:{languages:{en:absolute(alternates.en),ar:absolute(alternates.ar),tr:absolute(alternates.tr)}},
  };
}
export default function sitemap():MetadataRoute.Sitemap{
  return locales.flatMap(locale=>[
    entry(locale,"home"),entry(locale,"resume"),
    ...PROJECT_LIST.map(project=>entry(locale,"work",project.slug)),
  ]);
}
