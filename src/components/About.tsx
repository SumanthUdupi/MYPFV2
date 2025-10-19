import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const About: React.FC = () => {
  const { about: professionalSummary } = portfolioData;

  return (
    <motion.section
      id="about"
      className="py-32 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 
        className="font-display text-6xl text-accent mb-6"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        About Me
      </motion.h2>
      
      <ArtDecoElement className="w-64 h-8 mx-auto text-accent/50 mb-12" />

      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="font-sans text-xl leading-relaxed text-text/90">
          {professionalSummary}
        </p>
      </motion.div>
    </motion.section>
  );
};

export default About;