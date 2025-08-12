/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectData {
  id: number;
  type: string;
  typeColor: string;
  name: string;
  description: string;
  image: any;
  sourceLink?: string;
  demoLink?: string;
}

interface ColorMap {
  [key: string]: {
    bg: string;
    text: string;
  };
}

const Experience = ({
  projects,
  colorMap,
}: {
  projects: ProjectData[];
  colorMap: ColorMap;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="experience" className="w-full bg-white py-20 px-4">
      <motion.div
        className="max-w-9xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Experience & Projects
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcasing my journey through various technologies and industries,
            building solutions that matter and drive innovation.
          </p>
        </motion.div>

        {/* Map through projects array */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex 
              ${index % 2 === 0 ? "flex-col" : "flex-col-reverse"}
              ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 ${
                index !== projects.length - 1 ? "mb-20" : ""
              }`}
            variants={itemVariants}
          >
            <div
              className={`lg:w-1/2 ${
                index % 2 === 0 ? "order-2 lg:order-1" : ""
              }`}
            >
              <motion.span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  colorMap[project.typeColor].bg
                } ${colorMap[project.typeColor].text} mb-4`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {project.type}
              </motion.span>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                {project.name}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.sourceLink && (
                  <motion.a
                    href={project.sourceLink}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Source Code
                  </motion.a>
                )}

                {project.demoLink && (
                  <motion.a
                    href={project.demoLink}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>

            <motion.div
              className={`lg:w-1/2 ${
                index % 2 === 0 ? "order-1 lg:order-2" : ""
              }`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl group">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={
                      typeof project.image === "string" &&
                      project.image.includes("cloudinary.com")
                    }
                    onError={(e) => {
                      // Handle image loading errors
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Error";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
