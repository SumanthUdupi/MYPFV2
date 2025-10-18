import React from 'react';
import { motion } from 'framer-motion';
import { useTilt3D } from '../hooks/useTilt3D';

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
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt3D();

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 p-6 cursor-pointer h-full shadow-lg hover:shadow-2xl hover:shadow-accent/20 ${className}`}
    >
      <div className="relative z-20 h-full flex flex-col">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
        />
        <h3 className="text-xl font-bold text-accent-light mb-2 transition-colors">
          <span>{title}</span>
        </h3>
        <p className="text-secondary/70 text-sm flex-grow transition-colors">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-accent/20 transition-colors">
          <motion.button 
            className="text-accent text-sm font-semibold hover:text-accent-light transition-colors inline-block"
            whileHover={{ x: 4, transition: { duration: 0.3 } }}
          >
            Learn More →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoGridItem;
