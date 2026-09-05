import Link from "next/link";
import { loadCreditLedger } from "@/lib/data";

export function SiteFooter() {
  const ledger = loadCreditLedger();
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl">
            A research and intelligence tool for{" "}
            <span className="text-foreground">Swap&rsquo;n&rsquo;Serve</span>, a Limerick community
            initiative for clothing reuse. Companies listed are research targets, not partners.
          </p>
          <p className="mono text-xs">
            Powered by{" "}
            <a
              href="https://cala.ai"
              className="text-accent underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Cala
            </a>
            {" · "}
            {ledger.totalCredits}/{ledger.budgetPerMonth} credits used
            {" · "}
            <Link href="/how-it-works" className="hover:underline">
              how it works
            </Link>
          </p>
        </div>
        <p className="mt-4 text-xs text-muted">
          Swap&rsquo;n&rsquo;Serve is an unincorporated community initiative. It is not a registered
          charity and cannot issue tax-deductible receipts.
        </p>
      </div>
    </footer>
  );
}
