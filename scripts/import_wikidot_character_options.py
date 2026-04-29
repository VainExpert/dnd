#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Import species and feats from dnd2024.wikidot.com into data/races and data/feats.

The source pages state a CC BY-SA 3.0 license in Wikidot's footer. Imported
records keep source URL, license, and original English text alongside the German
translation.
"""

from __future__ import annotations

import hashlib
import json
import re
import time
import unicodedata
import argparse
from pathlib import Path
from typing import Any
from urllib.parse import quote, urljoin

import requests
from bs4 import BeautifulSoup
from bs4.element import NavigableString, Tag


BASE_URL = "http://dnd2024.wikidot.com"
ROOT = Path(__file__).resolve().parents[1]
CACHE_DIR = ROOT / ".cache" / "wikidot-character-options"
TRANSLATION_CACHE = CACHE_DIR / "translations.json"

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; dnd-json-import/1.0)"}
LICENSE = {
    "name": "Creative Commons Attribution-ShareAlike 3.0 License",
    "spdx": "CC-BY-SA-3.0",
    "url": "https://creativecommons.org/licenses/by-sa/3.0/",
}


NAME_OVERRIDES = {
    "Acolyte": "Akolyt",
    "Artisan": "Handwerker",
    "Charlatan": "Scharlatan",
    "Criminal": "Krimineller",
    "Entertainer": "Entertainer",
    "Farmer": "Bauer",
    "Guard": "Wache",
    "Guide": "Reisefuehrer",
    "Hermit": "Einsiedler",
    "Merchant": "Haendler",
    "Noble": "Adeliger",
    "Sage": "Weiser",
    "Sailor": "Seemann",
    "Scribe": "Schreiber",
    "Soldier": "Soldat",
    "Wayfarer": "Wanderer",
    "Artificer": "Artificer",
    "Barbarian": "Barbar",
    "Bard": "Barde",
    "Cleric": "Kleriker",
    "Druid": "Druide",
    "Fighter": "Kaempfer",
    "Monk": "Moench",
    "Paladin": "Paladin",
    "Ranger": "Waldlaeufer",
    "Rogue": "Schurke",
    "Sorcerer": "Zauberer",
    "Warlock": "Hexenmeister",
    "Wizard": "Magier",
    "Aasimar": "Aasimar",
    "Dragonborn": "Drachenbluetige",
    "Dwarf": "Zwerg",
    "Elf": "Elf",
    "Gnome": "Gnom",
    "Goliath": "Goliath",
    "Halfling": "Halbling",
    "Human": "Mensch",
    "Orc": "Ork",
    "Tiefling": "Tiefling",
    "Changeling": "Wechselbalg",
    "Kalashtar": "Kalashtar",
    "Khoravar": "Khoravar",
    "Shifter": "Wandler",
    "Warforged": "Kriegsgeschmiedeter",
    "Boggart": "Boggart",
    "Faerie": "Fee",
    "Flamekin": "Flammenkind",
    "Lorwyn Changeling": "Lorwyn-Wechselbalg",
    "Rimekin": "Reifkind",
    "Dhampir": "Dhampir",
    "Alert": "Alarmiert",
    "Crafter": "Bastler",
    "Healer": "Heiler",
    "Lucky": "Gluecklich",
    "Magic Initiate": "Magie-Initiierter",
    "Musician": "Musiker",
    "Savage Attacker": "Brutaler Angreifer",
    "Skilled": "Talentiert",
    "Tavern Brawler": "Tavernen-Schlaeger",
    "Tough": "Hart",
    "Ability Score Improvement": "Faehigkeitswert-Verbesserung",
    "Actor": "Schauspieler",
    "Athlete": "Athlet",
    "Charger": "Angreifer aus dem Lauf",
    "Chef": "Koch",
    "Crossbow Expert": "Armbrust-Experte",
    "Crusher": "Brecher",
    "Defensive Duelist": "Defensiver Duellant",
    "Dual Wielder": "Zweihaender",
    "Durable": "Unverwuestlich",
    "Elemental Adept": "Elementar-Adept",
    "Fey Touched": "Feen-Beruehrt",
    "Grappler": "Ringer",
    "Great Weapon Master": "Meister grosser Waffen",
    "Heavily Armored": "Schwer Gepanzert",
    "Heavy Armor Master": "Meister schwerer Ruestungen",
    "Inspiring Leader": "Inspirierender Anfuehrer",
    "Keen Mind": "Scharfer Verstand",
    "Lightly Armored": "Leicht Gepanzert",
    "Mage Slayer": "Magierjaeger",
    "Martial Weapon Training": "Kriegswaffentraining",
    "Medium Armor Master": "Meister mittlerer Ruestungen",
    "Moderately Armored": "Moderat Gepanzert",
    "Mounted Combatant": "Berittener Kaempfer",
    "Observant": "Beobachter",
    "Piercer": "Stecher",
    "Poisoner": "Giftmischer",
    "Polearm Master": "Stangenwaffen-Meister",
    "Resilient": "Widerstandsfaehig",
    "Ritual Caster": "Ritualmagier",
    "Sentinel": "Waechter",
    "Shadow Touched": "Schatten-Beruehrt",
    "Sharpshooter": "Scharfschuetze",
    "Shield Master": "Schildmeister",
    "Skill Expert": "Talent-Experte",
    "Skulker": "Schleicher",
    "Slasher": "Schlitzer",
    "Speedy": "Schnell",
    "Spell Sniper": "Zauberscharfschuetze",
    "Telekinetic": "Telekinese",
    "Telepathic": "Telepath",
    "War Caster": "Kriegsmagier",
    "Weapon Master": "Waffenmeister",
    "Careful Spell": "Sorgfaeltiger Zauber",
    "Distant Spell": "Distanzzauber",
    "Empowered Spell": "Verstaerkter Zauber",
    "Extended Spell": "Verlaengerter Zauber",
    "Heightened Spell": "Erhoehter Zauber",
    "Quickened Spell": "Beschleunigter Zauber",
    "Seeking Spell": "Suchender Zauber",
    "Subtle Spell": "Subtiler Zauber",
    "Transmuted Spell": "Transmutierter Zauber",
    "Twinned Spell": "Zwillingszauber",
    "Archery": "Bogenschiessen",
    "Blind Fighting": "Blind Kaempfen",
    "Defense": "Verteidigung",
    "Dueling": "Duellieren",
    "Great Weapon Fighting": "Grosswaffen-Kampf",
    "Interception": "Abfangen",
    "Protection": "Schutz",
    "Thrown Weapon Fighting": "Wurfwaffen-Kampf",
    "Two Weapon Fighting": "Zwei-Waffen-Kampf",
    "Unarmed Fighting": "Unbewaffneter Kampf",
}

CATEGORY_TRANSLATIONS = {
    "Common": "Gewoehnlich",
    "Eberron": "Eberron",
    "Faerun": "Faerun",
    "Exotic": "Exotisch",
    "Lorwyn": "Lorwyn",
    "Origin Feats": "Ursprungstalente",
    "General Feats": "Allgemeine Talente",
    "Fighting Style Feats": "Kampfstil-Talente",
    "Epic Boon Feats": "Epische Segenstalente",
    "Dragonmark Feats": "Drachenmal-Talente",
    "Dragonmarks": "Drachenmale",
    "Greater Dragonmarks": "Groessere Drachenmale",
    "Species": "Spezies",
    "Backgrounds": "Hintergruende",
    "Classes": "Klassen",
    "Subclasses": "Subklassen",
}

GLOSSARY = {
    "Long Rest": "Lange Rast",
    "Short Rest": "Kurze Rast",
    "Proficiency Bonus": "Uebungsbonus",
    "Heroic Inspiration": "Heroische Inspiration",
    "Bonus Action": "Bonusaktion",
    "Reaction": "Reaktion",
    "Action": "Aktion",
    "Attack action": "Angriffsaktion",
    "Saving Throw": "Rettungswurf",
    "saving throw": "Rettungswurf",
    "Darkvision": "Dunkelsicht",
    "Resistance": "Resistenz",
    "Incapacitated": "Kampfunfaehig",
    "Origin feat": "Ursprungstalent",
    "Feat": "Talent",
    "Cantrip": "Zaubertrick",
    "Spell Slot": "Zauberplatz",
}


def clean_text(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.replace("ß", "ss").replace("&", " und ")
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def cache_path(url: str) -> Path:
    digest = hashlib.sha256(url.encode("utf-8")).hexdigest()[:24]
    return CACHE_DIR / f"{digest}.html"


def fetch_html(session: requests.Session, url: str) -> str:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    path = cache_path(url)
    if path.exists():
        return path.read_text(encoding="utf-8", errors="replace")
    response = session.get(url, timeout=40, headers=HEADERS)
    response.raise_for_status()
    path.write_text(response.text, encoding="utf-8", errors="replace")
    time.sleep(0.25)
    return response.text


def load_translation_cache() -> dict[str, str]:
    if TRANSLATION_CACHE.exists():
        return json.loads(TRANSLATION_CACHE.read_text(encoding="utf-8"))
    return {}


def save_translation_cache(cache: dict[str, str]) -> None:
    TRANSLATION_CACHE.parent.mkdir(parents=True, exist_ok=True)
    TRANSLATION_CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def apply_glossary(text: str) -> str:
    for en, de in sorted(GLOSSARY.items(), key=lambda item: len(item[0]), reverse=True):
        text = text.replace(en, de)
    return text


def translate_text(session: requests.Session, cache: dict[str, str], text: str) -> str:
    text = clean_text(text)
    if not text:
        return ""
    if text in NAME_OVERRIDES:
        return NAME_OVERRIDES[text]
    if text in CATEGORY_TRANSLATIONS:
        return CATEGORY_TRANSLATIONS[text]
    if text in cache:
        return cache[text]

    chunks = []
    remaining = text
    while len(remaining) > 1400:
        cut = remaining.rfind(". ", 0, 1400)
        if cut < 300:
            cut = remaining.rfind(" ", 0, 1400)
        if cut < 300:
            cut = 1400
        chunks.append(remaining[: cut + 1].strip())
        remaining = remaining[cut + 1 :].strip()
    if remaining:
        chunks.append(remaining)

    translated_chunks = []
    for chunk in chunks:
        if chunk in cache:
            translated_chunks.append(cache[chunk])
            continue
        url = (
            "https://translate.googleapis.com/translate_a/single"
            f"?client=gtx&sl=en&tl=de&dt=t&q={quote(apply_glossary(chunk))}"
        )
        response = session.get(url, timeout=30, headers=HEADERS)
        response.raise_for_status()
        data = response.json()
        translated = "".join(part[0] for part in data[0] if part and part[0])
        translated = clean_text(translated)
        cache[chunk] = translated
        translated_chunks.append(translated)
        time.sleep(0.12)

    result = clean_text(" ".join(translated_chunks))
    cache[text] = result
    return result


def page_title(soup: BeautifulSoup) -> str:
    title = clean_text(soup.title.get_text(" ", strip=True) if soup.title else "")
    return re.sub(r"\s*-\s*D&D\s+5e\s*\(2024\)\s*$", "", title, flags=re.I)


def content_blocks(content: Tag) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    for child in content.children:
        if isinstance(child, NavigableString):
            continue
        if not isinstance(child, Tag):
            continue
        if child.name in {"script", "style", "div"} and "footer-wikiwalk-nav" in child.get("class", []):
            continue
        text = clean_text(child.get_text(" ", strip=True))
        if not text:
            continue
        if child.name == "table":
            rows = []
            for tr in child.select("tr"):
                cells = [clean_text(c.get_text(" ", strip=True)) for c in tr.find_all(["th", "td"])]
                if cells:
                    rows.append(cells)
            if rows:
                blocks.append({"type": "table", "rows": rows, "text": text})
            continue
        if child.name in {"h1", "h2", "h3", "h4", "h5"}:
            blocks.append({"type": "heading", "level": int(child.name[1]), "text": text})
        elif child.name in {"ul", "ol"}:
            items = [clean_text(li.get_text(" ", strip=True)) for li in child.find_all("li", recursive=False)]
            blocks.append({"type": "list", "ordered": child.name == "ol", "items": items, "text": text})
        else:
            blocks.append({"type": "paragraph", "text": text})
    return blocks


def translate_block(session: requests.Session, cache: dict[str, str], block: dict[str, Any]) -> dict[str, Any]:
    translated = dict(block)
    if block["type"] == "table":
        translated["rows_de"] = [
            [translate_text(session, cache, cell) for cell in row]
            for row in block.get("rows", [])
        ]
    elif block["type"] == "list":
        translated["items_de"] = [translate_text(session, cache, item) for item in block.get("items", [])]
    translated["text_de"] = translate_text(session, cache, block.get("text", ""))
    return translated


def extract_source_and_body(blocks: list[dict[str, Any]]) -> tuple[str, list[dict[str, Any]]]:
    if blocks and blocks[0].get("text", "").lower().startswith("source:"):
        source = clean_text(blocks[0]["text"].split(":", 1)[1])
        return source, blocks[1:]
    return "", blocks


def extract_prerequisite(blocks: list[dict[str, Any]]) -> str:
    for block in blocks[:4]:
        text = block.get("text", "")
        if text.lower().startswith("prerequisite:"):
            return clean_text(text.split(":", 1)[1])
    return ""


def summary_from_blocks(blocks: list[dict[str, Any]]) -> str:
    for block in blocks:
        if block["type"] == "paragraph":
            text = block.get("text_de") or block.get("text") or ""
            if text and not text.lower().startswith("prerequisite:"):
                return text
    return ""


def parse_index(session: requests.Session, path: str, link_prefix: str) -> list[dict[str, str]]:
    html = fetch_html(session, f"{BASE_URL}/{path}")
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError(f"No page-content in {path}")

    entries: list[dict[str, str]] = []
    current_section = ""
    for child in content.children:
        if not isinstance(child, Tag):
            continue
        if child.name in {"h1", "h2", "h3"}:
            current_section = clean_text(child.get_text(" ", strip=True))
            continue

        navsets = child.select(".yui-navset") if child.name != "table" else []
        for navset in navsets:
            groups = [clean_text(a.get_text(" ", strip=True)) for a in navset.select(".yui-nav a")]
            tabs = navset.select(".yui-content > div")
            for index, tab in enumerate(tabs):
                group = groups[index] if index < len(groups) else ""
                for link in tab.select(f'a[href^="/{link_prefix}:"]'):
                    text = clean_text(link.get_text(" ", strip=True))
                    href = link.get("href") or ""
                    if text:
                        entries.append(
                            {
                                "name": text,
                                "href": href,
                                "section": current_section,
                                "group": group,
                            }
                        )

        if child.name == "table":
            for link in child.select(f'a[href^="/{link_prefix}:"]'):
                text = clean_text(link.get_text(" ", strip=True))
                href = link.get("href") or ""
                if text:
                    entries.append({"name": text, "href": href, "section": current_section, "group": ""})

    if link_prefix == "species":
        for entry in entries:
            entry["section"] = "Species"
    if link_prefix == "background":
        for entry in entries:
            entry["section"] = "Backgrounds"

    deduped: dict[str, dict[str, str]] = {}
    for entry in entries:
        deduped[entry["href"]] = entry
    return list(deduped.values())


def parse_class_index(session: requests.Session) -> list[dict[str, Any]]:
    html = fetch_html(session, f"{BASE_URL}/")
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError("No page-content on home page")

    classes: list[dict[str, Any]] = []
    seen: set[str] = set()
    for feature in content.select("div.feature, div.feature.offcolor"):
        heading = feature.select_one('h1 a[href$=":main"]')
        if not heading:
            continue
        href = heading.get("href") or ""
        if not href or href in seen:
            continue
        seen.add(href)
        name = clean_text(heading.get_text(" ", strip=True))
        prefix = href.strip("/").split(":", 1)[0]
        summary_node = feature.select_one("h6")
        summary = clean_text(summary_node.get_text(" ", strip=True)) if summary_node else ""
        subclasses = []
        for link in feature.select(f'a[href^="/{prefix}:"]'):
            sub_href = link.get("href") or ""
            sub_name = clean_text(link.get_text(" ", strip=True))
            if sub_href == href or sub_href.endswith(":spell-list") or not sub_name:
                continue
            if sub_href.endswith(":metamagic") or sub_href.endswith(":eldritch-invocation"):
                continue
            subclasses.append({"name": sub_name, "href": sub_href})
        classes.append(
            {
                "name": name,
                "href": href,
                "section": "Classes",
                "group": "Official",
                "summary": summary,
                "subclasses": subclasses,
            }
        )
    return classes


def translate_name(session: requests.Session, cache: dict[str, str], name: str) -> str:
    if name in NAME_OVERRIDES:
        return NAME_OVERRIDES[name]
    return translate_text(session, cache, name)


def import_entry(
    session: requests.Session,
    cache: dict[str, str],
    entry: dict[str, str],
    kind: str,
    output_dir: Path,
) -> str:
    url = urljoin(BASE_URL, entry["href"])
    soup = BeautifulSoup(fetch_html(session, url), "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError(f"No page-content in {url}")
    original_name = page_title(soup) or entry["name"]
    name_de = NAME_OVERRIDES.get(original_name) or translate_text(session, cache, original_name)
    blocks = content_blocks(content)
    source, body_blocks = extract_source_and_body(blocks)
    translated_blocks = [translate_block(session, cache, block) for block in body_blocks]
    prerequisite = extract_prerequisite(body_blocks)

    record = {
        "id": slugify(name_de),
        "name": name_de,
        "original_name": original_name,
        "kind": "race" if kind == "species" else "background" if kind == "background" else "feat",
        "source": source,
        "source_url": url,
        "source_page": "dnd2024.wikidot.com",
        "license": LICENSE,
        "translation_note": "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Originaltext bleibt zur Kontrolle enthalten.",
        "category": translate_text(session, cache, entry.get("section", "")),
        "category_original": entry.get("section", ""),
        "group": translate_text(session, cache, entry.get("group", "")),
        "group_original": entry.get("group", ""),
        "prerequisite": translate_text(session, cache, prerequisite) if prerequisite else "",
        "prerequisite_original": prerequisite,
        "summary": summary_from_blocks(translated_blocks),
        "entries": translated_blocks,
    }

    filename = f"{record['id']}.json"
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / filename).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return filename


def import_class_entry(
    session: requests.Session,
    cache: dict[str, str],
    entry: dict[str, Any],
    output_dir: Path,
    subclass_files: list[str],
) -> str:
    expected_name = translate_name(session, cache, entry["name"])
    expected_filename = f"{slugify(expected_name)}.json"
    expected_path = output_dir / expected_filename
    if expected_path.exists() and expected_path.stat().st_size > 0:
        return expected_filename

    url = urljoin(BASE_URL, entry["href"])
    soup = BeautifulSoup(fetch_html(session, url), "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError(f"No page-content in {url}")
    original_name = page_title(soup) or entry["name"]
    name_de = translate_name(session, cache, original_name)
    blocks = content_blocks(content)
    source, body_blocks = extract_source_and_body(blocks)
    translated_blocks = [translate_block(session, cache, block) for block in body_blocks]
    subclass_refs = []
    for sub in entry.get("subclasses", []):
        sub_name = sub["name"]
        sub_name_de = translate_name(session, cache, sub_name)
        subclass_refs.append(
            {
                "name": sub_name_de,
                "original_name": sub_name,
                "id": slugify(sub_name_de),
                "source_url": urljoin(BASE_URL, sub["href"]),
                "file": f"subclasses/{slugify(sub_name_de)}.json",
            }
        )

    record = {
        "id": slugify(name_de),
        "name": name_de,
        "original_name": original_name,
        "kind": "class",
        "source": source,
        "source_url": url,
        "source_page": "dnd2024.wikidot.com",
        "license": LICENSE,
        "translation_note": "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Originaltext bleibt zur Kontrolle enthalten.",
        "category": "Klassen",
        "category_original": "Classes",
        "group": "",
        "group_original": "",
        "summary": summary_from_blocks(translated_blocks) or translate_text(session, cache, entry.get("summary", "")),
        "subclasses": subclass_refs,
        "subclass_index": subclass_files,
        "entries": translated_blocks,
    }

    filename = f"{record['id']}.json"
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / filename).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return filename


def import_subclass_entry(
    session: requests.Session,
    cache: dict[str, str],
    entry: dict[str, Any],
    parent: dict[str, Any],
    output_dir: Path,
) -> str:
    expected_name = translate_name(session, cache, entry["name"])
    expected_filename = f"{slugify(expected_name)}.json"
    expected_path = output_dir / expected_filename
    if expected_path.exists() and expected_path.stat().st_size > 0:
        return expected_filename

    url = urljoin(BASE_URL, entry["href"])
    soup = BeautifulSoup(fetch_html(session, url), "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError(f"No page-content in {url}")
    original_name = page_title(soup) or entry["name"]
    name_de = translate_name(session, cache, original_name)
    parent_name_de = translate_name(session, cache, parent["name"])
    blocks = content_blocks(content)
    source, body_blocks = extract_source_and_body(blocks)
    translated_blocks = [translate_block(session, cache, block) for block in body_blocks]

    record = {
        "id": slugify(name_de),
        "name": name_de,
        "original_name": original_name,
        "kind": "subclass",
        "class": parent_name_de,
        "class_original": parent["name"],
        "class_id": slugify(parent_name_de),
        "source": source,
        "source_url": url,
        "source_page": "dnd2024.wikidot.com",
        "license": LICENSE,
        "translation_note": "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Originaltext bleibt zur Kontrolle enthalten.",
        "category": "Subklassen",
        "category_original": "Subclasses",
        "summary": summary_from_blocks(translated_blocks),
        "entries": translated_blocks,
    }

    filename = f"{record['id']}.json"
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / filename).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return filename


def parse_option_records(
    session: requests.Session,
    cache: dict[str, str],
    *,
    source_path: str,
    option_kind: str,
    class_name: str,
    class_id: str,
    output_dir: Path,
) -> list[str]:
    url = f"{BASE_URL}/{source_path}"
    soup = BeautifulSoup(fetch_html(session, url), "html.parser")
    content = soup.select_one("#page-content")
    if not content:
        raise RuntimeError(f"No page-content in {url}")

    files: list[str] = []
    current: dict[str, Any] | None = None

    def flush() -> None:
        nonlocal current
        if not current:
            return
        name_de = translate_name(session, cache, current["original_name"])
        translated_blocks = [translate_block(session, cache, block) for block in current["blocks"]]
        record = {
            "id": slugify(name_de),
            "name": name_de,
            "original_name": current["original_name"],
            "kind": option_kind,
            "class": class_name,
            "class_id": class_id,
            "source": current.get("source", ""),
            "source_url": url,
            "source_page": "dnd2024.wikidot.com",
            "license": LICENSE,
            "translation_note": "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Originaltext bleibt zur Kontrolle enthalten.",
            "cost": translate_text(session, cache, current.get("cost", "")) if current.get("cost") else "",
            "cost_original": current.get("cost", ""),
            "prerequisite": translate_text(session, cache, current.get("prerequisite", "")) if current.get("prerequisite") else "",
            "prerequisite_original": current.get("prerequisite", ""),
            "summary": summary_from_blocks(translated_blocks),
            "entries": translated_blocks,
        }
        filename = f"{record['id']}.json"
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / filename).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        files.append(filename)
        current = None

    for child in content.children:
        if not isinstance(child, Tag):
            continue
        if child.name == "div" and "floatright" in child.get("class", []):
            continue
        text = clean_text(child.get_text(" ", strip=True))
        if not text:
            continue
        if child.name == "h3":
            flush()
            current = {"original_name": text, "blocks": []}
            continue
        if child.name == "h2" or current is None:
            continue

        if child.name == "p" and text.startswith("Source:"):
            source_match = re.search(r"Source:\s*(.*?)(?=\s+(?:Prerequisite|Cost):|$)", text)
            prereq_match = re.search(r"Prerequisite:\s*(.*?)(?=\s+Cost:|$)", text)
            cost_match = re.search(r"Cost:\s*(.*)$", text)
            if source_match:
                current["source"] = clean_text(source_match.group(1))
            if prereq_match:
                current["prerequisite"] = clean_text(prereq_match.group(1))
            if cost_match:
                current["cost"] = clean_text(cost_match.group(1))

            remainder = text
            remainder = re.sub(r"Source:\s*.*?(?=\s+(?:Prerequisite|Cost):|$)", "", remainder)
            remainder = re.sub(r"Prerequisite:\s*.*?(?=\s+Cost:|$)", "", remainder)
            remainder = re.sub(r"Cost:\s*.*$", "", remainder).strip()
            if remainder:
                current["blocks"].append({"type": "paragraph", "text": remainder})
            continue

        current["blocks"].extend(content_blocks(BeautifulSoup(str(child), "html.parser")))

    flush()
    write_index(output_dir, files)
    return sorted(files, key=lambda value: value.lower())


def attach_options_to_class(class_path: Path, field: str, files: list[str], base_dir: str) -> None:
    data = json.loads(class_path.read_text(encoding="utf-8"))
    data[field] = [{"file": f"{base_dir}/{file}"} for file in files]
    class_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_index(output_dir: Path, files: list[str]) -> None:
    files = sorted(set(files), key=lambda value: value.lower())
    (output_dir / "index.json").write_text(json.dumps({"files": files}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--only",
        choices=["all", "species", "feats", "backgrounds", "classes", "options"],
        default="all",
        help="Limit the import to one collection.",
    )
    args = parser.parse_args()

    session = requests.Session()
    translation_cache = load_translation_cache()

    if args.only in {"all", "species"}:
        species = parse_index(session, "species:all", "species")
        race_files = []
        for idx, entry in enumerate(species, start=1):
            print(f"[species {idx}/{len(species)}] {entry['name']}")
            race_files.append(import_entry(session, translation_cache, entry, "species", ROOT / "data" / "races"))
            save_translation_cache(translation_cache)
        write_index(ROOT / "data" / "races", race_files)
    else:
        race_files = []

    if args.only in {"all", "feats"}:
        feats = parse_index(session, "feat:all", "feat")
        feat_files = []
        for idx, entry in enumerate(feats, start=1):
            print(f"[feat {idx}/{len(feats)}] {entry['name']}")
            feat_files.append(import_entry(session, translation_cache, entry, "feat", ROOT / "data" / "feats"))
            save_translation_cache(translation_cache)
        write_index(ROOT / "data" / "feats", feat_files)
    else:
        feat_files = []

    if args.only in {"all", "backgrounds"}:
        backgrounds = parse_index(session, "background:all", "background")
        background_files = []
        for idx, entry in enumerate(backgrounds, start=1):
            print(f"[background {idx}/{len(backgrounds)}] {entry['name']}")
            background_files.append(
                import_entry(session, translation_cache, entry, "background", ROOT / "data" / "backgrounds")
            )
            save_translation_cache(translation_cache)
        write_index(ROOT / "data" / "backgrounds", background_files)
    else:
        background_files = []

    if args.only in {"all", "classes"}:
        classes = parse_class_index(session)
        class_files = []
        all_subclass_files = []
        subclasses_dir = ROOT / "data" / "classes" / "subclasses"
        for class_idx, class_entry in enumerate(classes, start=1):
            print(f"[class {class_idx}/{len(classes)}] {class_entry['name']}")
            subclass_files = []
            subclasses = class_entry.get("subclasses", [])
            for sub_idx, sub_entry in enumerate(subclasses, start=1):
                print(f"  [subclass {sub_idx}/{len(subclasses)}] {sub_entry['name']}")
                filename = import_subclass_entry(session, translation_cache, sub_entry, class_entry, subclasses_dir)
                subclass_files.append(filename)
                all_subclass_files.append(filename)
                save_translation_cache(translation_cache)
            class_files.append(
                import_class_entry(
                    session,
                    translation_cache,
                    class_entry,
                    ROOT / "data" / "classes",
                    sorted(subclass_files, key=lambda value: value.lower()),
                )
            )
            save_translation_cache(translation_cache)
        write_index(ROOT / "data" / "classes", class_files)
        write_index(subclasses_dir, all_subclass_files)
    else:
        class_files = []
        all_subclass_files = []

    if args.only in {"all", "options"}:
        print("[options] Sorcerer Metamagic")
        metamagic_files = parse_option_records(
            session,
            translation_cache,
            source_path="sorcerer:metamagic",
            option_kind="metamagic_option",
            class_name="Zauberer",
            class_id="zauberer",
            output_dir=ROOT / "data" / "classes" / "options" / "metamagic",
        )
        attach_options_to_class(
            ROOT / "data" / "classes" / "zauberer.json",
            "metamagic_options",
            metamagic_files,
            "options/metamagic",
        )
        save_translation_cache(translation_cache)

        print("[options] Warlock Eldritch Invocations")
        invocation_files = parse_option_records(
            session,
            translation_cache,
            source_path="warlock:eldritch-invocation",
            option_kind="eldritch_invocation",
            class_name="Hexenmeister",
            class_id="hexenmeister",
            output_dir=ROOT / "data" / "classes" / "options" / "eldritch-invocations",
        )
        attach_options_to_class(
            ROOT / "data" / "classes" / "hexenmeister.json",
            "eldritch_invocations",
            invocation_files,
            "options/eldritch-invocations",
        )
        save_translation_cache(translation_cache)
    else:
        metamagic_files = []
        invocation_files = []

    save_translation_cache(translation_cache)
    print(
        f"Wrote {len(race_files)} race files, "
        f"{len(feat_files)} feat files, {len(background_files)} background files, "
        f"{len(class_files)} class files, {len(all_subclass_files)} subclass files, "
        f"{len(metamagic_files)} metamagic options, and {len(invocation_files)} eldritch invocations."
    )


if __name__ == "__main__":
    main()
