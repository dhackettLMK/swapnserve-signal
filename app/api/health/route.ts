import { NextResponse } from "next/server";
import { loadCreditLedger } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const ledger = loadCreditLedger();
  return NextResponse.json({
    ok: true,
    service: "signal",
    phase: "0-foundation",
    calaKeyPresent: Boolean(process.env.CALA_API_KEY),
    credits: { used: ledger.totalCredits, budget: ledger.budgetPerMonth },
    time: new Date().toISOString(),
  });
}
