import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 192 }) => {

  const monogramPathLength = 600; // Estimated length of the complex path

  const monogramVariants: Variants = {
    animate: {
      strokeDashoffset: [monogramPathLength, 0, -monogramPathLength],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  const sunburstVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  const glowVariants: Variants = {
    glow: {
      filter: [
        'drop-shadow(0 0 3px #FFD700)',
        'drop-shadow(0 0 8px #B8860B)',
        'drop-shadow(0 0 3px #FFD700)'
      ],
      transition: {
        duration: 5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  }

  return (
    <motion.div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
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
        </defs>

        {/* Art Deco Sunburst Frame */}
        <motion.g 
          className="origin-center"
          variants={sunburstVariants} 
          animate="animate"
          style={{ stroke: '#B8860B', strokeWidth: 1, strokeOpacity: 0.5 }}
        >
          <path d="M100 0 V40" /> <path d="M100 200 V160" />
          <path d="M0 100 H40" /> <path d="M200 100 H160" />
          <path d="M29 29 L57 57" /> <path d="M171 171 L143 143" />
          <path d="M29 171 L57 143" /> <path d="M171 29 L143 57" />
        </motion.g>
        <motion.circle cx="100" cy="100" r="95" stroke="#B8860B" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />

        {/* Intertwined Art Nouveau "SU" Monogram */}
        <motion.g variants={glowVariants} animate="glow">
          <motion.path
            d="M 130 140 C 160 140, 160 90, 110 80 C 60 70, 60 20, 100 20 C 140 20, 140 70, 90 80 C 40 90, 40 140, 70 140"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={monogramPathLength}
            variants={monogramVariants}
            animate="animate"
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;
