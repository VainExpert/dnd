#!/usr/bin/env python3
"""
sync_openrpg_srd.py

OpenRPG SRD (DE) JSON sync script.

List endpoint (per category) returns:
{
  "query": ".../api/{category}",
  "status": {"type":"ok"},
  "result": {
     "category":"monster",
     "objects":[ "https://.../api/monster/<slug>", ... ]
  }
}

Detail endpoint (JSON for each object):
  https://openrpg.de/srd/5e/de/api/{category}/{object}/json
  (We take each object URL from the list and append "/json" if missing.)

Saves to:
  data/spells/*.json
  data/monsters/*.json
  data/items/*.json

Optionally runs:
  node scripts/build-indexes.mjs
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from concurrent.futures import ThreadPoolExecutor, as_completed


BASE_API_DEFAULT = "https://openrpg.de/srd/5e/de/api"

CATEGORY_TO_DIR = {
    "spell": "data/spells",
    "monster": "data/monsters",
    "magicitem": "data/items",
}

USER_AGENT = "Mozilla/5.0 (compatible; SRD-Sync/1.2; +https://github.com/)"


@dataclass(frozen=True)
class FetchResult:
    url: str
    status: int
    content_type: str
    text: str


def http_get(url: str, timeout: int = 30, retries: int = 4, backoff: float = 1.6) -> FetchResult:
    last_err: Optional[Exception] = None
    for attempt in range(retries):
        try:
            req = Request(
                url,
                headers={
                    "User-Agent": USER_AGENT,
                    "Accept": "application/json,text/plain,*/*",
                },
                method="GET",
            )
            with urlopen(req, timeout=timeout) as resp:
                status = getattr(resp, "status", 200)
                ct = resp.headers.get("Content-Type", "") or ""
                data = resp.read()
                try:
                    text = data.decode("utf-8")
                except UnicodeDecodeError:
                    text = data.decode("latin-1", errors="replace")
                return FetchResult(url=url, status=int(status), content_type=ct, text=text)
        except (HTTPError, URLError, TimeoutError) as e:
            last_err = e
            if attempt < retries - 1:
                time.sleep(backoff ** attempt)
    raise RuntimeError(f"Failed to fetch {url}: {last_err}")


def get_json(url: str) -> Any:
    fr = http_get(url)
    try:
        return json.loads(fr.text)
    except Exception as e:
        snippet = fr.text[:300].replace("\n", "\\n")
        raise RuntimeError(f"Non-JSON response from {url}: {e}; first chars={snippet!r}") from e


def list_object_urls(base_api: str, category: str) -> List[str]:
    """
    GET {base_api}/{category}
    Expected shape:
      payload["result"]["objects"] == list[str]
    """
    url = f"{base_api.rstrip('/')}/{category}"
    payload = get_json(url)

    if not isinstance(payload, dict):
        raise RuntimeError(f"Unexpected listing type for {url}: {type(payload)}")

    # Optional status check
    status = payload.get("status")
    if isinstance(status, dict) and status.get("type") not in (None, "ok"):
        raise RuntimeError(f"Listing endpoint returned non-ok status for {url}: {status}")

    result = payload.get("result")
    if not isinstance(result, dict):
        raise RuntimeError(f"Unexpected listing shape for {url}: missing/invalid 'result'")

    objs = result.get("objects")
    if not isinstance(objs, list):
        raise RuntimeError(f"Unexpected listing shape for {url}: missing/invalid 'result.objects'")

    urls = [u for u in objs if isinstance(u, str) and u.strip()]
    if not urls:
        raise RuntimeError(f"Listing returned empty 'objects' for {url}")

    return urls


def ensure_json_url(object_url: str) -> str:
    u = object_url.rstrip("/")
    if u.endswith("/json"):
        return u
    return u + "/json"


def slug_from_object_url(object_url: str) -> str:
    """
    Extract last path segment as slug.
    Example: .../api/monster/werwolf -> werwolf
    """
    p = urlparse(object_url).path
    parts = [x for x in p.split("/") if x]
    return parts[-1] if parts else "unknown"


def safe_filename(slug: str) -> str:
    s = slug.strip().replace(" ", "-")
    s = re.sub(r"[^a-zA-Z0-9._-]+", "-", s)
    s = re.sub(r"-{2,}", "-", s)
    return s.lower() + ".json"


def write_json(path: Path, obj: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")


def run_build_indexes(repo_root: Path, script_rel: str = "scripts/build-indexes.mjs") -> None:
    script_path = repo_root / script_rel
    if not script_path.exists():
        print(f"[WARN] build-indexes script not found at: {script_path}", file=sys.stderr)
        return

    try:
        subprocess.run(["node", str(script_path)], cwd=str(repo_root), check=True)
        print("[OK] build-indexes.mjs finished.")
    except FileNotFoundError:
        print("[WARN] Node.js not found (node command missing). Skipping build-indexes.", file=sys.stderr)
    except subprocess.CalledProcessError as e:
        print(f"[WARN] build-indexes.mjs failed with exit code {e.returncode}.", file=sys.stderr)


def fetch_and_save_one(
    category: str,
    out_dir: Path,
    object_url: str,
    skip_existing: bool,
    sleep: float,
) -> Tuple[bool, str]:
    slug = slug_from_object_url(object_url)
    out_path = out_dir / safe_filename(slug)

    if skip_existing and out_path.exists():
        return True, f"[SKIP] {category}/{slug}"

    detail_url = ensure_json_url(object_url)

    try:
        obj = get_json(detail_url)

        # Helpful defaults for your site (doesn't overwrite)
        if isinstance(obj, dict):
            obj.setdefault("id", slug)

        write_json(out_path, obj)

        if sleep > 0:
            time.sleep(sleep)

        return True, f"[OK] {category}/{slug}"
    except Exception as e:
        return False, f"[FAIL] {category}/{slug}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-api", default=BASE_API_DEFAULT, help="Base API URL (no trailing slash needed)")
    ap.add_argument("--repo-root", default=".", help="Path to your website repo root")
    ap.add_argument(
        "--categories",
        default="spell,monster,magicitem",
        help="Comma-separated categories to sync (default: spell,monster,magicitem)",
    )
    ap.add_argument("--workers", type=int, default=8, help="Parallel workers for downloads")
    ap.add_argument("--sleep", type=float, default=0.0, help="Sleep seconds after each saved object (per worker)")
    ap.add_argument("--skip-existing", action="store_true", help="Do not re-download files that already exist")
    ap.add_argument("--no-index", action="store_true", help="Do not run scripts/build-indexes.mjs at the end")
    args = ap.parse_args()

    base_api = args.base_api.rstrip("/")
    repo_root = Path(args.repo_root).resolve()
    categories = [c.strip() for c in args.categories.split(",") if c.strip()]

    for category in categories:
        if category not in CATEGORY_TO_DIR:
            print(f"[WARN] Unknown category '{category}'. Known: {', '.join(CATEGORY_TO_DIR.keys())}", file=sys.stderr)
            continue

        out_dir = repo_root / CATEGORY_TO_DIR[category]
        print(f"\n== {category.upper()} -> {CATEGORY_TO_DIR[category]} ==")

        object_urls = list_object_urls(base_api, category)

        # De-dup while preserving order
        seen: Set[str] = set()
        deduped: List[str] = []
        for u in object_urls:
            if u not in seen:
                seen.add(u)
                deduped.append(u)

        print(f"[OK] Found {len(deduped)} objects.")

        ok = 0
        fail = 0

        with ThreadPoolExecutor(max_workers=max(1, args.workers)) as ex:
            futs = [
                ex.submit(fetch_and_save_one, category, out_dir, u, args.skip_existing, args.sleep)
                for u in deduped
            ]
            for i, fut in enumerate(as_completed(futs), start=1):
                success, msg = fut.result()
                if success:
                    ok += 1
                else:
                    fail += 1
                    print(msg, file=sys.stderr)

                if i % 50 == 0 or i == len(futs):
                    print(f"... {i}/{len(futs)} done (ok={ok}, fail={fail})")

        print(f"[DONE] {category}: ok={ok}, fail={fail}, total={len(deduped)}")

    if not args.no_index:
        run_build_indexes(repo_root)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())