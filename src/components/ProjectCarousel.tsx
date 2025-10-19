
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useTilt3D';
import { FiArrowRight } from 'react-icons/fi';

const ProjectCard: React.FC<{ project: typeof portfolioData.personalProjects[0] }> = ({ project }) => {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt3D();

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-primary/30 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-secondary-accent/20 h-full flex flex-col justify-between w-[300px] md:w-[400px]"
    >
      <div>
        <h3 className="font-display text-xl text-accent mb-3">{project.title}</h3>
        <p className="font-body text-text/90 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-background/50 text-text px-2 py-1 rounded-full text-xs border border-secondary-accent/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <a href={project.link} className="font-body text-accent inline-flex items-center group">
        View Project <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform"/>
      </a>
    </motion.div>
  );
};

const ProjectCarousel: React.FC = () => {
  const { personalProjects } = portfolioData;
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={carouselRef} className="relative h-[800px]">
      <div className="sticky top-1/4 left-0 w-full h-[400px] perspective-1000">
        <motion.div
          className="absolute top-0 left-0 w-full h-full transform-style-3d"
          style={{ rotateY: rotate }}
        >
          {personalProjects.map((project, index) => {
            const angle = (index / personalProjects.length) * 360;
            return (
              <motion.div
                key={index}
                className="absolute w-[300px] md:w-[400px] h-[250px] top-1/2 left-1/2 -mt-[125px] -ml-[150px] md:-ml-[200px]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(400px)`,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
