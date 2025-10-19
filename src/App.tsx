
import React from 'react';
import { motion, Variants } from 'framer-motion';
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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] as const },
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
  return (
    <div className="bg-primary min-h-screen overflow-x-hidden font-body text-secondary">
      <main className="relative z-10 px-6 sm:px-12 md:px-24 lg:px-32">
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
      </main>
    </div>
  );
};

export default App;
