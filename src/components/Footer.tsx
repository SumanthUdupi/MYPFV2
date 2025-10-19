
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <p className="font-body text-sm text-secondary-accent">
        &copy; {currentYear} {portfolioData.name}. All Rights Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
