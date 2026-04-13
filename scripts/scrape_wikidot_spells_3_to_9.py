#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scrape D&D 5e spells (levels 3-9) from:
- https://dnd5e.wikidot.com/spells
- https://dnd2024.wikidot.com/spell:all  (preferred when duplicates exist)

Outputs a semicolon-separated CSV in (roughly) the same format as your existing file:
level;name;level_school;(casting time);range;components;duration;description;classes;

Notes
- This script intentionally outputs ENGLISH text by default.
- The dnd2024 wiki sometimes blocks/redirects depending on region/network; the script will fall back to dnd5e entries if 2024 can't be reached.
- Be polite: keep a small delay between requests.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import re
import time
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional, Tuple, Dict, List

import requests
from bs4 import BeautifulSoup
from bs4.element import Tag


DND5E_BASE = "https://dnd5e.wikidot.com"
DND5E_SPELLS_INDEX = f"{DND5E_BASE}/spells"

DND2024_BASE = "https://dnd2024.wikidot.com"
DND2024_SPELLS_INDEX = f"{DND2024_BASE}/spell:all"

UA_MARKER_RE = re.compile(r"\s*\(UA\)\s*$", re.IGNORECASE)
FOOTNOTE_RE = re.compile(r"\^\{[^}]+\}")  # e.g. ^{R} ^{D} etc.
HIGHER_LEVEL_RE = re.compile(r"^(At Higher Levels|Using a Higher-Level Spell Slot)\.\s*(.*)$", re.IGNORECASE)

KNOWN_CLASS_NAMES = {
    "Artificer",
    "Arcane Trickster",
    "Bard",
    "Cleric",
    "Druid",
    "Eldritch Knight",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Warlock",
    "Wizard",
}


@dataclass
class Spell:
    level: int
    name: str
    level_school: str
    casting_time: str
    range_: str
    components: str
    duration: str
    description_html: str
    classes_csv: str
    source_url: str = ""


def _norm_name(name: str) -> str:
    name = name.strip().lower()
    name = UA_MARKER_RE.sub("", name)
    name = name.replace("’", "'")
    name = re.sub(r"[^a-z0-9]+", "", name)
    return name


