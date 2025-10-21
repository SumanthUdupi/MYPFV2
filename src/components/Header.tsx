import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronsRight, X } from 'lucide-react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void }> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="block px-4 py-2 text-lg text-text hover:text-accent transition-colors duration-300">
    {children}
  </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants: Variants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 text-text bg-background/80 backdrop-blur-sm">
        <motion.a
          href="#hero"
          className="font-display text-2xl text-accent"
          whileHover={{ scale: 1.05, textShadow: '0 0 8px rgba(196, 166, 98, 0.5)' }}
        >
          S.U.
        </motion.a>
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-accent transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(196,166,98,0.4)]">About</a>
          <a href="#skills" className="hover:text-accent transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(196,166,98,0.4)]">Skills</a>
          <a href="#experience" className="hover:text-accent transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(196,166,98,0.4)]">Experience</a>
          <a href="#key-projects" className="hover:text-accent transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(196,166,98,0.4)]">Projects</a>
          <a href="#contact" className="hover:text-accent transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(196,166,98,0.4)]">Contact</a>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Open menu">
            <ChevronsRight size={28} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#1a1a1a] p-8 shadow-2xl rounded-l-3xl"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleMenu} className="absolute top-6 right-6 focus:outline-none">
                <X size={28} />
              </button>
              <nav className="mt-16 flex flex-col space-y-4">
                <NavLink href="#about" onClick={toggleMenu}>About</NavLink>
                <NavLink href="#skills" onClick={toggleMenu}>Skills</NavLink>
                <NavLink href="#experience" onClick={toggleMenu}>Experience</NavLink>
                <NavLink href="#key-projects" onClick={toggleMenu}>Projects</NavLink>
                <NavLink href="#education" onClick={toggleMenu}>Education</NavLink>
                <NavLink href="#certifications" onClick={toggleMenu}>Certifications</NavLink>
                <NavLink href="#contact" onClick={toggleMenu}>Contact</NavLink>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
