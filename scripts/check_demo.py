#!/usr/bin/env python3
"""Conservative public-demo release guard. Requires separate security review."""
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
allowed = {"index.html", "sw.js", "manifest.webmanifest", "icon.svg", ".nojekyll",
           "README.md", "DEMO_DATA_POLICY.md", "deployment-status.txt",
           "scripts/check_demo.py", ".github/workflows/demo-guard.yml"}
issues = []
for path in root.rglob("*"):
    if not path.is_file() or ".git" in path.parts:
        continue
    rel = path.relative_to(root).as_posix()
    if rel not in allowed:
        issues.append(f"Unexpected file: {rel}")
        continue
    if path.stat().st_size > 200000:
        issues.append(f"Unexpectedly large file: {rel}")
    if rel in {"index.html", "sw.js", "manifest.webmanifest", "icon.svg", ".nojekyll"}:
        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeError:
            issues.append(f"Binary content: {rel}")
            continue
        if rel == "index.html":
            for pattern in ["type=", "<input", "<textarea", "FileReader", "localStorage",
                            "indexedDB", "XMLHttpRequest", "WebSocket", "sendBeacon",
                            "JSON.parse", "fetch("]:
                if pattern.lower() in content.lower():
                    issues.append(f"Unsafe browser input or data capability in {rel}: {pattern}")
            if "ÖFFENTLICHE DEMO – KEINE PRIVATDATEN" not in content:
                issues.append("Missing public-demo warning")
        for pattern in [r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
                        r"gh[pousr]_[A-Za-z0-9_]{20,}",
                        r"github_pat_[A-Za-z0-9_]{20,}",
                        r"sk_live_[A-Za-z0-9]{12,}",
                        r"DE[0-9]{20}"]:
            if re.search(pattern, content):
                issues.append(f"Possible sensitive content in {rel}")
if not (root / "index.html").exists():
    issues.append("Missing index.html")
if issues:
    print("DEMO RELEASE BLOCKED")
    for issue in issues:
        print(" -", issue)
    sys.exit(1)
print("Public demo checks passed. This is not a privacy or security certification.")
