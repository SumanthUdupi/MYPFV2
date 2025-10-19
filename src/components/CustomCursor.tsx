import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      width: 16,
      height: 16,
      backgroundColor: '#D4AF37',
      mixBlendMode: 'difference' as const,
    },
  };

  return (
    <motion.div
      variants={cursorVariants}
      animate="default"
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
    />
  );
};

export default CustomCursor;