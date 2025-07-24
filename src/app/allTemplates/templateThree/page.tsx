"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Eye } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/TemplateThree/Navbar";
import Hero from "@/app/components/TemplateThree/Hero";
import About from "@/app/components/TemplateThree/About";
import Projects from "@/app/components/TemplateThree/Projects";
import Contact from "@/app/components/TemplateThree/Contact";

const TemplateThree: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Mock data for the template
  const heroData = {
    DevName: "DevName",
    FullName: "Full Name",
    title: "Crafting Visual Identities",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",

    socialLinks: [
      { platform: "Linkedin", icon: "Linkedin", url: "#" },
      { platform: "Behance", icon: "Behance", url: "#" },
      { platform: "Mail", icon: "Mail", url: "#" },
      { platform: "Twitter", icon: "Twitter", url: "#" },
      { platform: "Github", icon: "Github", url: "#" },
      { platform: "Instagram", icon: "Instagram", url: "#" },
    ],

    Companies: ["Company 1", "Company 2", "Company 3"],
  };

  const aboutData = {
    subtitle: "Blending Strategy with Aesthetics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    skills: [
      { name: "Skill 1", level: 8 },
      { name: "Skill 2", level: 6 },
      { name: "Skill 3", level: 4 },
      { name: "Skill 4", level: 7 },
    ],
    education: [
      {
        degree: "B.A. Visual Communication",
        institution: "Parsons School of Design",
        year: "Start - End",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  };

  const projectsData = [
    {
      id: 1,
      type: "Branding",
      typeColor: "blue",
      name: "Sora Studio",
      description:
        "Developed a minimalist brand identity for a Japanese design agency focused on harmony and space.",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sourceLink: "https://www.behance.net/amirabradley",
      demoLink: "#",
      icon: "Behance",
    },
    {
      id: 2,
      type: "UX Design",
      typeColor: "amber",
      name: "Wellnest App",
      description:
        "Complete UX redesign of a mindfulness mobile app. Conducted user research, wireframing, prototyping in Figma.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sourceLink: "https://dribbble.com/amirabradley",
      demoLink: "#",
      icon: "Behance",
    },
    {
      id: 3,
      type: "Web Design",
      typeColor: "slate",
      name: "Creative Portfolio",
      description:
        "A modern portfolio website showcasing creative work with interactive elements and smooth animations.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sourceLink: "https://github.com/amirabradley",
      demoLink: "#",
      icon: "Github",
    },
  ];

  const AllProjectLink = "#";

  const contactData = {
    email: "Your email",
    phone: "Your number",
    location: "Your Location",
    socialLinks: [
      {
        platform: "Linkedin",
        icon: "Linkedin",
        url: "#",
      },
      {
        platform: "Behance",
        icon: "Behance",
        url: "#",
      },
      {
        platform: "Twitter",
        icon: "Twitter",
        url: "#",
      },
      {
        platform: "Github",
        icon: "Github",
        url: "#",
      },
      {
        platform: "Instagram",
        icon: "Instagram",
        url: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
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

      <Navbar DevName={heroData.DevName} />
      <main>
        <section id="home">
          <Hero
            DevName={heroData.FullName}
            title={heroData.title}
            description={heroData.description}
            heroImage={heroData.heroImage}
            Companies={heroData.Companies}
            socialLinks={heroData.socialLinks}
          />
        </section>

        <About
          subtitle={aboutData.subtitle}
          description={aboutData.description}
          skills={aboutData.skills}
          education={aboutData.education}
        />

        <Projects projects={projectsData} AllProjectLink={AllProjectLink} />

        <Contact
          email={contactData.email}
          phone={contactData.phone}
          location={contactData.location}
          socialLinks={contactData.socialLinks}
        />
      </main>
    </div>
  );
};

export default TemplateThree;
