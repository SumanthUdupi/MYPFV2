import React from 'react';
import { motion } from 'framer-motion';
import CinematicScroll from './CinematicScroll';

interface Project {
  title: string;
  description: string;
  tags: string[];
  cta: string;
}

const projects: Project[] = [
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
    <motion.section 
      id="projects" 
      className="min-h-screen flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl w-full">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <h2 className="font-display text-5xl md:text-6xl text-accent">
            Personal Projects
          </h2>
          <div className="w-24 h-0.5 bg-accent/50 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <CinematicScroll key={project.title} intensity={0.15} threshold={0.2}>
              <motion.div
                className="bg-primary rounded-lg border border-white/10 p-6 flex flex-col justify-between h-full"
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  transition: { 
                    duration: 0.4,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  } 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: index * 0.1
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div>
                  <h3 className="font-display text-2xl text-accent mb-3">{project.title}</h3>
                  <p className="text-text/70 font-body mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={`${project.title}-${tag}-${i}`} 
                        className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-accent-dark bg-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.a 
                  href="#" 
                  className="font-display text-lg tracking-widest uppercase text-accent hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project.cta}
                </motion.a>
              </motion.div>
            </CinematicScroll>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;