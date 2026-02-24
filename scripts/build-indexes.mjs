// scripts/build-indexes.mjs
import fs from "node:fs";
import path from "node:path";

/**
 * Generates index.json files for JSON-backed collections:
 *   data/<collection>/index.json  -> { files: [...] }
 *
 * Also generates a maps index from images in:
 *   assets/maps/  -> data/maps/index.json  -> { maps: [{ title, file, tags, blurb }] }
 *
 * Supported map image extensions: .webp, .png, .jpg, .jpeg
 */

const jsonCollections = ["monsters", "spells", "items", "pcs", "tables"];

// --- JSON collections --------------------------------------------------------
for (const c of jsonCollections) {
  const dir = path.join("data", c);
  if (!fs.existsSync(dir)) {
    console.warn(`Skip data/${c} (missing folder)`);
    continue;
  }

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .sort((a, b) => a.localeCompare(b, "en"));

  fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify({ files }, null, 2));
  console.log(`Wrote data/${c}/index.json (${files.length} files)`);
}

// --- Maps collection (images) ------------------------------------------------
const mapsAssetsDir = path.join("assets", "maps");
const mapsDataDir = path.join("data", "maps");
const mapsIndexPath = path.join(mapsDataDir, "index.json");

const MAP_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

function titleFromFilename(filename) {
  const base = filename.replace(path.extname(filename), "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

// walk assets/maps recursively and return file paths relative to assets/maps
function walkFilesRecursive(rootDir) {
  /** @type {string[]} */
  const results = [];
  function walk(absDir, relDir) {
    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const e of entries) {
      const abs = path.join(absDir, e.name);
      const rel = relDir ? path.posix.join(relDir, e.name) : e.name; // POSIX for URLs
      if (e.isDirectory()) {
        walk(abs, rel);
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (MAP_EXTS.has(ext)) results.push(rel);
      }
    }
  }
  walk(rootDir, "");
  return results.sort((a, b) => a.localeCompare(b, "en"));
}

function readExistingMapsIndex() {
  try {
    if (!fs.existsSync(mapsIndexPath)) return new Map();
    const raw = fs.readFileSync(mapsIndexPath, "utf8");
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed?.maps) ? parsed.maps : [];
    const map = new Map();
    for (const m of arr) {
      if (m && typeof m.file === "string") map.set(m.file, m);
    }
    return map;
  } catch {
    return new Map();
  }
}

function folderFromRelPath(relPath) {
  const dir = path.posix.dirname(relPath);
  return dir === "." ? "" : dir; // "" means "root"
}

function folderTitle(folder) {
  if (!folder) return "Unsorted";
  // convert "feywild/upper-canopy" -> "Feywild / Upper Canopy"
  return folder
    .split("/")
    .map((seg) =>
      seg
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (m) => m.toUpperCase())
    )
    .join(" / ");
}

if (!fs.existsSync(mapsAssetsDir)) {
  console.warn("Skip maps (missing assets/maps folder)");
} else {
  if (!fs.existsSync(mapsDataDir)) fs.mkdirSync(mapsDataDir, { recursive: true });

  const existingByFile = readExistingMapsIndex();
  const relFiles = walkFilesRecursive(mapsAssetsDir);

  const maps = relFiles.map((file) => {
    const existing = existingByFile.get(file);
    const folder = folderFromRelPath(file);

    if (existing) {
      // Preserve manual metadata (tags/size/blurb/title/etc.) and ensure folder is set
      return {
        ...existing,
        file,
        folder: existing.folder ?? folder,
        folder_title: existing.folder_title ?? folderTitle(folder),
        tags: Array.isArray(existing.tags) ? existing.tags : [],
        size: existing.size ?? "" // size can be string or object; see below
      };
    }

    const filenameOnly = path.posix.basename(file);
    return {
      title: titleFromFilename(filenameOnly),
      file,                    // e.g. "feywild/yggdrasil.webp"
      folder,                  // e.g. "feywild"
      folder_title: folderTitle(folder),
      tags: [],
      // size: recommended structure:
      // size: { category: "medium", grid: { w: 30, h: 20, unit: "squares" } }
      size: "",
      blurb: ""
    };
  });

  fs.writeFileSync(mapsIndexPath, JSON.stringify({ maps }, null, 2));
  console.log(`Wrote data/maps/index.json (${maps.length} maps)`);
}

// --- Icons collection (images, recursive) -----------------------------------
const iconsAssetsDir = path.join("assets", "icons");
const iconsDataDir = path.join("data", "icons");
const iconsIndexPath = path.join(iconsDataDir, "index.json");

const ICON_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg", ".svg"]);

function walkFilesRecursive(rootDir, extsSet) {
  const results = [];
  function walk(absDir, relDir) {
    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const e of entries) {
      const abs = path.join(absDir, e.name);
      const rel = relDir ? path.posix.join(relDir, e.name) : e.name;
      if (e.isDirectory()) walk(abs, rel);
      else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (extsSet.has(ext)) results.push(rel);
      }
    }
  }
  walk(rootDir, "");
  return results.sort((a, b) => a.localeCompare(b, "en"));
}

function titleFromRelIconPath(relPath) {
  const base = path.posix.basename(relPath).replace(path.extname(relPath), "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function kindFromRelPath(relPath) {
  // expects pcs/..., npcs/..., monsters/...
  const first = relPath.split("/")[0]?.toLowerCase();
  if (first === "pcs") return "pc";
  if (first === "npcs") return "npc";
  if (first === "monsters") return "monster";
  return "other";
}

function readExistingIconsIndex() {
  try {
    if (!fs.existsSync(iconsIndexPath)) return new Map();
    const raw = fs.readFileSync(iconsIndexPath, "utf8");
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed?.icons) ? parsed.icons : [];
    const map = new Map();
    for (const it of arr) {
      if (it && typeof it.file === "string") map.set(it.file, it);
    }
    return map;
  } catch {
    return new Map();
  }
}

if (!fs.existsSync(iconsAssetsDir)) {
  console.warn("Skip icons (missing assets/icons folder)");
} else {
  if (!fs.existsSync(iconsDataDir)) fs.mkdirSync(iconsDataDir, { recursive: true });

  const existingByFile = readExistingIconsIndex();
  const relFiles = walkFilesRecursive(iconsAssetsDir, ICON_EXTS);

  const icons = relFiles.map((file) => {
    const existing = existingByFile.get(file);
    const kind = kindFromRelPath(file);

    if (existing) {
      return {
        ...existing,
        file,
        kind: existing.kind ?? kind,
        tags: Array.isArray(existing.tags) ? existing.tags : [],
      };
    }

    return {
      title: titleFromRelIconPath(file),
      file,          // e.g. "monsters/kobold.webp"
      kind,          // "pc" | "npc" | "monster" | "other"
      tags: [],
      blurb: "",
      credit: ""
    };
  });

  fs.writeFileSync(iconsIndexPath, JSON.stringify({ icons }, null, 2));
  console.log(`Wrote data/icons/index.json (${icons.length} icons)`);
}