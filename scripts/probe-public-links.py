#!/usr/bin/env python3
"""Observe public demo availability without changing or signing in to any service."""
import concurrent.futures
import json
from pathlib import Path
import urllib.error
import urllib.request

LINKS = ["https://abdulrahman-hajar-portfolio.onrender.com/",
         "https://eventify-web.onrender.com/", "https://bookbookhaven-free.onrender.com/",
         "https://fitflow-gym.onrender.com/", "https://venues-api-rahman.onrender.com/health"]


def probe(url):
    request = urllib.request.Request(url, headers={"User-Agent":"Portfolio-Release-Link-Check/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=40) as response:
            response.read(2048)
            return {"url":url,"status":response.status,"finalUrl":response.url}
    except urllib.error.HTTPError as exc:
        return {"url":url,"status":exc.code}
    except Exception as exc:
        return {"url":url,"status":None,"error":str(exc)[:250]}


with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    report = list(pool.map(probe, LINKS))
target=Path("atlas-qa-artifacts/public-links.json")
target.parent.mkdir(exist_ok=True)
target.write_text(json.dumps(report,indent=2)+"\n")
print(json.dumps(report,indent=2),flush=True)
