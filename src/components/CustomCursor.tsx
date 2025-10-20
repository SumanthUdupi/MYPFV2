import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const trailLength = 8;
    if (position.x !== 0 && position.y !== 0) {
      setTrail(prev => {
        const newTrail = [...prev, position];
        return newTrail.slice(-trailLength);
      });
    }
  }, [position]);

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
      mixBlendMode: 'difference' as const,
      scale: 1,
      opacity: 0.8,
      filter: 'blur(0px)',
      transition: { 
        type: 'spring' as const, 
        stiffness: 400, 
        damping: 25,
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 }
      },
    },
    hover: {
      x: position.x - 24,
      y: position.y - 24,
      width: 48,
      height: 48,
      backgroundColor: '#00ffff',
      mixBlendMode: 'difference' as const,
      scale: 1.5,
      opacity: 1,
      filter: 'blur(4px)',
      transition: { 
        type: 'spring' as const, 
        stiffness: 300, 
        damping: 20,
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 }
      },
    },
  };

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 z-40 rounded-full pointer-events-none"
          animate={{
            x: point.x - (6 + index),
            y: point.y - (6 + index),
            width: Math.max(4, 24 - index * 2),
            height: Math.max(4, 24 - index * 2),
            opacity: 1 - (index * 0.15),
            backgroundColor: isHovering ? '#00ffff' : '#D4AF37',
          }}
          transition={{
            duration: 0.1,
            ease: 'linear'
          }}
        />
      ))}
      <motion.div
        variants={cursorVariants}
        animate={isHovering ? 'hover' : 'default'}
        className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
      />
    </>
  );
};

export default CustomCursor;