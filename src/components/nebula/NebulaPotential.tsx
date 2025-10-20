import React, { useMemo, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import NebulaCore from './NebulaCore';
import StardustField from './StardustField';
import ConstellationWeb from './ConstellationWeb';
import CursorTrail from './CursorTrail';
import InteractionOrchestrator from './InteractionOrchestrator';
import { prefersReducedMotion } from './utils/prefs';
import './nebula.css';

export interface NebulaPotentialProps {
  enabled?: boolean;
  density?: 'low' | 'medium' | 'high';
  accentColor?: string;
}

const densityToCount = (density: 'low' | 'medium' | 'high') => {
  switch (density) {
    case 'low':
      return 400;
    case 'medium':
      return 900;
    default:
      return 2200;
  }
};

/**
 * NebulaPotential (WebGL baseline)
 * - Creates particle positions (shared data) and renders a Three.js Canvas with basic nebula, stars, and lines.
 * - Respects prefers-reduced-motion and falls back to a subtle static backdrop when set.
 */
export const NebulaPotential: React.FC<NebulaPotentialProps> = ({
  enabled = true,
  density = 'high',
  accentColor = '#00FFFF',
}) => {
  const reduce = prefersReducedMotion();
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const count = densityToCount(density);

  const positions = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 10 - 10; // push back into scene
      out.push([x, y, z]);
    }
    return out;
  }, [count]);

  const handleMouse = useCallback((p: { x: number; y: number }) => setMouse(p), []);

  if (!enabled) return null;

  if (reduce) {
    // subtle static background
    return <div aria-hidden className="nebula-canvas nebula-canvas--reduced" />;
  }

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <InteractionOrchestrator onMouseMove={handleMouse} throttleMs={16} />
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }} style={{ position: 'absolute', inset: 0 }}>
  {/* Nebula volumetric backdrop */}
  <NebulaCore mouse={mouse} />
  {/* Star field */}
  <StardustField positions={positions} accentColor={accentColor} />
        {/* Constellation lines */}
        <ConstellationWeb positions={positions} mouse={mouse} />
        {/* Cursor trail */}
        <CursorTrail mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default NebulaPotential;
// File intentionally ends after the lightweight placeholder component above.
