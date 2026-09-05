/**
 * Key-leak guard (BUILD_PROMPT.md §4.2, Phase 0 acceptance).
 *
 * The Cala API key is SERVER-ONLY. This script fails the build if the key —
 * or a key-shaped literal — can reach the browser. It runs in two modes:
 *
 *   source  (always): scans app/ and components/ for CALA_API_KEY usage inside
 *           a "use client" file, and for any hardcoded key-shaped literal.
 *   bundle  (if .next/static exists): greps the emitted client bundle for the
 *           exact key value (when CALA_API_KEY is set) and for key-shaped
 *           literals. This is the check the brief specifies.
 *
 * Acceptance test: drop a fake key (e.g. `cala_live_deadbeefdeadbeef`) into a
 * client component and this fails the build.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

// A key-shaped literal. Kept deliberately broad for Cala's key formats plus a
// generic high-entropy fallback. Re-tune once the real prefix is known.
const KEY_PATTERNS: RegExp[] = [
  /\bcala[_-](live|test|sk|api|secret|key)[_-][A-Za-z0-9]{8,}/i,
  /\bsk-[A-Za-z0-9]{20,}/,
];

const ENV_KEY = process.env.CALA_API_KEY?.trim();

type Violation = { file: string; detail: string };
const violations: Violation[] = [];

function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

// ---- source scan -----------------------------------------------------------
function sourceScan() {
  const dirs = ["app", "components", "lib"].map((d) => join(ROOT, d)).filter(existsSync);
  const files = dirs.flatMap((d) => walk(d, [".ts", ".tsx", ".js", ".jsx", ".mjs"]));
  for (const file of files) {
    const rel = relative(ROOT, file);
    const src = readFileSync(file, "utf8");
    const isClient = /^\s*["']use client["']/m.test(src);

    // Server-only modules are allowed to reference the key; client ones are not.
    const referencesKey = /CALA_API_KEY/.test(src);
    if (isClient && referencesKey) {
      violations.push({ file: rel, detail: `"use client" file references CALA_API_KEY` });
    }
    // NEXT_PUBLIC_ exposes to the browser — never for the Cala key.
    if (/NEXT_PUBLIC_[A-Z_]*CALA/i.test(src)) {
      violations.push({ file: rel, detail: `Cala key routed through NEXT_PUBLIC_ (browser-exposed)` });
    }
    for (const pat of KEY_PATTERNS) {
      const m = src.match(pat);
      if (m) violations.push({ file: rel, detail: `hardcoded key-shaped literal: ${m[0].slice(0, 16)}…` });
    }
    if (ENV_KEY && ENV_KEY.length >= 8 && src.includes(ENV_KEY)) {
      violations.push({ file: rel, detail: `contains the live CALA_API_KEY value` });
    }
  }
}

// ---- bundle scan -----------------------------------------------------------
function bundleScan() {
  const staticDir = join(ROOT, ".next", "static");
  if (!existsSync(staticDir)) {
    console.log("  (no .next/static — skipping bundle scan; run after `next build`)");
    return;
  }
  const files = walk(staticDir, [".js", ".mjs", ".map", ".html", ".json"]);
  for (const file of files) {
    const rel = relative(ROOT, file);
    const src = readFileSync(file, "utf8");
    for (const pat of KEY_PATTERNS) {
      const m = src.match(pat);
      if (m) violations.push({ file: rel, detail: `key-shaped literal in client bundle: ${m[0].slice(0, 16)}…` });
    }
    if (ENV_KEY && ENV_KEY.length >= 8 && src.includes(ENV_KEY)) {
      violations.push({ file: rel, detail: `LIVE CALA_API_KEY VALUE LEAKED INTO CLIENT BUNDLE` });
    }
  }
}

const mode = process.argv[2] ?? "all";
console.log(`Key-leak check (mode: ${mode})…`);
if (mode === "source" || mode === "all") sourceScan();
if (mode === "bundle" || mode === "all") bundleScan();

if (violations.length) {
  console.error(`\n✖ ${violations.length} secret-leak violation(s):`);
  for (const v of violations) console.error(`  ${v.file}\n    → ${v.detail}`);
  console.error("\nThe Cala API key is server-only. Move the usage server-side and remove any literal.");
  process.exit(1);
}
console.log("✔ No key leaks detected.");
