# دليل مراجعة إصدار Digital Product Studio

هذه حزمة مراجعة، وليست إذناً بالنشر. الفرع التجاري يبقى Draft PR #58 فوق PR #56؛ لا تدمج أو تنشر دون موافقة صريحة. الاستضافة الحالية Render، وعقد Netlify بديل موجود في المستودع. لا يُطلب شراء دومين أو خدمة جديدة.

## التشغيل على Windows / PowerShell

```powershell
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
git switch feat/digital-studio-conversion-2026-11-24
node --version
npm --version
npm ci
npm run dev
```

استخدم Node 22.13.0 (ملف .node-version) وnpm 11.19.1. للتصدير القابل للمراجعة أغلق خادم التطوير أولاً:

```powershell
$env:GITHUB_SHA = (git rev-parse HEAD).Trim()
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
node scripts/release-candidate.mjs create out release-manifest.json $env:GITHUB_SHA
node scripts/release-candidate.mjs verify out release-manifest.json
python -m http.server 4173 --bind 127.0.0.1 --directory out
```

افتح http://127.0.0.1:4173/ ثم /ar/ و/tr/ . لا تستخدم next start مع output: export. يمكن تنزيل حزمة portfolio-review-<SHA> من CI للفرع التجاري (مدة الاحتفاظ 7 أيام) عند نجاح خطوة الحزمة؛ بعد فك الضغط افحص البصمة باستخدام السكربت من نفس commit. مجلد out هو ناتج الاستضافة؛ ملف release-manifest.json خارج المجلد للمراجعة فقط.

## شروط اعتماد الإصدار

- نجاح CI والأمان وBrowser QA وLighthouse على نفس SHA، وليس على فرع قديم. إذا تعطل npm audit خارجياً، لا تعتبر التحذير دليلاً على خلو الاعتماديات من الثغرات.
- مراجعة مخرجات الحزمة ولقطات المتصفح؛ اختبار هاتف وجهاز Windows فعليين باللغات الثلاث والوضعين.
- تمييز الديمو العام والمعاينة المحدودة وعدم وجود رابط؛ لا تدّعِ أن كل تطبيق صالح للبيع. أعد فحص Eventify وVenues API وBookHaven قبل الاعتماد التجاري.
- Lighthouse 95+ هدف أداء وليس نتيجة مثبتة. LCP ما زال يحتاج تحسين؛ قياسات المختبر ليست بيانات زوار حقيقية.
- لا ترفع أي صور خاصة أو أسرار أو بيانات عملاء. لا تنشر الملفات التاريخية المتضررة كصور معاينة.
- لا تغيير في main أو الإنتاج أو DNS أو الفوترة. Render وNetlify لديهما إعدادات نشر مرتبطة بفرع main؛ الدمج قد يطلق نشراً تلقائياً. يجب اعتماد الدمج والنشر بشكل صريح أولاً.
- قبل أي نقل لاستضافة أخرى: تحقق من حدود الخطة المجانية الحالية، إعدادات HTTPS/headers، canonical/sitemap، مسارات trailing slash و404. حافظ على عنوان الإنتاج الحالي إلى أن يُعتمد البديل.

بعد موافقة منفصلة على النشر: تحقق من SHA المنشور وفحص HTTP وملفات CV/briefs، روابط المِلاحة، SEO، وأمان الهيدرز. عند الإخفاق أوقف الترقيات وحدد آخر SHA مستقر وخطة استرجاع قبل تنفيذ أي rollback.
