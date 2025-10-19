import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gold-500 tracking-wider">About Me</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-justify">
            A strategic Business Analyst with a unique foundation in Systems Engineering and Data Science, skilled in bridging the gap between business requirements and technical solutions for clients like Volvo and PACCAR. A trusted partner through the entire software lifecycle with a proven ability to manage product roadmaps, write user stories in Gherkin syntax, and lead Agile ceremonies. Adept at collaborating with UX teams on Figma-based prototypes and using Postman and Swagger to validate and document REST API endpoints.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
