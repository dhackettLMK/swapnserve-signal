import { z } from "zod";
import { CalaToolSchema } from "./provenance";

/**
 * The credit economy, made auditable (BUILD_PROMPT.md §7.3). Every credit spent
 * is a ledger entry; the running total is shown live on the site.
 */
export const CreditLedgerEntrySchema = z.object({
  at: z.string().datetime(),
  tool: CalaToolSchema,
  credits: z.number().int().min(0),
  purpose: z.string().min(1),
  phase: z.string().optional(),
  outputPath: z.string().optional(),
});

export const CreditLedgerSchema = z.object({
  budgetPerMonth: z.number().int().positive(),
  /** Convenience mirror of entries.reduce(sum). Recomputed by scripts. */
  totalCredits: z.number().int().min(0),
  entries: z.array(CreditLedgerEntrySchema),
});
export type CreditLedger = z.infer<typeof CreditLedgerSchema>;

/**
 * One line of query-log.jsonl — the verbatim, replayable record of every Cala
 * call. Stored as JSONL (one object per line), not validated as a single doc,
 * but this schema documents the shape.
 */
export const QueryLogEntrySchema = z.object({
  at: z.string().datetime(),
  tool: CalaToolSchema,
  input: z.string(),
  entityUuid: z.string().uuid().optional(),
  credits: z.number().int().min(0),
  responseHash: z.string(),
  outputPath: z.string().optional(),
});
export type QueryLogEntry = z.infer<typeof QueryLogEntrySchema>;

/**
 * Honest coverage gaps (BUILD_PROMPT.md §2.5, §7.4). When Cala and a primary
 * source disagree, or Cala's coverage is thin, it goes here — and to
 * /limitations, with a reproducible query.
 */
export const CoverageGapSchema = z.object({
  id: z.string().min(1),
  domain: z.enum(["partners", "funding", "policy", "impact", "general"]),
  summary: z.string().min(1),
  reproducibleQuery: z.string().min(1),
  calaTool: CalaToolSchema,
  observedAt: z.string().datetime(),
  detail: z.string().optional(),
});

export const CoverageGapsSchema = z.object({
  gaps: z.array(CoverageGapSchema),
});
export type CoverageGaps = z.infer<typeof CoverageGapsSchema>;
