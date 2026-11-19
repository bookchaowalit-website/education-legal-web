"use client";

import { useState } from "react";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount, SearchForm } from "@/components/reader-shell";
import { entries, families, filterEntries } from "@/lib/legal";

// The orientation notes on the Reader shell: a live search, topic-family chips whose counts follow the search,
// and every entry with its touchpoint and next question in place.

const SOURCE = "https://github.com/bookchaowalit-website/education-legal-web";

export function EntriesView() {
  const [family, setFamily] = useState("all");
  const [query, setQuery] = useState("");
  const matching = filterEntries(query, "all");
  const shown = filterEntries(query, family);
  const q = query.trim();
  return (
    <Reader>
      <ReaderTop name="Legal Knowledge Base" tagline="Orientation notes" links={[{ href: "#entries", label: "Entries" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Plain language, clearer next questions"
          title="Read the fine print."
          lede="A working index for getting oriented before you ask the question that needs a qualified professional. These are general notes, not current legal advice: scope and jurisdiction always matter."
        />
        <section aria-labelledby="entries">
          <div className="rs-section-head"><h2 id="entries">Entries</h2></div>
          <div className="rs-toolbar">
            <SearchForm label="Search the index" placeholder="Topic, word or phrase" value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
            <ul className="site-chips" aria-label="Filter by topic family">
              {families.map((item) => (
                <li key={item}>
                  <button type="button" className="rs-chip" aria-pressed={family === item} onClick={() => setFamily(item)}>
                    {item === "all" ? "All" : item}<small>{item === "all" ? matching.length : matching.filter((entry) => entry.family === item).length}</small>
                  </button>
                </li>
              ))}
            </ul>
            <ResultCount shown={shown.length} total={entries.length} noun="entry" plural="entries" query={q || undefined} filter={family === "all" ? undefined : `“${family}”`} />
          </div>
          {shown.length === 0 ? (
            <EmptyState
              title="No entries match"
              headingLevel={3}
              action={<button type="button" className="rs-plain" onClick={() => { setQuery(""); setFamily("all"); }}>Show all entries</button>}
            >
              Try a broader word, or another topic family.
            </EmptyState>
          ) : (
            <ul className="rs-list" role="list">
              {shown.map((entry) => (
                <li key={entry.id}>
                  <article className="rs-entry">
                    <h3>{entry.title}</h3>
                    <p className="rs-entry-meta">{entry.id} · {entry.family} · {entry.scope}</p>
                    <p className="rs-entry-summary">{entry.meaning}</p>
                    <dl className="site-facts">
                      <div><dt>Document touchpoint</dt><dd>{entry.touchpoint}</dd></div>
                      <div><dt>Next question</dt><dd>{entry.next}</dd></div>
                    </dl>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Self-authored general orientation notes. Not legal advice and not reviewed by a lawyer; check the current law for your jurisdiction with a qualified professional." />
    </Reader>
  );
}
