"use client";
import { useEffect, useRef, useState } from "react";
import { readExplorerLocation, shouldApplyExplorerSnapshot } from "./project-query-sync.mjs";
import type { Locale } from "./locale";
import { TEXT, localeHome } from "./locale";
import { projectPath, projectInquiryPath } from "./project-paths";
import { ALL_PROJECTS, ALL_PROJECT_COUNT, filterPortfolioProjects, projectStage, type ProjectGroup } from "./projects";
import styles from "./experience.module.css";

type Filter = "all" | ProjectGroup;
export default function ProjectExplorer({locale}:{locale:Locale}) {
  const userInteracted=useRef(false);
  const [filter,setFilter] = useState<Filter>("all");
  const [query,setQuery] = useState("");
  const [ready,setReady] = useState(false);
  const [shareStatus,setShareStatus] = useState<"idle"|"copied"|"manual">("idle");
  const [shareUrl,setShareUrl] = useState("");
  useEffect(()=>{
    let frame=0;
    const sync=(initial:boolean)=>{
      cancelAnimationFrame(frame);
      const snapshot=readExplorerLocation(window.location.search);
      frame=requestAnimationFrame(()=>{
        // A slow initial frame must not erase a search the visitor already typed.
        if(shouldApplyExplorerSnapshot(initial,userInteracted.current)){
          setFilter(snapshot.filter);
          setQuery(snapshot.query);
        }
        setReady(true);
      });
    };
    const onPopState=()=>sync(false);
    sync(true);
    window.addEventListener("popstate",onPopState);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("popstate",onPopState);};
  },[]);
  useEffect(()=>{
    if(!ready)return;
    const url=new URL(window.location.href);
    if(filter==="all")url.searchParams.delete("category");else url.searchParams.set("category",filter);
    if(query.trim())url.searchParams.set("q",query.trim());else url.searchParams.delete("q");
    window.history.replaceState(window.history.state,"",url);
  },[filter,query,ready]);
  const share=async()=>{
    const url=new URL(localeHome(locale),window.location.origin);
    if(filter!=="all")url.searchParams.set("category",filter);
    if(query.trim())url.searchParams.set("q",query.trim());
    url.hash="work";setShareUrl(url.toString());
    try{await navigator.clipboard.writeText(url.toString());setShareStatus("copied");}
    catch{setShareStatus("manual");}
  };
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
    <noscript><p className={styles.repoNotice}>{t.noScript}</p></noscript>
    <label className={styles.projectSearch} htmlFor="project-search">
      <span>{t.searchProjects}</span>
      <input id="project-search" type="search" dir="auto" value={query} maxLength={120}
        aria-controls="project-grid" placeholder={t.searchPlaceholder}
        onChange={event=>{userInteracted.current=true;setQuery(event.target.value);setShareStatus("idle");}} />
    </label>
    <div className={styles.projectToolbar}>
      <div className={styles.filterList} role="group" aria-label={t.projectEyebrow}>
        {filters.map(item=><button key={item.id} type="button"
          className={filter===item.id?styles.filterActive:styles.filter}
          aria-pressed={filter===item.id} onClick={()=>{userInteracted.current=true;setFilter(item.id);setShareStatus("idle");}}>{item.label}</button>)}
      </div>
      <output className={styles.resultCount} aria-live="polite">{t.projectCount}: <bdi dir="ltr">{String(filtered.length).padStart(2,"0")}</bdi></output>
      <button id="share-projects" type="button" className={styles.shareProjects} onClick={()=>void share()}>{t.shareProjects} ↗</button>
    </div>
    {shareStatus!=="idle"?<div className={styles.shareFeedback} role="status"><p>{shareStatus==="copied"?t.linkCopied:t.copyManually}</p>{shareStatus==="manual"?<input aria-label={t.galleryLink} value={shareUrl} readOnly dir="ltr" onFocus={event=>event.target.select()}/>:null}</div>:null}
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
          <a href={projectPath(locale,p.id)} className={styles.projectPrimary}>{t.projectDetails}<span aria-hidden="true">↗</span></a>
          {p.study?<a href={p.study}>{t.caseStudy}<span aria-hidden="true">↗</span></a>:null}
          {p.demo?<a href={p.demo} target="_blank" rel="noopener noreferrer">{t.live}<span aria-hidden="true">↗</span></a>:null}
          {p.source?<a href={p.source} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true">↗</span></a>:
            <><a href={projectInquiryPath(locale,p.id)}>{t.discussProject}<span aria-hidden="true">↗</span></a><span className={styles.privateSource}>{t.privateSource}</span></>}
        </div>
      </article>)}
    </div>
    {filtered.length===0?<div className={styles.emptyProjects} role="status"><p>{t.noProjects}</p>
      <button type="button" onClick={()=>{userInteracted.current=true;setQuery("");setFilter("all");setShareStatus("idle");}}>{t.resetProjects}</button></div>:null}
    <p className={styles.repoNotice}>{t.repoNotice} {t.otherLocaleNote}</p>
  </>;
}