def _clean_cell(text: str) -> str:
    text = text.strip()
    text = FOOTNOTE_RE.sub("", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def _cache_path(cache_dir: Path, url: str) -> Path:
    h = hashlib.sha256(url.encode("utf-8")).hexdigest()[:24]
    return cache_dir / f"{h}.html"


def fetch_html(url: str, *, session: requests.Session, cache_dir: Optional[Path], timeout: int = 30) -> str:
    local_path: Optional[Path] = None
    if url.startswith("file://"):
        local_path = Path(url[7:])
    else:
        p = Path(url)
        if p.exists():
            local_path = p

    if local_path is not None:
        return local_path.read_text(encoding="utf-8", errors="replace")

    if cache_dir:
        cache_dir.mkdir(parents=True, exist_ok=True)
        p = _cache_path(cache_dir, url)
        if p.exists():
            return p.read_text(encoding="utf-8", errors="replace")

    r = session.get(url, timeout=timeout, headers={"User-Agent": "Mozilla/5.0 (compatible; SpellScraper/1.0)"})
    r.raise_for_status()
    html = r.text

    if cache_dir:
        p = _cache_path(cache_dir, url)
        p.write_text(html, encoding="utf-8", errors="replace")
    return html


LEVEL_LINE_RE = re.compile(
    r"(?i)^(?:(?P<ord>\d+)(?:st|nd|rd|th)?(?:\s*-\s*level|\s+level)?|level\s+(?P<ord2>\d+))\s+(?P<school>[a-z]+)$"
)
LEVEL_LINE_RE2 = re.compile(
    r"(?i)^(?P<school>[a-z]+)\s+cantrip$|^cantrip\s+(?P<school2>[a-z]+)$"
)


def _parse_level_school(texts: List[str]) -> Tuple[Optional[int], Optional[str], bool, List[str]]:
    """
    Returns (level, school, ritual, classes_from_header)
    """
    for raw in texts:
        text = _clean_cell(raw)
        if not text:
            continue

        ritual = bool(re.search(r"\britual\b", text, re.IGNORECASE))
        paren_groups = re.findall(r"\(([^)]+)\)", text)
        classes_from_header: List[str] = []
        for group in paren_groups:
            parts = [_clean_cell(x) for x in group.split(",") if _clean_cell(x)]
            for part in parts:
                if part.lower() == "ritual":
                    continue
                if len(parts) > 1 or part in KNOWN_CLASS_NAMES:
                    classes_from_header.append(part)

        base = _clean_cell(re.sub(r"\([^)]*\)", "", text))

        m = LEVEL_LINE_RE.match(base)
        if m:
            lvl = int(m.group("ord") or m.group("ord2"))
            school = (m.group("school") or "").strip().title()
            return lvl, school, ritual, list(dict.fromkeys(classes_from_header))

        m2 = LEVEL_LINE_RE2.match(base)
        if m2:
            school = (m2.group("school") or m2.group("school2") or "").strip().title()
            return 0, school, ritual, list(dict.fromkeys(classes_from_header))

    return None, None, False, []


def _find_value(lines: List[str], label: str) -> Optional[str]:
    prefix = label.lower() + ":"
    for i, ln in enumerate(lines):
        low = ln.lower()
        if low.startswith(prefix):
            current = ln.split(":", 1)[1].strip()
            if current:
                return current
            if i + 1 < len(lines):
                return lines[i + 1].strip()
    return None


def _extract_name(soup: BeautifulSoup, content: Tag) -> str:
    selectors = [
        ".page-title span",
        ".page-title",
        "h1",
        "h2",
        "title",
    ]
    for selector in selectors:
        node = soup.select_one(selector) if selector != "title" else soup.title
        if node:
            text = _clean_cell(node.get_text(" ", strip=True))
            if text:
                text = re.sub(r"\s*-\s*D&D\s+5e.*$", "", text, flags=re.IGNORECASE)
                return text

    first_text = _clean_cell(content.get_text("\n", strip=True).splitlines()[0])
    return first_text


def _content_blocks(content: Tag) -> List[Tag]:
    return [
        child
        for child in content.children
        if isinstance(child, Tag) and child.name in {"p", "ul", "ol", "table", "div", "blockquote"}
    ]


def _extract_classes(soup: BeautifulSoup, blocks: List[Tag], classes_from_header: List[str]) -> str:
    if classes_from_header:
        return ", ".join(classes_from_header)

    for block in blocks:
        text = _clean_cell(block.get_text(" ", strip=True))
        low = text.lower()
        if low.startswith("spell lists"):
            after = text.split(".", 1)[1] if "." in text else text.split(":", 1)[1] if ":" in text else ""
            classes = [_clean_cell(c) for c in after.split(",") if _clean_cell(c)]
            if classes:
                return ", ".join(classes)
        if low.startswith("classes"):
            after = text.split(":", 1)[1] if ":" in text else ""
            classes = [_clean_cell(c) for c in after.split(",") if _clean_cell(c)]
            if classes:
                return ", ".join(classes)

    tag_classes: List[str] = []
    for a in soup.select(".page-tags a"):
        tag = _clean_cell(a.get_text(" ", strip=True)).replace("-", " ").title()
        if tag in KNOWN_CLASS_NAMES:
            tag_classes.append(tag)

    return ", ".join(dict.fromkeys(tag_classes))


def _format_description_block(text: str) -> str:
    text = _clean_cell(text)
    m = HIGHER_LEVEL_RE.match(text)
    if m:
        label = _clean_cell(m.group(1))
        rest = _clean_cell(m.group(2))
        if rest:
            return f"<b>{label}:</b> {rest}"
        return f"<b>{label}:</b>"
    return text


def parse_spell_page(url: str, *, session: requests.Session, cache_dir: Optional[Path]) -> Spell:
    html = fetch_html(url, session=session, cache_dir=cache_dir)
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one("#page-content") or soup
    blocks = _content_blocks(content)

    name = _extract_name(soup, content)

    block_texts = [_clean_cell(block.get_text(" ", strip=True)) for block in blocks]
    level, school, ritual, classes_from_header = _parse_level_school(block_texts)

    field_lines: List[str] = []
    field_block: Optional[Tag] = None
    for block in blocks:
        lines = [_clean_cell(x) for x in block.get_text("\n", strip=True).splitlines() if _clean_cell(x)]
        if any(line.lower().startswith("casting time:") for line in lines):
            field_lines = lines
            field_block = block
            break

    casting_time = _find_value(field_lines, "Casting Time") or ""
    range_ = _find_value(field_lines, "Range") or ""
    components_full = _find_value(field_lines, "Components") or ""
    duration = _find_value(field_lines, "Duration") or ""

    components_letters = components_full
    material = ""
    if "(" in components_full and components_full.rstrip().endswith(")"):
        before, after = components_full.split("(", 1)
        components_letters = before.strip().rstrip(",")
        material = "(" + after.strip()

    classes_csv = _extract_classes(soup, blocks, classes_from_header)

    desc_parts: List[str] = []
    passed_fields = field_block is None
    for block in blocks:
        if not passed_fields:
            if block is field_block:
                passed_fields = True
            continue

        text = _clean_cell(block.get_text(" ", strip=True))
        if not text:
            continue
        low = text.lower()
        if low.startswith("spell lists") or low.startswith("spell list") or low.startswith("classes"):
            continue
        desc_parts.append(_format_description_block(text))

    desc_html = "<br><br>".join([part for part in desc_parts if part])
    if material:
        desc_html = f"{material} {desc_html}".strip()

    if level == 0:
        level_school = f"{school} Cantrip" if school else "Cantrip"
    else:
        level_school = f"Level {level} {school}".strip() if level is not None else ""
        if ritual:
            level_school += " (Ritual)"

    return Spell(
        level=int(level) if level is not None else -1,
        name=_clean_cell(name),
        level_school=_clean_cell(level_school),
        casting_time=_clean_cell(casting_time),
        range_=_clean_cell(range_),
        components=_clean_cell(components_letters),
        duration=_clean_cell(duration),
        description_html=desc_html,
        classes_csv=_clean_cell(classes_csv),
        source_url=url,
    )


def scrape_dnd5e_spell_urls(min_level: int, max_level: int, *, session: requests.Session, cache_dir: Optional[Path]) -> Dict[str, str]:
    """
    Uses the big spells index page; it contains one table per level in order.
    """
    html = fetch_html(DND5E_SPELLS_INDEX, session=session, cache_dir=cache_dir)
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one("#page-content") or soup

    tables = content.find_all("table")
    spell_tables = []
    for t in tables:
        # heuristic: first row contains "Spell Name"
        first_row = t.find("tr")
        if not first_row:
            continue
        txt = first_row.get_text(" ", strip=True)
        if "Spell Name" in txt and "School" in txt and "Casting Time" in txt:
            spell_tables.append(t)

    if len(spell_tables) < 10:
        # fallback: some wikidot skins use different markup; try any table that has links to /spell:
        spell_tables = tables

    urls: Dict[str, str] = {}

    # map table index to level: 0=cantrip, 1=1st, ..., 9=9th
    for idx, t in enumerate(spell_tables):
        lvl = 0 if idx == 0 else idx
        if lvl < min_level or lvl > max_level:
            continue

        for tr in t.find_all("tr"):
            a = tr.find("a", href=True)
            if not a:
                continue
            href = a["href"].strip()
            if not href.startswith("/spell:"):
                continue
            name = _clean_cell(a.get_text(" ", strip=True))
            # ignore repeated header rows and anchors
            if name.lower() in {"spell name"}:
                continue
            url = DND5E_BASE + href
            urls[_norm_name(name)] = url

    return urls


def scrape_2024_spell_urls(*, session: requests.Session, cache_dir: Optional[Path]) -> Dict[str, str]:
    """
    2024 'All Spells' page should contain links to /spell:... pages.
    We do NOT assume it is grouped by level; we'll filter by level later by visiting pages.
    """
    urls: Dict[str, str] = {}
    html = fetch_html(DND2024_SPELLS_INDEX, session=session, cache_dir=cache_dir)
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one("#page-content") or soup

    for a in content.select("a[href]"):
        href = a.get("href", "").strip()
        if not href.startswith("/spell:"):
            continue
        if href == "/spell:all":
            continue
        name = _clean_cell(a.get_text(" ", strip=True))
        if not name or name.lower() == "spell":
            continue
        urls[_norm_name(name)] = DND2024_BASE + href

    return urls


def _sanitize_text_for_encoding(value: object, encoding: str) -> object:
    if not isinstance(value, str):
        return value

    text = unicodedata.normalize("NFKC", value)

    # Friendly fallbacks for legacy Windows encodings.
    replacements = {
        "−": "-",  # minus sign
        "‐": "-",  # hyphen
        "‑": "-",  # non-breaking hyphen
        " ": " ",  # narrow no-break space
        " ": " ",  # no-break space
        " ": " ",  # thin space
        " ": " ",  # hair space
        "​": "",   # zero-width space
        "﻿": "",   # BOM / zero-width no-break space
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)

    try:
        text.encode(encoding)
        return text
    except UnicodeEncodeError:
        # Last-resort lossy fallback so export still succeeds.
        return text.encode(encoding, errors="replace").decode(encoding)


def write_csv(spells: Iterable[Spell], out_path: Path, encoding: str) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding=encoding, newline="") as f:
        w = csv.writer(f, delimiter=";", quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for sp in spells:
            w.writerow([
                _sanitize_text_for_encoding(sp.level, encoding),
                _sanitize_text_for_encoding(sp.name, encoding),
                _sanitize_text_for_encoding(sp.level_school, encoding),
                _sanitize_text_for_encoding(sp.casting_time, encoding),
                _sanitize_text_for_encoding(sp.range_, encoding),
                _sanitize_text_for_encoding(sp.components, encoding),
                _sanitize_text_for_encoding(sp.duration, encoding),
                _sanitize_text_for_encoding(sp.description_html, encoding),
                _sanitize_text_for_encoding(sp.classes_csv, encoding),
                _sanitize_text_for_encoding("", encoding),  # keep trailing empty column like your existing CSV
            ])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-level", type=int, default=3)
    ap.add_argument("--max-level", type=int, default=9)
    ap.add_argument("--out", type=str, default="Alle_Zauber_3-9_en.csv")
    ap.add_argument("--encoding", type=str, default="utf-8-sig", help="CSV output encoding. Default utf-8-sig opens well in Excel and preserves Unicode.")
    ap.add_argument("--cache-dir", type=str, default=".cache_spells", help="Cache HTML to speed up reruns.")
    ap.add_argument("--delay", type=float, default=0.25, help="Delay between requests (seconds).")

    ap.add_argument("--no-2024", action="store_true", help="Skip the 2024 wiki entirely (only use dnd5e).")
    ap.add_argument("--no-5e", action="store_true", help="Skip dnd5e entirely (only use 2024).")

    args = ap.parse_args()

    min_level = int(args.min_level)
    max_level = int(args.max_level)

    out_path = Path(args.out)
    cache_dir = Path(args.cache_dir) if args.cache_dir else None

    session = requests.Session()

    urls_2024: Dict[str, str] = {}
    urls_5e: Dict[str, str] = {}

    if not args.no_2024:
        try:
            urls_2024 = scrape_2024_spell_urls(session=session, cache_dir=cache_dir)
            print(f"[2024] Found {len(urls_2024)} spell links on spell:all")
        except Exception as e:
            print(f"[2024] Could not fetch/parse 2024 wiki ({e}). Will fall back to dnd5e where possible.")

    if not args.no_5e:
        urls_5e = scrape_dnd5e_spell_urls(min_level, max_level, session=session, cache_dir=cache_dir)
        print(f"[5e] Found {len(urls_5e)} spell links for levels {min_level}-{max_level} on /spells")

    # union of names; prefer 2024 for duplicates
    all_keys = set(urls_5e.keys()) | set(urls_2024.keys())

    spells: List[Spell] = []
    errors = 0

    for k in sorted(all_keys):
        url = urls_2024.get(k) or urls_5e.get(k)
        if not url:
            continue

        try:
            sp = parse_spell_page(url, session=session, cache_dir=cache_dir)
            if sp.level < min_level or sp.level > max_level:
                continue
            spells.append(sp)
        except Exception as e:
            errors += 1
            print(f"[ERR] {url}: {e}")
        time.sleep(max(0.0, float(args.delay)))

    # sort nicely by level then name
    spells.sort(key=lambda s: (s.level, s.name.lower()))

    write_csv(spells, out_path, encoding=args.encoding)
    print(f"✅ Wrote {len(spells)} spells to: {out_path.resolve()}")
    if errors:
        print(f"⚠️  {errors} pages failed to parse. See log above.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
