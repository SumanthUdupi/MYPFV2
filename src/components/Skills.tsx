import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const skillPillVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SkillCategory: React.FC<{ category: string; skills: string[] }> = ({ category, skills }) => {
  return (
    <div className="group">
      <h3 className="font-display text-3xl text-accent mb-6 relative inline-block">
        {category}
        {/* Art Deco line accent that animates on hover */}
        <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      </h3>
      <ul className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="bg-primary text-secondary/90 px-5 py-3 border border-secondary/20 text-base transition-colors duration-300 hover:border-accent/80 hover:text-accent"
            style={{ clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)' }}
            variants={skillPillVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] }}
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
    <section id="skills">
      <h2 className="font-display text-6xl text-accent text-center mb-16">Skills</h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {Object.entries(skills).map(([category, skillList]) => (
          <SkillCategory key={category} category={category} skills={skillList} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
