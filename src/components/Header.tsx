import React from 'react';
import AnchorLink from './AnchorLink';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-primary text-secondary">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">Jules</div>
        <div>
          <AnchorLink href="#about" className="mx-2 hover:text-accent">About</AnchorLink>
          <AnchorLink href="#projects" className="mx-2 hover:text-accent">Projects</AnchorLink>
          <AnchorLink href="#contact" className="mx-2 hover:text-accent">Contact</AnchorLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;