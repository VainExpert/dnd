import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "data");
const ignoredJsonPathParts = new Set(["not_relevant"]);
const allowedMojibakeFiles = new Set(["scripts/check-project.mjs", "scripts/normalize-items.mjs"]);
const errors = [];

function toDisplay(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function hasIgnoredJsonPathPart(filePath) {
  return path.relative(root, filePath).split(path.sep).some(part => ignoredJsonPathParts.has(part));
}

function parseJsonFile(filePath, { ignoreNotRelevant = true } = {}) {
  if (ignoreNotRelevant && hasIgnoredJsonPathPart(filePath)) return null;
  try {
    return JSON.parse(readText(filePath));
  } catch (error) {
    errors.push(`${toDisplay(filePath)}: invalid JSON (${error.message})`);
    return null;
  }
}

function listedIndexFiles(indexJson) {
  if (!indexJson) return [];
  if (Array.isArray(indexJson)) return indexJson.filter(value => typeof value === "string");
  if (Array.isArray(indexJson.files)) return indexJson.files.filter(value => typeof value === "string");
  if (Array.isArray(indexJson.items)) {
    return indexJson.items
      .map(item => typeof item === "string" ? item : item?.file)
      .filter(value => typeof value === "string");
  }
  return [];
}

function activeDataJsonFiles(files) {
  const active = new Set();
  const dataIndexes = files
    .filter(file => file.startsWith(dataRoot + path.sep))
    .filter(file => path.basename(file) === "index.json");

  for (const indexPath of dataIndexes) {
    active.add(indexPath);
    const indexJson = parseJsonFile(indexPath);
    const baseDir = path.dirname(indexPath);
    for (const file of listedIndexFiles(indexJson)) {
      const target = path.resolve(baseDir, file);
      if (target.startsWith(baseDir + path.sep)) active.add(target);
    }
  }

  return active;
}

function checkJsonFiles(files, activeDataFiles) {
  for (const filePath of files.filter(file => file.endsWith(".json"))) {
    if (filePath.startsWith(dataRoot + path.sep) && !activeDataFiles.has(filePath)) continue;
    if (hasIgnoredJsonPathPart(filePath)) continue;
    if (fs.statSync(filePath).size === 0 && !activeDataFiles.has(filePath)) continue;
    parseJsonFile(filePath);
  }
}

function checkIndexReferences(files) {
  for (const indexPath of files
    .filter(file => file.startsWith(dataRoot + path.sep))
    .filter(file => path.basename(file) === "index.json")) {
    const indexJson = parseJsonFile(indexPath);
    const baseDir = path.dirname(indexPath);
    for (const file of listedIndexFiles(indexJson)) {
      const target = path.resolve(baseDir, file);
      if (!target.startsWith(baseDir + path.sep)) {
        errors.push(`${toDisplay(indexPath)}: index entry escapes directory (${file})`);
        continue;
      }
      if (!fs.existsSync(target)) {
        errors.push(`${toDisplay(indexPath)}: missing indexed file ${file}`);
        continue;
      }
      if (target.endsWith(".json")) parseJsonFile(target, { ignoreNotRelevant: false });
    }
  }
}

function isExternalOrDynamicUrl(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|#|javascript:|data:|mailto:)/i.test(url);
}

function checkHtmlAssetLinks(files) {
  const htmlFiles = files.filter(file => file.endsWith(".html"));
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  for (const filePath of htmlFiles) {
    const html = readText(filePath);
    let match;
    while ((match = attrPattern.exec(html))) {
      let url = match[1].trim();
      if (!url || isExternalOrDynamicUrl(url)) continue;
      if (url.includes("${") || url.includes("{{")) continue;
      url = url.split("#", 1)[0].split("?", 1)[0];
      if (!url || url.startsWith("{{")) continue;
      const target = path.resolve(path.dirname(filePath), url);
      if (!fs.existsSync(target)) {
        errors.push(`${toDisplay(filePath)}: missing local asset/link ${match[1]}`);
      }
    }
  }
}

function stripModuleSyntax(code) {
  const lines = code.split(/\r?\n/);
  const kept = [];
  let skippingImport = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (skippingImport) {
      if (trimmed.endsWith(";")) skippingImport = false;
      continue;
    }
    if (trimmed.startsWith("import ")) {
      if (!trimmed.endsWith(";")) skippingImport = true;
      continue;
    }
    kept.push(line);
  }

  return kept.join("\n")
    .replace(/\bimport\.meta\.url\b/g, '"file:///module.mjs"')
    .replace(/^\s*export\s+\{[^}]*\};?\s*$/gm, "")
    .replace(/\bexport\s+(async\s+function|function|class|const|let|var)\b/g, "$1");
}

function checkScriptSource(code, filename, { module = false } = {}) {
  const source = module ? `(async () => {\n${stripModuleSyntax(code)}\n});` : code;
  try {
    new vm.Script(source, { filename });
  } catch (error) {
    errors.push(`${filename}: JavaScript syntax error (${error.message})`);
  }
}

function checkJavaScriptSyntax(files) {
  const scripts = [
    ...["app.js", "lib.js", "nav.js", "theme.js"].map(file => path.join(root, file)),
    ...files.filter(file => file.endsWith(".mjs"))
  ];

  for (const script of scripts) {
    const code = readText(script);
    const isModule = script.endsWith(".mjs") || /\bexport\s+|\bimport\s+/.test(code);
    checkScriptSource(code, toDisplay(script), { module: isModule });
  }
}

function checkInlineModules(files) {
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const filePath of files.filter(file => file.endsWith(".html"))) {
    const html = readText(filePath);
    let match;
    let index = 0;
    while ((match = scriptPattern.exec(html))) {
      index += 1;
      const attrs = match[1] || "";
      if (/\bsrc\s*=/i.test(attrs)) continue;
      const code = match[2].trim();
      if (!code) continue;
      try {
        if (/\btype\s*=\s*["']module["']/i.test(attrs)) {
          checkScriptSource(code, `${toDisplay(filePath)} inline script ${index}`, { module: true });
        } else {
          new vm.Script(code, { filename: `${toDisplay(filePath)}#script${index}` });
        }
      } catch (error) {
        errors.push(`${toDisplay(filePath)} inline script ${index}: ${error.message}`);
      }
    }
  }
}

function checkMojibake(files) {
  const textFiles = files.filter(file => /\.(?:html|js|mjs|css|md)$/i.test(file));
  const mojibake = /(?:Ã.|Â.|â€¢|â€“|â€™|�)/;
  for (const filePath of textFiles) {
    if (allowedMojibakeFiles.has(toDisplay(filePath))) continue;
    const text = readText(filePath);
    if (mojibake.test(text)) errors.push(`${toDisplay(filePath)}: possible mojibake in source text`);
  }
}

function main() {
  const files = walk(root);
  const activeDataFiles = activeDataJsonFiles(files);
  try {
    checkJavaScriptSyntax(files);
  } catch (error) {
    errors.push(`JavaScript syntax check failed: ${error.message}`);
  }
  checkJsonFiles(files, activeDataFiles);
  checkIndexReferences(files);
  checkHtmlAssetLinks(files);
  checkInlineModules(files);
  checkMojibake(files);

  if (errors.length) {
    console.error(`Project check failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("Project check passed.");
}

main();
