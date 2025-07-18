"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cover from "../../components/TemplateSix/Cover";
import About from "../../components/TemplateSix/About";
import Experience from "../../components/TemplateSix/Experience";
import Education from "../../components/TemplateSix/Education";
import Skills from "../../components/TemplateSix/Skills";
import Projects from "../../components/TemplateSix/Projects";
import Certifications from "../../components/TemplateSix/Certifications";
import Testimonials from "../../components/TemplateSix/Testimonials";
import Contact from "../../components/TemplateSix/Contact";
import DownloadPDF from "../../components/TemplateSix/DownloadPDF";

// Portfolio Data Interface
interface PortfolioData {
  personal: {
    name: string;
    title: string;
    summary: string;
    location: string;
    email: string;
    phone?: string;
    website?: string;
    image: string;
  };
  experience: {
    role: string;
    company: string;
    duration: string;
    location: string;
    summary: string;
    achievements: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    duration: string;
    gpa?: string;
    honors?: string[];
  }[];
  skills: {
    core: string[];
    technical: string[];
    tools: string[];
    languages: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    image?: string;
    featured: boolean;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    company: string;
    quote: string;
    image?: string;
  }[];
  social: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    behance?: string;
    dribbble?: string;
  };
}

const TemplateSix = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Default portfolio data
  const portfolioData: PortfolioData = {
    personal: {
      name: "Amara Okafor",
      title: "Creative Strategist & UX Writer",
      summary:
        "Blending clarity, story, and visuals to craft magnetic brands and products that resonate with global audiences and drive meaningful engagement.",
      location: "Lagos, Nigeria",
      email: "amara@papertrailpro.io",
      phone: "+234 (0) 123 456 7890",
      website: "www.amaraokafor.com",
      image:
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    },
    experience: [
      {
        role: "Senior UX Writer",
        company: "Google",
        duration: "2021 – Present",
        location: "Mountain View, CA",
        summary:
          "Defined UX microcopy for Google Docs and internal CMS. Partnered with Product Design on launch flows.",
        achievements: [
          "Improved user onboarding completion by 34% through strategic copy optimization",
          "Led content strategy for 3 product launches reaching 50M+ users",
          "Established design system documentation standards adopted across 5 teams",
        ],
      },
      {
        role: "Content Design Lead",
        company: "Meta",
        duration: "2019 – 2021",
        location: "Menlo Park, CA",
        summary:
          "Spearheaded content design for Facebook Business tools and advertising platforms.",
        achievements: [
          "Redesigned ad creation flow resulting in 28% increase in campaign completion",
          "Built content guidelines used by 40+ international design teams",
          "Mentored 8 junior designers and writers across product teams",
        ],
      },
      {
        role: "UX Writer",
        company: "Airbnb",
        duration: "2017 – 2019",
        location: "San Francisco, CA",
        summary:
          "Crafted user-facing copy for booking flows and host onboarding experiences.",
        achievements: [
          "Optimized booking flow copy leading to 15% increase in conversions",
          "Localized content for 12 international markets",
          "Collaborated with legal team to ensure compliance across global regulations",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Fine Arts in Creative Writing",
        institution: "Stanford University",
        duration: "2015 – 2017",
        gpa: "3.9",
        honors: ["Dean's List", "Graduate Fellowship Recipient"],
      },
      {
        degree: "Bachelor of Arts in English Literature",
        institution: "University of Lagos",
        duration: "2011 – 2015",
        gpa: "First Class Honours",
        honors: ["Valedictorian", "English Department Award"],
      },
    ],
    skills: {
      core: [
        "UX Writing",
        "Design Thinking",
        "Product Strategy",
        "Content Design",
        "User Research",
      ],
      technical: [
        "Information Architecture",
        "Conversion Optimization",
        "A/B Testing",
        "Accessibility Design",
      ],
      tools: [
        "Figma",
        "Notion",
        "Miro",
        "Google Workspace",
        "Sketch",
        "Adobe Creative Suite",
        "Webflow",
      ],
      languages: [
        "English (Native)",
        "Yoruba (Native)",
        "French (Conversational)",
        "Spanish (Basic)",
      ],
    },
    projects: [
      {
        title: "VoiceOS Branding",
        description:
          "Led naming, branding, and UX strategy for voice-first productivity platform targeting remote teams and digital nomads.",
        technologies: ["Brand Strategy", "UX Writing", "Voice Design"],
        link: "https://behance.net/voiceos",
        image:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
        featured: true,
      },
      {
        title: "FinTech Onboarding Redesign",
        description:
          "Complete UX copy overhaul for digital banking app serving 2M+ users across West Africa.",
        technologies: ["UX Writing", "Localization", "Financial UX"],
        link: "#",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        featured: true,
      },
      {
        title: "E-commerce Conversion Study",
        description:
          "Data-driven content optimization project resulting in 40% improvement in checkout completion rates.",
        technologies: ["Content Strategy", "A/B Testing", "Analytics"],
        link: "#",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        featured: false,
      },
    ],
    certifications: [
      {
        name: "Google UX Design Professional Certificate",
        issuer: "Google",
        date: "2023",
        credentialId: "GUX-2023-AMR",
      },
      {
        name: "Content Strategy for Professionals",
        issuer: "Northwestern University",
        date: "2022",
      },
      {
        name: "Design Thinking Certification",
        issuer: "IDEO",
        date: "2021",
      },
      {
        name: "User Experience Design Fundamentals",
        issuer: "Coursera",
        date: "2020",
      },
    ],
    testimonials: [
      {
        name: "Ada Nwosu",
        role: "Product Lead",
        company: "Meta",
        quote:
          "Amara brings a rare clarity and depth to every product. Her storytelling is a business advantage that elevates entire teams.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
      },
      {
        name: "David Chen",
        role: "Design Director",
        company: "Google",
        quote:
          "Working with Amara transformed how we think about content design. She's a strategic partner, not just a writer.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      },
      {
        name: "Sarah Williams",
        role: "VP of Product",
        company: "Airbnb",
        quote:
          "Amara's ability to simplify complex experiences into clear, delightful copy is unmatched. A true product partner.",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      },
    ],
    social: {
      linkedin: "https://linkedin.com/in/amaraokafor",
      github: "https://github.com/amaraokafor",
      portfolio: "https://amaraokafor.com",
      behance: "https://behance.net/amaraokafor",
    },
  };

  const sections = [
    "Cover",
    "About",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Certifications",
    "Testimonials",
    "Contact",
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <Cover data={portfolioData.personal} />;
      case 1:
        return <About data={portfolioData.personal} />;
      case 2:
        return <Experience data={portfolioData.experience} />;
      case 3:
        return <Education data={portfolioData.education} />;
      case 4:
        return <Skills data={portfolioData.skills} />;
      case 5:
        return <Projects data={portfolioData.projects} />;
      case 6:
        return <Certifications data={portfolioData.certifications} />;
      case 7:
        return <Testimonials data={portfolioData.testimonials} />;
      case 8:
        return (
          <Contact
            data={{ ...portfolioData.personal, social: portfolioData.social }}
          />
        );
      default:
        return <Cover data={portfolioData.personal} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1C1B1A] font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#DDD6CE] print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-2xl sm:text-3xl font-['DM_Serif_Display'] text-[#A6785C]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {portfolioData.personal.name.split(" ")[0].toUpperCase()}
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(index)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                    currentSection === index
                      ? "bg-[#A6785C] text-white"
                      : "hover:bg-[#E4DCCB] text-[#57534E]"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile/Tablet Navigation - Dropdown */}
            <div className="lg:hidden relative" ref={mobileMenuRef}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#A6785C] text-white rounded-md text-sm font-medium"
              >
                <span>{sections[currentSection]}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#DDD6CE] z-50"
                >
                  <div className="py-2">
                    {sections.map((section, index) => (
                      <button
                        key={section}
                        onClick={() => {
                          setCurrentSection(index);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          currentSection === index
                            ? "bg-[#A6785C] text-white"
                            : "text-[#57534E] hover:bg-[#E4DCCB]"
                        }`}
                      >
                        <span className="flex items-center">
                          <span
                            className="w-2 h-2 rounded-full mr-3"
                            style={{
                              backgroundColor:
                                currentSection === index ? "white" : "#A6785C",
                            }}
                          ></span>
                          {section}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PDF Download Button */}
      <DownloadPDF data={portfolioData} />

      {/* Page Indicators - Hidden on mobile */}
      <div className="hidden md:flex fixed right-4 lg:right-6 top-1/2 transform -translate-y-1/2 flex-col space-y-2 print:hidden">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-2 h-6 lg:h-8 rounded-full transition-all duration-200 ${
              currentSection === index
                ? "bg-[#A6785C]"
                : "bg-[#DDD6CE] hover:bg-[#A6785C]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSix;
