const MOJIBAKE_RE = /(?:\u00C3.|\u00C2.|\u00E2.|\u00C5.|\u00C6.|\u00E6.|\u0153|\u017E)/;
const UTF8_DECODER = new TextDecoder("utf-8", { fatal: true });

export function repairText(value){
  let input = String(value ?? "");

  for (let i = 0; i < 3; i++){
    if (!MOJIBAKE_RE.test(input)) return input;

    try {
      const bytes = Uint8Array.from(input, ch => ch.charCodeAt(0) & 0xff);
      const repaired = UTF8_DECODER.decode(bytes);
      if (repaired === input) return input;
      input = repaired;
    } catch {
      return input;
    }
  }

  return input;
}

function deepRepair(value){
  if (typeof value === "string") return repairText(value);
  if (Array.isArray(value)) return value.map(deepRepair);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, deepRepair(entry)])
  );
}

function parseTableKey(key){
  const match = String(key ?? "").trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
  if (!match) return null;

  const min = Number(match[1]);
  const max = match[2] ? Number(match[2]) : min;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

  return { min, max };
}

function normalizeTableDice(rawDice){
  if (rawDice == null || rawDice === "") return "";
  if (typeof rawDice === "number" && Number.isFinite(rawDice)) return `1d${rawDice}`;

  const text = repairText(String(rawDice)).trim();
  if (!text) return "";
  if (/^\d+$/.test(text)) return `1d${text}`;
  return text;
}

function parseTableDiceSpec(diceStr){
  const match = String(diceStr ?? "").trim().match(/^(\d*)d(\d+|%)$/i);
  if (!match) return null;

  const count = match[1] ? Number(match[1]) : 1;
  const sides = match[2] === "%" ? 100 : Number(match[2]);
  if (!Number.isFinite(count) || !Number.isFinite(sides) || count < 1 || sides < 1) return null;

  return { count, sides };
}

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTableValue(value){
  if (Array.isArray(value)){
    return value
      .map(part => formatTableValue(part).trim())
      .filter(Boolean)
      .reduce((out, part) => {
        if (!out) return part;
        return /^[,.;:!?)]/.test(part) || /^[-/]/.test(part) ? out + part : `${out} ${part}`;
      }, "");
  }

  if (value && typeof value === "object"){
    return Object.entries(value)
      .map(([key, entry]) => {
        const label = String(key).replaceAll("_", " ");
        return `${label}: ${formatTableValue(entry)}`;
      })
      .filter(Boolean)
      .join(" | ");
  }

  return repairText(String(value ?? ""));
}

const STRUCTURED_FIELD_LABELS = {
  id: "ID",
  tier: "Rang",
  vergehen: "Vergehen",
  beschreibung: "Beschreibung",
  zuletzt_gesehen: "Zuletzt gesehen",
  besonderer_hinweis: "Besonderer Hinweis",
  belohnung: "Belohnung",
  hinweis: "Hinweis",
  aushang: "Aushang",
  auftraggeber: "Auftraggeber",
  hook: "Aufhänger",
  briefing: "Briefing",
  objectives: "Ziele",
  complications: "Komplikationen",
  clues: "Hinweise",
  rewards: "Belohnungen",
  outcomes: "Ausgänge",
  success: "Erfolg",
  partial: "Teilerfolg",
  failure: "Fehlschlag"
};

const STRUCTURED_FIELD_ORDER = [
  "id",
  "tier",
  "vergehen",
  "beschreibung",
  "zuletzt_gesehen",
  "besonderer_hinweis",
  "belohnung",
  "hinweis",
  "aushang",
  "auftraggeber",
  "hook",
  "briefing",
  "objectives",
  "complications",
  "clues",
  "rewards",
  "outcomes"
];

function fieldLabel(key){
  return STRUCTURED_FIELD_LABELS[key] || repairText(String(key)).replaceAll("_", " ");
}

function renderStructuredFieldValue(value){
  if (Array.isArray(value)){
    return `<ul>${value.map(entry => `<li>${renderStructuredFieldValue(entry)}</li>`).join("")}</ul>`;
  }

  if (value && typeof value === "object"){
    return `
      <dl class="structured-subfields">
        ${Object.entries(value).map(([key, entry]) => `
          <div>
            <dt>${escapeHtml(fieldLabel(key))}</dt>
            <dd>${renderStructuredFieldValue(entry)}</dd>
          </div>
        `).join("")}
      </dl>
    `;
  }

  return escapeHtml(value);
}

