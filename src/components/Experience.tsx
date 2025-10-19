import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const TimelineItem: React.FC<{
  item: typeof portfolioData.experience[0];
  isLeft: boolean;
}> = ({ item, isLeft }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 } as const,
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center w-full mb-12`}>
      <div className="w-1/2">
        <motion.div
          variants={itemVariants}
          className={`p-8 bg-primary border border-secondary/10 ${isLeft ? 'text-right' : 'text-left'}`}
          style={{ clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
        >
          <p className="font-body text-base text-secondary/60 mb-2">{item.period}</p>
          <h3 className="font-display text-3xl text-accent mb-3">{item.role}</h3>
          <p className="font-body text-lg text-secondary/90 mb-4">{item.company}</p>
          <ul className="list-disc list-inside text-base text-secondary/70">
            {item.points.map((point: string, i: number) => (
              <li key={i} className="mb-2">{point}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="w-16 flex-shrink-0 flex justify-center">
        <div className="w-2 h-2 bg-accent rounded-full" />
      </div>
      <div className="w-1/2" />
    </div>
  );
};

const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience">
      <h2 className="font-display text-6xl text-accent text-center mb-24">Experience</h2>
      <div className="relative">
        {/* The central timeline spine */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary/20"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="relative flex flex-col items-center">
          {experience.map((item: typeof portfolioData.experience[0], index: number) => (
            <TimelineItem
              key={item.company}
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