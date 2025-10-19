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
  name: "Your Name",
  title: "Your Title",
  about: "About you...",
  skills: {},
  experience: [],
  keyProjects: [],
  personalProjects: [],
  education: [],
  certifications: [],
  contact: {
    email: "your.email@example.com",
    phone: "+1234567890",
    location: "Your City, Country",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourprofile",
  },
};