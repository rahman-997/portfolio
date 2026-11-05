import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

test('static Next.js export does not depend on the server-side image optimizer', () => {
  const nextConfig = read('next.config.ts');
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(read('app/work/[slug]/page.tsx'), /import Image from ["']next\/image["']/);
  assert.match(nextConfig, /images:\s*\{\s*unoptimized:\s*true\s*[,}]\s*/);
});

test('production and exported manifest verification follow the same brand color token', () => {
  const brand = JSON.parse(read('app/brand.json'));
  assert.match(brand.background, /^#[a-f\d]{6}$/i);
  assert.match(read('app/portfolio-data.ts'), /THEME_COLOR\s*=\s*brand\.background/);
  assert.match(read('app/manifest.ts'), /theme_color:\s*THEME_COLOR/);
  assert.match(read('app/manifest.ts'), /background_color:\s*THEME_COLOR/);
  for (const script of ['scripts/verify-export.mjs', 'scripts/verify-production.mjs']) {
    assert.match(read(script), /import brand from ["']\.\.\/app\/brand\.json["'] with \{ type: ["']json["'] \}/, script);
    assert.match(read(script), /brand\.background/, script);
    assert.doesNotMatch(read(script), /#07100f/i, `old theme token still used in ${script}`);
  }
});

test('all recruiter-facing detail pages offer keyboard skip navigation', () => {
  for (const path of ['app/resume/page.tsx', 'app/work/[slug]/page.tsx']) {
    const page = read(path);
    assert.match(page, /className=\{styles\.skip\} href="#content"/, path);
    assert.match(page, /id="content"/, path);
  }
  for (const path of ['app/resume/resume.module.css', 'app/work/[slug]/case-study.module.css']) {
    const css = read(path);
    assert.match(css, /\.skip:focus\s*\{/, path);
  }
});

test('404 page adopts the same light editorial brand identity', () => {
  const brand = JSON.parse(read('app/brand.json'));
  const styles = read('app/not-found.module.css');
  assert.ok(styles.includes(`--paper: ${brand.background};`));
  assert.ok(styles.includes(`--blue: ${brand.accent};`));
});
