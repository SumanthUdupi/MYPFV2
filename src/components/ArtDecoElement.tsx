import React from 'react';
import { motion } from 'framer-motion';

const ArtDecoElement: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 20"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <path d="M0 10 H 20 L 25 5 L 30 10 H 70 L 75 15 L 80 10 H 100" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M0 10 H 20 L 25 15 L 30 10" stroke="currentColor" strokeWidth="2" fill="none" />
    </motion.svg>
  );
};

export default ArtDecoElement;