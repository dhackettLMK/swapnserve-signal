import { z } from "zod";
import { factSchema } from "./provenance";

/**
 * A funding opportunity. Eligibility for an UNINCORPORATED applicant is the
 * first filter and the most common silent disqualifier (BUILD_PROMPT.md §3.4).
 * `requiresLegalEntity` / `requiresCharityStatus` route blocked funds to the
 * incorporation decision rather than dropping them.
 */
export const FundingOpportunitySchema = z.object({
  id: z.string().min(1),
  funderName: z.string().min(1),
  programme: z.string().min(1),
  calaEntityUuid: z.string().uuid().optional(),

  geography: z.enum(["limerick", "mid-west", "ireland", "eu"]),

  amountRange: factSchema(
    z.object({
      min: z.number().nonnegative().optional(),
      max: z.number().nonnegative().optional(),
      currency: z.literal("EUR"),
    }),
  ),

  deadline: factSchema(
    z.object({
      /** ISO date (YYYY-MM-DD). Absent when rolling or unknown. */
      date: z.string().optional(),
      rolling: z.boolean(),
      note: z.string().optional(),
    }),
  ),

  eligibility: factSchema(
    z.object({
      requiresLegalEntity: z.boolean(),
      requiresCharityStatus: z.boolean(),
      minOrgAgeMonths: z.number().int().nonnegative().optional(),
      youthLed: z.boolean().optional(),
      raw: z.string(),
    }),
  ),

  /** 0-100. Rubric documented in docs/DECISIONS.md (ADR-004). */
  fitScore: z.number().min(0).max(100),

  /** e.g. ["requires CRO registration"] */
  blockers: z.array(z.string()),

  status: z.enum([
    "watching",
    "eligible",
    "blocked",
    "applying",
    "submitted",
    "won",
    "lost",
  ]),
});
export type FundingOpportunity = z.infer<typeof FundingOpportunitySchema>;

export const FundingOpportunitiesSchema = z.array(FundingOpportunitySchema);
