import React from 'react';
import { motion } from 'framer-motion';

const LensFlare: React.FC = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-0 w-full h-1/6 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
      style={{
        transform: 'translateY(-50%)',
        filter: 'blur(20px)',
      }}
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 8,
        ease: 'linear',
      }}
    />
  );
};

export default LensFlare;
