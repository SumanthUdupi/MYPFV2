import React from 'react';
import { portfolioData } from '../portfolioData';

const About: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="max-w-4xl mx-auto text-center">
      <h2 className="font-display text-4xl text-accent mb-8">About Me</h2>
      <p className="font-body text-lg md:text-xl text-secondary/80 leading-relaxed">
        {about}
      </p>
    </section>
  );
};

export default About;