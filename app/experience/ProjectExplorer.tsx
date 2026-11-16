"use client";
import { useState } from "react";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import { ALL_PROJECTS, ALL_PROJECT_COUNT, filterPortfolioProjects, projectStage, type ProjectGroup } from "./projects";
import styles from "./experience.module.css";

type Filter = "all" | ProjectGroup;
export default function ProjectExplorer({locale}:{locale:Locale}) {
  const [filter,setFilter] = useState<Filter>("all");
  const [query,setQuery] = useState("");
  const t=TEXT[locale];
  const filters: {id:Filter; label:string}[] = [
    {id:"all",label:t.filterAll},
    {id:"product",label:t.filterProduct},
    {id:"backend",label:t.filterBackend},
    {id:"tools",label:t.filterTools},
    {id:"web",label:t.filterWeb}
  ];
  const filtered=filterPortfolioProjects(filter,query);
  return <>
    <label className={styles.projectSearch} htmlFor="project-search">
      <span>{t.searchProjects}</span>
      <input id="project-search" type="search" dir="auto" value={query} maxLength={120}
        aria-controls="project-grid" placeholder={t.searchPlaceholder}
        onChange={event=>setQuery(event.target.value)} />
    </label>
    <div className={styles.projectToolbar}>
      <div className={styles.filterList} role="group" aria-label={t.projectEyebrow}>
        {filters.map(item=><button key={item.id} type="button"
          className={filter===item.id?styles.filterActive:styles.filter}
          aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}
      </div>
      <output className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2,"0")} {t.projectCount}</output>
    </div>
    <div id="project-grid" className={styles.projectGrid} data-project-total={ALL_PROJECT_COUNT}>
      {filtered.map(p=><article className={styles.project} key={p.id} data-project-id={p.id}
        data-project-group={p.group} data-project-stage={projectStage(p)} data-source-visibility={p.source?"public":"private"}>
        <div className={styles.cardTop}>
          <span className={styles.projectNumber}><bdi dir="ltr">{String(ALL_PROJECTS.indexOf(p)+1).padStart(2,"0")} / {String(ALL_PROJECT_COUNT).padStart(2,"0")}</bdi></span>
          <span className={p.original?styles.originalTag:styles.forkTag}>{p.clientWork?t.clientWork:p.original?t.original:t.fork}</span>
        </div>
        <div className={styles.cardGlyph} aria-hidden="true">{p.group==="backend"?"{ }":p.group==="tools"?"✳":"↗"}</div>
        <h3><bdi dir="auto">{p.name}</bdi></h3>
        <span className={styles.projectStage}>{t.projectStages[projectStage(p)]}</span>
        <strong className={styles.projectHeadline}>{p.text[locale].headline}</strong>
        <p>{p.text[locale].description}</p>
        <div className={styles.pillRow}>{p.stack.map(v=><span key={v}><bdi dir="ltr">{v}</bdi></span>)}</div>
        <div className={styles.projectActions}>
          {p.study?<a href={p.study} className={styles.projectPrimary}>{t.caseStudy}<span aria-hidden="true">↗</span></a>:null}
          {p.demo?<a href={p.demo} target="_blank" rel="noopener noreferrer">{t.live}<span aria-hidden="true">↗</span></a>:null}
          {p.source?<a href={p.source} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true">↗</span></a>:
            <><a href="#contact" className={styles.projectPrimary}>{t.discussProject}<span aria-hidden="true">↗</span></a><span className={styles.privateSource}>{t.privateSource}</span></>}
        </div>
      </article>)}
    </div>
    {filtered.length===0?<div className={styles.emptyProjects} role="status"><p>{t.noProjects}</p>
      <button type="button" onClick={()=>{setQuery("");setFilter("all");}}>{t.resetProjects}</button></div>:null}
    <p className={styles.repoNotice}>{t.repoNotice} {t.otherLocaleNote}</p>
  </>;
}
