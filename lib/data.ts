import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  PartnerTargetsSchema,
  FundingOpportunitiesSchema,
  PolicyMilestonesSchema,
  ImpactFactorsSchema,
  SelfReportedMetricsSchema,
  EvidenceItemsSchema,
  CreditLedgerSchema,
  CoverageGapsSchema,
  BenchmarkRunSchema,
} from "./schema";
import type {
  PartnerTarget,
  FundingOpportunity,
  PolicyMilestone,
  ImpactFactor,
  SelfReportedMetrics,
  EvidenceItem,
  CreditLedger,
  CoverageGaps,
  BenchmarkRun,
} from "./schema";

/**
 * Server-side loaders for the committed knowledge layer. Pages import these at
 * build time; the site ships as static, cached data and costs zero credits to
 * serve (ADR-001). Every loader validates against its Zod schema, so malformed
 * data fails the build rather than reaching a visitor.
 */

const DATA = join(process.cwd(), "data");

function readJson(...segments: string[]): unknown {
  const path = join(DATA, ...segments);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf8").trim();
  if (!raw) return null;
  return JSON.parse(raw);
}

export function loadPartners(): PartnerTarget[] {
  const raw = readJson("partners", "targets.json");
  return raw ? PartnerTargetsSchema.parse(raw) : [];
}

export function loadFunding(): FundingOpportunity[] {
  const raw = readJson("funding", "opportunities.json");
  return raw ? FundingOpportunitiesSchema.parse(raw) : [];
}

export function loadPolicy(): PolicyMilestone[] {
  const raw = readJson("policy", "milestones.json");
  return raw ? PolicyMilestonesSchema.parse(raw) : [];
}

export function loadImpactFactors(): ImpactFactor[] {
  const raw = readJson("impact", "factors.json");
  return raw ? ImpactFactorsSchema.parse(raw) : [];
}

export function loadSelfReported(): SelfReportedMetrics | null {
  const raw = readJson("impact", "self-reported.json");
  return raw ? SelfReportedMetricsSchema.parse(raw) : null;
}

export function loadEvidence(): EvidenceItem[] {
  const raw = readJson("evidence", "library.json");
  return raw ? EvidenceItemsSchema.parse(raw) : [];
}

export function loadCreditLedger(): CreditLedger {
  const raw = readJson("_meta", "credit-ledger.json");
  return raw
    ? CreditLedgerSchema.parse(raw)
    : { budgetPerMonth: 100, totalCredits: 0, entries: [] };
}

export function loadCoverageGaps(): CoverageGaps {
  const raw = readJson("_meta", "coverage-gaps.json");
  return raw ? CoverageGapsSchema.parse(raw) : { gaps: [] };
}

export function loadLatestBenchmark(): BenchmarkRun | null {
  const raw = readJson("benchmark", "latest.json");
  return raw ? BenchmarkRunSchema.parse(raw) : null;
}
