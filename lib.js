export function escapeHtml(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

export async function loadIndex(indexPath){
  const idx = await fetch(indexPath, { cache: "no-cache" }).then(r => r.json());
  return idx.files || [];
}

export async function loadMany(basePath, files){
  const out = [];
  for (const f of files){
    const obj = await fetch(`${basePath}/${f}`, { cache: "no-cache" })
      .then(r => r.ok ? r.json() : null);
    if (obj) out.push(obj);
  }
  return out;
}

export function mod(score){
  return Math.floor((Number(score) - 10) / 2);
}

export function fmtSigned(n){
  n = Number(n);
  if (Number.isNaN(n)) return "—";
  return n >= 0 ? `+${n}` : `${n}`;
}