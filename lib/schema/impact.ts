import { z } from "zod";
import { factSchema } from "./provenance";

/**
 * A life-cycle conversion factor. The difference between a defensible impact
 * number and a made-up one is `systemBoundary` and `substitutionRate`: a reused
 * garment only avoids emissions if it displaces a new purchase, and never 1:1.
 * A factor stored without those is not usable in a grant application — so the
 * schema requires them (BUILD_PROMPT.md §6, §12.3).
 */
export const ImpactFactorSchema = z.object({
  /** e.g. "co2e-per-kg-textile-reuse" */
  id: z.string().min(1),
  label: z.string().min(1),
  value: factSchema(z.number()),
  /** e.g. "kg CO2e / kg textile" */
  unit: z.string().min(1),
  geography: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  /** cradle-to-gate? substitution assumed? — stated explicitly. */
  systemBoundary: z.string().min(1),
  /** The assumption that makes or breaks the number. 0-1. */
  substitutionRate: z.number().min(0).max(1).optional(),
  /** Honest uncertainty range, in plain English. */
  uncertainty: z.string().min(1),
  methodologyUrl: z.string().url(),
});
export type ImpactFactor = z.infer<typeof ImpactFactorSchema>;

export const ImpactFactorsSchema = z.array(ImpactFactorSchema);

/**
 * Swap'n'Serve's own self-reported operating figures (kg diverted, events run).
 * Rough founder estimates from swapnserve.com — labelled as such on the site,
 * never presented as verified totals (BUILD_PROMPT.md §5, §12.3).
 */
export const SelfReportedMetricsSchema = z.object({
  sourceUrl: z.string().url(),
  retrievedAt: z.string().datetime(),
  disclaimer: z.string().min(1),
  metrics: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      value: z.number(),
      unit: z.string().min(1),
      note: z.string().optional(),
    }),
  ),
});
export type SelfReportedMetrics = z.infer<typeof SelfReportedMetricsSchema>;
