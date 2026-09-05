import { loadCreditLedger } from "@/lib/data";

/**
 * The credit economy, made visible (BUILD_PROMPT.md §7.3, §11). Reads the
 * committed ledger — a page view costs zero credits, and here is the proof.
 */
export function CreditMeter({ compact = false }: { compact?: boolean }) {
  const ledger = loadCreditLedger();
  const pct = Math.min(100, Math.round((ledger.totalCredits / ledger.budgetPerMonth) * 100));

  return (
    <div className={compact ? "" : "card p-5"}>
      <div className="flex items-baseline justify-between">
        <span className="mono text-xs uppercase tracking-widest text-muted">Cala credits</span>
        <span className="mono text-sm">
          <span className="text-foreground">{ledger.totalCredits}</span>
          <span className="text-muted"> / {ledger.budgetPerMonth}</span>
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compact ? (
        <p className="mt-2 text-xs text-muted">
          Free-tier budget. The public site serves committed, cached data, so browsing costs
          nothing — credits are spent only during ingestion and the metered live demo.
        </p>
      ) : null}
    </div>
  );
}
