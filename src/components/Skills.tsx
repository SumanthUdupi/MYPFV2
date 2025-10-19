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
      <h3 className="font-display text-2xl text-accent mb-4 relative inline-block">
        {category}
        {/* Art Deco line accent that animates on hover */}
        <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      </h3>
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="bg-[#111111] text-text/90 px-4 py-2 border border-text/20 text-sm transition-colors duration-300 hover:border-accent/80 hover:text-accent"            
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }}
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
      <h2 className="font-display text-4xl text-accent text-center mb-12">Skills</h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Object.entries(skills).map(([category, skillList]) => (
          <SkillCategory key={category} category={category} skills={skillList} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
