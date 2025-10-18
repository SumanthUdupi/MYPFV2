import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 192 }) => {

  const sPathLength = 260;
  const uPathLength = 150;

  const sVariants: Variants = {
    animate: {
      strokeDashoffset: [sPathLength, 0, -sPathLength],
      transition: {
        duration: 4,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  const uVariants: Variants = {
    animate: {
      strokeDashoffset: [uPathLength, 0, -uPathLength],
      transition: {
        duration: 4,
        ease: "linear",
        repeat: Infinity,
        delay: 0.2, // Stagger the animation
      }
    }
  };

  const glowVariants: Variants = {
    glow: {
      filter: [
        'drop-shadow(0 0 2px #FFD700)',
        'drop-shadow(0 0 6px #B8860B)',
        'drop-shadow(0 0 2px #FFD700)'
      ],
      transition: {
        duration: 4,
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
        viewBox="0 0 120 100"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>

        <motion.g variants={glowVariants} animate="glow">
          {/* S - Art Nouveau Style */}
          <motion.path
            d="M 55 85 C 0 85, 0 45, 40 45 C 80 45, 80 10, 45 10"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={sPathLength}
            variants={sVariants}
            animate="animate"
          />

          {/* U - Art Nouveau Style */}
          <motion.path
            d="M 75 15 V 60 C 75 95, 115 95, 115 60 V 15"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={uPathLength}
            variants={uVariants}
            animate="animate"
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;