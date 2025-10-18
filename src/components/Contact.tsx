import React from 'react';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useSound from '../hooks/useSound';

const Contact: React.FC = () => {
  const magneticRef = useMagneticEffect<HTMLAnchorElement>();
  const playClickSound = useSound(880, 0.05, 0.2);

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-3xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
          Let's Work Together
        </h2>
        <p className="text-xl text-secondary/80 mb-12 leading-relaxed">
          I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to chat about design and development, feel free to reach out!
        </p>
        <a
          ref={magneticRef}
          href="mailto:jules@example.com"
          className="inline-block px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105"
          onMouseEnter={playClickSound}
        >
          Send Me an Email
        </a>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-accent-light font-bold mb-2">Web Design</h3>
            <p className="text-secondary/70 text-sm">Beautiful, responsive designs</p>
          </div>
          <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-accent-light font-bold mb-2">Development</h3>
            <p className="text-secondary/70 text-sm">Fast, scalable applications</p>
          </div>
          <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-accent-light font-bold mb-2">Animation</h3>
            <p className="text-secondary/70 text-sm">Smooth, engaging interactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
