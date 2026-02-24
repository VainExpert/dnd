import os
import re
import json
import time
import argparse
import html as _html
from typing import Any, Dict, List, Optional, Tuple

import deepl  # pip install deepl

# -------------------------
# What gets translated
# -------------------------
TRANSLATE_KEYS = {
    "name",  # disable via --no-translate-names if you want stable English names/links
    "text",
    "blurb",
    "notes",
    "ac_note",
    "legendary_actions_intro",
    "lair_actions_text",
    "regional_effects_text",
}

NEVER_TRANSLATE_KEYS = {"id", "file", "slug", "source"}

# Values under these keys are canonical mechanics tokens; don't translate
CANONICAL_VALUE_KEYS = {
    "type", "cr", "formula", "proficiency_bonus", "xp",
    "avg", "to_hit", "reach_ft", "targets", "range_ft",
    "ability", "save_dc"
}

# Protect tokens so DeepL doesn't change them (we later restore + optionally convert units)
PROTECT_PATTERNS = [
    r"\b\d+d\d+(?:\s*[+\-]\s*\d+)?\b",              # dice
    r"\bDC\s*\d+\b",                                # DC 15
    r"\b[+\-]\d+\b",                                # +7, -1
    r"\b\d+\/\d+\b",                                # 1/2
    r"\b\d+(?:\.\d+)?\s*(?:ft|feet|foot)\.?\b",     # distances (feet)
    r"\b\d+(?:\.\d+)?\s*(?:yd|yard|yards)\.?\b",    # distances (yards)
    r"\b\d+(?:\.\d+)?\s*(?:in|inch|inches)\.?\b",   # distances (inches)
    r"\b\d+(?:\.\d+)?\s*(?:mi|mile|miles)\.?\b",    # distances (miles)
    r"\b\d+(?:\.\d+)?\s*(?:lb|lbs)\.?\b",           # weights
]

# Optional local mapping for common enums (saves quota)
SIZE_DE = {
    "Tiny": "Winzig", "Small": "Klein", "Medium": "Mittelgroß",
    "Large": "Groß", "Huge": "Riesig", "Gargantuan": "Gigantisch"
}
ALIGNMENT_DE = {
    "lawful good": "rechtschaffen gut",
    "neutral good": "neutral gut",
    "chaotic good": "chaotisch gut",
    "lawful neutral": "rechtschaffen neutral",
    "neutral": "neutral",
    "chaotic neutral": "chaotisch neutral",
    "lawful evil": "rechtschaffen böse",
    "neutral evil": "neutral böse",
    "chaotic evil": "chaotisch böse",
    "unaligned": "ohne Gesinnung"
}

class BudgetStop(Exception):
    pass

def load_json(path: str, default):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return default

def save_json(path: str, obj):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)

def estimate_chars_billed(text: str) -> int:
    return len(text or "")

def protect_tokens(text: str) -> Tuple[str, List[str]]:
    tokens: List[str] = []
    def repl(m):
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

    def repl(m):
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

def convert_units_de(text: str, *, exact: bool) -> str:
    """
    Convert:
      - ft/feet/foot -> m
      - yd/yard/yards -> m
      - in/inch/inches -> cm
      - mi/mile/miles -> km
      - lb/lbs -> kg

    D&D-friendly (default):
      5 ft = 1,5 m => 1 ft = 0,3 m
      1 yd = 3 ft = 0,9 m
      1 in = 1/12 ft = 0,025 m = 2,5 cm
      1 mi = 5280 ft = 1584 m = 1,584 km
      1 lb ≈ 0,5 kg

    Exact mode:
      1 ft = 0.3048 m
      1 yd = 0.9144 m
      1 in = 2.54 cm
      1 mi = 1.609344 km
      1 lb = 0.45359237 kg
    """
    if not text:
        return text

    if exact:
        ft_factor = 0.3048
        yd_factor = 0.9144
        in_factor_cm = 2.54
        mi_factor_km = 1.609344
        lb_factor = 0.45359237
    else:
        ft_factor = 0.3
        yd_factor = 0.9
        in_factor_cm = 2.5
        mi_factor_km = 1.584
        lb_factor = 0.5

    def ft_repl(m):
        n = float(m.group(1))
        meters = n * ft_factor
        return f"{format_de_number(meters, 1)} m"

    def yd_repl(m):
        n = float(m.group(1))
        meters = n * yd_factor
        return f"{format_de_number(meters, 1)} m"

    def inch_repl(m):
        n = float(m.group(1))
        cm = n * in_factor_cm
        return f"{format_de_number(cm, 1)} cm"

    def mile_repl(m):
        n = float(m.group(1))
        km = n * mi_factor_km
        return f"{format_de_number(km, 3 if km < 10 else 2)} km"

    def lb_repl(m):
        n = float(m.group(1))
        kg = n * lb_factor
        return f"{format_de_number(kg, 1)} kg"

    # Replace in an order that avoids partial matches
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:mi|mile|miles)\.?\b", mile_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:yd|yard|yards)\.?\b", yd_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:in|inch|inches)\.?\b", inch_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:ft|feet|foot)\.?\b", ft_repl, text, flags=re.IGNORECASE)
    text = re.sub(r"\b(\d+(?:\.\d+)?)\s*(?:lb|lbs)\.?\b", lb_repl, text, flags=re.IGNORECASE)
    return text

