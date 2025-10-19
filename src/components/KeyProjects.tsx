import React from 'react';
import { portfolioData } from '../../portfolioData';
import ProjectCard from './ProjectCard';

const KeyProjects: React.FC = () => {
  const { keyProjects } = portfolioData;

  return (
    <section id="key-projects">
      <h2 className="font-deco text-4xl text-accent text-center mb-16 uppercase tracking-widest">Key Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {keyProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </section>
  );
};

export default KeyProjects;
