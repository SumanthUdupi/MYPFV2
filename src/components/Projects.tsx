import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Project One",
    description: "A brief description of the project, its goals, and the technologies used.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "Project Two",
    description: "A brief description of the project, its goals, and the technologies used.",
    tags: ["Node.js", "Express", "MongoDB"],
    link: "#"
  },
  {
    title: "Project Three",
    description: "A brief description of the project, its goals, and the technologies used.",
    tags: ["Python", "Flask", "SQLAlchemy"],
    link: "#"
  }
];

const Projects: React.FC = () => {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gold-500 tracking-wider">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border-2 border-gold-500"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-gold-500 text-black py-1 px-3 rounded-full text-sm">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="text-gold-500 hover:underline">View Project</a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
