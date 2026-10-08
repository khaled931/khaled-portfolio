import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import { galleryContent } from "../src/galleryContent.js";
import { houseContent } from "../src/houseContent.js";

const scene = vi.hoisted(() => ({
  setProgress: vi.fn(),
  setLabels: vi.fn(),
  setTheme: vi.fn(),
  dispose: vi.fn(),
}));
vi.mock("../src/houseScene.js", () => ({ createHouseScene: () => scene }));

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
  window.matchMedia = vi.fn(() => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.stubGlobal("WebGL2RenderingContext", class {});
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
    function () {
      return this.classList.contains("house-journey") ? 4000 : 800;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function () {
      return {
        top: this.classList.contains("house-journey")
          ? -window.scrollY + 72
          : 0,
        left: 0,
        width: 1200,
        height: this.classList.contains("site-header") ? 72 : 800,
      };
    },
  );
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    callback(16);
    return 1;
  });
  scene.setProgress.mockClear();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("house controls preserve content and native gestures", () => {
  it("keeps downloaded-preview navigation working when History API writes are restricted", async () => {
    vi.spyOn(window.history, "pushState").mockImplementation(() => {
      throw new DOMException("Local history is restricted", "SecurityError");
    });
    render(<App />);
    await userEvent.click(
      within(
        screen.getByRole("navigation", { name: galleryContent.en.allRooms }),
      ).getByRole("link", { name: "Projects" }),
    );
    expect(window.location.hash).toBe("#projects");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Projects",
    );
  });
  for (const language of ["en", "ar", "no", "fr"]) {
    it(`offers a guided walk and direct access in ${language}`, async () => {
      window.localStorage.setItem("portfolio-language", language);
      render(<App />);
      const h = houseContent[language],
        t = galleryContent[language];
      await screen.findByRole("button", { name: h.scroll });
      await userEvent.click(
        screen.getByRole("button", {
          name: `${t.enter} · ${t.rooms.projects}`,
        }),
      );
      expect(window.scrollTo).toHaveBeenLastCalledWith({
        top: 0.71 * 3200,
        behavior: "smooth",
      });
      expect(window.location.hash).toBe("");
      const directory = within(
        screen.getByRole("navigation", { name: t.allRooms }),
      );
      await userEvent.click(
        directory.getByRole("link", { name: t.shortRooms.projects }),
      );
      expect(window.location.hash).toBe("#projects");
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        t.rooms.projects,
      );
    });
  }
  it("does not cancel ordinary scrolling or browser pinch/wheel zoom", async () => {
    render(<App />);
    await screen.findByRole("button", { name: "Scroll to enter" });
    const artwork = screen.getByRole("img", { name: houseContent.en.scene });
    for (const props of [{}, { ctrlKey: true }, { metaKey: true }]) {
      const wheel = new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        deltaY: 90,
        ...props,
      });
      fireEvent(artwork, wheel);
      expect(wheel.defaultPrevented).toBe(false);
    }
    expect(document.querySelector(".scene-toolbar")).toBeNull();
    expect(document.querySelector(".room-entrances")).toBeNull();
    expect(document.querySelector(".room-dock")).toBeNull();
  });
  it("provides the complete portfolio when animation or WebGL is unavailable", async () => {
    vi.stubGlobal("WebGL2RenderingContext", undefined);
    window.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    }));
    render(<App />);
    expect(
      document.querySelector(".house-journey").getAttribute("data-animated"),
    ).toBe("false");
    expect(
      screen.queryByRole("button", { name: "Scroll to enter" }),
    ).toBeNull();
    await userEvent.click(
      within(
        screen.getByRole("navigation", { name: galleryContent.en.allRooms }),
      ).getByRole("link", { name: "Education" }),
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Education",
    );
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
  });
});
