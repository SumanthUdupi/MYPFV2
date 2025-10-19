import React from 'react';
import { portfolioData } from '../../portfolioData';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const PersonalProjects: React.FC = () => {
  const { personalProjects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  return (
    <motion.section
      id="personal-projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <h2 className="font-deco text-4xl text-accent text-center mb-16 uppercase tracking-widest">Personal Explorations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </motion.section>
  );
};

export default PersonalProjects;
