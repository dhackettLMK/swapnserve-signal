/**
 * Loose response typings for the Cala REST API (base https://api.cala.ai/v1).
 * The API returns rich, evolving shapes; we narrow only what we consume and
 * keep the raw payload for provenance/hashing. Exact shapes are re-verified in
 * Phase 1 and any drift is recorded in docs/DELTAS.md.
 */

export type CalaEntityType =
  | "Entity" | "Organization" | "Company" | "Person" | "GPE" | "Country"
  | "Law" | "Industry" | "Product" | "Event" | "Sanction" | "FinancialMetric"
  | "PrivateCompanyFundingRound" | string;

export interface CalaEntityRef {
  id?: string;
  uuid?: string;
  name?: string;
  type?: CalaEntityType;
  [k: string]: unknown;
}

export interface KnowledgeSearchResult {
  /** Markdown narrative answer with citations. */
  answer?: string;
  content?: string;
  sources?: Array<{ url?: string; title?: string; [k: string]: unknown }>;
  entities?: CalaEntityRef[];
  [k: string]: unknown;
}

export interface KnowledgeQueryResult {
  /** Structured rows — the reason to prefer query over search for tables. */
  results?: unknown[];
  entities?: CalaEntityRef[];
  [k: string]: unknown;
}

export interface EntitySearchResult {
  entities?: CalaEntityRef[];
  results?: CalaEntityRef[];
  [k: string]: unknown;
}

export interface EntityIntrospectionResult {
  properties?: unknown;
  relationships?: unknown;
  numerical_observations?: unknown;
  [k: string]: unknown;
}

export interface EntityRetrievalResult {
  [k: string]: unknown;
}

export type CalaToolName =
  | "knowledge_query"
  | "knowledge_search"
  | "entity_search"
  | "entity_introspection"
  | "entity_retrieval";

/** Called after every successful API call so callers can meter/log. */
export interface CalaCallMeta {
  tool: CalaToolName;
  input: string;
  entityUuid?: string;
  credits: number;
  responseHash: string;
  cached: boolean;
}
