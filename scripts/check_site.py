#!/usr/bin/env python3
"""Validate the static project hub's data and local HTML references."""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PageInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.local_assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for attribute in ("src", "href"):
            value = attrs.get(attribute, "")
            if not value or value.startswith(("#", "/", "//")):
                continue
            if re.match(r"^[a-z][a-z0-9+.-]*:", value, re.I):
                continue
            self.local_assets.append(value.split("?", 1)[0].split("#", 1)[0])


def fail(message):
    print("ERROR:", message)
    sys.exit(1)


def main():
    profile_path = ROOT / "project-profiles.json"
    try:
        profiles = json.loads(profile_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        fail(f"project-profiles.json is not valid JSON: {error}")

    if not isinstance(profiles, dict) or not profiles:
        fail("project-profiles.json must contain a non-empty object.")

    required = ("purpose", "technologies", "difficulty", "setup")
    for name, profile in profiles.items():
        if not isinstance(name, str) or not name.strip():
            fail("Every project profile must have a non-empty repository name.")
        if not isinstance(profile, dict):
            fail(f"Profile '{name}' must be an object.")
        for field in required:
            if field not in profile:
                fail(f"Profile '{name}' is missing '{field}'.")
        for field in ("purpose", "difficulty", "setup"):
            if not isinstance(profile[field], str) or not profile[field].strip():
                fail(f"Profile '{name}' field '{field}' must be a non-empty string.")
        technologies = profile["technologies"]
        if not isinstance(technologies, list) or not technologies:
            fail(f"Profile '{name}' technologies must be a non-empty list.")
        if not all(isinstance(item, str) and item.strip() for item in technologies):
            fail(f"Profile '{name}' technologies must contain non-empty strings.")

    page = ROOT / "index.html"
    inspector = PageInspector()
    try:
        inspector.feed(page.read_text(encoding="utf-8"))
    except OSError as error:
        fail(f"Could not read index.html: {error}")

    for asset in inspector.local_assets:
        if not (ROOT / asset).is_file():
            fail(f"Local page asset does not exist: {asset}")

    app_source = (ROOT / "app.js").read_text(encoding="utf-8")
    selectors = set(re.findall(r'querySelector\(["\']#([\w-]+)["\']\)', app_source))
    missing_ids = sorted(selectors - inspector.ids)
    if missing_ids:
        fail("JavaScript refers to missing HTML IDs: " + ", ".join(missing_ids))

    print(f"Validated {len(profiles)} project profiles.")
    print(f"Validated {len(inspector.local_assets)} local HTML asset references.")
    print(f"Validated {len(selectors)} JavaScript-to-HTML ID references.")
    print("Static site checks passed.")


if __name__ == "__main__":
    main()
