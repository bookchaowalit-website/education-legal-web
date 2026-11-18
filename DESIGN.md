# Design direction — Legal Knowledge Base

Five self-authored, plain-language orientation notes. Since 2026-11-19 the site uses the shared **Reader
shell** (see `READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and
`tests/reader-shell.test.tsx` are copied byte for byte from content-techblog-web. Geist via `next/font`
(variable on `<html>`), `--rs-*` tokens in light and dark; no site colour tokens remain.

- Structure: one h1 and a lede that states the boundary (general notes, not current legal advice), a live
  search (not a form), topic-family chips (`aria-pressed`) whose counts follow the search, a `role="status"`
  count, then every entry with its meaning, document touchpoint and next question in place.
- Empty state: "No entries match" with a Show all entries button that clears the search and the family.
- No decorative watermark and no link-looking text that is not a link.
- Floor: text ≥ 12px, controls ≥ 44px, 3px focus ring (also on the search field), 4.5:1 text contrast, forced
  colours, no horizontal scroll at 320px, footer link back to https://bookchaowalit.com/.
