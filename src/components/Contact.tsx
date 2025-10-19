import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import ArtDecoElement from './ArtDecoElement';

const ContactInfo: React.FC<{ icon: React.ReactNode; text: string; href?: string }> = ({ icon, text, href }) => {
  const content = (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-secondary border-2 border-accent/30 flex items-center justify-center" style={{ clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
        {icon}
      </div>
      <span className="font-sans text-lg text-text/90 group-hover:text-accent transition-colors duration-300">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group">
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
};

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative w-20 h-20 bg-secondary border-2 border-accent/30 flex items-center justify-center text-4xl text-secondary-accent hover:text-accent transition-colors duration-300"
    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
  >
    {children}
  </motion.a>
);

const Contact: React.FC = () => {
  const { contact } = portfolioData;

  return (
    <motion.section
      id="contact"
      className="py-32 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <h2 className="font-display text-6xl text-accent mb-6">Get In Touch</h2>
      <ArtDecoElement className="w-64 h-8 mx-auto text-accent/50 mb-12" />
      <p className="font-sans text-xl text-text/80 max-w-3xl mx-auto mb-16">
        I'm currently open to new opportunities. Feel free to reach out.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-20">
        <ContactInfo icon={<FiMail className="text-accent text-2xl" />} text={contact.email} href={`mailto:${contact.email}`} />
        <ContactInfo icon={<FiPhone className="text-accent text-2xl" />} text={contact.phone} href={`tel:${contact.phone}`} />
        <ContactInfo icon={<FiMapPin className="text-accent text-2xl" />} text={contact.location} />
      </div>
      <div className="flex justify-center items-center gap-12">
        <SocialIcon href={`https://${contact.linkedin}`}><FiLinkedin /></SocialIcon>
        <SocialIcon href={`https://${contact.github}`}><FiGithub /></SocialIcon>
      </div>
    </motion.section>
  );
};

export default Contact;