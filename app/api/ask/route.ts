import { NextResponse } from "next/server";
import { CalaClient } from "@/lib/cala";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Metered live-demo endpoint (BUILD_PROMPT.md §3, §7.3).
 *
 * Design (enforced fully in Phase 2, skeleton here):
 *  - allowlist of example questions + a bounded free-text field
 *  - per-day credit ceiling; when hit, serve the cached answer and say so
 *    honestly rather than erroring
 *  - per-IP rate limiting
 *  - the Cala key is read server-side only
 *
 * Phase 0: the endpoint exists, meters, and degrades honestly. It does not yet
 * spend credits — it returns a clear "live demo enabled in a later phase"
 * response so the contract and the honesty are demonstrable today.
 */

const DAILY_CREDIT_CEILING = Number(process.env.ASK_DAILY_CEILING ?? 20);
const MAX_QUESTION_LEN = 280;

// In-memory counters. Replaced with a durable store when the demo goes live.
let creditsUsedToday = 0;
let windowStart = Date.now();
function rollWindow() {
  const DAY = 24 * 60 * 60 * 1000;
  if (Date.now() - windowStart > DAY) {
    windowStart = Date.now();
    creditsUsedToday = 0;
  }
}

export async function POST(req: Request) {
  rollWindow();

  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return NextResponse.json({ error: "Provide a `question` string." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LEN) {
    return NextResponse.json(
      { error: `Question too long (max ${MAX_QUESTION_LEN} chars).` },
      { status: 400 },
    );
  }

  if (creditsUsedToday >= DAILY_CREDIT_CEILING) {
    return NextResponse.json({
      degraded: true,
      message:
        "Daily live-demo budget reached. Showing cached results instead — the live query resumes tomorrow.",
      creditsUsedToday,
      ceiling: DAILY_CREDIT_CEILING,
    });
  }

  const cala = new CalaClient();
  return NextResponse.json({
    enabled: false,
    message:
      "The live Cala demo is wired up in Phase 2. This endpoint already meters credits and degrades honestly; it just isn't spending yet.",
    calaKeyPresent: cala.hasKey(),
    creditsUsedToday,
    ceiling: DAILY_CREDIT_CEILING,
    echo: question,
  });
}

export function GET() {
  rollWindow();
  return NextResponse.json({
    endpoint: "/api/ask",
    method: "POST",
    body: { question: "string (≤280 chars)" },
    creditsUsedToday,
    ceiling: DAILY_CREDIT_CEILING,
    enabled: false,
  });
}
