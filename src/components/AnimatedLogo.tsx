import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 192 }) => {
  const svgVariants: Variants = {
    hidden: { 
      opacity: 0,
      rotate: -90
    },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 1,
        ease: 'easeOut'
      }
    },
  };

  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0.5
      }
    }
  };
  
  const glowVariants: Variants = {
    glow: {
      filter: [
        'drop-shadow(0 0 2px #C5A35C)',
        'drop-shadow(0 0 5px #C5A35C)',
        'drop-shadow(0 0 2px #C5A35C)'
      ],
      transition: {
        duration: 2.5,
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
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        variants={svgVariants}
        className="overflow-visible"
      >
        {/* Art Deco Frame */}
        <motion.g variants={glowVariants} animate="glow">
          {/* Outer circle */}
          <circle cx="100" cy="100" r="90" stroke="#C5A35C" strokeWidth="2" fill="none" />
          {/* Inner deco lines */}
          <path d="M 100,20 L 100,40 M 100,180 L 100,160 M 20,100 L 40,100 M 180,100 L 160,100" stroke="#C5A35C" strokeWidth="1" />
        </motion.g>

        {/* S - More legible */}
        <motion.path
          d="M 85,125 C 65,125 65,95 85,95 C 105,95 105,65 85,65"
          fill="none"
          stroke="#C5A35C"
          strokeWidth="6"
          strokeLinecap="round"
          variants={pathVariants}
        />

        {/* U - More legible */}
        <motion.path
          d="M 115,75 V 115 C 115,135 135,135 135,115 V 75"
          fill="none"
          stroke="#C5A35C"
          strokeWidth="6"
          strokeLinecap="round"
          variants={pathVariants}
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;