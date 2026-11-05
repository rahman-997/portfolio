# HAJAR Portfolio V15.5 | إصدار مراجعة معزول

## ماذا أنجزنا؟
- إضافة `npm run review:prepare` لتجهيز فرع **review/hajar-*** في Git Worktree مستقل.
- الوضع الافتراضي **معاينة فقط** ولا يكتب أو يدفع أي شيء.
- `--apply` ينشئ الفرع وCommit **محلياً** من ملفات الموقع المسموح بها فقط. `--push` يحتاج تمرير `--apply` معه صراحةً، ويُسمح بالدفع فقط إلى `rahman-997/portfolio`.
- التحقق من سلامة مجلد المصدر ووجود `package-lock.json` و`app/page.tsx`، ورفض الأسماء غير الآمنة للفرع.
- رفض الروابط الرمزية والملفات غير الموثوقة، واستبعاد ملفات `.env` وكلمات السر والاعتماديات والمجلدات المرتبطة بمحتوى إنستغرام الداخلي.
- التحقق من أن الفرع الأساسي `main` والمجلد العامل الأصلي بقيا دون تغيير عبر مستودعات اختبار Git محلية حقيقية.

## حالة فرع GitHub الآن (2 نوفمبر 2026)
- أُنشئ الفرع الفعلي `review/hajar-v15-5-qa-20261102` على GitHub انطلاقاً من `main`.
- **هذا الفرع لا يحتوي بعد على ملفات V15.5**؛ لا تُفسّر نجاح اختبار عليه قبل نقل الملفات على أنه نجاح لهذا الإصدار.
- فرع `main` والموقع المنشور لم يتغيرا. التغييرات تُنقل إلى فرع المراجعة فقط.
- رابط الفرع: https://github.com/rahman-997/portfolio/tree/review/hajar-v15-5-qa-20261102

## طريقة التشغيل في جهاز متصل بالإنترنت

**لا تنفّذ على فرع main مباشرةً**. افتح مجلداً جديداً واستخرج ZIP للموقع، ثم:

```bash
# من مجلد منفصل عن كود HAJAR
 git clone https://github.com/rahman-997/portfolio.git portfolio-review-base
 git -C portfolio-review-base fetch origin main

# غيّر /absolute/path/... إلى مسارات جهازك الفعلية
cd /absolute/path/to/HAJAR/portfolio-main

# عرض ما سيحدث فقط، دون أي تغيير
npm run review:prepare -- --repository /absolute/path/to/portfolio-review-base --branch review/hajar-v15-5-qa-20261102

# إنشاء branch + commit على الجهاز فقط (لا يغيّر main)
npm run review:prepare -- --repository /absolute/path/to/portfolio-review-base --branch review/hajar-v15-5-qa-20261102 --apply
```

لتتمكن من الدفع بعد مراجعة الملفات، استخدم المجلد المنفصل الذي أُنشئ باسم `hajar-review-review-hajar-v15-5-qa`:

```bash
 git -C /absolute/path/to/hajar-review-review-hajar-v15-5-qa status
 git -C /absolute/path/to/hajar-review-review-hajar-v15-5-qa push -u origin review/hajar-v15-5-qa-20261102
```

**تنبيه:** الدفع إلى الفرع المنفصل يشغّل GitHub Actions عند توفره، لكنه ليس دفعاً إلى `main`. لا تدمج Pull Request ولا تفعل نشر الإنتاج قبل اكتمال اختبارات الإنتاج والمتصفح ومراجعة التغييرات.

## معايير النجاح الفعلية
1. ينجح `npm ci --no-audit --no-fund` على GitHub Actions.
2. ينجح Lint وTypeScript والاختبارات الآلية و`npm run build`.
3. يتولد مجلد `out/` ويجتاز `npm run verify:export`.
4. تجتاز Playwright/Chromium فحوص التفاعل والتجاوب وإمكانية الوصول، وينتج Artifact باسم `hajar-nextjs-preview-*`.
5. يتأكد المراجع أن الملفات المنشورة خالية من معلومات داخلية وخطة نشر إنستغرام قبل أي دمج.

## حالة التأكد الحالية
- اختبارات المصدر وفحوص Git المعزول: ناجحة محلياً عند إعداد هذا الإصدار.
- **لم يكتمل البناء الإنتاجي لهذه النسخة**: سجل npm غير قابل للوصول من البيئة الحالية (DNS)، ولا يوجد `node_modules` أو مجلد `out/`.
- المستودع المربوط على GitHub يحتوي على إصدار مختلف من الكود؛ نجاح Workflow سابق هناك **لا يعني** نجاح بناء HAJAR V15.5.
- لم يُرفع أي فرع أو ملف إلى GitHub في هذه المرحلة؛ لا يوجد نشر تلقائي أو تغيير على الموقع العام.
