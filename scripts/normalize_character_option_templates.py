#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Normalize imported character option JSON files to the local templates."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
OPTION_DIRS = {
    "feat": ROOT / "data" / "feats",
    "background": ROOT / "data" / "backgrounds",
    "race": ROOT / "data" / "races",
    "class": ROOT / "data" / "classes",
    "subclass": ROOT / "data" / "classes" / "subclasses",
}


LICENSE_DEFAULT = {
    "name": "Creative Commons Attribution-ShareAlike 3.0 License",
    "spdx": "CC-BY-SA-3.0",
    "url": "https://creativecommons.org/licenses/by-sa/3.0/",
}

MOJIBAKE_RE = re.compile(r"(?:Ã.|Â.|â.|Å.|Æ.|æ.|œ|ž)")

ABILITY_ALIASES = {
    "staerke": "str",
    "starke": "str",
    "stärke": "str",
    "strength": "str",
    "geschicklichkeit": "dex",
    "geschick": "dex",
    "dexterity": "dex",
    "konstitution": "con",
    "constitution": "con",
    "intelligenz": "int",
    "intelligence": "int",
    "weisheit": "wis",
    "wisdom": "wis",
    "charisma": "cha",
}

SKILL_ALIASES = {
    "akrobatik": "Akrobatik",
    "arcana": "Arkana",
    "arkana": "Arkana",
    "athletik": "Athletik",
    "leichtathletik": "Athletik",
    "einsicht": "Einsicht",
    "geschichte": "Geschichte",
    "heimlichkeit": "Heimlichkeit",
    "ueberleben": "Ueberleben",
    "überleben": "Ueberleben",
    "überzeugung": "Ueberzeugung",
    "ueberzeugung": "Ueberzeugung",
    "einschüchterung": "Einschuechterung",
    "einschuechterung": "Einschuechterung",
    "wahrnehmung": "Wahrnehmung",
    "auftreten": "Auftreten",
    "leistung": "Auftreten",
    "taeuschung": "Taeuschung",
    "täuschung": "Taeuschung",
    "fingerfertigkeit": "Fingerfertigkeit",
    "medizin": "Medizin",
    "natur": "Natur",
    "religion": "Religion",
    "untersuchung": "Untersuchung",
    "forschung": "Untersuchung",
    "tierhandhabung": "Tierhandhabung",
    "umgang mit tieren": "Tierhandhabung",
}

CLASS_SPELL_LISTS = {
    "artificer": ["Artificer"],
    "barbar": [],
    "barde": ["Barde", "Bard"],
    "druide": ["Druide", "Druid"],
    "hexenmeister": ["Hexenmeister", "Warlock"],
    "kaempfer": [],
    "kleriker": ["Kleriker", "Cleric"],
    "magier": ["Magier", "Wizard"],
    "moench": [],
    "paladin": ["Paladin"],
    "schurke": [],
    "waldlaeufer": ["Waldlaeufer", "Ranger"],
    "waldlaufer": ["Waldlaeufer", "Ranger"],
    "zauberer": ["Zauberer", "Sorcerer"],
}

SPELLCASTING_ABILITIES_BY_CLASS = {
    "artificer": "int",
    "barde": "cha",
    "druide": "wis",
    "hexenmeister": "cha",
    "kleriker": "wis",
    "magier": "int",
    "paladin": "cha",
    "waldlaeufer": "wis",
    "waldlaufer": "wis",
    "zauberer": "cha",
}


def repair_text(value: str) -> str:
    result = value
    for _ in range(3):
        if not MOJIBAKE_RE.search(result):
            return result
        try:
            repaired = result.encode("cp1252").decode("utf-8")
        except UnicodeError:
            return result
        if repaired == result:
            return result
        result = repaired
    return result


def repair_deep(value: Any) -> Any:
    if isinstance(value, str):
        return repair_text(value)
    if isinstance(value, list):
        return [repair_deep(item) for item in value]
    if isinstance(value, dict):
        return {key: repair_deep(item) for key, item in value.items()}
    return value


def load_json(path: Path) -> dict[str, Any]:
    raw = path.read_text(encoding="utf-8-sig")
    if not raw.strip():
        return {"id": path.stem, "name": path.stem.replace("-", " ").title()}
    return json.loads(raw)


def save_json(path: Path, data: dict[str, Any]) -> None:
    data = repair_deep(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def as_list(value: Any) -> list[Any]:
    if value is None or value == "":
        return []
    if isinstance(value, list):
        return value
    return [value]


def norm_key(value: str) -> str:
    return (
        repair_text(str(value or ""))
        .strip()
        .lower()
        .replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "ss")
    )


