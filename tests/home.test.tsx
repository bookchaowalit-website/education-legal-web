// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { entries } from "@/lib/legal";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("home page (server render)", () => {
  it("renders one h1, every entry with its touchpoint and next question, and the not-legal-advice boundary", () => {
    const html = renderToString(<Home />);
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const e of entries) {
      expect(html).toContain(e.title);
      expect(html).toContain(e.touchpoint);
      expect(html).toContain(e.next);
    }
    expect(html).toContain("not current legal advice");
    expect(html).toContain("Not legal advice and not reviewed by a lawyer");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (t: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(t)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const titles = () => [...host.querySelectorAll(".rs-entry h3")].map((h) => h.textContent);
  const chips = () => [...host.querySelectorAll(".rs-chip")].map((c) => c.textContent);
  const search = () => host.querySelector<HTMLInputElement>("input[type='search']")!;
  const type = (value: string) => act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(search(), value);
    search().dispatchEvent(new Event("input", { bubbles: true }));
  });

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("searches live, counts each family chip within the search, and Clear puts focus back", () => {
    expect(titles()).toHaveLength(entries.length);
    type("purpose");
    expect(titles()).toEqual(["Personal data purpose"]);
    expect(chips()).toEqual(["All1", "contracts0", "process0", "privacy1", "creative work0", "business0"]);
    expect(host.querySelector(".rs-count")!.textContent).toBe(`Showing 1 of ${entries.length} entries for “purpose”`);
    press(button("Clear"));
    expect(titles()).toHaveLength(entries.length);
    expect(document.activeElement).toBe(search());
  });

  it("filters by family and offers a way back when nothing matches", () => {
    press(button("business"));
    expect(titles()).toEqual(["A service boundary"]);
    type("deadline");
    expect(host.querySelector(".rs-empty h3")!.textContent).toBe("No entries match");
    press(button("Show all entries"));
    expect(titles()).toHaveLength(entries.length);
    expect(button("All").getAttribute("aria-pressed")).toBe("true");
    // The pressed button left with the empty state: focus goes back to the search field, like Clear.
    expect(document.activeElement).toBe(search());
  });
});

describe("site files", () => {
  it("points robots and the sitemap at legal.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://legal.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://legal.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
