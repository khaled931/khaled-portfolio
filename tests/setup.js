import { vi } from "vitest";
window.PointerEvent = class extends MouseEvent {
  constructor(type, options = {}) {
    super(type, options);
    Object.defineProperty(this, "pointerId", {
      value: options.pointerId ?? 1,
      configurable: true,
    });
    Object.defineProperty(this, "pointerType", {
      value: options.pointerType ?? "mouse",
      configurable: true,
    });
  }
};
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
