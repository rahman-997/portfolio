#!/usr/bin/env python3
"""Read-only delivery observation of the existing public portfolio, not the candidate."""
import gzip
import hashlib
import http.client
import json
import re
import ssl
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import HTTPRedirectHandler, HTTPSHandler, ProxyHandler, Request, build_opener

HOST = "abdulrahman-hajar-portfolio.onrender.com"
LIMIT = 4 * 1024 * 1024
ASSET = re.compile(r'(?:src|href)="(/_next/static/[A-Za-z0-9_./-]+\.(?:js|css))"')

def select_assets(html):
    paths = list(dict.fromkeys(ASSET.findall(html)))
    paths = [p for p in paths if not any(part in ("..", ".") for part in p.split("/"))]
    return [p for suffix in (".js", ".css") for p in [next((v for v in paths if v.endswith(suffix)), None)] if p]

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def tls_context():
    context = ssl.create_default_context()
    context.minimum_version = ssl.TLSVersion.TLSv1_2
    return context


def request(path, encoding):
    if path != "/" and (not re.fullmatch(r"/_next/static/[A-Za-z0-9_./-]+\.(?:js|css)", path)
                         or any(part in ("..", ".") for part in path.split("/"))):
        raise ValueError("Only the fixed public homepage and same-origin static assets are allowed")
    if encoding not in ("identity", "gzip"):
        raise ValueError("Unsupported requested encoding")
    opener = build_opener(ProxyHandler({}), HTTPSHandler(context=tls_context()), NoRedirect())
    req = Request("https://" + HOST + path, method="GET",
                  headers={"Accept-Encoding": encoding, "User-Agent": "portfolio-delivery-check/1.0"})
    try:
        response = opener.open(req, timeout=12)
    except HTTPError as exc:
        # Do not follow redirects or download error pages.
        status = exc.code
        exc.close()
        return {"status": status, "encoding": None, "wireBodyBytes": 0,
                "contentType": None, "vary": None, "cacheControl": None,
                "decodedSha256": None}, None
    with response:
        raw = response.read(LIMIT + 1)
        if len(raw) > LIMIT:
            raise ValueError("Response exceeded bounded payload limit")
        coding = (response.headers.get("Content-Encoding") or "identity").lower()
        if coding == "gzip":
            import io
            with gzip.GzipFile(fileobj=io.BytesIO(raw)) as stream:
                decoded = stream.read(LIMIT + 1)
        elif coding == "identity":
            decoded = raw
        else:
            decoded = None
        if decoded is not None and len(decoded) > LIMIT:
            raise ValueError("Decoded payload exceeded limit")
        return {
            "status": response.status, "encoding": coding, "wireBodyBytes": len(raw),
            "contentType": response.headers.get("Content-Type"),
            "vary": response.headers.get("Vary"), "cacheControl": response.headers.get("Cache-Control"),
            "decodedSha256": hashlib.sha256(decoded).hexdigest() if decoded is not None else None,
        }, decoded

def compare(identity, compressed):
    if identity["status"] != 200 or compressed["status"] != 200:
        return "inconclusive-http"
    if not identity["decodedSha256"] or not compressed["decodedSha256"]:
        return "inconclusive-encoding"
    if identity["decodedSha256"] != compressed["decodedSha256"]:
        return "inconclusive-payload-changed"
    return "gzip-confirmed" if compressed["encoding"] == "gzip" else "no-gzip-observed"

def main():
    report = {"checkedAt":datetime.now(timezone.utc).isoformat(),"host":HOST,
              "scope":"Existing published revision only; GET, no credentials, no redirects, no stored bodies.","resources":[]}
    try:
        first, html = request("/", "identity")
        paths = ["/"] + (select_assets(html.decode("utf-8", errors="replace")) if first["status"] == 200 and html else [])
        for path in paths:
            try:
                a, _ = request(path, "identity") if path != "/" else (first, html)
                b, _ = request(path, "gzip")
                outcome = compare(a,b)
                report["resources"].append({"path":path,"identity":a,"gzipRequest":b,"outcome":outcome})
                print("Published delivery:", path, outcome, a["wireBodyBytes"], "->", b["wireBodyBytes"], flush=True)
            except (OSError, ValueError, http.client.HTTPException) as exc:
                report["resources"].append({"path":path,"outcome":"inconclusive","reason":type(exc).__name__})
        if html:
            match = re.search(rb'data-deploy-commit="([a-f0-9]{40})"',html)
            report["publishedCommit"] = match.group(1).decode() if match else None
    except (OSError, ValueError, http.client.HTTPException) as exc:
        report["reason"] = type(exc).__name__
    output = Path(sys.argv[1])
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
    print("Published delivery report:", output, flush=True)

if __name__ == "__main__":
    main()
