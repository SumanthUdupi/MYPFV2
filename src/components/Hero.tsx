
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FiArrowDown } from 'react-icons/fi';

const Hero: React.FC = () => {
  const { name, title } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  } as const;

  return (
    <motion.section
      id="hero"
      className="relative flex flex-col items-center justify-center h-screen text-center text-text"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl text-accent mb-4"
        variants={itemVariants}
      >
        {name}
      </motion.h1>
      <motion.h2
        className="font-body text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <FiArrowDown className="text-3xl text-secondary-accent" />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
