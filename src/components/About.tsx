import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import ArtDecoElement from './ArtDecoElement';
import CinematicScroll from './CinematicScroll';

const About: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const { about: professionalSummary } = portfolioData;

  return (
    <motion.section
      ref={ref}
      id="about"
      className="py-24 md:py-32 text-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity, scale }}
    >
      <CinematicScroll intensity={0.2}>
        <motion.h2 
          className="font-sans text-5xl sm:text-6xl text-accent mb-6"
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.2, 
            ease: [0.43, 0.13, 0.23, 0.96],
            filter: { duration: 0.8 }
          }}
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <ArtDecoElement className="w-48 sm:w-64 h-8 mx-auto text-accent/50 mb-12" />
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1, 
            delay: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <p className="font-sans text-lg sm:text-xl leading-relaxed text-text/90 relative">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {professionalSummary}
            </motion.span>
          </p>
        </motion.div>
      </CinematicScroll>
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
      </motion.div>
    </motion.section>
  );
};

export default About;