def load_glossary(glossary_path: str) -> List[Dict[str, str]]:
    """
    Loads a JSON glossary file like:
      {"rules":[{"pattern":"(?i)\\bRettungsprobe\\b","replace":"Rettungswurf"}]}
    """
    if not glossary_path:
        return []
    if not os.path.exists(glossary_path):
        return []
    try:
        with open(glossary_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        rules = data.get("rules", [])
        if isinstance(rules, list):
            out = []
            for r in rules:
                if isinstance(r, dict) and "pattern" in r and "replace" in r:
                    out.append({"pattern": r["pattern"], "replace": r["replace"]})
            return out
    except Exception:
        return []
    return []

def apply_glossary(text: str, rules: List[Dict[str, str]]) -> str:
    """
    Applies regex substitutions in order. Use word boundaries in patterns where appropriate.
    """
    if not text or not rules:
        return text
    out = text
    for r in rules:
        try:
            out = re.sub(r["pattern"], r["replace"], out)
        except re.error:
            # ignore bad rules
            continue
    return out

def should_translate_value(key: str, translate_names: bool) -> bool:
    if key in NEVER_TRANSLATE_KEYS:
        return False
    if key in CANONICAL_VALUE_KEYS:
        return False
    if key == "name" and not translate_names:
        return False
    return key in TRANSLATE_KEYS

def local_enum_translate(key: str, value: str) -> Optional[str]:
    if key == "size":
        return SIZE_DE.get(value)
    if key == "alignment":
        return ALIGNMENT_DE.get(value.lower())
    return None

def deepl_translate_text(
    client: deepl.DeepLClient,
    xml_text: str,
    target_lang: str,
    retries: int = 5
) -> Tuple[str, int]:
    delay = 1.0
    last_err = None
    for _ in range(retries):
        try:
            res = client.translate_text(
                xml_text,
                target_lang=target_lang,
                tag_handling="xml",
                preserve_formatting=True,
                split_sentences=deepl.SplitSentences.NO_NEWLINES,
            )
            billed = getattr(res, "billed_characters", None)
            billed = int(billed) if billed is not None else estimate_chars_billed(xml_text)
            return res.text, billed
        except Exception as e:
            last_err = e
            time.sleep(delay)
            delay = min(delay * 2.0, 20.0)
    raise RuntimeError(f"DeepL translate failed after retries: {last_err}")

def translate_value(
    client: deepl.DeepLClient,
    value: Any,
    key: str,
    cache: Dict[str, str],
    target_lang: str,
    translate_names: bool,
    remaining_budget: List[int],
    state: Dict[str, Any],
    save_every: int,
    cache_path: str,
    state_path: str,
    *,
    exact_units: bool,
    glossary_rules: List[Dict[str, str]]
) -> Any:
    if isinstance(value, str):
        le = local_enum_translate(key, value)
        if le is not None:
            return le

        # Convert units and normalize terms even for non-translated strings if target is German
        if not should_translate_value(key, translate_names):
            out = value
            if target_lang.upper().startswith("DE"):
                out = convert_units_de(out, exact=exact_units)
                out = apply_glossary(out, glossary_rules)
            return out

        src = value.strip()
        if not src:
            return value

        cache_key = f"{target_lang}::{key}::{src}::{int(exact_units)}::{hash(json.dumps(glossary_rules, ensure_ascii=False))}"
        if cache_key in cache:
            return cache[cache_key]

        estimated = estimate_chars_billed(src)
        if estimated > remaining_budget[0]:
            raise BudgetStop(f"Budget would be exceeded by next text ({estimated} chars needed, {remaining_budget[0]} left).")

        protected, tokens = protect_tokens(src)
        xml_in = to_xml_with_placeholders(protected)

        translated_xml, billed = deepl_translate_text(client, xml_in, target_lang=target_lang)
        out = from_xml_and_restore(translated_xml, tokens)

        if target_lang.upper().startswith("DE"):
            out = convert_units_de(out, exact=exact_units)
            out = apply_glossary(out, glossary_rules)

        cache[cache_key] = out
        remaining_budget[0] -= billed

        state["translated_count"] = int(state.get("translated_count", 0)) + 1
        if state["translated_count"] % save_every == 0:
            save_json(cache_path, cache)
            save_json(state_path, state)

        return out

    if isinstance(value, list):
        return [translate_value(client, v, key, cache, target_lang, translate_names,
                                remaining_budget, state, save_every, cache_path, state_path,
                                exact_units=exact_units, glossary_rules=glossary_rules) for v in value]

    if isinstance(value, dict):
        out = {}
        for k, v in value.items():
            out[k] = translate_value(client, v, k, cache, target_lang, translate_names,
                                     remaining_budget, state, save_every, cache_path, state_path,
                                     exact_units=exact_units, glossary_rules=glossary_rules)
        return out

    return value

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="in_dir", required=True, help="Input folder, e.g. data/monsters")
    ap.add_argument("--out", dest="out_dir", required=True, help="Output folder, e.g. data/monsters_de")
    ap.add_argument("--target", default="DE", help="DeepL target language code, default DE")
    ap.add_argument("--margin", type=int, default=15000, help="Safety margin (chars). Stop before limit by this much.")
    ap.add_argument("--cache", default="translation_cache_deepl.json", help="Cache file for translated strings")
    ap.add_argument("--state", default="translation_state_deepl.json", help="State/checkpoint file")
    ap.add_argument("--save-every", type=int, default=50, help="Persist cache/state every N translated strings")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite already translated output files")
    ap.add_argument("--no-translate-names", action="store_true", help="Do not translate any 'name' fields")
    ap.add_argument("--exact-units", action="store_true", help="Use exact conversions. Default uses D&D-friendly conversions.")
    ap.add_argument("--glossary", default="glossary_de.json", help="Glossary normalization JSON file")
    args = ap.parse_args()

    auth_key = os.getenv("DEEPL_AUTH_KEY")
    if not auth_key:
        raise SystemExit("Missing DEEPL_AUTH_KEY environment variable.")

    os.makedirs(args.out_dir, exist_ok=True)

    cache: Dict[str, str] = load_json(args.cache, {})
    state: Dict[str, Any] = load_json(args.state, {"translated_count": 0, "completed_files": []})

    glossary_rules = load_glossary(args.glossary)

    client = deepl.DeepLClient(auth_key)

    usage = client.get_usage()
    if not usage.character.valid:
        raise SystemExit("DeepL usage.character is not valid for this account/key.")
    used = int(usage.character.count)
    limit = int(usage.character.limit)
    remaining = max(0, limit - used - args.margin)

    if remaining <= 0:
        print(f"Stop: remaining budget <= 0 (used {used} / limit {limit}, margin {args.margin}).")
        return

    remaining_budget = [remaining]

    files = sorted([f for f in os.listdir(args.in_dir) if f.endswith(".json") and f != "index.json"], key=str.lower)
    out_files: List[str] = []

    for fn in files:
        in_path = os.path.join(args.in_dir, fn)
        out_path = os.path.join(args.out_dir, fn)

        if (not args.overwrite) and os.path.exists(out_path):
            out_files.append(fn)
            continue

        with open(in_path, "r", encoding="utf-8") as f:
            obj = json.load(f)

        try:
            translated = translate_value(
                client=client,
                value=obj,
                key="",
                cache=cache,
                target_lang=args.target,
                translate_names=not args.no_translate_names,
                remaining_budget=remaining_budget,
                state=state,
                save_every=args.save_every,
                cache_path=args.cache,
                state_path=args.state,
                exact_units=args.exact_units,
                glossary_rules=glossary_rules
            )
        except BudgetStop as e:
            save_json(args.cache, cache)
            save_json(args.state, state)
            print(f"Stopped before quota: {e}")
            break

        tmp_path = out_path + ".tmp"
        with open(tmp_path, "w", encoding="utf-8") as f:
            json.dump(translated, f, ensure_ascii=False, indent=2)
        os.replace(tmp_path, out_path)

        out_files.append(fn)
        state["completed_files"] = sorted(set(state.get("completed_files", []) + [fn]))
        save_json(args.state, state)
        save_json(args.cache, cache)

        print(f"Wrote {out_path} (budget left ~ {remaining_budget[0]} chars)")

    save_json(os.path.join(args.out_dir, "index.json"), {"files": out_files})
    save_json(args.cache, cache)
    save_json(args.state, state)
    print(f"Done. Output files: {len(out_files)}. Budget left ~ {remaining_budget[0]} chars.")

if __name__ == "__main__":
    main()
