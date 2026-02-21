# csv_to_spell_jsons.py
import csv
import json
import os
import re
import unicodedata
from typing import List, Tuple, Optional

# ---- CSV column mapping (adjust if your CSV differs) ----
COL_LEVEL = 0
COL_NAME = 1
COL_SCHOOL_LEVEL = 2
COL_CASTING_TIME = 3
COL_RANGE = 4
COL_COMPONENTS = 5
COL_DURATION = 6
COL_TEXT = 7
COL_ORIGIN = 8  # class/subclass/race/item etc. (stored as "classes")

DELIMITER = ";"          # your file uses ';'
INPUT_ENCODING = "cp1252"  # tolerant for mixed bytes

def fix_mojibake(s: str) -> str:
    """
    Your CSV is mixed: mostly UTF-8 bytes, but sometimes cp1252 bytes.
    Reading as cp1252 avoids decode errors, then we undo common UTF-8-as-cp1252 mojibake.
    """
    if s is None:
        return ""
    s = str(s)
    if any(ch in s for ch in ("Ã", "Â", "â", "€", "�", "Ÿ")):
        try:
            t = s.encode("cp1252").decode("utf-8")
            # accept if it looks improved
            if t.count("Ã") < s.count("Ã") and t.count("�") <= s.count("�"):
                return t
        except Exception:
            pass
    return s

def slugify(value: str) -> str:
    value = fix_mojibake(value).strip()
    value = value.replace("ß", "ss")
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "spell"

def clean_text(s: str) -> str:
    s = fix_mojibake(s)
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.IGNORECASE)
    s = re.sub(r"</?[^>]+>", "", s)  # remove other HTML tags
    s = s.replace("\r\n", "\n").replace("\r", "\n")
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()

def parse_school_level(field: str, fallback_level: Optional[int]) -> Tuple[int, str, bool]:
    field = fix_mojibake(field).strip()
    ritual = "(Ritual)" in field
    field = field.replace("(Ritual)", "").strip()

    # "Level 1 Erkenntnismagie"
    m = re.match(r"^Level\s+(\d+)\s+(.*)$", field, flags=re.IGNORECASE)
    if m:
        return int(m.group(1)), m.group(2).strip(), ritual

    # "Verwandlungsmagie Zaubertrick"
    if field.lower().endswith("zaubertrick"):
        school = field[: -len("Zaubertrick")].strip()
        return 0, school, ritual

    # fallback
    lvl = int(fallback_level) if fallback_level is not None else 0
    return lvl, field, ritual

def parse_components(comp_letters: str, desc: str) -> Tuple[str, str]:
    comp_letters = fix_mojibake(comp_letters or "").strip()
    desc_fixed = fix_mojibake(desc or "")

    # leading "(material stuff)"
    mat = None
    m = re.match(r"^\(([^)]+)\)\s*", desc_fixed)
    if m:
        mat = fix_mojibake(m.group(1)).strip()
        desc_fixed = desc_fixed[m.end():]

    text = clean_text(desc_fixed)

    components = comp_letters
    if mat:
        if "M" in components and "(" not in components:
            components = f"{components} ({mat})".strip()
        else:
            components = f"{components} ({mat})".strip() if components else f"M ({mat})"

    return components, text

def parse_classes(field: str) -> List[str]:
    field = fix_mojibake(field or "").strip()
    if not field:
        return []
    parts = re.split(r"[,/]", field)
    return [p.strip() for p in parts if p.strip()]

def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("csv_path", help="Input CSV path (e.g. Zauberer_0-2.csv)")
    ap.add_argument("--out", default="data/spells", help="Output folder (default: data/spells)")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)

    files: List[str] = []
    seen = set()

    with open(args.csv_path, "r", encoding=INPUT_ENCODING, newline="") as f:
        reader = csv.reader(f, delimiter=DELIMITER)
        for row in reader:
            if not row or all(not (c or "").strip() for c in row):
                continue

            # pad row to avoid index errors
            while len(row) <= COL_ORIGIN:
                row.append("")

            lvl_raw = (row[COL_LEVEL] or "").strip()
            fallback_level = int(lvl_raw) if lvl_raw.isdigit() else None

            name = fix_mojibake(row[COL_NAME]).strip()
            level, school, ritual = parse_school_level(row[COL_SCHOOL_LEVEL], fallback_level)

            casting_time = fix_mojibake(row[COL_CASTING_TIME]).strip()
            range_ = fix_mojibake(row[COL_RANGE]).strip()
            duration = fix_mojibake(row[COL_DURATION]).strip()
            concentration = bool(re.search(r"\bKonzentration\b", duration, flags=re.IGNORECASE))

            components, text = parse_components(row[COL_COMPONENTS], row[COL_TEXT])
            classes = parse_classes(row[COL_ORIGIN])

            spell = {
                "name": name,
                "level": level,
                "school": school,
                "casting_time": casting_time,
                "range": range_,
                "components": components,
                "duration": duration,
                "concentration": concentration,
                "ritual": ritual,
                "classes": classes,
                "text": text
            }

            base = slugify(name)
            fname = f"{base}.json"
            i = 2
            while fname in seen:
                fname = f"{base}-{i}.json"
                i += 1
            seen.add(fname)

            with open(os.path.join(args.out, fname), "w", encoding="utf-8") as out_f:
                json.dump(spell, out_f, ensure_ascii=False, indent=2)

            files.append(fname)

    with open(os.path.join(args.out, "index.json"), "w", encoding="utf-8") as idx_f:
        json.dump({"files": files}, idx_f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(files)} spells to {args.out} and index.json")

if __name__ == "__main__":
    main()