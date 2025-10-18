import React from 'react';
import { motion } from 'framer-motion';
import { useTilt3D } from '../hooks/useTilt3D';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useSound from '../hooks/useSound';
import { portfolioData } from '../../config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact: React.FC = () => {
  const magneticRef = useMagneticEffect<HTMLAnchorElement>();
  const playClickSound = useSound(880, 0.05, 0.2);
  const card1Tilt = useTilt3D();
  const card2Tilt = useTilt3D();
  const card3Tilt = useTilt3D();

  return (
    <motion.section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Decorative golden glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl"></div>

      <div className="max-w-3xl text-center relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Let's Work Together
        </motion.h2>
        <motion.p
          className="text-xl text-secondary/80 mb-12 leading-relaxed"
          variants={itemVariants}
        >
          I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to chat about design and development, feel free to reach out!
        </motion.p>
        <motion.div variants={itemVariants}>
          <a
            ref={magneticRef}
            href={`mailto:${portfolioData.email}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-dark font-bold rounded-lg hover:shadow-2xl hover:shadow-accent/70 transition-all duration-300 transform hover:scale-110 relative group overflow-hidden"
            onMouseEnter={playClickSound}
          >
            <span className="relative z-10">Send Me an Email</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          </a>
        </motion.div>
        <motion.div className="mt-16 grid md:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div
            ref={card1Tilt.ref}
            style={card1Tilt.style}
            onMouseMove={card1Tilt.handleMouseMove}
            onMouseLeave={card1Tilt.handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-colors duration-300 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="text-4xl mb-3 transition-transform duration-300">💻</div>
            <h3 className="text-accent-light font-bold mb-2">Web Design</h3>
            <p className="text-secondary/70 text-sm">Beautiful, responsive designs</p>
          </motion.div>
          <motion.div
            ref={card2Tilt.ref}
            style={card2Tilt.style}
            onMouseMove={card2Tilt.handleMouseMove}
            onMouseLeave={card2Tilt.handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-colors duration-300 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="text-4xl mb-3 transition-transform duration-300">⚡</div>
            <h3 className="text-accent-light font-bold mb-2">Development</h3>
            <p className="text-secondary/70 text-sm">Fast, scalable applications</p>
          </motion.div>
          <motion.div
            ref={card3Tilt.ref}
            style={card3Tilt.style}
            onMouseMove={card3Tilt.handleMouseMove}
            onMouseLeave={card3Tilt.handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-colors duration-300 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="text-4xl mb-3 transition-transform duration-300">🎨</div>
            <h3 className="text-accent-light font-bold mb-2">Animation</h3>
            <p className="text-secondary/70 text-sm">Smooth, engaging interactions</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
