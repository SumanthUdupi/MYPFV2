import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.5
    },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' } 
  },
} as const;

const Loader = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatedLogo />
    </motion.div>
  );
};

export default Loader;