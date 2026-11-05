import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), 'utf8');
const home = read('app/page.tsx');
const homeCSS = read('app/home.module.css');
const globalCSS = read('app/globals.css');
const atlasCSS = read('app/ai-atlas.module.css');

// Regression: on tablet/mobile the original navigation disappeared entirely.
test('small-screen navigation stays discoverable with accessible disclosure', () => {
  assert.match(home, /<MobileNav \/>/);
  const mobile = read('app/mobile-nav.tsx');
  assert.match(mobile, /<details className=\{styles\.mobileMenu\}/);
  assert.match(mobile, /<summary[^>]*aria-label="Navigation menu"/);
  assert.match(mobile, /event\.key === "Escape"/);
  assert.match(mobile, /menuRef\.current\.open = false/);
  assert.match(homeCSS, /\.mobileMenu\s*\{/);
  assert.match(homeCSS, /@media\s*\(max-width:\s*1080px\)[\s\S]*?\.mobileMenu\s*\{\s*display:\s*block/);
  assert.match(home, /href="#ai-lab"/);
  assert.match(home, /href="#contact"/);
});

test('HAJAR editorial redesign uses consistent metadata and section tokens', () => {
  const brand = JSON.parse(read('app/brand.json'));
  assert.equal(brand.background, "#F5F1E9");
  assert.match(read('app/portfolio-data.ts'), /THEME_COLOR = brand\.background/);
  assert.match(read('app/layout.tsx'), /colorScheme: "light"/);
  assert.match(globalCSS, /--page-bg:\s*#F5F1E9/);
  assert.match(homeCSS, /--accent:\s*#745131/);
  assert.match(atlasCSS, /\.section\s*\{[^}]*color:\s*#0E1416/s);
});

test('homepage sections have working nav anchors and assets', () => {
  const sections = home + read("app/ai-atlas.tsx");
  for (const anchor of ['work', 'ai-lab', 'systems', 'about', 'contact']) {
    assert.match(sections, new RegExp(`id="${anchor}"`));
  }
  const data = read('app/portfolio-data.ts');
  for (const asset of data.matchAll(/cover:\s*"(\/projects\/[^\"]+)"/g)) {
    assert.ok(existsSync(join(root, 'public', asset[1])), `${asset[1]} missing`);
  }
});
