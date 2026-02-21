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

if (!fs.existsSync(mapsAssetsDir)) {
  console.warn("Skip maps (missing assets/maps folder)");
} else {
  if (!fs.existsSync(mapsDataDir)) fs.mkdirSync(mapsDataDir, { recursive: true });

  const existingByFile = readExistingMapsIndex();

  const imageFiles = fs
    .readdirSync(mapsAssetsDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((f) => MAP_EXTS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en"));

  const maps = imageFiles.map((file) => {
    const existing = existingByFile.get(file);
    if (existing) {
      // Preserve any manual metadata you already added (title/tags/blurb/etc.)
      return { ...existing, file };
    }
    return {
      title: titleFromFilename(file),
      file,
      tags: [],
      blurb: ""
    };
  });

  fs.writeFileSync(mapsIndexPath, JSON.stringify({ maps }, null, 2));
  console.log(`Wrote data/maps/index.json (${maps.length} maps)`);
}