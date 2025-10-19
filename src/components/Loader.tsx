import React from 'react';
import { motion } from 'framer-motion';

const logoVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

const Loader: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Simplified Art Deco Sunburst Motif */}
        <motion.path
          d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </motion.div>
  );
};

export default Loader;
