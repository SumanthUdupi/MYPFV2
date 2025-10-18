import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ArtDecoElement from './ArtDecoElement'; // Import the new 3D element

const Hero: React.FC = () => {
  const name = "SUMANTH UDUPI";
  const letters = name.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <section id="hero" className="h-screen w-full relative flex items-center justify-center">
      {/* 3D Canvas Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#C5A35C" />
            <ArtDecoElement />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.h1
          className="font-display text-6xl md:text-8xl text-text tracking-widest"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={name}
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-text/80 font-body tracking-wider mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1 } }}
        >
          Creative Developer & Designer
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 2.5, duration: 1 } }}
          className="pt-12 pointer-events-auto"
        >
          <button className="px-8 py-3 font-display text-lg tracking-widest uppercase text-background bg-accent rounded-sm border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300 ease-in-out" data-interactive>
            Explore My Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
