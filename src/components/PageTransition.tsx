import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const transitionConfig = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96] as const,
};

const animationVariants: Variants = {
  initial: {
    scaleY: 1,
    backgroundColor: 'var(--color-background)',
  },
  animate: {
    scaleY: 0,
    transition: {
      ...transitionConfig,
      backgroundColor: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
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