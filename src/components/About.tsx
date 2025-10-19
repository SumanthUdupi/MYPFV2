
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About: React.FC = () => {
  const { professionalSummary } = portfolioData;

  return (
    <motion.section
      id="about"
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-display text-4xl text-accent mb-4">About Me</h2>
          <div className="w-24 h-1 bg-accent"></div>
        </motion.div>
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-body text-lg leading-relaxed text-text">
            {professionalSummary}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
