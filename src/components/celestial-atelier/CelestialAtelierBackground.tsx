
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ArtNouveauNebula from './ArtNouveauNebula';
import CelestialStardustField from './CelestialStardustField';
import OrnamentalCurveNetwork from './OrnamentalCurveNetwork';
import InteractionOrchestrator from './InteractionOrchestrator';
import useMedia from '../../hooks/useMedia';
import * as THREE from 'three';

const CelestialAtelierBackground = () => {
  const nebulaMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { isMobile, reduceMotion } = useMedia();

  const particleCount = isMobile ? 1000 : 3500;
  const curveCount = isMobile ? 4 : 10;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ArtNouveauNebula ref={nebulaMaterialRef} isMobile={isMobile} reduceMotion={reduceMotion} />
          <CelestialStardustField count={particleCount} reduceMotion={reduceMotion} />
          <OrnamentalCurveNetwork count={curveCount} reduceMotion={reduceMotion} />
          {!reduceMotion && <InteractionOrchestrator nebulaMaterial={nebulaMaterialRef} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CelestialAtelierBackground;
