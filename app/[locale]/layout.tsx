import { notFound } from "next/navigation";
import DocumentLocale from "./DocumentLocale";
import { isTranslationLocale } from "../i18n";
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!isTranslationLocale(locale))notFound();
 return <><DocumentLocale locale={locale}/>{children}</>;
}
