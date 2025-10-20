import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import './styles/cinematic.css';
import Skills from './components/Skills';
import Experience from './components/Experience';
import KeyProjects from './components/KeyProjects';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PageTransition from './components/PageTransition';
import NebulaPotential from './components/nebula/NebulaPotential.tsx';
import Header from './components/Header';

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    scale: 0.98,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 1.2,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const MotionSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <motion.section
    className={className}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.section>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden font-body text-text app-perspective">
      <Header />
      <NebulaPotential />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <>
            <PageTransition />
            <motion.main
              className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Hero />
              <MotionSection className="py-24 md:py-32"><About /></MotionSection>
              <MotionSection className="py-24 md:py-32"><Skills /></MotionSection>
              <MotionSection className="py-24 md:py-32"><Experience /></MotionSection>
              <MotionSection className="py-24 md:py-32"><KeyProjects /></MotionSection>
              <MotionSection className="py-24 md:py-32"><PersonalProjects /></MotionSection>
              <MotionSection className="py-24 md:py-32"><Education /></MotionSection>
              <MotionSection className="py-24 md:py-32"><Certifications /></MotionSection>
              <MotionSection className="py-24 md:py-32"><Contact /></MotionSection>
              <Footer />
            </motion.main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;