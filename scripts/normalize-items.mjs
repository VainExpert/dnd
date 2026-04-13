import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, "assets", "items"),
  path.join(ROOT, "data", "items"),
];

const MOJIBAKE_RE = /(?:Ã.|Â.|â.|Å.|œ|ž)/;
const UTF8_DECODER = new TextDecoder("utf-8", { fatal: true });

function repairText(value) {
  const input = String(value ?? "");
  if (!MOJIBAKE_RE.test(input)) return input;

  try {
    const bytes = Uint8Array.from(input, ch => ch.charCodeAt(0) & 0xff);
    return UTF8_DECODER.decode(bytes);
  } catch {
    return input;
  }
}

function deepRepair(value) {
  if (typeof value === "string") return repairText(value);
  if (Array.isArray(value)) return value.map(deepRepair);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, deepRepair(entry)])
  );
}

function stripHtml(html) {
  return String(html ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
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

function normalizeCurrency(currency) {
  const raw = repairText(String(currency ?? "")).trim().toLowerCase();
  const map = {
    gm: "gp",
    gp: "gp",
    gold: "gp",
    sm: "sp",
    sp: "sp",
    silber: "sp",
    km: "cp",
    cp: "cp",
    kupfer: "cp",
    em: "ep",
    ep: "ep",
    pm: "pp",
    pp: "pp",
    platin: "pp",
  };
  return map[raw] ?? (raw || "gp");
}

function toNumberOrNull(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const parsed = Number.parseFloat(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeWeight(weight) {
  if (weight && typeof weight === "object" && !Array.isArray(weight)) {
    return {
      value: toNumberOrNull(weight.value ?? weight.amount),
      unit: repairText(weight.unit ?? "lb") || "lb",
    };
  }

  return {
    value: toNumberOrNull(weight) ?? 0,
    unit: "lb",
  };
}

function normalizeValue(raw) {
  const value = raw.value ?? raw.price;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      amount: toNumberOrNull(value.amount) ?? 0,
      currency: normalizeCurrency(value.currency ?? value.unit),
    };
  }

  return {
    amount: toNumberOrNull(value) ?? 0,
    currency: "gp",
  };
}

function normalizeChargeBlock(value, recharge) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      max: value.max ?? toNumberOrNull(value.amount) ?? null,
      recharge: repairText(value.recharge ?? recharge ?? null),
    };
  }

  return {
    max: toNumberOrNull(value),
    recharge: repairText(recharge ?? null),
  };
}

function deriveCategory(rawType, name = "", tags = []) {
  const type = repairText(String(rawType ?? "")).toLowerCase();
  const label = `${type} ${repairText(name).toLowerCase()} ${(tags || []).join(" ").toLowerCase()}`;

  if (/zauberstab|wand/.test(label)) return "wand";
  if (/\bzepter\b|\brod\b/.test(label)) return "rod";
  if (/\bstab\b|\bstaff\b/.test(label)) return "staff";
  if (/\bring\b/.test(label)) return "ring";
  if (/trank|potion|elixier/.test(label)) return "potion";
  if (/schriftrolle|scroll/.test(label)) return "scroll";
  if (/munition|pfeil|pfeile|bolzen|kugel|kugeln|nadeln/.test(label)) return "ammunition";
  if (/schild/.test(label)) return "armor";
  if (/rüstung|ruestung|panzer|brustplatte|kettenhemd|halbplatte|lederruestung/.test(label)) return "armor";
  if (/waffe|schwert|dolch|axt|hammer|streitkolben|kolben|speer|lanze|bogen|armbrust|flegel|glefe|hellebarde|morgenstern|peitsche|rapier|sichel|keule|knüppel|knueppel|stab/.test(label)) return "weapon";
  if (/werkzeug|instrument|fokus|symbol|emblem/.test(label)) return "adventuring-gear";
  if (/paket|zelt|seil|ration|laterne|fackel|rucksack|kleidung|decke|kiste|korb|sattel|werkzeug|schloss|flasche|krug|lampe/.test(label)) return "adventuring-gear";
  return "wondrous-item";
}

