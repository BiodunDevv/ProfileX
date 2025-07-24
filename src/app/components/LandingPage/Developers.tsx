"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Mail,
  ArrowUpRight,
  Code,
  Coffee,
  Terminal,
  Heart,
} from "lucide-react";
import Dev from "../../../../public/Dev.svg";

// Define team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
}

const Developers = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [hoverSkill, setHoverSkill] = useState<string | null>(null);

  // Team members data
  const developers: TeamMember[] = [
    {
      id: 1,
      name: "Muhammed Abiodun",
      role: "Frontend Developer",
      bio: "Frontend specialist with a keen eye for detail and a passion for creating responsive, accessible web experiences. Loves working at the intersection of design and development.",
      image: Dev,
      skills: [
        "React",
        "CSS/SCSS",
        "Tailwind",
        "Accessibility",
        "JavaScript",
        "NextJs",
        "TypeScript",
        "React Native",
        "Zustand",
        "Framer Motion",
        "Firebase",
        "REST APIs",
      ],
      links: {
        github: "https://github.com/BiodunDevv",
        twitter: "https://twitter.com/BiodunDev",
        website: "https://biodundev.vercel.app",
      },
    },
    {
      id: 2,
      name: "Gold Enoch",
      role: "Backend Engineer",
      bio: "Specialized in building robust, scalable backend systems. Expert in database optimization, API design, and server architecture with a focus on performance and security.",
      image: Dev,
      skills: [
        "Python",
        "Node.js",
        "MongoDB",
        "Docker",
        "GraphQL",
        "PostgreSQL",
        "Express.js",
        "REST APIs",
      ],
      links: {
        github: "https://github.com/Goldexcool",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  } as const;

  // Get active developer
  const activeMember =
    developers.find((dev) => dev.id === activeId) || developers[0];

  return (
    <section id="developers" className="relative py-24 overflow-hidden z-10">
      {/* Animated code symbols */}
      <div className="absolute top-40 left-10 text-purple-500/20 animate-float-slow">
        <Terminal size={30} />
      </div>
      <div className="absolute top-1/3 right-20 text-purple-500/20 animate-float">
        <Code size={40} />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-500/20 animate-pulse">
        <Coffee size={25} />
      </div>

      <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-9xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-purple-400 font-medium mb-3 uppercase tracking-wider text-sm"
          >
            The Talent Behind ProfileX
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
          >
            Meet Our <span className="text-purple-500">Developers</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1.5 bg-gradient-to-r from-[#711381] to-purple-600 mx-auto rounded-full mb-6"
          ></motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            The passionate team of developers and designers who are committed to
            helping you showcase your professional profile to the world.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Team members selection - Left side on desktop */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-4"
            >
              {developers.map((dev) => (
                <motion.div
                  key={dev.id}
                  variants={itemVariants}
                  onClick={() => setActiveId(dev.id)}
                  className={`relative bg-[#1F2029]/80 backdrop-blur-sm p-4 rounded-xl cursor-pointer transition-all duration-300
                    ${
                      activeId === dev.id
                        ? "border-l-4 border-purple-500 ring-1 ring-purple-500/20 shadow-lg shadow-purple-500/10"
                        : "border-l-4 border-transparent hover:border-purple-500/40"
                    }`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-900/20 mr-4">
                      <Image
                        src={dev.image}
                        alt={dev.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">
                        {dev.name}
                      </h4>
                      <p className="text-sm text-purple-300">{dev.role}</p>
                    </div>
                    {activeId === dev.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                        className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center text-black"
                      >
                        <Terminal size={14} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Made with love section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 text-center px-6 py-6 border border-purple-500/10 rounded-xl bg-[#1F2029]/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center mb-3">
                <Heart size={22} className="text-red-400 mr-2 animate-pulse" />
                <p className="text-gray-300 font-medium">Made with passion</p>
              </div>
              <p className="text-sm text-gray-400">
                Want to join our team? Check out our
                <a
                  href="#careers"
                  className="text-purple-400 hover:text-purple-300 ml-1 inline-flex items-center"
                >
                  open positions <ArrowUpRight size={14} className="ml-1" />
                </a>
              </p>
            </motion.div>
          </div>

          {/* Active developer profile - Right side on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-gradient-to-br from-[#1a1b24] to-[#1F2029] rounded-2xl overflow-hidden border border-purple-500/10 shadow-xl shadow-purple-500/5"
              >
                {/* Modern layout with image contained properly */}
                <div className="flex flex-col md:flex-row">
                  {/* Profile image container with sophisticated styling */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="md:w-2/5 md:min-h-[400px] h-80 relative overflow-hidden bg-gradient-to-b from-[#1a1b24]/80 to-[#201F35]/90"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 animate-pulse-slow"></div>
                      <div className="absolute w-48 h-48 rounded-full bg-purple-700/5 animate-pulse"></div>
                    </div>

                    {/* Actual image with contain for full visibility */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute inset-0 p-4 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={activeMember.image}
                          alt={activeMember.name}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Gradient overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b24] via-transparent to-transparent opacity-70 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1b24] via-transparent to-transparent opacity-30 z-10"></div>

                    {/* Developer badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="absolute bottom-4 right-4 z-20"
                    >
                      <div className="bg-[#1a1b24]/70 backdrop-blur-sm border border-purple-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <Code size={16} className="text-purple-400" />
                        <span className="text-purple-200 text-sm font-medium">
                          {activeMember.role}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Content section */}
                  <div className="md:w-3/5 p-6 md:p-8 relative">
                    {/* Geometric decoration */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="absolute -top-6 -right-6 w-12 h-12 border-r-2 border-t-2 border-purple-500/20 rounded-tr-xl"
                    ></motion.div>

                    {/* Name and bio */}
                    <div className="mb-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex items-center mb-4"
                      >
                        <div className="w-12 h-1.5 bg-gradient-to-r from-[#711381] to-purple-500 rounded-full mr-3"></div>
                        <motion.div className="text-xs text-purple-400 font-mono tracking-wider">
                          DEV/{activeMember.id}
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-3xl font-bold text-white mb-2 bg-clip-text bg-gradient-to-r from-white to-purple-100"
                      >
                        {activeMember.name}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="py-4 mb-3 border-b border-t border-purple-500/10"
                      >
                        <p className="text-gray-300 leading-relaxed first-letter:text-2xl first-letter:font-bold first-letter:text-purple-400">
                          {activeMember.bio}
                        </p>
                      </motion.div>
                    </div>

                    {/* Skills with improved visualization */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="mb-6"
                    >
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center
                              ${
                                hoverSkill === skill
                                  ? "bg-gradient-to-r from-[#711381] to-purple-600 text-white shadow-md shadow-purple-500/20"
                                  : "bg-[#1D1E2A] text-purple-300 border border-purple-500/20"
                              }`}
                            onMouseEnter={() => setHoverSkill(skill)}
                            onMouseLeave={() => setHoverSkill(null)}
                          >
                            {hoverSkill === skill && (
                              <Terminal size={12} className="mr-1.5" />
                            )}
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Social links with improved styling */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="pt-4 border-t border-purple-500/10"
                    >
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(activeMember.links).map(
                          ([platform, url], index) => {
                            if (!url) return null;

                            let Icon;
                            let bgColor = "from-[#6D28D9]/80 to-[#6D28D9]";

                            switch (platform) {
                              case "github":
                                Icon = Github;
                                bgColor = "from-[#24292E]/80 to-[#24292E]";
                                break;
                              case "twitter":
                                Icon = Twitter;
                                bgColor = "from-[#1DA1F2]/80 to-[#1DA1F2]";
                                break;
                              case "linkedin":
                                Icon = Linkedin;
                                bgColor = "from-[#0077B5]/80 to-[#0077B5]";
                                break;
                              case "website":
                                Icon = Globe;
                                bgColor = "from-[#4C1D95]/80 to-[#4C1D95]";
                                break;
                              case "email":
                                Icon = Mail;
                                url = `mailto:${url}`;
                                break;
                            }

                            return (
                              <motion.a
                                key={platform}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.8 + index * 0.1,
                                  duration: 0.3,
                                }}
                                whileHover={{ y: -2 }}
                                href={url}
                                target={
                                  platform !== "email" ? "_blank" : undefined
                                }
                                rel={
                                  platform !== "email"
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className={`group relative w-10 h-10 bg-gradient-to-br ${bgColor} rounded-xl flex items-center justify-center transition-all duration-300 shadow-md shadow-black/20`}
                                aria-label={`${activeMember.name}'s ${platform}`}
                              >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                {Icon && (
                                  <Icon size={18} className="relative z-10" />
                                )}
                              </motion.a>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developers;
