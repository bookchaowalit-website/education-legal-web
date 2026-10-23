# Legal Knowledge Base

A small plain-language legal orientation index: five self-authored entries (contracts, process, privacy, creative
work, business). Search them, filter by topic family, and open one to read its meaning, a document touchpoint and the
next question to ask. Educational information only, not legal advice and not attorney reviewed.

Live: https://legal.bookchaowalit.com (deployed by Vercel CLI; it lags `main`, see `PRODUCT.md`).

## What it does not do

- No case law, statutes, compliance checklists, jurisdiction filter or Thai/international coverage. No account.
  Nothing is saved.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: search and selection logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/legal.ts`: the five entries plus `families`, `familyCount`, `filterEntries` and `pickSelected` (used by the page).
- `app/page.tsx`: the client index.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
