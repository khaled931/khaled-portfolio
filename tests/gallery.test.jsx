import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import {
  pageFromHash,
  readPreference,
  savePreference,
} from "../src/navigation.js";
import { galleryContent } from "../src/galleryContent.js";

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
});
afterEach(cleanup);

describe("visitor navigation", () => {
  it("opens a shared room link, continues and restores it with browser Back", async () => {
    window.history.replaceState(null, "", "#experience");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Experience",
    );
    await userEvent.click(
      screen.getByRole("link", { name: "Continue to Projects" }),
    );
    expect(window.location.hash).toBe("#projects");
    expect(document.activeElement.textContent).toBe("Projects");
    await act(async () => {
      window.history.back();
    });
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Experience",
      ),
    );
    await act(async () => {
      window.history.forward();
    });
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Projects",
      ),
    );
  });

  it("handles fast direct room changes and retains the native project URLs", async () => {
    render(<App />);
    const dock = () =>
      within(screen.getByRole("navigation", { name: "The whole gallery" }));
    for (const label of [
      "Experience",
      "Projects",
      "Volunteer",
      "Education",
      "Projects",
    ])
      await userEvent.click(dock().getByRole("link", { name: label }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Projects",
    );
    expect(
      screen
        .getAllByRole("link", { name: /Open project/ })
        .map((link) => link.href),
    ).toEqual([
      "https://syrianrenewables.com/",
      "https://granularcertificates.com/",
    ]);
    expect(
      dock()
        .getByRole("link", { name: "Projects" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });

  it("closes the menu after choosing a room and moves focus to its heading", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = within(screen.getByRole("dialog"));
    await userEvent.click(menu.getByRole("link", { name: /Volunteering/ }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("heading", { name: "Norway Now" })).toBeTruthy();
    expect(document.activeElement.id).toBe("page-title");
  });
});

describe("language, access and content continuity", () => {
  it("persists language and theme, and switches reading direction without changing the room", async () => {
    window.history.replaceState(null, "", "#education");
    const first = render(<App />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "ar");
    expect(document.documentElement.dir).toBe("rtl");
    await userEvent.click(
      screen.getByRole("button", { name: "التبديل إلى الوضع الداكن" }),
    );
    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
    expect(window.location.hash).toBe("#education");
    first.unmount();
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "الدراسة",
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  for (const language of ["en", "ar", "no", "fr"])
    it(`keeps the four rooms and factual content accessible in ${language}`, async () => {
      window.localStorage.setItem("portfolio-language", language);
      render(<App />);
      const t = galleryContent[language];
      const dock = () =>
        within(screen.getByRole("navigation", { name: t.allRooms }));
      for (const id of [
        "experience",
        "projects",
        "volunteering",
        "education",
      ]) {
        await userEvent.click(
          dock().getByRole("link", { name: t.shortRooms[id] }),
        );
        expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
          t.rooms[id],
        );
      }
      expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/2021/).length).toBeGreaterThan(0);
    });

  it("enlarges original photos, supports next/previous and restores keyboard focus on close", async () => {
    window.history.replaceState(null, "", "#visuals");
    render(<App />);
    const opener = screen.getByRole("button", {
      name: "View photograph: Coastal aerial landscape — Norway",
    });
    await userEvent.click(opener);
    expect(screen.getByRole("dialog").getAttribute("aria-label")).toBe(
      "Coastal aerial landscape — Norway",
    );
    await userEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByRole("dialog").getAttribute("aria-label")).toBe(
      "Autumn colours from above",
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: false, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("honours legacy links and safely falls back when storage is unavailable", () => {
    expect(pageFromHash("#energy")).toBe("education");
    expect(pageFromHash("#volunteer")).toBe("volunteering");
    expect(pageFromHash("#media")).toBe("visuals");
    expect(pageFromHash("#unknown")).toBe("gallery");
    const blocked = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    expect(readPreference(blocked, "theme", ["light", "dark"], "light")).toBe(
      "light",
    );
    expect(() => savePreference(blocked, "theme", "dark")).not.toThrow();
  });
  it("opens a room without the camera animation when reduced motion is requested", async () => {
    window.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    }));
    render(<App />);
    await userEvent.click(
      within(
        screen.getByRole("navigation", { name: "The whole gallery" }),
      ).getByRole("link", { name: "Experience", exact: true }),
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Experience",
    );
    expect(document.querySelector(".gallery-flight")).toBeNull();
  });
});
