import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const skillPillVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const SkillCategory: React.FC<{ category: string; skills: string[] }> = ({ category, skills }) => {
  return (
    <div className="text-center">
      <h3 className="font-display text-3xl text-accent mb-4">{category}</h3>
      <ul className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            className="bg-secondary/60 backdrop-blur px-4 py-2 rounded-full border border-accent/20 text-text/90 font-sans text-base shadow-[0_0_20px_rgba(196,166,98,0.08)] hover:shadow-[0_0_28px_rgba(196,166,98,0.25)] transition-all duration-500 active:bg-accent/10 active:border-accent active:text-accent"
                        variants={skillPillVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-32">
      <h2 className="font-sans text-6xl text-accent text-center mb-6">Skills</h2>
      <ArtDecoElement className="w-64 h-8 mx-auto text-accent/50 mb-16" />
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl mx-auto"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {Object.entries(skills).map(([category, skillList]) => (
          <SkillCategory key={category} category={category} skills={skillList} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
