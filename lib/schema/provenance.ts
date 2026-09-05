import { z } from "zod";

/**
 * Provenance is the spine of this project. Every fact rendered on the public
 * site carries one. No provenance, no render. (BUILD_PROMPT.md §4.4, §12)
 *
 * `calaTool` records WHICH of the five Cala tools produced the fact, so the
 * /how-it-works page can show the entity workflow that was actually used, and
 * so any figure can be traced back to a replayable call in query-log.jsonl.
 */
export const CalaToolSchema = z.enum([
  "knowledge_query",
  "knowledge_search",
  "entity_search",
  "entity_introspection",
  "entity_retrieval",
  // Primary-source verification that did NOT come from Cala. Used for the
  // policy/regulatory module, where EUR-Lex / gov.ie is the backbone and Cala
  // is a supplement (see docs/DECISIONS.md ADR-003).
  "primary-source",
]);
export type CalaTool = z.infer<typeof CalaToolSchema>;

export const ConfidenceSchema = z.enum([
  "verified", // corroborated by a resolving primary source
  "single-source", // one source only; usable but flagged
  "inferred", // derived/estimated; never presented as fact
]);
export type Confidence = z.infer<typeof ConfidenceSchema>;

export const ProvenanceSchema = z.object({
  calaTool: CalaToolSchema,
  /** The exact QL or natural-language string sent (or the primary-source URL fetched). */
  input: z.string().min(1),
  /** Present when the entity workflow was used. */
  entityUuid: z.string().uuid().optional(),
  sourceUrls: z.array(z.string().url()),
  sourceTitles: z.array(z.string()).optional(),
  /** ISO 8601 retrieval timestamp. */
  retrievedAt: z.string().datetime(),
  creditsSpent: z.number().int().min(0),
  confidence: ConfidenceSchema,
  /** Written by the fact-checker step. Why the confidence label is what it is. */
  verifierNote: z.string().optional(),
});
export type Provenance = z.infer<typeof ProvenanceSchema>;

/**
 * A single value paired with the provenance that justifies it. Generic over the
 * value type. Used everywhere a number, string, or object appears on the site.
 */
export function factSchema<T extends z.ZodTypeAny>(value: T) {
  return z.object({
    value,
    provenance: ProvenanceSchema,
  });
}
export type Fact<T> = { value: T; provenance: Provenance };
