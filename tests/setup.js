import { vi } from "vitest";
globalThis.ResizeObserver = class {
  observe() {}
  disconnect() {}
};
window.scrollTo = vi.fn();
window.matchMedia = vi.fn(() => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
}));
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
