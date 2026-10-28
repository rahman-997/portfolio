import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HoloInterface from "../components/HoloInterface";
import PortfolioSections from "../components/PortfolioSections";
import PortfolioNextSections from "../components/PortfolioNextSections";
import LanguageLinks from "../components/LanguageLinks";
import { PROFILE_LINKS, PROJECT_LIST } from "../portfolio-data";
import { alternateLinks, isTranslationLocale, localePath, translation } from "../i18n";
import home from "../home.module.css";
import local from "./locale.module.css";

type Props = { params: Promise<{locale: string}> };
export const dynamicParams = false;
export function generateStaticParams(){return [{locale:"ar"},{locale:"tr"}];}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale}=await params;if(!isTranslationLocale(locale))return {};
  const t=translation(locale);
  return {
    title: t.name+" | "+t.job,
    description:t.lead,
    alternates:{canonical:localePath(locale),languages:alternateLinks("home")},
    openGraph:{title:t.name+" | "+t.job,description:t.lead,locale:locale==="ar"?"ar_AR":"tr_TR"},
  };
}
const stack=["TypeScript","JavaScript","React","Next.js","Node.js","Express","PostgreSQL","Prisma","MongoDB","Redis","Zod","REST","GraphQL","WebSockets","Docker","GitHub Actions","CI/CD","AI / LLM / MCP","FastAPI","Flutter"];
export default async function LocalizedHome({params}:Props){
  const {locale}=await params;
  if(!isTranslationLocale(locale))notFound();
  const t=translation(locale);
  return (
    <div className={home.page+" "+local.localized} lang={locale} dir={locale==="ar"?"rtl":"ltr"}>
      <a className={home.skip} href="#main">{t.nav.skip}</a>
      <header className={home.header}>
        <Link className={home.identity} href={localePath(locale)} aria-label={t.nav.home}>
          <span className={home.monogram}>AH</span><span><strong>{t.name}</strong><small>{t.role}</small></span>
        </Link>
        <nav className={home.nav} aria-label={t.nav.home}>
          <a href="#work">{t.nav.work}</a><a href="#systems">{t.nav.systems}</a><a href="#process">{t.nav.process}</a>
          <a href="#about">{t.nav.about}</a><Link href={localePath(locale,"resume")}>{t.nav.resume}</Link>
        </nav>
        <LanguageLinks locale={locale}/>
      </header>
      <main id="main">
        <section id="top" className={home.hero}>
          <div className={home.heroGrid} aria-hidden="true" />
          <div className={home.heroCopy}>
            <p className={home.kicker}>{t.job}</p>
            <h1>{t.headline1}<span>{t.headline2}</span></h1>
            <p className={home.heroLead}>{t.lead}</p>
            <div className={home.heroActions}>
              <a className={home.primaryAction} href="#work">{t.explore} ↗</a>
              <Link className={home.secondaryAction} href={localePath(locale,"resume")}>{t.viewResume}</Link>
            </div>
          </div>
          <div className={home.heroVisual}>
            <div dir="ltr"><HoloInterface locale={locale}/></div>
            <details className={home.heroProofDetails}>
              <summary>{t.proofTitle} <span aria-hidden="true">+</span></summary>
              <aside className={home.heroProof} aria-label={t.proofTitle}>
                <div className={home.proofHeader}><span>{t.proofTitle}</span><span className={home.status}><i/>{t.location}</span></div>
                <div className={home.proofBody}><p>{t.focus}</p><strong>{t.focusText}</strong>
                  <div className={home.proofRows}>
                    <div><span>{t.product}</span><b dir="ltr">React · Next.js · TypeScript</b></div>
                    <div><span>{t.backend}</span><b dir="ltr">Node.js · Express · APIs</b></div>
                    <div><span>{t.data}</span><b dir="ltr">PostgreSQL · MongoDB · Redis</b></div>
                    <div><span>{t.systemsShort}</span><b dir="ltr">Queues · CI/CD · reliability</b></div>
                  </div>
                </div>
                <div className={home.proofFooter}><span>{t.edu}</span><strong>{t.institution}</strong></div>
              </aside>
            </details>
          </div>
        </section>
        <section className={home.signalStrip} aria-label={t.featured}>
          {[PROJECT_LIST.length+" "+t.featured,t.deployed,t.source,t.studies,t.ready].map(x=><span key={x}>{x}</span>)}
        </section>
        <section className={home.work} id="work">
          <div className={home.sectionIntro}><p>{t.sectionWork}</p><div><h2>{t.workTitle}</h2><p>{t.workText}</p></div></div>
          <div className={home.projectStack}>
            {PROJECT_LIST.map(project=>{
              const item=t.projects[project.slug];
              return <article className={home.project} key={project.slug}>
                <div className={home.projectRail}><span>{project.index}</span><small>{item.label}</small></div>
                <div className={home.projectNarrative}>
                  <h3 dir="ltr">{project.name}</h3><h4>{item.thesis}</h4><p>{item.summary}</p>
                  <div className={home.projectProof}>{item.reliability.map(x=><span key={x}>{x}</span>)}</div>
                  <div className={home.projectLinks}>
                    <Link href={localePath(locale,"work",project.slug)}>{t.caseStudy} ↗</Link>
                    <a href={project.live} rel="noreferrer" target="_blank">{t.live} ↗</a>
                    <a href={project.source} rel="noreferrer" target="_blank">{t.sourceLink} ↗</a>
                  </div>
                </div>
                <div className={home.projectEvidence}>
                  <div className={home.productFrame}>
                    <div className={home.browserBar} dir="ltr"><i/><i/><i/><span>{project.name.toLowerCase()}.system</span></div>
                    {project.cover?<div className={home.productImage} style={{backgroundImage:"url("+project.cover+")"}} aria-hidden="true"/>:
                      <div className={local.codeDiagram} dir="ltr" aria-label={project.name+" API"}>HTTP REQUEST → VALIDATE → SERVICE → RESPONSE</div>}
                    <div className={local.projectOverlay}><small>{project.index} / {t.featured}</small><strong dir="ltr">{project.name}</strong><span>{item.label}</span></div>
                  </div>
                  <div className={home.stackLine} dir="ltr">{project.stack.map(x=><span key={x}>{x}</span>)}</div>
                </div>
              </article>;
            })}
          </div>
        </section>
        <section className={home.systems} id="systems">
          <div className={home.sectionIntro}><p>{t.systemHeading}</p><div><h2>{t.systemsTitle}</h2><p>{t.systemsText}</p></div></div>
          <div className={home.architecture}>
            <div className={home.architectureIntro}><span>{t.flowTitle}</span><h3 dir="ltr">Product → API → Data → Async → Delivery</h3><p>{t.flowDesc}</p></div>
            <div className={home.layerList}>{t.flowLabels.map((v,i)=><div className={home.layer} key={v}>
              <span>{String(i+1).padStart(2,"0")}</span><strong>{v}</strong><p>{t.flowText[i]}</p>
            </div>)}</div>
          </div>
          <div className={home.engineeringGrid}>{t.pillars.map(([title,body])=><article key={title}><span>{title}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
        <section className={home.stackSection}><div className={home.stackHeading}><p>{t.techTitle}</p><h2>{t.techHeadline}</h2></div>
          <div className={home.techCloud} dir="ltr">{stack.map((x,i)=><span key={x}><i>{String(i+1).padStart(2,"0")}</i>{x}</span>)}</div>
        </section>
        <section className={home.about} id="about">
          <div className={home.aboutHeading}><p>{t.aboutTitle}</p><h2>{t.aboutHeadline}</h2></div>
          <div className={home.aboutCopy}><p className={home.aboutLead}>{t.aboutLead}</p><p>{t.aboutText}</p>
            <div className={home.education}><span>{t.educationSection}</span><div><strong>{t.edu}</strong><p>{t.institution} · {t.location}</p></div></div>
          </div>
        </section>
        <PortfolioSections locale={locale} />
        <PortfolioNextSections locale={locale} />
        <section className={home.resumeCallout}><div><span>{t.nav.resume}</span><h2>{t.resumePromo}</h2></div>
          <div className={home.resumeActions}><Link className={home.primaryAction} href={localePath(locale,"resume")}>{t.viewResume} ↗</Link>
            <a className={home.secondaryAction} href="/Abdulrahman-Hajar-Resume.pdf" download>{t.download} <small>EN</small></a></div>
        </section>
        <section className={home.contact} id="contact"><p>{t.contactTitle}</p><h2>{t.contactHeadline}</h2><p>{t.contactText}</p>
          <div className={home.contactLinks}><a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <Link href={localePath(locale,"resume")}>{t.nav.resume} ↗</Link></div>
        </section>
      </main>
      <footer className={home.footer}><div><span className={home.monogram}>AH</span><span><strong>{t.name}</strong><small>{t.job}</small></span></div><a href="#top">{t.top} ↑</a></footer>
    </div>
  );
}
