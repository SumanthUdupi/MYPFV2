
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaBriefcase } from 'react-icons/fa';

const Experience: React.FC = () => {
  const { experience } = portfolioData;

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="experience"
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-display text-4xl text-accent text-center mb-16">Professional Experience</h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-secondary-accent/30"></div>
        {experience.map((job, index) => (
          <motion.div
            key={index}
            className="relative mb-12"
            variants={timelineItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <p className="font-body text-sm text-secondary-accent">{job.period}</p>
                <h3 className="font-display text-xl text-accent mt-1">{job.role}</h3>
                <p className="font-body text-md text-text">{job.company}</p>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1 w-6 h-6 bg-background border-2 border-accent rounded-full flex items-center justify-center">
              <FaBriefcase className="text-accent text-xs"/>
            </div>
            <div className={`mt-4 w-full flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <ul className="list-disc list-inside w-5/12 font-body text-sm text-text/80 leading-relaxed">
                  {job.points.slice(0, 3).map((point, i) => <li key={i} className="mb-2">{point}</li>)} 
                </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
