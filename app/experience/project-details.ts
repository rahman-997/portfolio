import type { Locale } from "./locale";

export type ProjectDetailContent = { audience: string; features: readonly string[]; focus: string };
export const PROJECT_DETAILS: Record<string, Record<Locale, ProjectDetailContent>> = {
  "eventify": {
    "en": {
      "audience": "Event organisers and people booking places at events.",
      "features": [
        "Booking and waitlist flows connected to organiser tools.",
        "Background work coordinated through PostgreSQL, Redis and BullMQ."
      ],
      "focus": "Keep durable booking state separate from cache and queued work."
    },
    "ar": {
      "audience": "منظّمو الفعاليات والأشخاص الذين يحجزون أماكن فيها.",
      "features": [
        "حجوزات وقوائم انتظار مرتبطة بأدوات المنظّمين.",
        "مهام خلفية تنسّقها PostgreSQL وRedis وBullMQ."
      ],
      "focus": "فصل حالة الحجز الدائمة عن التخزين المؤقت وطوابير العمل."
    },
    "tr": {
      "audience": "Etkinlik düzenleyenler ve etkinliklere yer ayırtan kişiler.",
      "features": [
        "Organizatör araçlarıyla bağlantılı rezervasyon ve bekleme listeleri.",
        "PostgreSQL, Redis ve BullMQ üzerinden koordine edilen arka plan işleri."
      ],
      "focus": "Kalıcı rezervasyon durumunu önbellek ve iş kuyruklarından ayırmak."
    }
  },
  "bookbookhaven": {
    "en": {
      "audience": "Readers browsing a bookstore, alongside its operational team.",
      "features": [
        "Book discovery, cart, customer accounts and order journeys.",
        "Inventory and administrative operations across Next.js, Express and MongoDB."
      ],
      "focus": "Connect customer actions to consistent order and stock behaviour."
    },
    "ar": {
      "audience": "قرّاء يستكشفون متجر كتب، والفريق الذي يدير عملياته.",
      "features": [
        "استكشاف الكتب والسلة وحسابات العملاء ومسار الطلب.",
        "إدارة المخزون والعمليات عبر Next.js وExpress وMongoDB."
      ],
      "focus": "ربط إجراءات العميل بسلوك متناسق للطلبات والمخزون."
    },
    "tr": {
      "audience": "Kitap arayan okurlar ve mağazanın operasyon ekibi.",
      "features": [
        "Kitap keşfi, sepet, müşteri hesapları ve sipariş akışları.",
        "Next.js, Express ve MongoDB ile stok ve yönetim işlemleri."
      ],
      "focus": "Müşteri adımlarını tutarlı sipariş ve stok davranışıyla birleştirmek."
    }
  },
  "fitflow-gym": {
    "en": {
      "audience": "People who want a guided training experience on their own device.",
      "features": [
        "Personal plans and guided interval sessions.",
        "Weekly progress stored on the device in an installable PWA."
      ],
      "focus": "Make training state persistent and usable without adding unnecessary account flows."
    },
    "ar": {
      "audience": "أشخاص يريدون تجربة تدريب موجّهة على أجهزتهم.",
      "features": [
        "خطط شخصية وجلسات تدريب بفترات زمنية موجّهة.",
        "تقدّم أسبوعي محفوظ على الجهاز ضمن تطبيق قابل للتثبيت."
      ],
      "focus": "حفظ حالة التدريب وتسهيل استخدامها دون إضافة خطوات حسابات غير ضرورية."
    },
    "tr": {
      "audience": "Kendi cihazında yönlendirmeli antrenman yapmak isteyenler.",
      "features": [
        "Kişisel planlar ve aralıklı antrenman seansları.",
        "Kurulabilir PWA içinde cihazda saklanan haftalık ilerleme."
      ],
      "focus": "Gereksiz hesap adımları eklemeden antrenman durumunu kalıcı ve kullanışlı tutmak."
    }
  },
  "venues-api": {
    "en": {
      "audience": "Developers reviewing a compact, layered REST service.",
      "features": [
        "Schema validation and a clear controller/service boundary.",
        "UUID resources, predictable errors and HTTP contract tests."
      ],
      "focus": "Keep request validation, HTTP translation and business behaviour understandable."
    },
    "ar": {
      "audience": "مطوّرون يراجعون خدمة REST صغيرة ذات طبقات واضحة.",
      "features": [
        "التحقق من مخططات المدخلات وفصل المتحكّمات عن الخدمات.",
        "موارد بمعرّفات UUID وأخطاء متوقّعة واختبارات لعقود HTTP."
      ],
      "focus": "توضيح حدود التحقق من الطلبات وترجمة HTTP ومنطق العمل."
    },
    "tr": {
      "audience": "Küçük ve katmanlı bir REST servisini inceleyen geliştiriciler.",
      "features": [
        "Şema doğrulama ve açık controller/service ayrımı.",
        "UUID kaynakları, öngörülebilir hatalar ve HTTP sözleşme testleri."
      ],
      "focus": "İstek doğrulamasını, HTTP çevirisini ve iş davranışını anlaşılır tutmak."
    }
  },
  "mizan-finance": {
    "en": {
      "audience": "People organising personal budgets and everyday expenses.",
      "features": [
        "Budgeting and expense-planning interfaces with spending insights.",
        "Local data storage and Arabic RTL support."
      ],
      "focus": "Keep personal finance workflows clear while retaining data on the device."
    },
    "ar": {
      "audience": "أشخاص ينظّمون ميزانياتهم الشخصية ومصروفاتهم اليومية.",
      "features": [
        "واجهات للميزانيات وتخطيط المصروفات وتحليل الإنفاق.",
        "حفظ محلي للبيانات ودعم الواجهة العربية واتجاهها."
      ],
      "focus": "توضيح مسارات الإدارة المالية مع إبقاء البيانات على الجهاز."
    },
    "tr": {
      "audience": "Kişisel bütçe ve günlük giderlerini düzenleyenler.",
      "features": [
        "Bütçe, gider planlama ve harcama analizi ekranları.",
        "Yerel veri saklama ve Arapça RTL desteği."
      ],
      "focus": "Veriyi cihazda tutarken kişisel finans akışlarını anlaşılır kılmak."
    }
  },
  "portfolio": {
    "en": {
      "audience": "Clients, collaborators and hiring teams exploring my engineering work.",
      "features": [
        "A multilingual project catalog, technical case studies and an interactive AI Systems Atlas.",
        "Static export, accessibility checks and automated quality gates."
      ],
      "focus": "Make project scope, evidence and contact paths easy to explore."
    },
    "ar": {
      "audience": "عملاء ومتعاونون وفرق توظيف يستكشفون أعمالي الهندسية.",
      "features": [
        "معرض مشاريع متعدد اللغات ودراسات تقنية وأطلس تفاعلي لأنظمة الذكاء الاصطناعي.",
        "تصدير ثابت وفحوص لإمكانية الوصول وبوابات جودة آلية."
      ],
      "focus": "تسهيل فهم نطاق المشاريع وأدلتها وطرق التواصل بشأنها."
    },
    "tr": {
      "audience": "Mühendislik çalışmalarımı inceleyen müşteriler, iş ortakları ve işe alım ekipleri.",
      "features": [
        "Çok dilli proje kataloğu, teknik incelemeler ve etkileşimli AI Systems Atlas.",
        "Statik çıktı, erişilebilirlik kontrolleri ve otomatik kalite kapıları."
      ],
      "focus": "Proje kapsamını, kanıtları ve iletişim yollarını kolay keşfedilir hâle getirmek."
    }
  },
  "free-claude-code": {
    "en": {
      "audience": "Developers exploring an existing open-source AI coding tool.",
      "features": [
        "An explicitly attributed fork of a third-party project.",
        "Access to the fork and the original upstream repository."
      ],
      "focus": "Make the upstream provenance and the purpose of the fork easy to inspect."
    },
    "ar": {
      "audience": "مطوّرون يستكشفون أداة برمجة مفتوحة المصدر تعتمد على الذكاء الاصطناعي.",
      "features": [
        "نسخة متفرعة من مشروع خارجي مع توضيح مصدرها.",
        "روابط للنسخة المتفرعة والمستودع الأصلي."
      ],
      "focus": "توضيح المصدر الأصلي وطبيعة النسخة المتفرعة لتسهيل مراجعتها."
    },
    "tr": {
      "audience": "Mevcut bir açık kaynak yapay zekâ kodlama aracını araştıran geliştiriciler.",
      "features": [
        "Kaynağı açıkça belirtilen üçüncü taraf proje fork’u.",
        "Fork’a ve orijinal kaynak depoya erişim."
      ],
      "focus": "Orijinal kaynağı ve fork’un amacını kolay incelenebilir kılmak."
    }
  },
  "hajarcare": {
    "en": {
      "audience": "Clinic teams organising appointments and operational records.",
      "features": [
        "Appointment workflows and staff permissions.",
        "Tenant-separated operational data and clinic-management screens."
      ],
      "focus": "Make responsibilities and data boundaries explicit in a clinic-management pilot."
    },
    "ar": {
      "audience": "فرق عيادات تنظّم مواعيدها وسجلاتها التشغيلية.",
      "features": [
        "مسارات للمواعيد وصلاحيات الموظفين.",
        "فصل بيانات العيادات وواجهات إدارة العمليات."
      ],
      "focus": "توضيح المسؤوليات وحدود البيانات ضمن نسخة تجريبية لإدارة العيادات."
    },
    "tr": {
      "audience": "Randevularını ve operasyon kayıtlarını düzenleyen klinik ekipleri.",
      "features": [
        "Randevu akışları ve personel yetkileri.",
        "Klinik bazında veri ayrımı ve operasyon yönetimi ekranları."
      ],
      "focus": "Klinik yönetim pilotunda sorumlulukları ve veri sınırlarını netleştirmek."
    }
  },
  "sirahazir": {
    "en": {
      "audience": "Businesses managing a customer queue and appointment flow.",
      "features": [
        "Staff roles, customer entry pages and service stations.",
        "Display boards for the current queue state."
      ],
      "focus": "Keep customer and staff views connected around a clear service journey."
    },
    "ar": {
      "audience": "مؤسسات تدير طوابير العملاء ومواعيدهم.",
      "features": [
        "أدوار للموظفين وصفحات لدخول العملاء ومحطات خدمة.",
        "شاشات عرض لحالة الطابور الحالية."
      ],
      "focus": "ربط ما يراه العميل والموظف ضمن رحلة خدمة واضحة."
    },
    "tr": {
      "audience": "Müşteri sırası ve randevu akışını yöneten işletmeler.",
      "features": [
        "Personel rolleri, müşteri giriş sayfaları ve hizmet noktaları.",
        "Güncel sıra durumunu gösteren ekran panoları."
      ],
      "focus": "Müşteri ve personel görünümlerini net bir hizmet yolculuğunda birleştirmek."
    }
  },
  "salespilot-ai": {
    "en": {
      "audience": "Small businesses following customer conversations and sales activity.",
      "features": [
        "A CRM workspace for customers and conversations.",
        "Authenticated analytics, date filters and multilingual charts."
      ],
      "focus": "Present useful sales information through clear, protected application screens."
    },
    "ar": {
      "audience": "مشاريع صغيرة تتابع محادثات العملاء ونشاط المبيعات.",
      "features": [
        "مساحة لإدارة العملاء والمحادثات.",
        "تحليلات محمية وفلاتر زمنية ورسوم بواجهات متعددة اللغات."
      ],
      "focus": "عرض معلومات المبيعات المفيدة ضمن شاشات واضحة ومحمية."
    },
    "tr": {
      "audience": "Müşteri görüşmelerini ve satış etkinliğini takip eden küçük işletmeler.",
      "features": [
        "Müşteri ve görüşme yönetimi için CRM alanı.",
        "Oturumla korunan analizler, tarih filtreleri ve çok dilli grafikler."
      ],
      "focus": "Satış verilerini anlaşılır ve korumalı uygulama ekranlarında sunmak."
    }
  },
  "kivyro": {
    "en": {
      "audience": "People exploring a fitness product that evolves the earlier FitFlow experience.",
      "features": [
        "Program discovery, training recommendations and guided intervals.",
        "Progress stored on the user’s device."
      ],
      "focus": "Connect program discovery, guided intervals and progress into a coherent fitness journey."
    },
    "ar": {
      "audience": "أشخاص يستكشفون منتج لياقة يطوّر تجربة FitFlow السابقة.",
      "features": [
        "استكشاف البرامج وتوصيات التدريب والفترات الزمنية الموجّهة.",
        "حفظ التقدّم على جهاز المستخدم."
      ],
      "focus": "ربط استكشاف البرامج وفترات التدريب والتقدّم ضمن رحلة لياقة مترابطة."
    },
    "tr": {
      "audience": "Önceki FitFlow deneyiminden gelişen bir fitness ürününü inceleyenler.",
      "features": [
        "Program keşfi, antrenman önerileri ve yönlendirmeli aralıklar.",
        "Kullanıcının cihazında saklanan ilerleme."
      ],
      "focus": "Program keşfini, yönlendirmeli aralıkları ve ilerlemeyi tutarlı bir fitness yolculuğuna bağlamak."
    }
  },
  "digital-rug-max": {
    "en": {
      "audience": "People who want a visual desktop and mobile space for files.",
      "features": [
        "A floating desktop surface with import and export flows.",
        "Recovery tools and backup-integrity checks."
      ],
      "focus": "Make everyday file actions visible and understandable across desktop and mobile targets."
    },
    "ar": {
      "audience": "أشخاص يريدون مساحة مرئية لملفاتهم على الحاسوب والهاتف.",
      "features": [
        "مساحة عائمة على سطح المكتب ومسارات للاستيراد والتصدير.",
        "أدوات للاستعادة وفحص سلامة النسخ الاحتياطية."
      ],
      "focus": "توضيح إجراءات الملفات اليومية عبر نسخ الحاسوب والهاتف المستهدفة."
    },
    "tr": {
      "audience": "Dosyaları için masaüstü ve mobilde görsel bir alan isteyenler.",
      "features": [
        "Yüzen masaüstü alanı ile içe ve dışa aktarma akışları.",
        "Geri yükleme araçları ve yedek bütünlüğü kontrolleri."
      ],
      "focus": "Masaüstü ve mobil hedeflerde günlük dosya işlemlerini görünür ve anlaşılır kılmak."
    }
  },
  "aura": {
    "en": {
      "audience": "Creators exploring a multilingual community-platform project.",
      "features": [
        "A web experience with account sessions and two-factor access.",
        "Desktop and mobile build targets around the source project."
      ],
      "focus": "Connect account behaviour to a consistent multilingual community experience."
    },
    "ar": {
      "audience": "صنّاع محتوى يستكشفون مشروع منصة مجتمعية متعددة اللغات.",
      "features": [
        "تجربة ويب مع جلسات الحساب والمصادقة الثنائية.",
        "مسارات بناء للحاسوب والهاتف ضمن المشروع المصدري."
      ],
      "focus": "ربط سلوك الحسابات بتجربة مجتمعية متناسقة ومتعددة اللغات."
    },
    "tr": {
      "audience": "Çok dilli topluluk platformu projesini inceleyen içerik üreticileri.",
      "features": [
        "Hesap oturumları ve iki aşamalı erişim içeren web deneyimi.",
        "Kaynak proje için masaüstü ve mobil derleme hedefleri."
      ],
      "focus": "Hesap davranışını tutarlı bir çok dilli topluluk deneyimine bağlamak."
    }
  },
  "athrua": {
    "en": {
      "audience": "Individuals and small teams organising incoming client requests.",
      "features": [
        "Client statuses, notes, priorities and follow-up dates.",
        "Local request management with guarded import tools."
      ],
      "focus": "Keep the next action for each enquiry clear while protecting existing records during import."
    },
    "ar": {
      "audience": "أفراد وفرق صغيرة تنظّم طلبات العملاء الواردة.",
      "features": [
        "حالات العملاء والملاحظات والأولويات ومواعيد المتابعة.",
        "إدارة محلية للطلبات مع أدوات استيراد تحمي السجلات الموجودة."
      ],
      "focus": "توضيح الإجراء التالي لكل طلب وحماية السجلات أثناء الاستيراد."
    },
    "tr": {
      "audience": "Gelen müşteri taleplerini düzenleyen bireyler ve küçük ekipler.",
      "features": [
        "Müşteri durumları, notlar, öncelikler ve takip tarihleri.",
        "Mevcut kayıtları koruyan içe aktarma araçlarıyla yerel talep yönetimi."
      ],
      "focus": "Her talebin sonraki adımını netleştirirken içe aktarmada mevcut kayıtları korumak."
    }
  },
  "sham": {
    "en": {
      "audience": "People organising Arabic-first daily routines and personal planning.",
      "features": [
        "Habits, journaling, goals, reminders and learning.",
        "Authenticated appointment-management tools alongside daily planning."
      ],
      "focus": "Bring related daily activities together without losing the clarity of each workflow."
    },
    "ar": {
      "audience": "أشخاص ينظّمون روتينهم اليومي وتخطيطهم الشخصي بواجهة عربية.",
      "features": [
        "العادات واليوميات والأهداف والتذكيرات والتعلّم.",
        "أدوات محمية لإدارة المواعيد إلى جانب التخطيط اليومي."
      ],
      "focus": "جمع الأنشطة اليومية المرتبطة مع الحفاظ على وضوح كل مسار."
    },
    "tr": {
      "audience": "Günlük rutinlerini ve kişisel planlarını Arapça bir arayüzde düzenleyenler.",
      "features": [
        "Alışkanlıklar, günlük, hedefler, hatırlatmalar ve öğrenme.",
        "Günlük planlamanın yanında oturumla korunan randevu araçları."
      ],
      "focus": "Her akışın açıklığını koruyarak ilgili günlük etkinlikleri bir araya getirmek."
    }
  },
  "smart-qr-pager": {
    "en": {
      "audience": "Restaurants and cafés exploring QR-based customer paging.",
      "features": [
        "A prototype for customer entry through a QR code.",
        "An order-ready notification concept for venue service."
      ],
      "focus": "Prototype QR entry and paging flows around a clear customer journey."
    },
    "ar": {
      "audience": "مطاعم ومقاهٍ تستكشف استدعاء العملاء عبر رمز QR.",
      "features": [
        "نموذج أولي لدخول العميل باستخدام رمز QR.",
        "فكرة لإبلاغ العميل عند جاهزية الطلب."
      ],
      "focus": "نمذجة الدخول عبر QR وإشعارات الاستدعاء ضمن رحلة عميل واضحة."
    },
    "tr": {
      "audience": "QR tabanlı müşteri çağrısını araştıran restoran ve kafeler.",
      "features": [
        "QR koduyla müşteri girişi prototipi.",
        "Mekân hizmeti için sipariş hazır bildirimi fikri."
      ],
      "focus": "QR ile giriş ve çağrı akışlarını net bir müşteri yolculuğunda prototiplemek."
    }
  },
  "marketing-agents": {
    "en": {
      "audience": "Teams exploring approval-based marketing automation.",
      "features": [
        "Marketing-agent run records and risk assessment.",
        "Approval routing and queued worker execution."
      ],
      "focus": "Make approval boundaries visible before automated work proceeds."
    },
    "ar": {
      "audience": "فرق تستكشف أتمتة التسويق المبنية على الموافقات.",
      "features": [
        "سجلات تشغيل وكلاء التسويق وتقييم المخاطر.",
        "توجيه الموافقات وتنفيذ المهام عبر طوابير العمل."
      ],
      "focus": "توضيح حدود الموافقة قبل متابعة تنفيذ العمل الآلي."
    },
    "tr": {
      "audience": "Onaya dayalı pazarlama otomasyonunu araştıran ekipler.",
      "features": [
        "Pazarlama ajanı çalışma kayıtları ve risk değerlendirmesi.",
        "Onay yönlendirme ve kuyruk tabanlı görev yürütme."
      ],
      "focus": "Otomatik iş ilerlemeden önce onay sınırlarını görünür kılmak."
    }
  },
  "hajar-studio": {
    "en": {
      "audience": "Local businesses presenting their services online.",
      "features": [
        "A multilingual service-site and landing-page package.",
        "Responsive layouts, service presentation and contact journeys."
      ],
      "focus": "Help visitors understand the offer and find a clear path to contact."
    },
    "ar": {
      "audience": "مشاريع محلية تعرض خدماتها على الإنترنت.",
      "features": [
        "حزمة موقع خدمات وصفحات تعريفية متعددة اللغات.",
        "تصميم متجاوب وعرض للخدمات ومسارات للتواصل."
      ],
      "focus": "مساعدة الزائر على فهم الخدمات والوصول إلى وسيلة تواصل واضحة."
    },
    "tr": {
      "audience": "Hizmetlerini internette sunan yerel işletmeler.",
      "features": [
        "Çok dilli hizmet sitesi ve açılış sayfası paketi.",
        "Duyarlı düzenler, hizmet sunumu ve iletişim akışları."
      ],
      "focus": "Ziyaretçinin sunulan hizmeti anlamasını ve iletişim yolunu bulmasını kolaylaştırmak."
    }
  },
  "lumera": {
    "en": {
      "audience": "People creating interactive pages as personal gifts.",
      "features": [
        "Occasion templates, photo cropping and image ordering.",
        "Sound controls and standalone HTML, JSON and PNG exports."
      ],
      "focus": "Turn selected personal content into a portable interactive experience."
    },
    "ar": {
      "audience": "أشخاص يصمّمون صفحات تفاعلية لتقديمها كهدايا شخصية.",
      "features": [
        "قوالب مناسبات واقتصاص الصور وترتيبها.",
        "التحكم بالصوت وتصدير HTML وJSON وبطاقات PNG."
      ],
      "focus": "تحويل المحتوى الشخصي المختار إلى تجربة تفاعلية قابلة للنقل."
    },
    "tr": {
      "audience": "Kişisel hediye olarak etkileşimli sayfalar hazırlayanlar.",
      "features": [
        "Etkinlik şablonları, fotoğraf kırpma ve görsel sıralama.",
        "Ses kontrolleri ile bağımsız HTML, JSON ve PNG çıktıları."
      ],
      "focus": "Seçilen kişisel içeriği taşınabilir bir etkileşimli deneyime dönüştürmek."
    }
  },
  "switchboard": {
    "en": {
      "audience": "People monitoring projects, agents and runs in a local workspace.",
      "features": [
        "A local dashboard for projects, run records and activity.",
        "Account controls and SDK-based state polling."
      ],
      "focus": "Bring local run records and SDK status signals into a clear operational view."
    },
    "ar": {
      "audience": "أشخاص يراقبون المشاريع والوكلاء وعمليات التشغيل ضمن مساحة محلية.",
      "features": [
        "لوحة محلية للمشاريع وسجلات التشغيل والنشاط.",
        "إعدادات حساب وواجهة SDK للاستعلام عن الحالة."
      ],
      "focus": "جمع سجلات التشغيل المحلية وإشارات الحالة ضمن واجهة تشغيل واضحة."
    },
    "tr": {
      "audience": "Yerel bir çalışma alanında proje, ajan ve çalışmaları izleyenler.",
      "features": [
        "Projeler, çalışma kayıtları ve etkinlik için yerel panel.",
        "Hesap denetimleri ve SDK ile durum sorgulama."
      ],
      "focus": "Yerel çalışma kayıtlarını ve SDK durum sinyallerini açık bir operasyon görünümünde birleştirmek."
    }
  },
  "venueflow": {
    "en": {
      "audience": "Venue teams exploring a coordinated operations interface.",
      "features": [
        "An offline interface prototype for venues and bookings.",
        "Billing views and an Arabic RTL dashboard."
      ],
      "focus": "Bring venue activity, booking and billing views into a consistent Arabic interface."
    },
    "ar": {
      "audience": "فرق أماكن وفعاليات تستكشف واجهة مترابطة لإدارة العمليات.",
      "features": [
        "نموذج واجهة محلي لإدارة الأماكن والحجوزات.",
        "واجهات للفواتير ولوحة تحكم عربية باتجاه صحيح."
      ],
      "focus": "جمع نشاط الأماكن والحجوزات والفواتير ضمن واجهة عربية متناسقة."
    },
    "tr": {
      "audience": "Tutarlı bir operasyon arayüzünü inceleyen mekân ekipleri.",
      "features": [
        "Mekânlar ve rezervasyonlar için çevrimdışı arayüz prototipi.",
        "Faturalandırma görünümleri ve Arapça RTL paneli."
      ],
      "focus": "Mekân etkinliği, rezervasyon ve faturalandırma görünümlerini tutarlı bir Arapça arayüzde birleştirmek."
    }
  },
  "culture-sy": {
    "en": {
      "audience": "People looking for the Syrian Cultural House’s official contact channels.",
      "features": [
        "An Arabic contact-and-links page aligned with the organisation’s identity.",
        "Official channels brought together in one contact hub."
      ],
      "focus": "Make the organisation’s contact channels easy to find through a consistent visual identity."
    },
    "ar": {
      "audience": "أشخاص يبحثون عن قنوات التواصل الرسمية للبيت الثقافي السوري.",
      "features": [
        "صفحة تواصل وروابط عربية متناسقة مع هوية المؤسسة.",
        "جمع القنوات الرسمية ضمن مركز تواصل واحد."
      ],
      "focus": "تسهيل الوصول إلى قنوات تواصل المؤسسة ضمن هوية مرئية متناسقة."
    },
    "tr": {
      "audience": "Suriye Kültür Evi’nin resmî iletişim kanallarını arayanlar.",
      "features": [
        "Kurum kimliğiyle uyumlu Arapça iletişim ve bağlantı sayfası.",
        "Resmî kanalları bir araya getiren tek iletişim noktası."
      ],
      "focus": "Kurumun iletişim kanallarını tutarlı bir görsel kimlikle kolay bulunur hâle getirmek."
    }
  }
};
