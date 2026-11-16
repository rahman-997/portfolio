import type { PortfolioProject } from "./projects";

// Descriptions only: private repositories, local files and personal assets are never linked.
export const ADDITIONAL_PROJECTS: readonly PortfolioProject[] = [
  {
    id:"hajarcare", name:"HajarCare · ClinicOS", group:"product", original:true, stage:"development",
    stack:["Python","PostgreSQL","Multi-tenant","AR / EN / TR"], keywords:["عيادات","appointments","clinic"],
    text:{
      en:{headline:"A workspace for clinic operations.",description:"Clinic-management pilot for appointments, operational records, staff permissions and tenant-separated workflows."},
      ar:{headline:"مساحة عمل لإدارة العيادات",description:"نسخة تجريبية لتنظيم المواعيد والسجلات التشغيلية وصلاحيات الموظفين، مع فصل بيانات العيادات."},
      tr:{headline:"Klinik operasyonları için bir çalışma alanı.",description:"Randevular, operasyon kayıtları, personel yetkileri ve klinik bazında veri ayrımı için geliştirilen yönetim pilotu."}
    }
  },
  {
    id:"sirahazir", name:"SıraHazır", group:"product", original:true, stage:"development",
    stack:["Node.js","SQLite","QR","Appointments"], keywords:["sirahazir","PULSE","Core","سيرا حاضر","طوابير"],
    text:{
      en:{headline:"Bring clarity to queues and appointments.",description:"Queue and booking tools for businesses, with staff roles, customer entry pages, service stations and display boards."},
      ar:{headline:"وضوح أكبر للطوابير والمواعيد",description:"أدوات لإدارة طوابير المؤسسات والحجوزات، مع أدوار للموظفين وصفحات للعملاء ومحطات خدمة وشاشات عرض."},
      tr:{headline:"Sıraları ve randevuları düzenleyin.",description:"Personel rolleri, müşteri giriş sayfaları, hizmet noktaları ve ekran panolarıyla işletmeler için sıra ve randevu araçları."}
    }
  },
  {
    id:"salespilot-ai", name:"SalesPilot AI", group:"product", original:true, stage:"development",
    stack:["FastAPI","SQLite","Analytics","PWA"], keywords:["CRM","مبيعات","عملاء"],
    text:{
      en:{headline:"Keep customer conversations connected to sales.",description:"Small-business CRM and conversation workspace with authenticated analytics, date filters, charts and multilingual screens."},
      ar:{headline:"محادثات العملاء ضمن صورة المبيعات",description:"مساحة لإدارة العملاء والمحادثات للمشاريع الصغيرة، مع تحليلات محمية وفلاتر زمنية ورسوم وواجهات متعددة اللغات."},
      tr:{headline:"Müşteri görüşmelerini satışla birleştirin.",description:"Küçük işletmeler için müşteri ve görüşme yönetimi; oturumla korunan analizler, tarih filtreleri, grafikler ve çok dilli ekranlar."}
    }
  },
  {
    id:"kivyro", name:"KIVYRO", group:"product", original:true, stage:"development",
    stack:["Next.js","React","TypeScript","PWA"], keywords:["fitness","FitFlow","لياقة","training"],
    text:{
      en:{headline:"The next chapter of the fitness experience.",description:"An evolution of FitFlow combining program discovery, guided intervals, training recommendations and device-local progress."},
      ar:{headline:"الفصل التالي لتجربة اللياقة",description:"تطوير لتجربة FitFlow يجمع استكشاف البرامج ومؤقتات التدريب والتوصيات وحفظ التقدّم على الجهاز."},
      tr:{headline:"Fitness deneyiminin yeni bölümü.",description:"FitFlow'dan gelişen; program keşfi, antrenman aralıkları, öneriler ve cihazda ilerleme kaydını birleştiren fitness deneyimi."}
    }
  },
  {
    id:"digital-rug-max", name:"Digital Rug MAX", group:"tools", original:true, stage:"development",
    stack:["Electron","JavaScript","Windows","Android"], keywords:["files","ملفات","سطح المكتب"],
    text:{
      en:{headline:"A visual home for everyday files.",description:"Desktop and mobile file-vault project with a floating desktop surface, import/export flows, recovery and backup integrity checks."},
      ar:{headline:"مساحة مرئية لملفاتك اليومية",description:"مشروع خزنة ملفات للحاسوب والهاتف، مع مساحة عائمة على سطح المكتب وأدوات للاستيراد والتصدير والاستعادة وفحص النسخ."},
      tr:{headline:"Günlük dosyalar için görsel bir alan.",description:"Masaüstünde yüzen alan, içe ve dışa aktarma, geri yükleme ve yedek bütünlüğü kontrolleri içeren masaüstü ve mobil dosya kasası projesi."}
    }
  },
  {
    id:"aura", name:"AURA", group:"product", original:true, stage:"development",
    stack:["Node.js","SQLite","PWA","Tauri"], keywords:["creators","community","مجتمع"],
    text:{
      en:{headline:"A multilingual space for creators.",description:"Creator-community source project with a web experience, account sessions, two-factor access and desktop/mobile build targets."},
      ar:{headline:"مساحة متعددة اللغات لصنّاع المحتوى",description:"مشروع منصة مجتمعية بواجهة ويب وإدارة للجلسات والمصادقة الثنائية، مع مسارات بناء للحاسوب والهاتف."},
      tr:{headline:"İçerik üreticileri için çok dilli bir alan.",description:"Web deneyimi, oturum yönetimi, iki aşamalı giriş ve masaüstü/mobil derleme hedefleri içeren topluluk projesi."}
    }
  },
  {
    id:"athrua", name:"ATHRUA Studio", group:"product", original:true, stage:"development",
    stack:["Python","SQLite","JavaScript","Local-first"], keywords:["CRM","leads","عملاء","طلبات"],
    text:{
      en:{headline:"Give every enquiry a clear next step.",description:"Local request-management workspace with client statuses, notes, priorities, follow-up dates and guarded data-import tools."},
      ar:{headline:"خطوة تالية واضحة لكل طلب",description:"مساحة محلية لإدارة الطلبات وحالات العملاء والملاحظات والأولويات ومواعيد المتابعة، مع أدوات استيراد تحمي السجلات الموجودة."},
      tr:{headline:"Her talep için net bir sonraki adım.",description:"Müşteri durumları, notlar, öncelikler, takip tarihleri ve mevcut kayıtları koruyan içe aktarma araçları sunan yerel talep yönetimi."}
    }
  },
  {
    id:"sham", name:"شام · Sham", group:"product", original:true, stage:"development",
    stack:["PWA","Express","Prisma","PostgreSQL"], keywords:["عادات","تنظيم","habits","planner"],
    text:{
      en:{headline:"Daily routines, thoughtfully connected.",description:"Arabic-first PWA for habits, journaling, goals, reminders and learning, alongside authenticated appointment-management tools."},
      ar:{headline:"تفاصيل يومك، بترابط وهدوء",description:"تطبيق عربي للعادات واليوميات والأهداف والتذكيرات والتعلّم، إلى جانب أدوات محمية لإدارة المواعيد."},
      tr:{headline:"Günlük rutinler, düşünülmüş bir bütün.",description:"Alışkanlıklar, günlük, hedefler, hatırlatmalar ve öğrenme için Arapça odaklı PWA; oturumla korunan randevu araçları da içerir."}
    }
  },
  {
    id:"smart-qr-pager", name:"Smart QR Pager", group:"product", original:true, stage:"prototype",
    stack:["QR","Web","Cafés & restaurants"], keywords:["مطاعم","مقاهي","pager"],
    text:{
      en:{headline:"A quieter way to call the next customer.",description:"Restaurant and café paging prototype exploring QR-based customer entry and order-ready notifications."},
      ar:{headline:"طريقة أهدأ لاستدعاء العميل التالي",description:"نموذج لإشعارات المطاعم والمقاهي، يستكشف دخول العميل عبر QR وإبلاغه عند جاهزية الطلب."},
      tr:{headline:"Sıradaki müşteriyi çağırmanın daha sakin yolu.",description:"QR ile müşteri girişi ve sipariş hazır bildirimlerini ele alan restoran ve kafe çağrı sistemi prototipi."}
    }
  },
  {
    id:"marketing-agents", name:"AI Marketing Agents", group:"backend", original:true, stage:"development",
    stack:["TypeScript","Express","Prisma","BullMQ"], keywords:["Sumsum AI","agents","تسويق","وكلاء"],
    text:{
      en:{headline:"Put approvals at the centre of automation.",description:"Backend foundation for marketing-agent runs, risk assessment, approval routing and queued worker execution."},
      ar:{headline:"الموافقة في قلب الأتمتة",description:"أساس خلفي لتشغيل وكلاء التسويق وتقييم المخاطر وتوجيه الموافقات وتنفيذ المهام عبر طوابير العمل."},
      tr:{headline:"Otomasyonun merkezinde onay olsun.",description:"Pazarlama ajanları için çalışma kayıtları, risk değerlendirmesi, onay akışları ve kuyruk tabanlı görev yürütme altyapısı."}
    }
  },
  {
    id:"hajar-studio", name:"HAJAR Studio · Launch72", group:"web", original:true, stage:"prototype",
    stack:["HTML / CSS","JavaScript","AR / EN / TR"], keywords:["websites","landing pages","مواقع"],
    text:{
      en:{headline:"A clear digital front door for local businesses.",description:"Multilingual service-site and landing-page package with responsive layouts, service presentation and contact journeys."},
      ar:{headline:"واجهة رقمية واضحة للمشاريع المحلية",description:"حزمة موقع خدمات وصفحات تعريفية متعددة اللغات، بتصميم متجاوب وعرض للخدمات ومسارات تواصل واضحة."},
      tr:{headline:"Yerel işletmeler için anlaşılır bir dijital vitrin.",description:"Duyarlı tasarım, hizmet sunumu ve iletişim akışlarını birleştiren çok dilli hizmet sitesi ve açılış sayfası paketi."}
    }
  },
  {
    id:"lumera", name:"LUMERA", group:"product", original:true, stage:"prototype",
    stack:["JavaScript","Canvas","Web Audio","AR / EN / TR"], keywords:["gifts","photos","هدايا","صور"],
    text:{
      en:{headline:"Turn personal moments into interactive experiences.",description:"Gift-page editor with occasion templates, photo cropping and ordering, sound controls and standalone HTML, JSON and PNG exports."},
      ar:{headline:"لحظات شخصية تتحوّل إلى تجربة تفاعلية",description:"محرّر صفحات هدايا بقوالب للمناسبات واقتصاص الصور وترتيبها والتحكم بالصوت وتصدير HTML وJSON وبطاقات PNG."},
      tr:{headline:"Kişisel anları etkileşimli deneyimlere dönüştürün.",description:"Etkinlik şablonları, fotoğraf kırpma ve sıralama, ses denetimleri ile bağımsız HTML, JSON ve PNG çıktıları sunan hediye sayfası editörü."}
    }
  },
  {
    id:"switchboard", name:"Switchboard", group:"tools", original:true, stage:"development",
    stack:["Python","SQLite","JavaScript","SDK"], keywords:["agents","runs","لوحة تحكم"],
    text:{
      en:{headline:"Keep projects, agents and runs in view.",description:"Local operations dashboard for projects, agent runs, activity monitoring, account controls and SDK-based polling."},
      ar:{headline:"المشاريع والوكلاء وعمليات التشغيل أمامك",description:"لوحة تشغيل محلية للمشاريع وعمليات الوكلاء ومراقبة النشاط وإعدادات الحساب، مع واجهة SDK لمتابعة الحالة."},
      tr:{headline:"Projeler, ajanlar ve çalışmalar tek görünümde.",description:"Projeler, ajan çalışmaları, etkinlik takibi, hesap denetimleri ve SDK ile durum sorgulama için yerel operasyon paneli."}
    }
  },
  {
    id:"venueflow", name:"VenueFlow Pro", group:"product", original:true, stage:"prototype",
    stack:["JavaScript","HTML / CSS","RTL","Dashboard"], keywords:["venues","bookings","billing","أماكن","فواتير"],
    text:{
      en:{headline:"Every detail of your spaces, in one place.",description:"An offline interface prototype for venue operations, bookings and billing, with a coordinated dashboard and Arabic RTL layouts."},
      ar:{headline:"كل تفاصيل مساحاتك، في مكان واحد",description:"نموذج واجهة محلي لإدارة الأماكن والحجوزات والفواتير، مع لوحة مترابطة وتصميم عربي من اليمين إلى اليسار."},
      tr:{headline:"Mekânlarınıza ait tüm ayrıntılar bir arada.",description:"Mekân operasyonları, rezervasyonlar ve faturalandırma için tutarlı panel ve Arapça RTL düzenleri içeren çevrimdışı arayüz prototipi."}
    }
  },
  {
    id:"culture-sy", name:"Culture-SY · Link Hub", group:"web", original:true, stage:"prototype", clientWork:true,
    stack:["HTML / CSS","JavaScript","Arabic RTL","QR"], keywords:["البيت الثقافي السوري","Syrian Cultural House","روابط"],
    text:{
      en:{headline:"One contact hub, aligned with a cultural identity.",description:"An Arabic contact-and-links page for the Syrian Cultural House, bringing official channels together in a brand-aligned experience."},
      ar:{headline:"كل الروابط ضمن هوية ثقافية واحدة",description:"صفحة تواصل وروابط عربية للبيت الثقافي السوري، تجمع القنوات الرسمية ضمن تجربة متناسقة مع هويته."},
      tr:{headline:"Kültürel kimlikle uyumlu tek bir iletişim noktası.",description:"Suriye Kültür Evi'nin resmî kanallarını kurum kimliğiyle uyumlu bir deneyimde birleştiren Arapça iletişim ve bağlantı sayfası."}
    }
  }
];
