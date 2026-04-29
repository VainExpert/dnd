(function () {
  const NAV_GROUPS = [
    {
      title: "Start",
      links: [
        { label: "Startseite", href: "index.html#content/home.md" }
      ]
    },
    {
      title: "Regeln",
      links: [
        { label: "Regelübersicht", href: "index.html#content/rules/index.md" },
        { label: "Hausregeln", href: "index.html#content/house-rules/index.md" },
        { label: "Gegenstände & Fertigung", href: "index.html#content/treasure-crafting/index.md" },
        { label: "Reise & Auszeit", href: "index.html#content/travel-downtime/index.md" },
        { label: "Charakteroptionen", href: "index.html#content/character-options/index.md" },
        { label: "Kampfregeln", href: "index.html#content/rules/combat.md" },
        { label: "Zauberregeln", href: "index.html#content/rules/spells.md" },
        { label: "Statuseffekte", href: "index.html#content/rules/status-effects.md" },
        { label: "Kritische Treffer", href: "index.html#content/rules/combat.md#kritische-treffer" }
      ]
    },
    {
      title: "Kampagne",
      links: [
        { label: "Sicherheit", href: "index.html#content/safety/index.md" },
        { label: "Lore", href: "index.html#content/lore/index.md" },
        { label: "Handouts", href: "index.html#content/handouts/index.md" },
        { label: "Rückblicke", href: "index.html#content/recaps/index.md" }
      ]
    },
    {
      title: "Sammlungen",
      links: [
        { label: "Bestiarium", href: "pages/bestiarium/bestiary.html" },
        { label: "Monster", href: "pages/bestiarium/monster.html", match: ["pages/bestiarium/monster.html"], child: true, detail: true },
        { label: "NPCs", href: "pages/bestiarium/npcs.html", child: true },
        { label: "NPC", href: "pages/bestiarium/npc.html", match: ["pages/bestiarium/npc.html"], child: true, detail: true },
        { label: "Zauber", href: "pages/zauber/spells.html" },
        { label: "Zauber-Detail", href: "pages/zauber/spell.html", match: ["pages/zauber/spell.html"], child: true, detail: true },
        { label: "Gegenstände", href: "pages/items/items.html" },
        { label: "Gegenstand", href: "pages/items/item.html", match: ["pages/items/item.html"], child: true, detail: true },
        { label: "Händlersortimente", href: "pages/items/vendors.html", child: true },
        { label: "Charakteroptionen", href: "pages/charakteroptionen/options.html" },
        { label: "Charakteroption", href: "pages/charakteroptionen/option.html", match: ["pages/charakteroptionen/option.html"], child: true, detail: true },
        { label: "Spieler", href: "pages/spieler/pcs.html" },
        { label: "Spieler-Charakter", href: "pages/spieler/pc.html", match: ["pages/spieler/pc.html"], child: true, detail: true },
        { label: "Karten", href: "pages/maps.html" },
        { label: "Symbole", href: "pages/icons.html" }
      ]
    },
    {
      title: "Werkzeuge",
      links: [
        { label: "Generatoren", href: "pages/werkzeuge/tools.html" },
        { label: "Charakter erstellen", href: "pages/werkzeuge/character-builder.html", child: true },
        { label: "NSC/Monster erstellen", href: "pages/werkzeuge/creature-builder.html", child: true },
        { label: "Würfel", href: "pages/werkzeuge/dice.html" },
        { label: "Einheiten", href: "pages/werkzeuge/units.html" }
      ]
    }
  ];

  function rootUrl(path) {
    const script = document.currentScript || document.querySelector('script[src$="nav.js"]');
    const base = script ? new URL(".", script.src) : new URL("./", location.href);
    return new URL(path, base).href;
  }

  function currentPathFromRoot() {
    const root = rootUrl("");
    const here = new URL(location.href);
    if (here.href.startsWith(root)) {
      return decodeURIComponent(here.href.slice(root.length).split("#")[0].split("?")[0]);
    }
    return decodeURIComponent(here.pathname.replace(/^.*?\/(?=pages\/|index\.html$)/, ""));
  }

  function pathFromUrl(url) {
    try {
      const root = rootUrl("");
      const parsed = new URL(url, location.href);
      if (!parsed.href.startsWith(root)) return "";
      return decodeURIComponent(parsed.href.slice(root.length).split("#")[0].split("?")[0]);
    } catch {
      return "";
    }
  }

  function makeLink(link, activePath) {
    const a = document.createElement("a");
    a.href = link.detail && (link.match || []).includes(activePath)
      ? location.href
      : rootUrl(link.href);
    a.textContent = link.label;
    if (link.child) a.classList.add("nav-child");

    const matches = link.match || [link.href.split("#")[0]];
    const linkHash = link.href.includes("#") ? "#" + link.href.split("#")[1] : "";
    const isIndexHash = activePath === "index.html" && !!location.hash;
    const isActive = !isIndexHash
      && matches.some(path => activePath === path);
    const isHashActive = isIndexHash && linkHash === location.hash;
    if (isActive || isHashActive) a.classList.add("active");

    return a;
  }

  function buildSidebar() {
    const aside = document.createElement("aside");
    aside.className = "sidebar site-sidebar";

    const nav = document.createElement("nav");
    nav.className = "nav site-nav";
    nav.setAttribute("aria-label", "Seitennavigation");

    const activePath = currentPathFromRoot() || "index.html";
    for (const group of NAV_GROUPS) {
      const wrap = document.createElement("div");
      wrap.className = "group";

      const title = document.createElement("div");
      title.className = "group-title";
      title.textContent = group.title;
      wrap.appendChild(title);

      for (const link of group.links) {
        if (link.detail && !(link.match || []).includes(activePath)) continue;
        wrap.appendChild(makeLink(link, activePath));
      }
      nav.appendChild(wrap);
    }

    aside.appendChild(nav);
    return aside;
  }

  function ensureLayout() {
    const sidebar = buildSidebar();
    const existingLayout = document.querySelector(".layout");
    const existingSidebar = document.querySelector(".sidebar");

    if (existingLayout) {
      if (existingSidebar) existingSidebar.replaceWith(sidebar);
      else existingLayout.prepend(sidebar);
      return;
    }

    const main = document.querySelector("main.main") || document.querySelector("main");
    if (!main) return;

    const layout = document.createElement("div");
    layout.className = "layout";
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(sidebar);
    layout.appendChild(main);
  }

  function render() {
    ensureLayout();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
  window.addEventListener("hashchange", render);
})();
