import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItemProps {
  className?: string;
  title: string;
  company: string;
  date: string;
  description: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  className,
  title,
  company,
  date,
  description,
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg h-full group ${className} bg-primary border border-white/10 p-6`}
      data-interactive
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-2xl text-accent">{title}</h3>
          <p className="text-text/70 font-body">{company}</p>
        </div>
        <p className="text-text/50 font-body text-sm">{date}</p>
      </div>
      <ul className="text-text/80 space-y-2 font-body text-sm list-disc list-inside">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ExperienceItem;