function deriveConsumable(category, rawType, name = "", tags = []) {
  const label = `${category} ${repairText(rawType).toLowerCase()} ${repairText(name).toLowerCase()} ${(tags || []).join(" ").toLowerCase()}`;
  return /potion|scroll|ammunition|gift|poison|öl|oel|trank|schriftrolle|ladung|salbe/.test(label);
}

function deriveEquippable(category, requiresAttunement, rawType, name = "") {
  if (requiresAttunement) return true;
  const label = `${category} ${repairText(rawType).toLowerCase()} ${repairText(name).toLowerCase()}`;
  return /weapon|armor|wand|rod|staff|ring|wondrous-item/.test(label);
}

function deriveEquipSlot(category, rawType, name = "") {
  const label = `${category} ${repairText(rawType).toLowerCase()} ${repairText(name).toLowerCase()}`;
  if (/ring/.test(label)) return "ring";
  if (/schild/.test(label)) return "off-hand";
  if (/waffe|weapon|schwert|dolch|axt|hammer|stab|speer|bogen|armbrust|flegel|glefe|hellebarde|rapier|peitsche/.test(label)) return "hand";
  if (/helm|hut|haube|krone|diadem/.test(label)) return "head";
  if (/handschuh/.test(label)) return "hands";
  if (/stiefel|schuhe/.test(label)) return "feet";
  if (/amulett|anhänger|anhaenger|halskette|medaillon/.test(label)) return "neck";
  if (/umhang|mantel|robe|kleidung|rüstung|ruestung|panzer|brustplatte/.test(label)) return "body";
  return null;
}

function normalizeAttunement(raw) {
  if (typeof raw.requires_attunement === "boolean") {
    return {
      requires_attunement: raw.requires_attunement,
      attunement_text: repairText(raw.attunement_text ?? ""),
    };
  }

  if (typeof raw.attunement === "boolean") {
    return {
      requires_attunement: raw.attunement,
      attunement_text: repairText(raw.attunement_text ?? ""),
    };
  }

  const text = repairText(raw.attunement ?? raw.attunement_text ?? "").trim();
  return {
    requires_attunement: Boolean(text),
    attunement_text: text,
  };
}

function normalizeSpellIds(raw) {
  const spells = raw.granted_spell_ids ?? raw.spells ?? [];
  return (Array.isArray(spells) ? spells : [])
    .map(spell => {
      if (typeof spell === "string") return slugify(spell);
      if (spell && typeof spell === "object") return slugify(spell.id ?? spell.name);
      return "";
    })
    .filter(Boolean);
}

function normalizeText(raw) {
  const description = raw.description;

  if (typeof raw.text === "string" && raw.text.trim()) return repairText(raw.text).trim();
  if (description && typeof description === "object") {
    const text = description.text ?? description["text-full"];
    if (typeof text === "string" && text.trim()) return repairText(text).trim();
    if (typeof description.html === "string" && description.html.trim()) return stripHtml(repairText(description.html));
  }
  if (typeof description === "string" && description.trim()) return stripHtml(repairText(description));
  if (typeof raw.html === "string" && raw.html.trim()) return stripHtml(repairText(raw.html));
  return "";
}

