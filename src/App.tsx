import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <div>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <BentoGrid />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;