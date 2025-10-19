
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
      <h2 className="font-display text-6xl text-accent text-center mb-16">Certifications</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-8 bg-primary border border-secondary/10 text-center"
            style={{ clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            <p className="font-body text-secondary-accent text-base">{cert.date}</p>
            <h3 className="font-display text-2xl text-accent mt-2">{cert.name}</h3>
            <p className="font-body text-text/90 text-base mt-1">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;
