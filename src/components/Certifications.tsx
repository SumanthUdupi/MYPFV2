
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="certifications"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-12">Certifications</h2>
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 bg-primary/20 border border-secondary-accent/20 rounded-lg text-center"
          >
            <p className="font-body text-secondary-accent text-sm">{cert.year}</p>
            <h3 className="font-display text-lg text-accent mt-1">{cert.name}</h3>
            <p className="font-body text-text/90 text-sm">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;
