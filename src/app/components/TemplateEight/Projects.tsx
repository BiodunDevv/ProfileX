"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  Calendar,
  Code,
} from "lucide-react";
import { ProjectItem } from "../../allTemplates/templateEight/page";

interface ProjectsProps {
  data: ProjectItem[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  // Get featured projects
  const featuredProjects = data.filter((project) => project.featured);
  const allProjects = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const projectTypes = {
    Tooling: { color: "#22C55E", icon: Code },
    "Red Team": { color: "#EF4444", icon: Github },
    "Blue Team": { color: "#3B82F6", icon: Eye },
    Research: { color: "#A855F7", icon: Star },
    CTF: { color: "#F59E0B", icon: Star },
    "Vulnerability Research": { color: "#EC4899", icon: Github },
  };

  const renderProjectCard = (project: ProjectItem, index: number) => {
    const projectType = project.type;
    const typeConfig =
      projectTypes[projectType as keyof typeof projectTypes] ||
      projectTypes["Tooling"];
    const Icon = typeConfig.icon;

    return (
      <motion.div
        key={project.id}
        variants={itemVariants}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
        onClick={() => setSelectedProject(project)}
      >
        <div className="bg-[#161B22]/90 backdrop-blur-sm border border-[#38BDF8]/20 rounded-xl sm:rounded-2xl p-4 hover:border-[#38BDF8]/40 transition-all duration-300 h-full">
          {/* Project Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl"
              style={{
                backgroundColor: `${typeConfig.color}20`,
                border: `1px solid ${typeConfig.color}40`,
              }}
            >
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: typeConfig.color }}
              />
            </div>

            <div className="flex items-center space-x-2">
              {project.year && (
                <div className="flex items-center space-x-1 text-gray-400 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{project.year}</span>
                </div>
              )}
              {project.featured && (
                <div className="px-2 py-1 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded text-[#F59E0B] text-xs">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Project Type Badge */}
          <div className="mb-3 sm:mb-4">
            <span
              className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              style={{
                backgroundColor: `${typeConfig.color}20`,
                border: `1px solid ${typeConfig.color}40`,
                color: typeConfig.color,
              }}
            >
              {projectType}
            </span>
            {project.status && (
              <span className="ml-2 px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-xs">
                {project.status}
              </span>
            )}
          </div>

          {/* Project Info */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors duration-300">
            {project.name}
          </h3>

          <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded text-[#A855F7] text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-xs">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Project Links */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex space-x-3">
              <motion.a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-[#1F2937] border border-[#38BDF8]/20 rounded-lg hover:border-[#38BDF8]/40 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-[#38BDF8]" />
              </motion.a>

              {project.demoLink && project.demoLink !== "#" && (
                <motion.a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-[#1F2937] border border-[#22C55E]/20 rounded-lg hover:border-[#22C55E]/40 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 text-[#22C55E]" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // No tab filtering logic needed as we're showing all projects

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-2 sm:px-6 bg-[#0D1117] scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-[#38BDF8] mr-2 sm:mr-3" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                Projects & Tools
              </h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Security tools, research projects, and open-source contributions
              that demonstrate my technical capabilities.
            </p>
          </motion.div>

          {/* Projects Grid - Mobile responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {data.map((project, index) => renderProjectCard(project, index))}
          </motion.div>

          {/* Project Summary Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Project Portfolio Summary
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#38BDF8] mb-1">
                    {data.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Projects</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#22C55E] mb-1">
                    {featuredProjects.length}
                  </div>
                  <div className="text-gray-400 text-sm">Featured</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#A855F7] mb-1">
                    {new Set(data.flatMap((p) => p.technologies || [])).size}
                  </div>
                  <div className="text-gray-400 text-sm">Technologies</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F59E0B] mb-1">
                    {new Set(data.map((p) => p.type)).size}
                  </div>
                  <div className="text-gray-400 text-sm">Project Types</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D1117]/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.name}
              </h3>

              {/* Project Meta */}
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-[#38BDF8]/20 border border-[#38BDF8]/40 rounded text-[#38BDF8] text-sm">
                  {selectedProject.type}
                </span>
                {selectedProject.status && (
                  <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-sm">
                    {selectedProject.status}
                  </span>
                )}
                {selectedProject.year && (
                  <span className="text-gray-400 text-sm">
                    {selectedProject.year}
                  </span>
                )}
              </div>

              <p className="text-gray-400 mb-6">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              {selectedProject.technologies &&
                selectedProject.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded text-[#A855F7] text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex space-x-4">
                <motion.a
                  href={selectedProject.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#38BDF8] hover:bg-[#38BDF8]/80 text-[#0D1117] px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                >
                  <Github className="w-5 h-5" />
                  <span>View Source</span>
                </motion.a>

                {selectedProject.demoLink &&
                  selectedProject.demoLink !== "#" && (
                    <motion.a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
