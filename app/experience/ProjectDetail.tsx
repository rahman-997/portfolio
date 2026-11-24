import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE_URL } from "../portfolio-data";
import ExperienceControls from "./ExperienceControls";
import { ALL_PROJECTS, projectStage } from "./projects";
import { localeHome, TEXT, type Locale } from "./locale";
import { DETAIL_COPY } from "./project-detail-copy";
import { PROJECT_DETAILS } from "./project-details";
import { projectInquiryPath, projectPath } from "./project-paths";
import evidence from "./project-captures.json";
import styles from "./project-detail.module.css";

type Capture = {src:string;capturedAt:string;verified:boolean};
const captures = evidence.screenshots as Record<string,Capture>;
const upstreamByProject: Record<string,string> = {"free-claude-code":"https://github.com/Alishahryar1/free-claude-code"};

export function projectMetadata(id:string,locale:Locale):Metadata {
  const project=ALL_PROJECTS.find(item=>item.id===id);
  if(!project)return {};
  const title=`${project.name} — ${DETAIL_COPY[locale].detail} | Abdulrahman Hajar`;
  const description=project.text[locale].description;
  const canonical=projectPath(locale,id);
  return {
    title,description,
    alternates:{canonical,languages:{en:projectPath("en",id),ar:projectPath("ar",id),tr:projectPath("tr",id)}},
    openGraph:{title,description,type:"article",url:canonical,locale:locale==="ar"?"ar_AR":locale==="tr"?"tr_TR":"en_US",images:[{url:"/opengraph-image",width:1200,height:630,alt:project.name}]},
    twitter:{card:"summary_large_image",title,description,images:["/twitter-image"]}
  };
}

export default function ProjectDetail({id,locale}:{id:string;locale:Locale}) {
  const project=ALL_PROJECTS.find(item=>item.id===id);
  if(!project)notFound();
  const content=PROJECT_DETAILS[id]?.[locale];
  if(!content)throw new Error(`Missing project overview: ${id}/${locale}`);
  const t=DETAIL_COPY[locale];
  const labels=TEXT[locale];
  const role=project.clientWork?t.clientRole:!project.original?t.forkRole:project.group==="backend"?t.backendRole:project.group==="web"?t.webRole:project.group==="tools"?t.toolRole:t.original;
  const capture=captures[id];
  const upstream=upstreamByProject[id];
  const related=ALL_PROJECTS.filter(item=>item.group===project.group&&item.id!==id).slice(0,3);
  const next=ALL_PROJECTS[(ALL_PROJECTS.indexOf(project)+1)%ALL_PROJECTS.length];
  const schema={"@context":"https://schema.org","@type":"TechArticle",headline:`${project.name} — ${t.detail}`,description:project.text[locale].description,inLanguage:locale,url:`${SITE_URL}${projectPath(locale,id)}`,author:{"@id":`${SITE_URL}/#person`},about:{"@type":"SoftwareApplication",name:project.name},keywords:project.stack.join(", ")};
  return <div className={styles.page} lang={locale} dir={locale==="ar"?"rtl":"ltr"} data-project-brief={id}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <a className={styles.skip} href="#project-main">{labels.skip}</a>
    <header className={styles.header}>
      <a className={styles.brand} href={localeHome(locale)} aria-label="Abdulrahman Hajar">
        <Image src="/brand/hajar-emblem.svg" width={35} height={45} alt="" unoptimized/>
        <span><strong>HAJAR</strong><small>Abdulrahman Hajar</small></span>
      </a>
      <ExperienceControls locale={locale} projectId={id}/>
    </header>
    <main id="project-main" tabIndex={-1} className={styles.main}>
      <nav className={styles.breadcrumb} aria-label={t.overview}>
        <a href={`${localeHome(locale)}#work`}>{t.back}</a><span aria-hidden="true">/</span><span aria-current="page"><bdi dir="auto">{project.name}</bdi></span>
      </nav>
      <section className={styles.hero} aria-labelledby="project-title">
        <div><p className={styles.eyebrow}>{t.overview}</p><h1 id="project-title"><bdi dir="auto">{project.name}</bdi></h1>
          <p className={styles.headline}>{project.text[locale].headline}</p><p className={styles.description}>{project.text[locale].description}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={projectInquiryPath(locale,id)}>{t.discuss} <span aria-hidden="true">↗</span></a>
            {project.study?<a href={project.study}>{t.study} <span aria-hidden="true">↗</span></a>:null}
          </div>
        </div>
        <aside className={styles.facts} aria-label={t.role}>
          <div><span>{t.stage}</span><strong data-project-stage={projectStage(project)}>{labels.projectStages[projectStage(project)]}</strong></div>
          <div><span>{t.role}</span><strong>{role}</strong></div>
          <div><span>{t.technology}</span><ul className={styles.stack}>{project.stack.map(tech=><li key={tech}><bdi dir="ltr">{tech}</bdi></li>)}</ul></div>
        </aside>
      </section>
      {capture?.verified?<figure className={styles.figure}>
        <Image src={capture.src} alt={`${project.name} · ${t.overview}`} width={1440} height={900} unoptimized/>
        <figcaption>{t.captured} <time dateTime={capture.capturedAt}><bdi dir="ltr">{capture.capturedAt.slice(0,10)}</bdi></time></figcaption>
      </figure>:null}
      <div className={styles.sections}>
        <section aria-labelledby="audience-title"><span className={styles.number} aria-hidden="true">01</span><h2 id="audience-title">{t.forWhom}</h2><p>{content.audience}</p></section>
        <section aria-labelledby="scope-title"><span className={styles.number} aria-hidden="true">02</span><h2 id="scope-title">{t.scope}</h2><ul>{content.features.map(feature=><li key={feature}>{feature}</li>)}</ul></section>
        <section aria-labelledby="focus-title"><span className={styles.number} aria-hidden="true">03</span><h2 id="focus-title">{t.focus}</h2><p>{content.focus}</p></section>
      </div>
      <section className={styles.references} aria-label={t.source}>
        {!project.source?<p>{t.private}</p>:null}
        {!project.original?<p>{t.credit}</p>:null}
        <div className={styles.actions}>
          {project.source?<a href={project.source} target="_blank" rel="noopener noreferrer">{t.source} ↗</a>:null}
          {project.demo?<a href={project.demo} target="_blank" rel="noopener noreferrer">{t.live} ↗</a>:null}
          {!project.original&&upstream?<a href={upstream} target="_blank" rel="noopener noreferrer" data-upstream-credit="true">{t.upstream} ↗</a>:null}
        </div>
      </section>
      {related.length?<section className={styles.related} aria-labelledby="related-title"><h2 id="related-title">{t.related}</h2><div>{related.map(item=><a href={projectPath(locale,item.id)} key={item.id}><strong><bdi dir="auto">{item.name}</bdi></strong><span>{item.text[locale].headline}</span><span aria-hidden="true">↗</span></a>)}</div></section>:null}
      <a className={styles.next} href={projectPath(locale,next.id)}><span>{t.next}</span><strong><bdi dir="auto">{next.name}</bdi></strong><span aria-hidden="true">↗</span></a>
    </main>
    <footer className={styles.footer}><a href={`${localeHome(locale)}#work`}>{t.back} ↗</a><bdi dir="ltr">© 2026 Abdulrahman Hajar</bdi></footer>
  </div>;
}