def slugify(value: str) -> str:
    text = norm_key(value)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def normalize_ability_name(value: str) -> str | None:
    key = norm_key(value)
    return ABILITY_ALIASES.get(key)


def normalize_skill_name(value: str) -> str:
    text = repair_text(str(value or "")).strip()
    return SKILL_ALIASES.get(norm_key(text), text)


def split_list_text(value: str) -> list[str]:
    text = repair_text(str(value or ""))
    text = re.sub(r"\b(?:und|oder)\b", ",", text, flags=re.I)
    text = text.replace(";", ",")
    return [part.strip(" .:") for part in text.split(",") if part.strip(" .:")]


def parse_ability_list(value: str) -> list[str]:
    out: list[str] = []
    text = norm_key(value)
    ordered = [
        ("str", ["staerke", "starke", "strength"]),
        ("dex", ["geschicklichkeit", "geschick", "dexterity"]),
        ("con", ["konstitution", "constitution"]),
        ("int", ["intelligenz", "intelligence"]),
        ("wis", ["weisheit", "wisdom"]),
        ("cha", ["charisma"]),
    ]
    for ability, labels in ordered:
        if any(re.search(rf"\b{re.escape(label)}\b", text) for label in labels):
            out.append(ability)
    return out


def parse_skill_list(value: str) -> list[str]:
    value = re.sub(r"^w[aä]hlen sie?\s*\d+\s*:?", "", value, flags=re.I)
    return [normalize_skill_name(part) for part in split_list_text(value)]


def parse_choice_line(value: str, label: str) -> dict[str, Any]:
    text = repair_text(value)
    match = re.search(r"w[aä]hl(?:en)?(?:\s+sie)?\s+(\d+)", text, flags=re.I)
    choose = int(match.group(1)) if match else 0
    after_colon = text.split(":", 1)[1] if ":" in text else text
    return {"choose": choose, "options": parse_skill_list(after_colon)}


def extract_section_value(text: str, start: str, stops: list[str]) -> str:
    source = repair_text(text)
    start_match = re.search(rf"{re.escape(start)}\s*:", source, flags=re.I)
    if not start_match:
        return ""
    begin = start_match.end()
    end = len(source)
    for stop in stops:
        stop_match = re.search(rf"\s{re.escape(stop)}\s*:", source[begin:], flags=re.I)
        if stop_match:
            end = min(end, begin + stop_match.start())
    return source[begin:end].strip(" .")


def table_rows(entries: list[dict[str, Any]]) -> list[list[str]]:
    rows: list[list[str]] = []
    for entry in entries:
        if entry.get("type") == "table" and isinstance(entry.get("rows"), list):
            rows.extend([[repair_text(str(cell)) for cell in row] for row in entry["rows"] if isinstance(row, list)])
    return rows


def find_core_table(entries: list[dict[str, Any]]) -> dict[str, str]:
    out: dict[str, str] = {}
    for entry in entries:
        rows = entry.get("rows") if entry.get("type") == "table" else None
        if not isinstance(rows, list):
            continue
        flat = " ".join(" ".join(str(cell) for cell in row) for row in rows).lower()
        if "kerneigenschaften" not in flat and "core" not in flat:
            continue
        for row in rows:
            if isinstance(row, list) and len(row) >= 2:
                out[norm_key(str(row[0]))] = repair_text(str(row[1]))
        break
    return out


def parse_hit_die(value: str) -> int | None:
    match = re.search(r"\b[dw](\d+)\b", repair_text(value), flags=re.I)
    return int(match.group(1)) if match else None


def parse_speed_feet_to_meters(value: str) -> int | None:
    match = re.search(r"(\d+)", repair_text(value), flags=re.I)
    if not match:
        return None
    return round(int(match.group(1)) * 0.3048)


def parse_size_options(value: str) -> list[str]:
    text = repair_text(value)
    out = []
    patterns = [
        ("Winzig", r"\bWinzig\b"),
        ("Klein", r"\bKlein\b"),
        ("Mittel", r"\bMittel\b"),
        ("Gross", r"\b(?:Gross|Gro\u00df)\b(?=\s*(?:[,;/]|oder|und|$))"),
        ("Riesig", r"\bRiesig\b"),
        ("Gigantisch", r"\bGigantisch\b"),
    ]
    for label, pattern in patterns:
        if re.search(pattern, text, flags=re.I) and label not in out:
            out.append(label)
    return out


