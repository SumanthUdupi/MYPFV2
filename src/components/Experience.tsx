import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const TimelineItem: React.FC<{
  item: typeof portfolioData.experience[0];
  isLeft: boolean;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isLeft, isOpen, onToggle }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const detailsVariants: Variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      marginTop: '1rem', 
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
  };

  return (
    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-start w-full mb-8`}>
      <div className="w-1/2">
        <motion.div
          variants={itemVariants}
          className={`p-6 bg-primary border border-secondary-accent/10 cursor-pointer`}
          style={{ clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
          onClick={onToggle}
        >
          <div className={`flex justify-between items-center ${isLeft ? 'text-right' : 'text-left'}`}>
            <div>
              <p className="font-body text-sm text-text/60 mb-1">{item.period}</p>
              <h3 className="font-heading text-xl text-accent mb-1">{item.role}</h3>
              <p className="font-body text-md text-text/90">{item.company}</p>
            </div>
            <motion.div 
              className="ml-4 flex-shrink-0"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-accent text-3xl">+</span>
            </motion.div>
          </div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                key="content"
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`list-disc list-inside text-sm text-text/70 ${isLeft ? 'text-right' : 'text-left'}`}
              >
                {item.points.map((point: string, i: number) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="w-12 flex-shrink-0 flex justify-center">
        <div className="w-1 h-1 bg-accent rounded-full mt-8" />
      </div>
      <div className="w-1/2" />
    </div>
  );
};

const Experience: React.FC = () => {
  const { experience } = portfolioData;
  const [openItem, setOpenItem] = useState<string | null>(experience.length > 0 ? experience[0].role : null);

  return (
    <section id="experience">
      <h2 className="font-deco text-4xl text-accent text-center mb-16 uppercase tracking-widest">Career Journey</h2>
      <div className="relative">
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary-accent/20"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="relative flex flex-col items-center">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.role}
              item={item}
              isLeft={index % 2 !== 0}
              isOpen={openItem === item.role}
              onToggle={() => setOpenItem(openItem === item.role ? null : item.role)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;