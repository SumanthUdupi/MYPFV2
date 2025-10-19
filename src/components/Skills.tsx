import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryKeys = Object.keys(skills);

  return (
    <section id="skills">
      <h2 className="font-deco text-4xl text-accent text-center mb-24 uppercase tracking-widest">Constellation of Skills</h2>
      <div 
        className="relative w-full max-w-4xl mx-auto" 
        style={{ height: '500px' }} 
        onMouseLeave={() => setActiveCategory(null)}
      >
        {categoryKeys.map((category, i) => {
          const angle = (i / categoryKeys.length) * 2 * Math.PI;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);

          return (
            <CategoryNode 
              key={category} 
              category={category} 
              skills={skills[category]} 
              position={{ x, y }} 
              isActive={activeCategory === category}
              onActivate={() => setActiveCategory(category)}
            />
          );
        })}
      </div>
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
