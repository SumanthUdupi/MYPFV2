import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
};

export default App;