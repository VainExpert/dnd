const PAGES = [
  ["Start", "Startseite", "content/home.md"],

  ["Regeln", "Regelübersicht", "content/rules/index.md"],
  ["Regeln", "Hausregeln & Tischkonventionen", "content/rules/house-rules/index.md"],
  ["Regeln", "Gegenstands- & Herstellungsregeln", "content/rules/treasure-crafting/index.md"],
  ["Regeln", "Reise- & Freizeitregeln", "content/rules/travel-downtime/index.md"],
  ["Regeln", "Charakteroptionen", "content/rules/character-options/index.md"],
  ["Regeln", "Kampfregeln", "content/rules/combat.md"],
  ["Regeln", "Zauberregeln", "content/rules/spells.md"],
  ["Regeln", "Statuseffekte", "content/rules/status-effects.md"],

  ["Kern", "Spiele am Tisch", "content/rules/house-rules/games.md"],
  ["Kern", "Sicherheitswerkzeuge & Erwartungen", "content/safety/index.md"],

  ["Welt", "Lore-Übersicht", "content/lore/index.md"],
  ["Welt", "Online-Kampagne", "content/lore/online-kampagne/index.md"],
  ["Welt", "Hauptkampagne", "content/lore/hauptkampagne/index.md"],
  ["Welt", "GM", "content/lore/gm/index.md"],
  ["Welt", "Geteiltes Wissen", "content/lore/geteiltes-wissen/index.md"],
  ["Welt", "Ortsverzeichnis", "content/lore/geteiltes-wissen/gazetteer.md"],
  ["Welt", "Länder", "content/lore/geteiltes-wissen/country.md"],
  ["Welt", "Religionen", "content/lore/geteiltes-wissen/religion.md"],

  ["Handouts", "Handout-Übersicht", "content/handouts/index.md"],
  ["Handouts", "Briefe / Requisitentexte", "content/handouts/briefe.md"],
  ["Handouts", "Pamphlets", "content/handouts/pamphlets.md"],
  ["Handouts", "Rätsel", "content/handouts/puzzles.md"],

  ["Rückblicke", "Archiv der Sitzungsrückblicke", "content/recaps/index.md"],
];

const contentEl = document.getElementById("content");
const searchEl = document.getElementById("search");

function renderNav() {
  if (typeof window.DND_RENDER_NAV === "function") {
    window.DND_RENDER_NAV();
  }
}

function escapeHtml(s) {
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
}

