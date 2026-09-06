// Reproducible token counter for the Cala-vs-web benchmark.
// Counts cl100k_base tokens for every *.txt payload saved under the given dir.
// Usage: node scripts/benchmark/count-tokens.mjs <dir>
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getEncoding } from "js-tiktoken";

const dir = process.argv[2];
const enc = getEncoding("cl100k_base");
const rows = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".txt")).sort()) {
  const text = readFileSync(join(dir, f), "utf8");
  rows.push({ file: f, chars: text.length, tokens: enc.encode(text).length });
}
for (const r of rows) console.log(`${r.file}\t${r.chars}\t${r.tokens}`);
console.log(JSON.stringify(Object.fromEntries(rows.map((r) => [r.file.replace(/\.txt$/, ""), r.tokens]))));
