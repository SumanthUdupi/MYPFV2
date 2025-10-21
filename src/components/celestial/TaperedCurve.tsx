
import { useMemo } from 'react';
import * as THREE from 'three';

function TaperedCurveGeometry(points: THREE.Vector3[], width: number) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(points.length * 2 * 3);
  const uvs = new Float32Array(points.length * 2 * 2);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const i2 = i * 2;

    const direction = (i < points.length - 1) ? points[i + 1].clone().sub(p).normalize() : points[i - 1].clone().sub(p).normalize().negate();
    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).multiplyScalar(width * (1 - i / points.length));

    vertices[i2 * 3] = p.x + perpendicular.x;
    vertices[i2 * 3 + 1] = p.y + perpendicular.y;
    vertices[i2 * 3 + 2] = p.z;

    vertices[(i2 + 1) * 3] = p.x - perpendicular.x;
    vertices[(i2 + 1) * 3 + 1] = p.y - perpendicular.y;
    vertices[(i2 + 1) * 3 + 2] = p.z;

    uvs[i2 * 2] = i / (points.length - 1);
    uvs[i2 * 2 + 1] = 0;

    uvs[(i2 + 1) * 2] = i / (points.length - 1);
    uvs[(i2 + 1) * 2 + 1] = 1;
  }

  const indices = [];
  for (let i = 0; i < points.length - 1; i++) {
    const i2 = i * 2;
    indices.push(i2, i2 + 1, i2 + 2);
    indices.push(i2 + 2, i2 + 1, i2 + 3);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return geometry;
}

export function TaperedCurve({ points, color, width, opacity }: { points: THREE.Vector3[], color: string, width: number, opacity: number }) {
  const geometry = useMemo(() => TaperedCurveGeometry(points, width), [points, width]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={opacity} />
    </mesh>
  );
}
