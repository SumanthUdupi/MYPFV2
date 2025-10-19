
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const skillItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      id="skills"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-12">Skills</h2>
      <div className="bg-primary/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-secondary-accent/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList]) => (
            <motion.div key={category} variants={containerVariants}>
              <h3 className="font-display text-2xl text-accent mb-4">{category}</h3>
              <motion.ul className="flex flex-wrap gap-2" variants={containerVariants}>
                {skillList.map((skill) => (
                  <motion.li
                    key={skill}
                    className="bg-background/50 text-text px-3 py-1 rounded-full text-sm border border-secondary-accent/50"
                    variants={skillItemVariants}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
