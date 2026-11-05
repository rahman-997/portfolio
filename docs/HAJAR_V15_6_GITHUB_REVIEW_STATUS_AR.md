# HAJAR V15.6 | حالة مراجعة GitHub

التاريخ: 2 نوفمبر 2026

## ما تم فعلياً

- إنشاء فرع مراجعة على GitHub: `review/hajar-v15-5-qa-20261102` ضمن `rahman-997/portfolio`.
- التحقق أن `main` والفرع الجديد يشيران حالياً إلى نفس SHA الأساسي: `7512a4c317b0ea25bee32c3c41a52b333d12ceea`.
- لم تُرفع ملفات V15.6 إلى الفرع حتى الآن؛ إنشاء الفرع ليس رفعاً للشيفرة.
- تعديل أداة المراجعة لتستخدم الاسم الصحيح للفرع تلقائياً، ومنع الروابط الرمزية في المجلدات الجذرية المسموح بها.
- نجاح 106 اختباراً من 106، وتجربة Git محلية على 140 ملفاً مع بقاء `main` دون تغيير.
- فشل البناء المحلي فعلياً لأن حزمة Next.js غير مثبتة (`next: not found`) وتعذّر تثبيت الاعتماديات من npm في هذه البيئة.

## الخطوة المطلوبة لنقل الشيفرة فعلياً

على جهاز متصل بالإنترنت مع صلاحية Push إلى المستودع:

```bash
git clone https://github.com/rahman-997/portfolio.git portfolio-review-base
cd portfolio-review-base
git fetch origin main
cd /path/to/extracted/portfolio-main
node scripts/prepare-review-branch.mjs --repository /path/to/portfolio-review-base
node scripts/prepare-review-branch.mjs --repository /path/to/portfolio-review-base --apply
# افحص التغييرات في المسار الذي طبعته الأداة
# ثم نفّذ من مجلد الـworktree الجديد:
git push -u origin review/hajar-v15-5-qa-20261102
```

سوف تعمل CI على فرع المراجعة بعد رفع الكود. يجب التأكد من نجاح `npm ci` وLint وTypeScript والبناء وPlaywright، ثم تحميل `hajar-nextjs-preview-*` إذا تم إنشاؤه.

## الحدود

- لا توجد شهادة نجاح لبناء V15.6 ولا مجلد `out/` من هذا الإصدار.
- لا دمج في `main`، ولا نشر في Netlify أو Render، ولا تعديل لمحتوى إنستغرام الداخلي.
- نجاح بناء فروع GitHub الأخرى لا يثبت نجاح هذا الإصدار.
