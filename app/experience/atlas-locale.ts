import type { Locale } from "./locale";
type NodeCopy = { name:string; summary:string; proof:string };
type StageCopy = { label:string; title:string; detail:string };
type AtlasCopy = {
 eyebrow:string; title:string; lead:string; disciplines:string; modesLabel:string;
 systems:string; fact:string; modeGroup:string; modeNetwork:string; modePortrait:string; modeFlow:string;
 visualTag:string; nodeGroup:string; nodeHint:string; portraitAlt:string; portraitTitle:string; portraitDetail:string;
 flowHeading:string; flowTitle:string; flowSummary:string; flowFootnote:string;
 inspector:string; focus:string; related:string; browse:string; previous:string; next:string;
 explore:string; statusOne:string; statusTwo:string;
 nodes:Record<string,NodeCopy>; stages:readonly StageCopy[];
};
export const atlasCopy:Record<Locale,AtlasCopy> = {
  en:{
    eyebrow:"INTERACTIVE FEATURE / ENGINEERING ATLAS",
    title:"Every system is a network of decisions.",
    lead:"An interactive map of the disciplines behind my work. Explore a node to inspect the engineering choices and related project evidence.",
    disciplines:"disciplines", modesLabel:"exploration modes", systems:"documented systems",
    fact:"REAL ENGINEERING. NO ARTIFICIAL METRICS.", modeGroup:"Visualization mode", modeNetwork:"Network",
    modePortrait:"Neural portrait", modeFlow:"System flow", visualTag:"INTERACTIVE VISUALIZATION",
    nodeGroup:"Select an engineering discipline; use the arrow keys to move between nodes",
    nodeHint:"SELECT A NODE · ARROW KEYS TO NAVIGATE",
    portraitAlt:"Abstract cyan and gold digital head made from contour lines; decorative visualization only",
    portraitTitle:"Human intelligence remains in control.",
    portraitDetail:"Conceptual motion study. No camera, biometric recognition, or live AI service.",
    flowHeading:"REFERENCE ARCHITECTURE / EVENTIFY INSPIRED",
    flowTitle:"From request to reliable outcome.",
    flowSummary:"An illustrative path, not a connection to a running production service.",
    flowFootnote:"SELECT A STAGE TO EXPLORE ITS ENGINEERING ROLE",
    inspector:"DISCIPLINE INSPECTOR",focus:"ENGINEERING FOCUS", related:"Related skills",browse:"Browse disciplines",
    previous:"Previous",next:"Next",explore:"Explore",
    statusOne:"DESIGNED FOR EXPLORATION, NOT A LIVE AGENT CONTROL PANEL",
    statusTwo:"LOCAL INTERACTIONS · NO TRACKING · REDUCED MOTION READY",
    nodes:{
      architecture:{name:"Architecture",summary:"Trace product requirements through system boundaries, ownership, and failure paths before implementation.",proof:"Explore the systems thinking section"},
      interface:{name:"Interface",summary:"Build responsive, accessible user journeys with real state, meaningful feedback, and production constraints.",proof:"BookHaven case study"},
      backend:{name:"Backend",summary:"Keep HTTP boundaries, validation, authorization, business logic, and persistence responsibilities explicit.",proof:"Venues API case study"},
      data:{name:"Data",summary:"Design durable state and deliberate cache boundaries, treating the database as the system of record.",proof:"Eventify case study"},
      ai:{name:"AI / MCP",summary:"Explore how language-model tools and human-in-the-loop workflows can fit into accountable product architecture.",proof:"View engineering technologies"},
      async:{name:"Async work",summary:"Coordinate background jobs, retry policies, idempotency, and durable intent when dependencies fail.",proof:"Eventify case study"},
      quality:{name:"Verification",summary:"Verify contracts, interactions, security boundaries, accessibility, and unhappy-path behavior.",proof:"Venues API case study"},
      delivery:{name:"Delivery",summary:"Ship through reproducible builds, clear runtime diagnostics, deployment checks, and operational visibility.",proof:"Eventify case study"}
    },
    stages:[
      {label:"01 / DEFINE",title:"Model the domain",detail:"Clarify boundaries and failure paths before choosing tools."},
      {label:"02 / VALIDATE",title:"Enforce contracts",detail:"Validate inputs and authorise changes at the API boundary."},
      {label:"03 / PERSIST",title:"Commit state",detail:"Keep durable intent in the system of record."},
      {label:"04 / DISPATCH",title:"Process safely",detail:"Run retriable background work with clear ownership."},
      {label:"05 / VERIFY",title:"Prove behavior",detail:"Check failure cases, integration contracts and observability."}
    ]
  },
  ar:{
    eyebrow:"تجربة تفاعلية / أطلس الهندسة",
    title:"كل نظام شبكة من القرارات.",
    lead:"خريطة تفاعلية للتخصصات التي تقف وراء أعمالي. اختر عقدة لعرض القرارات الهندسية والأدلة المرتبطة بالمشاريع.",
    disciplines:"تخصصات",modesLabel:"أوضاع استكشاف",systems:"أنظمة موثقة",
    fact:"هندسة حقيقية بلا أرقام مصطنعة.",modeGroup:"وضع العرض",modeNetwork:"الشبكة",
    modePortrait:"الوجه الرقمي",modeFlow:"تدفق النظام",visualTag:"عرض تفاعلي",
    nodeGroup:"اختر تخصصاً هندسياً واستخدم الأسهم للتنقل بين العقد",
    nodeHint:"اختر عقدة · استخدم أسهم لوحة المفاتيح",
    portraitAlt:"رسم تجريدي لرأس رقمي بخطوط سماوية وذهبية للزينة فقط",
    portraitTitle:"الإنسان يبقى صاحب القرار.",
    portraitDetail:"تصور فني، دون كاميرا أو تعرّف حيوي أو خدمة ذكاء اصطناعي حية.",
    flowHeading:"معمارية مرجعية مستوحاة من EVENTIFY",
    flowTitle:"من الطلب إلى نتيجة موثوقة.",
    flowSummary:"مسار توضيحي، وليس اتصالاً بنظام إنتاجي يعمل حالياً.",
    flowFootnote:"اختر مرحلة لاستكشاف دورها الهندسي",
    inspector:"مستكشف التخصصات",focus:"التركيز الهندسي",related:"مهارات مرتبطة",browse:"تصفح التخصصات",
    previous:"السابق",next:"التالي",explore:"استكشف",
    statusOne:"مصمم للاستكشاف، وليس لوحة تحكم لوكلاء فعليين",
    statusTwo:"تفاعلات محلية · دون تتبع · دعم تقليل الحركة",
    nodes:{
      architecture:{name:"المعمارية",summary:"تتبّع متطلبات المنتج وحدود النظام والمسؤوليات واحتمالات الفشل قبل التنفيذ.",proof:"استكشف منهجية تصميم الأنظمة"},
      interface:{name:"الواجهة",summary:"بناء تجارب متجاوبة وسهلة الوصول مع حالات فعلية وتغذية راجعة واضحة.",proof:"دراسة BookHaven (EN)"},
      backend:{name:"الخدمات الخلفية",summary:"فصل حدود HTTP والتحقق والصلاحيات ومنطق العمل والتخزين.",proof:"دراسة Venues API (EN)"},
      data:{name:"البيانات",summary:"تصميم بيانات دائمة وحدود واضحة للتخزين المؤقت، مع قاعدة البيانات كمصدر للحقيقة.",proof:"دراسة Eventify (EN)"},
      ai:{name:"الذكاء الاصطناعي / MCP",summary:"دمج أدوات النماذج اللغوية وسير عمل يضمن بقاء المراجعة البشرية.",proof:"عرض التقنيات"},
      async:{name:"المهام الخلفية",summary:"تنسيق المهام المتأخرة وإعادة المحاولة ومنع التكرار وتوثيق النية عند تعطل الخدمات.",proof:"دراسة Eventify (EN)"},
      quality:{name:"التحقق",summary:"التحقق من العقود والتفاعلات والأمان وإمكانية الوصول ومسارات الفشل.",proof:"دراسة Venues API (EN)"},
      delivery:{name:"النشر",summary:"الإطلاق عبر بناء قابل للتكرار وتشخيص التشغيل وفحوص النشر والمراقبة.",proof:"دراسة Eventify (EN)"}
    },
    stages:[
      {label:"01 / تعريف",title:"نمذجة المجال",detail:"توضيح الحدود ومسارات الفشل قبل اختيار الأدوات."},
      {label:"02 / تحقق",title:"فرض العقود",detail:"التحقق من المدخلات والتصاريح عند حدود API."},
      {label:"03 / حفظ",title:"تثبيت الحالة",detail:"حفظ النية الدائمة في المصدر المعتمد."},
      {label:"04 / إرسال",title:"تنفيذ بأمان",detail:"معالجة المهام الخلفية مع إمكانية إعادة المحاولة."},
      {label:"05 / اختبار",title:"إثبات السلوك",detail:"فحص مسارات الفشل وعقود التكامل والمراقبة."}
    ]
  },
  tr:{
    eyebrow:"ETKİLEŞİMLİ / MÜHENDİSLİK ATLASI",
    title:"Her sistem bir karar ağıdır.",
    lead:"Projelerimin arkasındaki mühendislik alanlarının etkileşimli haritası. Kararları ve ilgili proje kanıtlarını incelemek için bir düğüm seçin.",
    disciplines:"disiplin",modesLabel:"keşif modu",systems:"belgelenmiş sistem",
    fact:"GERÇEK MÜHENDİSLİK. YAPAY SAYILAR YOK.",modeGroup:"Görselleştirme modu",modeNetwork:"Ağ",
    modePortrait:"Dijital portre",modeFlow:"Sistem akışı",visualTag:"ETKİLEŞİMLİ GÖRSEL",
    nodeGroup:"Bir mühendislik alanı seçin; düğümler arasında ok tuşlarıyla gezinin",
    nodeHint:"DÜĞÜM SEÇİN · OK TUŞLARIYLA GEZİN",
    portraitAlt:"Yalnızca dekorasyon amaçlı mavi ve altın renkli çizgilerden oluşan soyut dijital baş",
    portraitTitle:"Kontrol insanda kalır.",
    portraitDetail:"Kavramsal görselleştirme. Kamera, biyometrik tanıma ya da canlı yapay zekâ hizmeti yok.",
    flowHeading:"EVENTIFY'DAN ESİNLENEN REFERANS MİMARİ",
    flowTitle:"İstekten güvenilir sonuca.",
    flowSummary:"Canlı üretim sistemine bağlı olmayan örnek bir akış.",
    flowFootnote:"MÜHENDİSLİK ROLÜNÜ GÖRMEK İÇİN BİR AŞAMA SEÇİN",
    inspector:"DİSİPLİN İNCELEMESİ",focus:"MÜHENDİSLİK ODAĞI",related:"İlgili beceriler",browse:"Disiplinleri keşfet",
    previous:"Önceki",next:"Sonraki",explore:"Keşfet",
    statusOne:"KEŞİF İÇİN TASARLANDI, CANLI AJAN KONTROL PANELİ DEĞİL",
    statusTwo:"YEREL ETKİLEŞİM · TAKİP YOK · AZALTILMIŞ HAREKET DESTEĞİ",
    nodes:{
      architecture:{name:"Mimari",summary:"Uygulamadan önce ürün ihtiyaçlarını sistem sınırları, sorumluluklar ve hata yollarıyla eşleştirin.",proof:"Sistem tasarımı yaklaşımı"},
      interface:{name:"Arayüz",summary:"Gerçek durum ve anlamlı geri bildirimle erişilebilir, duyarlı kullanıcı deneyimleri.",proof:"BookHaven incelemesi (EN)"},
      backend:{name:"Backend",summary:"HTTP sınırları, doğrulama, yetkilendirme, iş kuralları ve kalıcılık sorumlulukları.",proof:"Venues API incelemesi (EN)"},
      data:{name:"Veri",summary:"Veritabanını doğruluk kaynağı alıp dayanıklı durum ve önbellek sınırları tasarlamak.",proof:"Eventify incelemesi (EN)"},
      ai:{name:"Yapay zekâ / MCP",summary:"Dil modeli araçlarıyla insan gözetimindeki akışları sorumlu ürün mimarisinde kullanmak.",proof:"Teknolojileri görüntüle"},
      async:{name:"Arka plan işleri",summary:"Kuyrukları, yeniden denemeleri, tekrar önlemeyi ve kalıcı iş niyetini koordine etmek.",proof:"Eventify incelemesi (EN)"},
      quality:{name:"Doğrulama",summary:"Sözleşmeleri, etkileşimleri, güvenliği, erişilebilirliği ve hata yollarını test etmek.",proof:"Venues API incelemesi (EN)"},
      delivery:{name:"Dağıtım",summary:"Tekrarlanabilir derleme, çalışma zamanı teşhisi ve üretim kontrolleriyle yayınlamak.",proof:"Eventify incelemesi (EN)"}
    },
    stages:[
      {label:"01 / TANIMLA",title:"Alanı modelle",detail:"Araç seçmeden önce sınırları ve hata yollarını netleştir."},
      {label:"02 / DOĞRULA",title:"Sözleşmeleri uygula",detail:"API sınırında girdileri ve yetkileri doğrula."},
      {label:"03 / KAYDET",title:"Durumu sakla",detail:"Kalıcı niyeti sistemin doğruluk kaynağına yaz."},
      {label:"04 / DAĞIT",title:"Güvenle işle",detail:"Sorumlulukları belirli, tekrar denenebilir işleri çalıştır."},
      {label:"05 / TEST ET",title:"Davranışı kanıtla",detail:"Hata durumlarını, entegrasyonları ve izlenebilirliği denetle."}
    ]
  }
};
