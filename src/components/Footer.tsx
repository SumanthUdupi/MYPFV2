
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import GeometricPattern from '../assets/GeometricPattern';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <GeometricPattern className="absolute inset-0 w-full h-full opacity-5" />
      <p className="font-body text-base text-secondary-accent z-10 relative">
        &copy; {currentYear} {portfolioData.name}. All Rights Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
