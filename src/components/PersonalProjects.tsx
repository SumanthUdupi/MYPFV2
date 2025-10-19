
import React from 'react';
import { motion } from 'framer-motion';

const PersonalProjects: React.FC = () => {
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
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-12">Personal Projects</h2>
      <div>Personal Projects Carousel Placeholder</div>
    </motion.section>
  );
};

export default PersonalProjects;
