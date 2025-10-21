import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ArtNouveauNebula from './ArtNouveauNebula';
import CelestialStardustField from './CelestialStardustField';
import OrnamentalCurveNetwork from './OrnamentalCurveNetwork';
import InteractionOrchestrator from './InteractionOrchestrator';
import CornerFlourishes from './CornerFlourishes';
import AmbientLifeSystem from './AmbientLifeSystem';
import useMedia from '../../hooks/useMedia';
import * as THREE from 'three';

const CelestialAtelierBackground = () => {
  const nebulaMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const curveNetworkRef = useRef<THREE.Group>(null);
  const stardustRef = useRef<THREE.Points>(null);
  const { isMobile, reduceMotion } = useMedia();

  const particleCount = isMobile ? 1000 : 3500;
  const curveCount = isMobile ? 4 : 10;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas dpr={[1, 1.5]} shadows={false} camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          {/* Core background layers */}
          <ArtNouveauNebula ref={nebulaMaterialRef} isMobile={isMobile} reduceMotion={reduceMotion} />

          {/* Particle system with lifecycle */}
          <CelestialStardustField
            ref={stardustRef}
            count={particleCount}
            reduceMotion={reduceMotion}
          />

          {/* Art Nouveau ornamental curves */}
          <OrnamentalCurveNetwork
            ref={curveNetworkRef}
            count={curveCount}
            reduceMotion={reduceMotion}
          />

          {/* Corner flourishes and ornamental borders */}
          <CornerFlourishes reduceMotion={reduceMotion} />

          {/* Ambient animations - breathing, color cycling, shooting stars */}
          <AmbientLifeSystem
            nebulaMaterialRef={nebulaMaterialRef}
            curveNetworkRef={curveNetworkRef}
            stardustRef={stardustRef}
            reduceMotion={reduceMotion}
          />

          {/* Interactive choreography - parallax, deformation, ripples */}
          {!reduceMotion && (
            <InteractionOrchestrator
              nebulaMaterial={nebulaMaterialRef}
              curveNetworkRef={curveNetworkRef}
              stardustRef={stardustRef}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CelestialAtelierBackground;
