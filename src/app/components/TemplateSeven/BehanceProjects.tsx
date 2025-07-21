"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Palette,
  Heart,
  Eye,
  ExternalLink,
  Brush,
  Sparkles,
} from "lucide-react";

interface BehanceProject {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  url: string;
  appreciations: number;
  views: number;
}

interface BehanceProjectsProps {
  projects?: BehanceProject[];
  behanceHandle: string;
}

const BehanceProjects: React.FC<BehanceProjectsProps> = ({
  projects = [],
  behanceHandle,
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
          />

          <div className="flex items-center justify-center gap-4 mb-6">
            <Palette className="h-10 w-10 text-[#D4AF37]" />
            <h2 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] italic">
              Creative Portfolio
            </h2>
          </div>

          <p className="font-inter text-lg text-[#F4ECD8]/70 max-w-2xl mx-auto leading-relaxed">
            Visual narratives and design explorations from the creative studio
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-16 h-px bg-[#D4AF37] mx-auto mt-6"
          />
        </motion.div>

        {/* Projects Gallery */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.7 + index * 0.3,
                type: "spring",
                stiffness: 80,
              }}
              className="group"
            >
              {/* Project Container */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                >
                  <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden bg-[#722F37]/20 border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-all duration-500">
                    {/* Ornate Frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#722F37]/5 pointer-events-none" />

                    {/* Decorative Corners */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37]/40" />
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#D4AF37]/40" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#D4AF37]/40" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37]/40" />

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent flex items-end justify-center p-6"
                    >
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0F0F0F] font-inter font-semibold rounded-lg hover:bg-[#D4AF37]/90 transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Project Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.3 }}
                  className={`${index % 2 === 1 ? "lg:col-start-1" : ""} space-y-6`}
                >
                  {/* Manuscript Header */}
                  <div className="relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                      className="w-12 h-px bg-[#D4AF37] mb-4"
                    />

                    <h3 className="font-garamond text-3xl md:text-4xl text-[#F4ECD8] mb-4 italic leading-tight">
                      {project.title}
                    </h3>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.map((category, catIndex) => (
                        <motion.span
                          key={category}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 1.4 + index * 0.3 + catIndex * 0.1,
                          }}
                          className="px-3 py-1 bg-[#722F37]/30 border border-[#D4AF37]/20 rounded-full text-[#D4AF37] font-inter text-xs font-medium"
                        >
                          {category}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 + index * 0.3 }}
                    className="bg-[#F4ECD8]/5 border border-[#D4AF37]/20 rounded-lg p-6 manuscript-paper relative"
                  >
                    {/* Ink Well Icon */}
                    <div className="absolute top-4 right-4 text-[#D4AF37]/30">
                      <Brush className="h-6 w-6" />
                    </div>

                    <p className="font-inter text-[#F4ECD8]/80 leading-relaxed text-justify drop-cap">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.7 + index * 0.3 }}
                    className="flex items-center gap-6"
                  >
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Heart className="h-5 w-5" />
                      <span className="font-inter font-medium">
                        {project.appreciations.toLocaleString()}
                      </span>
                      <span className="font-inter text-sm text-[#F4ECD8]/60">
                        appreciations
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Eye className="h-5 w-5" />
                      <span className="font-inter font-medium">
                        {project.views.toLocaleString()}
                      </span>
                      <span className="font-inter text-sm text-[#F4ECD8]/60">
                        views
                      </span>
                    </div>
                  </motion.div>

                  {/* Decorative Quote */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.9 + index * 0.3 }}
                    className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/20"
                  >
                    <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    <p className="font-garamond text-[#F4ECD8]/70 italic text-sm">
                      "Every design tells a story, every pixel has purpose"
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href={`https://behance.net/${behanceHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#D4AF37]/50 text-[#D4AF37] font-inter font-semibold rounded-lg hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
          >
            <Palette className="h-5 w-5" />
            View Complete Portfolio
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#355E3B]/20 border border-[#D4AF37]/20 rounded-lg p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Palette className="h-8 w-8 text-[#D4AF37]" />
              <h4 className="font-garamond text-2xl text-[#F4ECD8] italic">
                Design Philosophy
              </h4>
              <Palette className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <blockquote className="font-garamond text-xl md:text-2xl text-[#F4ECD8] italic leading-relaxed mb-4">
              "Design is not just how it looks and feels. Design is how it
              works, how it communicates, and how it transforms the ordinary
              into the extraordinary."
            </blockquote>

            <cite className="font-inter text-[#D4AF37] text-sm not-italic">
              — Creative Manifesto
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BehanceProjects;
