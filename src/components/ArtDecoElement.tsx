import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

const ArtDecoElement: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      // Slow rotation
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;

      // Mouse interaction
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      ref.current.rotation.y += mouseX * 0.01;
      ref.current.rotation.x -= mouseY * 0.01;
    }
  });

  return (
    <TorusKnot ref={ref} args={[1, 0.1, 100, 16]} scale={1.5}>
      <meshStandardMaterial color="#C5A35C" metalness={0.8} roughness={0.2} />
    </TorusKnot>
  );
};

export default ArtDecoElement;
