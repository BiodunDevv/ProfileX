/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/TemplateOne/Hero";
import HeroImage from "../../components/TemplateOne/images/Hero picture.svg";
import Experience from "../../components/TemplateOne/Experience";
import Projects from "../../components/TemplateOne/images/Projects.jpg";
import About from "../../components/TemplateOne/About";
import Contact from "../../components/TemplateOne/Contact";
import toast from "react-hot-toast";

const defaultHeroDetails = {
  DevName: "WorkName",
  title: "Your Name Here",
  description:
    "About you: Lorem, ipsum dolor sit amet consectetur adipisicing elit Recusandae, aperiam quidem iste eligendi fugiat porro sapiente dolorem dolor numquam rem vel molestiae nobis accusantium provident, voluptatibus.",
  heroImage: HeroImage,
  Companies: ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"],
};

const defaultProjects = [
  {
    id: 1,
    type: "Project Type",
    typeColor: "blue",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 2,
    type: "Project Type",
    typeColor: "purple",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 3,
    type: "Project Type",
    typeColor: "green",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 4,
    type: "Project Type",
    typeColor: "amber",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
];

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

const defaultAboutData = {
  title: "About Me",
  subtitle: "Professional Background & Expertise",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae felis vel magna scelerisque facilisis. Fusce at fringilla orci. Proin gravida, nisi vel cursus pulvinar, justo nulla faucibus mauris, sit amet convallis erat magna vel velit. Donec vel luctus est, vel malesuada libero. Vestibulum luctus sapien at consequat eleifend.",
  skills: [
    { name: "Frontend Development", level: 5, color: "bg-blue-500" },
    { name: "Backend Architecture", level: 4, color: "bg-yellow-500" },
    { name: "UI/UX Design", level: 3, color: "bg-blue-600" },
    { name: "Database Management", level: 4, color: "bg-green-600" },
    { name: "Cloud Services", level: 4, color: "bg-black" },
    { name: "RESTful APIs", level: 5, color: "bg-orange-500" },
    { name: "Mobile Development", level: 3, color: "bg-cyan-500" },
    { name: "DevOps", level: 2, color: "bg-purple-500" },
  ],
  education: [
    {
      degree: "Master of Lorem Ipsum",
      institution: "University of Placeholder",
      year: "2018-2020",
      description:
        "Magna cum laude, focus on advanced dolor sit amet technologies",
    },
    {
      degree: "Bachelor of Consectetur",
      institution: "Adipiscing Institute",
      year: "2014-2018",
      description:
        "Specialized in elit consequat with minor in vestibulum methods",
    },
  ],
};

const defaultContactData = {
  email: "contact@example.com",
  phone: "+1 (123) 456-7890",
  socialLinks: [
    {
      platform: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/in/yourusername",
    },
    {
      platform: "GitHub",
      icon: "github",
      url: "https://github.com/yourusername",
    },
    {
      platform: "Twitter",
      icon: "twitter",
      url: "https://twitter.com/yourusername",
    },
  ],
};

const TemplateOne = () => {
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        
        if (!isAuthenticated || !token) {
          console.log("User not authenticated, using default data");
          setLoading(false);
          return;
        }
        
        console.log("Fetching portfolio data...");
        const response = await fetch("/api/portfolios/portfolioone", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            console.log("No portfolio found, using default data");
          } else {
            const errorData = await response.json();
            console.error("Error fetching portfolio:", errorData);
            toast.error(errorData.message || "Failed to load portfolio");
          }
          setLoading(false);
          return;
        }
        
        // Successfully fetched portfolio data
        const data = await response.json();
        console.log("Portfolio data loaded:", data);
        setPortfolio(data);
        
        // Set up hero data from portfolio
        const heroData = {
          DevName: data.brandName || defaultHeroDetails.DevName,
          title: data.title || defaultHeroDetails.title,
          description: data.description || defaultHeroDetails.description,
          heroImage: data.heroImage || defaultHeroDetails.heroImage,
          Companies: data.companies || defaultHeroDetails.Companies,
        };
        
        // Map portfolio projects to template format
        const projectsData = data.projects 
          ? data.projects.map((project: { technologies: any[]; name: any; description: any; imageUrl: any; repoUrl: any; liveUrl: any; }, index: number) => ({
              id: index + 1,
              type: project.technologies?.[0] || "Project",
              typeColor: ["blue", "purple", "green", "amber"][index % 4], // Rotate colors
              name: project.name,
              description: project.description,
              image: project.imageUrl || Projects, // Fallback to default image
              sourceLink: project.repoUrl || "#",
              demoLink: project.liveUrl || "#",
            }))
          : defaultProjects;
        
        // More data mapping
        // ...
        
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong while loading portfolio");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [token, isAuthenticated]);

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero
        DevName={defaultHeroDetails.DevName}
        title={defaultHeroDetails.title}
        description={defaultHeroDetails.description}
        heroImage={defaultHeroDetails.heroImage}
        Companies={defaultHeroDetails.Companies}
      />
      <About
        title={defaultAboutData.title}
        subtitle={defaultAboutData.subtitle}
        description={defaultAboutData.description}
        skills={defaultAboutData.skills}
        education={defaultAboutData.education}
      />
      <Experience projects={defaultProjects} colorMap={colorMap} />
      <Contact
        email={defaultContactData.email}
        phone={defaultContactData.phone}
        socialLinks={defaultContactData.socialLinks}
      />
    </motion.div>
  );
};

export default TemplateOne;
