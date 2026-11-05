import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const home = read('app/page.tsx');
const mobileNav = read('app/mobile-nav.tsx');
const css = read('app/home.module.css');

test('new capabilities, process and FAQ sections have unique navigation targets', () => {
  for (const id of ['expertise', 'process', 'faq']) {
    assert.equal((home.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1, `one #${id} section expected`);
    assert.match(home, new RegExp(`href="#${id}"`), `desktop link for ${id}`);
    assert.match(mobileNav, new RegExp(`href="#${id}"`), `mobile link for ${id}`);
  }
});

test('capability panels have distinct goals and working project links', () => {
  assert.match(home, /Product interfaces/);
  assert.match(home, /Backend & platforms/);
  assert.match(home, /Automation & AI/);
  assert.match(home, /capabilities\.map\(/);
  assert.match(home, /href=\{capability\.href\}/);
});

test('process presents four distinct stages without asserting unsupported client outcomes', () => {
  for (const step of ['Discover', 'Architect', 'Build', 'Verify & ship']) {
    assert.ok(home.includes(step), `missing ${step} step`);
  }
  assert.match(home, /processSteps\.map\(/);
  assert.doesNotMatch(home, /\b(100% client satisfaction|\d+ satisfied clients|guaranteed ROI)\b/i);
});

test('FAQ uses accessible native disclosure with text answers and working destinations', () => {
  assert.match(home, /faqs\.map\(/);
  assert.match(home, /<details className=\{styles\.faqItem\}/);
  assert.match(home, /<summary>/);
  assert.match(home, /<p>\{faq\.answer\}<\/p>/);
  assert.match(home, /href=\{PROFILE_LINKS\.linkedin\}/);
});

test('responsive sections include defined layout and mobile fallbacks', () => {
  for (const name of ['expertise', 'capabilityGrid', 'process', 'processGrid', 'faq', 'faqItem']) {
    assert.match(css, new RegExp(`\\.${name}\\s*\\{`), `missing .${name}`);
  }
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.capabilityGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)[\s\S]*?\.processGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /\.faqItem\s+summary:focus-visible/);
});
