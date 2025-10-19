export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string[];
  className: string;
}

export const experiences: Experience[] = [
  {
    title: 'Integration Lead & Business Analyst',
    company: 'RGBSI',
    date: '07/2023 - Present',
    description: [
      'Authored 200+ Gherkin-based user stories for modules such as PPAP, Non-Conformity, and Risk Assessment, maintaining prioritization in Azure DevOps and Jira to streamline handoffs and reduce requirement-related queries by 30%.',
      'Led Agile ceremonies (sprint planning, backlog grooming, sprint reviews) for a 7-member cross-functional squad, accelerating feature delivery by 15%.',
      'Partnered with UX teams to prototype EHS and PO Management workflows in Figma, Axure, and Balsamiq, enhancing usability and reducing design iteration cycles by 20%.',
      'Validated and documented REST APIs using Postman and optimized Swagger/OpenAPI specifications to enable seamless integration of features like Compliance, PPAP, Supplier Management and PLM reducing API defects by 25%.',
      'Created UAT plans in Zephyr for modules including Audit, Work Permit, and Incident Management; coordinated execution and obtained stakeholder sign-off from clients such as Volvo, PACCAR, and Trex.',
      'Queried MSSQL databases to build Superset dashboards tracking adoption of ESG and EHS tools, leading to a 10% improvement in customer satisfaction among enterprise clients.',
      'Oversaw SDLC compliance with GRI, SASB, and OSHA standards while mitigating risks, enabling delivery of ESG and EHS modules 15% ahead of project deadlines.',
      'Participated in global discovery sessions with stakeholders across Volvo, DAF, and Eaton to analyze existing ESG processes and align implementation timelines with regulatory expectations.',
    ],
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Advertisement Moderator & Analyst',
    company: 'Amazon',
    date: '07/2022 - 07/2023',
    description: [
      'Analyzed ad violation patterns using Excel and Power BI to support global moderation workflows, contributing to a 150% increase in operational efficiency across international teams.',
    ],
    className: '',
  },
  {
    title: 'Post Graduate Diploma, Data Science',
    company: 'Steinbeis University, Germany',
    date: 'Completed 2022',
    description: [],
    className: '',
  },
  {
    title: 'B.E, Mechanical Engineering',
    company: 'Dayananda Sagar College',
    date: '2017-2021',
    description: [],
    className: '',
  },
];
