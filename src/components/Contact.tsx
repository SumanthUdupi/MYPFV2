import React from 'react';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useSound from '../hooks/useSound';

const Contact: React.FC = () => {
  const magneticRef = useMagneticEffect<HTMLAnchorElement>();
  const playClickSound = useSound(880, 0.05, 0.2);

  return (
    <section id="contact" className="p-10 bg-secondary">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Contact Me</h2>
      <div className="text-center">
        <p className="mb-4 text-primary">
          I'm currently available for freelance work. If you have a project in mind, please don't hesitate to get in touch.
        </p>
        <a
          ref={magneticRef}
          href="mailto:jules@example.com"
          className="bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-accent hover:text-primary btn-border-animate inline-block"
          onMouseEnter={playClickSound}
        >
          Email Me
        </a>
      </div>
    </section>
  );
};

export default Contact;