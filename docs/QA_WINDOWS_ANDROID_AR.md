# Portfolio V3.1 | دليل الاختبار المحلي على Windows وAndroid

**النطاق:** معاينة ملفات Static Export فقط على كمبيوتر Windows وهاتف Android في نفس شبكة Wi-Fi. لا دمج إلى main، ولا نشر على Render أو Netlify، ولا أي تكلفة مدفوعة.

## 1) تجهيز الكمبيوتر
- ثبّت Git for Windows إذا لم يكن مثبتاً: https://git-scm.com/download/win
- ثبّت Node.js 22.13.0 x64 إذا لم يكن مثبتاً: https://nodejs.org/en/download/archive/v22.13.0
- افتح PowerShell جديداً للتأكد من تحديث PATH.
- لا تحتاج Python أو Docker أو حساب استضافة.

تحقق:
~~~powershell
git --version
node --version
npm.cmd --version
~~~

يجب أن يكون Node 22.13.0. لإعداد npm بنفس نسخة المشروع:
~~~powershell
npm.cmd install --global npm@11.19.1
npm.cmd --version
~~~
استخدام \`npm.cmd\` مقصود لتفادي خطأ حظر \`npm.ps1\` في Windows PowerShell، من غير تغيير Execution Policy.

## 2) تنزيل فرع التطوير في مجلد منفصل
~~~powershell
Set-Location $HOME
git clone --branch feature/portfolio-v3-i18n --single-branch https://github.com/rahman-997/portfolio.git portfolio-v3-local-test
Set-Location .\portfolio-v3-local-test
git branch --show-current
~~~
يجب أن يظهر \`feature/portfolio-v3-i18n\`. إذا كان المجلد موجوداً بالفعل، اختر اسم مجلد جديد بدلاً من حذفه.

## 3) تثبيت وفحص النسخة النهائية
~~~powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run verify:export
node .\scripts\verify-i18n.mjs
node .\scripts\verify-preview-static.mjs
npm.cmd run audit
~~~
- \`npm.cmd run build\` يشغّل \`next build --webpack\` ثم \`scripts/localize-static-html.mjs\`.
- إعداد \`next.config.ts\` هو \`output: "export"\` و\`trailingSlash: true\`. الناتج \`out\`، وليس خادم Next.js الإنتاجي.
- \`npm.cmd run audit\` يحتاج اتصال إنترنت لإجراء فحص أمني حديث.
- فحص ملفات HTML بدون تشغيل JavaScript:
~~~powershell
Select-String -Path .\out\ar\index.html -Pattern '<html lang="ar" dir="rtl"' -Quiet
Select-String -Path .\out\tr\index.html -Pattern '<html lang="tr" dir="ltr"' -Quiet
~~~
المخرجات الصحيحة: \`True\` في السطرين.

## 4) المعاينة على Windows أولاً
~~~powershell
npm.cmd run preview:local
~~~
ثم افتح:
- http://127.0.0.1:4173/
- http://127.0.0.1:4173/ar/
- http://127.0.0.1:4173/tr/
- http://127.0.0.1:4173/ar/work/eventify/

أوقف المعاينة بـCtrl+C قبل الانتقال إلى الخطوة التالية.

## 5) المشاركة مع Android على نفس شبكة Wi-Fi
- تأكد من اتصال الكمبيوتر والهاتف بنفس شبكة Wi-Fi الخاصة والموثوقة. لا تستخدم Mobile Data على الهاتف.
- اعرف IPv4 الخاص بشبكة Wi-Fi على Windows بالأمر \`ipconfig\`. ابحث عن \`IPv4 Address\` تحت محول Wi-Fi.
- استخدم عنواناً حقيقياً من جهازك (مثال افتراضي فقط: \`192.168.1.25\`).
~~~powershell
npm.cmd run preview:lan
~~~
سيعرض الأمر عناوين LAN مرشّحة. اختر عنوان Wi-Fi الصحيح فقط. إذا طلب Windows Defender Firewall السماح، اسمح **Private networks فقط**، ولا توقف الجدار الناري.

على Chrome في الهاتف افتح (استبدل المثال بعنوان الكمبيوتر الحقيقي):
- \`http://192.168.1.25:4173/\`
- \`http://192.168.1.25:4173/ar/\`
- \`http://192.168.1.25:4173/tr/\`
- \`http://192.168.1.25:4173/ar/resume/\`
- \`http://192.168.1.25:4173/ar/work/bookhaven/\`

المعاينة لا تنشر على الإنترنت، لكنها مرئية لأي جهاز يستطيع الوصول لعنوان الكمبيوتر على الشبكة المحلية أثناء تشغيل \`preview:lan\`. لذلك استخدم شبكة خاصة فقط، ولا تفتح Port Forwarding على الراوتر.

## 6) قائمة فحص فعلية على Android
- [ ] اللغة الإنجليزية والعربية والتركية تفتح، ومبدّل اللغات يعمل.
- [ ] العربية باتجاه RTL صحيح؛ الإنجليزية والتركية LTR.
- [ ] أسماء المشاريع والزرّان الرئيسيان غير متداخلين أو مقطوعين.
- [ ] مجسّم Holo3D يعمل باللمس (سحب للدوران)، وأزرار تبديل الوضع/الإيقاف والاستئناف تستجيب.
- [ ] لا يوجد تمرير أفقي على الشاشة.
- [ ] الرئيسية والسيرة الذاتية ودراسات المشاريع تفتح من الروابط.
- [ ] ملف PDF للسيرة قابل للفتح؛ هو حالياً بالإنجليزية.
- [ ] استخدم Chrome DevTools على Windows إن أمكن لفحص الأخطاء مع الهاتف.
- [ ] كرر الاختبار مع تفعيل Reduce motion من إعدادات Android.
- [ ] عند تعطيل JavaScript مؤقتاً، يظهر المحتوى النصي والروابط ولغة الصفحة بشكل صحيح. مجسّم WebGL2 التفاعلي يحتاج JavaScript بطبيعته.

## 7) إذا تعذر فتح الموقع على الهاتف
1. تأكد أن \`npm.cmd run preview:lan\` ما زال شغّالاً وأنه لا يوجد خطأ \`EADDRINUSE\` على المنفذ 4173.
2. تأكد أنك تستخدم IPv4 الخاص بكمبيوتر Windows وليس عنوان الراوتر أو \`127.0.0.1\`.
3. تحقق من تشغيل \`http://127.0.0.1:4173/ar/\` على Windows.
4. استخدم \`ipconfig\` للتأكد أن الكمبيوتر والهاتف على Wi-Fi نفسها؛ بعض الشبكات تعزل أجهزة الضيوف (Client Isolation).
5. تحقق من السماح لتطبيق Node.js على **Private networks فقط** في Windows Security → Firewall & network protection.
6. لا تعطل جدار الحماية ولا تفتح منفذاً خارجياً على الإنترنت.

## 8) الإنهاء الآمن
- اضغط Ctrl+C في نافذة الخادم بعد انتهاء الاختبار.
- لم يتم استخدام \`git push\` أو \`git merge\` أو أي أمر نشر.
- مجلد \`out\` محلي ومتجاهَل في Git.
- إذا رغبت في التخلص من النسخة المحلية، يمكنك لاحقاً حذف مجلد \`portfolio-v3-local-test\` بعد حفظ أي ملاحظات خاصة بك.

**ملاحظة:** اختبارات GitHub Actions مستقلة عن التجربة الفعلية لهاتفك. لا نعتبر أداء هاتفك مُثبتاً حتى تنفذ الخطوة السادسة.
