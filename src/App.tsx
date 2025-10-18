import React from 'react';
import StarryBackground from './components/StarryBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <StarryBackground />
      <div className="relative z-10">
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
    </div>
  );
};

export default App;
