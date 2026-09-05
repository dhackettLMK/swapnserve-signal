/**
 * Inline SVG of the Cala entity workflow and the provenance chain. Theme-aware
 * via CSS variables; scales with its container. Refined in Phase 7.
 */
export function EntityWorkflowDiagram() {
  const steps = [
    { t: "entity_search", s: "name → UUID", d: "fuzzy match" },
    { t: "entity_introspection", s: "UUID → schema", d: "the step most skip" },
    { t: "entity_retrieval", s: "UUID → typed data", d: "projection" },
  ];
  return (
    <div className="card overflow-x-auto p-4">
      <svg
        viewBox="0 0 760 220"
        role="img"
        aria-label="entity_search to entity_introspection to entity_retrieval, then a typed fact carrying a provenance record"
        className="w-full min-w-[680px]"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
      >
        {steps.map((step, i) => {
          const x = 10 + i * 250;
          return (
            <g key={step.t}>
              <rect
                x={x}
                y={20}
                width={210}
                height={72}
                rx={10}
                fill="var(--surface-2)"
                stroke="var(--accent)"
                strokeWidth={1.25}
              />
              <text x={x + 16} y={48} fontSize={15} fill="var(--foreground)" fontWeight={600}>
                {step.t}
              </text>
              <text x={x + 16} y={68} fontSize={12} fill="var(--muted)">
                {step.s}
              </text>
              <text x={x + 16} y={84} fontSize={10} fill="var(--accent)">
                {step.d}
              </text>
              {i < steps.length - 1 ? (
                <g stroke="var(--muted)" strokeWidth={1.5} fill="none">
                  <line x1={x + 210} y1={56} x2={x + 250} y2={56} />
                  <path d={`M ${x + 244} 51 L ${x + 250} 56 L ${x + 244} 61`} />
                </g>
              ) : null}
            </g>
          );
        })}

        {/* down to the fact */}
        <g stroke="var(--muted)" strokeWidth={1.5} fill="none">
          <line x1={625} y1={92} x2={625} y2={132} />
          <path d="M 620 126 L 625 132 L 630 126" />
        </g>

        <rect
          x={430}
          y={132}
          width={320}
          height={72}
          rx={10}
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth={1.25}
        />
        <text x={446} y={160} fontSize={14} fill="var(--foreground)" fontWeight={600}>
          Fact&lt;T&gt; + Provenance
        </text>
        <text x={446} y={180} fontSize={11} fill="var(--muted)">
          value + { "{ tool, input, uuid, sources," }
        </text>
        <text x={446} y={195} fontSize={11} fill="var(--muted)">
          {"timestamp, credits, confidence }"}
        </text>

        <text x={10} y={160} fontSize={12} fill="var(--muted)">
          committed to
        </text>
        <text x={10} y={178} fontSize={13} fill="var(--foreground)" fontWeight={600}>
          data/*.json
        </text>
        <text x={10} y={196} fontSize={11} fill="var(--muted)">
          version-controlled
        </text>
      </svg>
    </div>
  );
}
