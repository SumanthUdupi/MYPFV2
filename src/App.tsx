
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import KeyProjects from './components/KeyProjects';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarryBackground from './components/StarryBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarryBackground />
      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <KeyProjects />
        <PersonalProjects />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default App;
