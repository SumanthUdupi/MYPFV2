
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Education: React.FC = () => {
  const { education } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="education"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-12">Education</h2>
      <div className="max-w-2xl mx-auto">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="mb-8 p-6 bg-primary/20 border border-secondary-accent/20 rounded-lg"
          >
            <p className="font-body text-secondary-accent text-sm">{edu.year}</p>
            <h3 className="font-display text-xl text-accent mt-1">{edu.degree}</h3>
            <p className="font-body text-text/90">{edu.institution}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;
