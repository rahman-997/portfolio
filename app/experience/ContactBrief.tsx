"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE_LINKS } from "../portfolio-data";
import { ALL_PROJECTS } from "./projects";
import type { Locale } from "./locale";
import styles from "./contact-brief.module.css";

const COPY={
  en:{title:"Prepare a project brief",intro:"Choose a direction, add a little context and copy a message to start the conversation.",project:"Project",general:"A new project or general enquiry",goal:"I would like to…",goals:{build:"Build a website or application",improve:"Improve an existing product",review:"Review interface or engineering quality"},timeline:"Timing",timings:{discuss:"Discuss the timing",soon:"Start a conversation soon",flexible:"Flexible"},details:"A few details",placeholder:"Who is it for, what should it do, and what already exists?",prepared:"Your message",copy:"Copy brief",copied:"Brief copied. You can paste it into your own message.",manual:"Select the message below and copy it manually.",linkedin:"Open LinkedIn",privacy:"The brief stays in this page. Copying does not send it or save a form submission.",greeting:"Hello Abdulrahman,",request:"I would like to discuss:",about:"Project:",when:"Timing:"},
  ar:{title:"جهّز ملخص مشروعك",intro:"اختر نوع الطلب، وأضف بعض التفاصيل، ثم انسخ رسالة لبدء التواصل.",project:"المشروع",general:"مشروع جديد أو استفسار عام",goal:"أرغب في…",goals:{build:"تطوير موقع أو تطبيق",improve:"تحسين منتج موجود",review:"مراجعة جودة الواجهة أو البرمجة"},timeline:"التوقيت",timings:{discuss:"مناقشة الموعد",soon:"بدء التواصل قريبًا",flexible:"الموعد مرن"},details:"بعض التفاصيل",placeholder:"لمن المشروع؟ ما وظيفته؟ وما الذي أُنجز منه؟",prepared:"رسالتك",copy:"انسخ الملخص",copied:"نُسخ الملخص. يمكنك لصقه في رسالتك الخاصة.",manual:"حدّد الرسالة أدناه وانسخها يدويًا.",linkedin:"افتح LinkedIn",privacy:"يبقى الملخص ضمن هذه الصفحة. نسخه لا يرسله ولا يحفظ طلبًا في أي نظام.",greeting:"مرحبًا عبدالرحمن،",request:"أرغب في مناقشة:",about:"المشروع:",when:"التوقيت:"},
  tr:{title:"Proje özeti hazırlayın",intro:"Bir yön seçin, birkaç ayrıntı ekleyin ve görüşmeyi başlatmak için mesajı kopyalayın.",project:"Proje",general:"Yeni proje veya genel bilgi talebi",goal:"Şunu istiyorum…",goals:{build:"Web sitesi veya uygulama geliştirme",improve:"Mevcut ürünü iyileştirme",review:"Arayüz veya yazılım kalitesini inceleme"},timeline:"Zamanlama",timings:{discuss:"Zamanlamayı konuşalım",soon:"Yakında görüşmeye başlayalım",flexible:"Esnek"},details:"Birkaç ayrıntı",placeholder:"Kimler için, ne yapmalı ve şu anda neler mevcut?",prepared:"Mesajınız",copy:"Özeti kopyala",copied:"Özet kopyalandı. Kendi mesajınıza yapıştırabilirsiniz.",manual:"Aşağıdaki mesajı seçip elle kopyalayın.",linkedin:"LinkedIn’i aç",privacy:"Özet bu sayfada kalır. Kopyalama mesajı göndermez veya bir form kaydı oluşturmaz.",greeting:"Merhaba Abdulrahman,",request:"Şunu görüşmek istiyorum:",about:"Proje:",when:"Zamanlama:"}
} as const;
type Goal=keyof typeof COPY.en.goals;
type Timing=keyof typeof COPY.en.timings;

export default function ContactBrief({locale}:{locale:Locale}) {
  const t=COPY[locale];
  const panel=useRef<HTMLDetailsElement>(null);
  const [projectId,setProjectId]=useState("");
  const [goal,setGoal]=useState<Goal>("build");
  const [timing,setTiming]=useState<Timing>("discuss");
  const [details,setDetails]=useState("");
  const [status,setStatus]=useState<"idle"|"copied"|"manual">("idle");
  useEffect(()=>{
    const id=new URLSearchParams(window.location.search).get("project");
    if(!id||!ALL_PROJECTS.some(project=>project.id===id))return;
    const frame=requestAnimationFrame(()=>{setProjectId(id);if(panel.current)panel.current.open=true;});
    return ()=>cancelAnimationFrame(frame);
  },[]);
  const project=ALL_PROJECTS.find(item=>item.id===projectId);
  const message=[t.greeting,`${t.request} ${t.goals[goal]}`,project?`${t.about} ${project.name}`:"",`${t.when} ${t.timings[timing]}`,details.trim()].filter(Boolean).join("\n\n");
  const copy=async()=>{
    try{await navigator.clipboard.writeText(message);setStatus("copied");}
    catch{setStatus("manual");}
  };
  return <details id="contact-brief" ref={panel} className={styles.panel}>
    <summary>{t.title}<span aria-hidden="true">＋</span></summary>
    <div className={styles.body}>
      <p>{t.intro}</p>
      <form onSubmit={event=>{event.preventDefault();void copy();}}>
        <div className={styles.fields}>
          <label htmlFor="brief-project">{t.project}<select id="brief-project" value={projectId} onChange={event=>{setProjectId(event.target.value);setStatus("idle");}}><option value="">{t.general}</option>{ALL_PROJECTS.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label htmlFor="brief-goal">{t.goal}<select id="brief-goal" value={goal} onChange={event=>{setGoal(event.target.value as Goal);setStatus("idle");}}>{Object.entries(t.goals).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
          <label htmlFor="brief-timing">{t.timeline}<select id="brief-timing" value={timing} onChange={event=>{setTiming(event.target.value as Timing);setStatus("idle");}}>{Object.entries(t.timings).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
        </div>
        <label htmlFor="brief-details">{t.details}<textarea id="brief-details" rows={3} maxLength={1000} dir="auto" placeholder={t.placeholder} value={details} onChange={event=>{setDetails(event.target.value);setStatus("idle");}}/></label>
        <div className={styles.result}>
          <label htmlFor="prepared-brief">{t.prepared}<textarea id="prepared-brief" rows={6} readOnly dir="auto" value={message} onFocus={event=>event.target.select()}/></label>
          <div className={styles.actions}><button type="submit">{t.copy} <span aria-hidden="true">↗</span></button><a href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer">{t.linkedin} ↗</a></div>
          <p className={styles.status} role="status" aria-live="polite">{status==="copied"?t.copied:status==="manual"?t.manual:""}</p>
        </div>
      </form>
      <p className={styles.privacy}>{t.privacy}</p>
    </div>
  </details>;
}
