
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const MagneticIcon: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative text-3xl text-secondary-accent hover:text-accent transition-colors duration-300"
    >
      {children}
    </motion.a>
  );
};

const Contact: React.FC = () => {
  const { contact } = portfolioData;

  return (
    <motion.section
      id="contact"
      className="py-24 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <h2 className="font-display text-4xl text-accent mb-4">Get In Touch</h2>
      <p className="font-body text-lg text-text/80 max-w-xl mx-auto mb-8">
        I'm currently open to new opportunities. Feel free to reach out.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
        <div className="flex items-center gap-3">
          <FiMail className="text-accent" />
          <a href={`mailto:${contact.email}`} className="font-body text-text hover:text-accent transition-colors">{contact.email}</a>
        </div>
        <div className="flex items-center gap-3">
          <FiPhone className="text-accent" />
          <a href={`tel:${contact.phone}`} className="font-body text-text hover:text-accent transition-colors">{contact.phone}</a>
        </div>
        <div className="flex items-center gap-3">
          <FiMapPin className="text-accent" />
          <span className="font-body text-text">{contact.location}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-8">
        <MagneticIcon href={`https://www.${contact.linkedin}`}><FiLinkedin /></MagneticIcon>
        <MagneticIcon href={`https://www.${contact.github}`}><FiGithub /></MagneticIcon>
      </div>
    </motion.section>
  );
};

export default Contact;
