#!/usr/bin/env python3
"""Prüft vorhandene Governance-Dokumente und lokale Markdown-Dateiverweise."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "README.md",
    "AGENTS.md",
    "docs/PRODUCT_SPEC.md",
    "docs/ARCHITECTURE.md",
    "docs/AGENT_ORCHESTRATION.md",
    "docs/ROADMAP.md",
    "docs/ACCEPTANCE_TESTS.md",
    "docs/DECISIONS.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
]
LINK = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")


def main() -> int:
    errors: list[str] = []
    for path in REQUIRED:
        if not (ROOT / path).is_file():
            errors.append(f"Required file missing: {path}")

    for file in (ROOT / "README.md", ROOT / "AGENTS.md", *(ROOT / "docs").glob("*.md")):
        if not file.is_file():
            continue
        content = file.read_text(encoding="utf-8")
        for match in LINK.finditer(content):
            href = match.group(1).split(maxsplit=1)[0].strip("<>")
            if href.startswith(("https://", "http://", "mailto:", "#")):
                continue
            target = unquote(href.split("#", maxsplit=1)[0])
            if not target:
                continue
            resolved = (file.parent / target).resolve()
            if not resolved.is_relative_to(ROOT) or not resolved.exists():
                errors.append(f"{file.relative_to(ROOT)}: missing local link {href}")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print("Governance documents and local Markdown links: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
