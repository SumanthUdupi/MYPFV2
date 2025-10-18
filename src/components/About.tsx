import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-secondary/90 leading-relaxed">
              I'm a creative developer and designer with a passion for building beautiful and functional web applications that users love.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed">
              With expertise in React, TypeScript, and modern CSS frameworks, I craft digital experiences that blend aesthetics with functionality.
            </p>
            <p className="text-lg text-secondary/90 leading-relaxed">
              I'm always seeking new challenges and opportunities to push the boundaries of what's possible in web design and development.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors">
              <h3 className="text-accent-light font-bold mb-3">Skills</h3>
              <ul className="text-secondary/80 space-y-2 text-sm">
                <li>• React & TypeScript</li>
                <li>• Tailwind CSS & Modern CSS</li>
                <li>• UI/UX Design</li>
                <li>• Web Animation & 3D</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors">
              <h3 className="text-accent-light font-bold mb-3">Experience</h3>
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
