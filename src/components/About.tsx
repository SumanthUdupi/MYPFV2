import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-accent">
            About Me
          </h2>
          <div className="w-24 h-0.5 bg-accent/50 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-lg text-text/80 leading-relaxed">
            <p>
              I'm a creative developer and designer with a passion for building beautiful and functional web applications that users love.
            </p>
            <p>
              With expertise in React, TypeScript, and modern CSS frameworks, I craft digital experiences that blend aesthetics with functionality.
            </p>
            <p>
              I'm always seeking new challenges and opportunities to push the boundaries of what's possible in web design and development.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="p-6 bg-primary rounded-lg border border-white/10">
              <h3 className="font-display text-xl text-accent mb-3">Skills</h3>
              <ul className="text-text/70 space-y-2 font-body">
                <li>• React & TypeScript</li>
                <li>• Tailwind CSS & Modern CSS</li>
                <li>• UI/UX Design</li>
                <li>• Web Animation & 3D (Three.js)</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
            <div className="p-6 bg-primary rounded-lg border border-white/10">
              <h3 className="font-display text-xl text-accent mb-3">Experience</h3>
              <p className="text-text/70 font-body">
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