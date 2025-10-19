import React from 'react';
import { motion, Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import GenerativeBackground from './GenerativeBackground';

const Hero: React.FC = () => {
  const { name, title } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8, // Delay the start of children animations
        staggerChildren: 0.1, // Stagger each child (h1, h2)
      },
    },
  };

  // Variants for the main title, animating each letter
  const nameVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Variants for each individual letter
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  } as const;

  const titleVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.section
      id="hero"
      className="relative flex flex-col items-center justify-center h-screen text-center text-text overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <GenerativeBackground />

      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl text-accent mb-4 z-10"
        variants={nameVariants}
      >
        {name.split('').map((char, index) => (
          <motion.span key={`${char}-${index}`} className="inline-block" variants={letterVariants}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.h2
        className="font-body text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto z-10"
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      <motion.div
        className="absolute bottom-12 w-0.5 h-16 bg-accent"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: [0, 64, 0], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 2 }}
      >
      </motion.div>
    </motion.section>
  );
};

export default Hero;
