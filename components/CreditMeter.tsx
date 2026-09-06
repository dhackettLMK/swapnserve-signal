import { loadCreditLedger } from "@/lib/data";
import { CreditMeterView } from "./CreditMeterView";

/**
 * Server wrapper: reads the committed ledger and hands the numbers to the
 * animated client view. The point it makes (a page view costs zero credits)
 * is proven by the fact the numbers come from a committed file, not a call.
 */
export function CreditMeter({ compact = false }: { compact?: boolean }) {
  const ledger = loadCreditLedger();
  return (
    <CreditMeterView
      used={ledger.totalCredits}
      budget={ledger.budgetPerMonth}
      compact={compact}
    />
  );
}
