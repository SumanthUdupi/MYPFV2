import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';

// Placeholder for the Art Nouveau vine animation
const FlowingVines = () => {
  // In the future, this will contain the animated vine logic
  return null;
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="h-screen w-full relative">
      {/* 3D Canvas Scene */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="rgb(182, 146, 83)" />

          {/* Art Deco 3D Text */}
          <Text
            font="/fonts/CinzelDecorative-Bold.ttf" // NOTE: You'll need to add this font file to your /public/fonts directory
            fontSize={2.5}
            color="rgb(182, 146, 83)"
            material-metalness={0.9}
            material-roughness={0.2}
            anchorX="center"
            anchorY="middle"
          >
            JULES
          </Text>

          {/* Art Nouveau animated element */}
          <FlowingVines />
        </Suspense>
      </Canvas>

      {/* HTML UI Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.div
          className="space-y-8 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 1.5 } }}
        >
          <div className="h-48 md:h-64" /> {/* Spacer to push content below the 3D text */}
          <motion.p
            className="text-2xl md:text-3xl text-ivory font-body tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 1 } }}
          >
            Creative Developer & Designer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1 } }}
            className="pt-8 pointer-events-auto"
          >
            <button className="px-8 py-3 font-display text-lg tracking-widest uppercase text-background bg-gold rounded-sm border-2 border-gold hover:bg-transparent hover:text-gold transition-all duration-300 ease-in-out">
              Explore My Work
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;