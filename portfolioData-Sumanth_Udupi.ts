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
  name: "SUMANTH UDUPI",
  title: "STRATEGIC DESIGN. DATA-DRIVEN SOLUTIONS.",
  about: "I architect clarity from complexity. With a foundation in Systems Engineering and Data Science, I bridge the critical gap between ambitious business goals and elegant technical execution. For industry leaders like Volvo and PACCAR, I am a trusted partner through the entire software lifecycle—designing product roadmaps, crafting precision user stories, and ensuring flawless delivery in an Agile world. I don't just manage products; I bring them to life.",
  skills: {
    "Tools": ["Azure DevOps", "Jira", "MS Project", "Smartsheet"],
    "Data Analysis": ["SQL", "Excel", "Power BI", "Tableau", "ETL", "Superset", "Predictive Analytics"],
    "Business Analysis": ["Gherkin", "SDLC", "Agile", "User Stories", "BPMN"],
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
        "Reduced ambiguity by 30% by authoring 200+ precision Gherkin user stories for core modules like PPAP and Risk Assessment.",
        "Accelerated feature delivery by 15% by leading Agile ceremonies for a 7-member cross-functional squad.",
        "Cut design iterations by 20% through close collaboration with UX teams on high-fidelity prototypes in Figma and Axure.",
        "Eliminated 25% of API defects by optimizing Swagger/OpenAPI specifications and validating REST APIs with Postman.",
        "Built and managed UAT plans in Zephyr for clients like Volvo and PACCAR, ensuring stakeholder sign-off on key modules.",
        "Improved customer satisfaction by 10% among enterprise clients by building Superset dashboards to track ESG/EHS tool adoption."
      ]
    },
    {
      role: "Advertisement Moderator & Analyst",
      company: "Amazon",
      location: "Bangalore, India",
      period: "07/2022 - 07/2023",
      points: [
        "Increased operational efficiency by 150% across international teams by analyzing ad violation patterns using Excel and Power BI."
      ]
    }
  ],
  keyProjects: [
    {
      title: "Enterprise EHS Platform",
      description: "Led end-to-end business analysis for a scalable EHS platform, ensuring compliance with GRI and SASB standards and reducing client audit prep time by 40%."
    },
    {
      title: "OEM Parts & Compliance Modules",
      description: "Gathered and documented requirements for Volvo's PPAP and PACCAR's Non-Conformity modules, streamlining lab test data workflows."
    },
    {
      title: "Automated API Integration",
      description: "Authored detailed API requirements for OEM integration with third-party systems, automating PPAP and product lifecycle data syncing."
    }
  ],
  personalProjects: [
    {
      title: "Project Alpha",
      description: "An exploration of generative art and its applications in modern web design, using Three.js and GLSL shaders."
    },
    {
      title: "Project Beta",
      description: "A full-stack application for tracking personal carbon footprint, built with React, Node.js, and a PostgreSQL database."
    },
    {
      title: "Project Gamma",
      description: "A mobile-first UI/UX concept for a luxury e-commerce brand, designed in Figma and prototyped with Proto.io."
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
      year: "2021"
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