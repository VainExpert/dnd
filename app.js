const PAGES = [
  ["Start", "Startseite", "content/home.md"],

  ["Kern", "Hausregeln & Tischkonventionen", "content/house-rules/index.md"],
  ["Kern", "Verfolgungsjagden", "content/house-rules/chase.md"],
  ["Kern", "Spiele am Tisch", "content/house-rules/games.md"],
  ["Kern", "Sicherheitswerkzeuge & Erwartungen", "content/safety/index.md"],
  ["Kern", "Charakteroptionen", "content/character-options/index.md"],

  ["Welt", "Spielerwissen (Überblick)", "content/lore/index.md"],
  ["Welt", "Ortsverzeichnis", "content/lore/gazetteer.md"],
  ["Welt", "Länder", "content/lore/country.md"],
  ["Welt", "Religionen", "content/lore/religion.md"],

  ["Spiel", "Reise- & Auszeitregeln", "content/travel-downtime/index.md"],
  ["Spiel", "Schatz- & Herstellungsregeln", "content/treasure-crafting/index.md"],

  ["Handouts", "Handout-Übersicht", "content/handouts/index.md"],
  ["Handouts", "Briefe / Requisitentexte", "content/handouts/letters.md"],
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

function simpleMarkdown(md) {
  const codeBlocks = [];
  md = md.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code);
    return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
  });

  md = md.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  md = md.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  md = md.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  md = md.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");

  md = md.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  md = md.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

  md = md.replace(/`([^`]+)`/g, "<code>$1</code>");

  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    if (url.startsWith("#")) return `<a href="${url}">${text}</a>`;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  md = md
    .split(/\n{2,}/)
    .map(block => {
      const b = block.trim();
      if (!b) return "";
      if (b.startsWith("<h") || b.startsWith("<ul>") || b.startsWith("<blockquote>")) return b;
      return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  md = md.replace(/@@CODEBLOCK_(\d+)@@/g, (_, i) => {
    const code = escapeHtml(codeBlocks[Number(i)].replace(/^\n+|\n+$/g, ""));
    return `<pre><code>${code}</code></pre>`;
  });

  md = md.replace(/\[\[(spell|monster|pc|npc|item):([^\]]+)\]\]/gi, (_, kind, id) => {
    const k = String(kind).toLowerCase();
    const slug = String(id).trim();
    const label = slug.replaceAll("-", " ");
    if (k === "spell") return `<a href="./pages/zauber/spell.html?id=${encodeURIComponent(slug)}">${label}</a>`;
    if (k === "monster") return `<a href="./pages/bestiarium/monster.html?id=${encodeURIComponent(slug)}">${label}</a>`;
    if (k === "pc") return `<a href="./pages/spieler/pc.html?id=${encodeURIComponent(slug)}">${label}</a>`;
    if (k === "npc") return `<a href="./pages/bestiarium/npc.html?id=${encodeURIComponent(slug)}">${label}</a>`;
    if (k === "item") return `<a href="./pages/items/item.html?id=${encodeURIComponent(slug)}">${label}</a>`;
    return label;
  });

  return md;
}

async function loadPage(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) {
    contentEl.innerHTML = `<h1>Nicht gefunden</h1><p><code>${escapeHtml(path)}</code> konnte nicht geladen werden.</p>`;
    return;
  }
  const md = await res.text();
  contentEl.innerHTML = simpleMarkdown(md);
}

function getActivePathFromHash() {
  const h = location.hash.replace(/^#/, "");
  if (!h) return "content/home.md";
  try { return decodeURIComponent(h); } catch { return "content/home.md"; }
}

function wireRouting() {
  async function onRoute() {
    const active = getActivePathFromHash();
    renderNav(active);
    await loadPage(active);
  }
  window.addEventListener("hashchange", onRoute);
  onRoute();
}

async function buildSearchIndex() {
  const docs = [];
  for (const [, title, path] of PAGES) {
    try {
      const t = await fetch(path).then(r => r.ok ? r.text() : "");
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
