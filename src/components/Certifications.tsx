import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] as const } },
  };

  return (
    <motion.section
      id="certifications"
      className="py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="font-display text-6xl text-accent text-center mb-6">Certifications</h2>
      <ArtDecoElement className="w-64 h-8 mx-auto text-accent/50 mb-24" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-8 bg-secondary border-2 border-accent/20 text-center group hover:bg-secondary/80 transition-colors duration-300"
            style={{ clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <p className="font-sans text-secondary-accent text-base tracking-widest uppercase">{cert.date}</p>
            <h3 className="font-display text-3xl text-accent mt-4 mb-2">{cert.name}</h3>
            <p className="font-sans text-text/90 text-lg">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;