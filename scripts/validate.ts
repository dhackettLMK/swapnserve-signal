/**
 * Validates the committed knowledge layer in data/ against the Zod schemas.
 * Runs in CI and before build (`npm run validate`). Malformed data fails here
 * rather than reaching a visitor. (BUILD_PROMPT.md Phase 0 acceptance.)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  loadPartners,
  loadFunding,
  loadPolicy,
  loadImpactFactors,
  loadSelfReported,
  loadEvidence,
  loadCreditLedger,
  loadCoverageGaps,
  loadLatestBenchmark,
} from "../lib/data";
import { QueryLogEntrySchema } from "../lib/schema/meta";

type Check = { name: string; run: () => number | string };

const checks: Check[] = [
  { name: "partners/targets.json", run: () => `${loadPartners().length} targets` },
  { name: "funding/opportunities.json", run: () => `${loadFunding().length} opportunities` },
  { name: "policy/milestones.json", run: () => `${loadPolicy().length} milestones` },
  { name: "impact/factors.json", run: () => `${loadImpactFactors().length} factors` },
  { name: "impact/self-reported.json", run: () => (loadSelfReported() ? "present" : "absent (ok)") },
  { name: "evidence/library.json", run: () => `${loadEvidence().length} items` },
  { name: "_meta/credit-ledger.json", run: () => `${loadCreditLedger().totalCredits} credits spent` },
  { name: "_meta/coverage-gaps.json", run: () => `${loadCoverageGaps().gaps.length} gaps` },
  { name: "benchmark/latest.json", run: () => (loadLatestBenchmark() ? "present" : "absent (ok)") },
  {
    name: "_meta/query-log.jsonl",
    run: () => {
      const path = join(process.cwd(), "data", "_meta", "query-log.jsonl");
      const lines = readFileSync(path, "utf8").split("\n").filter((l) => l.trim());
      lines.forEach((line, i) => {
        try {
          QueryLogEntrySchema.parse(JSON.parse(line));
        } catch (e) {
          throw new Error(`query-log.jsonl line ${i + 1}: ${(e as Error).message}`);
        }
      });
      return `${lines.length} log entries`;
    },
  },
];

let failed = false;
for (const check of checks) {
  try {
    const detail = check.run();
    console.log(`  ok  ${check.name} — ${detail}`);
  } catch (e) {
    failed = true;
    console.error(`FAIL  ${check.name}\n      ${(e as Error).message}`);
  }
}

if (failed) {
  console.error("\nData validation failed.");
  process.exit(1);
}
console.log("\nAll data valid.");
