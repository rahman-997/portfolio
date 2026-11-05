# HAJAR Portfolio V15.4 | تقرير جاهزية البناء والمراجعة

**الحالة:** مرشّح مراجعة، وليس بناءً إنتاجياً ناجحاً بعد.  
**النسخة الشخصية:** HAJAR Portfolio، منفصلة عن FolioGrid وعن خطة إنستغرام الداخلية.

## ما تغيّر في V15.4

1. تثبيت متصفح Playwright Chromium واعتماديات نظامه صراحةً في كل من `.github/workflows/ci.yml` و`.github/workflows/atlas-browser-qa.yml`، بدل افتراض وجود نسخة Chrome ضمن بيئة GitHub Actions.
2. جعل `scripts/atlas-browser-qa.py` يستخدم نسخة Chromium المثبتة بواسطة Playwright افتراضياً، مع إبقاء متغير `ATLAS_CHROMIUM_PATH` للتشغيل المحلي.
3. إضافة اختبارات رجعية مستقلة لإعداد المتصفح وتحديث اختبار قديم كان يفرض استخدام قناة Chrome.
4. إبقاء فصل المراجعة عن الإنتاج: فرع المراجعة ينتج ملفات Preview فقط إذا نجحت جميع الفحوص؛ مخرجات الإنتاج محصورة بنجاح `push` إلى `main`.

## الفحوص التي أُجريت محلياً

- `npm run test:ui`: **98/98 ناجحة**.
- `node scripts/verify-toolchain.mjs`: ناجح، ويتحقق من الإصدارات والإعدادات الموثّقة.
- `python3 -m py_compile scripts/atlas-browser-qa.py`: ناجح.
- تشغيل Chromium المحلي باستخدام Playwright و`ATLAS_CHROMIUM_PATH` المكافئ: نجح اختبار فتح صفحة HTML بسيطة؛ **ليس اختبار التطبيق المجمّع**.
- محاولة `npm run check:release`: نفّذت 98 اختباراً، ثم توقفت عند ESLint غير المثبّت.
- `curl https://registry.npmjs.org/next`: فشل DNS، لذا لم يُنزّل Next.js ولم يُبنَ مجلد `out/`.

## حالة GitHub التي تم التحقق منها

- المستودع المعروف من `package.json`: `rahman-997/portfolio`، الفرع الافتراضي `main`.
- ملف `main/.github/workflows/ci.yml` الذي جرى الاطلاع عليه عبر GitHub أقدم من ملف V15.4؛ لا يفترض أن تشغيله على `main` يختبر هذا الإصدار.
- لم يُعدّل المستودع، ولم تُنشأ فروع أو تشغيلات أو PR، ولم يُنشر موقع جديد.

## الخطوات المتبقية لاعتماد الإصدار

1. على نسخة عمل نظيفة من المستودع، أنشئ فرع مراجعة جديداً، وأضف ملفات `portfolio-main` من V15.4 إلى جذر المستودع. **لا ترفع** ملفات إنستغرام الداخلية إلى المستودع العام.
2. ارفع فرع المراجعة. شغّل **Portfolio CI** لهذا الفرع وتحقّق من نجاح `npm ci` وLint وTypeScript وبناء Next.js وفحص التصدير وChromium وإمكانية الوصول.
3. حمّل Artifact الذي يبدأ بـ`hajar-nextjs-preview-`، وتحقق من وجود `index.html` وصفحات المشاريع و`resume/index.html` ضمن `out/`.
4. اختبر ملفات `out/` محلياً أو في Preview معزول، وأصلح أي فشل يظهر في التشغيل الحقيقي قبل الدمج.
5. لا تدمج إلى `main` أو تنشر الموقع قبل مراجعة Preview واعتماد النتيجة يدوياً، لأن المستودع يحتوي على إعداد نشر قد يعمل بعد الدفع إلى `main`.

## أوامر مفيدة

```bash
npm ci --no-audit --no-fund
npm run check:release
python3 -m pip install playwright==1.56.0
python3 -m playwright install --with-deps chromium
npm run preview:export -- --port 4173 --dir out
# من نافذة ثانية:
python3 scripts/atlas-browser-qa.py
```

**تنبيه:** بعض الأوامر تتطلب اتصالاً بالإنترنت وبيئة Linux متوافقة مع Playwright. هذا التقرير لا يمثل شهادة نجاح بناء إنتاجي.
