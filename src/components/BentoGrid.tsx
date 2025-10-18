import React from 'react';
import { projects } from '../data/projects';
import BentoGridItem from './BentoGridItem';

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            My Work
          </h2>
          <p className="text-lg text-secondary/70">Explore my latest projects and creations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {projects.map((project) => (
            <BentoGridItem
              key={project.title}
              className={project.className}
              title={project.title}
              description={project.description}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
