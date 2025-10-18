import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
  const ref = useRef<THREE.Points>(null!);

  const [particles] = useState(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const random = () => (Math.random() - 0.5) * 30;
    for (let i = 0; i < count * 3; i++) {
      positions[i] = random();
    }
    return positions;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 25;
    ref.current.rotation.y += delta / 30;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C5A35C"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default StarryBackground;