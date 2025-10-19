import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as Element;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-interactive]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const cursorVariants = {
    'default': {
      x: position.x - 12,
      y: position.y - 12,
      width: 24,
      height: 24,
      backgroundColor: '#D4AF37',
      mixBlendMode: 'screen' as const,
      transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
    },
    hover: {
      x: position.x - 16,
      y: position.y - 16,
      width: 32,
      height: 32,
      backgroundColor: '#00ffff',
      mixBlendMode: 'screen' as const,
      transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
    },
  };

  return (
    <motion.div
      variants={cursorVariants}
      animate={isHovering ? 'hover' : 'default'}
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
    />
  );
};

export default CustomCursor;