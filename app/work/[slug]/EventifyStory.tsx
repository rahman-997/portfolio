import Image from "next/image";
import styles from "./eventify-story.module.css";

const flow = [
  { key:"BOOK", detail:"تأكيد الحجز عند توفّر مكان" },
  { key:"WAITLIST", detail:"نقل المستخدم لقائمة الانتظار عند الامتلاء" },
  { key:"OUTBOX", detail:"تسجيل مهمة الترقية عند إلغاء الحجز" },
  { key:"WORKER", detail:"ترقية أقدم منتظر عبر معالج خلفي" },
] as const;
const architecture = [
  { key:"REACT / PWA", role:"Client interface" },
  { key:"EXPRESS API", role:"Auth / business rules" },
  { key:"POSTGRESQL", role:"Source of truth" },
  { key:"REDIS", role:"Cache / queue" },
  { key:"OUTBOX", role:"Durable intent" },
  { key:"BULLMQ WORKER", role:"Async processing" },
] as const;

export default function EventifyStory(){
  return <section id="eventify-story" className={styles.story} aria-labelledby="eventify-story-heading">
    <div className={styles.intro}>
      <span className={styles.overline}>VISUAL CASE STUDY / 05 FRAMES</span>
      <h2 id="eventify-story-heading">Eventify <em>من المشكلة إلى المعمارية</em></h2>
      <p>إعادة تقديم تفاعلية باللغة العربية لمحتوى الشرائح الخمس من ملف HAJAR الذي أرفقه صاحب المشروع. هذه بطاقات HTML قابلة للوصول، وليست صوراً من واجهة التطبيق المباشر.</p>
    </div>
    <nav className={styles.frameNav} aria-label="التنقل بين شرائح قصة Eventify" dir="ltr">
      {["COVER","PROBLEM","SOLUTION","ARCHITECTURE","TAKEAWAY"].map((title,i)=>
        <a key={title} href={`#eventify-frame-${i+1}`} aria-label={`Go to Eventify frame ${i+1}: ${title}`}>{String(i+1).padStart(2,"0")} <span>{title}</span></a>)}
    </nav>
    <div className={styles.frames} lang="ar" dir="rtl" role="region" aria-roledescription="carousel" aria-label="قصة Eventify المصورة في خمس شرائح" tabIndex={0}>
      <article id="eventify-frame-1" className={styles.frame} aria-label="الشريحة ١ من ٥: الغلاف">
        <div className={styles.topBar}><strong>HAJAR</strong><span>EVENTIFY / ENGINEERING CASE STUDY</span></div>
        <div className={styles.frameHead}>
          <span className={styles.overline}>RELIABILITY / FULL-STACK</span>
          <div className={styles.coverHeadline}><h3 dir="ltr">EVENTIFY</h3><Image src="/brand/hajar-emblem.svg" width={54} height={64} alt="رمز HAJAR" unoptimized /></div>
          <p dir="ltr">WHEN EVERY SEAT MATTERS</p>
        </div>
        <h4 className={styles.largeArabic}>حين تمتلئ المقاعد،<br/>تبدأ الهندسة الحقيقية.</h4>
        <div className={styles.ticketFlow} dir="ltr"><span>BOOKING</span><b>→</b><span>WAITLIST</span><b>→</b><span>WORKER</span></div>
        <p className={styles.micro}>React PWA / Express / PostgreSQL / Redis / BullMQ</p>
        <div className={styles.frameFooter}><span>ABDULRAHMAN HAJAR</span><span>01 / 05</span></div>
      </article>
      <article id="eventify-frame-2" className={`${styles.frame} ${styles.paper}`} aria-label="الشريحة ٢ من ٥: المشكلة">
        <div className={styles.topBar}><strong>HAJAR</strong><span>EVENTIFY / THE PROBLEM</span></div>
        <div className={styles.frameHead}><span className={styles.overline}>01 / THE PROBLEM</span><h3>ماذا يحدث عندما<br/>تمتلئ المقاعد؟</h3><p>نهاية السعة لا يجب أن تعني نهاية التجربة.</p></div>
        <div className={styles.capacity}>
          <span className={styles.darkMicro}>EVENT CAPACITY</span>
          <div>{[1,2,3,4,5].map(n=><span className={n===5?styles.wait:styles.booked} key={n} aria-label={n===5?"Waitlist":"Booked"}><span className={styles.personIcon}>○</span><small>{n===5?"WAITLIST":"BOOKED"}</small></span>)}</div>
          <strong dir="ltr">04 / 04 CAPACITY REACHED</strong>
        </div>
        <p className={styles.paperNote}>قائمة انتظار منظمة عند عدم توفّر مكان</p>
        <div className={styles.frameFooter}><span>ABDULRAHMAN HAJAR</span><span>02 / 05</span></div>
      </article>
      <article id="eventify-frame-3" className={styles.frame} aria-label="الشريحة ٣ من ٥: الحل">
        <div className={styles.topBar}><strong>HAJAR</strong><span>EVENTIFY / BOOKING LOGIC</span></div>
        <div className={styles.frameHead}><span className={styles.overline}>02 / THE SOLUTION</span><h3>من الانتظار إلى التأكيد</h3><p>تسلسل واضح يتعامل مع امتلاء الفعالية وإلغاء الحجز</p></div>
        <ol className={styles.flowSteps}>{flow.map((item,i)=><li key={item.key}><span className={styles.number}>{String(i+1).padStart(2,"0")}</span><div><strong>{item.key}</strong><span>{item.detail}</span></div></li>)}</ol>
        <p className={styles.techFooter}>POSTGRES OUTBOX · REDIS / BULLMQ · RETRIES</p>
        <div className={styles.frameFooter}><span>ABDULRAHMAN HAJAR</span><span>03 / 05</span></div>
      </article>
      <article id="eventify-frame-4" className={`${styles.frame} ${styles.paper}`} aria-label="الشريحة ٤ من ٥: معمارية النظام">
        <div className={styles.topBar}><strong>HAJAR</strong><span>EVENTIFY / SYSTEM ARCHITECTURE</span></div>
        <div className={styles.frameHead}><span className={styles.overline}>03 / THE ARCHITECTURE</span><h3>كيف تتعاون طبقات النظام؟</h3><p>توزيع الأدوار بين الواجهة والبيانات والمعالجة الخلفية</p></div>
        <ol className={styles.architecture}>
          {architecture.map((item,i)=><li key={item.key} className={i>1?styles.archSmall:styles.archLarge}><strong dir="ltr">{item.key}</strong><small dir="ltr">{item.role}</small></li>)}
        </ol>
        <p className={styles.paperNote} dir="ltr">DB = AUTHORITY · REDIS = SHARED INFRASTRUCTURE</p>
        <div className={styles.frameFooter}><span>ABDULRAHMAN HAJAR</span><span>04 / 05</span></div>
      </article>
      <article id="eventify-frame-5" className={styles.frame} aria-label="الشريحة ٥ من ٥: الخلاصة والكود">
        <div className={styles.topBar}><strong>HAJAR</strong><span>EVENTIFY / EXPLORE THE CODE</span></div>
        <div className={styles.frameHead}><span className={styles.overline}>04 / THE TAKEAWAY</span><h3>أكثر من إدخال البيانات،<br/>كل طبقة إلها دور واضح</h3><p>حجوزات، انتظار، عمليات خلفية، ومراقبة تشغيل.</p></div>
        <div className={styles.takeaway} dir="ltr"><p><strong>DATA</strong><span>PostgreSQL + Prisma</span></p><p><strong>JOBS</strong><span>Redis + BullMQ + Outbox</span></p><p><strong>QUALITY</strong><span>CI / Tests / Security gates</span></p></div>
        <div className={styles.sourceProof}><strong>EXPLORE THE SOURCE</strong><a href="https://github.com/rahman-997/eventify" target="_blank" rel="noopener noreferrer">github.com/rahman-997/eventify ↗</a></div>
        <div className={styles.frameFooter}><span>ABDULRAHMAN HAJAR</span><span>05 / 05</span></div>
      </article>
    </div>
    <p className={styles.storyNote}>الرسوم أعلاه إعادة عرض متجاوبة للمحتوى التوضيحي الأصلي وليست لقطات تشغيل. للحصول على صور PNG الخمس الأصلية بدقّتها الكاملة، يُستخدم ملف الـ ZIP المرفق من صاحب المشروع.</p>
  </section>;
}
