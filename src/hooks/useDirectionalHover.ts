import { useState, MouseEvent } from 'react';

type Direction = 'top' | 'bottom' | 'left' | 'right';

const getDirection = (
  e: MouseEvent<HTMLDivElement>,
): Direction => {
  const element = e.currentTarget;
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
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setDirection(getDirection(e));
    setIsHovering(true);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setDirection(getDirection(e));
    setIsHovering(false);
  };

  return { isHovering, direction, handleMouseEnter, handleMouseLeave };
};
