"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import { StaticImageData } from "next/image";

interface Project {
  title: string;
  description: string;
  image?: StaticImageData | string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "featured">("all");

  const filteredProjects =
    activeFilter === "featured"
      ? projects.filter((project) => project.featured)
      : projects;

  return (
    <div
      id="projects"
      className="bg-[#0f0f12] text-white py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-30 left-0 w-1/3 h-1/3 bg-amber-500/5 rounded-br-full blur-3xl"></div>
        <div className="absolute bottom-30 right-0 w-1/4 h-1/4 bg-amber-500/5 rounded-tl-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative max-w-9xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
        </div>

        {/* Filter Buttons - Only show if we have featured projects */}
        {projects.some((project) => project.featured) && (
          <div className="flex justify-center mb-10 gap-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-amber-500 text-black"
                  : "bg-[#161513] text-slate-300 hover:bg-amber-500/10 border border-amber-500/30"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeFilter === "featured"
                  ? "bg-amber-500 text-black"
                  : "bg-[#161513] text-slate-300 hover:bg-amber-500/10 border border-amber-500/30"
              }`}
            >
              Featured
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-[#0f0f12]/80 rounded-lg overflow-hidden border border-amber-500/10 shadow-lg shadow-amber-500/5 hover:shadow-amber-500/15 hover:translate-y-[-5px] transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
              >
                {/* Project Image */}
                {project.image ? (
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      width={400}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161513] to-transparent opacity-60"></div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-amber-500/20 to-[#161513] flex items-center justify-center">
                    <FaFolderOpen size={50} className="text-amber-500/50" />
                  </div>
                )}

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-amber-400 transition-colors"
                        aria-label="View GitHub Repository"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-amber-400 transition-colors"
                        aria-label="View Live Site"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0f0f12]/80 rounded-lg border border-amber-500/10 backdrop-blur-sm">
            <FaFolderOpen
              size={60}
              className="text-amber-500/30 mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-slate-300">
              No projects to display
            </h3>
            <p className="text-slate-400 mt-2">
              Projects you add will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
