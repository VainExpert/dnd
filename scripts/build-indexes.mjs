// scripts/build-indexes.mjs
import fs from "node:fs";
import path from "node:path";

const collections = ["monsters","spells","items","pcs","tables"];

for (const c of collections){
  const dir = path.join("data", c);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json") && f !== "index.json");
  fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify({ files }, null, 2));
  console.log(`Wrote data/${c}/index.json (${files.length} files)`);
}