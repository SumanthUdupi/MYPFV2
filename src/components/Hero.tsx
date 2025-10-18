import React from 'react';
import { useTilt3D } from '../hooks/useTilt3D';

const Hero: React.FC = () => {
  const { ref, transform } = useTilt3D();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Decorative golden elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full opacity-5 blur-3xl"></div>

      <div ref={ref} style={{ transform }} className="space-y-8 max-w-4xl transition-transform duration-100">
        <div className="space-y-4 fade-in-up">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-accent-light via-accent to-secondary bg-clip-text text-transparent">
            Jules
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
        </div>
        <p className="text-2xl md:text-3xl text-secondary font-light tracking-wide fade-in-up" style={{ animationDelay: '0.1s' }}>
          Creative Developer & Designer
        </p>
        <p className="text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
          Crafting beautiful digital experiences with cutting-edge technology and thoughtful design. A journey through the cosmos of creativity.
        </p>
        <div className="pt-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button className="px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-dark font-bold rounded-lg hover:shadow-2xl hover:shadow-accent/60 transition-all duration-300 transform hover:scale-110 relative group overflow-hidden">
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
