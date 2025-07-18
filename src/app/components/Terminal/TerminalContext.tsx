"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Terminal Profile Interface (moved from types.ts)
export interface TerminalProfile {
  name: string;
  username: string;
  title: string;
  bio: string;
  location: string;
  profileImage: string;
  email: string;
  phone?: string;
  website?: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    behance?: string;
    dribbble?: string;
  };
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
    cloud: string[];
    other: string[];
  };
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
    technologies: string[];
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    featured: boolean;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
  }[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    terminalBackground: string;
    textColor: string;
  };
  terminal: {
    hostname: string;
    prompt: string;
    welcomeMessage: string;
    customCommands?: { [key: string]: string };
  };
  resume: {
    downloadUrl: string;
    filename: string;
  };
}

// Default terminal profile
const defaultTerminalProfile: TerminalProfile = {
  name: "Developer",
  username: "dev",
  title: "Full-Stack Developer",
  bio: "Passionate developer who builds amazing digital experiences.",
  location: "San Francisco, CA",
  profileImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  email: "dev@portfolio.com",
  social: {
    github: "https://github.com/dev",
    linkedin: "https://linkedin.com/in/dev",
    twitter: "https://twitter.com/dev",
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Python"],
    frameworks: ["React", "Next.js", "Node.js"],
    tools: ["Git", "Docker", "VS Code"],
    databases: ["PostgreSQL", "MongoDB"],
    cloud: ["AWS", "Vercel"],
    other: ["GraphQL", "REST APIs"],
  },
  experience: [],
  projects: [],
  education: [],
  theme: {
    primaryColor: "#2D4A56",
    secondaryColor: "#4A7C59",
    accentColor: "#D4AF37",
    backgroundColor: "#0F1419",
    terminalBackground: "#1A1D23",
    textColor: "#E0E6ED",
  },
  terminal: {
    hostname: "dev",
    prompt: "dev@portfolio",
    welcomeMessage: "Welcome to the Interactive Portfolio Terminal",
  },
  resume: {
    downloadUrl: "#",
    filename: "resume.pdf",
  },
};

export interface TerminalEntry {
  id: string;
  command: string;
  output: ReactNode;
  timestamp: Date;
}

interface TerminalContextType {
  history: TerminalEntry[];
  addToHistory: (command: string, output: ReactNode) => void;
  clearHistory: () => void;
  commandHistory: string[];
  addToCommandHistory: (command: string) => void;
  profile: TerminalProfile;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};

interface TerminalProviderProps {
  children: ReactNode;
  profile?: TerminalProfile;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({
  children,
  profile = defaultTerminalProfile,
}) => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const addToHistory = (command: string, output: ReactNode) => {
    const entry: TerminalEntry = {
      id: Date.now().toString(),
      command,
      output,
      timestamp: new Date(),
    };
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const addToCommandHistory = (command: string) => {
    if (command.trim() && !commandHistory.includes(command)) {
      setCommandHistory((prev) => [...prev, command].slice(-50)); // Keep last 50 commands
    }
  };

  return (
    <TerminalContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        commandHistory,
        addToCommandHistory,
        profile,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
