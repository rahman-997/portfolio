import type { Metadata } from "next";
import PortfolioExperience from "../experience/PortfolioExperience";
import { SITE_URL } from "../portfolio-data";
const title = "عبد الرحمن حجار | مهندس كمبيوتر ومطوّر متكامل";
const description = "معرض أعمال عبد الرحمن حجار: منتجات رقمية ومواقع وخدمات خلفية وأدوات، مع مراحل التطوير ودراسات تقنية وتجارب تفاعلية.";
export const metadata: Metadata = {
  title, description,
  alternates: {canonical:`${SITE_URL}/ar/`,languages:{en:`${SITE_URL}/`,ar:`${SITE_URL}/ar/`,tr:`${SITE_URL}/tr/`}},
  openGraph: {title,description,type:"website",siteName:"Abdulrahman Hajar — Portfolio",locale:"ar_AR",url:`${SITE_URL}/ar/`,images:[{url:"/opengraph-image",width:1200,height:630,alt:"Abdulrahman Hajar — Portfolio"}]},
  twitter: {card:"summary_large_image",title,description,images:["/twitter-image"]}
};
export default function LocalizedHome(){return <PortfolioExperience locale="ar"/>;}
