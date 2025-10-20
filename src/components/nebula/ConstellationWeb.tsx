import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import vertexShader from './shaders/constellation.vert?raw';
import fragmentShader from './shaders/constellation.frag?raw';

const ConstellationWeb: React.FC<{ mousePos: THREE.Vector2 }> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const heroStars = 12;
    const points = Array.from({ length: heroStars }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ));

    const connections = [];
    for (let i = 0; i < heroStars; i++) {
      for (let j = i + 1; j < heroStars; j++) {
        if (Math.random() > 0.9) {
          connections.push([points[i], points[j]]);
        }
      }
    }
    return connections;
  }, []);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_opacity: { value: 0.2 },
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          const line = child;
          const position = line.geometry.attributes.position;
          if (position && position.count === 2) {
            const start = new THREE.Vector3().fromBufferAttribute(position, 0);
            const end = new THREE.Vector3().fromBufferAttribute(position, 1);
            const closestPoint = new THREE.Line3(start, end).closestPointToPoint(new THREE.Vector3(mousePos.x * 10, mousePos.y * 10, 0), true, new THREE.Vector3());
            const distance = closestPoint.distanceTo(new THREE.Vector3(mousePos.x * 10, mousePos.y * 10, 0));

            (line.material as THREE.ShaderMaterial).uniforms.u_opacity.value = distance < 2 ? 0.6 : 0.2;
            (line.material as THREE.ShaderMaterial).uniforms.u_time.value = state.clock.getElapsedTime();
          }
        }
      });
    }
  });


  return (
    <group ref={groupRef}>
      {lines.map((points, index) => (
        <line key={index}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => p.toArray())), 3]}
            />
          </bufferGeometry>
          <shaderMaterial
            attach="material"
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
          />
        </line>
      ))}
    </group>
  );
};

export default ConstellationWeb;