def parse_level_tables(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    levels: dict[int, dict[str, Any]] = {}
    for entry in entries:
        rows = entry.get("rows") if entry.get("type") == "table" else None
        if not isinstance(rows, list) or len(rows) < 2:
            continue
        header = [norm_key(str(cell)) for cell in rows[0]]
        if not header or header[0] not in {"ebene", "stufe", "level"}:
            continue
        for row in rows[1:]:
            if not isinstance(row, list) or not row:
                continue
            try:
                level = int(str(row[0]).strip())
            except ValueError:
                continue
            target = levels.setdefault(level, {"level": level})
            for idx, key in enumerate(header[1:], start=1):
                value = repair_text(str(row[idx])) if idx < len(row) else ""
                if not value or value == "-":
                    continue
                if key in {"uebungsbonus", "ubungsbonus", "proficiency bonus"}:
                    target["proficiency_bonus"] = value
                elif "talent" in key or "feature" in key:
                    target["features"] = [part.strip() for part in value.split(",") if part.strip()]
                elif "zaubertrick" in key or "cantrip" in key:
                    target["cantrips_known"] = int(value) if value.isdigit() else value
                elif "vorbereitete" in key or "known" in key:
                    target["prepared_spells"] = int(value) if value.isdigit() else value
                elif re.fullmatch(r"\d+", key):
                    slots = target.setdefault("spell_slots", {})
                    slots[key] = int(value) if value.isdigit() else value
                else:
                    target[key] = value
    return [levels[level] for level in sorted(levels)]


def spellcasting_from(data: dict[str, Any], entries: list[dict[str, Any]], levels: list[dict[str, Any]]) -> dict[str, Any]:
    existing = data.get("spellcasting") if isinstance(data.get("spellcasting"), dict) else {}
    class_id = str(data.get("id") or "")
    ability = existing.get("ability") or SPELLCASTING_ABILITIES_BY_CLASS.get(class_id)
    text = repair_text(data.get("text", ""))
    ability_match = re.search(r"Zauberf[aä]higkeit\.\s*(Intelligenz|Weisheit|Charisma)", text, flags=re.I)
    if ability_match:
        ability = normalize_ability_name(ability_match.group(1)) or ability
    has_spell_slots = any(level.get("spell_slots") for level in levels)
    progression = existing.get("progression")
    if not progression:
        progression = "full" if has_spell_slots else None
        if class_id in {"paladin", "waldlaeufer", "waldlaufer"} and has_spell_slots:
            progression = "half"
        if class_id == "hexenmeister" and has_spell_slots:
            progression = "pact"
    focus_types = existing.get("focus_types") or []
    if "Zauberfokus" in text:
        focus_sentence = re.search(r"Zauberfokus\.\s*(.*?)(?:\n|$)", text, flags=re.S)
        if focus_sentence:
            focus_types = split_list_text(focus_sentence.group(1))
    return {
        "ability": ability,
        "progression": progression,
        "preparation_formula": existing.get("preparation_formula"),
        "known_formula": existing.get("known_formula"),
        "focus_types": focus_types,
        "spell_list_names": CLASS_SPELL_LISTS.get(class_id, []),
        "uses_spell_slots": has_spell_slots,
    }


def infer_spell_choice_sets(text: str, source: str) -> list[dict[str, Any]]:
    clean = repair_text(text)
    out: list[dict[str, Any]] = []
    cantrip_match = re.search(r"(?:lernen|kennst|kennen)\s+(\w+|\d+)\s+(?:Cantrips|Zaubertricks)", clean, flags=re.I)
    if cantrip_match:
        raw = cantrip_match.group(1).lower()
        number = {"einen": 1, "eine": 1, "zwei": 2, "drei": 3}.get(raw, int(raw) if raw.isdigit() else 1)
        out.append({"id": f"{source}-cantrips", "type": "spell", "choose": number, "spell_levels": [0], "source": source})
    level1_match = re.search(r"(?:w[aä]hlen|lernst|lernen).*?(?:einen|1)\s+Zauber(?:spruch)?\s+der\s+Stufe\s+1", clean, flags=re.I)
    if level1_match:
        out.append({"id": f"{source}-level-1-spell", "type": "spell", "choose": 1, "spell_levels": [1], "source": source})
    if "Zauberliste" in clean:
        lists = []
        for label in ["Kleriker", "Druide", "Zauberer", "Barde", "Magier", "Hexenmeister", "Paladin", "Waldlaeufer", "Waldläufer"]:
            if label in clean:
                lists.append("Waldlaeufer" if label == "Waldläufer" else label)
        for entry in out:
            entry["spell_list_names"] = sorted(set(lists))
    return out


def germanize_entry(value: Any) -> Any:
    if isinstance(value, list):
        return [germanize_entry(item) for item in value]
    if not isinstance(value, dict):
        return value

    converted: dict[str, Any] = {}
    for key, raw in value.items():
        if key in {"text_de", "rows_de", "items_de"}:
            continue
        if key == "text":
            converted[key] = value.get("text_de", raw)
        elif key == "rows":
            converted[key] = germanize_entry(value.get("rows_de", raw))
        elif key == "items":
            converted[key] = germanize_entry(value.get("items_de", raw))
        else:
            converted[key] = germanize_entry(raw)

    if "text" not in converted and "text_de" in value:
        converted["text"] = value["text_de"]
    if "rows" not in converted and "rows_de" in value:
        converted["rows"] = germanize_entry(value["rows_de"])
    if "items" not in converted and "items_de" in value:
        converted["items"] = germanize_entry(value["items_de"])
    return converted


def entries_from(data: dict[str, Any]) -> list[dict[str, Any]]:
    entries = data.get("entries", [])
    if not isinstance(entries, list):
        return []
    return [entry for entry in germanize_entry(entries) if isinstance(entry, dict)]


def text_from(data: dict[str, Any], entries: list[dict[str, Any]]) -> str:
    if isinstance(data.get("text"), str) and data["text"].strip():
        return data["text"].strip()
    parts: list[str] = []
    for entry in entries:
        text = entry.get("text")
        if isinstance(text, str) and text.strip():
            parts.append(text.strip())
    return "\n\n".join(parts)


def common(data: dict[str, Any], option_type: str, entries: list[dict[str, Any]]) -> dict[str, Any]:
    prerequisite = data.get("prerequisite")
    translation_note = data.get("translation_note")
    if translation_note == "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Originaltext bleibt zur Kontrolle enthalten.":
        translation_note = "Automatisch aus dem englischen Wikidot-Text ins Deutsche uebersetzt; Inhalte wurden auf den deutschen Text normalisiert."
    result = {
        "id": data.get("id", ""),
        "type": option_type,
        "name": data.get("name", ""),
        "original_name": data.get("original_name"),
        "rules_version": data.get("rules_version", "2024"),
        "source": data.get("source", ""),
        "source_url": data.get("source_url"),
        "source_page": data.get("source_page"),
        "license": data.get("license", LICENSE_DEFAULT),
        "translation_note": translation_note,
        "category": data.get("category", ""),
        "group": data.get("group", ""),
        "prerequisites": data.get("prerequisites", as_list(prerequisite)),
        "summary": data.get("summary", ""),
        "entries": entries,
        "text": text_from(data, entries),
        "tags": data.get("tags", []),
    }
    return result


def normalize_feat(data: dict[str, Any]) -> dict[str, Any]:
    entries = entries_from(data)
    result = common(data, "feat", entries)
    text = result.get("text", "")
    choice_sets = data.get("choice_sets", [])
    inferred_spell_choices = infer_spell_choice_sets(text, result.get("id", "feat"))
    if inferred_spell_choices:
        existing_ids = {entry.get("id") for entry in choice_sets if isinstance(entry, dict)}
        choice_sets = [*choice_sets, *[entry for entry in inferred_spell_choices if entry["id"] not in existing_ids]]
    modifiers = data.get("modifiers", [])
    ability_increase = re.search(
        r"Erh[öo]hen Sie Ihren?\s+([A-Za-zÄÖÜäöüß]+)wert\s+um\s+(\d+)",
        text,
        flags=re.I,
    )
    if ability_increase:
        ability = normalize_ability_name(ability_increase.group(1))
        if ability:
            modifiers = [
                *modifiers,
                {
                    "type": "ability_score_bonus",
                    "ability": ability,
                    "value": int(ability_increase.group(2)),
                    "max": 20,
                    "source": result["id"],
                    "inferred": True,
                },
            ]
    result.update(
        {
            "modifiers": modifiers,
            "granted_action_ids": data.get("granted_action_ids", []),
            "granted_spell_ids": data.get("granted_spell_ids", []),
            "granted_feature_ids": data.get("granted_feature_ids", []),
            "choice_sets": choice_sets,
            "spellcasting": {
                "ability_choices": parse_ability_list(text),
                "spell_choices": inferred_spell_choices,
                "always_prepared": "immer vorbereitet" in text.lower(),
            },
        }
    )
    return result


def normalize_background(data: dict[str, Any]) -> dict[str, Any]:
    entries = entries_from(data)
    result = common(data, "background", entries)
    text = result.get("text", "")
    ability_text = extract_section_value(text, "Fähigkeitswerte", ["Talent", "Fertigkeiten", "Werkzeugkompetenz", "Ausrüstung"])
    if not ability_text:
        ability_text = extract_section_value(text, "Faehigkeitswerte", ["Talent", "Fertigkeiten", "Werkzeugkompetenz", "Ausrüstung"])
    skill_text = extract_section_value(text, "Fertigkeiten", ["Werkzeugkompetenz", "Ausrüstung"])
    tool_text = extract_section_value(text, "Werkzeugkompetenz", ["Ausrüstung"])
    feat_text = extract_section_value(text, "Talent", ["Fertigkeiten", "Werkzeugkompetenz", "Ausrüstung"])
    equipment_text = extract_section_value(text, "Ausrüstung", [])
    spell_choices: list[dict[str, Any]] = []
    spell_ability = None
    initiate_match = re.search(r"Eingeweihter\s*\(([^)]+)\)", feat_text, flags=re.I)
    if initiate_match:
        spell_list_name = initiate_match.group(1).strip()
        spell_ability = SPELLCASTING_ABILITIES_BY_CLASS.get(slugify(spell_list_name))
        spell_choices = [
            {
                "id": f"{result['id']}-background-cantrips",
                "type": "spell",
                "choose": 2,
                "spell_levels": [0],
                "source": result["id"],
                "spell_list_names": [spell_list_name],
            },
            {
                "id": f"{result['id']}-background-level-1-spell",
                "type": "spell",
                "choose": 1,
                "spell_levels": [1],
                "source": result["id"],
                "spell_list_names": [spell_list_name],
            },
        ]
    result.update(
        {
            "ability_scores": parse_ability_list(ability_text),
            "ability_score_choices": {"choose": 3, "options": parse_ability_list(ability_text), "bonuses": [2, 1]},
            "skill_proficiencies": parse_skill_list(skill_text),
            "tool_proficiencies": split_list_text(tool_text),
            "language_choices": data.get("language_choices", {"choose": 0, "options": []}),
            "granted_feat_id": slugify(feat_text) if feat_text else data.get("granted_feat_id"),
            "granted_feat_name": feat_text or data.get("granted_feat_name"),
            "modifiers": data.get("modifiers", []),
            "choice_sets": [*data.get("choice_sets", []), *spell_choices],
            "spellcasting": {
                "ability": spell_ability,
                "spell_choices": spell_choices,
                "always_prepared": bool(spell_choices),
            },
            "starting_equipment": [{"text": equipment_text}] if equipment_text else [],
        }
    )
    return result


def normalize_race(data: dict[str, Any]) -> dict[str, Any]:
    entries = entries_from(data)
    result = common(data, "race", entries)
    text = result.get("text", "")
    type_match = re.search(r"Kreaturentyp\s*:\s*([^.\n]+)", text, flags=re.I)
    size_match = re.search(
        r"Gr(?:\u00f6|\u00d6|o|oe)?(?:\u00df|ss|s)e\s*:\s*(.+?)(?=\s+(?:Geschwindigkeit|Kreaturentyp|Quelle)\s*:|$)",
        text,
        flags=re.I | re.S,
    )
    speed_match = re.search(r"Geschwindigkeit\s*:\s*([^.\n]+)", text, flags=re.I)
    traits = data.get("traits", [])
    if not traits:
        for entry in entries:
            if entry.get("type") != "paragraph":
                continue
            paragraph = repair_text(entry.get("text", ""))
            trait_match = re.match(r"([^.:]{3,60})\.\s+(.+)$", paragraph, flags=re.S)
            if trait_match and not trait_match.group(1).lower().startswith(("quelle", "kreaturentyp", "als ")):
                traits.append({"name": trait_match.group(1).strip(), "text": trait_match.group(2).strip()})
    choice_sets = data.get("choice_sets", [])
    for trait in traits:
        if isinstance(trait, dict):
            choice_sets.extend(infer_spell_choice_sets(trait.get("text", ""), f"{result['id']}-{slugify(trait.get('name', 'trait'))}"))
    result.update(
        {
            "size": parse_size_options(size_match.group(1)) if size_match else data.get("size", []),
            "creature_type": (type_match.group(1).strip() if type_match else "") or data.get("creature_type", ""),
            "speed": {
                "walk": parse_speed_feet_to_meters(speed_match.group(1)) if speed_match else data.get("speed", {}).get("walk"),
                "fly": data.get("speed", {}).get("fly"),
                "swim": data.get("speed", {}).get("swim"),
                "climb": data.get("speed", {}).get("climb"),
                "burrow": data.get("speed", {}).get("burrow"),
            },
            "languages": data.get("languages", []),
            "senses": data.get("senses", []),
            "traits": traits,
            "modifiers": data.get("modifiers", []),
            "granted_feature_ids": data.get("granted_feature_ids", []),
            "choice_sets": choice_sets,
        }
    )
    return result


def normalize_class(data: dict[str, Any]) -> dict[str, Any]:
    entries = entries_from(data)
    result = common(data, "class", entries)
    core = find_core_table(entries)
    levels = data.get("levels") or parse_level_tables(entries)
    primary = data.get("primary_abilities") or parse_ability_list(core.get("primaere faehigkeit", "") or core.get("primare fahigkeit", "") or core.get("primary ability", ""))
    saving_throws = data.get("proficiencies", {}).get("saving_throws") if isinstance(data.get("proficiencies"), dict) else []
    if not saving_throws:
        saving_throws = parse_ability_list(core.get("rettungswurf-kenntnisse", "") or core.get("rettungswurf-faehigkeiten", "") or core.get("saving throw proficiencies", ""))
    skills_raw = core.get("fertigkeiten", "")
    existing_skill_choices = data.get("skill_choices") if isinstance(data.get("skill_choices"), dict) else {}
    skill_choices = existing_skill_choices if existing_skill_choices.get("choose", 0) else parse_choice_line(skills_raw, "skills")
    proficiencies = data.get("proficiencies", {"saving_throws": [], "armor": [], "weapons": [], "tools": []})
    proficiencies.update(
        {
            "saving_throws": saving_throws,
            "armor": [x for x in split_list_text(core.get("ruestungstraining", "") or core.get("rüstungstraining", "")) if norm_key(x) not in {"keiner", "keine"}],
            "weapons": [x for x in split_list_text(core.get("waffenkenntnisse", "")) if norm_key(x) not in {"keiner", "keine"}],
            "tools": split_list_text(core.get("werkzeugkenntnisse", "")),
        }
    )
    result.update(
        {
            "hit_die": data.get("hit_die") or parse_hit_die(core.get("trefferpunktwuerfel", "") or core.get("trefferpunktwurfel", "") or core.get("hit point die", "")),
            "primary_abilities": primary,
            "proficiencies": proficiencies,
            "skill_choices": skill_choices,
            "spellcasting": spellcasting_from(data, entries, levels),
            "starting_equipment": data.get("starting_equipment", {"fixed": [], "choices": []}),
            "multiclass_requirements": data.get("multiclass_requirements", {"minimum_abilities": {}}),
            "levels": levels,
            "subclasses": data.get("subclasses", []),
            "subclass_index": data.get("subclass_index", []),
        }
    )
    return result


def normalize_subclass(data: dict[str, Any]) -> dict[str, Any]:
    entries = entries_from(data)
    result = common(data, "subclass", entries)
    result.update(
        {
            "class": data.get("class", ""),
            "class_id": data.get("class_id", ""),
            "spellcasting_overrides": data.get(
                "spellcasting_overrides",
                {"ability": None, "extra_spell_ids": []},
            ),
            "levels": data.get("levels", []),
        }
    )
    return result


NORMALIZERS = {
    "feat": normalize_feat,
    "background": normalize_background,
    "race": normalize_race,
    "class": normalize_class,
    "subclass": normalize_subclass,
}


def normalize_dir(option_type: str, directory: Path) -> int:
    files: list[str] = []
    count = 0
    for path in sorted(directory.glob("*.json")):
        if path.name == "index.json":
            continue
        data = load_json(path)
        normalized = NORMALIZERS[option_type](data)
        save_json(path, normalized)
        files.append(path.name)
        count += 1
    save_json(directory / "index.json", {"files": sorted(files, key=str.lower)})
    return count


def main() -> None:
    counts = {option_type: normalize_dir(option_type, directory) for option_type, directory in OPTION_DIRS.items()}
    for option_type, count in counts.items():
        print(f"{option_type}: {count}")


if __name__ == "__main__":
    main()
