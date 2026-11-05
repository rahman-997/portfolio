import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=(relative)=>readFileSync(path.join(root,relative),'utf8');

test('HAJAR approved symbol is shipped as a reusable public brand asset',()=>{
  const svg=read('public/brand/hajar-mark.svg');
  assert.match(svg, /viewBox="0 0 512 512"/);
  assert.match(svg, /C151|M151/);
  assert.doesNotMatch(svg, /<text[ >]/i);
  assert.ok(existsSync(path.join(root,'app/brand-mark.tsx')));
  assert.match(read('app/brand-mark.tsx'),/\/brand\/hajar-mark\.svg/);
});

test('personal branding appears across the homepage, case studies, and resume',()=>{
  const paths=['app/page.tsx','app/resume/page.tsx','app/work/[slug]/page.tsx'];
  for(const p of paths) {
    const source=read(p);
    assert.match(source, /BrandMark/ ,`${p} missing HAJAR mark`);
    assert.doesNotMatch(source, />AH<|AH \/ FIELD NOTES/ ,`${p} uses obsolete AH badge`);
  }
  assert.match(read('app/page.tsx'),/ABSTRACT SIGNATURE/);
});

test('social identity palette is used consistently in application and metadata',()=>{
  const brand=JSON.parse(read('app/brand.json'));
  assert.equal(brand.background,'#F5F1E9');
  assert.equal(brand.ink,'#0E1416');
  assert.equal(brand.champagne,'#C9A77D');
  assert.match(read('app/globals.css'),/--page-bg:\s*#F5F1E9/);
  assert.match(read('app/home.module.css'),/--accent:\s*#745131/);
  assert.match(read('app/layout.tsx'),/HAJAR \|/);
});

test('app icons are generated and new portfolio does not expose social planning materials',()=>{
  for(const p of ['public/favicon.svg','public/icons/icon-192.png','public/icons/icon-512.png','public/icons/icon-maskable-512.png','public/icons/apple-touch-icon.png']) assert.ok(existsSync(path.join(root,p)),p);
  assert.match(read('public/favicon.svg'),/hajar|HAJAR/i);
  assert.ok(!existsSync(path.join(root,'public/Instagram_Publishing_Plan')));
  assert.ok(!existsSync(path.join(root,'public/HAJAR_Instagram_Planning_2026_11.ics')));
});
