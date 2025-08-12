"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectsProps {
  data: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    image?: string;
    featured: boolean;
  }[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const featuredProjects = data.filter((project) => project.featured);
  const otherProjects = data.filter((project) => !project.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-3xl md:text-4xl text-[#1C1B1A] mb-4">
          Featured Projects
        </h1>
        <div className="w-16 h-px bg-[#A6785C] mx-auto mb-4"></div>
        <p className="text-[#57534E] text-lg max-w-2xl mx-auto leading-relaxed">
          A curated selection of work that demonstrates my approach to content
          design and strategic thinking
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className="space-y-12 mb-16">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden"
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Project Image */}
              <div
                className={`relative h-64 lg:h-80 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E4DCCB] flex items-center justify-center">
                    <div className="text-[#A6785C] text-6xl">📊</div>
                  </div>
                )}
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#A6785C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div
                className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
              >
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-[#1C1B1A] mb-4"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-[#57534E] leading-relaxed mb-6 text-base md:text-lg"
                >
                  {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="mb-6"
                >
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#A6785C]/10 text-[#A6785C] rounded-full text-sm font-medium border border-[#A6785C]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Project Link */}
                {project.link && project.link !== "#" && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[#A6785C] font-medium hover:text-[#1C1B1A] transition-colors duration-200"
                    >
                      <span>View Project</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-[#1C1B1A] mb-8 text-center">
            Additional Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Project Image */}
                <div className="relative h-48">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E4DCCB] flex items-center justify-center">
                      <div className="text-[#A6785C] text-4xl">📈</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-['DM_Serif_Display'] text-xl text-[#1C1B1A] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#57534E] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#E4DCCB]/50 text-[#57534E] rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-[#57534E] text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Link */}
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A6785C] text-sm font-medium hover:text-[#1C1B1A] transition-colors duration-200"
                    >
                      View Details →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Work Philosophy */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-16 bg-[#E4DCCB]/30 rounded-lg p-8 border border-[#DDD6CE] text-center"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-4">
          My Design Philosophy
        </h3>
        <p className="text-[#57534E] leading-relaxed max-w-3xl mx-auto">
          Every project is an opportunity to solve real human problems through
          thoughtful content design. I approach each challenge with empathy,
          research, and a commitment to creating experiences that are not just
          usable, but meaningful and delightful for the people who interact with
          them.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
