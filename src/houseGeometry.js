import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// UV coordinates are metres, so the same grain keeps its scale on a desk,
// wall and door instead of stretching one texture across each object.
export function metricUV(geometry) {
  const p = geometry.attributes.position;
  const n = geometry.attributes.normal;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const nx = Math.abs(n.getX(i));
    const ny = Math.abs(n.getY(i));
    const nz = Math.abs(n.getZ(i));
    if (ny >= nx && ny >= nz) uv.setXY(i, p.getX(i), p.getZ(i));
    else if (nx >= nz) uv.setXY(i, p.getZ(i), p.getY(i));
    else uv.setXY(i, p.getX(i), p.getY(i));
  }
  uv.needsUpdate = true;
  return geometry;
}

export function architecturalBox(size) {
  const radius = Math.min(0.014, Math.min(...size) * 0.2);
  return metricUV(new RoundedBoxGeometry(...size, 1, radius));
}

export function oliveLeafGeometry() {
  // A narrow, pointed olive leaf with a raised midrib and curled edges.
  const vertices = [];
  const uvs = [];
  const indices = [];
  const rows = 8;
  for (let row = 0; row <= rows; row++) {
    const t = row / rows;
    const width = Math.max(0.003, Math.sin(Math.PI * t) * 0.17);
    for (const side of [-1, 0, 1]) {
      vertices.push(
        side * width,
        t - 0.5,
        Math.sin(Math.PI * t) * (side ? 0.005 : 0.055),
      );
      uvs.push((side + 1) / 2, t);
    }
    if (row < rows) {
      const start = row * 3;
      for (let col = 0; col < 2; col++) {
        const a = start + col;
        indices.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// Keep the hinged doors separate. Batch static opaque surfaces by material to
// make richer architectural detail affordable without hundreds of draw calls.
export function batchArchitecture(root, dynamicRoots, registerGeometry) {
  root.updateMatrixWorld(true);
  const inverseRoot = root.matrixWorld.clone().invert();
  const batches = new Map();
  root.traverse((mesh) => {
    if (!mesh.isMesh || mesh.isInstancedMesh || mesh.material.transparent)
      return;
    for (let p = mesh; p && p !== root; p = p.parent)
      if (dynamicRoots.includes(p)) return;
    const key = `${mesh.material.uuid}/${mesh.castShadow}/${mesh.receiveShadow}`;
    if (!batches.has(key)) batches.set(key, []);
    batches.get(key).push(mesh);
  });
  for (const meshes of batches.values()) {
    if (meshes.length < 2) continue;
    const transformed = meshes.map((mesh) => {
      const geo = mesh.geometry.index
        ? mesh.geometry.toNonIndexed()
        : mesh.geometry.clone();
      geo.applyMatrix4(inverseRoot.clone().multiply(mesh.matrixWorld));
      // All our architectural meshes share these three attributes.
      for (const key of Object.keys(geo.attributes))
        if (!["position", "normal", "uv"].includes(key))
          geo.deleteAttribute(key);
      geo.clearGroups();
      return geo;
    });
    const merged = mergeGeometries(transformed);
    transformed.forEach((geo) => geo.dispose());
    if (!merged) continue;
    registerGeometry(merged);
    const combined = new THREE.Mesh(merged, meshes[0].material);
    combined.castShadow = meshes[0].castShadow;
    combined.receiveShadow = meshes[0].receiveShadow;
    meshes.forEach((mesh) => mesh.removeFromParent());
    root.add(combined);
  }
}
