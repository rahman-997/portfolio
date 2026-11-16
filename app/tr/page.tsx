import type { Metadata } from "next";
import PortfolioExperience from "../experience/PortfolioExperience";
import { SITE_URL } from "../portfolio-data";
const title = "Abdulrahman Hajar | Bilgisayar Mühendisi ve Full-Stack Geliştirici";
const description = "Abdulrahman Hajar’ın ürünleri, web siteleri, backend servisleri ve araçları; geliştirme aşamaları, teknik incelemeler ve etkileşimli deneyimler.";
export const metadata: Metadata = {
  title, description,
  alternates: {canonical:`${SITE_URL}/tr/`,languages:{en:`${SITE_URL}/`,ar:`${SITE_URL}/ar/`,tr:`${SITE_URL}/tr/`}},
  openGraph: {title,description,type:"website",siteName:"Abdulrahman Hajar — Portfolio",locale:"tr_TR",url:`${SITE_URL}/tr/`,images:[{url:"/opengraph-image",width:1200,height:630,alt:"Abdulrahman Hajar — Portfolio"}]},
  twitter: {card:"summary_large_image",title,description,images:["/twitter-image"]}
};
export default function LocalizedHome(){return <PortfolioExperience locale="tr"/>;}
