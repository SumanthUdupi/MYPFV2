import React, { useRef } from 'react';
import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative flex flex-col items-center justify-center h-screen text-center text-text overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        className="absolute inset-0 border-8 border-accent/50 pointer-events-none rounded-3xl"
        style={{ scale, opacity }}
      />
      <motion.div 
        className="absolute inset-8 border-2 border-accent/50 pointer-events-none rounded-3xl"
        style={{ scale, opacity }}
      />

      <motion.div style={{ y }}>
        <Sunburst />
      </motion.div>

      <motion.h1
        className="font-sans text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-accent mb-6 z-10 drop-shadow-2xl"
        variants={nameVariants}
        style={{
          textShadow: '0 0 30px rgba(196, 166, 98, 0.6), 0 4px 20px rgba(0, 0, 0, 0.8)',
          filter: 'drop-shadow(0 0 20px rgba(45, 212, 191, 0.3))'
        }}
      >
        {name.split('').map((char, index) => (
          <motion.span key={`${char}-${index}`} className="inline-block" variants={letterVariants}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.h2
        className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto z-10 text-white/90 tracking-widest uppercase drop-shadow-lg"
        variants={titleVariants}
        style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)' }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 2 }}
        className="mt-12 z-10"
      >
        <a href="#about" className="bg-accent text-background font-bold py-3 px-8 rounded-full hover:bg-secondary-accent transition-colors duration-500 text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:shadow-2xl">
          Discover More
        </a>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-accent/30"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.5 }}
      />
    </motion.section>
  );
};

export default Hero;
