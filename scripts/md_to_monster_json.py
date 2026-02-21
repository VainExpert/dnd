import os
import re
import json
import unicodedata
from typing import Dict, List, Tuple, Optional

SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10
}

def slugify(value: str) -> str:
    value = (value or "").strip().replace("ß", "ss")
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "monster"

def strip_quotes(s: str) -> str:
    s = (s or "").strip()
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1].strip()
    return s

def parse_bracket_list(s: str) -> List[str]:
    # e.g. [medium, humanoid, cr1/4, monster-manual]
    s = (s or "").strip()
    if s.startswith("[") and s.endswith("]"):
        inner = s[1:-1].strip()
        if not inner:
            return []
        return [strip_quotes(x.strip()) for x in inner.split(",") if x.strip()]
    return []

def parse_front_matter(md_text: str) -> Tuple[Dict[str, str], str]:
    """
    Parses YAML-ish front matter:
    ---
    key: value
    ---
    returns (dict, body_text)
    """
    lines = md_text.splitlines()
    if len(lines) >= 3 and lines[0].strip() == "---":
        # find second ---
        end = None
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                end = i
                break
        if end is not None:
            fm_lines = lines[1:end]
            body = "\n".join(lines[end+1:]).lstrip("\n")
            fm: Dict[str, str] = {}
            for ln in fm_lines:
                if not ln.strip() or ln.strip().startswith("#"):
                    continue
                # very small "YAML" subset: key: value
                if ":" not in ln:
                    continue
                k, v = ln.split(":", 1)
                fm[k.strip()] = v.strip()
            return fm, body
    return {}, md_text

def parse_ability_score(s: str) -> Optional[int]:
    # e.g. "14 (+2)" or "10 (0)"
    if s is None:
        return None
    m = re.search(r"(-?\d+)", str(s))
    return int(m.group(1)) if m else None

def parse_int_from_text(s: str) -> Optional[int]:
    if s is None:
        return None
    m = re.search(r"(-?\d+)", str(s))
    return int(m.group(1)) if m else None

def parse_hp(hp_str: str) -> Tuple[Optional[int], Optional[str]]:
    # "13 (3d8)" -> avg=13, formula="3d8"
    if not hp_str:
        return None, None
    m = re.match(r"\s*(\d+)\s*\(([^)]+)\)\s*", hp_str)
    if m:
        return int(m.group(1)), m.group(2).strip()
    # fallback: just a number
    n = parse_int_from_text(hp_str)
    return n, None

def parse_speed(speed_str: str) -> Dict[str, int]:
    # "20 ft., fly 50 ft." -> {"walk": 20, "fly": 50}
    out: Dict[str, int] = {}
    if not speed_str:
        return out
    parts = [p.strip() for p in speed_str.split(",") if p.strip()]
    for p in parts:
        # "fly 50 ft." or "20 ft."
        m = re.search(r"^(?:(walk|fly|swim|climb|burrow)\s+)?(\d+)\s*ft", p, flags=re.I)
        if not m:
            continue
        mode = (m.group(1) or "walk").lower()
        out[mode] = int(m.group(2))
    return out

def parse_languages(lang_str: str) -> List[str]:
    if not lang_str:
        return []
    return [x.strip() for x in lang_str.split(",") if x.strip()]

def parse_skills(skills_str: str) -> Dict[str, int]:
    # "Perception +5, Stealth +4"
    out: Dict[str, int] = {}
    if not skills_str:
        return out
    parts = [p.strip() for p in skills_str.split(",") if p.strip()]
    for p in parts:
        m = re.match(r"^(.+?)\s*([+-]\d+)\s*$", p)
        if m:
            out[m.group(1).strip()] = int(m.group(2))
    return out

def parse_challenge(ch_str: str) -> Tuple[Optional[str], Optional[int]]:
    # "1/4 (50 XP)" -> cr="1/4", xp=50
    if not ch_str:
        return None, None
    m = re.match(r"\s*([0-9]+(?:\/[0-9]+)?)\s*(?:\((\d+)\s*XP\))?\s*", ch_str, flags=re.I)
    if m:
        cr = m.group(1)
        xp = int(m.group(2)) if m.group(2) else None
        return cr, xp
    return ch_str.strip(), None

