import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        (e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.closest('[data-interactive]'))
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        (e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.closest('[data-interactive]'))
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  const cursorSize = isHovering ? 60 : 20;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      style={{
        translateX: mouseX,
        translateY: mouseY,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
        border: isHovering ? '2px solid #C5A35C' : '2px solid #EAEAEA',
        backgroundColor: isHovering ? 'transparent' : '#C5A35C',
        x: '-50%',
        y: '-50%',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

export default CustomCursor;
