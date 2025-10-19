import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const GeometricParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const numParticles = 5000;
    const positions = new Float32Array(numParticles * 3);
    const numRays = 50;
    const particlesPerRay = numParticles / numRays;

    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      for (let j = 0; j < particlesPerRay; j++) {
        const radius = j / particlesPerRay * 1.5;
        const index = (i * particlesPerRay + j) * 3;
        positions[index] = Math.cos(angle) * radius;
        positions[index + 1] = Math.sin(angle) * radius;
        positions[index + 2] = (Math.random() - 0.5) * 0.1; // Add some depth
      }
    }
    return positions;
  });
  const originalPositions = useMemo(() => particles.slice(), [particles]);

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();

    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        // Shimmer effect
        const shimmer = Math.sin(time * 0.5 + x * 2) * 0.05;
        positions[i + 2] = originalPositions[i + 2] + shimmer;

        // Mouse warp effect
        const distance = Math.sqrt(Math.pow(pointer.x * 2 - x, 2) + Math.pow(pointer.y * 2 - y, 2));
        const warpFactor = Math.max(0, 1 - distance / 2) * 0.2;
        positions[i + 2] += warpFactor;
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.z += delta / 20; // Rotate around Z for a 2D effect
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff" // Secondary Accent
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
};

const GenerativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-background">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <GeometricParticles />
      </Canvas>
    </div>
  );
};

export default GenerativeBackground;