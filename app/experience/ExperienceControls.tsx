"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "./locale";
import { TEXT, localeHome } from "./locale";
import { projectPath } from "./project-paths";
import styles from "./experience.module.css";

type Theme = "light" | "dark";
const STORAGE_KEY = "portfolio-appearance";

export default function ExperienceControls({locale,projectId}:{locale:Locale;projectId?:string}) {
  const [theme,setTheme] = useState<Theme>("light");
  useEffect(()=>{
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(STORAGE_KEY); } catch { /* use the default if storage is blocked */ }
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
      <Link href={projectId?projectPath("en",projectId):localeHome("en")} lang="en" aria-current={locale==="en"?"page":undefined} title="English">EN</Link>
      <Link href={projectId?projectPath("ar",projectId):localeHome("ar")} lang="ar" aria-current={locale==="ar"?"page":undefined} title="العربية">عربي</Link>
      <Link href={projectId?projectPath("tr",projectId):localeHome("tr")} lang="tr" aria-current={locale==="tr"?"page":undefined} title="Türkçe">TR</Link>
    </nav>
    <button className={styles.themeButton} type="button"
      onClick={changeTheme}
      aria-label={theme==="dark"?label.themeLight:label.themeDark}
      title={theme==="dark"?label.themeLight:label.themeDark}>
      <span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span>
      <span className={styles.themeText}>{theme==="dark"?label.themeLightShort:label.themeDarkShort}</span>
    </button>
  </div>;
}
