import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <motion.section
      id="contact"
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gold-500 tracking-wider">Contact Me</h2>
        <div className="space-y-4">
          <p className="text-lg">Location: Bangalore, India</p>
          <p className="text-lg">Phone: <a href="tel:+919741712966" className="hover:text-gold-500">+91 9741712966</a></p>
          <p className="text-lg">Email: <a href="mailto:sumanthudupi858@gmail.com" className="hover:text-gold-500">sumanthudupi858@gmail.com</a></p>
        </div>
        <div className="flex justify-center space-x-8 mt-8">
          <a href="https://linkedin.com/in/sumanth-udupi" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors duration-300">
            {/* Replace with a proper icon */}
            LinkedIn
          </a>
          <a href="https://github.com/SumanthUdupi" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors duration-300">
            {/* Replace with a proper icon */}
            GitHub
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
