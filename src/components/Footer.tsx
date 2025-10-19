import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-12 text-center relative border-t-2 border-accent/20 mt-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
    >
      <ArtDecoElement className="w-48 h-6 mx-auto text-accent/30 mb-8" />
      <p className="font-sans text-base text-text/70 z-10 relative tracking-widest">
        &copy; {currentYear} {portfolioData.name}. All Rights Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;