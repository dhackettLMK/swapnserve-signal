import type { Provenance } from "@/lib/schema/provenance";
import { CALA_TOOL_LABEL, CONFIDENCE_LABEL } from "@/lib/provenance";

/**
 * The signature UI element: no fact renders without one. Uses a native
 * <details> so provenance expands with zero JavaScript on the static site.
 */
export function ProvenanceChip({ provenance }: { provenance: Provenance }) {
  const { calaTool, confidence, sourceUrls, sourceTitles, retrievedAt, entityUuid, input } =
    provenance;
  const confColor =
    confidence === "verified"
      ? "text-accent"
      : confidence === "single-source"
        ? "text-warn"
        : "text-muted";

  return (
    <details className="group mono inline-block text-xs">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded border border-border bg-surface-2 px-2 py-0.5 text-muted transition-colors hover:border-accent">
        <span aria-hidden>◆</span>
        <span>{CALA_TOOL_LABEL[calaTool]}</span>
        <span className={confColor}>· {CONFIDENCE_LABEL[confidence]}</span>
      </summary>
      <div className="card mt-2 max-w-md space-y-2 p-3 text-muted">
        <Row label="tool" value={CALA_TOOL_LABEL[calaTool]} />
        <Row label="input" value={input} wrap />
        {entityUuid ? <Row label="entity" value={entityUuid} /> : null}
        <Row label="confidence" value={CONFIDENCE_LABEL[confidence]} />
        <Row label="retrieved" value={new Date(retrievedAt).toISOString().slice(0, 10)} />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted/70">sources</div>
          <ul className="mt-1 space-y-1">
            {sourceUrls.map((url, i) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-accent underline-offset-2 hover:underline"
                >
                  {sourceTitles?.[i] ?? url}
                </a>
              </li>
            ))}
            {sourceUrls.length === 0 ? <li className="text-muted/70">none recorded</li> : null}
          </ul>
        </div>
      </div>
    </details>
  );
}

function Row({ label, value, wrap }: { label: string; value: string; wrap?: boolean }) {
  return (
    <div className="flex gap-2">
      <span className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-muted/70">
        {label}
      </span>
      <span className={wrap ? "break-words text-foreground" : "truncate text-foreground"}>
        {value}
      </span>
    </div>
  );
}
