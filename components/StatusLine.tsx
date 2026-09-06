/**
 * An inline status indicator. Replaces the old placeholder box: a single
 * instrument-style line with a live dot, stating the current phase honestly.
 */
export function StatusLine({ phase, state }: { phase: string; state: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <span className="flex items-center gap-2">
        <span className="pulse h-1.5 w-1.5 rounded-full bg-signal" />
        <span className="text-signal">{phase}</span>
      </span>
      <span className="text-faint">/</span>
      <span className="text-dim">{state}</span>
    </div>
  );
}
