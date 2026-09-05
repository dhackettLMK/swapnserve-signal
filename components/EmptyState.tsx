import type { ReactNode } from "react";

/**
 * The honest empty state. Phase 0 ships every module as one of these — "not yet
 * populated" is stronger than a fabricated number (BUILD_PROMPT.md §12.3). Each
 * says which phase fills it and what the acceptance bar is.
 */
export function EmptyState({
  phase,
  building,
  children,
}: {
  phase: string;
  building: string;
  children?: ReactNode;
}) {
  return (
    <div className="card mt-8 p-6">
      <div className="flex items-center gap-2">
        <span className="mono rounded bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">
          {phase}
        </span>
        <span className="text-sm font-medium">Not yet populated</span>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted">{building}</p>
      {children ? <div className="mt-4 text-sm text-muted">{children}</div> : null}
    </div>
  );
}
