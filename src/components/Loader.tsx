import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' } 
  },
} as const;

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
} as const;

const name = "Sumanth Udupi";

const Loader = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-[var(--color-accent-light)]"
        aria-label={name}
        variants={containerVariants}
      >
        {name.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
