import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createHouseScene } from "../src/houseScene.js";
import { cameraAtProgress } from "../src/houseJourney.js";

const captured = vi.hoisted(() => ({
  scene: null,
  frames: new Map(),
  next: 1,
}));
vi.mock("three", async (original) => {
  const actual = await original();
  return {
    ...actual,
    WebGLRenderer: class {
      constructor() {
        this.domElement = document.createElement("canvas");
        this.shadowMap = {};
        this.capabilities = { getMaxAnisotropy: () => 4 };
      }
      setPixelRatio() {}
      setSize() {}
      render(scene) {
        captured.scene = scene;
      }
      dispose() {}
      forceContextLoss() {}
    },
    PMREMGenerator: class {
      fromScene() {
        return { texture: new actual.Texture(), dispose() {} };
      }
      dispose() {}
    },
  };
});
vi.mock("../src/houseMaterials.js", () => ({
  loadHouseSurfaces: ({ scene }) => {
    captured.scene = scene;
    return Promise.resolve();
  },
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.replaceChildren();
  captured.frames.clear();
});

describe("real scene geometry and lifecycle (without a GPU)", () => {
  it.each([390, 1200])(
    "constructs the model, keeps camera clearance and disposes at %ipx",
    async (width) => {
      const noop = () => {};
      const context = new Proxy(
        {},
        {
          get: (_, key) =>
            key === "createRadialGradient"
              ? () => ({ addColorStop: noop })
              : noop,
          set: () => true,
        },
      );
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
        context,
      );
      vi.stubGlobal(
        "IntersectionObserver",
        class {
          observe() {}
          disconnect() {}
        },
      );
      vi.stubGlobal("requestAnimationFrame", (callback) => {
        const id = captured.next++;
        captured.frames.set(id, callback);
        return id;
      });
      vi.stubGlobal("cancelAnimationFrame", (id) => captured.frames.delete(id));
      const mount = document.createElement("div");
      Object.defineProperties(mount, {
        clientWidth: { value: width },
        clientHeight: { value: 760 },
      });
      document.body.append(mount);
      const unavailable = vi.fn();
      const controller = createHouseScene(mount, {
        theme: "light",
        labels: {
          education: "Education",
          experience: "Experience",
          projects: "Projects",
          volunteering: "Community",
        },
        onUnavailable: unavailable,
      });
      await controller.ready;
      expect(unavailable).not.toHaveBeenCalled();
      expect(mount.querySelector("canvas")).not.toBeNull();
      let meshCount = 0;
      const geometrySet = new Set();
      captured.scene.traverse((object) => {
        if (!object.isMesh) return;
        meshCount++;
        geometrySet.add(object.geometry);
        for (const key of ["position", "normal", "uv"])
          expect(
            Array.from(object.geometry.attributes[key].array).every(
              Number.isFinite,
            ),
          ).toBe(true);
      });
      expect(meshCount).toBeLessThan(140);
      controller.setProgress(0.21, true);
      for (let frame = 0; frame < 70; frame++) {
        const scheduled = [...captured.frames];
        captured.frames.clear();
        for (const [, callback] of scheduled) callback(16 + frame * 16);
      }
      captured.scene.updateMatrixWorld(true);
      const ray = new THREE.Raycaster();
      // Six short rays detect close walls/furniture at eye level throughout the
      // complete route, with the physical door leaves opened by the controller.
      const directions = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ].map((p) => new THREE.Vector3(...p));
      for (let i = 0; i <= 1000; i += 3) {
        const pose = cameraAtProgress(i / 1000);
        for (const direction of directions) {
          ray.set(new THREE.Vector3(...pose.position), direction);
          ray.far = 0.12;
          const hits = ray.intersectObjects(captured.scene.children, true);
          expect(
            hits.length,
            JSON.stringify({
              progress: i / 1000,
              position: pose.position,
              direction: direction.toArray(),
              hit: hits[0] && {
                point: hits[0].point,
                color: hits[0].object.material.color,
                distance: hits[0].distance,
              },
            }),
          ).toBe(0);
        }
      }
      let disposed = 0;
      geometrySet.forEach((geo) =>
        geo.addEventListener("dispose", () => disposed++),
      );
      controller.dispose();
      expect(disposed).toBe(geometrySet.size);
      expect(mount.querySelector("canvas")).toBeNull();
      expect(captured.frames.size).toBe(0);
    },
    15000, // CPU ray intersections need headroom on shared CI runners.
  );
});
