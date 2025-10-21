import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ProjectCard from './ProjectCard';
import ArtDecoElement from './ArtDecoElement';

const KeyProjects: React.FC = () => {
  const { keyProjects } = portfolioData;

  return (
    <section id="key-projects" className="py-24 md:py-32">
      <h2 className="font-sans text-5xl sm:text-6xl text-accent text-center mb-6">Key Projects Delivered</h2>
      <ArtDecoElement className="w-48 sm:w-64 h-8 mx-auto text-accent/50 mb-16 sm:mb-24" />
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {keyProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default KeyProjects;
