import fs from "fs";
import path from "path";

const root = process.cwd();

function readJson(filePath){
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

function writeJson(filePath, data){
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function slugify(value){
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

function baseName(filePath){
  return path.basename(filePath, ".json");
}

function cleanedVariants(value){
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  const variants = new Set([raw]);
  variants.add(raw.replace(/\*/g, " "));
  variants.add(raw.replace(/\([^)]*\)/g, " "));
  variants.add(raw.replace(/\[[^\]]*\]/g, " "));
  variants.add(raw.replace(/["“”„]/g, " "));
  variants.add(raw.replace(/[:;,./]+$/g, " "));
  variants.add(raw.replace(/\b\d+x\b/gi, " "));

  return [...variants]
    .map(v => v.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function walkJson(dir){
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkJson(full));
    else if (entry.isFile() && entry.name.endsWith(".json") && entry.name !== "index.json") out.push(full);
  }
  return out;
}

function buildRegistry(dir){
  const map = new Map();
  for (const filePath of walkJson(dir)) {
    let data;
    try {
      data = readJson(filePath);
    } catch {
      continue;
    }

    const entry = {
      id: String(data.id ?? baseName(filePath)).trim(),
      name: String(data.name ?? data.id ?? baseName(filePath)).trim()
    };

    const keys = [entry.id, entry.name, baseName(filePath), ...(Array.isArray(data.aliases) ? data.aliases : [])];
    for (const key of keys) {
      for (const variant of cleanedVariants(key)) {
        const slug = slugify(variant);
        if (slug && !map.has(slug)) map.set(slug, entry);
      }
    }
  }
  return map;
}

function resolveRef(value, registry){
  if (!value) return null;
  const rawName = typeof value === "string" ? value : String(value.name ?? value.id ?? "");
  const rawId = typeof value === "object" ? String(value.id ?? "").trim() : "";

  const candidates = [...cleanedVariants(rawName), rawId].filter(Boolean);
  for (const candidate of candidates) {
    const hit = registry.get(slugify(candidate));
    if (hit) return { id: hit.id, name: hit.name };
  }

  if (rawId) return { id: rawId, name: rawName || rawId };
  return null;
}

function mapSpellArray(list, registry, unresolved, context){
  if (!Array.isArray(list)) return list;
  return list.map((entry, index) => {
    if (typeof entry === "object" && entry && !Array.isArray(entry)) {
      if (entry.name || entry.id) {
        const ref = resolveRef(entry, registry);
        if (ref) return { ...entry, ...ref };
        unresolved.push(`${context}[${index}] -> ${entry.name || entry.id}`);
      }
      return entry;
    }
    const ref = resolveRef(entry, registry);
    if (ref) return ref;
    unresolved.push(`${context}[${index}] -> ${entry}`);
    return entry;
  });
}

function enrichItemObject(item, registry, unresolved, context){
  if (!item || typeof item !== "object") return item;
  const ref = resolveRef(item.item_ref || item.ref || item, registry);
  const next = { ...item };
  if (ref) next.item_ref = ref;
  else if (item.name) unresolved.push(`${context} -> ${item.name}`);

  if (Array.isArray(item.contents_listed)) {
    next.contents_listed = item.contents_listed.map((child, index) => enrichItemObject(child, registry, unresolved, `${context}.contents_listed[${index}]`));
  }

  return next;
}

const spellRegistry = buildRegistry(path.join(root, "data", "spells"));
const itemRegistry = buildRegistry(path.join(root, "data", "items"));

const pcUnresolved = [];
const pcParseErrors = [];
for (const filePath of walkJson(path.join(root, "data", "pcs"))) {
  let data;
  try {
    data = readJson(filePath);
  } catch (error) {
    pcParseErrors.push(`${baseName(filePath)} -> ${error.message}`);
    continue;
  }
  data.id = data.id || baseName(filePath);

  const character = data.character || {};
  const spellcasting = character.spellcasting || {};
  const features = character.features || {};
  const equipment = character.equipment || {};
  const combat = character.combat || {};

  if (Array.isArray(spellcasting.cantrips)) spellcasting.cantrips = mapSpellArray(spellcasting.cantrips, spellRegistry, pcUnresolved, `${baseName(filePath)}.spellcasting.cantrips`);
  for (const [key, value] of Object.entries(spellcasting)) {
    if (/^level_\d+_spells_listed$/.test(key) && Array.isArray(value)) {
      spellcasting[key] = mapSpellArray(value, spellRegistry, pcUnresolved, `${baseName(filePath)}.spellcasting.${key}`);
    }
  }
  if (Array.isArray(spellcasting.always_prepared)) {
    spellcasting.always_prepared = spellcasting.always_prepared.map((entry, index) => ({
      ...entry,
      spells: mapSpellArray(entry?.spells || [], spellRegistry, pcUnresolved, `${baseName(filePath)}.spellcasting.always_prepared[${index}].spells`)
    }));
  }
  if (Array.isArray(spellcasting.special_sources)) {
    spellcasting.special_sources = spellcasting.special_sources.map((entry, index) => ({
      ...entry,
      spells: mapSpellArray(entry?.spells || [], spellRegistry, pcUnresolved, `${baseName(filePath)}.spellcasting.special_sources[${index}].spells`)
    }));
  }

  if (Array.isArray(features.subclass)) {
    features.subclass = features.subclass.map((entry, index) => ({
      ...entry,
      always_prepared_spells: mapSpellArray(entry?.always_prepared_spells || [], spellRegistry, pcUnresolved, `${baseName(filePath)}.features.subclass[${index}].always_prepared_spells`)
    }));
  }
  if (Array.isArray(features.background)) {
    features.background = features.background.map((entry, index) => {
      const next = { ...entry };
      if (Array.isArray(entry?.granted_cantrips)) {
        next.granted_cantrips = mapSpellArray(entry.granted_cantrips, spellRegistry, pcUnresolved, `${baseName(filePath)}.features.background[${index}].granted_cantrips`);
      }
      if (entry?.granted_level_1_spell_always_prepared) {
        const ref = resolveRef(entry.granted_level_1_spell_always_prepared, spellRegistry);
        if (ref) next.granted_level_1_spell_always_prepared = ref;
      }
      return next;
    });
  }

  if (Array.isArray(combat.attacks_and_cantrips)) {
    combat.attacks_and_cantrips = combat.attacks_and_cantrips.map((entry, index) => {
      const next = { ...entry };
      const spellRef = resolveRef(entry?.spell_ref || entry?.name, spellRegistry);
      const itemRef = resolveRef(entry?.item_ref || entry?.name, itemRegistry);
      if (spellRef) next.spell_ref = spellRef;
      else if (itemRef) next.item_ref = itemRef;
      else if (entry?.name) pcUnresolved.push(`${baseName(filePath)}.combat.attacks_and_cantrips[${index}] -> ${entry.name}`);
      return next;
    });
  }

  if (Array.isArray(equipment.items)) {
    equipment.items = equipment.items.map((item, index) => enrichItemObject(item, itemRegistry, pcUnresolved, `${baseName(filePath)}.equipment.items[${index}]`));
  }
  if (Array.isArray(equipment.attuned_magic_items_listed)) {
    equipment.attuned_magic_items_listed = equipment.attuned_magic_items_listed.map((item, index) => enrichItemObject(item, itemRegistry, pcUnresolved, `${baseName(filePath)}.equipment.attuned_magic_items_listed[${index}]`));
  }

  for (const key of ["talents_and_magic_items_text", "attuned_magic_items_text"]) {
    if (Array.isArray(features[key])) {
      features[key] = features[key].map((entry, index) => {
        const next = { ...entry };
        const ref = resolveRef(entry?.item_ref || entry?.name, itemRegistry);
        if (ref) next.item_ref = ref;
        else if (entry?.name) pcUnresolved.push(`${baseName(filePath)}.features.${key}[${index}] -> ${entry.name}`);
        return next;
      });
    }
  }

  writeJson(filePath, data);
}

const monsterUnresolved = [];
const monsterParseErrors = [];
for (const filePath of walkJson(path.join(root, "data", "monsters", "npc"))) {
  let data;
  try {
    data = readJson(filePath);
  } catch (error) {
    monsterParseErrors.push(`${baseName(filePath)} -> ${error.message}`);
    continue;
  }
  if (!Array.isArray(data.spellcasting)) continue;

  data.spellcasting = data.spellcasting.map((entry, index) => {
    const next = { ...entry };
    if (!entry?.spells || typeof entry.spells !== "object") return next;

    const spells = {};
    for (const [key, value] of Object.entries(entry.spells)) {
      spells[key] = mapSpellArray(value, spellRegistry, monsterUnresolved, `${baseName(filePath)}.spellcasting[${index}].spells.${key}`);
    }
    next.spells = spells;
    return next;
  });

  writeJson(filePath, data);
}

console.log(`Updated PC files: ${walkJson(path.join(root, "data", "pcs")).length}`);
console.log(`Updated NPC monster files: ${walkJson(path.join(root, "data", "monsters", "npc")).length}`);
console.log(`Unresolved PC refs: ${pcUnresolved.length}`);
console.log(`Unresolved monster refs: ${monsterUnresolved.length}`);
console.log(`PC parse errors: ${pcParseErrors.length}`);
console.log(`Monster parse errors: ${monsterParseErrors.length}`);

if (pcUnresolved.length) {
  console.log("PC unresolved samples:");
  for (const line of pcUnresolved.slice(0, 30)) console.log(`  - ${line}`);
}
if (monsterUnresolved.length) {
  console.log("Monster unresolved samples:");
  for (const line of monsterUnresolved.slice(0, 30)) console.log(`  - ${line}`);
}
if (pcParseErrors.length) {
  console.log("PC parse error samples:");
  for (const line of pcParseErrors.slice(0, 10)) console.log(`  - ${line}`);
}
if (monsterParseErrors.length) {
  console.log("Monster parse error samples:");
  for (const line of monsterParseErrors.slice(0, 10)) console.log(`  - ${line}`);
}
