import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { portfolioData } from '../../portfolioData';
import { ExternalLink } from 'lucide-react';

const ProjectCard: React.FC<{ project: typeof portfolioData.keyProjects[0] | typeof portfolioData.personalProjects[0] }> = ({ project }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] } },
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ perspective: 600 }}
      onMouseMove={!isTouchDevice ? handleMouse : undefined}
      onMouseLeave={!isTouchDevice ? () => {
        x.set(200);
        y.set(200);
      } : undefined}
      variants={cardVariants}
      className="relative h-full group block"
    >
      <motion.div
        style={{ 
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' 
        }}
        className="bg-secondary p-8 h-full flex flex-col border-2 border-transparent group-hover:border-accent/50 transition-all duration-300"
        whileHover={!isTouchDevice ? {
          y: -10,
          boxShadow: "0 25px 50px -12px rgba(196, 166, 98, 0.25)",
        } : {}}
        whileTap={{ scale: isTouchDevice ? 0.95 : 1 }}
      >
        <h3 className="font-display text-2xl text-accent mb-3 flex items-center justify-between">
          {project.title}
          <ExternalLink className="w-5 h-5 text-text/50 group-hover:text-accent transition-colors" />
        </h3>
        <p className="font-sans text-text/80 text-base leading-relaxed flex-grow">
          {project.description}
        </p>
        {'tags' in project && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag, i) => (
              <span key={i} className="bg-background text-secondary-accent text-sm px-3 py-1 font-sans tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.a>
  );
};

export default ProjectCard;
