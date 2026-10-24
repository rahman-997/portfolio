"use client";
import { useEffect } from "react";
import type { TranslationLocale } from "../i18n";
/** Nested routes are statically exported; update the document attributes after navigation. The page container already has SSR lang/dir. */
export default function DocumentLocale({locale}:{locale:TranslationLocale}){
  useEffect(()=>{
    const root=document.documentElement;
    const oldLang=root.getAttribute("lang"),oldDir=root.getAttribute("dir");
    root.lang=locale;root.dir=locale==="ar"?"rtl":"ltr";
    return ()=>{if(oldLang===null)root.removeAttribute("lang");else root.lang=oldLang;if(oldDir===null)root.removeAttribute("dir");else root.dir=oldDir;};
  },[locale]);
  return null;
}
