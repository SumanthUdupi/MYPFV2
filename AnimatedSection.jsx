import { motion } from "framer-motion";

/**
 * This component wraps any section and applies a "reveal on scroll" animation.
 */
export const AnimatedSection = ({ children, className }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, // Start 50px below and invisible
    visible: {
      opacity: 1,
      y: 0, // End at its original position and fully visible
      transition: {
        duration: 0.8,
        ease: "easeOut", // This is a valid easing. Ensure any other components use a WAAPI-compatible easing like this one.
      },
    },
  };

  return (
    <motion.section
      className={`py-20 ${className || ''}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Animate once, when 20% of it is in view
    >
      {children}
    </motion.section>
  );
};