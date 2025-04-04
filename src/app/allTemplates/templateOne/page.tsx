"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../../components/TemplateOne/Hero";
import HeroImage from "../../components/TemplateOne/images/Hero picture.svg";
import Experience from "../../components/TemplateOne/Experience";
import Projects from "../../components/TemplateOne/images/Projects.jpg";
import About from "../../components/TemplateOne/About";
import Contact from "../../components/TemplateOne/Contact";

// Default data as fallback
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

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080808] text-white">
      <div className="space-y-8">
        <div className="flex flex-col items-center">
          {/* Loading circle animation */}
          <div className="relative w-20 h-20 mb-4">
            <motion.div
              className="absolute inset-0 border-t-2 border-l-2 border-[#3F8E00] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <motion.div
              className="absolute inset-1 border-t-2 border-r-2 border-[#3F8E00]/60 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Template
          </motion.h2>

          <motion.div
            className="flex space-x-1.5"
            initial="hidden"
            animate="visible"
          >
            {[
              "P",
              "r",
              "e",
              "p",
              "a",
              "r",
              "i",
              "n",
              "g",
              " ",
              "y",
              "o",
              "u",
              "r",
              " ",
              "p",
              "r",
              "o",
              "f",
              "i",
              "l",
              "e",
            ].map((letter, index) => (
              <motion.span
                key={index}
                className="text-[#3F8E00] text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  repeatType: "reverse",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Animated placeholder sections */}
        <div className="space-y-4 max-w-md mx-auto w-full px-4">
          <motion.div
            className="h-6 w-2/4 mx-auto bg-[#1b1b1b] rounded-md overflow-hidden relative"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-[#3F8E00]/20 w-1/4"
              animate={{ x: ["-100%", "400%", "-100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="h-16 bg-[#1b1b1b] rounded-md overflow-hidden relative"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-[#3F8E00]/20 w-1/4"
              animate={{ x: ["-100%", "400%", "-100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="h-20 bg-[#1b1b1b] rounded-md overflow-hidden relative"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-[#3F8E00]/20 w-1/4"
                animate={{ x: ["-100%", "400%", "-100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </motion.div>
            <motion.div
              className="h-20 bg-[#1b1b1b] rounded-md overflow-hidden relative"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-[#3F8E00]/20 w-1/4"
                animate={{ x: ["-100%", "400%", "-100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateOne = () => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [heroDetails, setHeroDetails] = useState(defaultHeroDetails);
  const [aboutData, setAboutData] = useState(defaultAboutData);
  const [projects, setProjects] = useState(defaultProjects);
  const [contactData, setContactData] = useState(defaultContactData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract the ID from the URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const idMatch = url.match(/\?(.+)/); // Extract everything after the "?"
      if (idMatch && idMatch[1]) {
        setTemplateId(idMatch[1]);
      }
    }
  }, []);

  // Load data from localStorage
  useEffect(() => {
    if (templateId) {
      try {
        // Try both formats of localStorage keys
        let savedData = localStorage.getItem("templateOneData");
        if (!savedData) {
          savedData = localStorage.getItem(`templateOneData-${templateId}`);
        }

        if (savedData) {
          const parsedData = JSON.parse(savedData);

          // Check if the ID matches or if we should use this data
          if (!parsedData.id || parsedData.id === templateId) {
            console.log("Found matching template data:", parsedData);

            // Map the saved form data to our template components
            if (parsedData.hero) {
              setHeroDetails({
                DevName: parsedData.hero.devName || defaultHeroDetails.DevName,
                title: parsedData.hero.title || defaultHeroDetails.title,
                description:
                  parsedData.hero.description || defaultHeroDetails.description,
                heroImage:
                  parsedData.hero.heroImage || defaultHeroDetails.heroImage,
                Companies:
                  parsedData.hero.companies || defaultHeroDetails.Companies,
              });
            }

            if (parsedData.about) {
              setAboutData({
                title: parsedData.about.title || defaultAboutData.title,
                subtitle:
                  parsedData.about.subtitle || defaultAboutData.subtitle,
                description:
                  parsedData.about.description || defaultAboutData.description,
                skills: parsedData.about.skills || defaultAboutData.skills,
                education:
                  parsedData.about.education || defaultAboutData.education,
              });
            }

            if (parsedData.projects) {
              setProjects(parsedData.projects);
            }

            if (parsedData.contact) {
              setContactData({
                email: parsedData.contact.email || defaultContactData.email,
                phone: parsedData.contact.phone || defaultContactData.phone,
                socialLinks:
                  parsedData.contact.socialLinks ||
                  defaultContactData.socialLinks,
              });
            }

            console.log(
              "Loaded template data from localStorage for ID:",
              templateId
            );
          } else {
            console.log("Template data ID doesn't match URL ID");
          }
        } else {
          console.log("No saved template found for ID:", templateId);
        }
      } catch (error) {
        console.error("Error loading template data from localStorage:", error);
      } finally {
        // Simulate a slight loading delay for better user experience
        setTimeout(() => setIsLoaded(true), 1200);
      }
    }
  }, [templateId]);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero
            DevName={heroDetails.DevName}
            title={heroDetails.title}
            description={heroDetails.description}
            heroImage={heroDetails.heroImage}
            Companies={heroDetails.Companies}
          />
          <About
            title={aboutData.title}
            subtitle={aboutData.subtitle}
            description={aboutData.description}
            skills={aboutData.skills}
            education={aboutData.education}
          />
          <Experience projects={projects} colorMap={colorMap} />
          <Contact
            email={contactData.email}
            phone={contactData.phone}
            socialLinks={contactData.socialLinks}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplateOne;
