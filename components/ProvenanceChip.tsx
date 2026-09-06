import type { Provenance } from "@/lib/schema/provenance";
import { CALA_TOOL_LABEL, CONFIDENCE_LABEL } from "@/lib/provenance";

/**
 * Neutral ink chip. Green is reserved for actions and the key live number, so
 * provenance marks are monochrome; confidence is a small ink label.
 */
export function ProvenanceChip({ provenance }: { provenance: Provenance }) {
  const { calaTool, confidence, sourceUrls, sourceTitles, retrievedAt, entityUuid, input } =
    provenance;

  return (
    <details className="group inline-block mono text-xs">
      <summary className="keycap inline-flex cursor-pointer list-none items-center gap-1.5 px-2 py-0.5 text-dim">
        <span>{CALA_TOOL_LABEL[calaTool]}</span>
        <span className="text-faint">/ {CONFIDENCE_LABEL[confidence]}</span>
        <span className="text-faint transition-transform group-open:rotate-90">&rsaquo;</span>
      </summary>
      <div className="panel mt-2 max-w-md space-y-2 p-3.5 text-dim">
        <Row label="tool" value={CALA_TOOL_LABEL[calaTool]} />
        <Row label="input" value={input} wrap />
        {entityUuid ? <Row label="entity" value={entityUuid} /> : null}
        <Row label="confidence" value={CONFIDENCE_LABEL[confidence]} />
        <Row label="retrieved" value={new Date(retrievedAt).toISOString().slice(0, 10)} />
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-faint">sources</div>
          <ul className="mt-1.5 space-y-1">
            {sourceUrls.map((url, i) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer" className="break-all text-ink underline underline-offset-2">
                  {sourceTitles?.[i] ?? url}
                </a>
              </li>
            ))}
            {sourceUrls.length === 0 ? <li className="text-faint">none recorded</li> : null}
          </ul>
        </div>
      </div>
    </details>
  );
}

function Row({ label, value, wrap }: { label: string; value: string; wrap?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="w-16 shrink-0 text-[10px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <span className={`${wrap ? "break-words" : "truncate"} text-ink`}>{value}</span>
    </div>
  );
}
