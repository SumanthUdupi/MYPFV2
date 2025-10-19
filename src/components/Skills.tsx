import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            className="bg-[#111111] text-secondary/90 px-4 py-2 border border-secondary/20 text-sm transition-colors duration-300 hover:border-accent/80 hover:text-accent"            
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryKeys = Object.keys(skills);

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

interface CategoryNodeProps {
  category: string;
  skills: string[];
  position: { x: number, y: number };
  isActive: boolean;
  onActivate: () => void;
}

const CategoryNode: React.FC<CategoryNodeProps> = ({ category, skills, position, isActive, onActivate }) => {
  const radius = 120; // Radius for skill leaves

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onHoverStart={onActivate}
    >
      <motion.div 
        className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full cursor-pointer"
      >
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-accent/30"
          animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.7 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary border-2 border-accent/80"
          animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
        />
        <span className="relative z-20 font-heading text-center text-text uppercase text-sm tracking-wider">{category}</span>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div className="absolute top-1/2 left-1/2 w-full h-full">
            {skills.map((skill, i) => {
              const angle = (i / skills.length) * 2 * Math.PI;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <React.Fragment key={skill}>
                  <motion.svg 
                    className="absolute top-0 left-0 w-full h-full overflow-visible"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <path d={`M 0 0 L ${x} ${y}`} stroke="#D4AF37" strokeWidth="1" />
                  </motion.svg>
                  <SkillLeaf skill={skill} position={{ x, y }} index={i} />
                </React.Fragment>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface SkillLeafProps {
  skill: string;
  position: { x: number, y: number };
  index: number;
}

const SkillLeaf: React.FC<SkillLeafProps> = ({ skill, position, index }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
      exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.05 }}
    >
      <div className="bg-background text-text px-3 py-1 rounded-full text-xs whitespace-nowrap border border-secondary-accent/50">
        {skill}
      </div>
    </motion.div>
  );
};

export default Skills;
