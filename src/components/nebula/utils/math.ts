export function normalizeCursor(clientX: number, clientY: number, width: number, height: number) {
  const nx = (clientX / width) * 2 - 1;
  const ny = -((clientY / height) * 2 - 1);
  return { x: nx, y: ny };
}

export function falloffQuadratic(r: number, R: number) {
  if (r >= R) return 0;
  const t = 1 - r / R;
  return t * t;
}
