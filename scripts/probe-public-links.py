#!/usr/bin/env python3
"""Observe public demo availability without changing or signing in to any service."""
import concurrent.futures
import json
from pathlib import Path
import http.client
from urllib.parse import urlsplit

LINKS = ["https://abdulrahman-hajar-portfolio.onrender.com/",
         "https://eventify-web.onrender.com/", "https://bookbookhaven-free.onrender.com/",
         "https://fitflow-gym.onrender.com/", "https://venues-api-rahman.onrender.com/health"]


def probe(url):
    target = urlsplit(url)
    allowed_hosts = {urlsplit(link).hostname for link in LINKS}
    if target.scheme != "https" or target.hostname not in allowed_hosts or target.username or target.password:
        raise ValueError("Only the fixed public HTTPS demo hosts may be probed")
    connection = http.client.HTTPSConnection(target.hostname, timeout=40)
    try:
        # Do not follow redirects or accept arbitrary hosts, local files or URL schemes.
        connection.request("GET", target.path or "/", headers={"User-Agent":"Portfolio-Release-Link-Check/1.0"})
        response = connection.getresponse()
        response.read(2048)
        return {"url":url,"status":response.status}
    except Exception as exc:
        return {"url":url,"status":None,"error":str(exc)[:250]}
    finally:
        connection.close()


with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    report = list(pool.map(probe, LINKS))
target=Path("atlas-qa-artifacts/public-links.json")
target.parent.mkdir(exist_ok=True)
target.write_text(json.dumps(report,indent=2)+"\n")
print(json.dumps(report,indent=2),flush=True)
