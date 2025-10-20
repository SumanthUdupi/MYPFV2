import React, { useEffect } from 'react';

export interface InteractionOrchestratorProps {
  onMouseMove?: (p: { x: number; y: number }) => void;
  throttleMs?: number;
}

/**
 * InteractionOrchestrator
 * Minimal cursor manager that reports throttled mouse position to parent components.
 */
export const InteractionOrchestrator: React.FC<InteractionOrchestratorProps> = ({ onMouseMove, throttleMs = 16 }) => {
  useEffect(() => {
    let raf = 0;
    let last = 0;

    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < throttleMs) return;
      last = now;
      const x = e.clientX;
      const y = e.clientY;
      if (onMouseMove) onMouseMove({ x, y });
    };

    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
      cancelAnimationFrame(raf);
    };
  }, [onMouseMove, throttleMs]);

  return null;
};

export default InteractionOrchestrator;
// end of lightweight orchestrator
