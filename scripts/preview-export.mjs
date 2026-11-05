/**
 * Serve the already-built Next.js static export locally (no npm dependencies).
 * This is a development / QA server bound to loopback, not a public production host.
 * Usage: npm run preview:export -- --port 4173 --dir out
 */
import { createServer } from 'node:http';
import { createReadStream, lstatSync, existsSync } from 'node:fs';
import { resolve, join, relative, sep, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
};

function reject(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(message);
}

function safeFile(root, rawUrl) {
  // Inspect the raw path before WHATWG URL normalizes dot segments.
  const rawPath = rawUrl.split(/[?#]/, 1)[0];
  if (!rawPath.startsWith('/') || /%(?:2f|5c)/i.test(rawPath)) return null;
  let path;
  try { path = decodeURIComponent(rawPath); } catch { return null; }
  if (path.includes('\\') || path.includes('\0') || /[\x00-\x1f\x7f]/.test(path)) return null;
  const segments = path.split('/');
  if (segments.some(part => part === '.' || part === '..')) return null;
  const relativePath = path.slice(1);
  const absolute = resolve(root, relativePath);
  const rel = relative(root, absolute);
  if (rel === '..' || rel.startsWith(`..${sep}`) || rel.startsWith(sep)) return null;

  const candidates = path.endsWith('/') || path === '/'
    ? [join(absolute, 'index.html')]
    : [absolute, join(absolute, 'index.html')];
  for (const candidate of candidates) {
    const relativeCandidate = relative(root, candidate);
    if (relativeCandidate === '..' || relativeCandidate.startsWith(`..${sep}`)) return null;
    const components = relativeCandidate.split(sep);
    let current = root;
    let safe = true;
    // Refuse symlinks throughout the path, not only at the final file.
    for (const part of components) {
      current = join(current, part);
      try { if (lstatSync(current).isSymbolicLink()) { safe = false; break; } }
      catch { safe = false; break; }
    }
    if (!safe) continue;
    try { if (lstatSync(candidate).isFile()) return candidate; } catch { /* try next */ }
  }
  return undefined;
}

export function createExportServer(directory) {
  const root = resolve(directory);
  return createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      return reject(res, 405, 'Method not allowed');
    }
    const file = safeFile(root, req.url ?? '/');
    if (file === null) return reject(res, 400, 'Invalid path');
    if (file === undefined) return reject(res, 404, 'Not found');
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(file);
    stream.on('error', () => { res.destroy(); });
    stream.pipe(res);
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let dir = 'out';
  let port = 4173;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--dir' && process.argv[i + 1]) dir = process.argv[++i];
    else if (process.argv[i] === '--port' && process.argv[i + 1]) port = Number(process.argv[++i]);
    else { console.error('Usage: node scripts/preview-export.mjs [--dir out] [--port 4173]'); process.exit(2); }
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) { console.error('Invalid port'); process.exit(2); }
  if (!existsSync(join(resolve(dir), 'index.html'))) {
    console.error(`Missing ${join(resolve(dir), 'index.html')}. Run npm ci && npm run build first.`);
    process.exit(1);
  }
  const server = createExportServer(dir);
  server.listen(port, '127.0.0.1', () => console.log(`HAJAR export preview: http://127.0.0.1:${port}/ (directory: ${resolve(dir)})`));
}
