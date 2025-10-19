import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Integration Lead & Business Analyst",
    company: "RGBSI",
    location: "Bangalore, India",
    date: "07/2023 - Present",
    description: [
      "Authored 200+ Gherkin-based user stories for modules such as PPAP, Non-Conformity, and Risk Assessment, maintaining prioritization in Azure DevOps and Jira to streamline handoffs and reduce requirement-related queries by 30%.",
      "Led Agile ceremonies (sprint planning, backlog grooming, sprint reviews) for a 7-member cross-functional squad, accelerating feature delivery by 15%.",
      "Partnered with UX teams to prototype EHS and PO Management workflows in Figma, Axure, and Balsamiq, enhancing usability and reducing design iteration cycles by 20%.",
      "Validated and documented REST APIs using Postman and optimized Swagger/OpenAPI specifications to enable seamless integration of features like Compliance, PPAP, Supplier Management and PLM reducing API defects by 25%.",
      "Created UAT plans in Zephyr for modules including Audit, Work Permit, and Incident Management; coordinated execution and obtained stakeholder sign-off from clients such as Volvo, PACCAR, and Trex.",
      "Queried MSSQL databases to build Superset dashboards tracking adoption of ESG and EHS tools, leading to a 10% improvement in customer satisfaction among enterprise clients.",
      "Oversaw SDLC compliance with GRI, SASB, and OSHA standards while mitigating risks, enabling delivery of ESG and EHS modules 15% ahead of project deadlines.",
      "Participated in global discovery sessions with stakeholders across Volvo, DAF, and Eaton to analyze existing ESG processes and align implementation timelines with regulatory expectations."
    ]
  },
  {
    role: "Advertisement Moderator & Analyst",
    company: "Amazon",
    location: "Bangalore, India",
    date: "07/2022 - 07/2023",
    description: [
      "Analyzed ad violation patterns using Excel and Power BI to support global moderation workflows, contributing to a 150% increase in operational efficiency across international teams."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <motion.section
      id="experience"
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
        <h2 className="text-4xl font-bold text-center mb-12 text-gold-500 tracking-wider">Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-gold-500 pl-8">
              <h3 className="text-2xl font-bold">{exp.role}</h3>
              <p className="text-lg text-gold-500">{exp.company} | {exp.location} | {exp.date}</p>
              <ul className="mt-4 list-disc list-inside">
                {exp.description.map((desc, i) => (
                  <li key={i} className="mb-2">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
