import Image from "next/image";
import type {Locale} from "./locale";
import {PUBLIC_PROJECTS} from "./projects";
import evidence from "./project-captures.json";
import styles from "./featured.module.css";

type Capture={src:string;sourceUrl:string;capturedAt:string;sha256:string;verified:boolean;publicPageStatus?:string};
const captures=evidence.screenshots as Record<string,Capture>;

const copy={
 en:{title:"FEATURED PROJECTS",more:"Explore all projects",study:"Case study",demo:"Live application",source:"Source repository",proof:"Real public-site screenshot",notice:"Public service reconnecting at capture",noImage:"Public screenshot is unavailable"},
 ar:{title:"مشاريعي المميزة",more:"عرض كل المشاريع",study:"دراسة المشروع",demo:"الموقع المباشر",source:"مستودع الكود",proof:"لقطة حقيقية من الموقع العام",notice:"الخدمة كانت تعيد الاتصال وقت التصوير",noImage:"اللقطة الحقيقية غير متاحة"},
 tr:{title:"ÖNE ÇIKAN PROJELER",more:"Tüm projeleri keşfet",study:"Proje incelemesi",demo:"Canlı uygulama",source:"Kaynak kod",proof:"Gerçek açık site görüntüsü",notice:"Yakalama sırasında bağlantı yenileniyordu",noImage:"Gerçek ekran görüntüsü yok"},
} as const;

export default function FeaturedSystems({locale}:{locale:Locale}){
 const t=copy[locale];
 const featured=PUBLIC_PROJECTS.filter(p=>["eventify","bookbookhaven","fitflow-gym"].includes(p.id));
 return <section id="featured" className={styles.featured} data-featured-showcase="true" aria-labelledby="featured-heading">
  <div className={styles.heading}><h2 id="featured-heading"><span/>{t.title}</h2><a href="#work">{t.more} <span aria-hidden="true">↗</span></a></div>
  <div className={styles.stories}>
   {featured.map((project,index)=>{
    const cap=captures[project.id];
    return <article className={styles.story} data-featured-system={project.id} data-visual-source={cap?.verified?"live-screenshot":"unverified"} key={project.id}>
      <div className={styles.imageBox}>
       {cap?.verified?
        <Image src={cap.src} alt={t.proof+" · "+project.name} width={1440} height={900} unoptimized className={styles.image} />:
        <div className={styles.unverified}>{t.noImage}</div>}
       <span className={styles.index}>0{index+1} / 03</span>
      </div>
      <div className={styles.titleRow}><h3>{project.name}</h3>{project.study?<a href={project.study} aria-label={t.study+" · "+project.name}>↗</a>:null}</div>
      <p className={styles.description}>{project.text[locale].headline}</p>
      <ul className={styles.tags}>{project.stack.slice(0,3).map(tech=><li key={tech}>{tech}</li>)}</ul>
      <div className={styles.links}>
       {project.study?<a href={project.study}>{t.study} ↗</a>:null}
       {project.demo?<a href={project.demo} target="_blank" rel="noopener noreferrer">{t.demo} ↗</a>:null}
       <a href={project.source} target="_blank" rel="noopener noreferrer">{t.source} ↗</a>
      </div>
      {cap?.publicPageStatus==="degraded"?<p className={styles.warning}>{t.notice}</p>:null}
    </article>;
   })}
  </div>
 </section>;
}
