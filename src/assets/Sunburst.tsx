import React from 'react';
import { motion } from 'framer-motion';

const Sunburst: React.FC = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{ duration: 2, ease: [0.6, 0.01, 0.05, 0.95] }}
  >
    <defs>
      <radialGradient id="sunburst-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="10%" stopColor="#C4A662" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#A48642" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g transform="translate(50,50)">
      {[...Array(48)].map((_, i) => (
        <motion.line
          key={i}
          x1="0"
          y1="0"
          x2="0"
          y2="60" // Increased length
          stroke="url(#sunburst-gradient)"
          strokeWidth="1"
          transform={`rotate(${(i * 360) / 48})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.03, ease: 'circOut' }}
        />
      ))}
    </g>
  </motion.svg>
);

export default Sunburst;