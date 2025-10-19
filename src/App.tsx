import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Magnetic from './components/Magnetic';
import Menu from './components/Menu';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-deep-black text-shimmering-silver min-h-screen font-poiret">
      <Cursor />
      <header className="fixed top-0 left-0 w-full bg-deep-black bg-opacity-80 backdrop-blur-md z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Magnetic>
            <a href="#home" className="text-2xl font-bold text-gold-500 tracking-wider">Sumanth Udupi</a>
          </Magnetic>
          <div className="hidden md:flex">
            <ul className="flex space-x-8">
              <Magnetic><li><a href="#about" className="hover:text-gold-500 transition-colors duration-300">About</a></li></Magnetic>
              <Magnetic><li><a href="#experience" className="hover:text-gold-500 transition-colors duration-300">Experience</a></li></Magnetic>
              <Magnetic><li><a href="#projects" className="hover:text-gold-500 transition-colors duration-300">Projects</a></li></Magnetic>
              <Magnetic><li><a href="#contact" className="hover:text-gold-500 transition-colors duration-300">Contact</a></li></Magnetic>
            </ul>
          </div>
          <Menu open={open} setOpen={setOpen} />
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 bg-deep-black bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8">
          <a href="#about" onClick={() => setOpen(false)} className="text-2xl hover:text-gold-500">About</a>
          <a href="#experience" onClick={() => setOpen(false)} className="text-2xl hover:text-gold-500">Experience</a>
          <a href="#projects" onClick={() => setOpen(false)} className="text-2xl hover:text-gold-500">Projects</a>
          <a href="#contact" onClick={() => setOpen(false)} className="text-2xl hover:text-gold-500">Contact</a>
        </div>
      )}

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 bg-black text-center">
        <p>&copy; {new Date().getFullYear()} Sumanth Udupi. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
