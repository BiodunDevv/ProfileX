"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
      name: "Alex Morgan",
      role: "Lead Developer",
      bio: "Full stack developer with 8+ years of experience specializing in React and Node.js. Passionate about building elegant, high-performance web applications with exceptional user experiences.",
      image: Dev,
      skills: ["React", "TypeScript", "NextJS", "Node", "Framer Motion"],
      links: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      bio: "Creative designer focused on crafting beautiful interfaces with intuitive user experiences. Combines artistic vision with data-driven insights to deliver designs that users love.",
      image: Dev,
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Animation"],
      links: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
        email: "email@example.com",
      },
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Backend Engineer",
      bio: "Specialized in building robust, scalable backend systems. Expert in database optimization, API design, and server architecture with a focus on performance and security.",
      image: Dev,
      skills: ["Python", "Node.js", "MongoDB", "AWS", "Docker"],
      links: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 4,
      name: "Leila Patel",
      role: "Frontend Developer",
      bio: "Frontend specialist with a keen eye for detail and a passion for creating responsive, accessible web experiences. Loves working at the intersection of design and development.",
      image: Dev,
      skills: ["React", "CSS/SCSS", "Tailwind", "Accessibility", "JavaScript"],
      links: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        website: "https://example.com",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Get active developer
  const activeMember =
    developers.find((dev) => dev.id === activeId) || developers[0];

  return (
    <section id="team" className="relative py-24 overflow-hidden z-10">
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

      <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-7xl">
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
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#1a1b24] to-[#1F2029] rounded-2xl overflow-hidden border border-purple-500/10 shadow-lg shadow-purple-500/5"
            >
              {/* Header with background gradient and image */}
              <div className="relative h-72 md:h-80 overflow-hidden rounded-t-2xl group">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#711381]/60 to-purple-500/40 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70 z-10"></div>
                
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-soft-light z-20"></div>
                
                {/* Animated glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-violet-500 rounded-t-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-700 group-hover:duration-500 z-0"></div>
              
                {/* Profile image with zoom effect */}
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 z-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={activeMember.image}
                    fill
                    priority
                    alt={activeMember.name}
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    style={{ 
                      objectPosition: "center 25%",
                      filter: "contrast(1.05) saturate(1.1)"
                    }}
                  />
                </motion.div>
              
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b24] via-[#1a1b24]/80 to-transparent z-30"></div>
              
                {/* Name and role with improved positioning */}
                <div className="absolute bottom-0 left-0 p-8 w-full z-40">
                  <div className="relative overflow-hidden">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-12 h-1.5 bg-purple-500 rounded-full mb-4"
                    ></motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-2"
                    >
                      {activeMember.name}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-lg text-purple-300 font-medium flex items-center"
                    >
                      <span className="mr-2">{activeMember.role}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                        <Code className="mr-1" size={12} /> Developer
                      </span>
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="p-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-gray-300 leading-relaxed mb-8"
                >
                  {activeMember.bio}
                </motion.p>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h4 className="text-white font-medium mb-4">Expertise</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeMember.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        onMouseEnter={() => setHoverSkill(skill)}
                        onMouseLeave={() => setHoverSkill(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          background:
                            hoverSkill === skill
                              ? "linear-gradient(to right, rgb(113, 19, 129), rgb(168, 85, 247))"
                              : "rgba(168, 85, 247, 0.15)",
                        }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium text-purple-300 bg-purple-500/15 hover:text-white cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-purple-500/10"
                >
                  <div className="flex flex-wrap gap-3">
                    {activeMember.links.github && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={activeMember.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#24292E]/80 hover:bg-[#24292E] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${activeMember.name}'s GitHub`}
                      >
                        <Github size={18} />
                      </motion.a>
                    )}

                    {activeMember.links.twitter && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={activeMember.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1DA1F2]/80 hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${activeMember.name}'s Twitter`}
                      >
                        <Twitter size={18} />
                      </motion.a>
                    )}

                    {activeMember.links.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={activeMember.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#0077B5]/80 hover:bg-[#0077B5] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${activeMember.name}'s LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </motion.a>
                    )}

                    {activeMember.links.website && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={activeMember.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#4C1D95]/80 hover:bg-[#4C1D95] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${activeMember.name}'s Website`}
                      >
                        <Globe size={18} />
                      </motion.a>
                    )}

                    {activeMember.links.email && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={`mailto:${activeMember.links.email}`}
                        className="w-10 h-10 bg-[#6D28D9]/80 hover:bg-[#6D28D9] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`Email ${activeMember.name}`}
                      >
                        <Mail size={18} />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developers;
