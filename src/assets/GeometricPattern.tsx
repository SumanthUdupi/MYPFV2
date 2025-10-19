
import React from 'react';
import { motion } from 'framer-motion';

const GeometricPattern: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <defs>
      <pattern id="geom-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
        <path d="M 0 0 L 10 10 L 0 20 Z M 20 0 L 10 10 L 20 20 Z" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#geom-pattern)" />
  </motion.svg>
);

export default GeometricPattern;
