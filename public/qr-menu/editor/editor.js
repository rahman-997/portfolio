'use strict';
(async () => {
  const status = document.getElementById('status');
  const form = document.getElementById('editor');
  let source, cfg;
  function field(parent, label, value, update, type = 'text') {
    const wrapper = document.createElement('label');
    wrapper.append(document.createTextNode(label));
    const input = document.createElement('input');
    input.type = type;
    if (type === 'checkbox') input.checked = value;
    else input.value = value;
    if (type === 'tel') { input.pattern = '[1-9][0-9]{6,14}'; input.maxLength = 15; }
    if (type === 'number') { input.min = '0'; input.max = '1000000'; input.step = '0.01'; }
    else if (type === 'text') { input.required = true; input.maxLength = 150; }
    input.addEventListener('input', () => update(type === 'checkbox' ? input.checked : type === 'number' ? Number(input.value) : input.value));
    wrapper.append(input); parent.append(wrapper);
  }
  try {
    const response = await fetch('../');
    if (!response.ok) throw new Error('load');
    source = await response.text();
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const script = [...doc.scripts].find(s => s.textContent.includes('window.MENU_CONFIG ='));
    // Parse the bundled configuration in an isolated same-origin frame; no imported user script is accepted.
    const frame = document.createElement('iframe'); frame.hidden = true;
    await new Promise((resolve, reject) => { frame.onload = resolve; frame.onerror = reject; frame.src = '../'; document.body.append(frame); });
    cfg = JSON.parse(JSON.stringify(frame.contentWindow.MENU_CONFIG)); frame.remove();
    if (!script || !Array.isArray(cfg.products)) throw new Error('config');
    const restaurant = document.getElementById('restaurant');
    for (const [lang, label] of [['ar','اسم المطعم بالعربي'],['tr','الاسم بالتركي'],['en','الاسم بالإنكليزي']]) field(restaurant,label,cfg.restaurant.name[lang],v => cfg.restaurant.name[lang]=v);
    field(restaurant,'واتساب: رقم دولي بالأرقام فقط، أو اتركه فارغاً للديمو',cfg.restaurant.whatsapp,v=>cfg.restaurant.whatsapp=v,'tel');
    field(restaurant,'الموقع',cfg.restaurant.location,v=>cfg.restaurant.location=v);
    field(restaurant,'ساعات العمل',cfg.restaurant.openHours,v=>cfg.restaurant.openHours=v);
    const products = document.getElementById('products');
    for (const product of cfg.products) {
      const card = document.createElement('article'); const fields = document.createElement('div'); fields.className='fields'; card.append(fields);
      for (const [lang,label] of [['ar','الاسم بالعربي'],['tr','الاسم بالتركي'],['en','الاسم بالإنكليزي']]) field(fields,label,product.name[lang],v=>product.name[lang]=v);
      field(fields,'السعر بالليرة',product.price,v=>product.price=v,'number');
      field(fields,'متوفر',product.available!==false,v=>product.available=v,'checkbox'); products.append(card);
    }
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      if(cfg.products.some(p=>!Number.isFinite(p.price)||p.price<0||p.price>1000000)){status.textContent='راجع الأسعار.';return;}
      const config = 'window.MENU_CONFIG = '+JSON.stringify(cfg).replace(/</g,'\\u003c')+';';
      const output = source.replace(script.textContent, () => '\n'+config+'\n');
      const url=URL.createObjectURL(new Blob([output],{type:'text/html;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='restaurant-menu.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      status.textContent='تم تجهيز الملف. افتحه للمراجعة قبل النشر.';
    });
  } catch { status.textContent='تعذر تحميل المنيو. أعد تحميل الصفحة.'; form.querySelector('button').disabled=true; }
})();
