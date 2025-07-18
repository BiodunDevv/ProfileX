"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { FaBehance, FaGithub } from "react-icons/fa6";

interface Project {
  id: number;
  type: string;
  typeColor: string;
  name: string;
  description: string;
  image: string;
  sourceLink: string;
  demoLink: string;
  icon: string;
}

interface ProjectsProps {
  projects: Project[];
  AllProjectLink: string;
}

const Projects: React.FC<ProjectsProps> = ({ projects, AllProjectLink }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50 },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const getTypeColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800",
      amber: "bg-amber-100 text-amber-800",
      slate: "bg-slate-100 text-slate-800",
    };
    return colors[color as keyof typeof colors] || "bg-blue-100 text-blue-800";
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Behance":
        return FaBehance;
      case "Github":
        return FaGithub;
      default:
        return FaBehance;
    }
  };
  return (
    <section
      id="projects"
      className="py-10 sm:py-20 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Featured Projects
          </h2>
          <p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A curated selection of my recent work, showcasing brand identity, UX
            design, and creative direction across various industries.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project) => {
            const SocialIcon = getSocialIcon(project.icon);
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Project Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(project.typeColor)}`}
                    >
                      {project.type}
                    </span>
                  </div>

                  {/* Hover Actions - Desktop Only */}
                  <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.demoLink}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <SocialIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </motion.a>
                      <motion.a
                        href={project.sourceLink}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.description}
                  </p>

                  {/* Mobile Action Buttons */}
                  <div className="flex sm:hidden space-x-3 pt-3">
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SocialIcon className="w-4 h-4 text-slate-700 mr-2" />
                      <span className="text-slate-700 text-sm font-medium">
                        {project.icon === "Behance"
                          ? "View Design"
                          : "View Demo"}
                      </span>
                    </motion.a>

                    <motion.a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4 text-slate-700" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
            href={AllProjectLink}
          >
            View All Projects
            <ExternalLink className="ml-2 w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
