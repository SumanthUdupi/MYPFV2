import React from 'react';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 } as const,
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] as const } },
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
        style={{ rotateX, rotateY, clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
        className="bg-primary p-8 h-full flex flex-col border border-secondary/10 transition-all duration-300 hover:border-accent/80"
      >
        <h3 className="font-display text-2xl text-accent mb-4">{project.title}</h3>
        <p className="font-body text-secondary/80 text-base leading-relaxed flex-grow">
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
      <h2 className="font-display text-6xl text-accent text-center mb-16">Key Projects Delivered</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {keyProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </section>
  );
};

export default KeyProjects;
