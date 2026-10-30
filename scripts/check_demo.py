#!/usr/bin/env python3
"""Fail-closed checks for the PUBLIC, synthetic-only PWA. Not a substitute for review."""
from pathlib import Path
import re, sys

root=Path(__file__).resolve().parents[1]
site_files={"index.html","sw.js","manifest.webmanifest","icon.svg",".nojekyll"}
allowed_extra={"README.md","DEMO_DATA_POLICY.md","deployment-status.txt","scripts/check_demo.py",".github/workflows/demo-guard.yml"}
expected=site_files|allowed_extra
issues=[]
for p in root.rglob("*"):
    if not p.is_file() or ".git" in p.parts: continue
    rel=p.relative_to(root).as_posix()
    if rel not in expected:
        issues.append(f"Unexpected file: {rel} (manual approval required)")
        continue
    if p.stat().st_size>200_000: issues.append(f"Oversized file: {rel}")
    if rel in site_files:
        try: content=p.read_text(encoding="utf-8")
        except UnicodeError: issues.append(f"Nontext file: {rel}");continue
        # Do not allow client-side private file entry or network APIs in public demo.
        if rel=="index.html":
            for pattern in [r'type\\s*=\\s*["\\']file',r'<textarea\\b',r'<input\\b(?![^>]*type\\s*=\\s*["\\'](?:button|hidden))',
                            r'FileReader\\b',r'localStorage\\b',r'indexedDB\\b',r'fetch\\s*\\(',r'XMLHttpRequest\\b',
                            r'WebSocket\\b',r'sendBeacon\\b',r'JSON\\.parse\\s*\\(']:
                if re.search(pattern,content,re.I): issues.append(f"Disallowed input/data capability in {rel}: {pattern}")
            if "ÖFFENTLICHE DEMO – KEINE PRIVATDATEN" not in content:
                issues.append("Missing public-demo warning")
        for pattern in [r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'gh[pousr]_[A-Za-z0-9_]{20,}',r'github_pat_[A-Za-z0-9_]{20,}',r'(?i)sk_live_[A-Za-z0-9]{12,}',r'(?i)iban\\s*[:=]\\s*["\\']?DE[0-9]{20}']:
            if re.search(pattern,content):issues.append(f"Potential secret/account information in {rel}")
if not (root/"index.html").exists():issues.append("Missing index.html")
if issues:
    print("DEMO RELEASE BLOCKED:")
    for item in issues:print(" -",item)
    sys.exit(1)
print("Public demo checks passed. Human review still required.")
