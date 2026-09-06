import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Style guide" };

export default function StyleguidePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Machined Ink"
        title="Style guide"
        intro="Every token and primitive, light and dark, the same system inverted. Reviewed before building features."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Panel label="Light"><Specimens /></Panel>
        <div className="dark rounded-[8px]" style={{ background: "var(--background)" }}>
          <Panel label="Dark" dark><Specimens /></Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ label, children, dark }: { label: string; children: ReactNode; dark?: boolean }) {
  return (
    <section
      className="rounded-[8px] border border-line p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <p className="tag mb-5">{label}{dark ? " (inverted)" : ""}</p>
      {children}
    </section>
  );
}

function Specimens() {
  return (
    <div className="space-y-7">
      <div>
        <p className="tag mb-2">Type</p>
        <p className="display text-3xl">Display, minus two percent</p>
        <p className="mt-1 text-sm text-dim">Body, Funnel Sans, 15px, ink on ground.</p>
        <p className="editorial mt-1 text-lg">Editorial emphasis, a degraded serif.</p>
        <p className="mono mt-1 text-sm">MONO 0123456789 · id_9f2a · 17 Apr 2028</p>
      </div>

      <div>
        <p className="tag mb-2">Grounds and ink</p>
        <div className="flex flex-wrap gap-2">
          <Swatch v="--background" /><Swatch v="--card" /><Swatch v="--muted" />
          <Swatch v="--foreground" /><Swatch v="--muted-foreground" /><Swatch v="--action" />
        </div>
      </div>

      <div>
        <p className="tag mb-3">Primitives</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-action px-4 py-2 text-sm font-medium">Primary action</button>
          <button className="keycap px-4 py-2 text-sm font-medium text-ink">Keycap</button>
          <span className="keycap px-2 py-1 mono text-[11px] text-dim">TAB</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="well px-3 py-2 text-sm text-dim">Input well</div>
          <div className="groove h-9" />
        </div>
        <div className="panel mt-3 p-4">
          <p className="text-sm">Panel, one level of elevation, hairline rim, top highlight.</p>
        </div>
      </div>

      <div>
        <p className="tag mb-2">Status (dots, never fills)</p>
        <div className="flex flex-wrap gap-4 text-xs text-dim">
          <Dot c="var(--action)" label="ready" />
          <Dot c="var(--status-run)" label="running" />
          <Dot c="var(--status-wait)" label="waiting" />
          <Dot c="var(--status-fail)" label="failed" />
        </div>
      </div>
    </div>
  );
}

function Swatch({ v }: { v: string }) {
  return (
    <div className="text-center">
      <div className="h-10 w-14 rounded-[4px] border border-line" style={{ background: `var(${v})` }} />
      <div className="mt-1 mono text-[9px] text-faint">{v.replace("--", "")}</div>
    </div>
  );
}

function Dot({ c, label }: { c: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: c }} />
      {label}
    </span>
  );
}
