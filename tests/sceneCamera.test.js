import { describe, expect, it } from "vitest";
import {
  cameraLimits,
  initialCamera,
  constrainCamera,
  focusCamera,
  pinchCamera,
  zoomCamera,
} from "../src/sceneCamera.js";
import { roomPositions } from "../src/galleryContent.js";

const size = { width: 800, height: 600, worldWidth: 800, worldHeight: 600 };

describe("Gallery camera geometry", () => {
  it("keeps the image point under the pointer fixed when zooming", () => {
    const before = { ...initialCamera, scale: 2, x: -40, y: 20 };
    const point = { x: 100, y: -80 };
    const after = zoomCamera(before, 2.6, point, size);
    expect((point.x - after.x) / after.scale).toBeCloseTo(
      (point.x - before.x) / before.scale,
    );
    expect((point.y - after.y) / after.scale).toBeCloseTo(
      (point.y - before.y) / before.scale,
    );
  });
  it("bounds zoom, tilt and pan so a dragged scene cannot disappear", () => {
    const view = constrainCamera(
      { scale: 50, x: 10000, y: -10000, yaw: 80, pitch: -80 },
      size,
    );
    expect(view).toEqual({
      scale: cameraLimits.max,
      x: 800,
      y: -600,
      yaw: cameraLimits.yaw,
      pitch: -cameraLimits.pitch,
    });
    const fitted = constrainCamera({ ...view, scale: -5 }, size);
    expect(fitted.scale).toBe(1);
    expect(Math.abs(fitted.x) + Math.abs(fitted.y)).toBe(0);
  });
  it("centres the chosen room and keeps every edge doorway visible", () => {
    const projects = focusCamera(roomPositions.projects, size);
    expect(
      (roomPositions.projects.x / 100 - 0.5) *
        size.worldWidth *
        projects.scale +
        projects.x,
    ).toBeCloseTo(0);
    for (const point of Object.values(roomPositions)) {
      const view = focusCamera(point, size);
      const x = (point.x / 100 - 0.5) * size.worldWidth * view.scale + view.x;
      const y = (point.y / 100 - 0.5) * size.worldHeight * view.scale + view.y;
      expect(Math.abs(x)).toBeLessThan(size.width / 2 - 26);
      expect(Math.abs(y)).toBeLessThan(size.height / 2 - 26);
    }
  });
  it("combines two-finger zoom with movement of the pinch midpoint", () => {
    const result = pinchCamera(
      initialCamera,
      [
        { x: -40, y: 0 },
        { x: 40, y: 0 },
      ],
      [
        { x: -60, y: 20 },
        { x: 100, y: 20 },
      ],
      size,
    );
    expect(result).toMatchObject({ scale: 2, x: 20, y: 20 });
  });
});
