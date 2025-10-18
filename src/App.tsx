import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import StarryBackground from './components/StarryBackground';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  } as const;

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <StarryBackground />
          <Header />
          <main className="relative z-10">
            <Hero />
            
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <About />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <BentoGrid />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Contact />
            </motion.div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;