import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('systems atlas uses approved two-fold logo and no legacy AH monogram', () => {
  const atlas = read('app/ai-atlas.tsx');
  assert.match(atlas, /import BrandMark from [\"']\.\/brand-mark[\"']/);
  assert.match(atlas, /HAJAR \/ SYSTEMS ATLAS/);
  assert.match(atlas, /coreInner[^>]*><BrandMark size=\{\d+\}/);
  assert.doesNotMatch(atlas, /<span>AH<\/span>|AH \/ SYSTEMS ATLAS/);
  assert.match(read('scripts/verify-export.mjs'), /HAJAR \/ SYSTEMS ATLAS/);
});

test('HAJAR palette replaces obsolete violet callouts in public pages', () => {
  const globals=read('app/globals.css');
  const home=read('app/home.module.css');
  const caseStyles=read('app/work/[slug]/case-study.module.css');
  assert.match(globals, /rgba\(201,\s*167,\s*125,\s*0\.2\)/);
  for (const [name,source] of [['home',home], ['case study',caseStyles]]) {
    for (const obsolete of ['#3931b9','#827cf1','#dad8ff','#a39bff']) {
      assert.ok(!source.toLowerCase().includes(obsolete),`${name} includes old violet ${obsolete}`);
    }
  }
  assert.match(home,/\.resumeCallout \.primaryAction\s*\{[^}]*color:\s*#0E1416/);
});

test('current publication metadata and verified social routes remain aligned',()=>{
  const data=read('app/portfolio-data.ts');
  assert.match(data,/PORTFOLIO_UPDATED_AT\s*=\s*"2026-10-30/);
  assert.match(data,/https:\/\/www\.instagram\.com\/eng\.rahman97\//);
  assert.match(read('app/layout.tsx'),/PROFILE_LINKS\.instagram/);
});
