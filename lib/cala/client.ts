import { createHash } from "node:crypto";
import type {
  CalaCallMeta,
  CalaToolName,
  EntityIntrospectionResult,
  EntityRetrievalResult,
  EntitySearchResult,
  KnowledgeQueryResult,
  KnowledgeSearchResult,
} from "./types";

/**
 * Typed wrapper over the Cala REST API. SERVER-SIDE ONLY — it reads
 * CALA_API_KEY from the environment and must never be imported into a client
 * component. (Enforced by scripts/check-secrets.ts and a runtime guard below.)
 *
 * Responsibilities (BUILD_PROMPT.md §7):
 *  - retry with backoff on transient failures
 *  - per-instance memoisation: never call Cala twice with the same input in one
 *    run (keyed on a hash of tool+input)
 *  - credit accounting + verbatim query logging via the onCall hook
 *
 * NOTE ON CREDITS: one credit ~= one query. Cached hits cost 0. The API may
 * return an authoritative credit cost in future; until confirmed in Phase 1 we
 * assume 1 credit per non-cached call and record the assumption in
 * docs/CALA_NOTES.md.
 */

const DEFAULT_BASE_URL = "https://api.cala.ai/v1";

export interface CalaClientOptions {
  apiKey?: string;
  baseUrl?: string;
  maxRetries?: number;
  /** Fired after each call (cached or live) for metering + logging. */
  onCall?: (meta: CalaCallMeta) => void | Promise<void>;
  fetchImpl?: typeof fetch;
}

function hash(input: unknown): string {
  return createHash("sha256")
    .update(typeof input === "string" ? input : JSON.stringify(input))
    .digest("hex");
}

export class CalaError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly body?: string,
  ) {
    super(message);
    this.name = "CalaError";
  }
}

export class CalaClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly maxRetries: number;
  private readonly onCall?: CalaClientOptions["onCall"];
  private readonly fetchImpl: typeof fetch;
  /** Memo cache for this instance/run only. */
  private readonly cache = new Map<string, unknown>();

  constructor(opts: CalaClientOptions = {}) {
    if (typeof window !== "undefined") {
      throw new CalaError(
        "CalaClient must never run in the browser — the API key is server-only.",
      );
    }
    this.apiKey = opts.apiKey ?? process.env.CALA_API_KEY ?? "";
    this.baseUrl = (opts.baseUrl ?? process.env.CALA_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.maxRetries = opts.maxRetries ?? 3;
    this.onCall = opts.onCall;
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  hasKey(): boolean {
    return this.apiKey.length > 0;
  }

  private async request<T>(
    tool: CalaToolName,
    method: "GET" | "POST",
    path: string,
    body: unknown,
    memoKeyInput: string,
    entityUuid?: string,
  ): Promise<T> {
    if (!this.apiKey) {
      throw new CalaError(
        "CALA_API_KEY is not set. Set it in the environment (Vercel env var).",
      );
    }

    const memoKey = `${tool}:${hash(memoKeyInput)}`;
    if (this.cache.has(memoKey)) {
      const cached = this.cache.get(memoKey) as T;
      await this.onCall?.({
        tool,
        input: memoKeyInput,
        entityUuid,
        credits: 0,
        responseHash: hash(cached),
        cached: true,
      });
      return cached;
    }

    let lastErr: unknown;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const res = await this.fetchImpl(`${this.baseUrl}${path}`, {
          method,
          headers: {
            "X-API-KEY": this.apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: method === "POST" ? JSON.stringify(body) : undefined,
        });

        if (res.status === 429 || res.status >= 500) {
          const text = await res.text().catch(() => "");
          lastErr = new CalaError(`Cala ${res.status}`, res.status, text);
          await sleep(backoffMs(attempt));
          continue;
        }
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new CalaError(`Cala ${res.status}: ${text.slice(0, 500)}`, res.status, text);
        }

        const json = (await res.json()) as T;
        this.cache.set(memoKey, json);
        await this.onCall?.({
          tool,
          input: memoKeyInput,
          entityUuid,
          credits: 1,
          responseHash: hash(json),
          cached: false,
        });
        return json;
      } catch (err) {
        lastErr = err;
        if (err instanceof CalaError && err.status && err.status < 500 && err.status !== 429) {
          throw err; // non-transient
        }
        if (attempt < this.maxRetries) await sleep(backoffMs(attempt));
      }
    }
    throw lastErr instanceof Error
      ? lastErr
      : new CalaError("Cala request failed after retries");
  }

  knowledgeSearch(input: string, opts?: { explainability?: boolean; return_entities?: boolean }) {
    return this.request<KnowledgeSearchResult>(
      "knowledge_search",
      "POST",
      "/knowledge/search",
      { input, explainability: opts?.explainability ?? true, return_entities: opts?.return_entities ?? true },
      input,
    );
  }

  knowledgeQuery(input: string, opts?: { return_entities?: boolean }) {
    return this.request<KnowledgeQueryResult>(
      "knowledge_query",
      "POST",
      "/knowledge/query",
      { input, return_entities: opts?.return_entities ?? true },
      input,
    );
  }

  entitySearch(name: string, opts?: { entity_types?: string[]; limit?: number }) {
    return this.request<EntitySearchResult>(
      "entity_search",
      "POST",
      "/entities",
      { name, entity_types: opts?.entity_types ?? [], limit: opts?.limit ?? 20 },
      `${name}|${(opts?.entity_types ?? []).join(",")}|${opts?.limit ?? 20}`,
    );
  }

  entityIntrospection(entityId: string) {
    return this.request<EntityIntrospectionResult>(
      "entity_introspection",
      "GET",
      `/entities/${entityId}/introspection`,
      undefined,
      entityId,
      entityId,
    );
  }

  // Per the live tool docs, projection retrieval is POST /entities/{id} with a
  // body; the §0 brief lists GET. We use POST when a projection is supplied,
  // else GET. Delta recorded in docs/DELTAS.md.
  entityRetrieval(
    entityId: string,
    projection?: { properties?: string[]; relationships?: unknown; numerical_observations?: unknown },
  ) {
    const hasBody = !!projection && Object.keys(projection).length > 0;
    return this.request<EntityRetrievalResult>(
      "entity_retrieval",
      hasBody ? "POST" : "GET",
      `/entities/${entityId}`,
      projection,
      `${entityId}|${JSON.stringify(projection ?? {})}`,
      entityId,
    );
  }
}

function backoffMs(attempt: number): number {
  return Math.min(8000, 500 * 2 ** attempt) + Math.floor(Math.random() * 250);
}
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
