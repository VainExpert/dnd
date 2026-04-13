#!/usr/bin/env python3
"""
charactersheet_agent_system.py

LangChain + LangGraph Agentensystem:
- Liest ein D&D Beyond Charactersheet (PDF)
- Extrahiert möglichst viele Infos
- Gibt JSON im Format "dnd5e_character_sheet_full_extract_v1" aus

Install (Beispiel):
  pip install -U langchain langchain-core langchain-community langchain-openai langgraph pymupdf

Env:
  export OPENAI_API_KEY="..."
  # optional:
  export OPENAI_BASE_URL="https://api.openai.com/v1"
  export OPENAI_MODEL="gpt-4o-mini"

Usage:
  python charactersheet_agent_system.py ./Charactersheet.pdf -o ./out.json --pretty
  python charactersheet_agent_system.py ./Charactersheet.pdf --out-dir ./out --pretty
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

from typing_extensions import TypedDict

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import StateGraph, START, END

# PDF Loader
from langchain_community.document_loaders import PyMuPDFLoader


# -----------------------------
# Helpers
# -----------------------------

def _safe_float(s: str) -> Optional[float]:
    try:
        return float(s.replace(",", "."))
    except Exception:
        return None

def _safe_int(s: str) -> Optional[int]:
    try:
        return int(s.strip())
    except Exception:
        return None

def normalize_text(s: str) -> str:
    s = (s or "").replace("\u00A0", " ").replace("￾", " ").replace("\uFFFD", " ")
    s = s.replace("–", "-").replace("—", "-")
    s = "\n".join(ln.rstrip() for ln in s.splitlines())
    # Collapse excessive blank lines but keep structure
    s = re.sub(r"\n{4,}", "\n\n\n", s)
    return s.strip()

def json_loads_lenient(text: str) -> Dict[str, Any]:
    """
    Tries to parse JSON; accepts leading/trailing junk if model accidentally adds it.
    """
    text = (text or "").strip()
    # First try direct
    try:
        return json.loads(text)
    except Exception:
        pass
    # Try to find the first {...} block
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidate = text[start : end + 1]
        return json.loads(candidate)
    raise ValueError("Could not parse JSON")

def deep_merge(base: Any, patch: Any) -> Any:
    if isinstance(base, dict) and isinstance(patch, dict):
        out = dict(base)
        for k, v in patch.items():
            if k in out:
                out[k] = deep_merge(out[k], v)
            else:
                out[k] = v
        return out
    return patch

def ensure_defaults(obj: Dict[str, Any], pdf_path: str) -> Dict[str, Any]:
    """
    Ensures the main skeleton exists and normalizes some common types.
    """
    skeleton: Dict[str, Any] = {
        "schema_version": "dnd5e_character_sheet_full_extract_v1",
        "citations": {"character_sheet_pdf": os.path.abspath(pdf_path)},
        "source": {
            "file_name": os.path.basename(pdf_path),
            "notes": None,
            "assumptions_and_uncertainties": [],
        },
        "character": {
            "identity": {
                "name": None,
                "player_name": None,
                "class": {"name": None, "level": None, "subclass": None},
                "race": None,
                "background": None,
                "alignment": None,
                "deity": None,
                "faith": None,
                "gender": None,
                "age_years": None,
                "size": None,
                "height_m": None,
                "weight_kg": None,
                "appearance": {},
                "organizations": [],
                "allies": [],
            },
            "ability_scores": {},
            "proficiency_bonus": None,
            "saving_throws": {},
            "skills": {},
            "passive_scores": {},
            "combat": {},
            "proficiencies": {"armor": [], "weapons": [], "tools": [], "languages": [], "notes": []},
            "spellcasting": None,
            "features": {},
            "equipment": {"currency": None, "weights": None, "items": [], "attuned_magic_items_listed": []},
            "personality": {"traits": [], "ideals": [], "bonds_or_motivation": [], "flaws": []},
            "backstory": {"summary": None, "allies": [], "notes": None},
        },
    }

    merged = deep_merge(skeleton, obj or {})

    # Normalize common numeric strings
    def _norm_num(v):
        if isinstance(v, str):
            vi = _safe_int(v)
            if vi is not None:
                return vi
            vf = _safe_float(v)
            if vf is not None:
                return vf
        return v

    def _walk(x):
        if isinstance(x, dict):
            return {k: _walk(_norm_num(v)) for k, v in x.items()}
        if isinstance(x, list):
            return [_walk(_norm_num(v)) for v in x]
        return _norm_num(x)

    merged = _walk(merged)

    # Ensure ability structure if present
    if isinstance(merged.get("character", {}).get("ability_scores"), dict):
        for ab in ["STR", "DEX", "CON", "INT", "WIS", "CHA"]:
            if ab in merged["character"]["ability_scores"]:
                entry = merged["character"]["ability_scores"][ab]
                if isinstance(entry, dict):
                    entry.setdefault("score", None)
                    entry.setdefault("mod", None)

    # If spellcasting is {}, set to None
    sc = merged["character"].get("spellcasting")
    if isinstance(sc, dict) and not sc:
        merged["character"]["spellcasting"] = None

    return merged


# -----------------------------
# Quick heuristic extraction (non-LLM)
# -----------------------------

def quick_extract_header(full_text: str) -> Dict[str, Any]:
    """
    Best-effort header parsing from D&D Beyond German export.
    Returns a partial dict to be used as "hints" for the LLM.
    """
    t = full_text

    out: Dict[str, Any] = {}

    # Name often first line
    m = re.search(r"^\s*([^\n]{2,60})\s*$", t, re.MULTILINE)
    if m:
        out["name_guess"] = m.group(1).strip()

    # Try: "<Class> <Level>" somewhere near the top
    m = re.search(
        r"\b(Artificer|Barde|Barbar(?:in)?|Druid(?:e|in)|Kleriker(?:in)?|Kämpfer|Mönch|Paladin|Schurke|Waldläufer|Zauberer|Zauberin|Magier)\s+(\d+)\b",
        t,
        re.IGNORECASE,
    )
    if m:
        out["class_guess"] = m.group(1).strip()
        out["level_guess"] = int(m.group(2))

    # Race/background often appear as short words/phrases near top; hard to parse reliably.
    # We just collect candidate lines near the top.
    top = "\n".join(t.splitlines()[:40])
    out["top_block"] = top

    return out

def quick_extract_numbers(full_text: str) -> Dict[str, Any]:
    """
    Extract some common numeric fields if they appear plainly in text:
    AC, Initiative, HP max, Hit dice, Speed (m).
    """
    t = full_text
    out: Dict[str, Any] = {}

    # AC / Initiative: sometimes appears as "INITIATIVE +2 14"
    m = re.search(r"INITIATIVE\s*([+-]?\d+)\s*(\d{1,2})", t, re.IGNORECASE)
    if m:
        out["initiative"] = int(m.group(1))
        out["armor_class"] = int(m.group(2))

    # Speed: "9 m (Laufen)"
    m = re.search(r"(\d+(?:[.,]\d+)?)\s*m\s*\(Laufen\)", t, re.IGNORECASE)
    if m:
        out["speed_m"] = _safe_float(m.group(1))

    # Hit dice + HP: "3W8" and then max HP somewhere close
    m = re.search(r"(\d+)W(\d+)", t, re.IGNORECASE)
    if m:
        out["hit_dice"] = f"{int(m.group(1))}d{int(m.group(2))}"

    # HP max: often a stand-alone number close to Hit Dice block; do a weak pattern:
    m = re.search(r"\bTP\s*MAX(?:IMAL)?\b.*?(\d{1,3})", t, re.IGNORECASE | re.DOTALL)
    if m:
        out["hp_max"] = int(m.group(1))

    return out


# -----------------------------
# LangGraph State
# -----------------------------

class SheetState(TypedDict, total=False):
    pdf_path: str
    pages_text: List[str]
    full_text: str
    quick_hints: Dict[str, Any]

    # LLM intermediate
    blueprint: Dict[str, Any]
    extracted_json_raw: str
    extracted_json: Dict[str, Any]

    errors: List[str]


# -----------------------------
# Nodes
# -----------------------------

def node_load_pdf(state: SheetState) -> SheetState:
    pdf_path = state["pdf_path"]
    loader = PyMuPDFLoader(pdf_path, mode="page")
    docs = loader.load()
    pages = []
    for d in docs:
        pages.append(normalize_text(d.page_content or ""))
    full_text = normalize_text("\n\n".join(pages))

    return {
        "pages_text": pages,
        "full_text": full_text,
        "errors": [],
    }

def node_quick_extract(state: SheetState) -> SheetState:
    full_text = state.get("full_text", "")
    hints = {}
    hints.update(quick_extract_header(full_text))
    hints.update(quick_extract_numbers(full_text))
    return {"quick_hints": hints}

@dataclass
class LLMConfig:
    model: str
    temperature: float
    max_tokens: int

def _make_llm(cfg: LLMConfig) -> ChatOpenAI:
    # ChatOpenAI reads OPENAI_API_KEY and OPENAI_BASE_URL automatically.
    return ChatOpenAI(
        model=cfg.model,
        temperature=cfg.temperature,
        max_tokens=cfg.max_tokens,
    )

def node_llm_blueprint_factory(cfg: LLMConfig):
    """
    Blueprint agent: creates a structured, evidence-like breakdown (not final JSON yet).
    """
    llm = _make_llm(cfg)

    system = SystemMessage(
        content=(
            "Du bist ein extrem sorgfältiger Extraktions-Agent für D&D 5e (deutsches D&D Beyond Charactersheet). "
            "Du darfst NICHT halluzinieren: Wenn etwas nicht im Text steht, setze null/[] und markiere es als unklar. "
            "Erzeuge eine 'blueprint' JSON-Struktur (kein Markdown), die die Informationen nach Sektionen bündelt "
            "(identity, ability_scores, saves, skills, passives, combat, proficiencies, spellcasting, features, equipment, personality, backstory). "
            "Füge in jeder Sektion optional 'evidence_snippets' hinzu: kurze Textausschnitte (max 1 Zeile) aus dem Input, die deine Extraktion stützen."
        )
    )

    def node(state: SheetState) -> SheetState:
        full_text = state.get("full_text", "")
        hints = state.get("quick_hints", {})

        human = HumanMessage(
            content=(
                "INPUT_TEXT:\n"
                f"{full_text}\n\n"
                "QUICK_HINTS_JSON:\n"
                f"{json.dumps(hints, ensure_ascii=False)}\n\n"
                "AUFGABE:\n"
                "Gib NUR gültiges JSON zurück, in der Form:\n"
                "{\n"
                '  "identity": {...},\n'
                '  "ability_scores": {...},\n'
                '  "proficiency_bonus": ..., \n'
                '  "saving_throws": {...},\n'
                '  "skills": {...},\n'
                '  "passive_scores": {...},\n'
                '  "combat": {...},\n'
                '  "proficiencies": {...},\n'
                '  "spellcasting": {... oder null},\n'
                '  "features": {...},\n'
                '  "equipment": {...},\n'
                '  "personality": {...},\n'
                '  "backstory": {...}\n'
                "}\n"
                "Nutze die gleichen deutschen Feldnamen wie im Chat-Beispiel (Anton Eisenberg)."
            )
        )

        resp = llm.invoke([system, human])
        raw = (resp.content or "").strip()
        try:
            blueprint = json_loads_lenient(raw)
        except Exception as e:
            return {"errors": state.get("errors", []) + [f"Blueprint JSON parse failed: {e}"], "blueprint": {}}

        return {"blueprint": blueprint}

    return node

def node_llm_compile_json_factory(cfg: LLMConfig):
    """
    Compiler agent: builds the final JSON in the requested schema.
    """
    llm = _make_llm(cfg)

    system = SystemMessage(
        content=(
            "Du bist ein 'JSON Compiler' für D&D 5e Charactersheets. "
            "Du bekommst einen blueprint (vor-extrahiert) und den Originaltext. "
            "Erzeuge daraus ein finales JSON im Schema 'dnd5e_character_sheet_full_extract_v1' "
            "im Stil der bisherigen Outputs (Anton Eisenberg): "
            "Top-level keys: schema_version, citations, source, character. "
            "In character: identity, ability_scores, proficiency_bonus, saving_throws, skills, passive_scores, combat, "
            "proficiencies, spellcasting, features, equipment, personality, backstory. "
            "Erlaube zusätzliche optionale Felder nur, wenn sie im Text vorkommen (z.B. companions_and_mounts, wild_shape_forms_listed). "
            "Keine Halluzinationen. Unbekannt => null/[]/{} je nach Typ. "
            "Gib NUR gültiges JSON zurück (kein Markdown)."
        )
    )

    def node(state: SheetState) -> SheetState:
        pdf_path = state["pdf_path"]
        full_text = state.get("full_text", "")
        blueprint = state.get("blueprint", {})
        hints = state.get("quick_hints", {})

        human = HumanMessage(
            content=(
                "PDF_PATH:\n"
                f"{os.path.abspath(pdf_path)}\n\n"
                "QUICK_HINTS_JSON:\n"
                f"{json.dumps(hints, ensure_ascii=False)}\n\n"
                "BLUEPRINT_JSON:\n"
                f"{json.dumps(blueprint, ensure_ascii=False)}\n\n"
                "ORIGINAL_TEXT:\n"
                f"{full_text}\n\n"
                "AUFGABE:\n"
                "Erzeuge das finale JSON. Behalte Zahlen als Zahlen. "
                "source.file_name soll der PDF-Dateiname sein. "
                "citations.character_sheet_pdf soll ein Pfadstring sein."
            )
        )

        resp = llm.invoke([system, human])
        raw = (resp.content or "").strip()

        return {"extracted_json_raw": raw}

    return node

def node_validate_and_repair_factory(cfg: LLMConfig):
    """
    Validiert JSON; falls kaputt, LLM repariert es.
    """
    llm = _make_llm(cfg)

    repair_system = SystemMessage(
        content=(
            "Du bist ein JSON-Reparatur-Agent. "
            "Du bekommst kaputtes oder unvollständiges JSON und musst daraus gültiges JSON machen. "
            "Gib NUR gültiges JSON zurück, keine Erklärungen, kein Markdown."
        )
    )

    def node(state: SheetState) -> SheetState:
        raw = state.get("extracted_json_raw", "").strip()
        pdf_path = state["pdf_path"]

        try:
            parsed = json_loads_lenient(raw)
            normalized = ensure_defaults(parsed, pdf_path=pdf_path)
            return {"extracted_json": normalized}
        except Exception as e:
            # Ask LLM to repair
            human = HumanMessage(
                content=(
                    "KAPUTTES_JSON:\n"
                    f"{raw}\n\n"
                    "AUFGABE:\n"
                    "Repariere zu gültigem JSON. Behalte die Struktur so gut wie möglich."
                )
            )
            resp = llm.invoke([repair_system, human])
            fixed_raw = (resp.content or "").strip()
            try:
                parsed2 = json_loads_lenient(fixed_raw)
                normalized2 = ensure_defaults(parsed2, pdf_path=pdf_path)
                return {"extracted_json": normalized2}
            except Exception as e2:
                return {"errors": state.get("errors", []) + [f"Final JSON parse failed: {e2}"], "extracted_json": ensure_defaults({}, pdf_path=pdf_path)}

    return node


# -----------------------------
# Build graph
# -----------------------------

def build_graph(cfg: LLMConfig):
    builder = StateGraph(SheetState)

    builder.add_node("load_pdf", node_load_pdf)
    builder.add_node("quick_extract", node_quick_extract)
    builder.add_node("blueprint", node_llm_blueprint_factory(cfg))
    builder.add_node("compile_json", node_llm_compile_json_factory(cfg))
    builder.add_node("validate", node_validate_and_repair_factory(cfg))

    builder.add_edge(START, "load_pdf")
    builder.add_edge("load_pdf", "quick_extract")
    builder.add_edge("quick_extract", "blueprint")
    builder.add_edge("blueprint", "compile_json")
    builder.add_edge("compile_json", "validate")
    builder.add_edge("validate", END)

    return builder.compile()


# -----------------------------
# CLI
# -----------------------------

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf", help="Pfad zur Charactersheet-PDF")
    ap.add_argument("-o", "--out", default=None, help="Pfad zur Ausgabe-JSON (optional)")
    ap.add_argument("--out-dir", default=None, help="Ausgabeordner (optional, nutzt <name>.json)")
    ap.add_argument("--model", default=os.getenv("OPENAI_MODEL", "gpt-4o-mini"), help="OpenAI Modelname")
    ap.add_argument("--max-tokens", type=int, default=int(os.getenv("OPENAI_MAX_TOKENS", "6000")))
    ap.add_argument("--temp", type=float, default=float(os.getenv("OPENAI_TEMPERATURE", "0")))
    ap.add_argument("--pretty", action="store_true", help="JSON pretty-print (indent=2)")
    args = ap.parse_args()

    pdf_path = args.pdf
    if not os.path.exists(pdf_path):
        print(f"ERROR: PDF not found: {pdf_path}", file=sys.stderr)
        return 2

    if args.out and args.out_dir:
        print("ERROR: Use either --out or --out-dir, not both.", file=sys.stderr)
        return 2

    out_path = args.out
    if args.out_dir:
        os.makedirs(args.out_dir, exist_ok=True)
        base = os.path.splitext(os.path.basename(pdf_path))[0]
        out_path = os.path.join(args.out_dir, f"{base}.json")

    cfg = LLMConfig(model=args.model, temperature=args.temp, max_tokens=args.max_tokens)
    graph = build_graph(cfg)

    result = graph.invoke({"pdf_path": pdf_path})

    data = result.get("extracted_json")
    if not isinstance(data, dict):
        data = ensure_defaults({}, pdf_path=pdf_path)

    txt = json.dumps(data, ensure_ascii=False, indent=2 if args.pretty else None)

    if out_path:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(txt)
    else:
        sys.stdout.write(txt)

    # If there were errors, write them to stderr (but keep stdout pure JSON)
    errs = result.get("errors") or []
    if errs:
        print("\n".join([f"[WARN] {e}" for e in errs]), file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())