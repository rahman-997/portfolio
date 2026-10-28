import type { Locale } from "./i18n";

/**
 * V3.8: original editorial copy. The pathways point only to existing,
 * verifiable projects; there are no invented impact numbers or testimonials.
 */
export const portfolioExtras = {
  en: {
    nav: "Process",
    process: {
      eyebrow: "05 / DELIVERY PROCESS",
      title: "How I work: from a clear question to a verifiable release.",
      description: "Good engineering is a sequence of decisions, not a pile of frameworks. This is the approach I use to reason about a project, its risks, and its delivery.",
      cta: "Explore by engineering challenge",
      steps: [
        {title:"Frame the problem",body:"Define who uses the product, what must happen, and which states can go wrong."},
        {title:"Map the boundaries",body:"Separate interface, API, data ownership and background work before complexity spreads."},
        {title:"Build small and verify",body:"Prefer reviewable changes, typed contracts, automated checks and accessible interactions."},
        {title:"Prepare the handoff",body:"Document key trade-offs, test failure paths and make the running system observable."},
      ],
    },
    explore: {
      eyebrow: "06 / EXPLORE BY CHALLENGE",
      title: "Explore by challenge. Follow the evidence.",
      description: "Each path takes you directly to a real case study, its trade-offs and the source code behind it.",
      cta:"Read the case study",
      next:"See quick answers",
      cards:[
        {slug:"eventify",label:"Reliability · asynchronous work",question:"What happens when bookings race or background workers fail?",detail:"Capacity rules, waitlists, an outbox and retry-aware queues."},
        {slug:"bookhaven",label:"Full-stack · commerce",question:"How do checkout, orders and inventory stay consistent?",detail:"Application boundaries, protected operations and order transitions."},
        {slug:"fitflow",label:"Product UX · offline",question:"How can an app preserve progress when connectivity is limited?",detail:"Installable PWA, local-first state and accessible session flows."},
        {slug:"venues-api",label:"Backend · API contracts",question:"Where should validation and error handling live in an API?",detail:"Versioned routes, Zod validation, service layers and HTTP tests."},
      ],
    },
    questions:{
      eyebrow:"07 / QUICK ANSWERS",
      title:"Quick answers, useful details up front.",
      description:"For people evaluating a project, a role or a collaboration.",
      items:[
        {question:"Can I inspect the source code?",answer:"Yes. The case studies link to each project's source and provide context about the architecture and its trade-offs.",action:"Explore GitHub",destination:"github"},
        {question:"Is there a downloadable résumé?",answer:"Yes. The website has localized résumé pages. The downloadable PDF and printable version are currently in English.",action:"Download English PDF",destination:"pdf"},
        {question:"Where should I begin?",answer:"Choose a real engineering question above, then read its case study and inspect the implementation.",action:"Choose a challenge",destination:"explore"},
      ],
    },
  },
  ar:{
    nav:"طريقة عملي",
    process:{
      eyebrow:"05 / منهجية العمل",
      title:"كيف أعمل: من سؤال واضح إلى إصدار يمكن التحقق منه.",
      description:"الهندسة الجيدة سلسلة قرارات مدروسة، وليست مجموعة أدوات فقط. هذه هي الطريقة التي أتعامل بها مع متطلبات المشروع ومخاطره وتسليمه.",
      cta:"استكشف حسب التحدّي",
      steps:[
        {title:"تحديد المشكلة",body:"أفهم المستخدم والهدف والحالات غير المتوقعة التي ينبغي على المنتج التعامل معها."},
        {title:"رسم حدود النظام",body:"أفصل الواجهة وواجهات API وملكية البيانات والمهام الخلفية قبل تراكم التعقيد."},
        {title:"بناء قابل للاختبار",body:"أفضّل التغييرات الصغيرة والعقود المعرّفة بالأنواع والفحوص الآلية وإمكانية الوصول."},
        {title:"تجهيز التسليم",body:"أوثّق القرارات المهمة، وأختبر حالات التعطّل، وأجعل حالة النظام قابلة للمراقبة."},
      ],
    },
    explore:{
      eyebrow:"06 / اكتشف بحسب التحدّي",
      title:"استكشف حسب التحدّي",
      description:"اختر سؤالاً هندسياً وانتقل مباشرةً إلى دراسة مشروع حقيقي وقراراته التقنية وشيفرته المصدرية.",
      cta:"اقرأ دراسة المشروع",
      next:"انتقل إلى الأسئلة السريعة",
      cards:[
        {slug:"eventify",label:"الموثوقية · المهام الخلفية",question:"ماذا يحدث عند تزامن الحجوزات أو تعطل المهام الخلفية؟",detail:"قواعد السعة وقوائم الانتظار وOutbox وطوابير تراعي إعادة المحاولة."},
        {slug:"bookhaven",label:"تطوير متكامل · تجارة إلكترونية",question:"كيف تظل الطلبات والدفع والمخزون متناسقة؟",detail:"فصل مسؤوليات التطبيق وحماية العمليات والتحكم في حالات الطلب."},
        {slug:"fitflow",label:"تجربة المستخدم · دون اتصال",question:"كيف يحتفظ التطبيق بالتقدم عندما يضعف الاتصال؟",detail:"تطبيق PWA قابل للتثبيت وتخزين محلي وتدفقات استخدام تراعي إمكانية الوصول."},
        {slug:"venues-api",label:"الخلفية · عقود API",question:"أين يجب التحقق من المدخلات وإدارة الأخطاء؟",detail:"مسارات ذات إصدارات، وتحقق Zod، وطبقات خدمات واختبارات HTTP."},
      ],
    },
    questions:{
      eyebrow:"07 / أسئلة شائعة",
      title:"أسئلة سريعة",
      description:"معلومات مفيدة لمن يريد مراجعة المشاريع أو التعرف على خبرتي.",
      items:[
        {question:"هل يمكنني الاطلاع على الشيفرة المصدرية؟",answer:"نعم. ترتبط دراسات المشاريع بمستودعاتها، وتشرح بنية كل مشروع وقراراته التقنية.",action:"تصفح GitHub",destination:"github"},
        {question:"هل توجد سيرة ذاتية قابلة للتحميل؟",answer:"نعم. توجد صفحات سيرة ذاتية بالعربية والتركية والإنجليزية، أما ملف PDF والنسخة المخصصة للطباعة فهما حالياً بالإنجليزية.",action:"حمّل PDF بالإنجليزية",destination:"pdf"},
        {question:"من أين أبدأ مراجعة المشاريع؟",answer:"اختر تحدياً هندسياً من القسم السابق، ثم اقرأ الدراسة وراجع التنفيذ الفعلي.",action:"اختر التحدّي",destination:"explore"},
      ],
    },
  },
  tr:{
    nav:"Çalışma sürecim",
    process:{
      eyebrow:"05 / ÇALIŞMA SÜRECİ",
      title:"Nasıl çalışırım: net bir sorudan doğrulanabilir bir sürüme.",
      description:"İyi mühendislik araç listesi değil, bilinçli kararlar dizisidir. Projenin gereksinimlerini, risklerini ve teslimatını bu yaklaşımla ele alırım.",
      cta:"Probleme göre keşfet",
      steps:[
        {title:"Problemi tanımla",body:"Kullanıcıyı, beklenen sonucu ve ürünün karşılaşabileceği hata durumlarını belirlerim."},
        {title:"Sınırları tasarla",body:"Arayüz, API, veri sahipliği ve arka plan işlerini karmaşıklık artmadan ayırırım."},
        {title:"Küçük adımlarla doğrula",body:"İncelenebilir değişikliklere, tür güvenli sözleşmelere, otomatik testlere ve erişilebilirliğe öncelik veririm."},
        {title:"Teslimata hazırla",body:"Önemli kararları belgeler, hata akışlarını test eder ve sistemin gözlemlenebilir olmasına dikkat ederim."},
      ],
    },
    explore:{
      eyebrow:"06 / PROBLEME GÖRE KEŞFET",
      title:"Probleme göre keşfet",
      description:"İlginizi çeken mühendislik sorusunu seçin; doğrudan gerçek projenin teknik incelemesine ve kaynak koduna gidin.",
      cta:"Teknik incelemeyi oku",
      next:"Kısa yanıtlara geç",
      cards:[
        {slug:"eventify",label:"Güvenilirlik · asenkron işler",question:"Rezervasyonlar çakışırsa veya çalışanlar durursa ne olur?",detail:"Kapasite kuralları, bekleme listesi, outbox ve yeniden denemeli kuyruklar."},
        {slug:"bookhaven",label:"Full-stack · e-ticaret",question:"Ödeme, sipariş ve stok nasıl tutarlı kalır?",detail:"Uygulama sınırları, korumalı işlemler ve sipariş durum geçişleri."},
        {slug:"fitflow",label:"Ürün deneyimi · çevrim dışı",question:"Bağlantı zayıfken uygulama ilerlemeyi nasıl korur?",detail:"Yüklenebilir PWA, cihazda saklanan durum ve erişilebilir oturum akışları."},
        {slug:"venues-api",label:"Backend · API sözleşmeleri",question:"API doğrulaması ve hata yönetimi nerede olmalı?",detail:"Sürümlü rotalar, Zod doğrulaması, hizmet katmanları ve HTTP testleri."},
      ],
    },
    questions:{
      eyebrow:"07 / SIK SORULANLAR",
      title:"Kısa yanıtlar",
      description:"Projeleri, pozisyonları veya iş birliğini değerlendirenler için.",
      items:[
        {question:"Kaynak kodunu inceleyebilir miyim?",answer:"Evet. Teknik incelemelerde proje depolarına bağlantılar ve mimari kararların açıklamaları bulunur.",action:"GitHub'a git",destination:"github"},
        {question:"İndirilebilir bir özgeçmiş var mı?",answer:"Evet. Web özgeçmişi üç dilde bulunur; indirilebilir PDF ve yazdırılabilir sürüm şu anda İngilizcedir.",action:"İngilizce PDF indir",destination:"pdf"},
        {question:"Projeleri nereden incelemeye başlamalıyım?",answer:"Yukarıdaki mühendislik sorularından birini seçin, ardından teknik incelemeyi ve uygulamayı değerlendirin.",action:"Bir problem seç",destination:"explore"},
      ],
    },
  },
} as const satisfies Record<Locale, {
  nav:string;
  process:{eyebrow:string;title:string;description:string;cta:string;steps:readonly {title:string;body:string}[]};
  explore:{eyebrow:string;title:string;description:string;cta:string;next:string;cards:readonly {slug:string;label:string;question:string;detail:string}[]};
  questions:{eyebrow:string;title:string;description:string;items:readonly {question:string;answer:string;action:string;destination:string}[]};
}>;
