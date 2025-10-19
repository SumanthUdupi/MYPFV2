import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the project, its goals, and the technologies used.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    cta: 'View Project',
  },
  {
    title: 'Project Two',
    description: 'A brief description of the project, its goals, and the technologies used.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    cta: 'View Project',
  },
  {
    title: 'Project Three',
    description: 'A brief description of the project, its goals, and the technologies used.',
    tags: ['Python', 'Django', 'PostgreSQL'],
    cta: 'View Project',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-accent">
            Personal Projects
          </h2>
          <div className="w-24 h-0.5 bg-accent/50 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-primary rounded-lg border border-white/10 p-6 flex flex-col justify-between"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div>
                <h3 className="font-display text-2xl text-accent mb-3">{project.title}</h3>
                <p className="text-text/70 font-body mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-accent-dark bg-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#" className="font-display text-lg tracking-widest uppercase text-accent hover:text-white transition-colors duration-300">
                {project.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;