import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  bgImage?: string;
  overlayOpacity?: number;
  speed?: number;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  bgImage,
  overlayOpacity = 0.5,
  speed = 0.5,
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y,
            scale,
            opacity,
          }}
        />
      )}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `rgba(0, 0, 0, ${overlayOpacity})`,
          backdropFilter: 'blur(2px)',
        }}
      />
      <div className="relative z-20 flex h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxContainer;