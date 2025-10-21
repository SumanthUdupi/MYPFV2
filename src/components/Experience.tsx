import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';

const TimelineItem: React.FC<{
  item: typeof portfolioData.experience[0];
  isLeft: boolean;
}> = ({ item, isLeft }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] } },
  };

  return (
    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-stretch w-full mb-16`}>
      <div className="w-1/2 flex-shrink-0">
        <motion.div
          variants={itemVariants}
          className={`p-8 bg-secondary/70 backdrop-blur border border-accent/20 rounded-2xl shadow-[0_0_24px_rgba(196,166,98,0.08)] h-full ${isLeft ? 'text-right' : 'text-left'}`}
        >
          <p className="font-sans text-sm text-text/60 mb-2 tracking-widest">{item.period}</p>
          <h3 className="font-sans text-2xl text-accent mb-2">{item.role}</h3>
          <p className="font-sans text-md text-secondary-accent mb-4">{item.company}</p>
          <ul className={`list-none text-sm text-text/80 ${isLeft ? 'pl-4' : 'pr-4'}`}>
            {item.points.map((point: string, i: number) => (
              <li key={i} className="mb-2 relative pl-6">
                <span className="absolute left-0 top-1 w-2 h-2 bg-accent/50 rounded-full shadow-[0_0_8px_rgba(196,166,98,0.5)]"/>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="w-24 flex-shrink-0 flex justify-center items-center">
        <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_12px_rgba(196,166,98,0.6)]" />
      </div>
      <div className="w-1/2 flex-shrink-0" />
    </div>
  );
};

const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-32">
      <h2 className="font-sans text-6xl text-accent text-center mb-6">Experience</h2>
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
          {experience.map((item, index) => (
            <TimelineItem
              key={item.role}
              item={item}
              isLeft={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
