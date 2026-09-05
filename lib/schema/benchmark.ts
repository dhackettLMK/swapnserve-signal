import { z } from "zod";

/**
 * One row of the Cala-vs-web-search benchmark (BUILD_PROMPT.md §2.6, Phase 6).
 * Honest by design: if Cala loses on a question class, the row records it.
 */
export const BenchmarkResultSchema = z.object({
  method: z.enum(["cala", "web-search"]),
  tokensConsumed: z.number().int().nonnegative().optional(),
  latencyMs: z.number().nonnegative().optional(),
  citationReturned: z.boolean(),
  correct: z.boolean(),
  answerSummary: z.string(),
  notes: z.string().optional(),
});

export const BenchmarkQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  domain: z.enum(["partners", "funding", "policy", "impact"]),
  /** Manually established ground truth the answers are graded against. */
  groundTruth: z.string().min(1),
  groundTruthSourceUrl: z.string().url().optional(),
  results: z.array(BenchmarkResultSchema),
});
export type BenchmarkQuestion = z.infer<typeof BenchmarkQuestionSchema>;

export const BenchmarkRunSchema = z.object({
  runId: z.string().min(1),
  ranAt: z.string().datetime(),
  methodologyNote: z.string().min(1),
  questions: z.array(BenchmarkQuestionSchema),
});
export type BenchmarkRun = z.infer<typeof BenchmarkRunSchema>;
