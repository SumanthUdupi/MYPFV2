import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import NebulaCore from './NebulaCore';
import StardustField from './StardustField';
import InteractionOrchestrator from './InteractionOrchestrator';
import ConstellationWeb from './ConstellationWeb';
import CursorTrail from './CursorTrail';

const NebulaPotential: React.FC = () => {
  const [mousePos, setMousePos] = useState(new THREE.Vector2());

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10 pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <NebulaCore mousePos={mousePos} />
          <StardustField mousePos={mousePos} />
          <InteractionOrchestrator onMouseMove={setMousePos} />
          <ConstellationWeb mousePos={mousePos} />
          <CursorTrail mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default NebulaPotential;
