import { z } from "zod";
import { factSchema } from "./provenance";

/**
 * A dated milestone on the EPR / regulatory timeline. Dates are the highest-risk
 * facts on the site: a wrong transposition date discredits everything to a
 * funder. Policy dates are verified against EUR-Lex / gov.ie primary sources
 * (calaTool: "primary-source"), with Cala as supplement (ADR-003).
 */
export const PolicyMilestoneSchema = z.object({
  id: z.string().min(1),
  /** e.g. "Directive (EU) 2025/1892" */
  instrument: z.string().min(1),
  jurisdiction: z.enum(["eu", "ie"]),
  event: z.string().min(1),
  date: factSchema(z.string()),
  status: z.enum(["passed", "upcoming", "uncertain"]),
  /** Dara's attributed reading of what this means for Swap'n'Serve. */
  implicationForSNS: z.string(),
});
export type PolicyMilestone = z.infer<typeof PolicyMilestoneSchema>;

export const PolicyMilestonesSchema = z.array(PolicyMilestoneSchema);
