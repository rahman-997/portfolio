import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageLinks from "../../components/LanguageLinks";
import { PROFILE_LINKS, PROJECT_LIST } from "../../portfolio-data";
import { alternateLinks, isTranslationLocale, localePath, translation } from "../../i18n";
import styles from "../../resume/resume.module.css";
import local from "../locale.module.css";

type Props={params:Promise<{locale:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:"ar"},{locale:"tr"}];}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isTranslationLocale(locale))return {};
 const t=translation(locale);
 return {title:t.nav.resume+" | "+t.name,description:t.profileText,alternates:{canonical:localePath(locale,"resume"),languages:alternateLinks("resume")},
   openGraph:{title:t.nav.resume+" | "+t.name,description:t.profileText,locale:locale==="ar"?"ar_AR":"tr_TR"}};
}
const skills=["TypeScript","JavaScript","React","Next.js","Node.js","Express 5","REST APIs","GraphQL","WebSockets","gRPC","OpenAPI","Zod","PostgreSQL","Prisma","MongoDB","Mongoose","Redis","BullMQ","Jest","Supertest","Docker","GitHub Actions","CI/CD","Security","Observability","Accessibility","PWA","AI / LLM / MCP","FastAPI","Flutter"];
export default async function LocalizedResume({params}:Props){
 const {locale}=await params;if(!isTranslationLocale(locale))notFound();
 const t=translation(locale);
 return (
  <main className={styles.page+" "+local.localized} lang={locale} dir={locale==="ar"?"rtl":"ltr"} style={{fontFamily:locale==="ar"?'Tahoma, "Noto Sans Arabic", system-ui, sans-serif':undefined}}>
   <header className={styles.header}>
    <Link className={styles.brand} href={localePath(locale)}><span>AH</span><strong>{t.name}</strong></Link>
    <div className={styles.headerActions}>
      <Link href={localePath(locale)+"#work"}>{t.nav.work}</Link>
      <a href="/resume.html" target="_blank" rel="noreferrer">{t.print} · EN ↗</a>
      <a href="/Abdulrahman-Hajar-Resume.pdf" download>{t.download} · EN ↓</a>
      <LanguageLinks locale={locale} page="resume"/>
    </div>
   </header>
   <section className={styles.hero}>
     <div><p className={styles.kicker}>{t.job}</p><h1>{t.name}</h1><p className={styles.lede}>{t.lead}</p></div>
     <aside className={styles.snapshot} aria-label={t.snapshot}>
       <div><span>{t.role}</span><strong>{t.job}</strong></div>
       <div><span>{t.educationSection}</span><strong>{t.edu} · {t.institution}</strong></div>
       <div><span>{t.location}</span><strong>{t.location}</strong></div>
       <div><span>GitHub</span><a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">github.com/rahman-997 ↗</a></div>
       <div><span>LinkedIn</span><a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
     </aside>
   </section>
   <div className={styles.content}>
     <section className={styles.section}><div className={styles.sectionLabel}><span>01</span><h2>{t.profileSection}</h2></div><p className={styles.profile}>{t.profileText}</p></section>
     <section className={styles.section}><div className={styles.sectionLabel}><span>02</span><h2>{t.educationSection}</h2></div><div className={styles.education}><div><h3>{t.edu}</h3><p>{t.institution} · {t.location}</p></div></div></section>
     <section className={styles.section}><div className={styles.sectionLabel}><span>03</span><h2>{t.skillsSection}</h2></div><div className={styles.skills} dir="ltr">{skills.map(s=><span key={s}>{s}</span>)}</div></section>
     <section className={styles.section}><div className={styles.sectionLabel}><span>04</span><h2>{t.selectedSection}</h2></div>
      <div className={styles.projects}>{PROJECT_LIST.map(project=>(
        <article className={styles.project} key={project.slug}>
          <div><h3 dir="ltr">{project.name}</h3><small>{t.projects[project.slug].label}</small></div>
          <p>{t.projects[project.slug].summary}</p>
          <Link href={localePath(locale,"work",project.slug)}>{t.caseStudy} ↗</Link>
        </article>
      ))}</div>
     </section>
   </div>
   <footer className={styles.footer}>
    <p>{t.name} · {t.job} · {t.location}</p>
    <Link href={localePath(locale)}>{t.nav.home} ↑</Link>
   </footer>
  </main>
 );
}
