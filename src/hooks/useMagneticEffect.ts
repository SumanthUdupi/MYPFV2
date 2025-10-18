import { useRef, useEffect } from 'react';

const useMagneticEffect = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 100) { // Threshold
        const pullFactor = 0.4;
        element.style.transform = `translate(${deltaX * pullFactor}px, ${deltaY * pullFactor}px)`;
        element.style.transition = 'transform 0.1s ease-out';
      } else {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.3s ease-in-out';
      }
    };

    const handleMouseLeave = () => {
      if (element) {
        element.style.transform = 'translate(0, 0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

export default useMagneticEffect;