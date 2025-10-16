import React from 'react';
import { projects } from '../data/projects';
import BentoGridItem from './BentoGridItem';

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="p-10 bg-primary">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
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
    </section>
  );
};

export default BentoGrid;