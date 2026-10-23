import { describe, expect, it } from "vitest";
import { entries, familyCount, families, filterEntries, pickSelected } from "@/lib/legal";

describe("entries", () => {
  it("have unique ids and are all scoped as general orientation", () => {
    expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length);
    for (const e of entries) expect(e.scope).toBe("general orientation");
  });
  it("list 'all' first, then each family once, with counts that add up", () => {
    expect(families[0]).toBe("all");
    expect(new Set(families).size).toBe(families.length);
    expect(familyCount("all")).toBe(entries.length);
    expect(families.slice(1).reduce((sum, f) => sum + familyCount(f), 0)).toBe(entries.length);
    expect(familyCount("unknown")).toBe(0);
  });
});

describe("filterEntries", () => {
  it("returns everything for an empty query in 'all'", () => {
    expect(filterEntries("", "all")).toHaveLength(entries.length);
  });
  it("matches title, meaning or family, case-insensitively", () => {
    expect(filterEntries("AGREEMENT", "all").map((e) => e.id)).toEqual(["L-01"]);
    expect(filterEntries("retention", "all")).toEqual([]);
    expect(filterEntries("privacy", "all").map((e) => e.id)).toEqual(["L-03"]);
  });
  it("limits results to the chosen family", () => {
    expect(filterEntries("", "process").map((e) => e.id)).toEqual(["L-02"]);
    expect(filterEntries("agreement", "privacy")).toEqual([]);
  });
  it("ignores spaces around the query", () => {
    expect(filterEntries("  agreement ", "all").map((e) => e.id)).toEqual(["L-01"]);
  });
});

describe("pickSelected", () => {
  it("keeps the selected entry while it is visible", () => {
    expect(pickSelected(entries, "L-03")?.id).toBe("L-03");
  });
  it("opens the first visible entry when the search hides the selected one", () => {
    const visible = filterEntries("", "privacy");
    expect(pickSelected(visible, "L-01")?.id).toBe("L-03");
  });
  it("shows nothing when no entry matches", () => {
    expect(pickSelected([], "L-01")).toBeNull();
  });
});
