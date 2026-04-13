#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate an English spell CSV (like Alle_Zauber_3-9_en.csv) into a German CSV
in the same semicolon-separated 10-column format used by the spell scraper:

    level;name;level_school;casting_time;range;components;duration;description_html;classes;

Design goals
------------
- Reuses the DeepL usage/cache/checkpoint workflow from your monster translator.
- Preserves the spell CSV layout from the scraper.
- Translates spell-specific fields in a D&D-friendly way:
  - schools, classes, V/S/M -> V/G/M
  - feet -> meters, dice -> W notation
  - HTML in description column is preserved (<br>, <b>, ...)
  - "Using a Higher-Level Spell Slot:" -> "Auf höheren Level gewirkt:"
  - "At Higher Levels:" -> "Auf höheren Level:"

Requirements
------------
    pip install deepl

Environment
-----------
    set DEEPL_AUTH_KEY=your_key_here
or on PowerShell
    $env:DEEPL_AUTH_KEY="your_key_here"
"""

from __future__ import annotations

import argparse
import csv
import html as _html
import json
import os
import re
import time
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple

import deepl  # pip install deepl


# -------------------------
# Constants / style maps
# -------------------------

CSV_COLS = 10

IDX_LEVEL = 0
IDX_NAME = 1
IDX_LEVEL_SCHOOL = 2
IDX_CASTING_TIME = 3
IDX_RANGE = 4
IDX_COMPONENTS = 5
IDX_DURATION = 6
IDX_DESCRIPTION = 7
IDX_CLASSES = 8
IDX_TRAILING = 9

FIELD_NAMES = {
    IDX_LEVEL: "level",
    IDX_NAME: "name",
    IDX_LEVEL_SCHOOL: "level_school",
    IDX_CASTING_TIME: "casting_time",
    IDX_RANGE: "range",
    IDX_COMPONENTS: "components",
    IDX_DURATION: "duration",
    IDX_DESCRIPTION: "description_html",
    IDX_CLASSES: "classes_csv",
    IDX_TRAILING: "trailing_empty",
}

SCHOOL_DE = {
    "abjuration": "Bannmagie",
    "conjuration": "Beschwörung",
    "divination": "Erkenntnismagie",
    "enchantment": "Verzauberung",
    "evocation": "Hervorrufung",
    "illusion": "Illusionsmagie",
    "necromancy": "Nekromantie",
    "transmutation": "Verwandlungsmagie",
}

CLASS_DE = {
    "artificer": "Artificer",
    "bard": "Barde",
    "cleric": "Kleriker",
    "druid": "Druide",
    "paladin": "Paladin",
    "ranger": "Waldläufer",
    "sorcerer": "Zauberer",
    "warlock": "Hexenmeister",
    "wizard": "Magier",
}

RANGE_WORD_DE = {
    "self": "Selbst",
    "touch": "Berührung",
    "sight": "Sicht",
    "special": "Spezial",
    "unlimited": "Unbegrenzt",
}

SHAPE_DE = {
    "sphere": "Sphäre",
    "cube": "Würfel",
    "cone": "Kegel",
    "line": "Linie",
    "radius": "Radius",
    "emanation": "Ausstrahlung",
    "circle": "Kreis",
    "hemisphere": "Halbkugel",
    "cylinder": "Zylinder",
}

ABILITY_ABBR = {
    "strength": "STR",
    "dexterity": "DEX",
    "constitution": "CON",
    "intelligence": "INT",
    "wisdom": "WIS",
    "charisma": "CHA",
}

# protect mechanics so DeepL does not mangle them; unit conversion happens later
PROTECT_PATTERNS = [
    r"\b\d+d\d+(?:\s*[+\-–—]\s*\d+)?\b",                 # 2d6, 1d8 + 4
    r"\bd\d+\b",                                         # d20
    r"\bDC\s*\d+\b",                                     # DC 15
    r"\b[+\-]\d+\b",                                     # +7, -1
    r"\b\d+\/\d+\b",                                     # 1/2
    r"\b\d+(?:\.\d+)?(?:\s*|\-)(?:ft|feet|foot)\b",      # 30 ft / 30-foot
    r"\b\d+(?:\.\d+)?(?:\s*|\-)(?:yd|yard|yards)\b",
    r"\b\d+(?:\.\d+)?(?:\s*|\-)(?:in|inch|inches)\b",
    r"\b\d+(?:\.\d+)?(?:\s*|\-)(?:mi|mile|miles)\b",
    r"\b\d+(?:\.\d+)?\s*(?:lb|lbs)\b",
]

CP1252_REPLACEMENTS = {
    "\u2212": "-",   # minus sign
    "\u2013": "-",   # en dash
    "\u2014": "-",   # em dash
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2026": "...",
    "\u00a0": " ",
}

EMBEDDED_GLOSSARY_RULES = [
    # Heading/style normalization
    {"pattern": r"(?i)\bAuf höheren Ebenen gewirkt:\b", "replace": "Auf höheren Level gewirkt:"},
    {"pattern": r"(?i)\bAuf höheren Stufen gewirkt:\b", "replace": "Auf höheren Level gewirkt:"},
    {"pattern": r"(?i)\bAuf höheren Stufen:\b", "replace": "Auf höheren Level:"},
    {"pattern": r"(?i)\bMit einem höherstufigen Zauberplatz gewirkt:\b", "replace": "Auf höheren Level gewirkt:"},
    {"pattern": r"(?i)\bMit einem Zauberplatz höherer Stufe gewirkt:\b", "replace": "Auf höheren Level gewirkt:"},
    {"pattern": r"(?i)\bMit einem höheren Zauberplatz gewirkt:\b", "replace": "Auf höheren Level gewirkt:"},

    # Common D&D term normalization
    {"pattern": r"(?i)\bRettungsprobe\b", "replace": "Rettungswurf"},
    {"pattern": r"(?i)\bRettungswürfe\b", "replace": "Rettungswürfe"},
    {"pattern": r"(?i)\bTrefferpunkte\b", "replace": "TP"},
    {"pattern": r"(?i)\btemporäre Trefferpunkte\b", "replace": "temporäre TP"},
    {"pattern": r"(?i)\bBonushandlung\b", "replace": "Bonus Aktion"},
    {"pattern": r"(?i)\bBonusaktion\b", "replace": "Bonus Aktion"},
    {"pattern": r"(?i)\bNahkampfwaffe\b", "replace": "Nahkampfwaffe"},
    {"pattern": r"(?i)\bFernkampfwaffe\b", "replace": "Fernkampfwaffe"},

    # spell slot phrasing / SG style
    {"pattern": r"(?i)\bZauberrettungswurf[- ]SG\b", "replace": "Zauberrettungswurf-SG"},
    {"pattern": r"(?i)\bSchwierigkeitsgrad\b", "replace": "SG"},
    {"pattern": r"(?i)\bZauberplatz[- ]Stufe\b", "replace": "Slot-Level"},
    {"pattern": r"(?i)\bZauberplatzstufe\b", "replace": "Slot-Level"},
    {"pattern": r"(?i)\bStufe des Zauberplatzes\b", "replace": "Slot-Level"},

    # cantrip wording
    {"pattern": r"(?i)\bZaubertricks?\b", "replace": "Zaubertrick"},
]

ENCODING_GUESSES = ["utf-8-sig", "utf-8", "cp1252", "latin1"]


# -------------------------
# Helpers
# -------------------------

class BudgetStop(Exception):
    pass


def load_json(path: str, default: Any) -> Any:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return default


def save_json(path: str, obj: Any) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def load_glossary(glossary_path: str) -> List[Dict[str, str]]:
    if not glossary_path or not os.path.exists(glossary_path):
        return []
    try:
        with open(glossary_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        rules = data.get("rules", [])
        out: List[Dict[str, str]] = []
        if isinstance(rules, list):
            for r in rules:
                if isinstance(r, dict) and "pattern" in r and "replace" in r:
                    out.append({"pattern": str(r["pattern"]), "replace": str(r["replace"])})
        return out
    except Exception:
        return []


def apply_glossary(text: str, rules: Sequence[Dict[str, str]]) -> str:
    out = text
    for rule in rules:
        try:
            out = re.sub(rule["pattern"], rule["replace"], out)
        except re.error:
            continue
    return out


def estimate_chars_billed(text: str) -> int:
    return len(text or "")


def protect_tokens(text: str) -> Tuple[str, List[str]]:
    tokens: List[str] = []

    def repl(m: re.Match[str]) -> str:
        tokens.append(m.group(0))
        return f"__TOK{len(tokens)-1}__"

    out = text
    for pat in PROTECT_PATTERNS:
        out = re.sub(pat, repl, out, flags=re.IGNORECASE)
    return out, tokens


def to_xml_with_placeholders(text: str) -> str:
    esc = _html.escape(text, quote=False)
    esc = re.sub(r"__TOK(\d+)__", r"<ph id='\1'/>", esc)
    return f"<t>{esc}</t>"


def from_xml_and_restore(translated_xml: str, tokens: List[str]) -> str:
    s = translated_xml.strip()
    s = re.sub(r"^<t>\s*", "", s)
    s = re.sub(r"\s*</t>$", "", s)
    s = _html.unescape(s)

    def repl(m: re.Match[str]) -> str:
        idx = int(m.group(1))
        return tokens[idx] if 0 <= idx < len(tokens) else ""

    s = re.sub(r"<ph\s+id=['\"](\d+)['\"]\s*/\s*>", repl, s)
    return s


def format_de_number(x: float, decimals: int = 1) -> str:
    x = round(x, decimals)
    if abs(x - round(x)) < 1e-9:
        s = str(int(round(x)))
    else:
        s = f"{x:.{decimals}f}"
    return s.replace(".", ",")


def sanitize_for_encoding(text: str, encoding: str) -> str:
    out = text
    for src, dst in CP1252_REPLACEMENTS.items():
        out = out.replace(src, dst)
    try:
        out.encode(encoding)
        return out
    except UnicodeEncodeError:
        return out.encode(encoding, errors="replace").decode(encoding)


def read_csv_rows(path: str, encoding_hint: Optional[str] = None) -> Tuple[List[List[str]], str]:
    guesses = []
    if encoding_hint:
        guesses.append(encoding_hint)
    guesses.extend(e for e in ENCODING_GUESSES if e not in guesses)

    last_err: Optional[Exception] = None
    for enc in guesses:
        try:
            with open(path, "r", encoding=enc, newline="") as f:
                rows = list(csv.reader(f, delimiter=";"))
            return rows, enc
        except Exception as e:
            last_err = e
    raise RuntimeError(f"Could not read CSV {path!r} with encodings {guesses}: {last_err}")


def write_csv_rows(rows: Iterable[List[str]], out_path: str, encoding: str) -> None:
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    tmp_path = out_path + ".tmp"
    with open(tmp_path, "w", encoding=encoding, newline="") as f:
        w = csv.writer(f, delimiter=";", quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for row in rows:
            fixed = [sanitize_for_encoding(str(x), encoding) for x in row]
            w.writerow(fixed)
    os.replace(tmp_path, out_path)


def deepl_translate_text(client: deepl.DeepLClient, text: str, target_lang: str, retries: int = 5) -> Tuple[str, int]:
    delay = 1.0
    last_err: Optional[Exception] = None
    for _ in range(retries):
        try:
            xml_in = to_xml_with_placeholders(text)
            res = client.translate_text(
                xml_in,
                target_lang=target_lang,
                tag_handling="xml",
                preserve_formatting=True,
                split_sentences=deepl.SplitSentences.NO_NEWLINES,
            )
            billed = getattr(res, "billed_characters", None)
            billed = int(billed) if billed is not None else estimate_chars_billed(text)
            translated = from_xml_and_restore(res.text, [])
            return translated, billed
        except Exception as e:
            last_err = e
            time.sleep(delay)
            delay = min(delay * 2.0, 20.0)
    raise RuntimeError(f"DeepL translate failed after retries: {last_err}")


def deepl_translate_text_preserving_tokens(
    client: deepl.DeepLClient,
    text: str,
    target_lang: str,
    retries: int = 5,
) -> Tuple[str, int]:
    delay = 1.0
    last_err: Optional[Exception] = None

    for _ in range(retries):
        try:
            protected, tokens = protect_tokens(text)
            xml_in = to_xml_with_placeholders(protected)
            res = client.translate_text(
                xml_in,
                target_lang=target_lang,
                tag_handling="xml",
                preserve_formatting=True,
                split_sentences=deepl.SplitSentences.NO_NEWLINES,
            )
            billed = getattr(res, "billed_characters", None)
            billed = int(billed) if billed is not None else estimate_chars_billed(text)
            return from_xml_and_restore(res.text, tokens), billed
        except Exception as e:
            last_err = e
            time.sleep(delay)
            delay = min(delay * 2.0, 20.0)

    raise RuntimeError(f"DeepL translate failed after retries: {last_err}")


# -------------------------
# D&D normalization
# -------------------------

def convert_dice_to_w(text: str) -> str:
    text = re.sub(r"\b(\d+)d(\d+)\b", r"\1W\2", text)
    text = re.sub(r"\bd(\d+)\b", r"W\1", text)
    return text


def format_de_duration_value(value: float, unit: str) -> str:
    unit = unit.lower()
    if unit.startswith("round"):
        n = int(round(value))
        return f"{n} Runde (6 s)" if n == 1 else f"{n} Runden ({n*6} s)"
    if unit.startswith("minute"):
        n = int(round(value))
        return f"{n} min"
    if unit.startswith("hour"):
        n = int(round(value))
        return f"{n} h"
    if unit.startswith("day"):
        n = int(round(value))
        return f"{n} Tage" if n != 1 else "1 Tag"
    return f"{format_de_number(value, 1)} {unit}"


def convert_units_de(text: str, *, exact: bool) -> str:
    if not text:
        return text

    if exact:
        ft_factor = 0.3048
        yd_factor = 0.9144
        inch_factor_cm = 2.54
        mi_factor_km = 1.609344
        lb_factor = 0.45359237
    else:
        ft_factor = 0.3
        yd_factor = 0.9
        inch_factor_cm = 2.5
        mi_factor_km = 1.584
        lb_factor = 0.5

    def ft_repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        meters = n * ft_factor
        return f"{format_de_number(meters, 1)} m"

    def yd_repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        meters = n * yd_factor
        return f"{format_de_number(meters, 1)} m"

    def inch_repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        cm = n * inch_factor_cm
        return f"{format_de_number(cm, 1)} cm"

    def mi_repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        km = n * mi_factor_km
        return f"{format_de_number(km, 3 if km < 10 else 2)} km"

    def lb_repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        kg = n * lb_factor
        return f"{format_de_number(kg, 1)} kg"

    # allow 30 feet, 30-foot, 30ft
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:mi|mile|miles)\b", mi_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:yd|yard|yards)\b", yd_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:in|inch|inches)\b", inch_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:lb|lbs)\b", lb_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)(?:\s*|\-)(?:ft|feet|foot)\b", ft_repl, text, flags=re.IGNORECASE)

    return text


def normalize_time_like_text(text: str) -> str:
    if not text:
        return text

    def repl(m: re.Match[str]) -> str:
        n = float(m.group(1))
        unit = m.group(2)
        return format_de_duration_value(n, unit)

    text = re.sub(r"\b(\d+(?:\.\d+)?)\s+(round|rounds|minute|minutes|hour|hours|day|days)\b", repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b24-hour\b", "24 h", text, flags=re.IGNORECASE)
    text = re.sub(r"\b24 hours\b", "24 h", text, flags=re.IGNORECASE)
    return text


def normalize_ability_terms(text: str) -> str:
    out = text
    # German / English variants to abbreviation style
    patterns = [
        (r"(?i)\bStrength saving throw\b", "STR-Rettungswurf"),
        (r"(?i)\bDexterity saving throw\b", "DEX-Rettungswurf"),
        (r"(?i)\bConstitution saving throw\b", "CON-Rettungswurf"),
        (r"(?i)\bIntelligence saving throw\b", "INT-Rettungswurf"),
        (r"(?i)\bWisdom saving throw\b", "WIS-Rettungswurf"),
        (r"(?i)\bCharisma saving throw\b", "CHA-Rettungswurf"),
        (r"(?i)\bStärke[- ]Rettungswurf\b", "STR-Rettungswurf"),
        (r"(?i)\bGeschicklichkeits[- ]Rettungswurf\b", "DEX-Rettungswurf"),
        (r"(?i)\bKonstitutions[- ]Rettungswurf\b", "CON-Rettungswurf"),
        (r"(?i)\bIntelligenz[- ]Rettungswurf\b", "INT-Rettungswurf"),
        (r"(?i)\bWeisheits[- ]Rettungswurf\b", "WIS-Rettungswurf"),
        (r"(?i)\bCharisma[- ]Rettungswurf\b", "CHA-Rettungswurf"),
        (r"(?i)\bStrength check\b", "STR-Check"),
        (r"(?i)\bDexterity check\b", "DEX-Check"),
        (r"(?i)\bConstitution check\b", "CON-Check"),
        (r"(?i)\bIntelligence check\b", "INT-Check"),
        (r"(?i)\bWisdom check\b", "WIS-Check"),
        (r"(?i)\bCharisma check\b", "CHA-Check"),
    ]
    for pat, repl in patterns:
        out = re.sub(pat, repl, out)
    return out


def normalize_general_de(text: str, *, exact_units: bool, glossary_rules: Sequence[Dict[str, str]]) -> str:
    out = text
    out = out.replace("’", "'").replace("“", '"').replace("”", '"')
    out = convert_units_de(out, exact=exact_units)
    out = normalize_time_like_text(out)
    out = convert_dice_to_w(out)
    out = normalize_ability_terms(out)
    out = re.sub(r"\b1 Bonusaktion\b", "1 Bonus Aktion", out)
    out = re.sub(r"\b1 Reaktion\b", "1 Reaktion", out)
    out = re.sub(r"\b1 Aktion\b", "1 Aktion", out)
    out = re.sub(r"\bInstantan\b", "Unmittelbar", out, flags=re.IGNORECASE)
    out = re.sub(r"(?i)\bsofort\b", "Unmittelbar", out)
    out = apply_glossary(out, glossary_rules)
    # normalize spacing
    out = re.sub(r"[ \t]+", " ", out)
    out = re.sub(r"\s+([,.;:!?])", r"\1", out)
    out = re.sub(r" ?/ ?", " / ", out)
    return out.strip()


def translate_text_segment(
    client: deepl.DeepLClient,
    text: str,
    *,
    field_name: str,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> str:
    src = text.strip()
    if not src:
        return text

    cache_key = f"{target_lang}::SEG::{field_name}::{src}::{int(exact_units)}::{hash(json.dumps(list(glossary_rules), ensure_ascii=False))}"
    if cache_key in cache:
        return cache[cache_key]

    estimated = estimate_chars_billed(src)
    if estimated > remaining_budget[0]:
        raise BudgetStop(f"Budget would be exceeded by next text segment ({estimated} chars needed, {remaining_budget[0]} left).")

    translated, billed = deepl_translate_text_preserving_tokens(client, src, target_lang=target_lang)
    translated = normalize_general_de(translated, exact_units=exact_units, glossary_rules=glossary_rules)

    cache[cache_key] = translated
    remaining_budget[0] -= billed
    state["translated_count"] = int(state.get("translated_count", 0)) + 1

    if state["translated_count"] % max(1, int(save_every)) == 0:
        save_json(cache_path, cache)
        save_json(state_path, state)

    return translated


# -------------------------
# Field-specific translation
# -------------------------

LEVEL_SCHOOL_RE = re.compile(
    r"(?i)^(?:level\s*(?P<lvl>\d+)\s+(?P<school>[a-z]+)|(?P<school0>[a-z]+)\s+cantrip)(?:\s*\((?P<extra>[^)]+)\))?$"
)
LEVEL_SCHOOL_RE_ALT = re.compile(
    r"(?i)^(?:(?P<lvl>\d+)(?:st|nd|rd|th)[-\s]*level\s+(?P<school>[a-z]+)|(?P<school0>[a-z]+)\s+cantrip)(?:\s*\((?P<extra>[^)]+)\))?$"
)


def translate_level_school(text: str) -> str:
    src = text.strip()
    if not src:
        return src

    m = LEVEL_SCHOOL_RE.match(src) or LEVEL_SCHOOL_RE_ALT.match(src)
    if not m:
        # fallback, common English -> German replacements
        out = src
        for en, de in SCHOOL_DE.items():
            out = re.sub(rf"(?i)\b{re.escape(en)}\b", de, out)
        out = re.sub(r"(?i)\bCantrip\b", "Zaubertrick", out)
        out = re.sub(r"(?i)\bLevel\s+(\d+)\b", r"Level \1", out)
        out = re.sub(r"(?i)\bRitual\b", "Ritual", out)
        return out.strip()

    extra = (m.group("extra") or "").strip()
    school_raw = (m.group("school") or m.group("school0") or "").lower().strip()
    school_de = SCHOOL_DE.get(school_raw, school_raw.title())

    if m.group("school0"):
        out = f"{school_de} Zaubertrick"
    else:
        lvl = int(m.group("lvl"))
        out = f"Level {lvl} {school_de}"

    if extra and re.search(r"(?i)\britual\b", extra):
        out += " (Ritual)"
    return out.strip()


def translate_classes_csv(text: str) -> str:
    src = text.strip()
    if not src:
        return src
    parts = [p.strip() for p in src.split(",") if p.strip()]
    out = [CLASS_DE.get(p.lower(), p) for p in parts]
    return ", ".join(out)


def translate_components(
    text: str,
    *,
    client: deepl.DeepLClient,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> str:
    src = text.strip()
    if not src:
        return src

    mat = ""
    letters = src
    if "(" in src and src.endswith(")"):
        letters, mat = src.split("(", 1)
        letters = letters.strip().rstrip(",")
        mat = "(" + mat.strip()

    letters_out_parts = []
    for part in [p.strip() for p in letters.split(",") if p.strip()]:
        if part.upper() == "S":
            letters_out_parts.append("G")
        else:
            letters_out_parts.append(part.upper())
    letters_out = ", ".join(letters_out_parts)

    if not mat:
        return letters_out

    mat_inner = mat[1:-1].strip()
    mat_de = translate_text_segment(
        client,
        mat_inner,
        field_name="components_material",
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )
    return f"{letters_out} ({mat_de})"


def translate_casting_time(
    text: str,
    *,
    client: deepl.DeepLClient,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> str:
    src = text.strip()
    if not src:
        return src

    exact_map = {
        "action": "1 Aktion",
        "bonus action": "1 Bonus Aktion",
        "reaction": "1 Reaktion",
        "1 minute": "1 min",
        "10 minutes": "10 min",
        "1 hour": "1 h",
        "8 hours": "8 h",
        "special": "Spezial",
    }
    if src.lower() in exact_map:
        return exact_map[src.lower()]

    # force the leading action type into the expected style before translation
    pre = src
    pre = re.sub(r"(?i)^Bonus Action\b", "1 Bonus Aktion", pre)
    pre = re.sub(r"(?i)^Action\b", "1 Aktion", pre)
    pre = re.sub(r"(?i)^Reaction\b", "1 Reaktion", pre)
    pre = normalize_time_like_text(pre)

    if re.search(r"[A-Za-z]", pre):
        out = translate_text_segment(
            client,
            pre,
            field_name="casting_time",
            target_lang=target_lang,
            cache=cache,
            remaining_budget=remaining_budget,
            state=state,
            save_every=save_every,
            cache_path=cache_path,
            state_path=state_path,
            exact_units=exact_units,
            glossary_rules=glossary_rules,
        )
        out = re.sub(r"(?i)\b1 action\b", "1 Aktion", out)
        out = re.sub(r"(?i)\b1 bonus action\b", "1 Bonus Aktion", out)
        out = re.sub(r"(?i)\b1 reaction\b", "1 Reaktion", out)
        return out

    return normalize_general_de(pre, exact_units=exact_units, glossary_rules=glossary_rules)


def translate_range(text: str) -> str:
    src = text.strip()
    if not src:
        return src

    low = src.lower()
    if low in RANGE_WORD_DE:
        return RANGE_WORD_DE[low]

    # Self (30-foot Radius)
    m = re.match(r"(?i)^self\s*\(\s*(.+?)\s*\)$", src)
    if m:
        inner = m.group(1)
        inner = convert_units_de(inner, exact=False)
        for en, de in SHAPE_DE.items():
            inner = re.sub(rf"(?i)\b{re.escape(en)}\b", de, inner)
        inner = normalize_general_de(inner, exact_units=False, glossary_rules=EMBEDDED_GLOSSARY_RULES)
        return f"Selbst ({inner})"

    # Self / 10 feet
    m = re.match(r"(?i)^self\s*/\s*(.+)$", src)
    if m:
        rhs = normalize_general_de(m.group(1), exact_units=False, glossary_rules=EMBEDDED_GLOSSARY_RULES)
        return f"Selbst / {rhs}"

    out = src
    for en, de in RANGE_WORD_DE.items():
        out = re.sub(rf"(?i)\b{re.escape(en)}\b", de, out)
    for en, de in SHAPE_DE.items():
        out = re.sub(rf"(?i)\b{re.escape(en)}\b", de, out)
    out = normalize_general_de(out, exact_units=False, glossary_rules=EMBEDDED_GLOSSARY_RULES)
    return out


def translate_duration(text: str) -> str:
    src = text.strip()
    if not src:
        return src

    low = src.lower()
    if low == "instantaneous":
        return "Unmittelbar"
    if low == "special":
        return "Spezial"
    if low == "until dispelled":
        return "Bis Zauber gebannt wird"

    m = re.match(r"(?i)^concentration,\s*up to\s+(\d+(?:\.\d+)?)\s+(round|rounds|minute|minutes|hour|hours|day|days)$", src)
    if m:
        return f"Konzentration, bis zu {format_de_duration_value(float(m.group(1)), m.group(2))}"

    m = re.match(r"(?i)^up to\s+(\d+(?:\.\d+)?)\s+(round|rounds|minute|minutes|hour|hours|day|days)$", src)
    if m:
        return f"bis zu {format_de_duration_value(float(m.group(1)), m.group(2))}"

    m = re.match(r"(?i)^(\d+(?:\.\d+)?)\s+(round|rounds|minute|minutes|hour|hours|day|days)$", src)
    if m:
        return format_de_duration_value(float(m.group(1)), m.group(2))

    out = src
    out = re.sub(r"(?i)^Concentration,\s*up to\b", "Konzentration, bis zu", out)
    out = re.sub(r"(?i)^Up to\b", "bis zu", out)
    out = normalize_general_de(out, exact_units=False, glossary_rules=EMBEDDED_GLOSSARY_RULES)
    return out


def translate_name(
    text: str,
    *,
    client: deepl.DeepLClient,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> str:
    return translate_text_segment(
        client,
        text,
        field_name="name",
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )


def translate_html_description(
    html_text: str,
    *,
    client: deepl.DeepLClient,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> str:
    src = html_text.strip()
    if not src:
        return src

    # Pre-normalize the two known higher-level headings before segment translation.
    src = src.replace("<b>Using a Higher-Level Spell Slot:</b>", "__HL_SLOT__")
    src = src.replace("<b>Using a Higher-Level Spell Slot.</b>", "__HL_SLOT__")
    src = src.replace("<b>At Higher Levels:</b>", "__HL_CANTRIP__")
    src = src.replace("<b>At Higher Levels.</b>", "__HL_CANTRIP__")

    parts = re.split(r"(<[^>]+>|__HL_SLOT__|__HL_CANTRIP__)", src)
    out_parts: List[str] = []

    for part in parts:
        if not part:
            continue
        if part == "__HL_SLOT__":
            out_parts.append("<b>Auf höheren Level gewirkt:</b>")
            continue
        if part == "__HL_CANTRIP__":
            out_parts.append("<b>Auf höheren Level:</b>")
            continue
        if part.startswith("<") and part.endswith(">"):
            out_parts.append(part)
            continue

        translated = translate_text_segment(
            client,
            part,
            field_name="description_html",
            target_lang=target_lang,
            cache=cache,
            remaining_budget=remaining_budget,
            state=state,
            save_every=save_every,
            cache_path=cache_path,
            state_path=state_path,
            exact_units=exact_units,
            glossary_rules=glossary_rules,
        )
        out_parts.append(translated)

    out = "".join(out_parts)
    out = re.sub(r"<br\s*/?>", "<br>", out, flags=re.IGNORECASE)
    out = re.sub(r"\s*<br>\s*", "<br>", out)
    out = re.sub(r"(<br>){3,}", "<br><br>", out)
    return out.strip()


def normalize_row(row: List[str]) -> List[str]:
    fixed = list(row[:CSV_COLS]) + [""] * max(0, CSV_COLS - len(row))
    if len(fixed) > CSV_COLS:
        fixed = fixed[:CSV_COLS]
    return fixed


def translate_row(
    row: List[str],
    *,
    client: deepl.DeepLClient,
    target_lang: str,
    cache: Dict[str, str],
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    exact_units: bool,
    glossary_rules: Sequence[Dict[str, str]],
) -> List[str]:
    r = normalize_row(row)

    level = r[IDX_LEVEL].strip()

    name = translate_name(
        r[IDX_NAME],
        client=client,
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )

    level_school = translate_level_school(r[IDX_LEVEL_SCHOOL])

    casting_time = translate_casting_time(
        r[IDX_CASTING_TIME],
        client=client,
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )

    range_de = translate_range(r[IDX_RANGE])

    components_de = translate_components(
        r[IDX_COMPONENTS],
        client=client,
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )
    # components column in your CSV style should only keep the V/G/M letters.
    if "(" in components_de and components_de.endswith(")"):
        components_letters = components_de.split("(", 1)[0].strip().rstrip(",")
    else:
        components_letters = components_de

    duration_de = translate_duration(r[IDX_DURATION])

    desc_de = translate_html_description(
        r[IDX_DESCRIPTION],
        client=client,
        target_lang=target_lang,
        cache=cache,
        remaining_budget=remaining_budget,
        state=state,
        save_every=save_every,
        cache_path=cache_path,
        state_path=state_path,
        exact_units=exact_units,
        glossary_rules=glossary_rules,
    )

    classes_de = translate_classes_csv(r[IDX_CLASSES])

    return [
        level,
        name,
        level_school,
        casting_time,
        range_de,
        components_letters,
        duration_de,
        desc_de,
        classes_de,
        "",
    ]


# -------------------------
# Main
# -------------------------

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="in_csv", required=True, help="Input spell CSV, e.g. Alle_Zauber_3-9_en.csv")
    ap.add_argument("--out", dest="out_csv", required=True, help="Output German spell CSV, e.g. Alle_Zauber_3-9.csv")
    ap.add_argument("--target", default="DE", help="DeepL target language code. Default: DE")
    ap.add_argument("--margin", type=int, default=15000, help="Safety margin in DeepL chars. Stop before limit by this much.")
    ap.add_argument("--cache", default="translation_cache_spells_deepl.json", help="Cache JSON for translated text segments")
    ap.add_argument("--state", default="translation_state_spells_deepl.json", help="State/checkpoint JSON")
    ap.add_argument("--save-every", type=int, default=50, help="Persist cache/state every N translated segments")
    ap.add_argument("--encoding-in", default="", help="Optional input CSV encoding override")
    ap.add_argument("--encoding-out", default="cp1252", help="Output CSV encoding. Default: cp1252 to match your existing German CSV style.")
    ap.add_argument("--exact-units", action="store_true", help="Use exact unit conversion instead of D&D-friendly rounded conversion.")
    ap.add_argument("--glossary", default="", help="Optional JSON glossary file with {'rules':[{'pattern':'...','replace':'...'}]}")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing output file")
    args = ap.parse_args()

    existing_output_rows: List[List[str]] = []
    if os.path.exists(args.out_csv) and not args.overwrite:
        # Allow resume from a partial translation instead of forcing a restart.
        try:
            existing_output_rows, _ = read_csv_rows(args.out_csv, encoding_hint=args.encoding_out)
        except Exception:
            existing_output_rows = []

    auth_key = os.getenv("DEEPL_AUTH_KEY")
    if not auth_key:
        raise SystemExit("Missing DEEPL_AUTH_KEY environment variable.")

    cache: Dict[str, str] = load_json(args.cache, {})
    state: Dict[str, Any] = load_json(args.state, {"translated_count": 0, "completed_rows": 0})

    glossary_rules = list(EMBEDDED_GLOSSARY_RULES)
    glossary_rules.extend(load_glossary(args.glossary))

    client = deepl.DeepLClient(auth_key)
    usage = client.get_usage()
    if not usage.character.valid:
        raise SystemExit("DeepL usage.character is not valid for this account/key.")

    used = int(usage.character.count)
    limit = int(usage.character.limit)
    remaining = max(0, limit - used - int(args.margin))
    if remaining <= 0:
        raise SystemExit(f"Stop: remaining DeepL budget <= 0 (used {used} / limit {limit}, margin {args.margin}).")
    remaining_budget = [remaining]

    rows, detected_encoding = read_csv_rows(args.in_csv, encoding_hint=(args.encoding_in or None))
    if not rows:
        raise SystemExit("Input CSV is empty.")

    out_rows: List[List[str]] = [normalize_row(r) for r in existing_output_rows]
    total = len(rows)
    start_index = len(out_rows)

    completed_rows = int(state.get("completed_rows", 0))
    if completed_rows > start_index:
        start_index = min(completed_rows, total)
        out_rows = out_rows[:start_index]
    elif completed_rows < start_index:
        out_rows = out_rows[:completed_rows]
        start_index = len(out_rows)

    if start_index >= total and not args.overwrite:
        raise SystemExit(f"Output already exists and appears complete: {args.out_csv!r}. Use --overwrite to replace it.")

    for idx, row in enumerate(rows[start_index:], start=start_index):
        try:
            translated_row = translate_row(
                row,
                client=client,
                target_lang=args.target,
                cache=cache,
                remaining_budget=remaining_budget,
                state=state,
                save_every=args.save_every,
                cache_path=args.cache,
                state_path=args.state,
                exact_units=bool(args.exact_units),
                glossary_rules=glossary_rules,
            )
        except BudgetStop as e:
            save_json(args.cache, cache)
            state["completed_rows"] = len(out_rows)
            save_json(args.state, state)
            if out_rows:
                write_csv_rows(out_rows, args.out_csv, args.encoding_out)
            print(f"Stopped before quota at row {idx+1}/{total}: {e}")
            return 0

        out_rows.append(translated_row)
        state["completed_rows"] = len(out_rows)

        if (idx + 1) % max(1, int(args.save_every)) == 0:
            save_json(args.cache, cache)
            save_json(args.state, state)
            write_csv_rows(out_rows, args.out_csv, args.encoding_out)
            print(f"Progress: {idx+1}/{total} rows translated (budget left ~ {remaining_budget[0]} chars)")

    write_csv_rows(out_rows, args.out_csv, args.encoding_out)
    save_json(args.cache, cache)
    save_json(args.state, state)

    print(f"Done. Wrote {len(out_rows)} rows to {args.out_csv!r}.")
    print(f"Input encoding: {detected_encoding}. Output encoding: {args.encoding_out}.")
    print(f"DeepL budget left ~ {remaining_budget[0]} chars.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
