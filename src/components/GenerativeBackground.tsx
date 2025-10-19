import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error: maath/random has no type definitions
import * as random from 'maath/random/dist/maath-random.esm';

const Starfield: React.FC<React.ComponentProps<typeof Points>> = (props) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      // Make particles react to mouse
      const { pointer } = state;
      ref.current.rotation.y += pointer.x * 0.01;
      ref.current.rotation.x += pointer.y * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#D4AF37" // Antique Gold
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const GenerativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Starfield />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GenerativeBackground;