"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import type {Locale} from "./locale";
import evidence from "./project-captures.json";
import styles from "./reference.module.css";

const content={
 en:{
  eyebrow:"CASE STUDY / 05 CHAPTERS",title:"Eventify",subtitle:"From concept to product.",
  intro:"The event platform story, from the booking problem to documented system decisions and public source code.",
  action:"View the full case study",prev:"Previous chapter",next:"Next chapter",
  chapters:[
   {short:"The product",heading:"Events worth discovering.",detail:"A real public landing page from the Eventify application. Explore the booking experience and its engineering story.",tags:["React / PWA","Public landing","Eventify"]},
   {short:"The problem",heading:"What happens when an event fills up?",detail:"Booking capacity must remain consistent, while visitors can join a waitlist rather than reaching a dead end.",tags:["Availability","Waitlist","Booking state"]},
   {short:"The solution",heading:"From waitlist to confirmation.",detail:"Durable booking state and explicit actions coordinate cancellation, waiting users and eventual promotion.",tags:["Transactions","Domain rules","Outbox"]},
   {short:"Architecture",heading:"Each layer has a clear role.",detail:"React client, Express API, PostgreSQL, Redis and BullMQ are connected through explicit responsibilities.",tags:["Express","PostgreSQL","BullMQ"]},
   {short:"The evidence",heading:"Inspect the real implementation.",detail:"Read the architecture case study and browse the open code. These diagrams explain design, not live production metrics.",tags:["Source","Testing","Reliability"]}
  ]
 },
 ar:{
  eyebrow:"دراسة حالة / ٥ فصول",title:"Eventify",subtitle:"من الفكرة إلى المنتج.",
  intro:"رحلة تطوير منصة فعاليات متكاملة، من تحدي الحجوزات إلى تصميم النظام والتنفيذ والكود المتاح.",
  action:"عرض دراسة الحالة",prev:"الفصل السابق",next:"الفصل التالي",
  chapters:[
   {short:"المنتج",heading:"فعاليات تستحق الاكتشاف.",detail:"صورة حقيقية من الصفحة العامة لتطبيق Eventify، مع رحلة الحجز والتفاصيل الهندسية.",tags:["React / PWA","صفحة عامة","Eventify"]},
   {short:"المشكلة",heading:"شو بيصير لما تمتلئ المقاعد؟",detail:"لازم يظل عدد الحجوزات متّسقاً، ويقدر الزائر ينضم لقائمة انتظار بدل الوصول إلى طريق مسدود.",tags:["السعة","الانتظار","حالة الحجز"]},
   {short:"الحل",heading:"من الانتظار إلى التأكيد.",detail:"قاعدة بيانات موثوقة وإجراءات واضحة تنسّق إلغاء الحجز وقائمة الانتظار وترقية المستخدم التالي.",tags:["معاملات","قواعد النظام","Outbox"]},
   {short:"المعمارية",heading:"كل طبقة إلها دور واضح.",detail:"واجهة React، وخدمة Express، وPostgreSQL وRedis وBullMQ تتكامل ضمن مسؤوليات محدّدة.",tags:["Express","PostgreSQL","BullMQ"]},
   {short:"الأدلة",heading:"استكشف التنفيذ الحقيقي.",detail:"راجع دراسة المعمارية والكود العام. المخططات تشرح التصميم ولا تمثّل بيانات إنتاج مباشرة.",tags:["الكود","الاختبارات","الاعتمادية"]}
  ]
 },
 tr:{
  eyebrow:"PROJE İNCELEMESİ / 05 BÖLÜM",title:"Eventify",subtitle:"Fikirden çalışan ürüne.",
  intro:"Etkinlik platformunun hikâyesi: rezervasyon sorunundan sistem tasarımına ve herkese açık kaynak koduna.",
  action:"Detaylı incelemeyi aç",prev:"Önceki bölüm",next:"Sonraki bölüm",
  chapters:[
   {short:"Ürün",heading:"Keşfedilecek etkinlikler.",detail:"Eventify uygulamasının gerçek açık ana sayfası, rezervasyon deneyimi ve mühendislik hikâyesi.",tags:["React / PWA","Açık sayfa","Eventify"]},
   {short:"Problem",heading:"Etkinlik dolduğunda ne olur?",detail:"Rezervasyon sayısı tutarlı kalmalı, ziyaretçi çıkmaza girmek yerine bekleme listesine katılabilmeli.",tags:["Kapasite","Bekleme listesi","Durum"]},
   {short:"Çözüm",heading:"Beklemeden onaya.",detail:"Kalıcı kayıtlar ve belirli iş akışları iptal, bekleme ve sıradaki kişinin katılımını koordine eder.",tags:["İşlem","Kurallar","Outbox"]},
   {short:"Mimari",heading:"Her katmanın görevi belli.",detail:"React arayüzü, Express API, PostgreSQL, Redis ve BullMQ açık sorumluluklarla birleşir.",tags:["Express","PostgreSQL","BullMQ"]},
   {short:"Kanıt",heading:"Gerçek uygulamayı inceleyin.",detail:"Mimari incelemesini okuyun ve açık kaynak kodunu görün. Diyagramlar canlı üretim metriği değildir.",tags:["Kaynak kod","Testler","Güvenilirlik"]}
  ]
 }
} as const;
const labels=["01","02","03","04","05"] as const;
const screenshot=evidence.screenshots.eventify;
export default function HomeEventifyStory({locale}:{locale:Locale}){
 const [index,setIndex]=useState(0);
 const t=content[locale];
 const current=t.chapters[index];
 const prev=()=>setIndex(v=>(v+4)%5),next=()=>setIndex(v=>(v+1)%5);
 return <section id="eventify-feature-story" className={styles.caseStory} aria-labelledby="eventify-home-heading">
   <div className={styles.storyCopy}>
    <p className={styles.storyOverline}>{t.eyebrow}</p>
    <h2 id="eventify-home-heading">{t.title}</h2>
    <h3>{t.subtitle}</h3>
    <p>{t.intro}</p>
    <Link href="/work/eventify/" className={styles.storyCta}>{t.action}<span aria-hidden="true">↗</span></Link>
   </div>
   <div className={styles.caseViewport}>
    <div className={styles.storyToolbar}>
      <button onClick={prev} aria-label={t.prev} type="button">‹</button>
      <div className={styles.storyProgress} aria-live="polite"><strong>{labels[index]}</strong> / 05</div>
      <button onClick={next} aria-label={t.next} type="button">›</button>
    </div>
    <div className={styles.storyPanels}>
      {index===0 && screenshot?.verified ?
       <div className={styles.slideImage}><Image src={screenshot.src} alt={current.heading} width={1440} height={900} unoptimized /></div>
       :<div className={styles.slideDiagram} aria-hidden="true"><span>{labels[index]}</span><div className={styles.chapterGlyphs}><i/><i/><i/></div></div>}
      <div className={styles.slideContent} aria-live="polite" aria-atomic="true">
       <span>{current.short}</span><h4>{current.heading}</h4><p>{current.detail}</p>
       <div>{current.tags.map(tag=><small key={tag}>{tag}</small>)}</div>
      </div>
    </div>
    <div className={styles.chapterTabs} role="tablist" aria-label={t.eyebrow}>
      {t.chapters.map((chapter,i)=><button key={labels[i]} type="button" data-eventify-slide={labels[i]}
        role="tab" aria-selected={i===index} tabIndex={i===index?0:-1}
        className={i===index?styles.chapterActive:styles.chapter} onClick={()=>setIndex(i)}>
        <span>{labels[i]}</span><strong>{chapter.short}</strong>
      </button>)}
    </div>
   </div>
 </section>;
}
