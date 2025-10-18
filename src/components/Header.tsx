import React from 'react';
import AnchorLink from './AnchorLink';
import useSound from '../hooks/useSound';

const Header: React.FC = () => {
  const playHoverSound = useSound(660, 0.05, 0.1);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary/40 border-b border-accent/30 shadow-2xl shadow-accent/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
          {'Jules'.split('').map((letter, index) => (
            <span key={index} className="logo-letter" onMouseEnter={playHoverSound}>{letter}</span>
          ))}
        </div>
        <div className="flex gap-8">
          <AnchorLink href="#about" className="text-secondary hover:text-accent-light link-underline-animate font-medium transition-colors" onMouseEnter={playHoverSound}>About</AnchorLink>
          <AnchorLink href="#projects" className="text-secondary hover:text-accent-light link-underline-animate font-medium transition-colors" onMouseEnter={playHoverSound}>Projects</AnchorLink>
          <AnchorLink href="#contact" className="text-secondary hover:text-accent-light link-underline-animate font-medium transition-colors" onMouseEnter={playHoverSound}>Contact</AnchorLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
