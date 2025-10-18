import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 192 }) => {

  const monogramPathLength = 750; // Estimated length for the new ornate path

  const monogramVariants: Variants = {
    animate: {
      strokeDashoffset: [monogramPathLength, 0, -monogramPathLength],
      transition: {
        duration: 6,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  const logoVariants: Variants = {
    breathe: {
      scale: [1, 1.03, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <motion.div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
      variants={logoVariants}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Deco Pattern */}
        <path d="M 100,50 L 125,100 L 100,150 L 75,100 Z" fill="#B8860B" opacity="0.1" />

        {/* Intertwined "SU" Monogram with Flourishes */}
        <motion.g variants={logoVariants} animate="breathe">
          <motion.path
            d="M 100 180 C 40 180, 40 120, 100 120 C 160 120, 160 60, 100 60 C 40 60, 40 0, 100 0"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={monogramPathLength}
            variants={monogramVariants}
            animate="animate"
            filter="url(#glow)"
          />
          {/* Vine/Leaf Flourish */}
          <path d="M 100 180 C 110 160, 120 150, 140 150" fill="none" stroke="#B8860B" stroke-width="2" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;