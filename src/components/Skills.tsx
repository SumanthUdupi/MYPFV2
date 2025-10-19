import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Azure DevOps", "Jira", "MS Project", "Smartsheet",
  "SQL", "Excel", "Power BI", "Tableau", "ETL", "Superset", "Predictive Analytics",
  "Gherkin", "SDLC", "Agile", "User Stories", "BPMN",
  "Postman", "Swagger/OpenAPI", "REST API Integration",
  "Figma", "Proto.io", "UAT Planning & Execution", "Zephyr", "TestRail",
  "ESG", "EHS", "ERP", "Automotive QMS", "Ad Tech"
];

const Skills: React.FC = () => {
  return (
    <motion.section
      id="skills"
      className="py-20 bg-gray-900"
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
        <h2 className="text-4xl font-bold text-center mb-12 text-gold-500 tracking-wider">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 text-white py-2 px-4 border border-gold-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
