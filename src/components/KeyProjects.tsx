import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ProjectCard: React.FC<{ project: typeof portfolioData.keyProjects[0] }> = ({ project }) => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] } },
  };

  return (
    <motion.div
      style={{ perspective: 400 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(200);
        y.set(200);
      }}
      variants={cardVariants}
      className="relative h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="bg-[#111111] p-6 h-full flex flex-col border border-secondary/10 transition-all duration-300 hover:border-accent/80"
        // Using a custom clip-path for the Art Deco style
        // You can generate your own at https://bennettfeely.com/clippy/
        // This one creates a simple corner cut.
        css={{ clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
      >
        <h3 className="font-display text-xl text-accent mb-3">{project.title}</h3>
        <p className="font-body text-secondary/80 text-sm leading-relaxed flex-grow">
          {project.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const KeyProjects: React.FC = () => {
  const { keyProjects } = portfolioData;

  return (
    <section id="key-projects">
      <h2 className="font-display text-4xl text-accent text-center mb-12">Key Projects Delivered</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {keyProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </section>
  );
};

export default KeyProjects;
