import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import { galleryContent } from "../src/galleryContent.js";

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
});
afterEach(cleanup);

describe("Scene controls and safe navigation", () => {
  for (const language of ["en", "ar", "no", "fr"]) {
    it(`zooms, focuses a room and resets without navigating in ${language}`, async () => {
      window.localStorage.setItem("portfolio-language", language);
      render(<App />);
      const t = galleryContent[language];
      expect(
        screen.getByRole("button", { name: t.scene.zoomOut }).disabled,
      ).toBe(true);
      await userEvent.click(
        screen.getByRole("button", { name: t.scene.zoomIn }),
      );
      expect(screen.getByText("125%")).toBeTruthy();
      await userEvent.selectOptions(
        screen.getByLabelText(t.scene.closeup),
        "projects",
      );
      expect(screen.getByText("220%")).toBeTruthy();
      expect(window.location.hash).toBe("");
      await userEvent.click(
        screen.getByRole("button", { name: t.scene.reset }),
      );
      expect(screen.getByText("100%")).toBeTruthy();
      await userEvent.click(
        screen.getByRole("link", {
          name: `${t.enter} · ${t.rooms.projects}`,
          exact: true,
        }),
      );
      expect(window.location.hash).toBe("#projects");
    });
  }
  it("ignores the click after dragging a doorway but accepts a subsequent tap", async () => {
    render(<App />);
    const link = screen.getByRole("link", {
      name: "Enter · Experience",
      exact: true,
    });
    const viewport = screen.getByRole("region", {
      name: "Interactive gallery scene",
    });
    fireEvent.pointerDown(link, {
      button: 0,
      pointerId: 7,
      pointerType: "mouse",
      clientX: 200,
      clientY: 150,
    });
    fireEvent.pointerMove(viewport, {
      pointerId: 7,
      pointerType: "mouse",
      clientX: 280,
      clientY: 180,
    });
    fireEvent.pointerUp(viewport, {
      pointerId: 7,
      pointerType: "mouse",
      clientX: 280,
      clientY: 180,
    });
    fireEvent.click(link, { detail: 1 });
    expect(window.location.hash).toBe("");
    await userEvent.click(link);
    expect(window.location.hash).toBe("#experience");
  });
  it("leaves wheel scrolling and browser zoom alone until scene control is active", async () => {
    render(<App />);
    const viewport = screen.getByRole("region", {
      name: "Interactive gallery scene",
    });
    const wheel = (props) => {
      const event = new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        deltaY: -80,
        ...props,
      });
      fireEvent(viewport, event);
      return event;
    };
    expect(wheel().defaultPrevented).toBe(false);
    await userEvent.click(
      screen.getByRole("button", { name: "Explore", exact: true }),
    );
    expect(wheel({ ctrlKey: true }).defaultPrevented).toBe(false);
    expect(wheel().defaultPrevented).toBe(true);
    expect(screen.queryByText("100%")).toBeNull();
  });
  it("provides keyboard zoom, reset and an Escape exit", () => {
    render(<App />);
    const viewport = screen.getByRole("region", {
      name: "Interactive gallery scene",
    });
    fireEvent.keyDown(viewport, { key: "+" });
    expect(screen.getByText("125%")).toBeTruthy();
    fireEvent.keyDown(viewport, { key: "Escape" });
    expect(viewport.getAttribute("data-interactive")).toBe("false");
    fireEvent.keyDown(viewport, { key: "Home" });
    expect(screen.getByText("100%")).toBeTruthy();
  });
  it("requires touch activation and handles a pinch followed by releasing each finger", async () => {
    render(<App />);
    const viewport = screen.getByRole("region", {
      name: "Interactive gallery scene",
    });
    fireEvent.pointerDown(viewport, {
      button: 0,
      pointerId: 8,
      pointerType: "touch",
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerMove(viewport, {
      pointerId: 8,
      pointerType: "touch",
      clientX: 150,
      clientY: 120,
    });
    expect(viewport.getAttribute("data-interactive")).toBe("false");
    await userEvent.click(
      screen.getByRole("button", { name: "Explore", exact: true }),
    );
    fireEvent.pointerDown(viewport, {
      button: 0,
      pointerId: 8,
      pointerType: "touch",
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerDown(viewport, {
      button: 0,
      pointerId: 9,
      pointerType: "touch",
      clientX: 200,
      clientY: 100,
    });
    fireEvent.pointerMove(viewport, {
      pointerId: 9,
      pointerType: "touch",
      clientX: 300,
      clientY: 100,
    });
    expect(screen.getByText("200%")).toBeTruthy();
    fireEvent.pointerUp(viewport, {
      pointerId: 8,
      pointerType: "touch",
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerUp(viewport, {
      pointerId: 9,
      pointerType: "touch",
      clientX: 300,
      clientY: 100,
    });
    expect(viewport.getAttribute("data-dragging")).toBe("false");
    expect(window.location.hash).toBe("");
  });
});
