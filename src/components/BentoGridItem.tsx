import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDirectionalHover } from '../hooks/useDirectionalHover';

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  image: string;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  image,
}) => {
  const { isHovering, direction, handleMouseEnter, handleMouseLeave } = useDirectionalHover();

  const variants = {
    initial: (direction: string) => {
      switch (direction) {
        case 'top': return { y: '-100%' };
        case 'bottom': return { y: '100%' };
        case 'left': return { x: '-100%' };
        case 'right': return { x: '100%' };
        default: return { opacity: 0 };
      }
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 25 },
    },
    exit: (direction: string) => {
      switch (direction) {
        case 'top': return { y: '-100%', transition: { duration: 0.2 } };
        case 'bottom': return { y: '100%', transition: { duration: 0.2 } };
        case 'left': return { x: '-100%', transition: { duration: 0.2 } };
        case 'right': return { x: '100%', transition: { duration: 0.2 } };
        default: return { opacity: 0, transition: { duration: 0.2 } };
      }
    },
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-lg h-full group ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-interactive
    >
      <AnimatePresence custom={direction}>
        {isHovering && (
          <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center"
          >
            <h3 className="font-display text-2xl text-accent mb-2">{title}</h3>
            <p className="text-text/90 text-sm mb-4">{description}</p>
            <span className="font-body text-accent text-xs tracking-widest uppercase">
              View Project
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 transition-all duration-300 rounded-lg" />
      <div className="absolute inset-0 group-hover:shadow-[0_0_20px_5px_rgba(197,163,92,0.2)] transition-all duration-300 rounded-lg" />
    </motion.div>
  );
};

export default BentoGridItem;