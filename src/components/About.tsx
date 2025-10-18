import React from 'react';
import { useTilt3D } from '../hooks/useTilt3D';

const About: React.FC = () => {
  const skillsCard = useTilt3D();
  const expCard = useTilt3D();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-accent rounded-full opacity-3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full opacity-3 blur-3xl"></div>

      <div className="max-w-4xl relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent fade-in-up">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-secondary/90 leading-relaxed fade-in-up" style={{ animationDelay: '0.1s' }}>
              I'm a creative developer and designer with a passion for building beautiful and functional web applications that users love.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              With expertise in React, TypeScript, and modern CSS frameworks, I craft digital experiences that blend aesthetics with functionality.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
              I'm always seeking new challenges and opportunities to push the boundaries of what's possible in web design and development.
            </p>
          </div>
          <div className="space-y-4">
            <div
              ref={skillsCard.ref}
              style={{ transform: skillsCard.transform }}
              className="p-6 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm fade-in-up"
              style={{ animationDelay: '0.2s' } as React.CSSProperties}
            >
              <h3 className="text-accent-light font-bold mb-3 text-lg">✨ Skills</h3>
              <ul className="text-secondary/80 space-y-2 text-sm">
                <li>• React & TypeScript</li>
                <li>• Tailwind CSS & Modern CSS</li>
                <li>• UI/UX Design</li>
                <li>• Web Animation & 3D</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
            <div
              ref={expCard.ref}
              style={{ transform: expCard.transform }}
              className="p-6 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm fade-in-up"
              style={{ animationDelay: '0.3s' } as React.CSSProperties}
            >
              <h3 className="text-accent-light font-bold mb-3 text-lg">🏆 Experience</h3>
              <p className="text-secondary/80 text-sm">
                Several years of professional experience building web applications, designing user interfaces, and delivering exceptional digital products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
