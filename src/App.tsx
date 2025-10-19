import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import KeyProjects from './components/KeyProjects';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import PageTransition from './components/PageTransition';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] },
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
    <div className="bg-background min-h-screen overflow-x-hidden font-body text-text cursor-none" style={{ perspective: '1000px' }}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <>
            <PageTransition />
            <motion.main
              className="relative z-10 px-6 sm:px-12 md:px-24 lg:px-32"
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