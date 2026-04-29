const PAGES = [
  ["Start", "Startseite", "content/home.md"],

  ["Regeln", "Regelübersicht", "content/rules/index.md"],
  ["Regeln", "Hausregeln & Tischkonventionen", "content/house-rules/index.md"],
  ["Regeln", "Gegenstands- & Herstellungsregeln", "content/treasure-crafting/index.md"],
  ["Regeln", "Reise- & Freizeitregeln", "content/travel-downtime/index.md"],
  ["Regeln", "Charakteroptionen", "content/character-options/index.md"],
  ["Regeln", "Kampfregeln", "content/rules/combat.md"],
  ["Regeln", "Zauberregeln", "content/rules/spells.md"],
  ["Regeln", "Statuseffekte", "content/rules/status-effects.md"],
  ["Regeln", "Kritische Treffer", "content/rules/combat.md#kritische-treffer"],

  ["Kern", "Spiele am Tisch", "content/house-rules/games.md"],
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

const navEl = document.getElementById("nav");
const contentEl = document.getElementById("content");
const searchEl = document.getElementById("search");

function groupPages(pages) {
  const map = new Map();
  for (const [group, title, path] of pages) {
    if (!map.has(group)) map.set(group, []);
    map.get(group).push({ title, path });
  }
  return map;
}

function renderNav(activePath) {
  if (!navEl) return;
  navEl.innerHTML = "";

  const grouped = groupPages(PAGES);
  for (const [group, items] of grouped.entries()) {
    const groupWrap = document.createElement("div");
    groupWrap.className = "group";

    const gt = document.createElement("div");
    gt.className = "group-title";
    gt.textContent = group;
    groupWrap.appendChild(gt);

    for (const it of items) {
      const a = document.createElement("a");
      a.href = `#${encodeURIComponent(it.path)}`;
      a.textContent = it.title;
      if (it.path === activePath) a.classList.add("active");
      groupWrap.appendChild(a);
    }
    navEl.appendChild(groupWrap);
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
  if (!/\.md(?:#.*)?$/i.test(href)) return href;

  const [targetPath, fragment = ""] = href.split("#", 2);
  const baseDir = String(currentPath || "").replaceAll("\\", "/").replace(/\/[^/]*$/, "");
  const resolvedPath = targetPath.startsWith("content/")
    ? normalizeContentPath(targetPath)
    : normalizeContentPath(`${baseDir}/${targetPath}`);
  return `#${encodeURIComponent(fragment ? `${resolvedPath}#${fragment}` : resolvedPath)}`;
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

function simpleMarkdown(md, currentPath = "") {
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
    const text = applyInlineMarkdown(escapeHtml(String(label || (k === "roll" ? formatRollExpression(slug) : prettifyEntityId(slug)))));
    if (k === "spell") return reserveHtml(`<a href="./pages/zauber/spell.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "monster") return reserveHtml(`<a href="./pages/bestiarium/monster.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "pc") return reserveHtml(`<a href="./pages/spieler/pc.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "npc") return reserveHtml(`<a href="./pages/bestiarium/npc.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
    if (k === "item") return reserveHtml(`<a href="./pages/items/item.html?id=${encodeURIComponent(slug)}" target="dnd-reference" rel="noopener">${text}</a>`);
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
  contentEl.innerHTML = simpleMarkdown(md, path);
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
