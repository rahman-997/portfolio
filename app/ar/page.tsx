import type { Metadata } from "next";
import PortfolioExperience from "../experience/PortfolioExperience";
import { SITE_URL } from "../portfolio-data";
export const metadata: Metadata = {
  title:"عبدالرحمن حجار | مهندس برمجيات ومطور متكامل",
  description:"جميع المشاريع البرمجية العامة، أنظمة متكاملة، تطوير الواجهات والخدمات الخلفية، وتجارب تفاعلية.",
  alternates:{canonical:`${SITE_URL}/ar/`,languages:{en:`${SITE_URL}/`,ar:`${SITE_URL}/ar/`,tr:`${SITE_URL}/tr/`}},
  openGraph:{locale:"ar_AR",url:`${SITE_URL}/ar/`}
};
export default function ArabicHome(){return <PortfolioExperience locale="ar"/>;}
