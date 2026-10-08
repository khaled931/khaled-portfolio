import * as THREE from "three";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import plasterColor from "./assets/house/plaster-color.webp?url";
import plasterNormal from "./assets/house/plaster-normal.webp?url";
import plasterRoughness from "./assets/house/plaster-roughness.webp?url";
import oakColor from "./assets/house/oak-color.webp?url";
import oakNormal from "./assets/house/oak-normal.webp?url";
import oakRoughness from "./assets/house/oak-roughness.webp?url";
import daylight from "./assets/house/daylight.hdr?url";

// Locally hosted CC0 captures; provenance lives beside the assets. No runtime
// third-party requests. Loading failures retain the modeled material fallback.
export function loadHouseSurfaces({
  renderer,
  materials,
  textures,
  scene,
  isDisposed,
  wake,
  onEnvironment,
}) {
  const loader = new THREE.TextureLoader();
  const load = async (url, color, scale) => {
    const texture = await loader.loadAsync(url);
    if (isDisposed()) {
      texture.dispose();
      return null;
    }
    texture.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.setScalar(scale);
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(texture);
    return texture;
  };
  const surface = async (urls, targets, scale, normalStrength, tint) => {
    const maps = await Promise.allSettled(
      urls.map((url, i) => load(url, i === 0, scale)),
    );
    if (isDisposed()) return;
    for (const material of targets) {
      for (const [i, key] of ["map", "normalMap", "roughnessMap"].entries()) {
        if (maps[i].status === "fulfilled" && maps[i].value)
          material[key] = maps[i].value;
      }
      if (maps[0].status === "fulfilled" && maps[0].value && tint)
        material.color.set(tint);
      material.normalScale.setScalar(normalStrength);
      material.needsUpdate = true;
    }
    wake();
  };
  const sky = async () => {
    const hdr = await new HDRLoader().loadAsync(daylight);
    if (isDisposed()) {
      hdr.dispose();
      return;
    }
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    const generator = new THREE.PMREMGenerator(renderer);
    const environment = generator.fromEquirectangular(hdr);
    generator.dispose();
    textures.add(hdr);
    scene.environment = environment.texture;
    scene.background = hdr;
    scene.backgroundBlurriness = 0.025;
    scene.environmentRotation.y = scene.backgroundRotation.y = 0.65;
    onEnvironment(environment);
    wake();
  };
  return Promise.allSettled([
    surface(
      [plasterColor, plasterNormal, plasterRoughness],
      materials.plaster,
      0.5,
      0.22,
      "#f5ecd9",
    ),
    surface(
      [oakColor, oakNormal, oakRoughness],
      materials.oak,
      1 / 1.7,
      0.32,
      "#ffffff",
    ),
    sky(),
  ]);
}
