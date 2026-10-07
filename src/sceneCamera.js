export const initialCamera = { scale: 1, x: 0, y: 0, pitch: 0, yaw: 0 };
export const cameraLimits = { min: 1, max: 3, pitch: 8, yaw: 10 };

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function constrainCamera(view, size) {
  const scale = clamp(view.scale, cameraLimits.min, cameraLimits.max);
  const maxX = Math.max(0, (size.worldWidth * scale - size.width) / 2);
  const maxY = Math.max(0, (size.worldHeight * scale - size.height) / 2);
  return {
    scale,
    x: clamp(view.x, -maxX, maxX),
    y: clamp(view.y, -maxY, maxY),
    pitch: clamp(view.pitch, -cameraLimits.pitch, cameraLimits.pitch),
    yaw: clamp(view.yaw, -cameraLimits.yaw, cameraLimits.yaw),
  };
}

// Keep the image point under the pointer fixed while changing the zoom.
export function zoomCamera(view, scale, point, size) {
  const nextScale = clamp(scale, cameraLimits.min, cameraLimits.max);
  const ratio = nextScale / view.scale;
  return constrainCamera(
    {
      ...view,
      scale: nextScale,
      x: point.x - (point.x - view.x) * ratio,
      y: point.y - (point.y - view.y) * ratio,
    },
    size,
  );
}

export function focusCamera(position, size) {
  const scale = 2.2;
  return constrainCamera(
    {
      ...initialCamera,
      scale,
      x: -(position.x / 100 - 0.5) * size.worldWidth * scale,
      y: -(position.y / 100 - 0.5) * size.worldHeight * scale,
    },
    size,
  );
}

export function pinchCamera(view, start, current, size) {
  const midpoint = (points) => ({
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2,
  });
  const distance = (points) =>
    Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  const origin = midpoint(start);
  const next = midpoint(current);
  const zoomed = zoomCamera(
    view,
    view.scale * (distance(current) / Math.max(1, distance(start))),
    origin,
    size,
  );
  return constrainCamera(
    {
      ...zoomed,
      x: zoomed.x + next.x - origin.x,
      y: zoomed.y + next.y - origin.y,
    },
    size,
  );
}
