import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center px-6 relative">
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-accent-light via-accent to-blue-400 bg-clip-text text-transparent animate-pulse">
            Jules
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-light mx-auto"></div>
        </div>
        <p className="text-2xl md:text-3xl text-secondary font-light tracking-wide">
          Creative Developer & Designer
        </p>
        <p className="text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed">
          Crafting beautiful digital experiences with cutting-edge technology and thoughtful design.
        </p>
        <div className="pt-8">
          <button className="px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105">
            Explore My Work
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
