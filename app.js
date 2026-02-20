const PAGES = [
  // group, title, path
  ["Core", "House rules & table conventions", "content/house-rules/index.md"],
  ["Core", "Safety tools & expectations", "content/safety/index.md"],
  ["Core", "Character options (allowed/bans/nerfs)", "content/character-options/index.md"],

  ["World", "Player-facing lore (overview)", "content/lore/index.md"],
  ["World", "Gazetteer", "content/lore/gazetteer.md"],
  ["World", "Factions", "content/lore/factions.md"],
  ["World", "Religions", "content/lore/religions.md"],

  ["Play", "Travel & downtime rules", "content/travel-downtime/index.md"],
  ["Play", "Treasure & crafting rules", "content/treasure-crafting/index.md"],

  ["Handouts", "Handouts index", "content/handouts/index.md"],
  ["Handouts", "Letters / prop text", "content/handouts/letters.md"],
  ["Handouts", "Puzzles", "content/handouts/puzzles.md"],

  ["Recaps", "Session recap archive", "content/recaps/index.md"],
  ["Recaps", "Session 01 (2026-02-10)", "content/recaps/2026-02-10-session-01.md"],
  ["Recaps", "Session 02 (2026-02-17)", "content/recaps/2026-02-17-session-02.md"],
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
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
}

function simpleMarkdown(md) {
  // code blocks ``` ```
  const codeBlocks = [];
  md = md.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code);
    return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
  });

  // headings
  md = md.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  md = md.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  md = md.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // blockquotes
  md = md.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");

  // lists
  md = md.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  md = md.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

  // inline code
  md = md.replace(/`([^`]+)`/g, "<code>$1</code>");

  // links [text](url)
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`);

  // paragraphs (very basic)
  md = md
    .split(/\n{2,}/)
    .map(block => {
      const b = block.trim();
      if (!b) return "";
      if (b.startsWith("<h") || b.startsWith("<ul>") || b.startsWith("<blockquote>")) return b;
      return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  // restore code blocks
  md = md.replace(/@@CODEBLOCK_(\d+)@@/g, (_, i) => {
    const code = escapeHtml(codeBlocks[Number(i)].replace(/^\n+|\n+$/g, ""));
    return `<pre><code>${code}</code></pre>`;
  });

  return md;
}

async function loadPage(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) {
    contentEl.innerHTML = `<h1>Not found</h1><p>Could not load <code>${escapeHtml(path)}</code>.</p>`;
    return;
  }
  const md = await res.text();
  contentEl.innerHTML = simpleMarkdown(md);
}

function getActivePathFromHash() {
  const h = location.hash.replace(/^#/, "");
  if (!h) return PAGES[0][2];
  try { return decodeURIComponent(h); } catch { return PAGES[0][2]; }
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
  // fetch all pages once to allow search
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
    contentEl.innerHTML = `<h1>Search</h1><p>No results.</p>`;
    return;
  }
  contentEl.innerHTML = `
    <h1>Search</h1>
    <p>${matches.length} result(s)</p>
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
    if (!q) return; // keep current page
    const matches = index
      .filter(d => d.title.toLowerCase().includes(q) || d.text.includes(q))
      .slice(0, 30);
    renderNav(null);
    renderSearchResults(matches);
  });
})();