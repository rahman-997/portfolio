"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import styles from "./experience.module.css";

type Theme = "light" | "dark";
const STORAGE_KEY = "portfolio-appearance";

export default function ExperienceControls({locale}:{locale:Locale}) {
  const [theme,setTheme] = useState<Theme>("light");
  useEffect(()=>{
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const preferred:Theme = stored==="dark" || stored==="light"
      ? stored
      : "light";
    // Defer state synchronization until after mount to avoid effect render loops.
    const frame = window.requestAnimationFrame(() => setTheme(preferred));
    document.documentElement.dataset.theme = preferred;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    return () => window.cancelAnimationFrame(frame);
  },[locale]);
  const changeTheme = ()=>{
    const next:Theme = theme==="dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme=next;
    try { window.localStorage.setItem(STORAGE_KEY,next); } catch { /* storage may be disabled */ }
  };
  const label=TEXT[locale];
  return <div className={styles.controls}>
    <nav aria-label={label.language} className={styles.languages} dir="ltr">
      <Link href="/" lang="en" aria-current={locale==="en"?"page":undefined} title="English">EN</Link>
      <Link href="/ar/" lang="ar" aria-current={locale==="ar"?"page":undefined} title="العربية">عربي</Link>
      <Link href="/tr/" lang="tr" aria-current={locale==="tr"?"page":undefined} title="Türkçe">TR</Link>
    </nav>
    <button className={styles.themeButton} type="button"
      onClick={changeTheme}
      aria-label={theme==="dark"?label.themeLight:label.themeDark}
      title={theme==="dark"?label.themeLight:label.themeDark}>
      <span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span>
      <span className={styles.themeText}>{theme==="dark"?"Light":"Dark"}</span>
    </button>
  </div>;
}
