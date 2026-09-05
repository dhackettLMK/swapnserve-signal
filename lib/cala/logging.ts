import { appendFileSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { CalaClient } from "./client";
import type { CalaCallMeta } from "./types";
import type { CreditLedger } from "../schema/meta";

/**
 * Node-only helpers (used by scripts/ingest/*, never by the deployed app).
 * They wire a CalaClient so every call is appended verbatim to
 * data/_meta/query-log.jsonl and metered into data/_meta/credit-ledger.json,
 * making every published fact replayable and every credit auditable (§7.3).
 */

const META_DIR = join(process.cwd(), "data", "_meta");
const QUERY_LOG = join(META_DIR, "query-log.jsonl");
const CREDIT_LEDGER = join(META_DIR, "credit-ledger.json");

function ensureDir(file: string) {
  mkdirSync(dirname(file), { recursive: true });
}

export function appendQueryLog(meta: CalaCallMeta, outputPath?: string): void {
  ensureDir(QUERY_LOG);
  const line = JSON.stringify({
    at: new Date().toISOString(),
    tool: meta.tool,
    input: meta.input,
    entityUuid: meta.entityUuid,
    credits: meta.credits,
    responseHash: meta.responseHash,
    cached: meta.cached,
    outputPath,
  });
  appendFileSync(QUERY_LOG, line + "\n", "utf8");
}

export function recordCredits(meta: CalaCallMeta, purpose: string, phase?: string, outputPath?: string): void {
  if (meta.credits === 0) return;
  ensureDir(CREDIT_LEDGER);
  let ledger: CreditLedger;
  try {
    ledger = JSON.parse(readFileSync(CREDIT_LEDGER, "utf8")) as CreditLedger;
  } catch {
    ledger = { budgetPerMonth: 100, totalCredits: 0, entries: [] };
  }
  ledger.entries.push({
    at: new Date().toISOString(),
    tool: meta.tool,
    credits: meta.credits,
    purpose,
    phase,
    outputPath,
  });
  ledger.totalCredits = ledger.entries.reduce((s, e) => s + e.credits, 0);
  writeFileSync(CREDIT_LEDGER, JSON.stringify(ledger, null, 2) + "\n", "utf8");
}

/**
 * A CalaClient for ingestion runs: logs + meters every call automatically.
 * Pass a `purpose`/`phase` so the credit ledger stays legible.
 */
export function makeIngestClient(purpose: string, phase?: string): CalaClient {
  return new CalaClient({
    onCall: (meta: CalaCallMeta) => {
      appendQueryLog(meta);
      recordCredits(meta, purpose, phase);
    },
  });
}
