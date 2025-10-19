import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import Sunburst from '../assets/Sunburst';

const Hero: React.FC = () => {
  const { name, title } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const nameVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  const titleVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 1.5 },
    },
  };

  return (
    <motion.section
      id="hero"
      className="relative flex flex-col items-center justify-center h-screen text-center text-text overflow-hidden bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 border-8 border-accent/50 pointer-events-none" />
      <div className="absolute inset-8 border-2 border-accent/50 pointer-events-none" />

      <Sunburst />

      <motion.h1
        className="font-display text-6xl md:text-8xl lg:text-9xl text-accent mb-6 z-10"
        variants={nameVariants}
        style={{ textShadow: '0 0 15px rgba(196, 166, 98, 0.4)' }}
      >
        {name.split('').map((char, index) => (
          <motion.span key={`${char}-${index}`} className="inline-block" variants={letterVariants}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.h2
        className="font-sans text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto z-10 text-text/80 tracking-widest uppercase"
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-accent/30"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.5 }}
      />
    </motion.section>
  );
};

export default Hero;