def parse_size_and_type(size_str: str, fm_tags: List[str]) -> Tuple[Optional[str], Dict[str, object]]:
    """
    From e.g. "Medium humanoid (aarakocra)"
    -> size="Medium", type={"type":"humanoid","tags":["aarakocra", ...]}
    """
    if not size_str:
        return None, {"type": "unknown", "tags": fm_tags}

    s = size_str.strip()
    size = None
    for sz in SIZES:
        if s.lower().startswith(sz.lower() + " "):
            size = sz
            s = s[len(sz):].strip()
            break

    # now s might be "humanoid (aarakocra)" or "humanoid"
    base_type = s
    extra_tag = None
    m = re.match(r"^([^()]+)\(([^)]+)\)\s*$", s)
    if m:
        base_type = m.group(1).strip()
        extra_tag = m.group(2).strip()

    # base_type may contain multiple words; keep first token as creature type
    # (you can change this if you want "humanoid" only anyway)
    creature_type = base_type.split()[0].lower() if base_type else "unknown"

    tags = []
    # keep interesting tags from front matter (excluding obvious duplicates)
    for t in fm_tags:
        tt = t.strip()
        if tt:
            tags.append(tt)
    if extra_tag:
        tags.append(extra_tag)

    # de-dup (case-insensitive)
    seen = set()
    deduped = []
    for t in tags:
        k = t.lower()
        if k in seen:
            continue
        seen.add(k)
        deduped.append(t)
    return size, {"type": creature_type, "tags": deduped}

def collect_blocks(section_text: str) -> List[Tuple[str, str]]:
    """
    Collects blocks of the form:
    ***Name.*** Text...
    separated by blank lines.
    Returns [(name, text), ...]
    """
    blocks: List[Tuple[str, str]] = []
    lines = section_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        m = re.match(r"^\*\*\*(.+?)\.\*\*\*\s*(.*)$", line)
        if not m:
            i += 1
            continue

        name = m.group(1).strip()
        first = m.group(2).strip()
        buf = [first] if first else []

        i += 1
        while i < len(lines):
            ln = lines[i]
            if ln.strip() == "":
                # allow multiple blank lines; stop block when next non-empty is a new block or heading
                j = i
                while j < len(lines) and lines[j].strip() == "":
                    j += 1
                if j < len(lines) and (re.match(r"^\*\*\*.+?\.\*\*\*", lines[j].strip()) or lines[j].strip().startswith("### ")):
                    i = j
                    break
                buf.append("")  # preserve paragraph spacing
                i = j
                continue

            if lines[i].strip().startswith("### "):
                break
            if re.match(r"^\*\*\*.+?\.\*\*\*", lines[i].strip()):
                break

            buf.append(lines[i].strip())
            i += 1

        text = "\n".join([x for x in buf]).strip()
        text = re.sub(r"\n{3,}", "\n\n", text)
        blocks.append((name, text))
    return blocks

def parse_attack_action(name: str, text: str) -> Dict[str, object]:
    """
    Parses common 5e action lines like:
    "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
    If it doesn't match, returns a 'special' action with text.
    """
    raw = text.strip()

    # Identify melee/ranged wording
    attack_type = None
    if re.search(r"\bMelee or Ranged Weapon Attack:\b", raw, flags=re.I):
        attack_type = "melee_or_ranged_weapon_attack"
    elif re.search(r"\bMelee Weapon Attack:\b", raw, flags=re.I):
        attack_type = "melee_weapon_attack"
    elif re.search(r"\bRanged Weapon Attack:\b", raw, flags=re.I):
        attack_type = "ranged_weapon_attack"

    if not attack_type:
        return {"name": name, "type": "special", "text": raw}

    to_hit = None
    m = re.search(r"\+(\d+)\s+to hit", raw, flags=re.I)
    if m:
        to_hit = int(m.group(1))

    reach_ft = None
    m = re.search(r"reach\s+(\d+)\s*ft", raw, flags=re.I)
    if m:
        reach_ft = int(m.group(1))

    range_ft = None
    m = re.search(r"range\s+(\d+)\s*/\s*(\d+)\s*ft", raw, flags=re.I)
    if m:
        range_ft = {"normal": int(m.group(1)), "long": int(m.group(2))}

    targets = None
    m = re.search(r"\b(one|two|three|four|five|six|seven|eight|nine|ten)\s+target", raw, flags=re.I)
    if m:
        targets = NUMBER_WORDS.get(m.group(1).lower(), None)

    # Parse Hit damage (first occurrence)
    damage: List[Dict[str, object]] = []
    m = re.search(r"Hit:\s*(\d+)\s*\(([^)]+)\)\s*([a-zA-Z]+)\s+damage", raw, flags=re.I)
    if m:
        damage.append({
            "avg": int(m.group(1)),
            "formula": m.group(2).strip(),
            "type": m.group(3).lower()
        })

    action: Dict[str, object] = {"name": name, "type": attack_type}
    if to_hit is not None:
        action["to_hit"] = to_hit
    if reach_ft is not None:
        action["reach_ft"] = reach_ft
    if range_ft is not None:
        action["range_ft"] = range_ft
    if targets is not None:
        action["targets"] = targets
    if damage:
        action["damage"] = damage

    # Keep full text too (useful for debugging/odd phrasing)
    action["text"] = raw
    return action

