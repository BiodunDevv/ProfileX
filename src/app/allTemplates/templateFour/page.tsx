"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Eye } from "lucide-react";
import Link from "next/link";
import Hero from "../../components/DualPersona/Hero";
import About from "../../components/DualPersona/About";
import Projects from "../../components/DualPersona/Projects";
import Tools from "../../components/DualPersona/Tools";
import Contact from "../../components/DualPersona/Contact";
import Toggle from "../../components/DualPersona/Toggle";

type Persona = "designer" | "developer";

const TemplateFour: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [activePersona, setActivePersona] = useState<Persona>("designer");

  // Mock data for the dual persona template
  const heroData = {
    designerName: "DevName - Designer",
    developerName: "DevName - Frontend",
    descriptionDesigner:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    descriptionDeveloper:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroImageDesigner:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    heroImageDeveloper:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
    socialLinks: [
      {
        name: "LinkedIn",
        icon: "linkedin",
        url: "https://linkedin.com/in/yourprofile",
      },
      {
        name: "Behance",
        icon: "behance",
        url: "https://behance.net/yourprofile",
      },
      { name: "GitHub", icon: "github", url: "https://github.com/yourprofile" },
      {
        name: "Dribbble",
        icon: "dribbble",
        url: "https://dribbble.com/yourprofile",
      },
    ],
  };

  const aboutData = {
    designer: {
      title: "Brand Designer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      skills: [
        { name: "SKill 1", level: 5 },
        { name: "Skill 2", level: 4 },
        { name: "Skill 3", level: 3 },
        { name: "Skill 4", level: 5 },
        { name: "Skill 5", level: 4 },
      ],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    },
    developer: {
      title: "Frontend Engineer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      skills: [
        { name: "Skill 1", level: 5 },
        { name: "Skill 2", level: 4 },
        { name: "Skill 3", level: 3 },
        { name: "Skill 4", level: 5 },
        { name: "Skill 5", level: 4 },
      ],
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
    },
  };

  const projectsData = [
    {
      id: 1,
      persona: "designer" as const,
      name: "Fluent Bank Redesign",
      description:
        "UI overhaul with a premium fintech feel and clear brand typography.",
      image:
        "https://images.unsplash.com/photo-1616803140344-6682afb13cda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZsdWVudCUyMGJhbmslMjByZWRlaWdufGVufDB8fDB8fHww",
      link: "https://behance.net/yourprofile",
      tags: ["UI/UX", "Brand Design", "Fintech"],
    },
    {
      id: 2,
      persona: "designer" as const,
      name: "Minimal E-commerce App",
      description:
        "Clean, conversion-focused design for a luxury fashion brand.",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60",
      link: "https://behance.net/yourprofile",
      tags: ["Mobile Design", "E-commerce", "Luxury"],
    },
    {
      id: 3,
      persona: "designer" as const,
      name: "Interactive Portfolio",
      description:
        "A fully interactive portfolio showcasing my design process and case studies.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
      link: "https://behance.net/yourprofile",
      tags: ["Web Design", "Portfolio", "Interactive"],
    },
    {
      id: 4,
      persona: "developer" as const,
      name: "Real-Time Portfolio",
      description:
        "Built a headless CMS-powered portfolio with animations and SSR for performance.",
      image:
        "https://images.unsplash.com/photo-1745531702766-38d8faf45a28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UmVhbCUyMHRpbWUlMjBwb2Vmb2xpb3xlbnwwfHwwfHx8MA%3D%3D",
      link: "https://github.com/yourportfolio",
      tags: ["Next.js", "CMS", "Performance"],
    },
    {
      id: 5,
      persona: "developer" as const,
      name: "Motion Dashboard",
      description:
        "Interactive analytics dashboard with smooth micro-interactions.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourportfolio",
      tags: ["React", "Framer Motion", "Analytics"],
    },
    {
      id: 6,
      persona: "developer" as const,
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with server-side rendering and dynamic routing.",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourportfolio",
      tags: ["Next.js", "E-commerce", "Full-Stack"],
    },
  ];

  const toolsData = {
    designer: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Spline",
      "Framer",
      "Principle",
    ],
    developer: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "TypeScript",
      "Vercel",
    ],
  };

  const contactData = {
    email: "connect@yourmail.com",
    phone: "+1234567890",
    location: "City, Country",
    socials: [
      {
        name: "LinkedIn",
        icon: "linkedin",
        url: "https://linkedin.com/in/yourprofile",
      },
      {
        name: "Behance",
        icon: "behance",
        url: "https://behance.net/yourprofile",
      },
      { name: "GitHub", icon: "github", url: "https://github.com/yourprofile" },
      {
        name: "Dribbble",
        icon: "dribbble",
        url: "https://dribbble.com/yourprofile",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#1A1D29] text-white overflow-x-hidden">
      {/* Show preview banner for unauthenticated users or when explicitly on templatePreview page */}
      {(!isAuthenticated || pathname.includes("/templatePreview")) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-400 py-3 flex justify-center items-center"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Eye className="h-4 w-4" />
              <span>
                {!isAuthenticated
                  ? "Template Preview - Sign in to create your own portfolio"
                  : "Template Preview Mode"}
              </span>
            </div>
            {!isAuthenticated && (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 bg-amber-900 text-amber-50 rounded-lg hover:bg-amber-800 transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-amber-900 rounded-lg hover:bg-amber-50 transition-colors font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Toggle Component */}
        <Toggle
          activePersona={activePersona}
          setActivePersona={setActivePersona}
        />

        {/* Hero Section */}
        <Hero activePersona={activePersona} heroData={heroData} />

        {/* About Section */}
        <About activePersona={activePersona} aboutData={aboutData} />

        {/* Projects Section */}
        <Projects activePersona={activePersona} projectsData={projectsData} />

        {/* Tools Section */}
        <Tools activePersona={activePersona} toolsData={toolsData} />

        {/* Contact Section */}
        <Contact activePersona={activePersona} contactData={contactData} />
      </motion.div>
    </div>
  );
};

export default TemplateFour;
