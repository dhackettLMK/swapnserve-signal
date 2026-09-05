import type { Provenance, CalaTool, Confidence } from "./schema/provenance";

/**
 * Small helpers for constructing and reasoning about provenance. The rule:
 * every rendered fact carries one (BUILD_PROMPT.md §4.4).
 */

export function makeProvenance(args: {
  calaTool: CalaTool;
  input: string;
  sourceUrls: string[];
  retrievedAt?: string;
  creditsSpent?: number;
  confidence?: Confidence;
  entityUuid?: string;
  sourceTitles?: string[];
  verifierNote?: string;
}): Provenance {
  return {
    calaTool: args.calaTool,
    input: args.input,
    sourceUrls: args.sourceUrls,
    sourceTitles: args.sourceTitles,
    entityUuid: args.entityUuid,
    retrievedAt: args.retrievedAt ?? new Date().toISOString(),
    creditsSpent: args.creditsSpent ?? 0,
    confidence: args.confidence ?? "single-source",
    verifierNote: args.verifierNote,
  };
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  verified: "Verified",
  "single-source": "Single source",
  inferred: "Inferred",
};

export const CALA_TOOL_LABEL: Record<CalaTool, string> = {
  knowledge_query: "knowledge_query",
  knowledge_search: "knowledge_search",
  entity_search: "entity_search",
  entity_introspection: "entity_introspection",
  entity_retrieval: "entity_retrieval",
  "primary-source": "primary source",
};
