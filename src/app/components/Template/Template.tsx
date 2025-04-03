/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  ArrowRight,
  Eye,
  X,
  LayoutGrid,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  LayoutTemplate,
} from "lucide-react";

// Import necessary template previews
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";

// Template data structure
const templates = [
  {
    id: "templateone",
    imageUrl: TemplateOnePreview,
    title: "Modern Pro",
    description: "Clean & Professional",
    templatePath: "TemplateOne",
    category: "Professional",
    tags: ["Minimal", "Light", "Corporate"],
    featured: true,
    popular: true,
    isNew: false,
  },
  {
    id: "templatetwo",
    imageUrl: TemplateTwoPreview,
    title: "Minimalist",
    description: "Simple & Elegant",
    templatePath: "TemplateTwo",
    category: "Minimal",
    tags: ["Clean", "Light", "Simple"],
    featured: false,
    popular: true,
    isNew: false,
  },
  {
    id: "templatethree",
    imageUrl: TemplateThreePreview,
    title: "Creative Portfolio",
    description: "Bold & Innovative",
    templatePath: "TemplateThree",
    category: "Creative",
    tags: ["Bold", "Dark", "Modern"],
    featured: true,
    popular: false,
    isNew: true,
  },
  {
    id: "templatefour",
    imageUrl: TemplateFourPreview,
    title: "Tech Resume",
    description: "Digital & Dynamic",
    templatePath: "TemplateFour",
    category: "Technical",
    tags: ["Modern", "Dark", "Interactive"],
    featured: false,
    popular: false,
    isNew: true,
  },
  // Add a few more dummy templates for better UI demonstration
  {
    id: "templatefive",
    imageUrl: TemplateOnePreview, // Reusing images for example
    title: "Portfolio Plus",
    description: "Comprehensive showcase",
    templatePath: "TemplateOne",
    category: "Professional",
    tags: ["Gallery", "Light", "Feature-rich"],
    featured: false,
    popular: true,
    isNew: false,
  },
  {
    id: "template-six",
    imageUrl: TemplateThreePreview,
    title: "Art Display",
    description: "Visual showcase",
    templatePath: "TemplateThree",
    category: "Creative",
    tags: ["Gallery", "Dark", "Artistic"],
    featured: true,
    popular: false,
    isNew: true,
  },
  {
    id: "template-seven",
    imageUrl: TemplateFourPreview,
    title: "Developer CV",
    description: "Code & skills focus",
    templatePath: "TemplateFour",
    category: "Technical",
    tags: ["Code", "Dark", "Skills"],
    featured: false,
    popular: true,
    isNew: false,
  },
  {
    id: "template-eight",
    imageUrl: TemplateTwoPreview,
    title: "Business Card",
    description: "Professional identity",
    templatePath: "TemplateTwo",
    category: "Minimal",
    tags: ["Simple", "Light", "Contact"],
    featured: false,
    popular: false,
    isNew: true,
  },
];

// Available categories for filtering
const categories = [
  { id: "all", name: "All Templates" },
  { id: "featured", name: "Featured" },
  { id: "professional", name: "Professional" },
  { id: "creative", name: "Creative" },
  { id: "minimal", name: "Minimal" },
  { id: "technical", name: "Technical" },
];

