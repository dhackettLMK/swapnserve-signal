import { z } from "zod";
import { ProvenanceSchema } from "./provenance";

/**
 * A citation-library entry. The /evidence page is the shared source of truth
 * that every other page's provenance chips point into.
 */
export const EvidenceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().optional(),
  /** ISO date of the source document itself, where known. */
  publishedDate: z.string().optional(),
  kind: z.enum([
    "legislation",
    "government",
    "company-report",
    "research",
    "ngo",
    "news",
    "cala",
    "other",
  ]),
  /** Which modules cite this. */
  usedBy: z.array(z.enum(["partners", "funding", "policy", "impact", "benchmark"])),
  provenance: ProvenanceSchema,
  /** Last time scripts/verify.ts confirmed the URL still resolves. */
  lastCheckedAt: z.string().datetime().optional(),
  resolves: z.boolean().optional(),
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const EvidenceItemsSchema = z.array(EvidenceItemSchema);
