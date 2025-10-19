import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="font-sans uppercase tracking-widest text-sm text-text/80 hover:text-accent transition-colors duration-300 relative group">
    {children}
    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
  </a>
);

const NavLinks: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <>
    <NavLink href="#about" onClick={onClick}>About</NavLink>
    <NavLink href="#skills" onClick={onClick}>Skills</NavLink>
    <NavLink href="#experience" onClick={onClick}>Experience</NavLink>
    <NavLink href="#key-projects" onClick={onClick}>Projects</NavLink>
    <NavLink href="#education" onClick={onClick}>Education</NavLink>
    <NavLink href="#contact" onClick={onClick}>Contact</NavLink>
  </>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, clipPath: 'circle(0% at 50% 0)' },
    visible: { opacity: 1, clipPath: 'circle(150% at 50% 0)', transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] as const } },
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`absolute inset-0 bg-background transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-50'}`} style={{ backdropFilter: 'blur(10px)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <nav className="relative z-10 max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="font-display text-3xl text-accent tracking-wider">
          {portfolioData.name.split(' ').map(n => n[0]).join('')}
        </a>
        <div className="hidden md:flex items-center gap-10">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-text focus:outline-none z-50 relative">
            <div className="w-6 h-6 flex flex-col justify-around items-center">
              <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="w-full h-0.5 bg-text rounded-full" />
              <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-full h-0.5 bg-text rounded-full" />
              <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="w-full h-0.5 bg-text rounded-full" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-background z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-12">
              <NavLinks onClick={toggleMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
