import React from 'react';
import { projects } from '../data/projects';
import BentoGridItem from './BentoGridItem';

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent rounded-full opacity-3 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full opacity-3 blur-3xl"></div>

      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent fade-in-up">
            My Work
          </h2>
          <p className="text-lg text-secondary/70 fade-in-up" style={{ animationDelay: '0.1s' }}>
            Explore my latest projects and creations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {projects.map((project, index) => (
            <div key={project.title} style={{ animationDelay: `${0.1 * (index + 1)}s` }} className="fade-in-up">
              <BentoGridItem
                className={project.className}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
