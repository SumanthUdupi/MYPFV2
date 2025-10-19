// components/canvas/ConstellationWeb.jsx
import { useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

export default function ConstellationWeb() {
  const { scene } = useThree();
  const linesRef = useRef([]);

  const connections = useMemo(() => {
    const heroStars = scene.userData.heroStars || [];
    if (heroStars.length < 2) return [];

    const result = [];
    // Simple connection logic: connect each star to the next one, and wrap around
    for (let i = 0; i < heroStars.length; i++) {
      result.push({
        start: heroStars[i],
        end: heroStars[(i + 1) % heroStars.length],
      });
    }
    return result;
  }, [scene.userData.heroStars]);

  // Register line materials for interaction
  useLayoutEffect(() => {
    scene.userData.constellationLines = linesRef.current;
  }, [scene.userData.heroStars, scene]);

  return (
    <group>
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color="#C4A662"
          lineWidth={1}
          transparent
          opacity={0.2}
          ref={el => linesRef.current[i] = el}
        />
      ))}
    </group>
  );
}