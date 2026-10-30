import Image from "next/image";
import type { Locale } from "./locale";
import { PUBLIC_PROJECTS } from "./projects";
import proof from "./project-captures.json";
import styles from "./featured.module.css";

const design = {
 en:{
  eyebrow:"SELECTED SYSTEMS / THREE DEEP DIVES",
  title:"Not just code.",second:"Built worlds.",
  lead:"Three shipped engineering stories. Explore the product, trace the architecture, and inspect the actual source.",
  study:"EXPLORE THE CASE STUDY",
  demo:"VIEW LIVE PROJECT",
  index:"FEATURED 03 / 07",
  category:["EVENT SYSTEMS","DIGITAL COMMERCE","PRODUCT EXPERIENCE"],
  proof:"REAL PROJECT · VERIFIED SOURCE",
  browse:"VIEW EVERY REPOSITORY",
 },
 ar:{
  eyebrow:"أنظمة مختارة / ثلاث دراسات معمقة",
  title:"ليس مجرد كود.",second:"بل عوالم تعمل.",
  lead:"ثلاث تجارب هندسية حقيقية. استكشف المنتج، افهم المعمارية، وراجع الكود الأصلي.",
  study:"اكتشف دراسة المشروع",
  demo:"افتح المشروع الحي",
  index:"مشاريع مختارة 03 / 07",
  category:["أنظمة الفعاليات","التجارة الرقمية","تجربة المنتج"],
  proof:"مشروع حقيقي · كود موثق",
  browse:"استعرض كل المستودعات",
 },
 tr:{
  eyebrow:"SEÇİLMİŞ SİSTEMLER / ÜÇ DETAYLI İNCELEME",
  title:"Yalnızca kod değil.",second:"Çalışan dünyalar.",
  lead:"Üç gerçek mühendislik hikâyesi. Ürünü keşfedin, mimarisini inceleyin ve gerçek kaynak koda ulaşın.",
  study:"TEKNİK İNCELEMEYİ AÇ",
  demo:"CANLI PROJEYİ GÖR",
  index:"SEÇİLMİŞ 03 / 07",
  category:["ETKİNLİK SİSTEMLERİ","DİJİTAL TİCARET","ÜRÜN DENEYİMİ"],
  proof:"GERÇEK PROJE · DOĞRULANMIŞ KOD",
  browse:"TÜM DEPOLARI GÖR",
 },
} as const;
const captures = proof.screenshots as Record<string, {src:string; sourceUrl:string; capturedAt:string; sha256:string; title:string; verified:boolean;publicPageStatus?:string;apiHealthHttp?:number|null}>;
const captureLabels = {
  en:{photo:"PUBLIC SITE · REAL SCREENSHOT",warn:"A public service was reconnecting when captured",none:"LIVE SCREENSHOT NOT VERIFIED",hint:"No replacement artwork: the source and case study are available below.",proof:"Captured from public site"},
  ar:{photo:"لقطة حقيقية من الموقع العام",warn:"إحدى الخدمات كانت تعيد الاتصال وقت التصوير",none:"لم تُتحقّق صورة حية بعد",hint:"لا نستخدم رسماً بديلاً يوهم بأنها واجهة حقيقية. روابط الكود والدراسة أدناه.",proof:"لقطة من الموقع العام"},
  tr:{photo:"AÇIK SİTEDEN GERÇEK EKRAN GÖRÜNTÜSÜ",warn:"Görüntü alınırken bir servis yeniden bağlanıyordu",none:"CANLI EKRAN GÖRÜNTÜSÜ DOĞRULANMADI",hint:"Gerçek arayüzü taklit eden görsel yok. Kaynak kod ve inceleme aşağıda.",proof:"Açık siteden yakalandı"},
} as const;

export default function FeaturedSystems({locale}:{locale:Locale}) {
 const t=design[locale];
 const labels=captureLabels[locale];
 const featured=PUBLIC_PROJECTS.filter(p=>["eventify","bookbookhaven","fitflow-gym"].includes(p.id));
 return <section className={styles.featured} id="featured" data-featured-showcase="true" aria-labelledby="featured-title">
    <div className={styles.sectionIntro}>
      <div className={styles.sectionMicro}><i/>{t.eyebrow}</div>
      <div>
        <h2 id="featured-title"><span>{t.title}</span><em>{t.second}</em></h2>
        <p>{t.lead}</p>
      </div>
      <span className={styles.featureCount}>{t.index}</span>
    </div>
    <div className={styles.stories}>
      {featured.map((p,i)=><article data-featured-system={p.id} key={p.id}
          className={[styles.story,styles["story"+i]].join(" ")}>
        <div className={styles.storyContent}>
          <div className={styles.storyMeta}><span>{String(i+1).padStart(2,"0")} / 03</span><span>{t.category[i]}</span></div>
          <div className={styles.storyWords}>
            <span className={styles.storyProof}><i/>{t.proof}</span>
            <h3>{p.name}</h3>
            <strong>{p.text[locale].headline}</strong>
            <p>{p.text[locale].description}</p>
            <div className={styles.tags}>{p.stack.slice(0,4).map(tag=><span key={tag}>{tag}</span>)}</div>
            <div className={styles.storyActions}>
              {p.study&&<a className={styles.storyLink} href={p.study}>{t.study}<span aria-hidden="true">↗</span></a>}
              {p.demo&&<a className={styles.demoLink} href={p.demo} target="_blank" rel="noopener noreferrer">{t.demo}<span aria-hidden="true">↗</span></a>}
            </div>
          </div>
          <div className={styles.foot}><span>AH / ENGINEERING</span><span>SYSTEM_{String(i+1).padStart(2,"0")}</span></div>
        </div>
        <div className={styles.storyVisual} data-visual-source={captures[p.id]?.verified?"live-screenshot":"unverified"}>
          <div className={styles.visualNoise} aria-hidden="true"/>
          <div className={styles.orbitalDecoration} aria-hidden="true"/>
          {captures[p.id]?.verified?(
            <figure className={styles.browserFrame}>
              <div className={styles.browserBar} aria-hidden="true"><span className={styles.bulbs}><i/><i/><i/></span><span className={styles.browserTitle}>{p.name.toUpperCase()} / {labels.photo}</span><span>↗</span></div>
              <div className={styles.browserImage}>
                <Image src={captures[p.id].src} alt={labels.proof+" · "+p.name+" · "+captures[p.id].capturedAt.slice(0,10)} fill sizes="(max-width: 900px) 90vw, 48vw" className={styles.coverImage} unoptimized/>
              </div>
              <figcaption className={styles.captureCaption}>{labels.proof}: {captures[p.id].capturedAt.slice(0,10)} UTC{captures[p.id].publicPageStatus==="degraded"?<> · <span className={styles.captureWarning}>{labels.warn}</span></>:null}</figcaption>
            </figure>
          ):(
            <div className={styles.unverified}>
              <span className={styles.unverifiedSymbol} aria-hidden="true">⌘</span>
              <strong>{labels.none}</strong>
              <p>{labels.hint}</p>
              <a href={p.source} target="_blank" rel="noopener noreferrer">{t.proof} ↗</a>
            </div>
          )}
          <span className={styles.visualCoordinate}>PROJECT_00{i+1} / {captures[p.id]?.verified?"CAPTURE VERIFIED":"SOURCE VERIFIED"}</span>
        </div>
      </article>)}
    </div>
    <a className={styles.allProjects} href="#work"><span>{t.browse}</span><span aria-hidden="true">↘</span></a>
  </section>;
}
