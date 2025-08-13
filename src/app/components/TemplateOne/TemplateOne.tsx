/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import Experience from "./Experience";
import About from "./About";
import Contact from "./Contact";

interface TemplateOneProps {
  portfolioData?: any;
  isPublicView?: boolean;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
};

const TemplateOne: React.FC<TemplateOneProps> = ({ 
  portfolioData, 
  isPublicView = false 
}) => {
  // Use provided data or fall back to your existing logic
  const data = portfolioData || {
    // Your existing default data structure
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={isPublicView ? "public-portfolio" : ""}
    >
      <Hero
        DevName={data.hero.DevName}
        title={data.hero.title}
        description={data.hero.description}
        heroImage={data.hero.heroImage}
        Companies={data.hero.Companies}
      />
      <About
        title={data.about.title}
        subtitle={data.about.subtitle}
        description={data.about.description}
        skills={data.about.skills}
        education={data.about.education}
      />
      <Experience projects={data.projects} colorMap={colorMap} />
      <Contact
        email={data.contact.email}
        phone={data.contact.phone}
        socialLinks={data.contact.socialLinks}
      />
    </motion.div>
  );
};

export default TemplateOne;