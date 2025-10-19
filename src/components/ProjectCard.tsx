import React from 'react';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import MagneticLink from './MagneticLink';

// Define a generic project type to be used by both Key and Personal projects
interface Project {
  title: string;
  description: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] } },
  };

  return (
    <motion.div
      style={{ perspective: 400 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(200); y.set(200); }}
      variants={cardVariants}
      className="relative h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          clipPath: 'polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)',
        }}
        className="bg-primary p-8 h-full flex flex-col border border-secondary-accent/10 transition-all duration-300 hover:border-accent/80"
      >
        <h3 className="font-heading text-xl text-accent mb-3 uppercase tracking-wider">{project.title}</h3>
        <p className="font-body text-text/80 text-sm leading-relaxed flex-grow mb-6">
          {project.description}
        </p>
        <div className="mt-auto">
          <MagneticLink>
            <a href="#" className="inline-block bg-accent/90 text-background font-heading text-xs uppercase tracking-widest py-3 px-6 transition-colors hover:bg-accent">
              View Details
            </a>
          </MagneticLink>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
