
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const KeyProjects: React.FC = () => {
  const { keyProjects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="key-projects"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-12">Key Projects Delivered</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {keyProjects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-primary/30 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-secondary-accent/20 h-full flex flex-col"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="font-display text-xl text-accent mb-3">{project.title}</h3>
            <p className="font-body text-text/90 text-sm leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default KeyProjects;
