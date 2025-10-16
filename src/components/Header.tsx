import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">Jules</div>
        <div>
          <a href="#about" className="mx-2">About</a>
          <a href="#projects" className="mx-2">Projects</a>
          <a href="#contact" className="mx-2">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;