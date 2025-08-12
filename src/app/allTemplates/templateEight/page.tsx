"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/TemplateEight/Hero";
import About from "../../components/TemplateEight/About";
import Skills from "../../components/TemplateEight/Skills";
import Certifications from "../../components/TemplateEight/Certifications";
import Projects from "../../components/TemplateEight/Projects";
import Tools from "../../components/TemplateEight/Tools";
import Contact from "../../components/TemplateEight/Contact";
import Navigation from "../../components/TemplateEight/Navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Loader2, PencilIcon, Home, ChevronLeft, Eye } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Preloader from "@/app/components/UI/Preloader";

// TypeScript interfaces

export interface NavigationItem {
  DevName: string;
}

export interface HeroSocialLink {
  platform: string;
  url: string;
  icon: string; // Available icons: "Github", "Linkedin", "Mail", "Twitter", "Globe", "Website", "ExternalLink"
}

export interface HeroData {
  title: string;
  DevName: string;
  description: string;
  heroImage: string;
  certifications: string[];
  availableFor: string[];
  resumeFile?: string;
  socialLinks?: HeroSocialLink[]; // Optional: Add only the social platforms you want to display
}

export interface ExperienceItem {
  role: string;
  company: string;
  year: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  color: string;
}

export interface AboutData {
  bio: string;
  experience: ExperienceItem[];
  stats: StatItem[];
}

