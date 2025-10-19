import React from 'react';
import { motion, Variants } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

const TimelineItem: React.FC<{
  item: typeof portfolioData.experience[0];
  isLeft: boolean;
}> = ({ item, isLeft }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 } as const,
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center w-full mb-8`}>
      <div className="w-1/2">
        <motion.div
          variants={itemVariants}
          className={`p-6 bg-[#111111] border border-secondary/10 ${isLeft ? 'text-right' : 'text-left'}`}
          style={{ clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
        >
          <p className="font-body text-sm text-secondary/60 mb-1">{item.period}</p>
          <h3 className="font-display text-xl text-accent mb-2">{item.role}</h3>
          <p className="font-body text-md text-secondary/90 mb-3">{item.company}</p>
          <ul className="list-disc list-inside text-sm text-secondary/70">
            {item.points.map((point: string, i: number) => (
              <li key={i} className="mb-1">{point}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="w-12 flex-shrink-0 flex justify-center">
        <div className="w-1 h-1 bg-accent rounded-full" />
      </div>
      <div className="w-1/2" />
    </div>
  );
};

const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience">
      <h2 className="font-display text-4xl text-accent text-center mb-16">Experience</h2>
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
          {experience.map((item, index) => (
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