# Legal Knowledge Base — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `legal-knowledge`) on 2026-10-23.

## What it is

A client-only page over five hard-coded, self-authored orientation entries; no API or database.

## Who it is for

Someone who wants to get oriented on a legal topic before asking a qualified professional, or a portfolio visitor.

## What works today

1. Search the entries by title, meaning or family (case-insensitive, surrounding spaces ignored).
2. Filter by topic family (all, contracts, process, privacy, creative work, business), each with its entry count.
3. Open an entry to read its meaning, document touchpoint and next question. If the search or filter hides the open
   entry, the first visible one opens instead; with no match, the sheet says nothing is open.
4. Every view carries the boundary: general orientation only, not legal advice, not attorney reviewed.
5. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No case law database, statutes, industry compliance checklists, jurisdiction filter or Thai/international coverage
  (claims removed from the portfolio card in the 2026-10 review).
- Entries make no claim of current legal validity or completeness.
- No account, storage or sync; nothing survives a reload. No API route. `@vercel/analytics` and
  `@vercel/speed-insights` are installed but not rendered, so no analytics are collected.

## Live URL and deploy state

- Live: https://legal.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-legal-frontend` has no Git link, so a push to `main` does not deploy. Last
  production deploy: 2026-10-08, commit 87da82a (Vercel CLI), which predates the next 16.4.2 patch on `main`. The live
  site lags `main` (no Sentry, no fixes) until the coordinator deploys it or the owner connects Vercel Git to this
  repository (owner action D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `education-legal-web`, org `personal-yu0`).

## Boundaries

- Browser-only, no server data. The only outbound call is a Sentry error report, when the DSN is set.
