---
name: camoufox
description: Anti-detection browser automation via Camoufox (Firefox fork) REST API. Use when you need to browse sites that block bots, scrape content, or automate web interactions with fingerprint spoofing.
version: 1.0.0
metadata:
  hermes:
    tags: [browser, anti-detect, automation, scraping]
---

# Camoufox Anti-Detect Browser

Camoufox runs on Windows (localhost:9377). From WSL, use the Windows host IP.

## Connection (WSL)

```python
import subprocess
result = subprocess.run(["ip", "route", "show", "default"], capture_output=True, text=True)
HOST = result.stdout.split()[2]  # e.g. 172.31.96.1
PORT = 9377
```

## Core Operations (via REST API)

```python
import subprocess, json

def camoufox(method, path, data=None):
    cmd = ["curl", "-s", "-X", method, f"http://{HOST}:{PORT}{path}"]
    if data:
        cmd += ["-H", "Content-Type: application/json", "-d", json.dumps(data)]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    return json.loads(result.stdout)

# Create tab
tab = camoufox("POST", "/tabs", {"userId": "hermes", "sessionKey": "conv1", "url": "https://example.com"})
TAB_ID = tab["tabId"]

# Snapshot
snap = camoufox("GET", f"/tabs/{TAB_ID}/snapshot?userId=hermes")
print(snap["snapshot"])

# Navigate with search macro
camoufox("POST", f"/tabs/{TAB_ID}/navigate", {
    "userId": "hermes",
    "macro": "@google_search",
    "query": "your search"
})
```

## Search Macros

@google_search, @youtube_search, @amazon_search, @reddit_search, @wikipedia_search, @linkedin_search, and more.
