import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  initialCamera,
  constrainCamera,
  zoomCamera,
  focusCamera,
  pinchCamera,
} from "./sceneCamera.js";

export function useSceneCamera(viewport, world) {
  const [view, setView] = useState(initialCamera);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("orbit");
  const [dragging, setDragging] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [focusedRoom, setFocusedRoom] = useState("");
  const current = useRef(initialCamera);
  const enabledRef = useRef(false);
  const modeRef = useRef("orbit");
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const size = useRef({ width: 0, height: 0, worldWidth: 0, worldHeight: 0 });

  function update(next, smooth = false) {
    current.current = constrainCamera(next, size.current);
    setAnimated(smooth);
    setView(current.current);
  }
  function activate(next) {
    enabledRef.current = next;
    setEnabled(next);
  }
  function changeMode(next) {
    modeRef.current = next;
    setMode(next);
  }
  function reset() {
    pointers.current.clear();
    gesture.current = null;
    setDragging(false);
    setFocusedRoom("");
    activate(false);
    changeMode("orbit");
    update(initialCamera, true);
  }
  function zoom(factor) {
    activate(true);
    changeMode("pan");
    setFocusedRoom("");
    update(
      zoomCamera(
        current.current,
        current.current.scale * factor,
        { x: 0, y: 0 },
        size.current,
      ),
      true,
    );
  }
  function focusRoom(id, position) {
    if (!position) return reset();
    activate(true);
    changeMode("pan");
    setFocusedRoom(id);
    update(focusCamera(position, size.current), true);
  }

  useLayoutEffect(() => {
    const measure = () => {
      const box = viewport.current.getBoundingClientRect();
      size.current = {
        width: box.width,
        height: box.height,
        worldWidth: world.current.offsetWidth,
        worldHeight: world.current.offsetHeight,
      };
      current.current = constrainCamera(current.current, size.current);
      setView(current.current);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(world.current);
    return () => observer.disconnect();
  }, [viewport, world]);

  useEffect(() => {
    const element = viewport.current;
    const wheel = (event) => {
      // Page scrolling and the browser's own zoom remain available by default.
      if (!enabledRef.current || event.ctrlKey || event.metaKey) return;
      const box = element.getBoundingClientRect();
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? box.height : 1);
      const next = zoomCamera(
        current.current,
        current.current.scale *
          Math.exp(-Math.max(-160, Math.min(160, delta)) * 0.003),
        {
          x: event.clientX - box.left - box.width / 2,
          y: event.clientY - box.top - box.height / 2,
        },
        size.current,
      );
      if (next.scale === current.current.scale) return;
      event.preventDefault();
      setFocusedRoom("");
      modeRef.current = "pan";
      setMode("pan");
      current.current = next;
      setAnimated(false);
      setView(next);
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [viewport]);

  function rebaseGesture() {
    gesture.current = {
      view: current.current,
      points: [...pointers.current.values()],
      mode: modeRef.current,
    };
  }
  function relativePoint(event) {
    const box = viewport.current.getBoundingClientRect();
    return {
      x: event.clientX - box.left - box.width / 2,
      y: event.clientY - box.top - box.height / 2,
    };
  }
  function pointerDown(event) {
    if (
      event.button !== 0 ||
      (event.pointerType !== "mouse" && !enabledRef.current)
    )
      return;
    if (pointers.current.size === 0) suppressClick.current = false;
    pointers.current.set(event.pointerId, relativePoint(event));
    rebaseGesture();
    // Capture link-origin gestures only once a drag actually begins; taps keep their link target.
    if (!event.target.closest("a"))
      event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function pointerMove(event) {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return;
    pointers.current.set(event.pointerId, relativePoint(event));
    const nextPoints = [...pointers.current.values()];
    const start = gesture.current;
    const dx = nextPoints[0].x - start.points[0].x;
    const dy = nextPoints[0].y - start.points[0].y;
    if (nextPoints.length === 1 && Math.hypot(dx, dy) < 6 && !dragging) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    suppressClick.current = true;
    activate(true);
    setDragging(true);
    setFocusedRoom("");
    if (nextPoints.length >= 2 && start.points.length >= 2) {
      changeMode("pan");
      update(pinchCamera(start.view, start.points, nextPoints, size.current));
    } else if (start.mode === "orbit") {
      update({
        ...start.view,
        pitch: start.view.pitch - dy * 0.055,
        yaw: start.view.yaw + dx * 0.055,
      });
    } else {
      update({ ...start.view, x: start.view.x + dx, y: start.view.y + dy });
    }
  }
  function pointerEnd(event) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (pointers.current.size) rebaseGesture();
    else {
      gesture.current = null;
      setDragging(false);
    }
  }
  function clickCapture(event) {
    if (suppressClick.current && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick.current = false;
    }
  }
  function keyDown(event) {
    if (
      event.target !== event.currentTarget ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return;
    const steps = {
      ArrowLeft: [40, 0],
      ArrowRight: [-40, 0],
      ArrowUp: [0, 40],
      ArrowDown: [0, -40],
    };
    if (event.key === "Escape") activate(false);
    else if (event.key === "Home" || event.key === "0") reset();
    else if (event.key === "+" || event.key === "=") zoom(1.25);
    else if (event.key === "-") zoom(0.8);
    else if (steps[event.key]) {
      const [x, y] = steps[event.key];
      activate(true);
      setFocusedRoom("");
      update(
        modeRef.current === "orbit"
          ? {
              ...current.current,
              yaw: current.current.yaw - x * 0.06,
              pitch: current.current.pitch + y * 0.06,
            }
          : {
              ...current.current,
              x: current.current.x + x,
              y: current.current.y + y,
            },
        true,
      );
    } else return;
    event.preventDefault();
  }

  return {
    view,
    enabled,
    mode,
    dragging,
    animated,
    focusedRoom,
    toggle: () => activate(!enabledRef.current),
    toggleMode: () => {
      activate(true);
      changeMode(modeRef.current === "orbit" ? "pan" : "orbit");
    },
    zoom,
    reset,
    focusRoom,
    events: {
      onPointerDown: pointerDown,
      onPointerMove: pointerMove,
      onPointerUp: pointerEnd,
      onPointerCancel: pointerEnd,
      onLostPointerCapture: pointerEnd,
      onClickCapture: clickCapture,
      onKeyDown: keyDown,
      onDragStart: (event) => event.preventDefault(),
    },
  };
}