function renderStructuredTableValueHtml(value){
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return escapeHtml(formatTableValue(value));
  }

  const title = value.titel || value.name || value.id || "Eintrag";
  const subtitle = [value.tier, value.belohnung, value.auftraggeber].filter(Boolean).map(formatTableValue).join(" • ");
  const hiddenTitleKeys = new Set(["titel", "name"]);
  const orderedKeys = [
    ...STRUCTURED_FIELD_ORDER.filter(key => Object.prototype.hasOwnProperty.call(value, key)),
    ...Object.keys(value).filter(key => !STRUCTURED_FIELD_ORDER.includes(key))
  ].filter(key => !hiddenTitleKeys.has(key));

  return `
    <article class="structured-entry">
      <div class="structured-entry-title">${escapeHtml(title)}</div>
      ${subtitle ? `<div class="structured-entry-subtitle">${escapeHtml(subtitle)}</div>` : ""}
      <dl class="structured-fields">
        ${orderedKeys.map(key => `
          <div class="structured-field">
            <dt>${escapeHtml(fieldLabel(key))}</dt>
            <dd>${renderStructuredFieldValue(value[key])}</dd>
          </div>
        `).join("")}
      </dl>
    </article>
  `;
}

function getTablePartCount(table){
  const headerCount = Array.isArray(table.header) ? table.header.length : 0;
  const entryCount = [...(table.rangeEntries || []), ...(table.entries || [])]
    .reduce((max, entry) => {
      const value = entry?.value ?? entry;
      return Array.isArray(value) ? Math.max(max, value.length) : max;
    }, 0);

  return Math.max(headerCount, entryCount, 1);
}

function getTablePartLabel(table, index){
  if (Array.isArray(table.header) && table.header[index] != null) {
    return repairText(String(table.header[index]));
  }
  if (!Array.isArray(table.header) && typeof table.header === "string" && index === 0) {
    return repairText(table.header);
  }
  return `Teil ${index + 1}`;
}

function rollTableValue(table){
  if (table.rangeEntries.length){
    const dice = parseTableDiceSpec(table.dice);
    const max = Math.max(...table.rangeEntries.map(entry => entry.max));
    const roll = dice ? randomInt(1, dice.count * dice.sides) : randomInt(1, max);
    const hit = table.rangeEntries.find(entry => roll >= entry.min && roll <= entry.max) ?? table.rangeEntries[0];
    return { roll, value: hit?.value ?? null };
  }

  if (table.entries.length){
    const value = table.entries[randomInt(0, table.entries.length - 1)];
    return { roll: null, value };
  }

  return { roll: null, value: null };
}

function trimTrailingZeros(value){
  return String(value).replace(/\.0+$/,"").replace(/(\.\d*?)0+$/,"$1");
}

function formatPrice(price){
  if (price == null || price === "") return "";
  if (typeof price === "number") return trimTrailingZeros(price);
  if (typeof price === "string") return repairText(price).trim();
  if (typeof price !== "object") return String(price);

  const amount = price.amount != null ? trimTrailingZeros(price.amount) : "";
  const currency = repairText(price.currency ?? price.unit ?? "").trim();
  return [amount, currency].filter(Boolean).join(" ").trim();
}

function formatWeight(weight){
  if (weight == null || weight === "") return "";
  if (typeof weight === "number") return weight > 0 ? trimTrailingZeros(weight) : "";
  if (typeof weight === "string") return repairText(weight).trim();
  if (typeof weight !== "object") return String(weight);

  const rawAmount = weight.value != null ? weight.value : weight.amount;
  const numericAmount = Number(rawAmount);
  if (Number.isFinite(numericAmount) && numericAmount <= 0) return "";

  const amount = rawAmount != null ? trimTrailingZeros(rawAmount) : "";
  const unit = repairText(weight.unit ?? "").trim();
  return [amount, unit].filter(Boolean).join(" ").trim();
}

