import React from 'react';
import AnchorLink from './AnchorLink';
import useSound from '../hooks/useSound';

const Header: React.FC = () => {
  const playHoverSound = useSound(660, 0.05, 0.1);

  return (
    <header className="p-4 bg-primary text-secondary">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">
          {'Jules'.split('').map((letter, index) => (
            <span key={index} className="logo-letter" onMouseEnter={playHoverSound}>{letter}</span>
          ))}
        </div>
        <div>
          <AnchorLink href="#about" className="mx-2 hover:text-accent link-underline-animate" onMouseEnter={playHoverSound}>About</AnchorLink>
          <AnchorLink href="#projects" className="mx-2 hover:text-accent link-underline-animate" onMouseEnter={playHoverSound}>Projects</AnchorLink>
          <AnchorLink href="#contact" className="mx-2 hover:text-accent link-underline-animate" onMouseEnter={playHoverSound}>Contact</AnchorLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;