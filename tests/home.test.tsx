import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { entries } from "@/lib/legal";

describe("home page", () => {
  it("renders every orientation entry and the not-legal-advice boundary", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Read the");
    for (const e of entries) expect(html).toContain(e.title);
    expect(html).toContain("not current legal advice");
    expect(html).toContain("Not legal advice · not attorney reviewed");
  });
  it("opens the first entry with its touchpoint and next question", () => {
    const html = renderToString(<Home />);
    expect(html).toContain(entries[0].touchpoint);
    expect(html).toContain(entries[0].next);
  });
});
