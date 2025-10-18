import { useState, useRef, useEffect } from 'react';

type Direction = 'top' | 'bottom' | 'left' | 'right';

const getDirection = (
  e: MouseEvent,
  element: HTMLElement
): Direction => {
  const { width, height, left, top } = element.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  const dx = x - width / 2;
  const dy = y - height / 2;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  } else {
    return dy > 0 ? 'bottom' : 'top';
  }
};

export const useDirectionalHover = () => {
  const [hovering, setHovering] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = (e: MouseEvent) => {
      setDirection(getDirection(e, element));
      setHovering(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      setDirection(getDirection(e, element));
      setHovering(false);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, hovering, direction };
};