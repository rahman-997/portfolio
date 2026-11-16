"use client";
import { useEffect, useRef } from "react";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import styles from "./reference-shell.module.css";

export default function MobileNavigation({locale}:{locale:Locale}) {
  const menu = useRef<HTMLDetailsElement>(null);
  const t = TEXT[locale];
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const close = () => { if (menu.current) menu.current.open = false; };
  return <details id="mobile-navigation" ref={menu} className={styles.mobileMenu}>
    <summary aria-label={locale==="ar"?"فتح القائمة":locale==="tr"?"Menüyü aç":"Open menu"}><span aria-hidden="true">☰</span></summary>
    <nav aria-label={locale==="ar"?"قائمة الموبايل":locale==="tr"?"Mobil menü":"Mobile menu"}>
      <a href="#work" onClick={close}>{t.navWork}</a>
      <a href="#blueprint-lab" onClick={close}>{locale==="ar"?"مختبر الأنظمة":locale==="tr"?"Mimari Lab":"Blueprint Lab"}</a>
      <a href="#ai-lab" onClick={close}>{t.navAtlas}</a>
      <a href="#about" onClick={close}>{t.navAbout}</a>
      <a href="#contact" onClick={close}>{locale==="ar"?"تواصل":locale==="tr"?"İletişim":"Contact"}</a>
      <a href="/resume/" onClick={close}>{t.navResume} <span lang="en">EN</span></a>
    </nav>
  </details>;
}
