"use client";
import { useState } from "react";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import { PUBLIC_PROJECTS, type ProjectGroup } from "./projects";
import styles from "./experience.module.css";

type Filter = "all" | ProjectGroup;
export default function ProjectExplorer({locale}:{locale:Locale}) {
  const [filter,setFilter] = useState<Filter>("all");
  const t=TEXT[locale];
  const filters: {id:Filter; label:string}[] = [
    {id:"all",label:t.filterAll},
    {id:"product",label:t.filterProduct},
    {id:"backend",label:t.filterBackend},
    {id:"tools",label:t.filterTools}
  ];
  const filtered=filter==="all"?PUBLIC_PROJECTS:PUBLIC_PROJECTS.filter(p=>p.group===filter);
  return <>
    <div className={styles.projectToolbar}>
      <div className={styles.filterList} role="group" aria-label={t.projectEyebrow}>
        {filters.map(item=><button key={item.id} type="button"
          className={filter===item.id?styles.filterActive:styles.filter}
          aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}
      </div>
      <output className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2,"0")} {t.projectCount}</output>
    </div>
    <div className={styles.projectGrid}>
      {filtered.map((p,index)=><article className={styles.project} key={p.id}>
        <div className={styles.cardTop}>
          <span className={styles.projectNumber}>{String(index+1).padStart(2,"0")} / 07</span>
          <span className={p.original?styles.originalTag:styles.forkTag}>{p.original?t.original:t.fork}</span>
        </div>
        <div className={styles.cardGlyph} aria-hidden="true">{p.group==="backend"?"{ }":p.group==="tools"?"✳":"↗"}</div>
        <h3>{p.name}</h3>
        <strong className={styles.projectHeadline}>{p.text[locale].headline}</strong>
        <p>{p.text[locale].description}</p>
        <div className={styles.pillRow}>{p.stack.map(v=><span key={v}>{v}</span>)}</div>
        <div className={styles.projectActions}>
          {p.study?<a href={p.study} className={styles.projectPrimary}>{t.caseStudy}<span aria-hidden="true">↗</span></a>:null}
          {p.demo?<a href={p.demo} target="_blank" rel="noopener noreferrer">{t.live}<span aria-hidden="true">↗</span></a>:null}
          <a href={p.source} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true">↗</span></a>
        </div>
      </article>)}
    </div>
    <p className={styles.repoNotice}>{t.repoNotice} {t.otherLocaleNote}</p>
  </>;
}