const Templates = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplateHovered, setIsTemplateHovered] = useState<string | null>(
    null
  );

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Get all unique tags across templates
  const allTags = Array.from(
    new Set(templates.flatMap((template) => template.tags))
  ).sort();

  // Filter templates based on active category, search query, and selected tags
  const filteredTemplates = templates.filter((template) => {
    // Filter by category
    if (
      activeCategory !== "all" &&
      activeCategory !== "featured" &&
      template.category.toLowerCase() !== activeCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter for featured templates
    if (activeCategory === "featured" && !template.featured) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !template.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !template.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by selected tags
    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => template.tags.includes(tag))
    ) {
      return false;
    }

    return true;
  });

  const handlePreviewTemplate = (template: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    router.push(
      `/dashboard/templates/templatedisplay?id=${template.id}&title=${template.title}&path=${template.templatePath}`
    );
  };

  // Handle template usage
  const handleUseTemplate = (template: any) => {
    router.push(
      `/dashboard/templates/useTemplateForm?id=${template.id}&title=${template.title}&path=${template.templatePath}`
    );
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pt-20 pb-5">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        {/* Header section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-between items-end"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
                <LayoutTemplate
                  size={14}
                  className="mr-1.5"
                  fill="currentColor"
                />
                Template Gallery
              </div>
              <h1 className="text-3xl font-bold text-white">
                Choose Your Template
              </h1>
              <p className="text-gray-400 mt-2">
                Build your perfect portfolio with our professionally designed
                templates
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-gradient-to-r from-[#711381] to-purple-600 text-white rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 shadow-lg shadow-purple-900/20 transition-all"
              onClick={() => router.push("/dashboard/custom-templates")}
            >
              <Sparkles size={16} />
              <span className="font-medium">Custom Templates</span>
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>

          {/* Search and filters bar */}
          <motion.div
            className="mt-6 flex flex-wrap gap-4 items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Search input */}
            <div className="relative flex-grow max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2E313C] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-200 bg-[#1E2132]/70 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Controls: Filter */}
            <div className="flex items-center space-x-3">
              {/* Filter button */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg border ${
                    isFilterMenuOpen || selectedTags.length > 0
                      ? "border-purple-500 bg-purple-900/30 text-purple-300"
                      : "border-[#2E313C] bg-[#1E2132]/70 text-gray-300 hover:bg-[#262A3E]"
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  <span className="font-medium text-sm">Filters</span>
                  {selectedTags.length > 0 && (
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {selectedTags.length}
                    </span>
                  )}
                </button>

                {/* Filter dropdown menu */}
                <AnimatePresence>
                  {isFilterMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-[#1E2132] rounded-xl shadow-lg border border-[#2E313C] w-72 z-20 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-200">
                            Filter by Tags
                          </h3>
                          {selectedTags.length > 0 && (
                            <button
                              onClick={() => setSelectedTags([])}
                              className="text-xs text-purple-400 hover:text-purple-300"
                            >
                              Clear all
                            </button>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {allTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                selectedTags.includes(tag)
                                  ? "bg-purple-600 text-white"
                                  : "bg-[#262A3E] text-gray-300 hover:bg-[#2E313C]"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-[#2E313C] p-3 bg-[#181B2B] flex justify-end">
                        <button
                          onClick={() => setIsFilterMenuOpen(false)}
                          className="px-3 py-1.5 text-sm font-medium text-purple-400 hover:text-purple-300"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Removed view mode toggle */}
            </div>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="mt-6 border-b border-[#2E313C]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2.5 font-medium text-sm border-b-2 transition-colors ${
                    activeCategory === category.id
                      ? "border-purple-500 text-purple-400"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Templates grid display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
              <LayoutGrid
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500"
                size={24}
              />
            </div>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-8 flex flex-col items-center text-center shadow-md"
          >
            <Search size={40} className="text-gray-400 mb-3" />
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              No templates found
            </h3>
            <p className="text-gray-400 mb-4">
              We couldn&apos;t find any templates matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
                setActiveCategory("all");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                onMouseEnter={() => setIsTemplateHovered(template.id)}
                onMouseLeave={() => setIsTemplateHovered(null)}
                className="group bg-[#1E2132] rounded-xl overflow-hidden border border-[#2E313C] hover:border-[#3E4154] hover:shadow-lg hover:shadow-purple-900/10 transition-all"
              >
                {/* Template card - grid view */}
                <motion.div
                  layoutId={`template-${template.id}`}
                  className="h-full flex flex-col"
                >
                  {/* Template image */}
                  <div className="relative h-50 overflow-hidden">
                    <Image
                      src={template.imageUrl}
                      alt={template.title}
                      className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                      onClick={() => handlePreviewTemplate(template)}
                    />

                    {/* Template badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {template.isNew && (
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                          <Sparkles size={10} className="mr-1" />
                          New
                        </span>
                      )}
                      {template.popular && (
                        <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                          <Star size={10} className="mr-1" />
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Template info */}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-gray-200 text-lg mb-1">
                      {template.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#262A3E] text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Template footer */}
                  <div className="p-4 pt-0 flex items-center gap-2 justify-center">
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="w-full bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg shadow-purple-900/10"
                    >
                      Use Template
                      <motion.div
                        animate={
                          isTemplateHovered === template.id
                            ? { x: 3 }
                            : { x: 0 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </button>

                    <button
                      onClick={(e) => handlePreviewTemplate(template, e)}
                      className="w-full text-purple-400 hover:text-purple-300 text-sm font-medium px-4 py-2 flex items-center justify-center gap-1.5 bg-[#1E2132]/80 hover:bg-[#262A3E] backdrop-blur-sm
                      border border-purple-500/20 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      Preview
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-pink-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Quick tip toast - for featured templates */}
      <AnimatePresence>
        {activeCategory === "featured" && filteredTemplates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 right-6 bg-[#1E2132]/90 backdrop-blur-md border border-[#2E313C] rounded-xl shadow-lg p-4 max-w-xs flex items-start"
          >
            <Sparkles
              className="text-purple-400 mr-3 mt-0.5 flex-shrink-0"
              size={18}
            />
            <div>
              <h4 className="text-gray-200 font-medium text-sm">
                Featured templates
              </h4>
              <p className="text-gray-400 text-xs mt-0.5">
                These are our hand-picked templates designed for maximum impact.
              </p>
            </div>
            <button
              onClick={() => setActiveCategory("all")}
              className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Templates;
