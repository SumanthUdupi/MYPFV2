import { useState, type MouseEvent } from 'react';
import { useSpring } from 'framer-motion';

export const useMagneticEffect = () => {
  const [isMagnetic, setIsMagnetic] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 10, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 10, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isMagnetic) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      x.set(deltaX * 0.5);
      y.set(deltaY * 0.5);
    }
  };

  const handleMouseEnter = () => {
    setIsMagnetic(true);
  };

  const handleMouseLeave = () => {
    setIsMagnetic(false);
    x.set(0);
    y.set(0);
  };

  return { x, y, handleMouseMove, handleMouseEnter, handleMouseLeave };
};
