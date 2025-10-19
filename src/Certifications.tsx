import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../portfolioData';

const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl text-accent text-center mb-12">Certifications</h2>
      <div className="space-y-6">
        {certifications.map((cert: typeof portfolioData.certifications[0], index: number) => (
          <motion.div key={index} className="text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: index * 0.1 }}>
            <h3 className="font-display text-text">{cert.name}</h3>
            <p className="text-text/60">{cert.issuer} - {cert.date}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;