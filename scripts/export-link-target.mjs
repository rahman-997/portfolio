import { statSync } from "node:fs";
import { extname, join } from "node:path";

function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

// Keep the existing scope: root-relative hrefs only, without fragment checks.
// A directory is not an exported page unless it contains index.html.
export function internalTargetExists(outDir, href) {
  const clean = href.split("#", 1)[0].split("?", 1)[0];
  if (!clean || clean === "/") return isFile(join(outDir, "index.html"));
  if (!clean.startsWith("/")) return true;
  if (clean.startsWith("//")) return true; // protocol-relative external link

  const pathname = clean.replace(/^\/+/, "");
  const candidates = [];
  if (pathname.endsWith("/")) candidates.push(join(outDir, pathname, "index.html"));
  else if (extname(pathname)) candidates.push(join(outDir, pathname));
  else candidates.push(join(outDir, pathname, "index.html"), join(outDir, pathname));
  return candidates.some(isFile);
}
