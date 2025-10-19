export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: {
    [key: string]: string[];
  };
  experience: {
    role: string;
    company: string;
    location: string;
    period: string;
    points: string[];
  }[];
  keyProjects: {
    title: string;
    description: string;
  }[];
  personalProjects: {
    title: string;
    description: string;
    tags: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}

export const portfolioData: PortfolioData = {
  name: "Sumanth Udupi",
  title: "Business Analyst | ESG, EHS, ERP & QMS | Agile, API, and Data-Driven Product Designer",
  about: "A strategic Business Analyst with a unique foundation in Systems Engineering and Data Science, skilled in bridging the gap between business requirements and technical solutions for clients like Volvo and PACCAR. A trusted partner through the entire software lifecycle with a proven ability to manage product roadmaps, write user stories in Gherkin syntax, and lead Agile ceremonies. Adept at collaborating with UX teams on Figma-based prototypes and using Postman and Swagger to validate and document REST API endpoints.",
  skills: {
    "Tools": ["Azure DevOps", "Jira", "MS Project", "Smartsheet"],
    "Data Analysis": ["SQL", "Excel", "Power BI", "Tableau", "ETL", "Superset", "Predictive Analytics"],
    "Business Analysis": ["Gherkin", "SDLC", "Agile", "User Stories", "Business Process Model and Notation (BPMN)"],
    "API & Architecture": ["Postman", "Swagger/OpenAPI", "REST API Integration"],
    "Design & Testing": ["Figma", "Proto.io", "UAT Planning & Execution", "Zephyr", "TestRail"],
    "Domains": ["ESG", "EHS", "ERP", "Automotive QMS", "Ad Tech"]
  },
  experience: [
    {
      role: "Integration Lead & Business Analyst",
      company: "RGBSI",
      location: "Bangalore, India",
      period: "07/2023 - Present",
      points: [
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
      period: "07/2022 - 07/2023",
      points: [
        "Analyzed ad violation patterns using Excel and Power BI to support global moderation workflows, contributing to a 150% increase in operational efficiency across international teams."
      ]
    }
  ],
  keyProjects: [
    {
      title: "EHS Platform for GRI & SASB Compliance",
      description: "Led end-to-end business analysis for a scalable EHS platform, ensuring compliance with GRI and SASB standards and reducing client audit prep time by 40%."
    },
    {
      title: "Volvo PPAP & PACCAR Non-Conformity Modules",
      description: "Gathered and documented requirements for Volvo's PPAP and PACCAR's Non-Conformity modules, streamlining lab test data workflows and enhancing supplier compliance reporting."
    },
    {
      title: "Process Performance Dashboards",
      description: "Developed interactive dashboards in Power BI to track process performance metrics across ESG, CAPA, and risk modules, improving executive reporting accuracy."
    },
    {
      title: "OEM API Integration",
      description: "Authored detailed API requirements for OEM integration with third-party systems, automating PPAP, product lifecycle and test result syncing across clients like Volvo, PACCAR and Trex."
    },
    {
      title: "AI/ML in Compliance Risk Modules",
      description: "Spearheaded business analysis for integrating AI/ML models into compliance risk modules, improving early risk detection accuracy by 20%."
    }
  ],
  personalProjects: [
      {
        title: "Project Alpha",
        description: "A brief description of Project Alpha.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#"
      },
      {
        title: "Project Beta",
        description: "A brief description of Project Beta.",
        tags: ["Python", "Flask", "SQLAlchemy"],
        link: "#"
      },
      {
        title: "Project Gamma",
        description: "A brief description of Project Gamma.",
        tags: ["Vue", "Firebase", "Vuetify"],
        link: "#"
      }
  ],
  education: [
    {
      degree: "Post Graduate Diploma, Data Science",
      institution: "Steinbeis University, Germany",
      year: "2022"
    },
    {
      degree: "B.E, Mechanical Engineering",
      institution: "Dayananda Sagar College",
      year: "2017-2021"
    }
  ],
  certifications: [
    {
      name: "UX Design Professional Certificate",
      issuer: "Google",
      date: "2025"
    },
    {
      name: "Business Analysis",
      issuer: "Microsoft and LinkedIn",
      date: "2025"
    },
    {
      name: "Agile Project Management",
      issuer: "Atlassian",
      date: "2025"
    },
    {
      name: "Machine Learning with Python",
      issuer: "IBM",
      date: "2024"
    }
  ],
  contact: {
    email: "sumanthudupi858@gmail.com",
    phone: "+91 9741712966",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/sumanth-udupi",
    github: "github.com/SumanthUdupi"
  }
};