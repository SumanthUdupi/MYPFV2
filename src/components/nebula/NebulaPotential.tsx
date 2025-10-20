import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector2 } from 'three';
import NebulaCore from './NebulaCore';
import StardustField from './StardustField';
import ConstellationWeb from './ConstellationWeb';
import ArtNouveauNebula from './ArtNouveauNebula';
import NebulaDevConsole from './NebulaDevConsole';
import { useState } from 'react';
// import InteractionOrchestrator from './InteractionOrchestrator'; // No longer needed
import { prefersReducedMotion } from './utils/prefs';
import './nebula.css';

export interface NebulaPotentialProps {
  enabled?: boolean;
  density?: 'low' | 'medium' | 'high';
  accentColor?: string;
}

/**
 * A hook to track the mouse position on every frame without causing re-renders.
 * This is more performant for WebGL animations than using useState.
 */
const useMouse = () => {
  const mouse = useRef(new Vector2(0, 0));

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      // Normalize mouse position to range [-1, 1] for both axes
      // We use clientX/Y because the canvas is fixed to the viewport
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // A scroll listener is added to handle cases where the mouse
    // doesn't move but the content under it does. For a fixed canvas,
    // this is no longer needed and was causing bugs.
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mouse;
};

const densityToCount = (density: 'low' | 'medium' | 'high') => {
  switch (density) {
    case 'low':
      return 1000;
    case 'medium':
      return 2500;
    default:
      return 5000;
  }
};
/**
 * NebulaPotential (WebGL baseline)
 * - Creates particle positions (shared data) and renders a Three.js Canvas with basic nebula, stars, and lines.
 * - Respects prefers-reduced-motion and falls back to a subtle static backdrop when set.
 */
export const NebulaPotential: React.FC<NebulaPotentialProps> = ({
  density = 'high',
  accentColor = '#00FFFF',
}) => {
  // allow forcing visuals in DEV for easier debugging
  const reduce = prefersReducedMotion() && !(import.meta as any).env?.DEV;
  const mouse = useMouse();

  const isSmall = typeof window !== 'undefined' && window.innerWidth < 900;
  // If reduced motion or small screen, use a lower density unless explicitly high
  const effectiveDensity = reduce ? 'low' : isSmall ? 'low' : density;
  // debug
  try {
    // eslint-disable-next-line no-console
    console.debug('[NebulaPotential] reduce=', reduce, 'isSmall=', isSmall, 'effectiveDensity=', effectiveDensity);
  } catch (e) {}
  const count = densityToCount(effectiveDensity);

  const positions = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40; // Increased spread
      const y = (Math.random() - 0.5) * 25; // Increased spread
      const z = (Math.random() - 0.5) * 20 - 15; // Increased depth
      out.push([x, y, z]);
    }
    return out;
  }, [count]);

  const showStatic = reduce;

  // Visible debug overlay in DEV to help diagnose layout/visibility issues
  const [showArt, setShowArt] = useState(true);
  const [showCore, setShowCore] = useState(true);
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);

  const devOverlay = (import.meta as any).env?.DEV ? (
    <div className="nebula-debug-overlay">
      <div className="title">Nebula Debug</div>
      <div>reduced: {String(reduce)}</div>
      <div>isSmall: {String(isSmall)}</div>
      <div>density: {effectiveDensity}</div>
      <div>count: {count}</div>
      <div>render: {showStatic ? 'static' : 'canvas'}</div>
      <div className="toggles">
        <label><input type="checkbox" checked={showArt} onChange={() => setShowArt((s) => !s)} /> ArtNouveau</label>
        <label><input type="checkbox" checked={showCore} onChange={() => setShowCore((s) => !s)} /> NebulaCore</label>
        <label><input type="checkbox" checked={showStars} onChange={() => setShowStars((s) => !s)} /> Stardust</label>
        <label><input type="checkbox" checked={showLines} onChange={() => setShowLines((s) => !s)} /> Constellation</label>
      </div>
    </div>
  ) : null;

  if (showStatic) {
    // subtle static background
    return (
      <>
        <div aria-hidden className="nebula-canvas nebula-canvas--reduced" />
        {devOverlay}
      </>
    );
  }

  return (
    <>
      <div aria-hidden className="nebula-canvas-fixed">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }} className="nebula-canvas-absolute">
          {/* Art Nouveau ornamental stained-glass style layer */}
            {showArt && <ArtNouveauNebula mouse={mouse} />}
          {/* Nebula volumetric backdrop */}
            {showCore && <NebulaCore mouse={mouse} />}
            {/* Star field */}
            {showStars && <StardustField positions={positions} accentColor={accentColor} />}
            {/* Constellation lines */}
            {showLines && <ConstellationWeb positions={positions} mouse={mouse} />}
        </Canvas>
      </div>
      {devOverlay}
      {(import.meta as any).env?.DEV && <NebulaDevConsole />}
    </>
  );
};

export default NebulaPotential;
// File intentionally ends after the lightweight placeholder component above.
