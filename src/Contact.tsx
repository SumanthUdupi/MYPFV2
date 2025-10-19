import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="max-w-2xl mx-auto">
      <h2 className="font-display text-4xl text-accent text-center mb-12">Get In Touch</h2>
      <form className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full bg-transparent border-b-2 border-text/20 focus:border-accent focus:ring-0 transition-colors duration-300 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full bg-transparent border-b-2 border-text/20 focus:border-accent focus:ring-0 transition-colors duration-300 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text/80 mb-2">Message</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className="w-full bg-transparent border-b-2 border-text/20 focus:border-accent focus:ring-0 transition-colors duration-300 py-2"
          />
        </div>
        <div className="text-center pt-4">
          <motion.button
            type="submit"
            className="font-display text-lg bg-accent text-primary px-12 py-3 relative overflow-hidden"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </div>
      </form>
    </section>
  );
};

export default Contact;