export interface SkillsData {
  redTeam: string[];
  blueTeam: string[];
  scripting: string[];
  other: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface ProjectItem {
  id: number;
  type: string; // "Red Team", "Blue Team", "Tooling", "Research", "CTF", "Vulnerability Research"
  name: string;
  description: string;
  sourceLink: string; // GitHub repo link
  demoLink?: string; // Optional demo/live link
  technologies?: string[]; // Tech stack used
  status?: string; // "Completed", "In Progress", "Archived"
  year?: string; // Project year
  featured?: boolean; // Whether to highlight this project
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactData {
  email: string;
  pgp: string;
  social: SocialLink[];
}

export interface ToolItem {
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  proficiency: number;
}

export interface TemplateEightData {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  certifications: CertificationItem[];
  projects: ProjectItem[];
  tools: ToolItem[];
  contact: ContactData;
}

// Default mock data
const defaultData: TemplateEightData = {
  hero: {
    title: "Cybersecurity Engineer & Threat Hunter",
    DevName: "ZeroDayNinja",
    description:
      "I break systems to make them safer. Passionate about red teaming, exploit research, and cloud security.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1661764393655-1dbffee8c0ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3liZXIlMjBzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D",
    certifications: ["OSCP", "Security+", "TryHackMe Top 5%"],
    availableFor: ["Penetration Testing", "Security Engineering", "CTI"],
    // Cloudinary file URL for resume - supports PDF, DOC, DOCX formats
    // Format: https://res.cloudinary.com/your-cloud-name/raw/upload/v1234567890/path/filename.pdf
    resumeFile:
      "https://res.cloudinary.com/your-cloud-name/raw/upload/v1234567890/resumes/zerodayninja-resume.pdf",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/zerodayninja",
        icon: "Github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/zerodayninja",
        icon: "Linkedin",
      },
      {
        platform: "Email",
        url: "mailto:zeroday@protonmail.com",
        icon: "Mail",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/zerodayninja",
        icon: "Twitter",
      },
      {
        platform: "Website",
        url: "https://zerodayninja.com",
        icon: "Globe",
      },
    ],
  },
  about: {
    bio: "With over 4 years in cybersecurity, I've worked on red team simulations, network hardening, and building security pipelines for CI/CD. I love scripting, breaking things, and then writing reports to make sure they don't happen again. I also enjoy mentoring junior analysts and sharing knowledge through writeups and talks. I believe in continuous learning and staying updated with the latest threats and technologies.",
    experience: [
      {
        role: "Red Team Intern",
        company: "CyberFox",
        year: "2023",
        description:
          "Built custom payloads, performed phishing simulations, documented attack paths.",
      },
      {
        role: "SOC Analyst",
        company: "ShieldSec",
        year: "2022",
        description:
          "Monitored alerts using Splunk, investigated suspicious activity, escalated incidents.",
      },
    ],
    stats: [
      {
        value: "4+",
        label: "Years Experience",
        color: "#22C55E",
      },
      {
        value: "50+",
        label: "Security Assessments",
        color: "#A855F7",
      },
      {
        value: "15+",
        label: "CTF Wins",
        color: "#38BDF8",
      },
      {
        value: "3",
        label: "Certifications",
        color: "#F59E0B",
      },
    ],
  },
  skills: {
    redTeam: ["Burp Suite", "Metasploit", "Cobalt Strike", "PowerShell"],
    blueTeam: ["Wireshark", "Splunk", "Sysmon", "ELK Stack"],
    scripting: ["Python", "Bash", "PowerShell"],
    other: ["MITRE ATT&CK", "OWASP Top 10", "Zero Trust"],
  },
  certifications: [
    { title: "OSCP", issuer: "Offensive Security", year: "2024" },
    {
      title: "Google Cybersecurity Certificate",
      issuer: "Coursera",
      year: "2023",
    },
    { title: "TryHackMe Advent of Cyber", issuer: "TryHackMe", year: "2022" },
  ],
  // Projects: Add your cybersecurity projects, tools, and research here
  // Each project can be categorized by type: "Red Team", "Blue Team", "Tooling", "CTF", "Vulnerability Research", "Research"
  // Set featured: true for projects you want to highlight
  projects: [
    {
      id: 1,
      type: "Tooling",
      name: "AutoReconX",
      description:
        "An automated Python tool for network reconnaissance with Nmap, WhatWeb, and Gobuster integration. Features subdomain enumeration, port scanning, and vulnerability detection.",
      sourceLink: "https://github.com/zerodayninja/AutoReconX",
      demoLink: "https://github.com/zerodayninja/AutoReconX",
      technologies: ["Python", "Nmap", "Gobuster", "WhatWeb"],
      status: "Completed",
      year: "2024",
      featured: true,
    },
    {
      id: 2,
      type: "Red Team",
      name: "PhishSim",
      description:
        "A simulated phishing email generator for internal training with real SMTP attack flows. Includes payload generation and social engineering templates.",
      sourceLink: "https://github.com/zerodayninja/PhishSim",
      technologies: ["Python", "SMTP", "HTML", "CSS"],
      status: "Completed",
      year: "2024",
      featured: true,
    },
    {
      id: 3,
      type: "Blue Team",
      name: "ThreatHunter",
      description:
        "SIEM rule engine for threat hunting with Sigma rules integration. Analyzes logs from multiple sources and generates actionable alerts.",
      sourceLink: "https://github.com/zerodayninja/ThreatHunter",
      technologies: ["Python", "Elasticsearch", "Sigma", "YAML"],
      status: "In Progress",
      year: "2024",
      featured: false,
    },
    {
      id: 4,
      type: "CTF",
      name: "CTF-Toolkit",
      description:
        "Collection of scripts and tools for CTF competitions. Includes crypto solvers, forensics utilities, and exploit templates.",
      sourceLink: "https://github.com/zerodayninja/CTF-Toolkit",
      technologies: ["Python", "Bash", "Cryptography", "Forensics"],
      status: "Completed",
      year: "2023",
      featured: false,
    },
    {
      id: 5,
      type: "Vulnerability Research",
      name: "WebApp-Scanner",
      description:
        "Custom web application vulnerability scanner with SQL injection, XSS, and CSRF detection capabilities.",
      sourceLink: "https://github.com/zerodayninja/WebApp-Scanner",
      technologies: ["Python", "BeautifulSoup", "Requests", "Selenium"],
      status: "Archived",
      year: "2023",
      featured: false,
    },
    {
      id: 6,
      type: "Research",
      name: "Malware-Analysis-Lab",
      description:
        "Docker-based malware analysis environment with automated sandbox execution and behavior analysis.",
      sourceLink: "https://github.com/zerodayninja/Malware-Analysis-Lab",
      technologies: ["Docker", "Python", "YARA", "Volatility"],
      status: "Completed",
      year: "2024",
      featured: true,
    },
  ],
  tools: [
    // Reconnaissance
    {
      name: "Nmap",
      category: "reconnaissance",
      icon: "Network",
      color: "#22C55E",
      description: "Network discovery and security auditing",
      proficiency: 95,
    },
    {
      name: "Masscan",
      category: "reconnaissance",
      icon: "Search",
      color: "#3B82F6",
      description: "High-speed port scanner",
      proficiency: 85,
    },
    // Exploitation
    {
      name: "Metasploit",
      category: "exploitation",
      icon: "Bug",
      color: "#EF4444",
      description: "Penetration testing framework",
      proficiency: 92,
    },
    {
      name: "Burp Suite",
      category: "exploitation",
      icon: "Shield",
      color: "#F59E0B",
      description: "Web application security testing",
      proficiency: 95,
    },
    // Post-Exploitation
    {
      name: "Cobalt Strike",
      category: "post-exploitation",
      icon: "Zap",
      color: "#EF4444",
      description: "Adversary simulation platform",
      proficiency: 87,
    },
    {
      name: "Mimikatz",
      category: "post-exploitation",
      icon: "Lock",
      color: "#F59E0B",
      description: "Windows credential extraction",
      proficiency: 90,
    },
    // Defense
    {
      name: "Splunk",
      category: "defense",
      icon: "Eye",
      color: "#22C55E",
      description: "Security information and event management",
      proficiency: 90,
    },
    {
      name: "Wireshark",
      category: "defense",
      icon: "Network",
      color: "#3B82F6",
      description: "Network protocol analyzer",
      proficiency: 93,
    },
    // Analysis
    {
      name: "Volatility",
      category: "analysis",
      icon: "FileText",
      color: "#A855F7",
      description: "Memory forensics framework",
      proficiency: 85,
    },
    {
      name: "GHIDRA",
      category: "analysis",
      icon: "Bug",
      color: "#22C55E",
      description: "Software reverse engineering suite",
      proficiency: 75,
    },
    // Malware Analysis
    {
      name: "Cuckoo",
      category: "malware-analysis",
      icon: "Eye",
      color: "#10B981",
      description: "Automated malware analysis system",
      proficiency: 82,
    },
    {
      name: "IDA Pro",
      category: "malware-analysis",
      icon: "Terminal",
      color: "#EF4444",
      description: "Disassembler and debugger",
      proficiency: 78,
    },
  ],
  
