"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import { PUBLIC_PROJECTS, type ProjectGroup } from "./projects";
import styles from "./experience.module.css";
import { AVAILABILITY_COPY, availabilityOf, type AvailabilityFilter } from "./availability";

type Filter = "all" | ProjectGroup;
export default function ProjectExplorer({locale}:{locale:Locale}) {
  const [filter,setFilter] = useState<Filter>("all");
  const [query,setQuery] = useState("");
  const [availability,setAvailability] = useState<AvailabilityFilter>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      )) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  const t=TEXT[locale];
  const access=AVAILABILITY_COPY[locale];
  const filters: {id:Filter; label:string}[] = [
    {id:"all",label:t.filterAll},
    {id:"product",label:t.filterProduct},
    {id:"backend",label:t.filterBackend},
    {id:"tools",label:t.filterTools}
  ];
  const searchCopy = {
    en: { label: "Search projects or technologies", placeholder: "Try React, Mizan or API…", clear: "Clear search", empty: "No matching projects. Try another keyword or reset the filters.", reset: "Show all projects", hint: "Press / to search" },
    ar: { label: "ابحث عن مشروع أو تقنية", placeholder: "جرّب React أو Mizan أو API…", clear: "مسح البحث", empty: "ما لقينا مشاريع مطابقة. جرّب كلمة ثانية أو امسح الفلاتر.", reset: "عرض كل المشاريع", hint: "اضغط / للبحث" },
    tr: { label: "Proje veya teknoloji ara", placeholder: "React, Mizan veya API deneyin…", clear: "Aramayı temizle", empty: "Eşleşen proje bulunamadı. Başka bir kelime deneyin veya filtreleri sıfırlayın.", reset: "Tüm projeleri göster", hint: "Aramak için / tuşuna basın" },
  }[locale];
  const previewLabel = {
    en: "Real project interface preview",
    ar: "معاينة من واجهة المشروع الحقيقية",
    tr: "Gerçek proje arayüzü önizlemesi",
  }[locale];
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const filtered = PUBLIC_PROJECTS.filter(p => {
    if (filter !== "all" && p.group !== filter) return false;
    if (availability !== "all" && availabilityOf(p) !== availability) return false;
    if (!normalizedQuery) return true;
    const searchable = [p.name, p.id, ...p.stack, p.text[locale].headline, p.text[locale].description]
      .join(" ").toLocaleLowerCase(locale);
    return searchable.includes(normalizedQuery);
  });
  const resetSearch = () => { setQuery(""); setFilter("all"); setAvailability("all"); inputRef.current?.focus(); };
  return <>
    <div className={styles.projectToolbar}>
      <div className={styles.filterList} role="group" aria-label={t.projectEyebrow}>
        {filters.map(item=><button key={item.id} type="button"
          className={filter===item.id?styles.filterActive:styles.filter}
          aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}
      </div>
      <output className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2,"0")} {t.projectCount}</output>
    </div>
    <div className={styles.projectSearchBar}>
      <div className={styles.projectSearchField}>
        <label htmlFor="portfolio-project-search">{searchCopy.label}</label>
        <div className={styles.projectSearchInput}>
          <span aria-hidden="true" className={styles.projectSearchSymbol}>⌕</span>
          <input id="portfolio-project-search" ref={inputRef} type="search" autoComplete="off"
            value={query} placeholder={searchCopy.placeholder}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === "Escape" && query) { event.preventDefault(); setQuery(""); } }}
            aria-controls="portfolio-project-results" />
          {query ? <button type="button" aria-label={searchCopy.clear}
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}>×</button> : <kbd aria-hidden="true">/</kbd>}
        </div>
      </div>
      <span className={styles.projectSearchHint}>{searchCopy.hint}</span>
    </div>
    <div className={styles.availabilityBar}>
      <label htmlFor="portfolio-availability">{access.label}</label>
      <select id="portfolio-availability" value={availability}
        aria-describedby="portfolio-availability-note" aria-controls="portfolio-project-results"
        onChange={event=>setAvailability(event.target.value as AvailabilityFilter)}>
        <option value="all">{access.all}</option>
        {(["demo","limited","source","api"] as const).map(value=><option key={value} value={value}>{access.status[value]}</option>)}
      </select>
      <p id="portfolio-availability-note">{access.note}</p>
    </div>
    <div className={styles.projectGrid} id="portfolio-project-results">
      {filtered.map((p,index)=><article className={styles.project} key={p.id} data-project-id={p.id}>
        <div className={styles.cardTop}>
          <span className={styles.projectNumber}>{String(index+1).padStart(2,"0")} / {String(filtered.length).padStart(2,"0")}</span>
          <span className={p.original?styles.originalTag:styles.forkTag}>{p.original?t.original:t.fork}</span>
        </div>
        {p.cover ? <div className={styles.projectPreview}><Image unoptimized src={p.cover} alt={`${p.name} — ${previewLabel}`} width={1280} height={720} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1020px) 45vw, 420px" loading="lazy" fetchPriority="low" decoding="async" className={styles.projectPreviewImage}/></div> : <div className={styles.projectPlaceholder} aria-hidden="true"><span>{p.group}</span><strong>{p.name}</strong></div>}
        <h3>{p.name}</h3>
        <span className={styles.projectAvailability} data-availability={availabilityOf(p)}>{access.status[availabilityOf(p)]}</span>
        <strong className={styles.projectHeadline}>{p.text[locale].headline}</strong>
        <p>{p.text[locale].description}</p>
        <div className={styles.pillRow}>{p.stack.map(v=><span key={v}>{v}</span>)}</div>
        <div className={styles.projectActions}>
          {p.study?<a href={p.study} className={styles.projectPrimary}>{t.caseStudy}<span aria-hidden="true">↗</span></a>:null}
          {p.demo?<a href={p.demo} target="_blank" rel="noopener noreferrer">{p.demoNotice ? ({en:"Interface preview · limited",ar:"معاينة الواجهة · محدودة",tr:"Arayüz önizlemesi · sınırlı"}[locale]) : t.live}<span aria-hidden="true">↗</span></a>:null}
          <a href={p.source} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true">↗</span></a>
        </div>
        {p.demoNotice ? <p className={styles.projectDemoNotice} data-demo-notice>{p.demoNotice[locale]}</p> : null}
      </article>)}
    </div>
    {filtered.length === 0 ? <div className={styles.projectEmpty} data-empty-project-results role="status">
      <p>{searchCopy.empty}</p>
      <button type="button" onClick={resetSearch}>{searchCopy.reset} ↗</button>
    </div> : null}
    <p className={styles.repoNotice}>{t.repoNotice} {t.otherLocaleNote}</p>
  </>;
}
