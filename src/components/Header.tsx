import React from 'react';
import MagneticLink from './MagneticLink';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-primary/50 backdrop-blur-lg border-b border-white/10" />
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="#hero" className="font-display text-2xl font-bold text-accent tracking-wider">
          Sumanth Udupi
        </a>
        <div className="flex gap-10">
          <MagneticLink href="#about" className="text-text hover:text-accent transition-colors duration-300 relative group">
            About
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </MagneticLink>
          <MagneticLink href="#projects" className="text-text hover:text-accent transition-colors duration-300 relative group">
            Projects
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </MagneticLink>
          <MagneticLink href="#contact" className="text-text hover:text-accent transition-colors duration-300 relative group">
            Contact
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </MagneticLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;