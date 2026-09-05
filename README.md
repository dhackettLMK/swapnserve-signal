# Signal

A publicly deployed, **Cala-powered intelligence layer** for
[Swap'n'Serve](https://swapnserve.com), a Limerick community initiative for
clothing reuse. It helps win grants, target corporate partners, track textile
regulation (EU textile EPR, ~2028), and prove impact with defensible, sourced
numbers.

> Swap'n'Serve is an unincorporated community initiative — **not** a registered
> charity. The site never implies charity status. Companies listed under
> `/partners` are research targets, not partners.

## The one idea

Cala returns **verified, deterministic, typed** facts. So Signal fetches each
fact once, commits it to `data/*.json` with full **provenance**, validates it in
CI, and serves the site as static/cached content. A page view costs **zero**
Cala credits; spend is metered and shown in the open. See `docs/DECISIONS.md`
(ADR-001) and `/how-it-works`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Zod v4 · Vercel.

## Layout

```
app/        public site (9 routes + /api/ask, /api/health)
lib/        cala/ (typed REST client), schema/ (zod), data.ts (loaders), provenance.ts
data/       committed knowledge layer + _meta/ (credit ledger, query log, coverage gaps)
scripts/    validate.ts, check-secrets.ts (+ ingest/ in later phases)
docs/       DECISIONS · DELTAS · CALA_NOTES · INTERVIEW_NOTES
.claude/    private operator toolkit (not deployed)
```

## Develop

```bash
npm run dev        # local dev server
npm run verify     # typecheck + validate data + source secret scan
npm run build      # prebuild (validate+secrets) → build → postbuild (bundle scan)
```

Set `CALA_API_KEY` in `.env.local` (copy from `.env.example`) — **server-only**,
never exposed to the browser. The build fails if the key can reach the client
bundle.

## Status

**Phase 0 (foundation) complete.** Modules ship as honest empty states naming
the phase that fills them. Next: Phase 1 — Cala reconnaissance.
