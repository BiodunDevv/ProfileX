/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  LayoutTemplate,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore";

// Import necessary template previews
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";
import TemplateEightPreview from "../../../../public/TemplateEightPreview.png";

const templates = [
  {
    id: "templateOne",
    imageUrl: TemplateOnePreview,
    title: "Modern Pro",
    description: "Clean & Professional",
    templatePath: "templateOne",
    categories: ["Web Developer"],
    tags: ["Minimal", "Corporate", "Dark"],
    featured: true,
    available: true, // Form available
    isPreviewOnly: false,
    portfolioType:
      "Full-stack developers, software engineers, tech professionals",
    industry: "Technology, Software Development",
    designStyle: "Modern, Minimalist, Professional",
  },
  {
    id: "templateTwo",
    imageUrl: TemplateTwoPreview,
    title: "Minimalist",
    description: "Simple & Elegant",
    templatePath: "templateTwo",
    categories: ["Designer", "Web Developer"],
    tags: ["Clean", "Simple", "Dark"],
    featured: false,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "UX/UI designers, graphic designers, creative professionals for showcasing their work",
    industry: "Design, Creative Services, Digital Agencies",
    designStyle: "Minimalist, Elegant, Typography-focused",
  },
  {
    id: "templateThree",
    imageUrl: TemplateThreePreview,
    title: "Creative Portfolio",
    description: "Bold & Innovative",
    templatePath: "templateThree",
    categories: ["Creative Professional"],
    tags: ["Bold", "Modern", "Artistic"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Creative designers, artists, brand specialists that want to showcase their work in a unique way",
    industry: "Creative Industries, Design Agencies, Art",
    designStyle: "Bold, Innovative, Artistic",
  },
  {
    id: "templateFour",
    imageUrl: TemplateFourPreview,
    title: "Dual Persona Pro",
    description: "Premium Enterprise Design",
    templatePath: "templateFour",
    categories: ["Developer & Designer"],
    tags: ["Glassmorphism", "Dual-Persona", "Premium"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Full-stack developers with design skills, UX engineers, design-dev hybrids, senior professionals",
    industry: "Technology, Design, Creative Tech, Enterprise Software",
    designStyle: "Premium, Modern, Glassmorphism, Enterprise-grade",
  },
  {
    id: "templateFive",
    imageUrl: "/TemplateFivePreview.png",
    title: "CLI-Verse",
    description: "CLI-Inspired Interface",
    templatePath: "templateFive",
    categories: ["CLI Developer", "Web Developer"],
    tags: ["Terminal", "Interactive", "CLI"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Backend developers, DevOps engineers, CLI tool creators, system administrators",
    industry: "Technology, DevOps, Infrastructure, Developer Tools",
    designStyle: "Terminal, Command-line, Minimalist, Interactive",
  },
  {
    id: "templateSix",
    imageUrl: "/TemplateSixPreview.png",
    title: "PaperTrail Pro",
    description: "Editorial Resume Portfolio",
    templatePath: "templateSix",
    categories: ["Content Professional", "Designer", "Creative Professional"],
    tags: ["Editorial", "Resume", "Professional"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Content strategists, UX writers, editorial professionals, content designers",
    industry: "Content Strategy, UX Writing, Editorial, Communications",
    designStyle: "Editorial, Professional, Paper-like, Typography-focused",
  },
  {
    id: "templateSeven",
    imageUrl: "/TemplateSevenPreview.png",
    title: "Dark Academia Gothic",
    description: "Sophisticated Literary Portfolio",
    templatePath: "templateSeven",
    categories: ["Designer", "Creative Professional"],
    tags: ["Academic", "Literary", "Gothic"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Fullstack developers, creative technologists, academic professionals, writer-developers",
    industry: "Technology, Design, Academia, Creative Technology",
    designStyle: "Dark Academia Gothic, Manuscript-inspired, Vintage Academic",
  },
  {
    id: "templateEight",
    imageUrl: TemplateEightPreview,
    title: "CyberSentinel",
    description: "Security Professional",
    templatePath: "templateEight",
    categories: ["Cybersecurity Professional"],
    tags: ["Terminal", "Matrix", "Security"],
    featured: true,
    available: false,
    isPreviewOnly: true,
    portfolioType:
      "Cybersecurity professionals, penetration testers, security researchers, red team operators",
    industry: "Cybersecurity, Information Security, Digital Forensics",
    designStyle: "Terminal-inspired, Hacker Aesthetic, Matrix-style",
  },
];

// Available categories for filtering
const categories = [
  { id: "all", name: "All", icon: "🌟", count: 8 },
  { id: "featured", name: "Featured", icon: "⭐", count: 7 },
  { id: "web developer", name: "Developer", icon: "💻", count: 3 },
  { id: "designer", name: "Designer", icon: "🎨", count: 3 },
  { id: "developer & designer", name: "Hybrid", icon: "🚀", count: 1 },
  { id: "creative professional", name: "Creative", icon: "✨", count: 3 },
  { id: "content professional", name: "Content", icon: "📝", count: 1 },
  { id: "cli developer", name: "CLI", icon: "⌨️", count: 1 },
  { id: "cybersecurity professional", name: "Security", icon: "🔒", count: 1 },
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
  const [userPortfolios, setUserPortfolios] = useState<any[]>([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);
  const { getAllUserPortfolios, isAuthenticated } = useAuthStore();

  // Fetch user portfolios and simulate loading state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (isAuthenticated) {
        setIsLoadingPortfolios(true);
        try {
          const response = await getAllUserPortfolios();
          console.log("Fetched portfolios:", response);
          if (response?.success && response?.data?.portfolios) {
            setUserPortfolios(response.data.portfolios);
          }
        } catch (error) {
          console.error("Error fetching portfolios:", error);
        } finally {
          setIsLoadingPortfolios(false);
        }
      }

      // Simulate loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, [isAuthenticated, getAllUserPortfolios]); // Helper function to check if user has a portfolio for a specific template
  const getUserPortfolioForTemplate = (templateId: string) => {
    if (!isAuthenticated || !userPortfolios.length) return null;

    // Map template IDs to portfolio type patterns from API response
    const templateToTypeMap: Record<string, string> = {
      templateOne: "template1",
      templateTwo: "template2",
      templateThree: "template3",
      templateFour: "template4",
      templateFive: "template5",
      templateSix: "template6",
      templateSeven: "template7",
      templateEight: "template8",
    };

    const expectedType = templateToTypeMap[templateId];
    return userPortfolios.find((portfolio) => portfolio.type === expectedType);
  };

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
      !template.categories.some(
        (category) => category.toLowerCase() === activeCategory.toLowerCase()
      )
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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A] relative overflow-hidden">
      {/* Animated background elements - Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] bg-purple-800/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-9xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Header section */}
          <div className="mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-500/30 text-xs sm:text-sm text-purple-300 backdrop-blur-sm">
                <LayoutTemplate
                  size={14}
                  className="mr-1.5 sm:mr-2"
                  fill="currentColor"
                />
                Template Gallery
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent px-2">
                Choose Your Perfect Template
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
                Discover professionally crafted templates designed to showcase
                your work and elevate your online presence
              </p>
            </motion.div>

            {/* Search and filters bar */}
            <motion.div
              className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Search input and filter button container */}
              <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center max-w-2xl">
                {/* Search input */}
                <div className="relative w-full sm:flex-1 sm:max-w-md">
                  <Search
                    size={16}
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                  />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-[#2E313C] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-200 bg-[#1E2132]/70 backdrop-blur-sm shadow-lg placeholder-gray-500 transition-all duration-300 text-sm sm:text-base"
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors z-10"
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </div>

                {/* Filter button */}
                <div className="relative sm:flex-shrink-0">
                  <motion.button
                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-300 w-full sm:w-auto text-sm sm:text-base ${
                      isFilterMenuOpen || selectedTags.length > 0
                        ? "border-purple-500 bg-purple-900/30 text-purple-300 shadow-lg shadow-purple-900/20"
                        : "border-[#2E313C] bg-[#1E2132]/70 text-gray-300 hover:bg-[#2E313C]/80 hover:border-purple-500/30"
                    }`}
                  >
                    <SlidersHorizontal size={14} />
                    <span className="font-medium">Filters</span>
                    {selectedTags.length > 0 && (
                      <span className="bg-purple-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                        {selectedTags.length}
                      </span>
                    )}
                  </motion.button>

                  {/* Filter dropdown menu */}
                  <AnimatePresence>
                    {isFilterMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 sm:left-0 bg-[#1E2132] rounded-xl shadow-lg border border-[#2E313C] w-64 sm:w-72 z-20 overflow-hidden"
                      >
                        <div className="p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-200 text-sm sm:text-base">
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

                          <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                            {allTags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
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
              </div>
            </motion.div>

            {/* Minimal Category Pills */}
            <motion.div
              className="mt-4 sm:mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                        : "bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-[#3E4154]/50 hover:border-purple-500/30"
                    }`}
                  >
                    <span
                      className="text-xs sm:text-sm"
                      role="img"
                      aria-label={category.name}
                    >
                      {category.icon}
                    </span>
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">
                      {category.name.length > 8
                        ? category.name.substring(0, 8) + "..."
                        : category.name}
                    </span>
                    <span
                      className={`text-xs px-1 sm:px-1.5 py-0.5 rounded-full ${
                        activeCategory === category.id
                          ? "bg-white/20 text-white/80"
                          : "bg-gray-600/30 text-gray-400"
                      }`}
                    >
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Templates grid display */}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-12 sm:py-20">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
                <LayoutGrid
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500"
                  size={20}
                />
              </div>
              <p className="text-gray-400 mt-4">Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-6 sm:p-8 py-12 sm:py-20 flex flex-col items-center text-center shadow-md mx-3 sm:mx-0"
            >
              <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-3" />
              <h3 className="text-lg sm:text-xl font-medium text-gray-200 mb-2">
                No templates found
              </h3>
              <p className="text-gray-400 mb-4 text-sm sm:text-base max-w-md">
                We couldn&apos;t find any templates matching your search
                criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTags([]);
                  setActiveCategory("all");
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr p-1"
              key="templates-grid"
            >
              {filteredTemplates.map((template) => {
                const userPortfolio = getUserPortfolioForTemplate(template.id);
                const hasPortfolio = !!userPortfolio;

                return (
                  <motion.div
                    key={template.id}
                    onMouseEnter={() => setIsTemplateHovered(template.id)}
                    onMouseLeave={() => setIsTemplateHovered(null)}
                    className="group relative bg-[#1E2132] rounded-xl sm:rounded-2xl overflow-hidden border border-[#2E313C] 
                         hover:border-[#3E4154] hover:shadow-xl hover:shadow-purple-900/20 
                         transition-all duration-300 transform
                         backdrop-blur-sm"
                  >
                    {/* Template card - grid view */}
                    <div className="h-full flex flex-col relative overflow-hidden">
                      {/* Template image */}
                      <div className="relative h-40 sm:h-48 lg:h-50 overflow-hidden cursor-pointer group/image">
                        <Image
                          src={template.imageUrl}
                          alt={template.title}
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Image overlay on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={
                            isTemplateHovered === template.id
                              ? { opacity: 1 }
                              : { opacity: 0 }
                          }
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        />

                        {/* Template badges */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5 z-10 max-w-[calc(100%-4rem)]">
                          {hasPortfolio && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.3,
                                type: "spring",
                                stiffness: 150,
                                damping: 15,
                              }}
                              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold flex items-center shadow-lg"
                            >
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                              <span className="hidden sm:inline">Created</span>
                              <span className="sm:hidden">✓</span>
                            </motion.span>
                          )}
                          {template.available ? (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.4,
                                type: "spring",
                                stiffness: 150,
                                damping: 15,
                              }}
                              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold flex items-center shadow-lg"
                            >
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                              <span className="hidden sm:inline">
                                Available
                              </span>
                              <span className="sm:hidden">✓</span>
                            </motion.span>
                          ) : (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.4,
                                type: "spring",
                                stiffness: 150,
                                damping: 15,
                              }}
                              className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold flex items-center shadow-lg"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                              <span className="hidden sm:inline">
                                Preview Only
                              </span>
                              <span className="sm:hidden">Preview</span>
                            </motion.span>
                          )}
                        </div>

                        {/* Quick preview icon overlay */}
                        <Link
                          href={
                            hasPortfolio
                              ? `/allTemplates/${template.templatePath}/${userPortfolio.slug}`
                              : `/allTemplates/${template.templatePath}`
                          }
                          className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-white/10 backdrop-blur-md border border-white/20 
                               rounded-full p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                        >
                          {hasPortfolio ? (
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </Link>
                      </div>

                      {/* Template info */}
                      <div className="p-2.5 sm:p-3 flex-grow flex flex-col">
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <h3 className="font-semibold text-gray-100 text-sm sm:text-base lg:text-lg leading-tight pr-2">
                            {template.title}
                          </h3>
                          {template.featured && (
                            <motion.div
                              initial={{ rotate: 0 }}
                              animate={{
                                rotate:
                                  isTemplateHovered === template.id ? 360 : 0,
                              }}
                              transition={{ duration: 0.5 }}
                              className="text-purple-400 flex-shrink-0"
                            >
                              <Star className="w-4 h-4 " fill="currentColor" />
                            </motion.div>
                          )}
                        </div>

                        <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                          {template.description}
                        </p>

                        {/* Portfolio Type - Hidden on mobile for space */}
                        <div className="mb-2 sm:mb-4 hidden sm:block">
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <span className="text-xs font-medium text-purple-400">
                              Perfect for:
                            </span>
                          </div>
                          <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                            {template.portfolioType}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-0">
                          {template.tags.slice(0, 2).map((tag, index) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gradient-to-r from-[#262A3E] to-[#2A2E42] text-gray-300 
                                   px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium
                                   border border-gray-600/20 hover:border-purple-500/30
                                   transition-colors duration-200"
                            >
                              {tag}
                            </motion.span>
                          ))}

                          {template.tags.length > 2 && (
                            <span className="text-gray-500 text-xs px-1 sm:px-2 py-0.5 sm:py-1">
                              <span>+{template.tags.length - 2}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Template footer */}
                      <div className="p-2.5 sm:p-3 pt-0">
                        {/* Hover overlay with actions */}
                        <div className="relative">
                          {/* Secondary Actions */}
                          <div className="flex gap-1.5 sm:gap-2">
                            <Link
                              href={
                                hasPortfolio
                                  ? `/allTemplates/${template.templatePath}/${userPortfolio.slug}`
                                  : `/allTemplates/${template.templatePath}`
                              }
                              className="flex-1 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium border border-slate-700/50 hover:border-slate-600 group"
                            >
                              {hasPortfolio ? (
                                <>
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">
                                    View Live
                                  </span>
                                  <span className="sm:hidden">Live</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">
                                    Preview
                                  </span>
                                  <span className="sm:hidden">View</span>
                                </>
                              )}
                            </Link>
                            <Link
                              href={`/templates/${template.id}`}
                              className="flex-1 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium border border-slate-700/50 hover:border-slate-600 group"
                            >
                              <LayoutTemplate className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                              <span className="hidden sm:inline">Details</span>
                              <span className="sm:hidden">Info</span>
                            </Link>
                          </div>
                        </div>

                        {/* Quick stats bar */}
                        <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div
                              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse ${
                                hasPortfolio ? "bg-green-500" : "bg-blue-500"
                              }`}
                            ></div>
                            <span className="text-xs">
                              {hasPortfolio
                                ? "Portfolio Created"
                                : template.available && !template.isPreviewOnly
                                  ? "Ready to Use"
                                  : template.isPreviewOnly
                                    ? "Preview Only"
                                    : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <span className="text-xs truncate max-w-20 sm:max-w-none">
                              {template.categories.slice(0, 2).join(", ")}
                              {template.categories.length > 2 && "..."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
        {/* Quick tip toast - for featured templates */}
        <AnimatePresence>
          {activeCategory === "featured" && filteredTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#1E2132]/90 backdrop-blur-md border border-[#2E313C] rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 max-w-xs sm:max-w-sm flex items-start z-30"
            >
              <Sparkles
                className="text-purple-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                size={16}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-200 font-medium text-xs sm:text-sm">
                  Featured templates
                </h4>
                <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                  These are our hand-picked templates designed for maximum
                  impact.
                </p>
              </div>
              <button
                onClick={() => setActiveCategory("all")}
                className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0 p-1 hover:bg-gray-600/20 rounded-md transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Templates;
