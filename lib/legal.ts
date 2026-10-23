// Orientation entries and pure search logic for the Legal Knowledge Base.
// Entries are self-authored, general orientation notes kept in the code: not legal advice, not attorney reviewed.

export type Entry = { id: string; title: string; family: string; scope: string; meaning: string; touchpoint: string; next: string };
export const entries: Entry[] = [
  { id: "L-01", title: "A written agreement", family: "contracts", scope: "general orientation", meaning: "A shared record of what each party has agreed to do, when, and under which conditions.", touchpoint: "Before work begins, compare the promise, deliverable, timing, and change process.", next: "Which terms would be difficult to prove if the relationship became unclear?" },
  { id: "L-02", title: "Notice and response", family: "process", scope: "general orientation", meaning: "A formal process often depends on what was communicated, when it was received, and how a response was invited.", touchpoint: "Keep the original notice, delivery evidence, and the response deadline together.", next: "What is the actual source of the deadline, and who can confirm it?" },
  { id: "L-03", title: "Personal data purpose", family: "privacy", scope: "general orientation", meaning: "Collecting information should have a clear purpose, a defined use, and a way for people to understand what happens next.", touchpoint: "Map the fields, purpose, retention period, and access before collecting data.", next: "What is the smallest amount of data needed for the stated purpose?" },
  { id: "L-04", title: "Intellectual work", family: "creative work", scope: "general orientation", meaning: "A creative output can carry different rights and permissions depending on who made it and what was agreed.", touchpoint: "Separate ownership, permission to use, credit, and modification rights in the brief.", next: "Which right is actually needed for the next use, rather than all rights by default?" },
  { id: "L-05", title: "A service boundary", family: "business", scope: "general orientation", meaning: "A clear boundary says what is included, what is excluded, and how a new request changes the work.", touchpoint: "Write the scope, acceptance signal, revision limit, and escalation path in plain language.", next: "What would count as accepted, and who has authority to say so?" },
];

export const families = ["all", ...Array.from(new Set(entries.map((entry) => entry.family)))];

/** Number of entries in a family ("all" counts every entry). */
export function familyCount(family: string): number {
  return family === "all" ? entries.length : entries.filter((entry) => entry.family === family).length;
}

/** Entries in the family whose title, meaning or family contains the query (case-insensitive). */
export function filterEntries(query: string, family: string): Entry[] {
  const needle = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesFamily = family === "all" || entry.family === family;
    return matchesFamily && `${entry.title} ${entry.meaning} ${entry.family}`.toLowerCase().includes(needle);
  });
}

/**
 * The entry to show in the sheet: the selected one while it is visible, otherwise the first visible entry,
 * or null when nothing matches (so the sheet never shows an entry the list has filtered out).
 */
export function pickSelected(visible: Entry[], selectedId: string): Entry | null {
  return visible.find((entry) => entry.id === selectedId) ?? visible[0] ?? null;
}
