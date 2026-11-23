"use client";
import { useState } from "react";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import { extraSections } from "./extra-sections";
import styles from "./experience.module.css";

export default function MobileNavigation({locale}:{locale:Locale}) {
  const [open,setOpen] = useState(false);
  const t = TEXT[locale];
  const extra = extraSections[locale];
  const menuLabel = locale==="ar" ? "قائمة التنقل" : locale==="tr" ? "Gezinme menüsü" : "Navigation menu";
  const links = [
    {href:"#work",label:t.navWork},
    {href:"#highlights",label:extra.navHighlights},
    {href:"#ai-lab",label:t.navAtlas},
    {href:"#collaborate",label:locale==="ar"?"الخدمات":locale==="tr"?"Hizmetler":"Services"},
    {href:"#about",label:t.navAbout},
    {href:"/resume/",label:t.navResume},
  ];
  return <div className={styles.mobileNavigation}>
    <button className={styles.mobileMenuButton} type="button" aria-label={menuLabel}
      aria-expanded={open} aria-controls="portfolio-mobile-links"
      onClick={()=>setOpen(value=>!value)}>
      <span aria-hidden="true" className={styles.menuBars}><i/><i/></span>
      <span>{open ? (locale==="ar"?"إغلاق":locale==="tr"?"Kapat":"Close") : (locale==="ar"?"القائمة":locale==="tr"?"Menü":"Menu")}</span>
    </button>
    {open && <nav id="portfolio-mobile-links" className={styles.mobilePanel} aria-label={menuLabel} onKeyDown={event=>{if(event.key==="Escape")setOpen(false);}}>
      {links.map((item,i)=><a href={item.href} key={item.href} onClick={()=>setOpen(false)}>
        <span>{String(i+1).padStart(2,"0")}</span>{item.label}<span aria-hidden="true">↗</span>
      </a>)}
    </nav>}
  </div>;
}
