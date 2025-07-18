"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  persona: "designer" | "developer";
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface ProjectsProps {
  activePersona: "designer" | "developer";
  projectsData: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ activePersona, projectsData }) => {
  const filteredProjects = projectsData.filter(
    (project) => project.persona === activePersona
  );

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50 },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#1A1D29]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(177,178,181,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(177,178,181,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Featured Work
          </h2>
          <p className="text-[#B1B2B5]/80 text-lg max-w-2xl mx-auto">
            {activePersona === "designer"
              ? "Explore my latest design projects that blend creativity with strategic thinking and user-centered design principles."
              : "Discover my recent development projects showcasing modern web technologies, performance optimization, and scalable architecture."}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] mx-auto rounded-full mt-6" />
        </motion.div>

        <motion.div
          key={activePersona}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative bg-[#B1B2B5]/5 rounded-3xl overflow-hidden border border-[#B1B2B5]/10 hover:border-[#B1B2B5]/30 transition-all duration-500 hover:bg-[#B1B2B5]/10 hover:shadow-2xl hover:shadow-[#B1B2B5]/10"
            >
              {/* Enhanced Project Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D29]/90 via-[#1A1D29]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Premium Hover Actions - Desktop Only */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {activePersona === "designer" ? (
                        <Eye className="w-5 h-5 text-white" />
                      ) : (
                        <Github className="w-5 h-5 text-white" />
                      )}
                    </motion.a>

                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#B1B2B5]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-[#B1B2B5]/30">
                  <span className="text-white text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#B1B2B5]/10 text-[#B1B2B5]/90 text-sm rounded-full border border-[#B1B2B5]/20 hover:bg-[#B1B2B5]/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D1D1D3] transition-colors duration-300">
                  {project.name}
                </h3>

                <p className="text-[#B1B2B5]/80 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Mobile Action Buttons */}
                <div className="flex sm:hidden space-x-3 pt-2">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-lg px-4 py-3 flex items-center justify-center hover:bg-[#B1B2B5]/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activePersona === "designer" ? (
                      <>
                        <Eye className="w-4 h-4 text-[#B1B2B5] mr-2" />
                        <span className="text-[#B1B2B5] text-sm font-medium">
                          View Design
                        </span>
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4 text-[#B1B2B5] mr-2" />
                        <span className="text-[#B1B2B5] text-sm font-medium">
                          View Code
                        </span>
                      </>
                    )}
                  </motion.a>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-lg px-4 py-3 flex items-center justify-center hover:bg-[#B1B2B5]/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4 text-[#B1B2B5]" />
                  </motion.a>
                </div>

                <motion.div
                  className="hidden sm:block pt-4 border-t border-[#B1B2B5]/10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#B1B2B5] hover:text-[#D1D1D3] font-medium transition-colors duration-300 group"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="group bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] text-[#1A1D29] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/25 hover:scale-105">
            View All Projects
            <motion.span
              className="inline-block ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
