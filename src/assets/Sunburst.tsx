
import React from 'react';
import { motion } from 'framer-motion';

const Sunburst: React.FC = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="absolute inset-0 w-full h-full opacity-5"
    initial={{ opacity: 0, scale: 1.2 }}
    animate={{ opacity: 0.05, scale: 1 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  >
    <defs>
      <radialGradient id="sunburst-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g transform="translate(50,50)">
      {[...Array(24)].map((_, i) => (
        <motion.line
          key={i}
          x1="0"
          y1="0"
          x2="0"
          y2="50"
          stroke="url(#sunburst-gradient)"
          strokeWidth="2"
          transform={`rotate(${(i * 360) / 24})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </g>
  </motion.svg>
);

export default Sunburst;
