
import React from 'react';
import { motion } from 'framer-motion';

const Chevron: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 20"
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <path
      d="M 0 10 L 10 0 L 20 10 L 30 0 L 40 10 L 50 0 L 60 10 L 70 0 L 80 10 L 90 0 L 100 10"
      stroke="var(--color-accent)"
      strokeWidth="2"
      fill="none"
    />
  </motion.svg>
);

export default Chevron;
