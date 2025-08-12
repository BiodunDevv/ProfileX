"use client";

import React from "react";
import { TerminalProvider } from "../../components/Terminal/TerminalContext";
import Terminal from "../../components/Terminal/Terminal";

// Terminal Profile Interface
interface TerminalProfile {
  // Personal Information
  name: string;
  username: string;
  title: string;
  bio: string;
  location: string;
  profileImage: string;

  // Contact Information
  email: string;
  phone?: string;
  website?: string;

  // Social Links
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    behance?: string;
    dribbble?: string;
  };

  // Skills & Technologies
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
    cloud: string[];
    other: string[];
  };

  // Experience
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
    technologies: string[];
  }[];

  // Projects
  projects: {
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    featured: boolean;
  }[];

  // Education
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
  }[];

  // Theme & Styling
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    terminalBackground: string;
    textColor: string;
  };

  // Terminal Configuration
  terminal: {
    hostname: string;
    prompt: string;
    welcomeMessage: string;
    customCommands?: { [key: string]: string };
  };

  // Resume
  resume: {
    downloadUrl: string;
    filename: string;
  };
}

interface TemplateFiveProps {
  profile?: TerminalProfile;
}

const TemplateFive = () => {
  // Default data for Template Five
  const defaultTerminalProfile: TerminalProfile = {
    name: "Full Name",
    username: "devName",
    title: "Developer Title",
    bio: "Lorem ipsum dolor sit amet,z consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    location: "State, Country",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",

    email: "your.email@example.com",
    phone: "+1 (234) 567-8901",
    website: "#",

    social: {
      github: "https://github.com/BiodunDevv",
      linkedin: "#",
      twitter: "#",
      behance: "#",
    },

    skills: {
      languages: [
        "Language1",
        "Language2",
        "Language3",
        "Language4",
        "Language5",
      ],
      frameworks: [
        "Framework1",
        "Framework2",
        "Framework3",
        "Framework4",
        "Framework5",
      ],
      tools: ["Tool1", "Tool2", "Tool3", "Tool4", "Tool5"],
      databases: [
        "Database1",
        "Database2",
        "Database3",
        "Database4",
        "Database5",
      ],
      cloud: ["Cloud1", "Cloud2", "Cloud3", "Cloud4", "Cloud5"],
      other: ["Other1", "Other2", "Other3", "Other4", "Other5"],
    },

    experience: [
      {
        company: "Company1",
        position: "Position1",
        duration: "Start - End",
        location: "Location1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada.",
        technologies: ["Tech1", "Tech2", "Tech3"],
      },
      {
        company: "Company2",
        position: "Position2",
        duration: "Start - End",
        location: "Location2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada.",
        technologies: ["Tech1", "Tech2", "Tech3"],
      },
      {
        company: "Company3",
        position: "Position3",
        duration: "Start - End",
        location: "Location3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada.",
        technologies: ["Tech1", "Tech2", "Tech3"],
      },
    ],

    projects: [
      {
        name: "Project1",
        description:
          "This is a sample project description showcasing the project details and technologies used.",
        technologies: ["Tech1", "Tech2", "Tech3"],
        githubUrl: "#",
        liveUrl: "#",
        featured: true,
      },
      {
        name: "Terminal Portfolio",
        description:
          "This interactive terminal portfolio showcasing modern CLI interface patterns and keyboard-first navigation.",
        technologies: ["Next.js", "React", "Framer Motion", "TailwindCSS"],
        githubUrl: "https://github.com/dante-dev/terminal-portfolio",
        liveUrl: "https://dante-terminal.vercel.app",
        featured: true,
      },
      {
        name: "Project2",
        description:
          "This is a sample project description showcasing the project details and technologies used.",
        technologies: ["Tech1", "Tech2", "Tech3"],
        githubUrl: "#",
        liveUrl: "#",
        featured: true,
      },
      {
        name: "Project3",
        description:
          "This is a sample project description showcasing the project details and technologies used.",
        technologies: ["Tech1", "Tech2", "Tech3"],
        githubUrl: "#",
        liveUrl: "#",
        featured: true,
      },
    ],

    education: [
      {
        institution: "University1",
        degree: "Bachelor of Science",
        field: "Computer Science",
        duration: "Start - End",
        gpa: "0.0",
      },
      {
        institution: "University2",
        degree: "Master of Science",
        field: "Software Engineering",
        duration: "Start - End",
      },
    ],

    theme: {
      primaryColor: "#2D4A56", // Dark blue-green
      secondaryColor: "#4A7C59", // Forest green
      accentColor: "#D4AF37", // Gold
      backgroundColor: "#0F1419", // Dark background
      terminalBackground: "#1A1D23", // Slightly lighter
      textColor: "#E0E6ED", // Light gray
    },

    terminal: {
      hostname: "devName",
      prompt: "devName@portfolio",
      welcomeMessage: "Welcome to devName's Interactive Development Portfolio",
      customCommands: {
        whoami: "A passionate developer who writes code like poetry",
        pwd: "/home/devName/portfolio",
        ls: "about  projects  skills  experience  contact  resume",
      },
    },

    resume: {
      downloadUrl: "#",
      filename: "devName_Resume.pdf",
    },
  };

  const profileData = defaultTerminalProfile;

  return (
    <TerminalProvider profile={profileData}>
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, ${profileData.theme.backgroundColor}ee, ${profileData.theme.primaryColor}dd, ${profileData.theme.secondaryColor}cc)`,
        }}
      >
        <Terminal />
      </div>
    </TerminalProvider>
  );
};

export default TemplateFive;
