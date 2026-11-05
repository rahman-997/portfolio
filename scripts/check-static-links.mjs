/**
 * Verify navigation targets and referenced local assets in a static HTML export.
 * No dependencies or network access required. Intended for the output of `next build`
 * in static-export mode; also exported for focused fixture-based regression tests.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

function allHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? allHtmlFiles(path) : extname(path) === '.html' ? [path] : [];
  });
}

function decodeHtmlEntities(value) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', colon: ':', Tab: '\t', NewLine: '\n' };
  return value.replace(/&([A-Za-z]+);/g, (matched, name) => named[name] ?? matched).replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => {
    const number = code[0].toLowerCase() === 'x' ? Number.parseInt(code.slice(1), 16) : Number.parseInt(code, 10);
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : _;
  });
}

function decode(value) {
  const htmlDecoded = decodeHtmlEntities(value);
  try { return decodeURIComponent(htmlDecoded); } catch { return htmlDecoded; }
}

function srcsetUrls(value) {
  // Follow the HTML srcset URL-token boundary: a comma INSIDE a URL (notably
  // data:image/...,... payloads) is not a separator; a comma after a descriptor
  // or at the end of a URL separates candidates.
  const candidates = [];
  let index = 0;
  const whitespace = /[\t\n\f\r ]/;
  while (index < value.length) {
    while (index < value.length && (whitespace.test(value[index]) || value[index] === ',')) index++;
    if (index >= value.length) break;
    const start = index;
    while (index < value.length && !whitespace.test(value[index])) index++;
    const token = value.slice(start, index);
    const url = token.replace(/,+$/, '');
    if (url && !/^data:/i.test(url)) candidates.push(url);
    if (url.length !== token.length) continue;
    while (index < value.length && value[index] !== ',') index++;
    if (value[index] === ',') index++;
  }
  return candidates;
}

function cssReferences(css) {
  const references = [];
  // Discard comments; image/font references in comments are not requested.
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const match of source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi)) {
    const value = match[1] ?? match[2] ?? match[3];
    if (value && !value.startsWith('#')) references.push({ element: 'css', value });
  }
  // CSS @import also supports a quoted string without url(...).
  for (const match of source.matchAll(/@import\s+(?:"([^"]+)"|'([^']+)')/gi)) {
    references.push({ element: 'css', value: match[1] ?? match[2] });
  }
  return references;
}

function extractAttributes(html) {
  const references = [];
  const tagPattern = /<(a|area|link|img|script|source|video|audio|iframe)\b[^>]*>/gi;
  for (const tag of html.matchAll(tagPattern)) {
    const element = tag[1].toLowerCase();
    const attributes = element === 'a' || element === 'area' ? ['href'] : element === 'link' ? ['href', 'imagesrcset'] : element === 'video' ? ['src', 'poster'] : element === 'img' || element === 'source' ? ['src', 'srcset'] : ['src'];
    for (const attribute of attributes) {
      const match = new RegExp(`(?:^|\\s)${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag[0]);
      if (match) {
        const value = match[1] ?? match[2];
        if (attribute === 'srcset' || attribute === 'imagesrcset') {
          for (const candidate of srcsetUrls(value)) references.push({ element, attribute, value: candidate });
        } else {
          references.push({ element, attribute, value });
        }
      }
    }
  }
  return references;
}

function idsIn(html) {
  const ids = new Set();
  for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
    for (const attribute of ['id', 'name']) {
      if (attribute === 'name' && !/^<a\b/i.test(tag[0])) continue;
      const match = new RegExp(`(?:^|\\s)${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag[0]);
      if (match) ids.add(decode(match[1] ?? match[2]));
    }
  }
  return ids;
}

function targetPath(root, pathname) {
  const target = resolve(root, `.${pathname}`);
  if (target !== root && !target.startsWith(root + sep)) return null;
  const candidates = [target];
  if (pathname.endsWith('/') || !extname(pathname)) {
    candidates.push(join(target, 'index.html'));
  }
  if (!pathname.endsWith('/') && !extname(pathname)) candidates.push(target + '.html');
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** @returns {{file:string, element:string, value:string, reason:string}[]} */
export function auditStaticLinks(outDir) {
  const root = resolve(outDir);
  if (!existsSync(root)) throw new Error(`Static export directory does not exist: ${root}`);
  const htmlFiles = allHtmlFiles(root);
  if (!htmlFiles.length) throw new Error(`Static export has no HTML files: ${root}`);
  const errors = [];
  const htmlCache = new Map();
  const getHtml = (file) => {
    if (!htmlCache.has(file)) htmlCache.set(file, readFileSync(file, 'utf8'));
    return htmlCache.get(file);
  };

  const exportedFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? exportedFiles(path) : [path];
  });
  const files = exportedFiles(root);
  const cssFiles = files.filter((file) => extname(file).toLowerCase() === '.css');
  const sources = [
    ...htmlFiles.map((file) => ({ file, references: extractAttributes(getHtml(file)) })),
    ...cssFiles.map((file) => ({ file, references: cssReferences(readFileSync(file, 'utf8')) })),
  ];

  for (const { file: page, references } of sources) {
    const pageUrl = new URL(relative(root, page).replace(/\\/g, '/'), 'https://portfolio.local/');
    for (const { element, value } of references) {
      if (!value) continue;
      const failure = (reason) => errors.push({ file: relative(root, page), element, value, reason });

      let url;
      try { url = new URL(decodeHtmlEntities(value), pageUrl); }
      catch { failure('invalid URL'); continue; }
      // WHATWG URL parsing strips tabs/newlines from scheme names. Checking
      // the parsed scheme prevents `java\nscript:` bypassing the raw regex.
      if (element === 'a' || element === 'area') {
        if (!['https:', 'http:', 'mailto:', 'tel:', 'sms:'].includes(url.protocol)) {
          failure('unsafe navigation URL protocol');
          continue;
        }
      }
      if (['mailto:', 'tel:', 'sms:', 'blob:', 'data:'].includes(url.protocol)) continue;
      if (url.origin !== 'https://portfolio.local') continue;
      const path = decode(url.pathname);
      const target = targetPath(root, path);
      if (!target) { failure('missing local target'); continue; }
      if (url.hash && extname(target) === '.html') {
        const fragment = decode(url.hash.substring(1));
        if (fragment && !idsIn(getHtml(target)).has(fragment)) {
          failure(`missing fragment #${fragment} in ${relative(root, target)}`);
        }
      }
    }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = process.argv[2] ?? join(process.cwd(), 'out');
  const errors = auditStaticLinks(output);
  if (errors.length) {
    for (const { file, element, value, reason } of errors) {
      console.error(`${file} <${element}> ${JSON.stringify(value)}: ${reason}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`Static link audit passed: ${allHtmlFiles(resolve(output)).length} HTML pages checked.`);
  }
}
