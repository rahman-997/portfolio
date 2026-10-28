import type { Metadata } from "next";
import PortfolioExperience from "../experience/PortfolioExperience";
import { SITE_URL } from "../portfolio-data";
export const metadata: Metadata = {
  title:"Abdulrahman Hajar | Yazılım Mühendisi ve Full-Stack Geliştirici",
  description:"Herkese açık projeler, uçtan uca yazılım sistemleri, backend mimarisi ve etkileşimli ürünler.",
  alternates:{canonical:`${SITE_URL}/tr/`,languages:{en:`${SITE_URL}/`,ar:`${SITE_URL}/ar/`,tr:`${SITE_URL}/tr/`}},
  openGraph:{locale:"tr_TR",url:`${SITE_URL}/tr/`}
};
export default function TurkishHome(){return <PortfolioExperience locale="tr"/>;}
