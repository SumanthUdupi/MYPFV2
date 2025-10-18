import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import BentoGridItem from './BentoGridItem';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BentoGrid: React.FC = () => {
  return (
    <motion.section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent rounded-full opacity-3 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full opacity-3 blur-3xl"></div>

      <div className="max-w-7xl w-full relative z-10">
        <motion.div className="text-center mb-16" variants={containerVariants}>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"
            variants={itemVariants}
          >
            My Work
          </motion.h2>
          <motion.p className="text-lg text-secondary/70" variants={itemVariants}>
            Explore my latest projects and creations
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <BentoGridItem
                className={project.className}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BentoGrid;
