import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  const svgVariants = {
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
  } as const;

  const pathVariants = {
    hidden: {
      pathLength: 0,
      pathOffset: 1,
    },
    visible: {
      pathLength: 1,
      pathOffset: 0,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 0.5
      }
    }
  } as const;
  
  const glowVariants = {
    glow: {
      filter: [
        'drop-shadow(0 0 3px #C5A35C)',
        'drop-shadow(0 0 8px #C5A35C)',
        'drop-shadow(0 0 3px #C5A35C)'
      ],
      transition: {
        duration: 2.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  } as const;

  return (
    <motion.div
      className="flex items-center justify-center w-48 h-48"
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
          <motion.path
            d="M 100, 20 a 80,80 0 1,1 0,160 a 80,80 0 1,1 0,-160"
            fill="none"
            stroke="#C5A35C"
            strokeWidth="3"
            variants={pathVariants}
          />
          <motion.path
            d="M 100,30 a 70,70 0 1,1 0,140 a 70,70 0 1,1 0,-140"
            fill="none"
            stroke="#C5A35C"
            strokeWidth="1"
            strokeDasharray="4 8"
            variants={pathVariants}
          />
        </motion.g>

        {/* S - Art Nouveau Style */}
        <motion.path
          d="M 125,80 C 125,50 75,50 75,80 C 75,110 125,110 125,140"
          fill="none"
          stroke="#C5A35C"
          strokeWidth="5"
          strokeLinecap="round"
          variants={pathVariants}
        />

        {/* U - Art Nouveau Style */}
        <motion.path
          d="M 75,120 C 75,150 125,150 125,120"
          fill="none"
          stroke="#C5A35C"
          strokeWidth="5"
          strokeLinecap="round"
          variants={pathVariants}
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;
