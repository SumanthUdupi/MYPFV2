/* eslint-disable */
/* eslint-disable */
import { useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './nebula.css';

export interface ConstellationWebProps {
  positions?: Array<[number, number, number]>;
  mouse: RefObject<THREE.Vector2> | null;
}

export default function ConstellationWeb({ positions = [], mouse }: ConstellationWebProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const connections = useMemo(() => {
    const conns: Array<[number, number]> = [];
    const n = positions.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.random() > 0.995) conns.push([i, j]);
      }
    }
    return conns.slice(0, 40);
  }, [positions]);

  useFrame(() => {
    if (!groupRef.current || !mouse) return;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    groupRef.current.children.forEach((child) => {
      const mat = ((child as unknown) as { material?: any }).material;
      if (mat && typeof mat.opacity === 'number') mat.opacity = 0.12 + Math.abs(mx) * 0.04 + Math.abs(my) * 0.04;
    });
  });

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], idx) => {
        const pA = positions[a];
        const pB = positions[b];
        if (!pA || !pB) return null;
        return (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[new Float32Array([...pA, ...pB]), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={0xA48642} transparent opacity={0.12} linewidth={1} />
          </line>
        );
      })}
    </group>
  );
}
