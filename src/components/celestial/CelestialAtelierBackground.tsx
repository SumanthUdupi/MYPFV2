
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CelestialStardustField } from './CelestialStardustField';
import { ArtNouveauNebula } from './ArtNouveauNebula';
import { OrnamentalCurveNetwork } from './OrnamentalCurveNetwork';
import { AmbientLifeSystem } from './AmbientLifeSystem';
import { CornerFlourishes } from './CornerFlourishes';

export function CelestialAtelierBackground() {
  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #0a0e27, #000000)' }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
            <CelestialStardustField />
            <ArtNouveauNebula />
            <OrnamentalCurveNetwork />
            <CornerFlourishes />
            <AmbientLifeSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}
