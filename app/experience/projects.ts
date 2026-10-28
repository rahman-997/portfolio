import type { Locale } from "./locale";
export type ProjectGroup = "product" | "backend" | "tools";
export type PortfolioProject = {
  id: string; name: string; group: ProjectGroup; original: boolean;
  stack: readonly string[]; source: string; demo?: string; study?: string;
  text: Record<Locale, { headline: string; description: string }>;
};
export const PUBLIC_PROJECTS: readonly PortfolioProject[] = [
  {
    id:"eventify", name:"Eventify", group:"product", original:true,
    stack:["React","TypeScript","PostgreSQL","Redis","BullMQ"],
    source:"https://github.com/rahman-997/eventify",
    demo:"https://eventify-web.onrender.com", study:"/work/eventify/",
    text:{
      en:{headline:"Events. Bookings. Reliability.",description:"Full-stack event platform and PWA with organizer flows, booking, waitlists and durable async work."},
      ar:{headline:"الفعاليات والحجوزات والموثوقية",description:"منصة فعاليات متكاملة وتطبيق PWA مع إدارة المنظمين والحجوزات وقوائم الانتظار والمهام الخلفية الموثوقة."},
      tr:{headline:"Etkinlikler, rezervasyonlar, güvenilirlik.",description:"Organizatör akışları, rezervasyonlar, bekleme listeleri ve kalıcı asenkron işlemler içeren tam kapsamlı etkinlik platformu."}
    }
  },
  {
    id:"bookbookhaven", name:"BookHaven", group:"product", original:true,
    stack:["Next.js","React","Express","MongoDB"],
    source:"https://github.com/rahman-997/bookbookhaven",
    demo:"https://bookbookhaven-free.onrender.com", study:"/work/bookhaven/",
    text:{
      en:{headline:"Commerce that thinks beyond checkout.",description:"Full-stack bookstore with discovery, cart, authentication, orders, inventory and administration."},
      ar:{headline:"تجارة إلكترونية تتجاوز صفحة الدفع",description:"متجر كتب متكامل مع البحث والسلة والحسابات والطلبات والمخزون ولوحة الإدارة."},
      tr:{headline:"Ödeme ekranının ötesindeki e-ticaret.",description:"Ürün keşfi, sepet, oturum, sipariş, stok ve yönetim akışları içeren tam kapsamlı kitapçı."}
    }
  },
  {
    id:"fitflow-gym", name:"FitFlow", group:"product", original:true,
    stack:["Next.js","React","TypeScript","PWA"],
    source:"https://github.com/rahman-997/fitflow-gym",
    demo:"https://fitflow-gym.onrender.com",study:"/work/fitflow/",
    text:{
      en:{headline:"A fitness experience built to stay with you.",description:"Installable fitness PWA with guided intervals, personal plans, weekly tracking and local-first persistence."},
      ar:{headline:"تجربة لياقة تستمر معك",description:"تطبيق لياقة قابل للتثبيت، مع خطط مخصصة ومؤقتات تدريب وتتبع أسبوعي وحفظ محلي للتقدم."},
      tr:{headline:"Sizinle kalan bir fitness deneyimi.",description:"Kişiselleştirilmiş planlar, zamanlayıcılar, haftalık takip ve cihazda kayıt sunan kurulabilir fitness PWA."}
    }
  },
  {
    id:"venues-api", name:"Venues API", group:"backend", original:true,
    stack:["Node.js","Express 5","TypeScript","Zod"],
    source:"https://github.com/rahman-997/venues-api",
    demo:"https://venues-api-rahman.onrender.com/health",study:"/work/venues-api/",
    text:{
      en:{headline:"A small API with serious boundaries.",description:"Layered REST service with schema validation, predictable errors, UUID resources and HTTP tests."},
      ar:{headline:"واجهة برمجة صغيرة بحدود هندسية واضحة",description:"خدمة REST متعددة الطبقات مع التحقق من المدخلات وأخطاء موحّدة ومعرّفات UUID واختبارات HTTP."},
      tr:{headline:"Net sınırları olan kompakt bir API.",description:"Şema doğrulama, öngörülebilir hatalar, UUID kaynakları ve HTTP testleri içeren katmanlı REST servisi."}
    }
  },
  {
    id:"mizan-finance", name:"Mizan Finance", group:"product", original:true,
    stack:["React","TypeScript","RTL","Local-first"],
    source:"https://github.com/rahman-997/mizan-finance",
    text:{
      en:{headline:"Privacy-first personal finance.",description:"Bilingual local-first budgeting and expense-planning interface with spending insights and RTL support."},
      ar:{headline:"تنظيم مالي يحترم الخصوصية",description:"واجهة ثنائية اللغة للميزانيات والمصروفات وتحليل الإنفاق، تحفظ البيانات محلياً وتدعم الكتابة من اليمين."},
      tr:{headline:"Gizliliğe öncelik veren kişisel finans.",description:"Yerel veri saklama, bütçe, gider analizi ve RTL desteği sunan iki dilli finans planlayıcısı."}
    }
  },
  {
    id:"portfolio", name:"Portfolio · AI Atlas", group:"tools", original:true,
    stack:["Next.js","React","TypeScript","Accessibility","CI"],
    source:"https://github.com/rahman-997/portfolio",
    demo:"https://abdulrahman-hajar-portfolio.onrender.com",
    text:{
      en:{headline:"The portfolio is a product, too.",description:"Interactive engineering showcase with AI Systems Atlas, production checks, accessibility tests and live browser QA."},
      ar:{headline:"المعرض نفسه مشروع هندسي",description:"معرض تفاعلي يضم AI Systems Atlas وفحوص إنتاج وإمكانية وصول واختبارات متصفح على الموقع المباشر."},
      tr:{headline:"Portfolyo da başlı başına bir ürün.",description:"AI Systems Atlas, üretim kontrolleri, erişilebilirlik testleri ve canlı tarayıcı doğrulaması içeren etkileşimli portfolyo."}
    }
  },
  {
    id:"free-claude-code", name:"free-claude-code", group:"tools", original:false,
    stack:["Python","Open source","Fork"],
    source:"https://github.com/rahman-997/free-claude-code",
    text:{
      en:{headline:"Open-source developer tooling (fork).",description:"A forked third-party repository exploring free AI coding tools. Listed as a fork, not claimed as original software."},
      ar:{headline:"أدوات تطوير مفتوحة المصدر (نسخة متفرعة)",description:"مستودع متفرع من مشروع خارجي حول أدوات البرمجة بالذكاء الاصطناعي، وليس مشروعاً أصلياً من تأليفي."},
      tr:{headline:"Açık kaynak geliştirici araçları (fork).",description:"Yapay zekâ kodlama araçlarına yönelik üçüncü taraf bir deponun fork'u; özgün çalışma olarak sunulmaz."}
    }
  }
] as const;

export const PUBLIC_PROJECT_COUNT = PUBLIC_PROJECTS.length;
