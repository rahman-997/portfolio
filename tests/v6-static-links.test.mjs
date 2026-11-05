import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { auditStaticLinks } from '../scripts/check-static-links.mjs';

function withSite(files, run) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-link-audit-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      const destination = join(root, name);
      mkdirSync(join(destination, '..'), { recursive: true });
      writeFileSync(destination, content);
    }
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('export audit rejects a missing same-page or cross-page section anchor', () => {
  withSite({
    'index.html': '<main id="main"><a href="#missing">Jump</a><a href="/resume/#missing">Résumé</a></main>',
    'resume/index.html': '<h1 id="experience">Résumé</h1>',
  }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 2);
    assert.ok(errors.every((e) => e.reason.includes('fragment')));
  });
});

test('export audit rejects missing local image, stylesheet, and JS files', () => {
  withSite({
    'index.html': '<img src="/images/broken.webp"><link rel="stylesheet" href="/_next/static/missing.css"><script src="./missing.js"></script>',
  }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 3);
    assert.ok(errors.every((e) => e.reason.includes('target')));
  });
});

test('export audit permits valid relative routes, encoded fragments, external links, and query strings', () => {
  withSite({
    'index.html': '<section id="work"><a href="#work">Work</a><a href="/resume/?print=true#education">CV</a><a href="https://example.com/path">External</a><img src="/assets/cover.webp?ver=2"></section>',
    'resume/index.html': '<h2 id="education">University</h2><a href="../#work">Back</a>',
    'assets/cover.webp': 'binary placeholder',
  }, (root) => assert.deepEqual(auditStaticLinks(root), []));
});

test('export audit rejects script-powered links and follows safe percent-encoded names', () => {
  withSite({
    'index.html': '<a href="javascript:alert(1)">Danger</a><a href="/#case%20study">Study</a><div id="case study"></div>',
  }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 1);
    assert.match(errors[0].reason, /unsafe/);
  });
});

test('production verifier integrates the static link audit', () => {
  const verifier = readFileSync('scripts/verify-export.mjs', 'utf8');
  assert.match(verifier, /auditStaticLinks\(outDir\)/);
  assert.doesNotMatch(verifier, /if \(!clean\.startsWith\("\/"\)\) return true/);
});

test('standalone auditor reports a failing exit code for missing links', async () => {
  const { spawnSync } = await import('node:child_process');
  withSite({ 'index.html': '<a href="/missing/">Broken</a>' }, (root) => {
    const result = spawnSync(process.execPath, ['scripts/check-static-links.mjs', root], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /missing local target/);
  });
});

test('standalone auditor prints a pass summary for a valid HTML export', async () => {
  const { spawnSync } = await import('node:child_process');
  withSite({ 'index.html': '<h1 id="hero">Ready</h1><a href="#hero">Jump</a>' }, (root) => {
    const result = spawnSync(process.execPath, ['scripts/check-static-links.mjs', root], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /1 HTML pages checked/);
  });
});
