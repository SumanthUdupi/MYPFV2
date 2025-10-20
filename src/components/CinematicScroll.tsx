import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CinematicScrollProps {
  children: React.ReactNode;
  intensity?: number;
  threshold?: number;
}

const CinematicScroll: React.FC<CinematicScrollProps> = ({ 
  children, 
  intensity = 0.2,
  threshold = 0.5 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(
    scrollYProgress,
    [0, threshold, 1],
    [0.9, 1, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, threshold, 1],
    [0.6, 1, 0.8]
  );

  const y = useTransform(
    scrollYProgress,
    [0, threshold, 1],
    [60 * intensity, 0, -30 * intensity]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

export default CinematicScroll;