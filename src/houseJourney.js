// A continuous route through one house. Positions and look targets share the
// same world coordinates as houseScene.js; the camera never teleports rooms.
export const tourRooms = [
  "education",
  "experience",
  "projects",
  "volunteering",
];

export const tourStops = {
  entrance: 0,
  education: 0.32,
  experience: 0.51,
  projects: 0.71,
  volunteering: 0.88,
  terrace: 1,
};

export const cameraRoute = [
  [0, [10.5, 5.1, 18.5], [0, 1.8, -2.8], 46],
  [0.075, [3.5, 2.8, 12.8], [0, 1.8, -1.8], 50],
  [0.14, [0, 1.78, 7], [0, 1.75, -3.2], 56],
  [0.205, [0, 1.7, -0.8], [0, 1.75, -6], 62],
  [0.24, [0, 1.7, -3.8], [-6, 1.8, -4.5], 62],
  [0.3, [-4.1, 1.7, -3.8], [-7.8, 1.8, -4.6], 62],
  [0.37, [-4.1, 1.7, -3.8], [-7.8, 1.8, -4.6], 62],
  [0.425, [0, 1.7, -3.8], [6, 1.8, -4.5], 62],
  [0.485, [4.1, 1.7, -3.8], [7.8, 1.8, -4.6], 62],
  [0.55, [4.1, 1.7, -3.8], [7.8, 1.8, -4.6], 62],
  [0.59, [0, 1.7, -5], [0, 1.7, -11], 62],
  [0.607, [1.5, 1.7, -6.6], [1.5, 1.7, -11], 62],
  [0.623, [1.5, 1.7, -9.5], [3.5, 1.8, -11.5], 62],
  [0.635, [0, 1.7, -10.8], [6, 1.8, -11.5], 62],
  [0.69, [4.1, 1.7, -10.8], [7.8, 1.85, -11.5], 62],
  [0.75, [4.1, 1.7, -10.8], [7.8, 1.85, -11.5], 62],
  [0.8, [0, 1.7, -10.8], [-6, 1.8, -11.5], 62],
  [0.86, [-4.1, 1.7, -10.8], [-7.8, 1.85, -11.5], 62],
  [0.92, [-4.1, 1.7, -10.8], [-7.8, 1.85, -11.5], 62],
  [0.96, [0, 1.7, -11.5], [0, 1.8, -22], 62],
  [1, [0, 1.7, -14.6], [0, 1.65, -28], 62],
];

export const clampProgress = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => value * value * (3 - 2 * value);

export function cameraAtProgress(progress) {
  const p = clampProgress(progress);
  const i = Math.max(0, cameraRoute.findIndex((frame) => frame[0] >= p) - 1);
  const a = cameraRoute[i];
  const b = cameraRoute[Math.min(i + 1, cameraRoute.length - 1)];
  const t = smooth(clampProgress((p - a[0]) / (b[0] - a[0])));
  const lerp = (start, end) => start + (end - start) * t;
  const position = a[1].map((value, axis) => lerp(value, b[1][axis]));
  const view = (frame) => {
    const [x, y, z] = frame[2].map((v, axis) => v - frame[1][axis]);
    return {
      yaw: Math.atan2(x, -z),
      pitch: Math.atan2(y, Math.hypot(x, z)),
      distance: Math.hypot(x, y, z),
    };
  };
  const va = view(a),
    vb = view(b);
  // Interpolating look-at points can pull the target through the camera while
  // crossing the courtyard, producing a sharp spin. Interpolate angles along
  // the shortest arc while keeping the gaze a comfortable distance ahead.
  const deltaYaw = Math.atan2(
    Math.sin(vb.yaw - va.yaw),
    Math.cos(vb.yaw - va.yaw),
  );
  const yaw = va.yaw + deltaYaw * t;
  const pitch = lerp(va.pitch, vb.pitch);
  const distance = lerp(va.distance, vb.distance);
  const direction = [
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    -Math.cos(yaw) * Math.cos(pitch),
  ];
  return {
    position,
    target: position.map((value, axis) => value + direction[axis] * distance),
    fov: lerp(a[3], b[3]),
  };
}

export function cameraForAspect(progress, aspect) {
  const pose = cameraAtProgress(progress);
  if (aspect < 0.95 && progress < 0.18) {
    const entrance = 1 - smooth(clampProgress(progress / 0.18));
    const fit = 1 + (Math.max(1, 0.96 / Math.max(0.2, aspect)) - 1) * entrance;
    pose.position = pose.position.map(
      (value, axis) => pose.target[axis] + (value - pose.target[axis]) * fit,
    );
    pose.position[1] += 3 * entrance;
    pose.fov += 11 + 4 * entrance;
  } else if (aspect < 0.95) {
    pose.fov += 11;
  }
  return pose;
}

export function chapterAtProgress(progress) {
  if (progress < 0.215) return "entrance";
  if (progress < 0.4) return "education";
  if (progress < 0.615) return "experience";
  if (progress < 0.785) return "projects";
  if (progress < 0.95) return "volunteering";
  return "terrace";
}

// Use the actual sticky-stage height, rather than window height. This also
// handles the browser's mobile toolbars and a resized/translatable header.
export function progressFromScroll(
  scrollY,
  sectionTop,
  sectionHeight,
  stageHeight,
) {
  const distance = Math.max(1, sectionHeight - stageHeight);
  return clampProgress((scrollY - sectionTop) / distance);
}
