import React from 'react';
import { useTilt3D } from '../hooks/useTilt3D';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useSound from '../hooks/useSound';

const Contact: React.FC = () => {
  const magneticRef = useMagneticEffect<HTMLAnchorElement>();
  const playClickSound = useSound(880, 0.05, 0.2);
  const cardTilt = useTilt3D();

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative golden glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl"></div>

      <div className="max-w-3xl text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent fade-in-up">
          Let's Work Together
        </h2>
        <p className="text-xl text-secondary/80 mb-12 leading-relaxed fade-in-up" style={{ animationDelay: '0.1s' }}>
          I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to chat about design and development, feel free to reach out!
        </p>
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a
            ref={magneticRef}
            href="mailto:jules@example.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-dark font-bold rounded-lg hover:shadow-2xl hover:shadow-accent/70 transition-all duration-300 transform hover:scale-110 relative group overflow-hidden"
            onMouseEnter={playClickSound}
          >
            <span className="relative z-10">Send Me an Email</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          </a>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div
            ref={cardTilt.ref}
            style={{ transform: cardTilt.transform, animationDelay: '0.3s' }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm fade-in-up group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">💻</div>
            <h3 className="text-accent-light font-bold mb-2">Web Design</h3>
            <p className="text-secondary/70 text-sm">Beautiful, responsive designs</p>
          </div>
          <div
            ref={cardTilt.ref}
            style={{ transform: cardTilt.transform, animationDelay: '0.4s' }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm fade-in-up group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 className="text-accent-light font-bold mb-2">Development</h3>
            <p className="text-secondary/70 text-sm">Fast, scalable applications</p>
          </div>
          <div
            ref={cardTilt.ref}
            style={{ transform: cardTilt.transform, animationDelay: '0.5s' }}
            className="p-8 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm fade-in-up group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎨</div>
            <h3 className="text-accent-light font-bold mb-2">Animation</h3>
            <p className="text-secondary/70 text-sm">Smooth, engaging interactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
