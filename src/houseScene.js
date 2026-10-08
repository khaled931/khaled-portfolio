import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { cameraForAspect, clampProgress } from "./houseJourney.js";
import {
  architecturalBox,
  metricUV,
  oliveLeafGeometry,
  batchArchitecture,
} from "./houseGeometry.js";
import { loadHouseSurfaces } from "./houseMaterials.js";

// One physically connected courtyard house, modeled in metres. All scenery is
// built locally, with self-hosted photographic PBR textures and a captured sky.
export function createHouseScene(mount, { theme, labels, onUnavailable }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "default",
    });
  } catch {
    onUnavailable();
    return null;
  }
  let disposed = false;
  const mobile = () => mount.clientWidth < 760;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.08, 160);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, mobile() ? 1.35 : 1.65),
  );
  renderer.domElement.className = "house-webgl";
  mount.appendChild(renderer.domElement);

  const geometries = new Map();
  const materials = new Set();
  const textures = new Set();
  const objects = new THREE.Group();
  scene.add(objects);
  let seed = 72481;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const geometry = (key, create) => {
    if (!geometries.has(key)) geometries.set(key, create());
    return geometries.get(key);
  };
  const mat = (color, roughness = 0.8, options = {}) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness,
      ...options,
    });
    materials.add(material);
    return material;
  };
  const material = {
    stone: mat("#dbcdb5"),
    pale: mat("#e4ddd0"),
    trim: mat("#f3eadb"),
    teal: mat("#164852"),
    deepTeal: mat("#103b43"),
    wood: mat("#9b6b3d", 0.76),
    oak: mat("#c79e67", 0.75),
    dark: mat("#283839", 0.52),
    gold: mat("#b79a5e", 0.38, { metalness: 0.68 }),
    linen: mat("#e8e0d0", 1),
    earth: mat("#746b4c", 1),
    bark: mat("#61564a", 0.96),
    leaf: mat("#748369", 0.78, { side: THREE.DoubleSide }),
    leafDark: mat("#45634f", 0.84, { side: THREE.DoubleSide }),
    glass: mat("#c8e2df", 0.2, {
      metalness: 0.18,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    }),
    water: mat("#527f79", 0.16, { metalness: 0.2 }),
    light: mat("#ffe0a0", 0.5, { emissive: "#ffe0a0", emissiveIntensity: 1.5 }),
    book: [mat("#365865"), mat("#bb9a67"), mat("#dfd0ae"), mat("#744f3e")],
  };
  function addMesh(
    geo,
    material,
    position,
    parent = objects,
    rotation = [0, 0, 0],
  ) {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function box(size, position, material, parent = objects, rotation) {
    return addMesh(
      geometry(`bevel-box-${size.join("-")}`, () => architecturalBox(size)),
      material,
      position,
      parent,
      rotation,
    );
  }

  function cylinder(
    radius,
    height,
    position,
    material,
    parent = objects,
    top = radius,
  ) {
    const key = `cylinder-${radius}-${top}-${height}`;
    return addMesh(
      geometry(key, () => new THREE.CylinderGeometry(top, radius, height, 32)),
      material,
      position,
      parent,
    );
  }
  function plane(
    size,
    position,
    material,
    rotation = [0, 0, 0],
    parent = objects,
  ) {
    const mesh = addMesh(
      geometry(
        `plane-${material.isMeshBasicMaterial ? "label" : "surface"}-${size.join("-")}`,
        () => {
          const geo = new THREE.PlaneGeometry(...size);
          // Text plaques use normalized UVs; floors use metre-based coordinates.
          return material.isMeshBasicMaterial ? geo : metricUV(geo);
        },
      ),
      material,
      position,
      parent,
      rotation,
    );
    mesh.castShadow = false;
    return mesh;
  }
  function canvasTexture(width, height, paint) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    paint(canvas.getContext("2d"), width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(texture);
    return texture;
  }
  const stoneTexture = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#eee4d1";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 4500; i++) {
      ctx.fillStyle = `rgba(109, 96, 78, ${random() * 0.065})`;
      ctx.fillRect(
        random() * w,
        random() * h,
        1 + random() * 2,
        1 + random() * 2,
      );
    }
  });
  stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
  stoneTexture.repeat.set(0.5, 0.5);
  material.stone.map = stoneTexture;
  const floorTexture = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#e3d8c3";
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 128) {
      for (let x = 0; x < w; x += 128) {
        ctx.fillStyle = `rgba(150, 125, 95, ${0.03 + random() * 0.06})`;
        ctx.fillRect(x + 2, y + 2, 124, 124);
      }
    }
    ctx.strokeStyle = "#cbbb9e";
    ctx.lineWidth = 1;
    for (let v = 0; v <= 512; v += 128) {
      ctx.beginPath();
      ctx.moveTo(v, 0);
      ctx.lineTo(v, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, v);
      ctx.lineTo(w, v);
      ctx.stroke();
    }
  });
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(0.25, 0.25);
  const floorMaterial = mat("#ffffff", 0.92, { map: floorTexture });
  const woodTexture = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#c7aa81";
    ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < 512; x += 64) {
      ctx.fillStyle = `rgba(90, 61, 32, ${random() * 0.1})`;
      ctx.fillRect(x, 0, 63, h);
      ctx.fillStyle = "rgba(84,61,36,.28)";
      ctx.fillRect(x, 0, 1, h);
    }
    for (let i = 0; i < 500; i++) {
      ctx.strokeStyle = `rgba(75,50,28,${random() * 0.06})`;
      const x = random() * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + 5, h / 3, x - 3, h * 0.7, x + 2, h);
      ctx.stroke();
    }
  });
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1 / 1.7, 1 / 1.7);
  const timberFloor = mat("#ffffff", 0.94, { map: woodTexture });

  const grain = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = `rgba(30,30,30,${0.1 + random() * 0.22})`;
      ctx.fillRect(
        random() * w,
        random() * h,
        0.5 + random(),
        8 + random() * 32,
      );
    }
  });
  grain.colorSpace = THREE.NoColorSpace;
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  material.bark.bumpMap = grain;
  material.bark.bumpScale = 0.022;
  const weave = canvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#b5b3ac";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < w; i += 4) {
      ctx.fillStyle = "#d7d3c9";
      ctx.fillRect(i, 0, 1, h);
      ctx.fillStyle = "#87877f";
      ctx.fillRect(0, i, w, 1);
    }
  });
  weave.colorSpace = THREE.NoColorSpace;
  weave.wrapS = weave.wrapT = THREE.RepeatWrapping;
  weave.repeat.set(7, 7);
  material.linen.bumpMap = weave;
  material.linen.bumpScale = 0.003;
  const waterRipples = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 2;
    for (let row = 0; row < h; row += 8) {
      ctx.strokeStyle = `rgba(220,220,220,${0.25 + random() * 0.2})`;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = row + 3 * Math.sin((x * Math.PI) / 64 + row);
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
  });
  waterRipples.colorSpace = THREE.NoColorSpace;
  waterRipples.wrapS = waterRipples.wrapT = THREE.RepeatWrapping;
  waterRipples.repeat.setScalar(0.22);
  material.water.bumpMap = waterRipples;
  material.water.bumpScale = 0.035;

  function rectHole(shape, left, bottom, width, height) {
    const hole = new THREE.Path();
    hole.moveTo(left, bottom);
    hole.lineTo(left + width, bottom);
    hole.lineTo(left + width, bottom + height);
    hole.lineTo(left, bottom + height);
    hole.closePath();
    shape.holes.push(hole);
  }
  function wall(
    width,
    height,
    position,
    holes = [],
    rotation = 0,
    thickness = 0.28,
    wallMaterial = material.stone,
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    // Doorways are open notches in the lower boundary. A closed "hole" that
    // crosses the wall boundary is invalid and can silently triangulate shut.
    const doors = holes
      .filter((hole) => hole.kind !== "rect")
      .sort((a, b) => a.args[0] - b.args[0]);
    for (const {
      args: [x, radius = 1.35, spring = 2.2],
    } of doors) {
      shape.lineTo(x - radius, 0);
      shape.lineTo(x - radius, spring);
      shape.absarc(x, spring, radius, Math.PI, 0, true);
      shape.lineTo(x + radius, 0);
    }
    shape.lineTo(width / 2, 0);
    shape.lineTo(width / 2, height);
    shape.lineTo(-width / 2, height);
    shape.closePath();
    for (const hole of holes)
      if (hole.kind === "rect") rectHole(shape, ...hole.args);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 1,
      curveSegments: 32,
    });
    geometries.set(`wall-${geometries.size}`, geo);
    return addMesh(metricUV(geo), wallMaterial, position, objects, [
      0,
      rotation,
      0,
    ]);
  }
  function archTrim(position, rotation = 0, radius = 1.35, spring = 2.2) {
    const frame = new THREE.Group();
    frame.position.set(...position);
    frame.rotation.y = rotation;
    objects.add(frame);
    for (const x of [-radius - 0.12, radius + 0.12])
      box([0.23, spring, 0.34], [x, spring / 2, 0], material.trim, frame);
    // Individually jointed voussoirs catch light along the arch's stone edges.
    for (let i = 0; i < 15; i++) {
      const from = (i / 15) * Math.PI + 0.006;
      const to = ((i + 1) / 15) * Math.PI - 0.006;
      const shape = new THREE.Shape();
      shape.absarc(0, spring, radius + 0.23, from, to, false);
      shape.absarc(0, spring, radius, to, from, true);
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.34,
        bevelEnabled: true,
        bevelThickness: 0.006,
        bevelSize: 0.006,
        bevelSegments: 1,
        curveSegments: 4,
      });
      geometries.set(`trim-${geometries.size}`, geo);
      addMesh(metricUV(geo), material.trim, [0, 0, -0.12], frame);
    }
    return frame;
  }

  // Ground, reflecting water, entrance walk, foundations and exterior facade.
  plane([180, 180], [0, -0.38, -16], mat("#a1b2a6", 1), [-Math.PI / 2, 0, 0]);
  plane([100, 92], [0, -0.27, -44], material.water, [-Math.PI / 2, 0, 0]);
  box([21, 0.32, 20], [0, -0.12, -6.2], material.stone);
  plane([18, 18], [0, 0.045, -6.2], floorMaterial, [-Math.PI / 2, 0, 0]);
  box([3.4, 0.18, 12], [0, -0.1, 8], material.stone);
  plane([3.4, 12], [0, 0.005, 8], floorMaterial, [-Math.PI / 2, 0, 0]);
  for (const x of [-1.73, 1.73])
    box([0.045, 0.018, 11.9], [x, 0.022, 8], material.gold);
  wall(
    17.2,
    4.2,
    [0, 0, 0],
    [
      { args: [0] },
      { kind: "rect", args: [-7.4, 1.15, 3.6, 1.85] },
      { kind: "rect", args: [3.8, 1.15, 3.6, 1.85] },
    ],
  );
  archTrim([0, 0, 0.35]);
  for (const x of [-5.6, 5.6]) {
    box([3.58, 1.83, 0.035], [x, 2.075, 0.1], material.glass);
    for (const u of [-1.8, 0, 1.8])
      box([0.055, 1.95, 0.08], [x + u, 2.075, 0.22], material.dark);
    for (const y of [1.1, 3.05])
      box([3.72, 0.06, 0.08], [x, y, 0.22], material.dark);
    for (let i = 0; i < 8; i++)
      box(
        [0.075, 1.8, 0.08],
        [x - 1.55 + i * 0.44, 2.075, -0.05],
        material.oak,
      );
  }
  box([17.7, 0.22, 0.8], [0, 4.2, 0.1], material.trim);
  box([17.3, 0.1, 0.1], [0, 3.97, 0.38], material.teal);
  wall(
    15.6,
    4.15,
    [-8.6, 0, -7.6],
    [
      { kind: "rect", args: [-5.7, 1.1, 3.4, 1.9] },
      { kind: "rect", args: [1.2, 1.1, 3.4, 1.9] },
    ],
    Math.PI / 2,
  );
  wall(
    15.6,
    4.15,
    [8.32, 0, -7.6],
    [
      { kind: "rect", args: [-5.7, 1.1, 3.4, 1.9] },
      { kind: "rect", args: [1.2, 1.1, 3.4, 1.9] },
    ],
    Math.PI / 2,
  );
  wall(17.2, 4.15, [0, 0, -15.4], [{ args: [0] }]);
  archTrim([0, 0, -15.1]);
  // Courtyard-facing walls have two real doorways on each side.
  for (const x of [-2.25, 2]) {
    wall(
      14.4,
      4.05,
      [x, 0, -7.8],
      [{ args: [-3.8] }, { args: [3.8] }],
      Math.PI / 2,
    );
    for (const z of [-4, -11.6])
      archTrim([x + (x > 0 ? -0.06 : 0.34), 0, z], Math.PI / 2);
  }
  for (const x of [-5.25, 5.25]) {
    box([6.25, 4.08, 0.26], [x, 2.04, -7.8], material.stone);
    for (const z of [-3.95, -11.6]) {
      box([6.4, 0.23, 7.7], [x, 4.18, z], material.trim);
      box([6.3, 0.045, 7.5], [x, 4.32, z], material.stone);
      // Teal fascia, small roof parapets, restrained sandstone relief.
      box([6.32, 0.1, 0.14], [x, 4.0, z + 3.82], material.teal);
      plane([6.0, 7.4], [x, 0.06, z], timberFloor, [-Math.PI / 2, 0, 0]);
      box([0.055, 0.055, 7.4], [x > 0 ? 2.3 : -2.3, 0.075, z], material.gold);
    }
    box([0.2, 0.44, 15.5], [x > 0 ? 8.48 : -8.48, 4.52, -7.6], material.trim);
  }
  box([4.35, 0.23, 1.2], [0, 4.18, -0.5], material.trim);
  box([4.35, 0.23, 1.2], [0, 4.18, -14.75], material.trim);
  for (const x of [-1.85, 1.85])
    box([0.1, 0.12, 13.4], [x, 4.02, -7.5], material.gold);
  for (const z of [-1.9, -7.8, -14.2])
    box([3.65, 0.12, 0.1], [0, 4.02, z], material.gold);

  // Deep window reveals, sills and continuous skirting ground the rooms in
  // buildable architecture. The fine lines are joinery, never navigation UI.
  for (const x of [-5.6, 5.6]) {
    box([3.92, 0.09, 0.5], [x, 1.05, 0.12], material.trim);
    box([3.86, 0.11, 0.42], [x, 3.11, 0.08], material.trim);
  }
  for (const x of [-5.25, 5.25]) {
    for (const z of [-0.14, -7.6, -8.0, -15.12])
      box([6.0, 0.13, 0.06], [x, 0.13, z], material.oak);
    for (const z of [-3.9, -11.6]) {
      box([0.06, 0.13, 7.35], [x < 0 ? -8.12 : 8.1, 0.13, z], material.oak);
      // A slim pendant and a warm localized pool of light in each room.
      cylinder(0.012, 0.78, [x, 3.69, z], material.dark);
      cylinder(0.34, 0.14, [x, 3.22, z], material.gold, objects, 0.26);
      cylinder(0.29, 0.018, [x, 3.145, z], material.light);
      const lamp = new THREE.PointLight("#ffe0ae", 9, 7, 2);
      lamp.position.set(x, 3.08, z);
      scene.add(lamp);
      // Ceiling coffers are shallow enough to preserve the 4m room height.
      for (const u of [-1.9, 1.9])
        box([0.07, 0.08, 7.3], [x + u, 4.015, z], material.oak);
    }
  }
  // Soft contact shading survives ambient sky lighting and anchors furniture.
  const contact = canvasTexture(128, 128, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(
      w / 2,
      h / 2,
      5,
      w / 2,
      h / 2,
      w / 2,
    );
    gradient.addColorStop(0, "rgba(20,16,10,.34)");
    gradient.addColorStop(0.6, "rgba(20,16,10,.16)");
    gradient.addColorStop(1, "rgba(20,16,10,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
  const contactMaterial = new THREE.MeshBasicMaterial({
    map: contact,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  materials.add(contactMaterial);
  for (const [x, z, width, depth] of [
    [-6.7, -4, 2.6, 3.1],
    [6.4, -4.15, 2.6, 3.1],
    [6, -11.5, 2.6, 3.1],
    [-6.2, -11.6, 3.5, 3.5],
  ])
    plane([width, depth], [x, 0.065, z], contactMaterial, [-Math.PI / 2, 0, 0]);

  // Two separate arched oak door leaves on real hinges.
  const doors = [];
  for (const side of [-1, 1]) {
    const hinge = new THREE.Group();
    hinge.position.set(side * 1.29, 0.03, 0.18);
    objects.add(hinge);
    const leaf = new THREE.Shape();
    if (side === -1) {
      leaf.moveTo(0, 0);
      leaf.lineTo(1.29, 0);
      leaf.lineTo(1.29, 3.48);
      leaf.absarc(1.29, 2.2, 1.28, Math.PI / 2, Math.PI, false);
      leaf.closePath();
    } else {
      leaf.moveTo(0, 0);
      leaf.lineTo(-1.29, 0);
      leaf.lineTo(-1.29, 3.48);
      leaf.absarc(-1.29, 2.2, 1.28, Math.PI / 2, 0, true);
      leaf.closePath();
    }
    const geo = new THREE.ExtrudeGeometry(leaf, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 1,
      curveSegments: 18,
    });
    geometries.set(`door-${side}`, geo);
    addMesh(metricUV(geo), material.wood, [0, 0, 0], hinge);
    for (let i = 1; i <= 8; i++) {
      const u = i * 0.143;
      const height =
        2.2 + Math.sqrt(Math.max(0, 1.28 ** 2 - (1.29 - u) ** 2)) - 0.07;
      box(
        [0.012, height, 0.016],
        [-side * u, height / 2, 0.132],
        material.oak,
        hinge,
      );
    }
    box([0.035, 0.46, 0.1], [-side * 1.05, 1.45, 0.2], material.gold, hinge);
    doors.push(hinge);
  }

  function foliage(
    position,
    radius = 1,
    count = 90,
    color = material.leaf,
    stretch = 1,
  ) {
    const geo = geometry("olive-leaf", oliveLeafGeometry);
    count = Math.round(count * (mobile() ? 6 : 9));
    const leaves = new THREE.InstancedMesh(geo, color, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2;
      const r = Math.sqrt(random()) * radius;
      dummy.position.set(
        position[0] + Math.cos(angle) * r,
        position[1] + (random() - 0.5) * radius * stretch,
        position[2] + Math.sin(angle) * r,
      );
      const s = 0.085 + random() * 0.07;
      dummy.scale.set(s, s, s);
      leaves.setColorAt(
        i,
        new THREE.Color().setHSL(
          0.22 + random() * 0.055,
          0.12 + random() * 0.12,
          0.68 + random() * 0.22,
        ),
      );
      dummy.rotation.set(random() * 3, random() * 3, random() * 3);
      dummy.updateMatrix();
      leaves.setMatrixAt(i, dummy.matrix);
    }
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    objects.add(leaves);
    return leaves;
  }
  function plant(x, z, scale = 1) {
    cylinder(
      0.33 * scale,
      0.5 * scale,
      [x, 0.25 * scale, z],
      material.stone,
      objects,
      0.42 * scale,
    );
    cylinder(0.37 * scale, 0.035, [x, 0.5 * scale, z], material.earth);
    cylinder(0.035 * scale, 0.8 * scale, [x, 0.88 * scale, z], material.bark);
    foliage([x, 1.25 * scale, z], 0.48 * scale, 50, material.leafDark, 1.2);
  }
  // Olive tree: a real central orientation point, not an interface marker.
  cylinder(1.15, 0.26, [0, 0.17, -7.8], material.trim);
  cylinder(0.98, 0.04, [0, 0.32, -7.8], material.earth);
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.3, -7.8),
    new THREE.Vector3(-0.12, 1.1, -7.76),
    new THREE.Vector3(0.06, 1.8, -7.82),
    new THREE.Vector3(0.12, 2.5, -7.8),
  ]);
  addMesh(
    geometry(
      "olive-trunk",
      () => new THREE.TubeGeometry(trunkCurve, 18, 0.095, 9, false),
    ),
    material.bark,
    [0, 0, 0],
  );
  for (let i = 0; i < 5; i++) {
    const branch = cylinder(
      0.044,
      1.3,
      [Math.sin(i * 1.25) * 0.38, 2.28, -7.8 + Math.cos(i * 1.25) * 0.38],
      material.bark,
    );
    branch.rotation.z = Math.sin(i * 1.25) * 0.45;
    branch.rotation.x = Math.cos(i * 1.25) * 0.45;
  }
  foliage([0, 2.9, -7.8], 1.17, 230, material.leaf, 1.1);
  for (const x of [-10.1, 10.1])
    for (const z of [1.6, -8.8, -15.8]) {
      cylinder(0.14, 2.55, [x, 1.1, z], material.bark, objects, 0.06);
      foliage([x, 2.55, z], 1.25, 150, material.leaf, 1.3);
    }
  for (const x of [-2.3, 2.3]) plant(x, 1.6, 1.1);
  plant(-7.4, -1.3);
  plant(7.4, -1.3);
  plant(-7.4, -14.1);
  plant(7.4, -14.1);
  plant(-1.1, -13.8, 0.7);
  plant(1.1, -13.8, 0.7);
  for (const x of [-2, 2])
    for (const z of [3.8, 9.5]) {
      box([0.16, 0.48, 0.16], [x, 0.24, z], material.dark);
      box([0.13, 0.09, 0.13], [x, 0.48, z], material.light);
    }

  function plaque(
    title,
    lines,
    width,
    height,
    position,
    rotation = 0,
    options = {},
  ) {
    const texture = canvasTexture(1024, 640, (ctx, w, h) => {
      ctx.fillStyle = options.bg || "#ede6d7";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#ad9364";
      ctx.lineWidth = 2;
      ctx.strokeRect(34, 34, w - 68, h - 68);
      ctx.fillStyle = options.ink || "#153a43";
      ctx.textAlign = "center";
      ctx.font = `600 ${options.small ? 49 : 72}px Inter, sans-serif`;
      ctx.fillText(title, w / 2, h * 0.36, w * 0.86);
      ctx.font = "400 32px Inter, sans-serif";
      lines.forEach((line, i) =>
        ctx.fillText(line, w / 2, h * 0.53 + i * 60, w * 0.84),
      );
    });
    const group = new THREE.Group();
    group.position.set(...position);
    group.rotation.y = rotation;
    objects.add(group);
    box([width + 0.1, height + 0.1, 0.08], [0, 0, 0], material.gold, group);
    const faceMat = new THREE.MeshBasicMaterial({ map: texture });
    materials.add(faceMat);
    plane([width, height], [0, 0, 0.047], faceMat, [0, 0, 0], group);
    return group;
  }
  const labelPlates = [];
  for (const [id, x, z] of [
    ["education", -2.25, -4],
    ["experience", 2.25, -4],
    ["projects", 2.25, -11.6],
    ["volunteering", -2.25, -11.6],
  ]) {
    const group = new THREE.Group();
    group.position.set(x, 3.71, z);
    group.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    objects.add(group);
    box([2.05, 0.36, 0.065], [0, 0, 0], material.teal, group);
    const face = new THREE.MeshBasicMaterial({ color: "#ffffff" });
    materials.add(face);
    const mesh = plane([1.98, 0.31], [0, 0, 0.039], face, [0, 0, 0], group);
    labelPlates.push({ id, face: mesh.material });
  }

  // Study: two framed degrees, oak desk, an open book and a reading lamp.
  box([0.07, 3.7, 5.8], [-8.24, 1.95, -3.95], material.teal);
  plaque(
    "NTNU",
    ["B.Sc. Renewable Energy Engineering", "2021"],
    1.8,
    1.16,
    [-8.18, 2.35, -2.7],
    Math.PI / 2,
  );
  plaque(
    "UNIVERSITY OF OSLO",
    ["M.Sc. Renewable Energy Systems", "2026"],
    2.05,
    1.24,
    [-8.18, 2.35, -5.0],
    Math.PI / 2,
    { small: true },
  );
  function desk(x, z, rotate = 0) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotate;
    objects.add(g);
    box([2.45, 0.11, 0.95], [0, 0.91, 0], material.oak, g);
    for (const u of [-1.07, 1.07])
      for (const v of [-0.33, 0.33])
        box([0.055, 0.85, 0.055], [u, 0.43, v], material.dark, g);
    return g;
  }
  const studyDesk = desk(-6.7, -4.0, Math.PI / 2);
  box(
    [0.42, 0.028, 0.31],
    [-0.35, 0.98, 0.1],
    material.trim,
    studyDesk,
    [0, 0, -0.055],
  );
  box(
    [0.42, 0.028, 0.31],
    [0.065, 0.98, 0.1],
    material.linen,
    studyDesk,
    [0, 0, 0.055],
  );
  for (let i = 0; i < 3; i++)
    box(
      [0.42, 0.07, 0.32],
      [0.8, 0.98 + i * 0.075, -0.1],
      material.book[i],
      studyDesk,
    );
  cylinder(0.13, 0.035, [-6.5, 0.99, -4.9], material.gold);
  cylinder(0.018, 0.53, [-6.5, 1.26, -4.9], material.gold);
  cylinder(0.22, 0.18, [-6.5, 1.56, -4.9], material.linen, objects, 0.08);
  function chair(x, z, rotation = 0, color = material.teal) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotation;
    objects.add(g);
    box([0.63, 0.13, 0.63], [0, 0.48, 0], color, g);
    box([0.63, 0.52, 0.1], [0, 0.82, -0.26], color, g);
    for (const u of [-0.23, 0.23])
      for (const v of [-0.23, 0.23])
        box([0.055, 0.45, 0.055], [u, 0.23, v], material.oak, g);
    return g;
  }
  chair(-5.8, -4.0, -Math.PI / 2);
  box([3.0, 2.9, 0.4], [-5.3, 1.5, -7.57], material.wood);
  for (let i = 0; i < 4; i++)
    box([2.9, 0.055, 0.44], [-5.3, 0.28 + i * 0.7, -7.3], material.oak);
  const bookMatrices = material.book.map(
    (m) =>
      new THREE.InstancedMesh(
        geometry("box", () => new THREE.BoxGeometry(1, 1, 1)),
        m,
        14,
      ),
  );
  bookMatrices.forEach((books, index) => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 14; i++) {
      const slot = i * 4 + index;
      dummy.position.set(
        -6.55 + (slot % 14) * 0.18,
        0.52 + Math.floor(slot / 14) * 0.7,
        -7.3,
      );
      dummy.scale.set(0.1 + random() * 0.03, 0.36 + random() * 0.12, 0.27);
      dummy.rotation.z = (random() - 0.5) * 0.09;
      dummy.updateMatrix();
      books.setMatrixAt(i, dummy.matrix);
    }
    books.castShadow = true;
    objects.add(books);
  });

  // Analyst's office. The charts are decorative and contain no claimed data.
  box([0.07, 3.7, 5.8], [8.2, 1.95, -3.95], material.teal);
  plaque(
    "Veyt",
    ["Renewable power markets", "Policy · Data · Analysis"],
    2.7,
    1.45,
    [8.12, 2.58, -4.2],
    -Math.PI / 2,
    { bg: "#164852", ink: "#f2e9d5" },
  );
  const analystDesk = desk(6.4, -4.15, -Math.PI / 2);
  function monitor(parent, x, accent) {
    box([0.86, 0.56, 0.055], [x, 1.4, -0.22], material.dark, parent);
    box([0.085, 0.22, 0.08], [x, 1.075, -0.22], material.dark, parent);
    box([0.32, 0.032, 0.22], [x, 0.99, -0.22], material.dark, parent);
    const texture = canvasTexture(512, 320, (ctx, w, h) => {
      ctx.fillStyle = "#0e2932";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#eceddf";
      ctx.font = "500 20px Inter, sans-serif";
      ctx.fillText("ENERGY MARKETS", 22, 35);
      ctx.strokeStyle = "#29444b";
      ctx.lineWidth = 1;
      for (let y = 70; y < h - 15; y += 45) {
        ctx.beginPath();
        ctx.moveTo(24, y);
        ctx.lineTo(w - 24, y);
        ctx.stroke();
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const x = 26 + i * 29;
        const y = 240 - i * 7 + Math.sin(i * 1.12) * 29;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    });
    const m = new THREE.MeshBasicMaterial({ map: texture });
    materials.add(m);
    plane([0.8, 0.5], [x, 1.4, -0.183], m, [0, 0, 0], parent);
  }
  monitor(analystDesk, -0.5, "#e4bd6b");
  monitor(analystDesk, 0.5, "#83c4b9");
  box([0.6, 0.025, 0.2], [0, 0.99, 0.19], material.dark, analystDesk);
  cylinder(0.07, 0.12, [6.05, 1.04, -3.13], material.trim);
  chair(5.5, -4.1, Math.PI / 2);
  box([2.1, 0.78, 0.48], [5.3, 0.4, -7.55], material.oak);
  plaque(
    "RENEWABLE ENERGY",
    ["Europe ↔ MENA"],
    2.4,
    1.2,
    [5.2, 2.2, -7.43],
    0,
    { small: true },
  );

  // Project studio: two distinct physical displays, an island table and panels.
  box([0.07, 3.7, 6.6], [8.2, 1.95, -11.8], material.teal);
  plaque(
    "SYRIAN RENEWABLES",
    ["Energy data & intelligence", "syrianrenewables.com"],
    2.5,
    1.6,
    [8.12, 2.15, -10.2],
    -Math.PI / 2,
    { small: true, bg: "#e8eee6" },
  );
  plaque(
    "GRANULAR CERTIFICATES",
    ["Certificate market intelligence", "granularcertificates.com"],
    2.5,
    1.6,
    [8.12, 2.15, -13.1],
    -Math.PI / 2,
    { small: true },
  );
  const projectTable = desk(6.0, -11.5, -Math.PI / 2);
  box([0.85, 0.05, 0.55], [0, 1.0, 0], material.teal, projectTable);
  for (let i = 0; i < 5; i++)
    box(
      [0.055, 0.012, 0.51],
      [-0.3 + i * 0.15, 1.036, 0],
      material.gold,
      projectTable,
    );
  box([2.5, 0.1, 0.38], [5.5, 0.45, -14.9], material.oak);
  for (const x of [4.5, 6.5])
    box([0.12, 0.4, 0.26], [x, 0.2, -14.9], material.dark);
  // A small sculptural turbine in the studio, scaled like a desk model.
  cylinder(0.11, 0.055, [5.5, 0.58, -14.9], material.dark);
  cylinder(0.018, 0.75, [5.5, 0.98, -14.9], material.trim);
  const rotor = new THREE.Group();
  rotor.position.set(5.5, 1.37, -14.9);
  objects.add(rotor);
  for (let i = 0; i < 3; i++) {
    const blade = new THREE.Group();
    blade.rotation.z = (i * Math.PI * 2) / 3;
    rotor.add(blade);
    box(
      [0.045, 0.4, 0.018],
      [0.01, 0.22, 0],
      material.trim,
      blade,
      [0, 0, -0.08],
    );
  }

  // Community room: a shared table, four seats and a community wall.
  box([0.07, 3.7, 6.6], [-8.24, 1.95, -11.8], material.teal);
  plaque(
    "Norway Now",
    ["Community · Information · Belonging"],
    3.5,
    1.55,
    [-8.17, 2.28, -11.7],
    Math.PI / 2,
  );
  cylinder(0.9, 0.1, [-6.2, 0.83, -11.6], material.oak);
  cylinder(0.14, 0.76, [-6.2, 0.39, -11.6], material.dark);
  cylinder(0.46, 0.055, [-6.2, 0.08, -11.6], material.dark);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    chair(
      -6.2 + Math.sin(angle) * 1.25,
      -11.6 + Math.cos(angle) * 1.25,
      angle + Math.PI,
      i % 2 ? material.linen : material.teal,
    );
  }
  cylinder(0.12, 0.22, [-6.2, 1, -11.6], material.trim);
  foliage([-6.2, 1.2, -11.6], 0.24, 22, material.leafDark);
  plaque(
    "Radio Mangfold Norge",
    ["Community media"],
    2.8,
    0.85,
    [-5.4, 2.45, -15.05],
    0,
    { small: true },
  );
  plant(-3.1, -14.5, 0.8);

  // Warm entry sconces and a quiet back terrace.
  for (const x of [-1.85, 1.85]) {
    box([0.13, 0.58, 0.14], [x, 2.05, 0.49], material.gold);
    box([0.075, 0.42, 0.075], [x, 2.05, 0.58], material.light);
  }
  box([6.0, 0.16, 4], [0, -0.08, -17.4], material.stone);
  plane([5.8, 3.8], [0, 0.013, -17.4], floorMaterial, [-Math.PI / 2, 0, 0]);
  for (const x of [-2.8, 2.8])
    box([0.1, 0.8, 3.7], [x, 0.42, -17.4], material.glass);
  const sun = new THREE.DirectionalLight("#fff0d9", 2.65);
  sun.position.set(7, 17, 10);
  sun.target.position.set(0, 0, -7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile() ? 1024 : 2048, mobile() ? 1024 : 2048);
  Object.assign(sun.shadow.camera, {
    left: -24,
    right: 24,
    top: 23,
    bottom: -23,
    near: 1,
    far: 65,
  });
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.025;
  scene.add(sun, sun.target);
  const hemisphere = new THREE.HemisphereLight("#cce0ed", "#b29a7d", 0.75);
  scene.add(hemisphere);
  const envGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  let environment = envGenerator.fromScene(roomEnvironment, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.6;
  roomEnvironment.dispose();
  envGenerator.dispose();

  let visible = true;
  let frame = 0;
  let previousTime = 0;
  let currentProgress = 0;
  let targetProgress = 0;
  let doorAngle = 0;
  let lookX = 0;
  let lookY = 0;
  let nextLookX = 0;
  let nextLookY = 0;
  const target = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  function wake() {
    if (!disposed && visible && !document.hidden && !frame)
      frame = requestAnimationFrame(render);
  }
  function render(time) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min(
      0.05,
      previousTime ? (time - previousTime) / 1000 : 0.016,
    );
    previousTime = time;
    const blend = 1 - Math.exp(-dt * 11);
    currentProgress += (targetProgress - currentProgress) * blend;
    if (Math.abs(targetProgress - currentProgress) < 0.00006)
      currentProgress = targetProgress;
    lookX += (nextLookX - lookX) * blend;
    lookY += (nextLookY - lookY) * blend;
    const pose = cameraForAspect(currentProgress, camera.aspect);
    camera.position.set(...pose.position);
    target.set(...pose.target);
    direction.subVectors(target, camera.position).normalize();
    right.crossVectors(direction, up).normalize();
    target.addScaledVector(right, lookX * (currentProgress < 0.18 ? 0.8 : 1.3));
    target.y += lookY * 0.35;
    camera.lookAt(target);
    const fov = pose.fov;
    if (Math.abs(camera.fov - fov) > 0.005) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    const opening =
      THREE.MathUtils.smoothstep(currentProgress, 0.07, 0.155) * Math.PI * 0.53;
    const previousDoorAngle = doorAngle;
    doorAngle += (opening - doorAngle) * (1 - Math.exp(-dt * 14));
    doors[0].rotation.y = doorAngle;
    doors[1].rotation.y = -doorAngle;
    if (Math.abs(previousDoorAngle - doorAngle) > 0.0001)
      renderer.shadowMap.needsUpdate = true;
    renderer.render(scene, camera);
    if (
      Math.abs(targetProgress - currentProgress) > 0.00006 ||
      Math.abs(opening - doorAngle) > 0.001 ||
      Math.abs(nextLookX - lookX) + Math.abs(nextLookY - lookY) > 0.001
    )
      wake();
  }
  function setProgress(value, immediate = false) {
    targetProgress = clampProgress(value);
    if (immediate) currentProgress = targetProgress;
    // Clear a previous look offset while moving between chapters.
    if (Math.abs(targetProgress - currentProgress) > 0.005)
      nextLookX = nextLookY = 0;
    wake();
  }
  function resize() {
    const width = mount.clientWidth,
      height = mount.clientHeight;
    if (width < 1 || height < 1) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, mobile() ? 1.35 : 1.65),
    );
    renderer.setSize(width, height, false);
    wake();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(mount);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      previousTime = 0;
      wake();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  visibility.observe(mount);
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      previousTime = 0;
      wake();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  const contextLost = (event) => {
    event.preventDefault();
    onUnavailable();
    cancelAnimationFrame(frame);
    frame = 0;
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);

  let pointer = null;
  const pointerDown = (event) => {
    if (event.button !== 0) return;
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: nextLookX,
      startY: nextLookY,
      type: event.pointerType,
    };
  };
  const pointerMove = (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x,
      dy = event.clientY - pointer.y;
    if (
      pointer.type === "touch" &&
      (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.3)
    )
      return;
    if (pointer.type !== "touch")
      renderer.domElement.setPointerCapture?.(event.pointerId);
    nextLookX = THREE.MathUtils.clamp(
      pointer.startX - dx / Math.max(180, mount.clientWidth * 0.4),
      -1,
      1,
    );
    nextLookY =
      pointer.type === "touch"
        ? 0
        : THREE.MathUtils.clamp(pointer.startY + dy / 500, -0.5, 0.5);
    mount.dataset.dragging = "true";
    wake();
  };
  const pointerEnd = (event) => {
    if (pointer?.id !== event.pointerId) return;
    pointer = null;
    mount.dataset.dragging = "false";
  };
  const canvas = renderer.domElement;
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove, { passive: true });
  canvas.addEventListener("pointerup", pointerEnd);
  canvas.addEventListener("pointercancel", pointerEnd);
  canvas.addEventListener("lostpointercapture", pointerEnd);

  function setTheme(next) {
    const dark = next === "dark";
    if (!scene.background?.isTexture)
      scene.background = new THREE.Color(dark ? "#60757a" : "#dce8e6");
    scene.backgroundIntensity = dark ? 0.38 : 0.85;
    scene.environmentIntensity = dark ? 0.35 : 0.6;
    scene.fog = new THREE.Fog(dark ? "#60757a" : "#dce8e6", 44, 110);
    sun.intensity = dark ? 0.6 : 2.65;
    hemisphere.intensity = dark ? 0.35 : 0.75;
    renderer.toneMappingExposure = dark ? 0.85 : 1.0;
    renderer.shadowMap.needsUpdate = true;
    wake();
  }
  function setLabels(next) {
    for (const plate of labelPlates) {
      const old = plate.face.map;
      const text = next[plate.id];
      const arabic = /[\u0600-\u06ff]/.test(text);
      const texture = canvasTexture(1024, 180, (ctx, w, h) => {
        ctx.fillStyle = "#164852";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#f3eadb";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.direction = arabic ? "rtl" : "ltr";
        ctx.font = `600 70px ${arabic ? '"IBM Plex Sans Arabic"' : "Inter"}, sans-serif`;
        ctx.fillText(text, w / 2, h / 2, w - 50);
      });
      plate.face.map = texture;
      plate.face.needsUpdate = true;
      if (old) {
        old.dispose();
        textures.delete(old);
      }
    }
    wake();
  }
  batchArchitecture(objects, doors, (geo) =>
    geometries.set(`batch-${geometries.size}`, geo),
  );
  setTheme(theme);
  setLabels(labels);
  resize();
  const surfaces = loadHouseSurfaces({
    renderer,
    scene,
    textures,
    materials: {
      plaster: [material.stone, material.pale],
      oak: [material.wood, material.oak, timberFloor],
    },
    isDisposed: () => disposed,
    wake,
    onEnvironment: (next) => {
      environment.dispose();
      environment = next;
    },
  });
  // Avoid a permanent loading screen on unreliable connections. Late images
  // still enhance the model, and disposed scenes never accept a late upload.
  let loadDeadline;
  const ready = Promise.race([
    surfaces,
    new Promise((resolve) => {
      loadDeadline = setTimeout(resolve, 5000);
    }),
  ]).finally(() => clearTimeout(loadDeadline));
  return {
    ready,
    setProgress,
    setTheme,
    setLabels,
    dispose() {
      if (disposed) return;
      disposed = true;
      clearTimeout(loadDeadline);
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerEnd);
      canvas.removeEventListener("pointercancel", pointerEnd);
      canvas.removeEventListener("lostpointercapture", pointerEnd);
      geometries.forEach((geo) => geo.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((texture) => texture.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
