"use client";
import {useState} from "react";
import type {Locale} from "./locale";
import styles from "./labs.module.css";

const copy={
 en:{
  eyebrow:"SYSTEM BLUEPRINT / CLICK TO EXPLORE",title:"Look beneath",title2:"the interface.",
  lead:"Switch between real project architectures to inspect the decisions behind each experience. Simplified explanatory diagrams, not live telemetry.",
  select:"Select a project architecture",illustrative:"CONCEPTUAL FLOW · NOT LIVE DATA",
  proof:"READ TECHNICAL CASE STUDY",source:"SOURCE CODE",logic:"INSPECT THE FLOW",
  projects:[
   {key:"eventify",name:"Eventify",kind:"RELIABLE BOOKING PIPELINE",headline:"Durable intent before background work.",
    detail:"An event booking path that treats the database as the source of truth, recording async intent before workers process it. This is a simplified view of the documented implementation.",
    layers:[{code:"01",name:"Booking UI",caption:"Human request"},{code:"02",name:"API + validation",caption:"Guard the contract"},{code:"03",name:"PostgreSQL + outbox",caption:"Persist durable intent"},{code:"04",name:"BullMQ worker",caption:"Process async work"}],
    study:"/work/eventify/",source:"https://github.com/rahman-997/eventify"},
   {key:"bookhaven",name:"BookHaven",kind:"COMMERCE STATE MACHINE",headline:"Checkout as a system, not a button.",
    detail:"Authentication, checkout and inventory decisions connect the storefront to order state. An architectural sketch of documented flows, not a live transaction dashboard.",
    layers:[{code:"01",name:"Storefront",caption:"Discover + cart"},{code:"02",name:"Authenticated API",caption:"Authorize request"},{code:"03",name:"Order workflow",caption:"Guard transitions"},{code:"04",name:"Inventory",caption:"Keep products aligned"}],
    study:"/work/bookhaven/",source:"https://github.com/rahman-997/bookbookhaven"},
   {key:"fitflow",name:"FitFlow",kind:"LOCAL-FIRST EXPERIENCE",headline:"A product that works with device state.",
    detail:"An installable training journey designed around guided sessions, weekly progress and local-first persistence. This diagram summarizes the public product case study.",
    layers:[{code:"01",name:"Training UI",caption:"Plan + sessions"},{code:"02",name:"Interval engine",caption:"Guide activity"},{code:"03",name:"Local state",caption:"Remember progress"},{code:"04",name:"Installable PWA",caption:"Return to the flow"}],
    study:"/work/fitflow/",source:"https://github.com/rahman-997/fitflow-gym"},
  ],
 },
 ar:{
  eyebrow:"مخططات الأنظمة / اختر لتستكشف",title:"اكتشف ما وراء",title2:"الواجهة.",
  lead:"انتقل بين معماريات مشاريع حقيقية لتفهم القرارات الهندسية. هذه مخططات توضيحية مبسّطة وليست بيانات تشغيل حية.",
  select:"اختر معمارية المشروع",illustrative:"مخطط توضيحي · ليس بيانات مباشرة",
  proof:"اقرأ الدراسة التقنية",source:"الكود المصدري",logic:"استكشف التدفق",
  projects:[
   {key:"eventify",name:"Eventify",kind:"مسار حجوزات موثوق",headline:"تسجيل المهمة الدائمة قبل تنفيذها.",
    detail:"تعتمد الحجوزات على قاعدة البيانات كمصدر للحقيقة، مع تسجيل نية المهام الخلفية قبل تنفيذها. هذا تبسيط للهندسة الموثقة.",
    layers:[{code:"01",name:"واجهة الحجز",caption:"طلب المستخدم"},{code:"02",name:"API والتحقق",caption:"حماية العقود"},{code:"03",name:"PostgreSQL + Outbox",caption:"حفظ الحالة والنية"},{code:"04",name:"عامل BullMQ",caption:"تنفيذ المهمة لاحقاً"}],
    study:"/work/eventify/",source:"https://github.com/rahman-997/eventify"},
   {key:"bookhaven",name:"BookHaven",kind:"حالة التجارة الإلكترونية",headline:"الدفع نظام متكامل، وليس مجرد زر.",
    detail:"تربط صلاحيات المستخدم والدفع وإدارة المخزون واجهة المتجر بحالة الطلبات. مخطط مفاهيمي مبني على الوظائف الموثّقة.",
    layers:[{code:"01",name:"واجهة المتجر",caption:"اكتشاف وسلة"},{code:"02",name:"API بصلاحيات",caption:"التحقق من الطلب"},{code:"03",name:"مراحل الطلب",caption:"حماية الانتقالات"},{code:"04",name:"المخزون",caption:"اتساق المنتجات"}],
    study:"/work/bookhaven/",source:"https://github.com/rahman-997/bookbookhaven"},
   {key:"fitflow",name:"FitFlow",kind:"تجربة تحفظ بياناتها محلياً",headline:"منتج يتذكّر حالة الجهاز.",
    detail:"تجربة لياقة قابلة للتثبيت ترتكز على جلسات موجّهة وتقدّم أسبوعي وحفظ محلي. المخطط يلخص الدراسة العامة للمشروع.",
    layers:[{code:"01",name:"واجهة التدريب",caption:"خطط وجلسات"},{code:"02",name:"محرك الفواصل",caption:"توجيه التمرين"},{code:"03",name:"حالة محلية",caption:"حفظ التقدم"},{code:"04",name:"تطبيق PWA",caption:"متابعة التجربة"}],
    study:"/work/fitflow/",source:"https://github.com/rahman-997/fitflow-gym"},
  ],
 },
 tr:{
  eyebrow:"SİSTEM PLANI / KEŞFETMEK İÇİN SEÇİN",title:"Arayüzün",title2:"ötesine bakın.",
  lead:"Gerçek projelerin mimarileri arasında geçerek mühendislik kararlarını keşfedin. Bunlar canlı telemetri değil, basitleştirilmiş açıklayıcı şemalardır.",
  select:"Proje mimarisi seçin",illustrative:"KAVRAMSAL AKIŞ · CANLI VERİ DEĞİL",
  proof:"TEKNİK İNCELEMEYİ OKU",source:"KAYNAK KOD",logic:"AKIŞI İNCELE",
  projects:[
   {key:"eventify",name:"Eventify",kind:"GÜVENİLİR REZERVASYON HATTI",headline:"Arka plan işleminden önce kalıcı niyet.",
    detail:"Veritabanının temel doğruluk kaynağı olduğu, arka plan işlerinin önceden kaydedildiği bir rezervasyon akışı. Belgelenmiş tasarımın basitleştirilmiş görünümü.",
    layers:[{code:"01",name:"Rezervasyon UI",caption:"Kullanıcı isteği"},{code:"02",name:"API + doğrulama",caption:"Sözleşmeyi koru"},{code:"03",name:"PostgreSQL + outbox",caption:"Niyeti kalıcı sakla"},{code:"04",name:"BullMQ worker",caption:"Asenkron işle"}],
    study:"/work/eventify/",source:"https://github.com/rahman-997/eventify"},
   {key:"bookhaven",name:"BookHaven",kind:"E-TİCARET DURUM AKIŞI",headline:"Ödeme bir düğmeden fazlasıdır.",
    detail:"Kimlik doğrulama, ödeme ve stok kararları vitrini sipariş durumuna bağlar. Canlı alışveriş paneli değil, belgelenmiş akışın kavramsal çizimidir.",
    layers:[{code:"01",name:"Mağaza arayüzü",caption:"Keşif + sepet"},{code:"02",name:"Yetkili API",caption:"İsteği doğrula"},{code:"03",name:"Sipariş süreci",caption:"Geçişleri koru"},{code:"04",name:"Envanter",caption:"Stok tutarlılığı"}],
    study:"/work/bookhaven/",source:"https://github.com/rahman-997/bookbookhaven"},
   {key:"fitflow",name:"FitFlow",kind:"YEREL ÖNCELİKLİ DENEYİM",headline:"Cihaz durumuyla çalışan ürün.",
    detail:"Yönlendirmeli seanslar, haftalık ilerleme ve yerel veri saklama etrafında tasarlanmış kurulabilir antrenman deneyimi. Herkese açık incelemenin özeti.",
    layers:[{code:"01",name:"Antrenman UI",caption:"Plan + seans"},{code:"02",name:"Aralık motoru",caption:"Etkinliği yönlendir"},{code:"03",name:"Yerel durum",caption:"İlerlemeyi sakla"},{code:"04",name:"Kurulabilir PWA",caption:"Akışa geri dön"}],
    study:"/work/fitflow/",source:"https://github.com/rahman-997/fitflow-gym"},
  ],
 },
} as const;
export default function BlueprintLab({locale}:{locale:Locale}){
 const [active,setActive]=useState(0);
 const t=copy[locale];const p=t.projects[active];
 return <section id="blueprint-lab" className={styles.blueprint} aria-labelledby="blueprint-title">
   <div className={styles.heading}>
     <span className={styles.overline}><span className={styles.glint}/> {t.eyebrow}</span>
     <h2 id="blueprint-title">{t.title}<br/><em>{t.title2}</em></h2>
     <p>{t.lead}</p>
   </div>
   <div className={styles.console}>
     <div className={styles.consoleHeader}><div><span className={styles.screenDot}/><strong>AH / ARCHITECTURE EXPLORER</strong></div><span className={styles.consoleTag}>{t.illustrative}</span></div>
     <div className={styles.selectors} data-blueprint-selector="true" role="group" aria-label={t.select}>
       {t.projects.map((item,index)=><button key={item.key} onClick={()=>setActive(index)} type="button"
         aria-pressed={active===index} className={active===index?styles.selected:styles.selector}>
         <span>0{index+1} /</span><strong>{item.name}</strong>
       </button>)}
     </div>
     <div className={styles.consoleBody}>
       <div className={styles.diagram} key={p.key} role="img" aria-label={p.kind+": "+p.layers.map(l=>l.name).join(" → ")}>
         <div className={styles.diagramBackdrop} aria-hidden="true"/>
         <span className={styles.diagramMicro}>{t.logic} / {p.name.toUpperCase()}</span>
         <ol className={styles.nodeFlow}>
           {p.layers.map((layer,i)=><li className={styles.diagramNode} key={layer.code}>
             <div className={styles.nodeHead}><span>{layer.code}</span><span className={styles.nodeIndicator}/></div>
             <strong>{layer.name}</strong><small>{layer.caption}</small>
             {i<p.layers.length-1&&<span aria-hidden="true" className={styles.nodeArrow}>→</span>}
           </li>)}
         </ol>
         <div className={styles.diagramFooter} aria-hidden="true"><span>INPUT / CONTRACT / STATE / OUTCOME</span><span>AH · 2026</span></div>
       </div>
       <div className={styles.blueprintAside} aria-live="polite" aria-atomic="true">
         <span className={styles.asideEyebrow}>{p.kind}</span>
         <h3>{p.headline}</h3><p>{p.detail}</p>
         <div className={styles.proofLinks}>
           <a href={p.study}>{t.proof}<span aria-hidden="true">↗</span></a>
           <a href={p.source} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true">↗</span></a>
         </div>
         <div className={styles.asideFooter}>ENGINEERED FOR CLARITY / NOT A LIVE CONTROL SYSTEM</div>
       </div>
     </div>
   </div>
 </section>;
}
