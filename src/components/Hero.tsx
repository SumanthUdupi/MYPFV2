import React from 'react';
import { motion } from 'framer-motion';
import Sunburst from '../assets/Sunburst';

const Hero: React.FC = () => {
  return (
    <motion.section
      id="home"
      className="h-screen flex items-center justify-center text-center bg-deep-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 z-0 opacity-50">
        <Sunburst />
      </div>
      <div className="z-10">
        <motion.h1
          className="text-5xl md:text-8xl font-bold text-shimmering-silver tracking-widest uppercase"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Sumanth Udupi
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gold-500 tracking-wider"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Business Analyst | ESG, EHS, ERP & QMS | Agile, API, and Data-Driven Product Designer
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Hero;
