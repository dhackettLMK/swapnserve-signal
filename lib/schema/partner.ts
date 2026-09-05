import { z } from "zod";
import { factSchema } from "./provenance";

/**
 * A corporate research target. NOT a partner — the /partners page is labelled
 * unambiguously so no company or visitor can read it as an implied endorsement
 * (BUILD_PROMPT.md §12.4). Company- and role-level data only; never a named
 * individual (§12.2 GDPR).
 */
export const PartnerTargetSchema = z.object({
  id: z.string().min(1),
  legalName: z.string().min(1),
  calaEntityUuid: z.string().uuid().optional(),

  midWestPresence: factSchema(
    z.object({
      sites: z.array(z.string()),
      approxHeadcount: z.number().int().positive().optional(),
    }),
  ),

  csrdStatus: factSchema(
    z.enum(["in-scope", "out-of-scope", "value-chain-pressure", "unknown"]),
  ),

  commitments: z.array(
    factSchema(
      z.object({
        /** Their own words, quoted. */
        quote: z.string().min(1),
        theme: z.enum([
          "circularity",
          "textiles",
          "community",
          "waste",
          "social-inclusion",
        ]),
        documentTitle: z.string().min(1),
        documentYear: z.number().int().min(2000).max(2100),
      }),
    ),
  ),

  eprExposure: factSchema(z.enum(["textile-producer", "none", "unknown"])),

  /** Written by Dara, not by Cala. Attributed as such in the UI. */
  angle: z.string(),

  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),

  status: z.enum([
    "researched",
    "drafted",
    "contacted",
    "meeting",
    "partnered",
    "declined",
  ]),
});
export type PartnerTarget = z.infer<typeof PartnerTargetSchema>;

export const PartnerTargetsSchema = z.array(PartnerTargetSchema);
