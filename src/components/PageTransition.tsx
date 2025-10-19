import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const transitionConfig = {
  duration: 1,
  ease: [0.6, 0.01, 0.05, 0.95] as const,
};

const animationVariants: Variants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
  },
};

const PageTransition: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  if (animationComplete) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-background z-50"
        variants={animationVariants}
        initial="initial"
        animate="animate"
        transition={transitionConfig}
        style={{ transformOrigin: 'top' }}
        onAnimationComplete={() => setAnimationComplete(true)}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-full h-full bg-background z-50"
        variants={animationVariants}
        initial="initial"
        animate="animate"
        transition={transitionConfig}
        style={{ transformOrigin: 'bottom' }}
      />
    </>
  );
};

export default PageTransition;