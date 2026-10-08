import { describe, expect, it } from "vitest";
import { PerspectiveCamera, Vector3 } from "three";
import {
  cameraAtProgress,
  cameraForAspect,
  chapterAtProgress,
  progressFromScroll,
  tourRooms,
  tourStops,
} from "../src/houseJourney.js";

describe("a continuous walk through the house", () => {
  it("turns gradually between opposite rooms without pulling the gaze through the camera", () => {
    let previous;
    for (let i = 0; i <= 4000; i++) {
      const pose = cameraAtProgress(i / 4000);
      const gaze = new Vector3(...pose.target).sub(
        new Vector3(...pose.position),
      );
      expect(gaze.length()).toBeGreaterThan(2.7);
      gaze.normalize();
      if (previous)
        expect(previous.angleTo(gaze)).toBeLessThan((2 * Math.PI) / 180);
      previous = gaze;
    }
  });
  it("settles the portrait entrance framing without a camera or lens jump", () => {
    const before = cameraForAspect(0.17999, 0.5);
    const after = cameraForAspect(0.18001, 0.5);
    expect(
      Math.hypot(
        ...before.position.map((value, axis) => value - after.position[axis]),
      ),
    ).toBeLessThan(0.01);
    expect(Math.abs(before.fov - after.fov)).toBeLessThan(0.01);
  });
  it("fits the whole house in the initial portrait view", () => {
    for (const [width, height] of [
      [320, 720],
      [390, 776],
      [430, 864],
    ]) {
      const pose = cameraForAspect(0, width / height);
      const camera = new PerspectiveCamera(pose.fov, width / height, 0.08, 160);
      camera.position.set(...pose.position);
      camera.lookAt(new Vector3(...pose.target));
      camera.updateMatrixWorld();
      for (const x of [-8.85, 8.85])
        for (const y of [0, 4.8])
          for (const z of [0.5, -15.4]) {
            const point = new Vector3(x, y, z).project(camera);
            expect(Math.abs(point.x)).toBeLessThan(1);
            expect(Math.abs(point.y)).toBeLessThan(1);
          }
    }
  });
  it("starts outside, stops in the four matching rooms, and finishes on the terrace", () => {
    expect(cameraAtProgress(0).position[2]).toBeGreaterThan(0);
    for (const id of tourRooms)
      expect(chapterAtProgress(tourStops[id])).toBe(id);
    expect(cameraAtProgress(1).position[2]).toBeLessThan(-14);
    expect(cameraAtProgress(-3)).toEqual(cameraAtProgress(0));
    expect(cameraAtProgress(3)).toEqual(cameraAtProgress(1));
  });
  it("has no camera jump and walks around the courtyard tree", () => {
    let last = cameraAtProgress(0).position;
    for (let i = 1; i <= 2000; i++) {
      const position = cameraAtProgress(i / 2000).position;
      expect(
        Math.hypot(...position.map((value, axis) => value - last[axis])),
      ).toBeLessThan(0.16);
      // Courtyard planter is centred at (0, -7.8), with a 1.15m radius.
      expect(Math.hypot(position[0], position[2] + 7.8)).toBeGreaterThan(1.2);
      last = position;
    }
  });
  it("uses the sticky stage height and clamps normal page scrolling", () => {
    expect(progressFromScroll(50, 100, 4000, 800)).toBe(0);
    expect(progressFromScroll(1700, 100, 4000, 800)).toBe(0.5);
    expect(progressFromScroll(3400, 100, 4000, 800)).toBe(1);
    expect(progressFromScroll(10, 0, 0, 0)).toBe(1);
  });
});