  contact: {
    email: "zeroday@protonmail.com",
    pgp: "https://zerodayninja.com/pgp.asc",
    social: [
      { platform: "GitHub", url: "https://github.com/zerodayninja" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/zerodayninja" },
      { platform: "TryHackMe", url: "https://tryhackme.com/p/zerodayninja" },
    ],
  },
};

const TemplateEightPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TemplateEightData>(defaultData);
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Preloader
        loadingText="Loading Template..."
        loadingSubtitle="Please wait while we load this template."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 via-transparent to-[#A855F7]/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill-opacity=%220.02%22%3E%3Cpath fill=%22%2338BDF8%22 d=%22M20 20c0-11.046-8.954-20-20-20v20h20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Floating gradient orbs - responsive sizes */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#22C55E]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#38BDF8]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#A855F7]/5 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Matrix-style dots */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#38BDF8] rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navigation DevName={data.hero.DevName} />

      {/* Enhanced Edit Controls - Mobile Responsive */}

      {/* Main Content */}
      <main className="relative z-10">
        <Hero data={data.hero} />
        <About data={data.about} />
        <Skills data={data.skills} />
        <Certifications data={data.certifications} />
        <Projects data={data.projects} />
        <Tools data={data.tools} />
        <Contact data={data.contact} />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default TemplateEightPage;
