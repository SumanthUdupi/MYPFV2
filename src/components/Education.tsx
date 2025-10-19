import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const TimelineItem: React.FC<{
  item: typeof portfolioData.education[0];
  isLeft: boolean;
}> = ({ item, isLeft }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } },
  };

  return (
    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-stretch w-full mb-16`}>
      <div className="w-1/2 flex-shrink-0">
        <motion.div
          variants={itemVariants}
          className={`p-8 bg-secondary border-2 border-accent/20 h-full ${isLeft ? 'text-right' : 'text-left'}`}
          style={{ clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
        >
          <p className="font-sans text-sm text-text/60 mb-2 tracking-widest">{item.year}</p>
          <h3 className="font-display text-2xl text-accent mb-2">{item.degree}</h3>
          <p className="font-sans text-md text-secondary-accent">{item.institution}</p>
        </motion.div>
      </div>
      <div className="w-24 flex-shrink-0 flex justify-center items-center">
        <div className="w-4 h-4 bg-accent transform rotate-45" />
      </div>
      <div className="w-1/2 flex-shrink-0" />
    </div>
  );
};

const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-32">
      <h2 className="font-display text-6xl text-accent text-center mb-6">Education</h2>
      <ArtDecoElement className="w-64 h-8 mx-auto text-accent/50 mb-24" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-secondary-accent/30"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="relative flex flex-col items-center">
          {education.map((item, index) => (
            <TimelineItem
              key={item.institution}
              item={item}
              isLeft={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;