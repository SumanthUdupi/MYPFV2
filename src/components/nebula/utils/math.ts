// normalizeCursor removed
// Utility for normalizing client coordinates to [-1,1] was used by cursor features.
// Left as a stub in case it's needed later.

export function normalizeCursor() {
  throw new Error('normalizeCursor has been removed as part of cursor cleanup');
}

export function falloffQuadratic(r: number, R: number) {
  if (r >= R) return 0;
  const t = 1 - r / R;
  return t * t;
}