function prettifyEntityId(id) {
  return String(id || "")
    .replace(/\.(json|html?)$/i, "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .trim()
    .replace(/\b\S/g, ch => ch.toLocaleUpperCase("de-DE"));
}

function normalizeRollExpression(expr) {
  return String(expr || "").trim().replace(/\s+/g, "").replace(/w/gi, "d");
}

function formatRollExpression(expr) {
  return normalizeRollExpression(expr).replace(/d/gi, "W");
}

function normalizeInlineKind(kind) {
  const value = String(kind || "").trim().toLowerCase();
  if (value === "spell" || value === "zauber") return "spell";
  if (value === "monster") return "monster";
  if (value === "npc" || value === "nsc") return "npc";
  if (value === "pc" || value === "charakter") return "pc";
  if (value === "item" || value === "gegenstand") return "item";
  if (value === "class" || value === "klasse") return "class";
  if (value === "subclass" || value === "subklasse" || value === "unterklasse") return "subclass";
  if (value === "background" || value === "hintergrund") return "background";
  if (value === "feat" || value === "talent") return "feat";
  if (value === "race" || value === "volk") return "race";
  if (value === "status" || value === "zustand" || value === "condition" || value === "effect" || value === "effekt") return "status";
  if (value === "table" || value === "tabelle") return "table";
  if (value === "roll" || value === "wurf" || value === "wuerfel") return "roll";
  return value;
}

function sanitizeMarkdownHref(url) {
  const value = String(url ?? "").trim();
  if (!value) return null;
  if (/^(https?:|mailto:|#|\/|\.\.?(?:\/|$))/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return null;
  if (/^[^\s<>"']+$/i.test(value)) return value;
  return null;
}

function normalizeContentPath(path) {
  const parts = [];
  for (const part of String(path ?? "").replaceAll("\\", "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

function resolveMarkdownHref(url, currentPath = "") {
  const href = sanitizeMarkdownHref(url);
  if (!href) return null;
  if (href.startsWith("#") || /^(https?:|mailto:|\/)/i.test(href)) return href;

  const [targetPath, fragment = ""] = href.split("#", 2);
  const baseDir = String(currentPath || "").replaceAll("\\", "/").replace(/\/[^/]*$/, "");
  const resolvedPath = targetPath.startsWith("content/")
    ? normalizeContentPath(targetPath)
    : normalizeContentPath(`${baseDir}/${targetPath}`);

  if (/\.md$/i.test(targetPath)) {
    return `#${encodeURIComponent(fragment ? `${resolvedPath}#${fragment}` : resolvedPath)}`;
  }

  return fragment ? `${resolvedPath}#${fragment}` : resolvedPath;
}

function applyInlineMarkdown(text) {
  let html = String(text ?? "");
  html = html.replace(/\+\+([^\n+](?:.*?[^\n+])?)\+\+/g, "<u>$1</u>");
  html = html.replace(/\*\*\*([^\n*](?:.*?[^\n*])?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/___([^\n_](?:.*?[^\n_])?)___/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*([^\n*](?:.*?[^\n*])?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^\n_](?:.*?[^\n_])?)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^\*])\*([^*\n][^*\n]*?)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/(^|[^_])_([^_\n][^_\n]*?)_(?!_)/g, "$1<em>$2</em>");

  return html;
}

function slugifyHeading(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\u00df/g, "ss")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function statusAnchorSlug(value) {
  const slug = slugifyHeading(value);
  const aliases = {
    blind: "blind",
    blinded: "blind",
    bezaubert: "bezaubert",
    charmed: "bezaubert",
    betaubt: "betaubt",
    stunned: "betaubt",
    bewusstlos: "bewusstlos",
    unconscious: "bewusstlos",
    festgesetzt: "festgesetzt",
    restrained: "festgesetzt",
    gelahmt: "gelahmt",
    paralyzed: "gelahmt",
    gepackt: "gepackt",
    grappled: "gepackt",
    liegend: "liegend",
    prone: "liegend",
    taub: "taub",
    deafened: "taub",
    unsichtbar: "unsichtbar",
    invisible: "unsichtbar",
    vergiftet: "vergiftet",
    poisoned: "vergiftet",
    verangstigt: "verangstigt",
    frightened: "verangstigt",
    versteinert: "versteinert",
    petrified: "versteinert"
  };
  return aliases[slug] || slug;
}

const INLINE_REFERENCE_SOURCES = {
  spell: { basePath: "data/spells", indexPath: "data/spells/index.json" },
  monster: { basePath: "data/monsters", indexPath: "data/monsters/index.json" },
  npc: { basePath: "data/monsters/npc", indexPath: "data/monsters/npc/index.json" },
  pc: { basePath: "data/pcs", indexPath: "data/pcs/index.json" },
  item: { basePath: "data/items", indexPath: "data/items/index.json" },
  table: { basePath: "data/tables", indexPath: "data/tables/index.json" },
  class: { basePath: "data/classes", indexPath: "data/classes/index.json" },
  subclass: { basePath: "data/classes/subclasses", indexPath: "data/classes/subclasses/index.json" },
  background: { basePath: "data/backgrounds", indexPath: "data/backgrounds/index.json" },
  feat: { basePath: "data/feats", indexPath: "data/feats/index.json" },
  race: { basePath: "data/races", indexPath: "data/races/index.json" }
};

const inlineReferenceStores = new Map();

function lookupSlug(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\u00df/g, "ss")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function lookupCandidates(value) {
  const raw = String(value ?? "").trim();
  const withoutExtension = raw.replace(/\.(json|html?)$/i, "");
  return [...new Set([
    raw,
    withoutExtension,
    raw.toLowerCase(),
    withoutExtension.toLowerCase(),
    lookupSlug(raw),
    lookupSlug(withoutExtension)
  ].filter(Boolean))];
}

function getEntryName(entry, fallbackId) {
  return entry?.name || entry?.title || entry?.titel || entry?.label || fallbackId;
}

function addLookupKeys(map, key, value) {
  for (const candidate of lookupCandidates(key)) {
    if (candidate && !map.has(candidate)) map.set(candidate, value);
  }
}

function registerInlineReferenceEntry(store, file, entry) {
  if (!entry || typeof entry !== "object") return;

  const fallbackId = String(file ?? "").split("/").pop().replace(/\.json$/i, "");
  const id = String(entry.id || entry.slug || fallbackId).trim();
  const name = String(getEntryName(entry, id)).trim();
  if (!id && !name) return;

  const hit = { id: id || fallbackId, name: name || id || fallbackId };
  addLookupKeys(store.entries, hit.id, hit);
  addLookupKeys(store.entries, hit.name, hit);

  if (Array.isArray(entry.aliases)) {
    for (const alias of entry.aliases) addLookupKeys(store.entries, alias, hit);
  }
}

async function getInlineReferenceStore(kind) {
  const normalizedKind = normalizeInlineKind(kind);
  if (inlineReferenceStores.has(normalizedKind)) return inlineReferenceStores.get(normalizedKind);

  const config = INLINE_REFERENCE_SOURCES[normalizedKind];
  const store = {
    filesByKey: new Map(),
    entries: new Map(),
    pending: new Map()
  };
  inlineReferenceStores.set(normalizedKind, store);
  if (!config) return store;

  try {
    const response = await fetch(config.indexPath, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const files = Array.isArray(payload) ? payload : Array.isArray(payload?.files) ? payload.files : [];

    for (const file of files) {
      const value = String(file ?? "").trim();
      if (!value) continue;
      const basename = value.split("/").pop();
      addLookupKeys(store.filesByKey, value, value);
      addLookupKeys(store.filesByKey, basename, value);
    }
  } catch (error) {
    console.warn(`Inline-Lookups fuer ${normalizedKind} konnten nicht geladen werden.`, error);
  }

  return store;
}

async function ensureInlineReferenceEntry(kind, id) {
  const normalizedKind = normalizeInlineKind(kind);
  const store = await getInlineReferenceStore(normalizedKind);
  const existing = lookupEntityName(normalizedKind, id, { [normalizedKind]: store.entries });
  if (existing) return existing;

  const file = lookupCandidates(id)
    .map(candidate => store.filesByKey.get(candidate))
    .find(Boolean);
  if (!file) return "";

  if (!store.pending.has(file)) {
    const config = INLINE_REFERENCE_SOURCES[normalizedKind];
    const request = fetch(`${config.basePath}/${file}`, { cache: "no-cache" })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(entry => {
        registerInlineReferenceEntry(store, file, entry);
      })
      .catch(error => {
        console.warn(`${normalizedKind}:${file} konnte nicht fuer Inline-Links geladen werden.`, error);
      })
      .finally(() => {
        store.pending.delete(file);
      });
    store.pending.set(file, request);
  }

  await store.pending.get(file);
  return lookupEntityName(normalizedKind, id, { [normalizedKind]: store.entries });
}

async function loadInlineReferenceLookups(markdown) {
  const references = [];
  const pattern = /\[\[([a-z]+):([^|\]]+)(?:\|([^\]]+))?\]\]/gi;

  for (const match of String(markdown ?? "").matchAll(pattern)) {
    const kind = normalizeInlineKind(match[1]);
    const id = String(match[2] ?? "").trim();
    const label = String(match[3] ?? "").trim();
    if (!kind || !id || label || kind === "roll" || kind === "status") continue;
    references.push({ kind, id });
  }

  const uniqueRefs = new Map();
  for (const ref of references) {
    uniqueRefs.set(`${ref.kind}:${lookupSlug(ref.id)}`, ref);
  }

  await Promise.all([...uniqueRefs.values()].map(ref => ensureInlineReferenceEntry(ref.kind, ref.id)));

  const lookups = {};
  for (const kind of new Set([...uniqueRefs.values()].map(ref => ref.kind))) {
    const store = inlineReferenceStores.get(kind);
    if (store?.entries?.size) lookups[kind] = store.entries;
  }
  return lookups;
}

function lookupEntityName(kind, id, lookups) {
  const lookup = lookups?.[kind];
  if (!lookup) return "";

  for (const key of lookupCandidates(id)) {
    const hit = lookup instanceof Map ? lookup.get(key) : lookup[key];
    if (hit) return String(hit.name ?? hit.title ?? hit.label ?? hit.id ?? hit);
  }

  return "";
}

function simpleMarkdown(md, currentPath = "", { lookups = {} } = {}) {
  const htmlTokens = [];
  const reserveHtml = (html) => {
    const token = `@@HTMLTOKEN_${htmlTokens.length}@@`;
    htmlTokens.push(String(html ?? ""));
    return token;
  };
  const restoreHtml = (value) => String(value ?? "").replace(/@@HTMLTOKEN_(\d+)@@/g, (_, i) => htmlTokens[Number(i)] ?? "");

  function renderInline(text) {
    let html = String(text ?? "");
    html = html.replace(/`([^`\n]+)`/g, (_, code) => reserveHtml(`<code>${escapeHtml(code)}</code>`));
    html = html.replace(/\[\[([a-z]+):([^|\]]+)(?:\|([^\]]+))?\]\]/gi, (_, kind, id, label) => renderInlineReference(kind, id, label));
    html = escapeHtml(html);
    html = html.replace(/\[([^\]\n]+)\]\(([^)\n]+)\)/g, (_, label, url) => {
      const href = resolveMarkdownHref(url, currentPath);
      if (!href) return label;
      const attrs = href.startsWith("#")
        ? ""
        : ' target="_blank" rel="noopener noreferrer"';
      return reserveHtml(`<a href="${escapeHtml(href)}"${attrs}>${applyInlineMarkdown(label)}</a>`);
    });
    html = applyInlineMarkdown(html);
    return restoreHtml(html);
  }

  function renderInlineReference(kind, id, label) {
    const k = normalizeInlineKind(kind);
    const slug = String(id).trim();
    const resolvedName = lookupEntityName(k, slug, lookups);
    const text = applyInlineMarkdown(escapeHtml(String(label || (k === "roll" ? formatRollExpression(slug) : resolvedName || prettifyEntityId(slug)))));
    if (k === "spell") return reserveHtml(`<a href="./pages/zauber/spell.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "monster") return reserveHtml(`<a href="./pages/bestiarium/monster.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "pc") return reserveHtml(`<a href="./pages/spieler/pc.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "npc") return reserveHtml(`<a href="./pages/bestiarium/npc.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "item") return reserveHtml(`<a href="./pages/items/item.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "class") return reserveHtml(`<a href="./pages/charakteroptionen/option.html?type=class&id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "subclass") return reserveHtml(`<a href="./pages/charakteroptionen/option.html?type=subclass&id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "background") return reserveHtml(`<a href="./pages/charakteroptionen/option.html?type=background&id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "feat") return reserveHtml(`<a href="./pages/charakteroptionen/option.html?type=feat&id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "race") return reserveHtml(`<a href="./pages/charakteroptionen/option.html?type=race&id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "status") return reserveHtml(`<a href="#${encodeURIComponent(`content/rules/status-effects.md#${statusAnchorSlug(slug)}`)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "table") return reserveHtml(`<a href="./pages/werkzeuge/dice.html?table_file=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "roll") return reserveHtml(`<a href="./pages/werkzeuge/dice.html?expr=${encodeURIComponent(normalizeRollExpression(slug))}&auto=1" target="dnd-dice" rel="noopener">${text}</a>`);
    return text;
  }

  const lines = String(md ?? "").replace(/\r\n?/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let unordered = [];
  let ordered = [];
  let quote = [];
  let code = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${paragraph.map(renderInline).join("<br/>")}</p>`);
    paragraph = [];
  };
  const flushUnordered = () => {
    if (!unordered.length) return;
    output.push(`<ul>${unordered.map(item => `<li>${renderInline(item)}</li>`).join("\n")}</ul>`);
    unordered = [];
  };
  const flushOrdered = () => {
    if (!ordered.length) return;
    output.push(`<ol>${ordered.map(item => `<li>${renderInline(item)}</li>`).join("\n")}</ol>`);
    ordered = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    output.push(`<blockquote>${quote.map(renderInline).join("<br/>")}</blockquote>`);
    quote = [];
  };
  const flushBlocks = () => {
    flushParagraph();
    flushUnordered();
    flushOrdered();
    flushQuote();
  };

  function splitMarkdownTableRow(line) {
    const trimmed = String(line ?? "").trim();
    const row = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed;
    const source = row.endsWith("|") ? row.slice(0, -1) : row;
    const cells = [];
    let cell = "";
    let inCodeSpan = false;
    let escaped = false;

    for (const char of source) {
      if (escaped) {
        cell += char;
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === "`") inCodeSpan = !inCodeSpan;
      if (char === "|" && !inCodeSpan) {
        cells.push(cell.trim());
        cell = "";
        continue;
      }
      cell += char;
    }

    if (escaped) cell += "\\";
    cells.push(cell.trim());
    return cells;
  }

  function parseTableDelimiterRow(line) {
    if (!String(line ?? "").includes("|")) return null;
    const cells = splitMarkdownTableRow(line);
    if (!cells.length) return null;

    const alignments = [];
    for (const cell of cells) {
      const compact = cell.replace(/\s+/g, "");
      if (!/^:?-{3,}:?$/.test(compact)) return null;
      const left = compact.startsWith(":");
      const right = compact.endsWith(":");
      alignments.push(left && right ? "center" : right ? "right" : left ? "left" : "");
    }
    return alignments;
  }

  function isTableStart(index) {
    const header = lines[index];
    const delimiter = lines[index + 1];
    if (!header || !delimiter || !header.includes("|")) return false;
    return Boolean(parseTableDelimiterRow(delimiter));
  }

  function renderTableRow(line, alignments, cellTag) {
    const cells = splitMarkdownTableRow(line);
    return `<tr>${alignments.map((alignment, index) => {
      const style = alignment ? ` style="text-align:${alignment}"` : "";
      return `<${cellTag}${style}>${renderInline(cells[index] ?? "")}</${cellTag}>`;
    }).join("")}</tr>`;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      if (inCode) {
        output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushBlocks();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (isTableStart(i)) {
      flushBlocks();
      const alignments = parseTableDelimiterRow(lines[i + 1]);
      const bodyRows = [];
      i += 2;

      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
        bodyRows.push(lines[i]);
        i++;
      }
      i--;

      output.push(`
        <div class="markdown-table-scroll">
          <table class="markdown-table">
            <thead>${renderTableRow(line, alignments, "th")}</thead>
            <tbody>${bodyRows.map(row => renderTableRow(row, alignments, "td")).join("\n")}</tbody>
          </table>
        </div>
      `);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushBlocks();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugifyHeading(text);
      output.push(`<h${level}${id ? ` id="${escapeHtml(id)}"` : ""}>${renderInline(text)}</h${level}>`);
      continue;
    }

    const unorderedItem = /^\s*[-*+]\s+(.*)$/.exec(line);
    if (unorderedItem) {
      flushParagraph();
      flushOrdered();
      flushQuote();
      unordered.push(unorderedItem[1]);
      continue;
    }

    const orderedItem = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (orderedItem) {
      flushParagraph();
      flushUnordered();
      flushQuote();
      ordered.push(orderedItem[1]);
      continue;
    }

    const quoteLine = /^>\s?(.*)$/.exec(line);
    if (quoteLine) {
      flushParagraph();
      flushUnordered();
      flushOrdered();
      quote.push(quoteLine[1]);
      continue;
    }

    if (!line.trim()) {
      flushBlocks();
      continue;
    }

    flushUnordered();
    flushOrdered();
    flushQuote();
    paragraph.push(line.trim());
  }

  if (inCode) output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  flushBlocks();

  return output.join("\n");
}

async function loadPage(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) {
    contentEl.innerHTML = `<h1>Nicht gefunden</h1><p><code>${escapeHtml(path)}</code> konnte nicht geladen werden.</p>`;
    return;
  }
  const md = await res.text();
  const lookups = await loadInlineReferenceLookups(md);
  contentEl.innerHTML = simpleMarkdown(md, path, { lookups });
}

function getActivePathFromHash() {
  const h = location.hash.replace(/^#/, "");
  if (!h) return "content/home.md";
  try { return decodeURIComponent(h); } catch { return "content/home.md"; }
}

function wireRouting() {
  async function onRoute() {
    const active = getActivePathFromHash();
    const [path, fragment = ""] = active.split("#", 2);
    renderNav(path);
    await loadPage(path);
    if (fragment) {
      const target = document.getElementById(fragment);
      if (target) target.scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", onRoute);
  onRoute();
}

async function buildSearchIndex() {
  const docs = [];
  for (const [, title, path] of PAGES) {
    try {
      const [fetchPath] = path.split("#", 1);
      const t = await fetch(fetchPath).then(r => r.ok ? r.text() : "");
      docs.push({ title, path, text: (t || "").toLowerCase() });
    } catch {
      docs.push({ title, path, text: "" });
    }
  }
  return docs;
}

function renderSearchResults(matches) {
  if (!matches.length) {
    contentEl.innerHTML = `<h1>Suche</h1><p>Keine Treffer.</p>`;
    return;
  }
  contentEl.innerHTML = `
    <h1>Suche</h1>
    <p>${matches.length} Treffer</p>
    <ul>
      ${matches.map(m => `<li><a href="#${encodeURIComponent(m.path)}">${escapeHtml(m.title)}</a></li>`).join("")}
    </ul>
  `;
}

(async function init(){
  wireRouting();

  const index = await buildSearchIndex();
  searchEl.addEventListener("input", (e) => {
    const q = (e.target.value || "").trim().toLowerCase();
    if (!q) return;
    const matches = index
      .filter(d => d.title.toLowerCase().includes(q) || d.text.includes(q))
      .slice(0, 30);
    renderNav(null);
    renderSearchResults(matches);
  });
})();
