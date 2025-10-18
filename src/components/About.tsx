import React from 'react';
import { motion } from 'framer-motion';
import { useTilt3D } from '../hooks/useTilt3D';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About: React.FC = () => {
  const skillsCard = useTilt3D();
  const expCard = useTilt3D();

  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-accent rounded-full opacity-3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full opacity-3 blur-3xl"></div>

      <div className="max-w-4xl relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"
          variants={itemVariants}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-lg text-secondary/90 leading-relaxed">
              I'm a creative developer and designer with a passion for building beautiful and functional web applications that users love.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed">
              With expertise in React, TypeScript, and modern CSS frameworks, I craft digital experiences that blend aesthetics with functionality.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed">
              I'm always seeking new challenges and opportunities to push the boundaries of what's possible in web design and development.
            </p>
          </motion.div>
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              ref={skillsCard.ref}
              style={skillsCard.style}
              onMouseMove={skillsCard.handleMouseMove}
              onMouseLeave={skillsCard.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-colors duration-300 backdrop-blur-sm"
            >
              <h3 className="text-accent-light font-bold mb-3 text-lg">✨ Skills</h3>
              <ul className="text-secondary/80 space-y-2 text-sm">
                <li>• React & TypeScript</li>
                <li>• Tailwind CSS & Modern CSS</li>
                <li>• UI/UX Design</li>
                <li>• Web Animation & 3D</li>
                <li>• Performance Optimization</li>
              </ul>
            </motion.div>
            <motion.div
              ref={expCard.ref}
              style={expCard.style}
              onMouseMove={expCard.handleMouseMove}
              onMouseLeave={expCard.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-colors duration-300 backdrop-blur-sm"
            >
              <h3 className="text-accent-light font-bold mb-3 text-lg">🏆 Experience</h3>
              <p className="text-secondary/80 text-sm">
                Several years of professional experience building web applications, designing user interfaces, and delivering exceptional digital products.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
