"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Award,
  Calendar,
  User,
  Palette,
  Camera,
  PenTool,
  Video,
  Filter,
  Eye,
  Heart,
} from "lucide-react";

interface CreativeProject {
  id: number;
  title: string;
  category: string;
  description: string;
  medium: string;
  year: string;
  client: string;
  images: string[];
  awards?: string[];
  skills: string[];
  featured: boolean;
}

interface CreativePortfolioProps {
  projects: CreativeProject[];
  instagramHandle?: string;
}

const CreativePortfolio: React.FC<CreativePortfolioProps> = ({
  projects,
  instagramHandle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<CreativeProject | null>(null);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Close modal with Escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "photography":
      case "photography & art direction":
        return Camera;
      case "editorial design":
      case "brand design":
        return PenTool;
      case "content creation & film":
        return Video;
      default:
        return Palette;
    }
  };

  const ProjectModal = ({ project }: { project: CreativeProject }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0F0F0F]/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedProject(null)}
    >
      {/* Enhanced backdrop with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 to-[#0F0F0F]/90" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-[#722F37]/20 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto manuscript-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {project.images.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`${project.title} ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

          {/* Project Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-garamond text-3xl text-[#F4ECD8] mb-2 italic">
                  {project.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-inter">
                  {project.category}
                </span>
              </div>
              <motion.button
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="group relative w-10 h-10 bg-[#722F37]/20 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <motion.span
                  className="text-[#F4ECD8]/60 group-hover:text-[#D4AF37] text-xl font-light transition-colors duration-300"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  ×
                </motion.span>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-10 right-0 bg-[#0F0F0F]/90 text-[#F4ECD8] text-xs px-2 py-1 rounded border border-[#D4AF37]/20 whitespace-nowrap font-inter"
                >
                  Close Gallery
                </motion.div>
              </motion.button>
            </div>

            <p className="font-inter text-[#F4ECD8]/80 leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-inter text-sm text-[#F4ECD8]/70">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-inter text-sm text-[#F4ECD8]/70">
                  {project.client}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Palette className="h-4 w-4 text-[#D4AF37] mt-1" />
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#0F0F0F]/30 text-[#F4ECD8]/80 rounded text-xs font-inter"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {project.awards && project.awards.length > 0 && (
                <div className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-[#D4AF37] mt-1" />
                  <div className="space-y-1">
                    {project.awards.map((award, index) => (
                      <p
                        key={index}
                        className="font-inter text-sm text-[#D4AF37]"
                      >
                        {award}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
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

          <h2 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] mb-6 italic">
            Creative Portfolio
          </h2>

          <p className="font-inter text-lg text-[#F4ECD8]/80 max-w-2xl mx-auto leading-relaxed">
            A curated collection of visual narratives, brand identities, and
            creative explorations that define my artistic journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-inter text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#D4AF37] text-[#0F0F0F] shadow-lg"
                    : "bg-[#722F37]/20 text-[#F4ECD8]/80 border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="bg-[#722F37]/10 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 manuscript-paper">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-[#0F0F0F] rounded-full text-xs font-inter font-medium">
                        <Award className="h-3 w-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View Icon */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-[#0F0F0F]" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs font-inter">
                      {project.category}
                    </span>
                    <span className="font-inter text-xs text-[#F4ECD8]/60">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-garamond text-xl text-[#F4ECD8] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 italic">
                    {project.title}
                  </h3>

                  <p className="font-inter text-sm text-[#F4ECD8]/70 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#D4AF37]" />
                      <span className="font-inter text-xs text-[#F4ECD8]/60">
                        {project.client}
                      </span>
                    </div>

                    {project.awards && project.awards.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-[#D4AF37]" />
                        <span className="font-inter text-xs text-[#D4AF37]">
                          {project.awards.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Link */}
        {instagramHandle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <motion.a
              href={`https://instagram.com/${instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#722F37] text-[#F4ECD8] font-inter font-medium rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300"
            >
              <Camera className="h-5 w-5" />
              Follow my journey on Instagram
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}

        {/* Ornamental Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 text-[#D4AF37]/30">
            <div className="w-8 h-px bg-[#D4AF37]/30" />
            <Palette className="h-4 w-4" />
            <div className="w-8 h-px bg-[#D4AF37]/30" />
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} />}
    </section>
  );
};

export default CreativePortfolio;
