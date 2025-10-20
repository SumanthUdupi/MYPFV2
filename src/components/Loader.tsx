import React from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 0,
    transition: { 
      delay: 3.5,
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96],
      when: "afterChildren"
    }
  }
};

const overlayVariants: Variants = {
  hidden: { scaleY: 1 },
  visible: { 
    scaleY: 0,
    transition: { 
      duration: 1.2,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 3
    }
  }
};

const logoVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { 
      duration: 2.5,
      ease: "easeOut",
      opacity: { duration: 0.3 }
    },
  },
};

const Loader: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 100 100">
          {/* Enhanced Art Deco Sunburst Motif */}
          <motion.path
            d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#D4AF37"
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.1, 1.4],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }
            }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { delay: 1, duration: 0.8 }
          }}
        >
          <span className="text-accent text-xl font-display tracking-widest">
            LOADING
          </span>
        </motion.div>
      </div>
      
      {/* Overlay for reveal animation */}
      <motion.div
        className="fixed inset-0 bg-background origin-bottom"
        variants={overlayVariants}
      />
    </motion.div>
  );
};

export default Loader;
