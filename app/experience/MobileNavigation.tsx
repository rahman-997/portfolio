"use client";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import type { Locale } from "./locale";
import type { MenuLabels } from "./client-labels";
import styles from "./experience.module.css";

export default function MobileNavigation({locale,labels:t}:{locale:Locale;labels:MenuLabels}) {
  const [open,setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusFirstOnOpenRef = useRef(false);
  useEffect(() => {
    if (!open || !focusFirstOnOpenRef.current) return;
    // The menu is now in the committed DOM, so focusing its link is reliable.
    focusFirstOnOpenRef.current = false;
    rootRef.current?.querySelector<HTMLAnchorElement>("#portfolio-mobile-links a")?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnResize = () => {
      if (window.innerWidth > 1220) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);
  const menuLabel = locale==="ar" ? "قائمة التنقل" : locale==="tr" ? "Gezinme menüsü" : "Navigation menu";
  const links = [
    {href:"#work",label:t.navWork},
    {href:"#highlights",label:t.navHighlights},
    {href:"#ai-lab",label:t.navAtlas},
    {href:"#collaborate",label:locale==="ar"?"الخدمات":locale==="tr"?"Hizmetler":"Services"},
    {href:"#about",label:t.navAbout},
    {href:"/resume/",label:t.navResume},
  ];
  const focusFirstLink = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (open) {
      rootRef.current?.querySelector<HTMLAnchorElement>("#portfolio-mobile-links a")?.focus();
    } else {
      focusFirstOnOpenRef.current = true;
      setOpen(true);
    }
  };
  return <div className={styles.mobileNavigation} ref={rootRef}
    onBlur={event => {
      // A disclosure must not stay open while keyboard focus moves elsewhere.
      if (open && event.relatedTarget instanceof Node && !rootRef.current?.contains(event.relatedTarget)) {
        setOpen(false);
      }
    }}>
    <button ref={triggerRef} className={styles.mobileMenuButton} type="button" aria-label={menuLabel}
      aria-expanded={open} aria-controls="portfolio-mobile-links"
      onClick={()=>setOpen(value=>!value)}
      onKeyDown={focusFirstLink}>
      <span aria-hidden="true" className={styles.menuBars}><i/><i/></span>
      <span>{open ? (locale==="ar"?"إغلاق":locale==="tr"?"Kapat":"Close") : (locale==="ar"?"القائمة":locale==="tr"?"Menü":"Menu")}</span>
    </button>
    <nav id="portfolio-mobile-links" className={styles.mobilePanel} aria-label={menuLabel} hidden={!open}>
      {links.map((item,i)=><a href={item.href} key={item.href} onClick={()=>setOpen(false)}>
        <span>{String(i+1).padStart(2,"0")}</span>{item.label}<span aria-hidden="true">↗</span>
      </a>)}
      <div className={styles.mobileLanguagePicker} role="group"
        aria-label={t.language} dir="ltr">
        <Link prefetch={false} href="/" lang="en" aria-current={locale==="en"?"page":undefined} onClick={()=>setOpen(false)}>EN</Link>
        <Link prefetch={false} href="/ar/" lang="ar" aria-current={locale==="ar"?"page":undefined} onClick={()=>setOpen(false)}>العربية</Link>
        <Link prefetch={false} href="/tr/" lang="tr" aria-current={locale==="tr"?"page":undefined} onClick={()=>setOpen(false)}>TR</Link>
      </div>
    </nav>
  </div>;
}
