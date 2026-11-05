import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { auditStaticLinks } from '../scripts/check-static-links.mjs';

function withSite(files, callback) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-export-v7-'));
  try {
    for (const [file, contents] of Object.entries(files)) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      writeFileSync(join(root, file), contents);
    }
    callback(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('obfuscated JavaScript and file navigation protocols are rejected after URL normalization', () => {
  withSite({ 'index.html': '<a href="java\nscript:alert(1)">Do not run</a><a href="fi\tle:///tmp/secret">File</a><a href="java&#x73;cript&#58;alert(1)">Entity</a><a href="java&Tab;script&colon;alert(1)">Named entities</a><a href="https://example.org">External</a>' }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 4);
    assert.ok(errors.every((error) => /unsafe navigation URL protocol/.test(error.reason)));
  });
});

test('responsive image candidates and video posters are validated', () => {
  withSite({
    'index.html': `<picture><source srcset="/media/ok.webp 1x, /media/missing@2x.webp 2x"><img src="/media/ok.webp" srcset="/media/no.webp 320w, /media/ok.webp 640w"></picture><video poster="/media/no-poster.jpg"><source src="/media/ok.webm"></video>`,
    'media/ok.webp': 'image', 'media/ok.webm': 'video',
  }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 3);
    assert.ok(errors.some((error) => error.value.includes('missing@2x.webp')));
    assert.ok(errors.some((error) => error.value.includes('no.webp')));
    assert.ok(errors.some((error) => error.value.includes('no-poster.jpg')));
  });
});

test('CSS url resources are resolved relative to their stylesheet and missing fonts are reported', () => {
  withSite({
    'index.html': '<link rel="stylesheet" href="/assets/css/app.css">',
    'assets/css/app.css': `/* url(ignored.css) */ @font-face {src: url('../fonts/missing.woff2') format('woff2');} .icon{background:url('../images/good.svg')} .inline{background:url(data:image/svg+xml,%3Csvg%3E)}`,
    'assets/images/good.svg': '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
  }, (root) => {
    const errors = auditStaticLinks(root);
    assert.equal(errors.length, 1);
    assert.match(errors[0].value, /missing\.woff2/);
    assert.equal(errors[0].element, 'css');
  });
});

test('valid CSS, srcset, posters and linked assets do not cause false positives', () => {
  withSite({
    'index.html': '<link rel="stylesheet" href="/css/main.css"><img srcset="/img/hero.webp 1x, /img/hero2.webp 2x" src="/img/hero.webp"><video poster="/img/hero.webp"></video>',
    'css/main.css': '@font-face{src:url("../fonts/ui.woff2")} .x{background:url("../img/hero.webp")}',
    'fonts/ui.woff2': 'font', 'img/hero.webp': 'image', 'img/hero2.webp': 'image',
  }, (root) => assert.deepEqual(auditStaticLinks(root), []));
});

test('a missing HTML export is a failed audit rather than a false success', () => {
  withSite({ 'assets/file.css': 'body{}' }, (root) => {
    assert.throws(() => auditStaticLinks(root), /no HTML files/i);
  });
});

test('data URL responsive candidates are ignored without losing later local candidates', () => {
  withSite({
    'index.html': `<img src="/img/good.webp" srcset="data:image/svg+xml,%3Csvg%3E 1x, /img/good.webp 2x">`,
    'img/good.webp': 'image',
  }, (root) => assert.deepEqual(auditStaticLinks(root), []));
});