function weightValue(weight){
  if (weight == null || weight === "") return null;
  if (typeof weight === "number") return Number.isFinite(weight) ? weight : null;
  if (typeof weight === "string") {
    const match = repairText(weight).trim().match(/^-?\d+(?:[.,]\d+)?/);
    if (!match) return null;
    const parsed = Number(match[0].replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (typeof weight !== "object") return null;

  const rawAmount = weight.value != null ? weight.value : weight.amount;
  const numericAmount = Number(rawAmount);
  return Number.isFinite(numericAmount) ? numericAmount : null;
}

function normalizeVendors(vendors){
  const source = Array.isArray(vendors)
    ? vendors
    : (vendors == null || vendors === "" ? [] : [vendors]);

  return source
    .map(entry => repairText(String(entry ?? "")).trim())
    .filter(Boolean);
}

function mapValue(value, entries){
  const raw = repairText(String(value ?? ""));
  const key = raw.trim().toLowerCase();
  return entries[key] ?? raw;
}

export function escapeHtml(s){
  return repairText(String(s ?? ""))
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

export function normalizeTable(raw, fallbackLabel = ""){
  if (!raw || typeof raw !== "object") return null;

  const repaired = deepRepair(raw);
  const rangeEntries = Object.entries(repaired)
    .map(([key, value]) => {
      const range = parseTableKey(key);
      return range ? { ...range, value } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.min - b.min || a.max - b.max);

  const entries = Array.isArray(repaired.entries)
    ? repaired.entries.map(entry => deepRepair(entry))
    : rangeEntries.map(entry => entry.value);

  const name = repairText(
    repaired.name ??
    repaired.title ??
    repaired.titel ??
    fallbackLabel ??
    repaired.id ??
    "Tabelle"
  ).trim();

  return {
    ...repaired,
    name: name || "Tabelle",
    dice: normalizeTableDice(repaired.dice),
    entries,
    rangeEntries,
    header: deepRepair(repaired.header)
  };
}

export function renderTableHtml(rawTable, rollResult){
  const table = normalizeTable(rawTable);
  if (!table) return "";

  const entries = table.rangeEntries.length
    ? table.rangeEntries
    : table.entries.map((value, index) => ({ min: index + 1, max: index + 1, value }));
  if (!entries.length) return "";

  const rangeLabel = entry => entry.min === entry.max ? String(entry.min) : `${entry.min}-${entry.max}`;

  if (table.parts){
    const partCount = getTablePartCount(table);
    const parts = Array.isArray(rollResult?.parts) ? rollResult.parts : [];
    const headers = Array.from({ length: partCount }, (_, index) => getTablePartLabel(table, index));

    return `
      <div class="table-scroll">
        <table class="roll-table">
          <thead>
            <tr>
              <th>Wurf</th>
              ${headers.map(header => `<th>${escapeHtml(header)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${entries.map(entry => `
              <tr>
                <td class="mono">${escapeHtml(rangeLabel(entry))}</td>
                ${headers.map((_, index) => {
                  const value = Array.isArray(entry.value) ? (entry.value[index] ?? "") : entry.value;
                  const selected = parts.some(part => part.index === index && part.roll != null && part.roll >= entry.min && part.roll <= entry.max);
                  return `<td class="${selected ? "rolled-cell" : ""}">${renderStructuredTableValueHtml(value)}</td>`;
                }).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="table-scroll">
      <table class="roll-table">
        <thead>
          <tr><th>Wurf</th><th>${escapeHtml(table.header || "Ergebnis")}</th></tr>
        </thead>
        <tbody>
          ${entries.map(entry => {
            const selected = rollResult?.roll != null && rollResult.roll >= entry.min && rollResult.roll <= entry.max;
            return `
              <tr class="${selected ? "rolled-row" : ""}">
                <td class="mono">${escapeHtml(rangeLabel(entry))}</td>
                <td>${renderStructuredTableValueHtml(entry.value)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

export function rollTableEntry(rawTable){
  const table = normalizeTable(rawTable);
  if (!table) return { roll: null, text: "(keine Tabelle)", value: null };

  if (table.parts){
    const partCount = getTablePartCount(table);
    const parts = Array.from({ length: partCount }, (_, index) => {
      const rolled = rollTableValue(table);
      const rawValue = Array.isArray(rolled.value)
        ? (rolled.value[index] ?? rolled.value[rolled.value.length - 1] ?? "")
        : rolled.value;

      return {
        index,
        label: getTablePartLabel(table, index),
        roll: rolled.roll,
        text: formatTableValue(rawValue),
        value: rawValue
      };
    });

    return {
      roll: null,
      text: formatTableValue(parts.map(part => part.text).filter(Boolean)),
      value: parts.map(part => part.value),
      parts
    };
  }

  const rolled = rollTableValue(table);
  if (rolled.value != null) {
    return {
      roll: rolled.roll,
      text: formatTableValue(rolled.value),
      value: rolled.value
    };
  }

  return { roll: null, text: "(keine Einträge)", value: null };
}

export function mod(score){ return Math.floor((Number(score) - 10) / 2); }

export function fmtSigned(n){
  n = Number(n);
  if (Number.isNaN(n)) return "—";
  return n >= 0 ? `+${n}` : `${n}`;
}

export function slugify(value){
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\u00df/g, "ss")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"`´’]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function refDisplayName(ref){
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  return String(ref.name ?? ref.label ?? ref.id ?? "");
}

function cleanedLookupVariants(value){
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  const variants = new Set([raw]);
  variants.add(raw.replace(/\*/g, " "));
  variants.add(raw.replace(/\([^)]*\)/g, " "));
  variants.add(raw.replace(/\[[^\]]*\]/g, " "));
  variants.add(raw.replace(/["“”„]/g, " "));
  variants.add(raw.replace(/[:;,./]+$/g, " "));

  return [...variants]
    .map(v => v.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function buildLookupIndex(entries, { includeAliases = true } = {}){
  const map = new Map();

  function add(key, value){
    const slug = slugify(key);
    if (slug && !map.has(slug)) map.set(slug, value);
  }

  for (const entry of entries || []){
    if (!entry) continue;

    const hit = {
      id: String(entry.id ?? "").trim(),
      name: String(entry.name ?? entry.id ?? "").trim()
    };

    if (!hit.id && !hit.name) continue;

    add(hit.id, hit);
    add(hit.name, hit);

    if (includeAliases && Array.isArray(entry.aliases)) {
      for (const alias of entry.aliases) add(alias, hit);
    }
  }

  return map;
}

export function normalizeEntityRef(ref){
  if (!ref) return null;
  if (typeof ref === "string") {
    const value = ref.trim();
    return value ? { id: value, name: value } : null;
  }
  if (typeof ref !== "object") return null;

  const id = String(ref.id ?? "").trim();
  const name = String(ref.name ?? ref.label ?? ref.id ?? "").trim();
  if (!id && !name) return null;

  return { ...ref, id: id || slugify(name), name: name || id };
}

export function resolveEntityRef(ref, lookup){
  const normalized = normalizeEntityRef(ref);
  if (!normalized) return null;

  for (const candidate of cleanedLookupVariants(refDisplayName(normalized))) {
    const hit = lookup?.get(slugify(candidate));
    if (hit) return { ...normalized, id: hit.id, name: normalized.name || hit.name };
  }

  if (normalized.id) {
    const hit = lookup?.get(slugify(normalized.id));
    if (hit) return { ...normalized, id: hit.id, name: normalized.name || hit.name };
  }

  return normalized;
}

export function entityHref(kind, id, { base = "./" } = {}){
  const cleanId = String(id ?? "").trim();
  if (!cleanId) return null;

  if (kind === "spell") return `${base}spell.html?id=${encodeURIComponent(cleanId)}`;
  if (kind === "monster") return `${base}monster.html?id=${encodeURIComponent(cleanId)}`;
  if (kind === "pc") return `${base}pc.html?id=${encodeURIComponent(cleanId)}`;
  if (kind === "npc") return `${base}npc.html?id=${encodeURIComponent(cleanId)}`;
  if (kind === "item") return `${base}item.html?id=${encodeURIComponent(cleanId)}`;
  return null;
}

export function entityLinkHtml(kind, ref, { base = "./" } = {}){
  const normalized = normalizeEntityRef(ref);
  if (!normalized) return "";

  const label = escapeHtml(normalized.name || normalized.id).replaceAll("-", " ");
  const href = entityHref(kind, normalized.id, { base });
  return href ? `<a href="${href}">${label}</a>` : label;
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

// ----------------------------------------------------------------------------
// Rich text helpers (for trusted JSON content)
// ----------------------------------------------------------------------------

export function stripHtml(html){
  const s = String(html ?? "");
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Very small sanitizer to avoid accidental script injection from JSON.
 * (Not a full HTML sanitizer; it just removes <script> blocks and inline handlers.)
 */
export function sanitizeHtml(html){
  let s = String(html ?? "");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  // remove inline handlers like onclick="..."
  s = s.replace(/\son\w+\s*=\s*"[^"]*"/gi, "");
  s = s.replace(/\son\w+\s*=\s*'[^']*'/gi, "");
  s = s.replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
  // block javascript: URLs
  s = s.replace(/\shref\s*=\s*"javascript:[^"]*"/gi, ' href="#"');
  s = s.replace(/\shref\s*=\s*'javascript:[^']*'/gi, " href='#'");
  return s;
}

// ----------------------------------------------------------------------------
// Normalizers (support multiple JSON schemas)
// ----------------------------------------------------------------------------

export function normalizeSpell(raw){
  if (!raw || typeof raw !== "object") return raw;
  raw = deepRepair(raw);

  const d = (raw.description && typeof raw.description === "object") ? raw.description : null;

  const html = raw.html ?? d?.html ?? "";
  const text =
    raw.text ??
    d?.text ??
    d?.["text-full"] ??
    (html ? stripHtml(html) : "");

  const level = raw.level != null ? Number(raw.level) : 0;

  return {
    ...raw,
    level: Number.isFinite(level) ? level : 0,
    casting_time: raw.casting_time ?? raw.time ?? raw.castingTime ?? raw.cast ?? "",
    text,
    html: html ? sanitizeHtml(html) : ""
  };
}

export function normalizeItem(raw){
  if (!raw || typeof raw !== "object") return raw;
  raw = deepRepair(raw);

  const d = (raw.description && typeof raw.description === "object") ? raw.description : null;
  const descriptionHtml = typeof raw.description === "string" ? sanitizeHtml(raw.description) : "";
  const html = raw.html ?? d?.html ?? descriptionHtml ?? "";
  const text =
    raw.text ??
    d?.text ??
    d?.["text-full"] ??
    (html ? stripHtml(html) : "");

  const attText = (typeof raw.attunement === "string" ? raw.attunement : (raw.attunement_text ?? ""));
  const attBool = (typeof raw.attunement === "boolean") ? raw.attunement : !!String(attText ?? "").trim();

  return {
    ...raw,
    text,
    html: html ? sanitizeHtml(html) : "",
    description_html: html ? sanitizeHtml(html) : "",
    attunement_text: attText,
    attunement: attBool,
    price: formatPrice(raw.price),
    weight: formatWeight(raw.weight),
    weight_value: weightValue(raw.weight),
    vendors: normalizeVendors(raw.vendors ?? raw.vendor)
  };
}

function normalizeMonsterSize(size){
  return mapValue(size, {
    tiny: "Winzig",
    winzig: "Winzig",
    small: "Klein",
    klein: "Klein",
    medium: "Mittel",
    mittel: "Mittel",
    large: "Groß",
    "groß": "Groß",
    gross: "Groß",
    huge: "Riesig",
    riesig: "Riesig",
    gargantuan: "Gigantisch",
    gigantisch: "Gigantisch"
  });
}

function normalizeMonsterType(type){
  return mapValue(type, {
    aberration: "Aberration",
    tier: "Tier",
    beast: "Tier",
    himmelswesen: "Himmelswesen",
    celestial: "Himmelswesen",
    konstrukt: "Konstrukt",
    construct: "Konstrukt",
    drache: "Drache",
    dragon: "Drache",
    elementar: "Elementar",
    elemental: "Elementar",
    fee: "Feenwesen",
    fey: "Feenwesen",
    feenwesen: "Feenwesen",
    unhold: "Unhold",
    fiend: "Unhold",
    teufel: "Unhold",
    riese: "Riese",
    giant: "Riese",
    humanoid: "Humanoid",
    "monstrosität": "Monstrosität",
    monstrosity: "Monstrosität",
    schlick: "Schleim",
    ooze: "Schleim",
    pflanze: "Pflanze",
    plant: "Pflanze",
    untoter: "Untot",
    untot: "Untot",
    undead: "Untot"
  });
}

function normalizeMonsterAlignment(al){
  return mapValue(al, {
    "lawful good": "gesetzestreu-gut",
    "gesetzestreu-gut": "gesetzestreu-gut",
    "gesetztreu-gut": "gesetzestreu-gut",
    "neutral good": "neutral-gut",
    "neutral-gut": "neutral-gut",
    "chaotic good": "chaotisch-gut",
    "chaotisch-gut": "chaotisch-gut",
    "lawful neutral": "gesetzestreu-neutral",
    "gesetzestreu-neutral": "gesetzestreu-neutral",
    "gesetztreu-neutral": "gesetzestreu-neutral",
    neutral: "neutral",
    "chaotic neutral": "chaotisch-neutral",
    "chaotisch-neutral": "chaotisch-neutral",
    "lawful evil": "gesetzestreu-böse",
    "gesetzestreu-böse": "gesetzestreu-böse",
    "gesetztreu-böse": "gesetzestreu-böse",
    "neutral evil": "neutral-böse",
    "neutral-böse": "neutral-böse",
    "chaotic evil": "chaotisch-böse",
    "chaotisch-böse": "chaotisch-böse",
    unaligned: "gesinnungslos",
    gesinnungslos: "gesinnungslos"
  });
}

function proficiencyBonusFromCR(cr){
  const n = Number(cr);
  if (!Number.isFinite(n)) return null;
  if (n <= 4) return 2;
  if (n <= 8) return 3;
  if (n <= 12) return 4;
  if (n <= 16) return 5;
  if (n <= 20) return 6;
  if (n <= 24) return 7;
  if (n <= 28) return 8;
  return 9; // 29-30
}

// SRD DE uses meters; 1.5 m ≈ 5 ft in 5e conversions
function metersToFeetRounded(meters){
  const ft = (meters * 10) / 3;
  return Math.round(ft / 5) * 5;
}

function parseDistanceToFeet(x){
  if (x == null) return null;
  if (typeof x === "number") return x;
  const s = String(x).trim().toLowerCase();
  const m = s.match(/([\d.,]+)\s*m\b/);
  if (m){
    const meters = parseFloat(m[1].replace(",", "."));
    return Number.isFinite(meters) ? metersToFeetRounded(meters) : null;
  }
  const f = s.match(/([\d.,]+)\s*ft\b/);
  if (f){
    const ft = parseFloat(f[1].replace(",", "."));
    return Number.isFinite(ft) ? ft : null;
  }
  const num = parseFloat(s.replace(",", "."));
  return Number.isFinite(num) ? num : null;
}

function parseAbilitiesFromAttributesArray(arr){
  const ab = {};
  if (!Array.isArray(arr)) return ab;
  for (const it of arr){
    const k = String(it?.class ?? "").trim().toLowerCase();
    const v = Number(it?.value);
    if (!["str","dex","con","int","wis","cha"].includes(k)) continue;
    if (!Number.isFinite(v)) continue;
    ab[k] = v;
  }
  return ab;
}

export function normalizeMonster(raw){
  if (!raw || typeof raw !== "object") return raw;
  raw = deepRepair(raw);

  // If it already looks like the site schema, keep it.
  if (raw.abilities && raw.hp && raw.speed && raw.ac != null) {
    return {
      ...raw,
      size: normalizeMonsterSize(raw.size),
      type: raw.type && typeof raw.type === "object"
        ? { ...raw.type, type: normalizeMonsterType(raw.type.type) }
        : { type: normalizeMonsterType(raw.type), tags: [] },
      alignment: normalizeMonsterAlignment(raw.alignment),
      xp: raw.xp ?? raw.challenge?.xp ?? ""
    };
  }

  const acObj = raw["armor-class"];
  const ac = (acObj && typeof acObj === "object") ? String(acObj.value ?? "") : String(raw.ac ?? "");
  const ac_note = (acObj && typeof acObj === "object") ? String(acObj.info ?? "").replace(/^\(|\)$/g,"").trim() : String(raw.ac_note ?? "");

  const hpObj = raw["hit-points"];
  const hp = {
    average: (hpObj && typeof hpObj === "object") ? String(hpObj.value ?? "") : String(raw.hp?.average ?? raw.hp ?? ""),
    formula: (hpObj && typeof hpObj === "object") ? String(hpObj.formula ?? "") : String(raw.hp?.formula ?? "")
  };

  const sp = raw.speeds ?? raw.speed ?? {};
  const speed = {};
  if (sp && typeof sp === "object"){
    if (sp.walk != null) speed.walk = parseDistanceToFeet(sp.walk) ?? sp.walk;
    if (sp.fly != null) speed.fly = parseDistanceToFeet(sp.fly) ?? sp.fly;
    if (sp.swim != null) speed.swim = parseDistanceToFeet(sp.swim) ?? sp.swim;
    if (sp.climb != null) speed.climb = parseDistanceToFeet(sp.climb) ?? sp.climb;
    if (sp.burrow != null) speed.burrow = parseDistanceToFeet(sp.burrow) ?? sp.burrow;
  }

  const abilities = parseAbilitiesFromAttributesArray(raw.attributes);

  const size = normalizeMonsterSize(raw.size);
  const type = { type: normalizeMonsterType(raw.type), tags: [] };
  const alignment = normalizeMonsterAlignment(raw.alignment);

  const saving_throws = Array.isArray(raw["saving-throws"]) ? raw["saving-throws"].join(", ") : (raw.saving_throws ?? "");
  const skills = Array.isArray(raw.skills) ? raw.skills.join(", ") : (raw.skills ?? "");

  const damage_immunities =
    raw.damage_immunities ??
    raw["damage-immunities"] ??
    raw["damage-immunitys"] ??
    [];

  const senses = Array.isArray(raw.senses) ? raw.senses.join(", ") : (raw.senses ?? "");
  const languages = Array.isArray(raw.languages) ? raw.languages : (raw.languages ? [String(raw.languages)] : []);

  const cr = raw.challenge != null ? String(raw.challenge) : (raw.challenge?.cr ?? "");
  const challenge = { cr, proficiency_bonus: proficiencyBonusFromCR(cr) };

  const traits = Array.isArray(raw.traits)
    ? raw.traits.map(t => ({ name: t.name, text: t.text ?? t.value ?? "" }))
    : (raw.traits ?? []);

  const actions = Array.isArray(raw.actions)
    ? raw.actions.map(a => ({ name: a.name, text: a.text ?? a.value ?? a.type ?? "" }))
    : (raw.actions ?? []);

  const legendary_actions = Array.isArray(raw["legendary-actions"])
    ? raw["legendary-actions"].map(a => ({ name: a.name, text: a.text ?? a.value ?? "" }))
    : (raw.legendary_actions ?? []);

  return {
    ...raw,
    size,
    type,
    alignment,
    ac,
    ac_note,
    hp,
    speed,
    abilities,
    saving_throws,
    skills,
    damage_immunities,
    senses,
    languages,
    challenge,
    xp: raw.xp ?? raw.challenge?.xp ?? "",
    traits,
    actions,
    legendary_actions,
  };
}


function lowerAbilityMap(scores){
  const out = {};
  const keys = [["STR", "str"], ["DEX", "dex"], ["CON", "con"], ["INT", "int"], ["WIS", "wis"], ["CHA", "cha"]];
  for (const [src, dest] of keys){
    const score = Number(scores?.[src]?.score);
    if (Number.isFinite(score)) out[dest] = score;
  }
  return out;
}

function normalizeRefList(list){
  return (Array.isArray(list) ? list : [])
    .map(normalizeEntityRef)
    .filter(Boolean);
}

function uniqueRefs(list){
  const seen = new Set();
  const out = [];

  for (const ref of normalizeRefList(list)){
    const key = String(ref.id || ref.name || "").toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(ref);
  }

  return out;
}

export function normalizeNpc(raw){
  if (!raw || typeof raw !== "object") return raw;
  raw = deepRepair(raw);

  if (raw.kind === "monster" || raw.npc) {
    const abilities = {};
    for (const key of ["str", "dex", "con", "int", "wis", "cha"]) {
      const value = raw.abilities?.[key];
      const score = typeof value === "object" ? Number(value?.score) : Number(value);
      if (Number.isFinite(score)) abilities[key] = score;
    }

    const languages = raw.languages && typeof raw.languages === "object" && !Array.isArray(raw.languages)
      ? [...(raw.languages.speaks || []), ...(raw.languages.understands || []).map(x => `versteht ${x}`)]
      : (Array.isArray(raw.languages) ? raw.languages : (raw.languages ? [String(raw.languages)] : []));

    return {
      ...raw,
      id: raw.id || slugify(raw.name),
      name: raw.name || "NSC",
      race: raw.subtype || raw.creature_type || "",
      role: raw.role || "",
      faction: raw.faction || "",
      size: raw.size || "",
      type: raw.creature_type || raw.type || "",
      alignment: raw.alignment || "",
      ac: raw.armor_class?.value ?? raw.ac ?? null,
      ac_note: raw.armor_class?.display ?? raw.ac_note ?? "",
      hp: raw.hit_points?.average ?? raw.hp?.average ?? raw.hp ?? null,
      hp_formula: raw.hit_points?.formula ?? raw.hp?.formula ?? "",
      speed: raw.speed || {},
      abilities,
      saving_throws: raw.saving_throws || {},
      skills: raw.skills || {},
      senses: raw.senses || {},
      languages,
      challenge: {
        cr: String(raw.challenge_rating ?? raw.challenge?.cr ?? raw.challenge ?? ""),
        proficiency_bonus: raw.proficiency_bonus ?? raw.challenge?.proficiency_bonus ?? null
      },
      xp: raw.xp ?? "",
      notes: raw.notes || "",
      traits: Array.isArray(raw.traits) ? raw.traits.map(t => ({ name: t.name, text: t.text ?? t.value ?? "" })) : [],
      actions: Array.isArray(raw.actions) ? raw.actions.map(a => ({ name: a.name, text: a.text ?? a.value ?? a.type ?? "" })) : [],
      bonus_actions: Array.isArray(raw.bonus_actions) ? raw.bonus_actions.map(a => ({ name: a.name, text: a.text ?? a.value ?? a.type ?? "" })) : [],
      reactions: Array.isArray(raw.reactions) ? raw.reactions.map(a => ({ name: a.name, text: a.text ?? a.value ?? a.type ?? "" })) : [],
      legendary_actions: Array.isArray(raw.legendary_actions) ? raw.legendary_actions.map(a => ({ name: a.name, text: a.text ?? a.value ?? a.type ?? "" })) : [],
      spellcasting: Array.isArray(raw.spellcasting) ? raw.spellcasting : []
    };
  }

  const normalized = normalizeMonster(raw);
  return {
    ...normalized,
    id: normalized.id || slugify(normalized.name),
    name: normalized.name || "NSC",
    race: raw.race || "",
    role: raw.role || "",
    faction: raw.faction || "",
    hp_formula: normalized.hp?.formula ?? "",
    notes: raw.notes || "",
    bonus_actions: Array.isArray(normalized.bonus_actions) ? normalized.bonus_actions : [],
    reactions: Array.isArray(normalized.reactions) ? normalized.reactions : [],
    spellcasting: Array.isArray(normalized.spellcasting) ? normalized.spellcasting : []
  };
}

export function normalizePc(raw){
  if (!raw || typeof raw !== "object") return raw;
  raw = deepRepair(raw);

  if (!raw.character) {
    const spellSections = Array.isArray(raw.spell_sections) ? raw.spell_sections : [];
    const itemSections = Array.isArray(raw.item_sections) ? raw.item_sections : [];
    return {
      ...raw,
      spell_sections: spellSections,
      item_sections: itemSections,
      spells: uniqueRefs(raw.spells || spellSections.flatMap(s => s?.refs || [])),
      items: uniqueRefs(raw.items || itemSections.flatMap(s => s?.refs || []))
    };
  }

  const c = raw.character;
  const identity = c.identity || {};
  const klass = identity.class || {};
  const combat = c.combat || {};
  const equipment = c.equipment || {};
  const features = c.features || {};
  const spellcasting = c.spellcasting || {};

  const spellSections = [];
  const cantrips = normalizeRefList(spellcasting.cantrips);
  if (cantrips.length) spellSections.push({ label: "Zaubertricks", refs: cantrips });

  for (const [key, value] of Object.entries(spellcasting)) {
    const m = key.match(/^level_(\d+)_spells_listed$/);
    if (!m) continue;
    const refs = normalizeRefList(value);
    if (refs.length) spellSections.push({ label: `Grad ${m[1]}`, refs });
  }

  for (const entry of spellcasting.always_prepared || []) {
    const refs = normalizeRefList(entry?.spells);
    if (refs.length) spellSections.push({ label: entry.source || "Immer vorbereitet", refs, notes: entry.notes || [] });
  }

  for (const entry of spellcasting.special_sources || []) {
    const refs = normalizeRefList(entry?.spells);
    if (refs.length) spellSections.push({ label: entry.source || "Besondere Quelle", refs, notes: entry.notes || [] });
  }

  const itemSections = [];
  const carriedItems = uniqueRefs((equipment.items || []).map(item => item?.item_ref || item?.ref || (item?.id || item?.name ? { id: item?.id, name: item?.name } : null)));
  if (carriedItems.length) itemSections.push({ label: "Ausrüstung", refs: carriedItems });

  const attunedItems = uniqueRefs((equipment.attuned_magic_items_listed || []).map(item => item?.item_ref || item?.ref || (item?.id || item?.name ? { id: item?.id, name: item?.name } : null)));
  if (attunedItems.length) itemSections.push({ label: "Eingestimmt", refs: attunedItems });

  const featureItems = uniqueRefs([
    ...(features.talents_and_magic_items_text || []).map(item => item?.item_ref),
    ...(features.attuned_magic_items_text || []).map(item => item?.item_ref)
  ]);
  if (featureItems.length) itemSections.push({ label: "Genannte Gegenstände", refs: featureItems });

  return {
    ...raw,
    id: raw.id || slugify(identity.name),
    name: identity.name || raw.name || "SC",
    player: identity.player_name || raw.player || "",
    race: identity.race || raw.race || "",
    class: klass.name || raw.class || "",
    subclass: klass.subclass || raw.subclass || "",
    level: klass.level ?? raw.level ?? "",
    portrait: identity.appearance?.img || raw.portrait || "",
    ac: combat.armor_class ?? raw.ac ?? null,
    hp: combat.hp?.max ?? raw.hp ?? null,
    speed: combat.speeds?.walk != null ? `${combat.speeds.walk} m` : (raw.speed ?? null),
    abilities: lowerAbilityMap(c.ability_scores || {}),
    spell_sections: spellSections,
    item_sections: itemSections,
    spells: uniqueRefs(spellSections.flatMap(section => section.refs || [])),
    items: uniqueRefs(itemSections.flatMap(section => section.refs || [])),
    notes: raw.notes || ""
  };
}

export function linkifyRefs(text, { base = "./" } = {}) {
  const s = String(text ?? "");
  const re = /\[\[(spell|monster|pc|npc|item):([^\]]+)\]\]/gi;

  let out = "";
  let last = 0;

  for (const m of s.matchAll(re)) {
    const kind = String(m[1]).toLowerCase();
    const id = String(m[2]).trim();
    const start = m.index ?? 0;

    out += escapeHtml(s.slice(last, start)).replaceAll("\n", "<br/>");

    const label = escapeHtml(id.replaceAll("-", " "));
    let href = null;

    if (kind === "spell") href = `${base}spell.html?id=${encodeURIComponent(id)}`;
    else if (kind === "monster") href = `${base}monster.html?id=${encodeURIComponent(id)}`;
    else if (kind === "pc") href = `${base}pc.html?id=${encodeURIComponent(id)}`;
    else if (kind === "npc") href = `${base}npc.html?id=${encodeURIComponent(id)}`;
    else if (kind === "item") href = `${base}item.html?id=${encodeURIComponent(id)}`;

    out += href ? `<a href="${href}">${label}</a>` : label;
    last = start + String(m[0]).length;
  }

  out += escapeHtml(s.slice(last)).replaceAll("\n", "<br/>");
  return out;
}