function normalizeItem(raw) {
  const repaired = deepRepair(raw);
  const { requires_attunement, attunement_text } = normalizeAttunement(repaired);
  const tags = Array.isArray(repaired.tags) ? repaired.tags.map(tag => repairText(tag)) : [];
  const item_category = repaired.item_category ?? deriveCategory(repaired.item_category ?? repaired.type, repaired.name, tags);
  const consumable = repaired.consumable ?? deriveConsumable(item_category, repaired.type, repaired.name, tags);
  const equippable = repaired.equippable ?? deriveEquippable(item_category, requires_attunement, repaired.type, repaired.name);
  const recharge = repaired.recharge ?? repaired.recovery ?? repaired.charges?.recharge ?? repaired.uses?.recharge ?? null;
  const numericUses = typeof repaired.uses === "number" ? repaired.uses : null;
  const looksCharged = ["wand", "rod", "staff"].includes(item_category) || /ladung|charges?/i.test(normalizeText(repaired));

  const charges = repaired.charges
    ? normalizeChargeBlock(repaired.charges, recharge)
    : looksCharged
      ? normalizeChargeBlock(numericUses, recharge)
      : { max: null, recharge: null };

  const uses = repaired.uses && typeof repaired.uses === "object"
    ? normalizeChargeBlock(repaired.uses, recharge)
    : !looksCharged && numericUses != null
      ? normalizeChargeBlock(numericUses, recharge)
      : { max: null, recharge: null };

  const normalized = {
    id: repairText(repaired.id || slugify(repaired.name)),
    type: "item",
    name: repairText(repaired.name ?? ""),
    rules_version: repairText(repaired.rules_version ?? "2024"),
    source: repairText(repaired.source ?? repaired.src ?? ""),
    item_category: repairText(item_category),
    rarity: repairText(repaired.rarity ?? "common"),
    requires_attunement,
    attunement_text,
    consumable: Boolean(consumable),
    equippable: Boolean(equippable),
    equip_slot: repaired.equip_slot ?? deriveEquipSlot(item_category, repaired.type, repaired.name),
    stackable: repaired.stackable ?? !(equippable || requires_attunement),
    weight: normalizeWeight(repaired.weight),
    value: normalizeValue(repaired),
    weapon: repaired.weapon ?? null,
    armor: repaired.armor ?? null,
    charges,
    uses,
    modifiers: Array.isArray(repaired.modifiers) ? repaired.modifiers : [],
    granted_action_ids: Array.isArray(repaired.granted_action_ids) ? repaired.granted_action_ids : [],
    granted_spell_ids: normalizeSpellIds(repaired),
    effects: Array.isArray(repaired.effects) ? repaired.effects : [],
    text: normalizeText(repaired),
    tags,
  };

  return normalized;
}

async function collectJsonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith(".json") && entry.name !== "index.json")
    .map(entry => path.join(dir, entry.name));
}

function repairCommonJsonIssues(text) {
  const lines = String(text).split(/\r?\n/);

  for (let i = 0; i < lines.length - 1; i += 1) {
    const current = lines[i].trimEnd();
    const next = lines[i + 1].trimStart();

    if (!current.trim()) continue;

    const currentTrimmed = current.trim();
    const nextTrimmed = next.trim();
    const endsValue =
      /["\]}]$/.test(currentTrimmed) ||
      /\b(?:true|false|null)\s*$/.test(currentTrimmed) ||
      /-?\d+(?:\.\d+)?\s*$/.test(currentTrimmed);
    const nextStartsProp = /^"/.test(nextTrimmed);

    if (endsValue && nextStartsProp && !currentTrimmed.endsWith(",")) {
      lines[i] = `${current},`;
    }
  }

  for (let i = 1; i < lines.length; i += 1) {
    const current = lines[i].trimStart();
    if (!/^[}\]]/.test(current)) continue;
    lines[i - 1] = lines[i - 1].replace(/,\s*$/, "");
  }

  return lines.join("\n");
}

function parseJsonLenient(text, file) {
  try {
    return JSON.parse(text);
  } catch {
    const repaired = repairCommonJsonIssues(text);
    try {
      return JSON.parse(repaired);
    } catch (error) {
      error.message = `${file}: ${error.message}`;
      throw error;
    }
  }
}

async function main() {
  const files = (await Promise.all(TARGET_DIRS.map(collectJsonFiles))).flat();

  for (const file of files) {
    const rawText = await fs.readFile(file, "utf8");
    const raw = parseJsonLenient(rawText, file);
    const normalized = normalizeItem(raw);
    await fs.writeFile(file, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  }

  console.log(`Normalized ${files.length} item files.`);
}

await main();