def split_sections(body: str) -> Dict[str, str]:
    """
    Splits markdown body into sections by headings like:
    ### Actions
    ### Reactions
    Everything before first heading is section "_preamble".
    """
    sections: Dict[str, str] = {"_preamble": ""}
    current = "_preamble"
    buf: List[str] = []
    lines = body.splitlines()
    for ln in lines:
        if ln.strip().startswith("### "):
            sections[current] = "\n".join(buf).strip()
            current = ln.strip()[4:].strip().lower()  # "Actions" -> "actions"
            buf = []
            continue
        buf.append(ln)
    sections[current] = "\n".join(buf).strip()
    return sections

def md_file_to_monster_json(md_path: str) -> Dict[str, object]:
    with open(md_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    fm, body = parse_front_matter(md_text)
    fm_tags = parse_bracket_list(fm.get("tags", ""))

    name = strip_quotes(fm.get("name", os.path.splitext(os.path.basename(md_path))[0]))
    size_str = fm.get("size", "")
    size, type_obj = parse_size_and_type(size_str, fm_tags)

    alignment = fm.get("alignment", "").strip()
    ac = parse_int_from_text(fm.get("armor_class", ""))
    hp_avg, hp_formula = parse_hp(fm.get("hit_points", ""))
    speed = parse_speed(fm.get("speed", ""))

    abilities = {
        "str": parse_ability_score(fm.get("str", "")) or 10,
        "dex": parse_ability_score(fm.get("dex", "")) or 10,
        "con": parse_ability_score(fm.get("con", "")) or 10,
        "int": parse_ability_score(fm.get("int", "")) or 10,
        "wis": parse_ability_score(fm.get("wis", "")) or 10,
        "cha": parse_ability_score(fm.get("cha", "")) or 10,
    }

    skills = parse_skills(strip_quotes(fm.get("skills", "")))
    languages = parse_languages(strip_quotes(fm.get("languages", "")))
    cr, xp = parse_challenge(strip_quotes(fm.get("challenge", "")))

    sections = split_sections(body)

    traits_blocks = collect_blocks(sections.get("_preamble", ""))
    traits = [{"name": n, "text": t} for n, t in traits_blocks if n and t]

    actions_blocks = collect_blocks(sections.get("actions", ""))
    actions = []
    for n, t in actions_blocks:
        if not n:
            continue
        actions.append(parse_attack_action(n, t))

    monster = {
        "name": name,
        "size": size or "Medium",
        "type": type_obj,
        "alignment": alignment or "unaligned",
        "ac": ac if ac is not None else "—",
        "hp": {
            "average": hp_avg if hp_avg is not None else 0,
            "formula": hp_formula or ""
        },
        "speed": speed,
        "abilities": abilities,
        "skills": skills,
        "languages": languages,
        "challenge": {
            "cr": cr or "—",
            "xp": xp if xp is not None else None,
            "proficiency_bonus": 2  # optional; you can compute later if you want
        },
        "traits": traits,
        "actions": actions,
        "source": fm.get("layout", "") or ""
    }

    # Clean up None XP
    if monster["challenge"]["xp"] is None:
        monster["challenge"].pop("xp")

    return monster

def main():
    import argparse
    ap = argparse.ArgumentParser(description="Convert creature markdown files to JSON files for the static website.")
    ap.add_argument("md_folder", help="Folder containing .md creature files")
    ap.add_argument("--out", default="data/monsters", help="Output folder (default: data/monsters)")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)

    md_files = sorted(
        [f for f in os.listdir(args.md_folder) if f.lower().endswith(".md")],
        key=lambda x: x.lower()
    )

    files_out: List[str] = []
    seen = set()

    for fn in md_files:
        in_path = os.path.join(args.md_folder, fn)
        monster = md_file_to_monster_json(in_path)

        base = slugify(monster.get("name", fn))
        out_fn = f"{base}.json"
        i = 2
        while out_fn in seen:
            out_fn = f"{base}-{i}.json"
            i += 1
        seen.add(out_fn)

        out_path = os.path.join(args.out, out_fn)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(monster, f, ensure_ascii=False, indent=2)

        files_out.append(out_fn)
        print(f"Converted: {fn} -> {out_fn}")

    # Write index.json for your website loader
    idx_path = os.path.join(args.out, "index.json")
    with open(idx_path, "w", encoding="utf-8") as f:
        json.dump({"files": files_out}, f, ensure_ascii=False, indent=2)

    print(f"\nDone. Wrote {len(files_out)} monsters + index.json to: {args.out}")

if __name__ == "__main__":
    main()