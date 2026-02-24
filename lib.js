export function escapeHtml(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

const IS_LOCAL = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const FETCH_CACHE = IS_LOCAL ? "no-cache" : "force-cache"; // ✅ fast on Pages, fresh on local dev

async function fetchJson(url){
  const r = await fetch(url, { cache: FETCH_CACHE });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

export async function loadIndex(indexPath){
  const idx = await fetchJson(indexPath);
  return idx.files || [];
}

// parallel loader with concurrency limit (prevents 1000 fetches at once)
export async function loadMany(basePath, files, { concurrency = 12 } = {}){
  const out = [];
  let i = 0;

  async function worker(){
    while (i < files.length){
      const my = i++;
      const f = files[my];
      try {
        const obj = await fetchJson(`${basePath}/${f}`);
        if (obj) out.push(obj);
      } catch (e){
        console.warn("Failed to load", f, e);
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, files.length) }, worker);
  await Promise.all(workers);
  return out;
}

export function mod(score){ return Math.floor((Number(score) - 10) / 2); }
export function fmtSigned(n){
  n = Number(n);
  if (Number.isNaN(n)) return "—";
  return n >= 0 ? `+${n}` : `${n}`;
}

export function fmtSigned(n){
  n = Number(n);
  if (Number.isNaN(n)) return "—";
  return n >= 0 ? `+${n}` : `${n}`;
}

export function normalizeSpellRef(x){
  if (!x) return null;
  if (typeof x === "string") return { id: x };
  if (typeof x === "object" && x.id) return { id: x.id, name: x.name };
  return null;
}

export function buildSpellIndex(spells){
  // returns Map<idLower, { id, name }>
  const map = new Map();
  for (const s of spells){
    const id = (s.id || "").trim() || ""; // prefer explicit id
    const name = s.name || id;
    if (id) map.set(id.toLowerCase(), { id, name });
    // also allow slug from name if no id
    if (!id && name) map.set(name.toLowerCase(), { id: name, name });
  }
  return map;
}

export function spellLinkHtml(ref, spellIndex){
  const r = normalizeSpellRef(ref);
  if (!r) return "";
  const key = (r.id || "").toLowerCase();
  const hit = spellIndex?.get(key);
  const label = (r.name || hit?.name || r.id);
  if (hit?.id) {
    return `<a href="./spell.html?id=${encodeURIComponent(hit.id)}">${label}</a>`;
  }
  // fallback: still link by id
  return `<a href="./spell.html?id=${encodeURIComponent(r.id)}">${label}</a>`;
}