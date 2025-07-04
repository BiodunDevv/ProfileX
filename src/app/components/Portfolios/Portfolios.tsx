/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  PlusCircle,
  Edit3,
  Copy,
  CheckCircle,
  Clock,
  Activity,
  Globe,
  Star,
  Sparkles,
  Lock,
  AlertTriangle,
  Pencil,
  Save,
  RefreshCw,
  CheckIcon,
  Loader,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import usePortfolioStore from "../../../../store/portfolioStore";
import { toast } from "react-hot-toast";

// Import template preview images for matching with templateTypes
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";

// Map template types to their preview images
const templatePreviews: Record<string, any> = {
  template1: TemplateOnePreview,
  template2: TemplateTwoPreview,
  template3: TemplateThreePreview,
  template4: TemplateFourPreview,
};

// Type definitions
interface PortfoliosProps {
  userId?: string;
}

interface Portfolio {
  _id: string;
  templateType: string;
  title: string;
  description?: string;
  customUrl?: string;
  isPublic: boolean;
  brandName?: string;
  heroImage?: string;
  updatedAt: string;
  createdAt: string;
  views?: number;
  tags?: string[];
  aboutMeDescription?: string;
  [key: string]: any;
}

const Portfolios: React.FC<PortfoliosProps> = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("updated");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
  const [newCustomUrl, setNewCustomUrl] = useState<string>("");
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [isUrlAvailable, setIsUrlAvailable] = useState<boolean | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [previewPortfolio, setPreviewPortfolio] = useState<Portfolio | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the portfolio store
  const {
    portfolios,
    isLoading,
    error,
    fetchUserPortfolios,
    checkCustomUrlAvailability,
    generateCustomUrl,
    deletePortfolio,
  } = usePortfolioStore();

  // Fetch portfolios on component mount
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        await fetchUserPortfolios();
      } catch (error) {
        console.error("Error fetching portfolios:", error);
        toast.error("Failed to fetch portfolios");
      }
    };

    fetchPortfolios();
  }, [fetchUserPortfolios]);

  // Focus input when editing URL
  useEffect(() => {
    if (editingUrlId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingUrlId]);

  // Handle copy URL function
  const handleCopyUrl = (customUrl: string) => {
    const portfolioUrl = `${window.location.origin}/p/${customUrl}`;
    navigator.clipboard.writeText(portfolioUrl);
    setCopySuccess(customUrl);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  // Start editing URL
  const startEditingUrl = (portfolio: Portfolio) => {
    setEditingUrlId(portfolio._id);
    setNewCustomUrl(portfolio.customUrl || "");
    setIsUrlAvailable(null);
  };

  // Cancel URL editing
  const cancelEditingUrl = () => {
    setEditingUrlId(null);
    setNewCustomUrl("");
    setIsUrlAvailable(null);
  };

  // Check if custom URL is available
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const checkUrlAvailability = async (url: string) => {
    if (!url || url.length < 3) {
      setIsUrlAvailable(null);
      return;
    }

    // Validate URL format (only letters, numbers, hyphens and underscores)
    const urlRegex = /^[a-zA-Z0-9-_]+$/;
    if (!urlRegex.test(url)) {
      setIsUrlAvailable(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      setIsCheckingUrl(true);
      try {
        const isAvailable = await checkCustomUrlAvailability(url);
        setIsUrlAvailable(isAvailable);
      } catch (error) {
        console.error("Error checking URL availability:", error);
        toast.error("Failed to check URL availability");
        setIsUrlAvailable(false);
      } finally {
        setIsCheckingUrl(false);
      }
    }, 500);
  };

  // Handle URL change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
    setNewCustomUrl(value);
    checkUrlAvailability(value);
  };

  // Save the new custom URL
  const saveCustomUrl = async (portfolioId: string) => {
    if (!newCustomUrl || newCustomUrl.length < 3) {
      toast.error("Custom URL must be at least 3 characters long");
      return;
    }

    if (isUrlAvailable !== true) {
      toast.error("This URL is not available");
      return;
    }

    try {
      // Update portfolio with new custom URL
      const result = await generateCustomUrl(portfolioId, newCustomUrl);

      if (result) {
        toast.success("Custom URL updated successfully");
        setEditingUrlId(null);
      }
    } catch (error) {
      console.error("Error updating URL:", error);
      toast.error("Failed to update custom URL");
    }
  };

  // Handle retry when there's an error
  const handleRetry = () => {
    fetchUserPortfolios();
  };

  // Handle portfolio deletion
  const handleDeletePortfolio = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this portfolio? This action cannot be undone."
      )
    ) {
      try {
        const result = await deletePortfolio(id);
        if (result) {
          toast.success("Portfolio deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting portfolio:", error);
        toast.error("Failed to delete portfolio");
      }
    }
  };

  // Filter portfolios based on search query
  const filteredBySearch = portfolios.filter((portfolio) => {
    if (!searchQuery) return true;

    const searchableFields = [
      portfolio.title,
      portfolio.description,
      portfolio.brandName,
      portfolio.aboutMeDescription,
      ...(portfolio.tags || []),
    ]
      .filter(Boolean)
      .map((field) => field?.toLowerCase());

    return searchableFields.some((field) =>
      field?.includes(searchQuery.toLowerCase())
    );
  });

  // Apply additional filters
  const filteredPortfolios = filteredBySearch.filter((portfolio) => {
    if (filterBy === "all") return true;
    if (filterBy === "public") return portfolio.isPublic;
    if (filterBy === "private") return !portfolio.isPublic;
    if (filterBy === "template1") return portfolio.templateType === "template1";
    if (filterBy === "template2") return portfolio.templateType === "template2";
    return true;
  });

  // Sort portfolios based on selected option
  const sortedPortfolios = [...filteredPortfolios].sort((a, b) => {
    switch (sortBy) {
      case "created":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "title":
        return a.title.localeCompare(b.title);
      case "updated":
      default:
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }
  });

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get time elapsed since update
  const getTimeElapsed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffDay > 7) {
      return formatDate(dateString);
    } else if (diffDay >= 1) {
      return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    } else if (diffHour >= 1) {
      return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    } else if (diffMin >= 1) {
      return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  // Template badges with colors
  const getTemplateBadge = (templateType: string) => {
    const templates: Record<string, { name: string; color: string }> = {
      template1: {
        name: "Modern",
        color: "bg-purple-500/20 text-purple-400 border-purple-500/20",
      },
      template2: {
        name: "Professional",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/20",
      },
      template3: {
        name: "Minimal",
        color: "bg-gray-500/20 text-gray-400 border-gray-500/20",
      },
      template4: {
        name: "Creative",
        color: "bg-amber-500/20 text-amber-400 border-amber-500/20",
      },
    };

    const template = templates[templateType] || {
      name: templateType,
      color: "bg-gray-500/20 text-gray-400 border-gray-500/20",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full border ${template.color}`}
      >
        {template.name}
      </span>
    );
  };

  // Get template preview image based on type
  const getTemplatePreview = (templateType: string) => {
    return templatePreviews[templateType] || TemplateOnePreview;
  };

  // Enhanced animation variants
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pt-20 pb-5">
      <div className="max-w-9xl mx-auto px-2 sm:px-6">
        {/* Header section with enhanced styling */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-between items-end"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
                <LayoutGrid size={14} className="mr-1.5" fill="currentColor" />
                Portfolio Management
              </div>
              <h1 className="text-3xl font-bold text-white">Your Portfolios</h1>
              <p className="text-gray-400 mt-2">
                Manage and customize your professional showcases
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 sm:mt-0"
            >
              <Link
                href="/templates"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#711381] to-purple-600 text-white rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 shadow-lg shadow-purple-900/20 transition-all"
              >
                <PlusCircle size={16} />
                <span className="font-medium">Create New</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced search and filters bar */}
          <motion.div
            className={`mt-6 ${portfolios.length > 0 && !isLoading && !error ? "block" : "hidden"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Enhanced search input */}
              <div className="relative flex-grow max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search portfolios..."
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

              {/* Enhanced controls */}
              <div className="flex items-center space-x-3">
                {/* Filter button */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                    className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg border ${
                      isFilterMenuOpen || filterBy !== "all"
                        ? "border-purple-500 bg-purple-900/30 text-purple-300"
                        : "border-[#2E313C] bg-[#1E2132]/70 text-gray-300 hover:bg-[#262A3E]"
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    <span className="font-medium text-sm">Filters</span>
                    {filterBy !== "all" && (
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        1
                      </span>
                    )}
                  </button>

                  {/* Enhanced filter dropdown */}
                  <AnimatePresence>
                    {isFilterMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 bg-[#1E2132] rounded-xl shadow-lg border border-[#2E313C] w-56 z-20 overflow-hidden"
                      >
                        <div className="p-4">
                          <h3 className="font-medium text-gray-200 mb-3">
                            Filter Portfolios
                          </h3>
                          <div className="space-y-2">
                            {[
                              { value: "all", label: "All Portfolios" },
                              { value: "public", label: "Public Only" },
                              { value: "private", label: "Private Only" },
                              { value: "template1", label: "Modern Template" },
                            ].map((filter) => (
                              <button
                                key={filter.value}
                                onClick={() => {
                                  setFilterBy(filter.value);
                                  setIsFilterMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  filterBy === filter.value
                                    ? "bg-purple-600/20 text-purple-300"
                                    : "text-gray-300 hover:bg-[#262A3E]"
                                }`}
                              >
                                {filter.label}
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

                {/* Enhanced sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 hidden sm:block">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#1E2132]/70 text-gray-300 text-sm rounded-lg px-3 py-2.5 border border-[#2E313C] focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Created Date</option>
                    <option value="views">Most Views</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced loading state */}
        {isLoading && (
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
        )}

        {/* Enhanced error state */}
        {!isLoading && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-8 flex flex-col items-center text-center shadow-md"
          >
            <AlertTriangle size={40} className="text-red-400 mb-3" />
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              Failed to load portfolios
            </h3>
            <p className="text-gray-400 mb-4">
              {error ||
                "There was an error loading your portfolios. Please try again."}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw size={16} className="inline mr-2" />
              Retry
            </button>
          </motion.div>
        )}

        {/* Enhanced empty state */}
        {!isLoading && !error && portfolios.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-8 flex flex-col items-center text-center shadow-md"
          >
            <div className="bg-[#262A3E] p-4 rounded-full inline-block mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <PlusCircle size={40} className="text-purple-500" />
              </motion.div>
            </div>
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              No portfolios yet
            </h3>
            <p className="text-gray-400 mb-4">
              Create your first portfolio to showcase your skills, projects, and
              expertise to the world.
            </p>
            <Link
              href="/templates"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Portfolio
            </Link>
          </motion.div>
        )}

        {/* Enhanced no results state */}
        {!isLoading &&
          !error &&
          portfolios.length > 0 &&
          sortedPortfolios.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-8 flex flex-col items-center text-center shadow-md"
            >
              <Search size={40} className="text-gray-400 mb-3" />
              <h3 className="text-xl font-medium text-gray-200 mb-2">
                No matching portfolios
              </h3>
              <p className="text-gray-400 mb-4">
                We couldn&apos;t find any portfolios matching your search
                criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterBy("all");
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

        {/* Enhanced Portfolio grid */}
        {!isLoading && !error && sortedPortfolios.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            key="portfolios-grid"
          >
            {sortedPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio._id}
                variants={itemVariants}
                className="group relative bg-[#1E2132] rounded-2xl overflow-hidden border border-[#2E313C] 
                         hover:border-[#3E4154] hover:shadow-xl hover:shadow-purple-900/20 
                         transition-all duration-300 transform hover:-translate-y-1
                         backdrop-blur-sm"
              >
                {/* Portfolio header with image */}
                <div className="relative h-72 sm:h-96 overflow-hidden bg-gradient-to-b from-[#262A3E] to-[#1E2132] rounded-t-xl">
                  {portfolio.heroImage ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={portfolio.heroImage}
                        alt={portfolio.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110"
                        priority={true}
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14151F]/80 via-[#14151F]/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="relative h-full w-full overflow-hidden">
                      <div className="absolute inset-0 bg-[#1E2132]/30 z-10 backdrop-blur-[2px]"></div>
                      <div className="relative h-full w-full transform group-hover:scale-110 transition-all duration-700 ease-in-out">
                        <Image
                          src={getTemplatePreview(portfolio.templateType)}
                          alt={portfolio.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center"
                          priority={true}
                          quality={80}
                        />
                      </div>
                      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#14151F]/90 via-[#14151F]/50 to-transparent"></div>
                    </div>
                  )}

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30 bg-gradient-to-tr from-purple-500/0 via-purple-500/10 to-purple-500/0"></div>

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 flex gap-2 z-30">
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full backdrop-blur-sm shadow-sm ${
                        portfolio.isPublic
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {portfolio.isPublic ? (
                        <Globe size={12} />
                      ) : (
                        <Lock size={12} />
                      )}
                      <span className="text-xs font-medium">
                        {portfolio.isPublic ? "Public" : "Private"}
                      </span>
                    </div>

                    {/* Template badge */}
                    <div className="hidden sm:block">
                      {getTemplateBadge(portfolio.templateType)}
                    </div>
                  </div>

                  {/* Template type badge - shown on hover */}
                  {portfolio.templateType === "template1" && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Activity size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {portfolio.templateType.toLocaleUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Brand name badge */}
                  {portfolio.brandName && (
                    <div className="absolute bottom-3 left-3 z-30">
                      <span className="bg-purple-600/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm">
                        {portfolio.brandName}
                      </span>
                    </div>
                  )}

                  {/* Preview button - shown on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    <button
                      onClick={() => router.push(`/allTemplates/templateOne`)}
                      className="bg-purple-600/90 backdrop-blur-sm text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-transform shadow-lg border border-purple-500/30"
                    >
                      <Eye size={16} />
                      Preview Portfolio
                    </button>
                  </div>
                </div>

                {/* Portfolio details */}
                <div className="p-2">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                    {portfolio.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {portfolio.description ||
                      portfolio.aboutMeDescription ||
                      "No description available"}
                  </p>

                  {/* Custom URL display/edit */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-400">Custom URL</span>
                      {editingUrlId !== portfolio._id && (
                        <button
                          onClick={() => startEditingUrl(portfolio)}
                          className="text-purple-400 hover:text-purple-300 p-1 rounded-full transition-colors"
                          title="Edit URL"
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                    </div>

                    {editingUrlId === portfolio._id ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-[#262A3E] border border-[#3E4154] rounded-lg overflow-hidden">
                            <div className="flex items-center">
                              <span className="px-3 py-2 bg-[#2A2F45] text-gray-500 text-sm border-r border-[#3E4154]">
                                {window.location.origin}/p/
                              </span>
                              <input
                                ref={inputRef}
                                type="text"
                                value={newCustomUrl}
                                onChange={handleUrlChange}
                                className="px-3 py-2 text-gray-300 text-sm bg-transparent border-none focus:ring-0 w-full"
                                placeholder="your-custom-url"
                              />
                            </div>
                          </div>
                        </div>

                        {/* URL availability indicator */}
                        <div className="text-xs">
                          {isCheckingUrl ? (
                            <span className="text-gray-400 flex items-center">
                              <Loader
                                size={10}
                                className="animate-spin mr-1.5"
                              />
                              Checking availability...
                            </span>
                          ) : newCustomUrl.length < 3 ? (
                            <span className="text-gray-400">
                              URL must be at least 3 characters
                            </span>
                          ) : isUrlAvailable === false ? (
                            <span className="text-red-400">
                              This URL is not available
                            </span>
                          ) : isUrlAvailable === true ? (
                            <span className="text-green-400 flex items-center">
                              <CheckIcon size={10} className="mr-1.5" />
                              Available!
                            </span>
                          ) : null}
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={cancelEditingUrl}
                            className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 bg-[#262A3E] hover:bg-[#2A2F45] rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => saveCustomUrl(portfolio._id)}
                            className={`px-2 py-1 text-xs rounded-lg flex items-center gap-1 ${
                              isUrlAvailable
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-purple-600/50 text-white/70 cursor-not-allowed"
                            }`}
                            disabled={!isUrlAvailable}
                          >
                            <Save size={10} />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <div className="flex-1 bg-[#262A3E] border border-[#3E4154] rounded-lg overflow-hidden">
                          <div className="flex items-center">
                            <span className="px-3 py-2 bg-[#2A2F45] text-gray-500 text-sm border-r border-[#3E4154]">
                              {window.location.origin}/p/
                            </span>
                            <span className="px-3 py-2 text-gray-300 text-sm truncate">
                              {portfolio.customUrl || "not-set"}
                            </span>
                          </div>
                        </div>
                        {portfolio.customUrl && (
                          <button
                            onClick={() =>
                              portfolio.customUrl &&
                              handleCopyUrl(portfolio.customUrl)
                            }
                            className="p-2 bg-[#262A3E] hover:bg-[#2A2F45] text-gray-400 hover:text-purple-400 rounded-lg border border-[#3E4154] transition-colors"
                            title="Copy URL"
                          >
                            {copySuccess === portfolio.customUrl ? (
                              <CheckCircle
                                size={16}
                                className="text-green-400"
                              />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {portfolio.tags && portfolio.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {portfolio.tags
                        .slice(0, 3)
                        .map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs bg-[#262A3E] text-gray-400 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      {portfolio.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-[#262A3E] text-gray-400 rounded-full">
                          +{portfolio.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Portfolio metadata and actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-[#2E313C]">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      Updated {getTimeElapsed(portfolio.updatedAt)}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/allTemplates/templateOne`)}
                        className="p-2 text-sm bg-[#262A3E] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 hover:bg-[#2A2F45]"
                        title="View Portfolio"
                      >
                        <Eye size={14} />
                        <span className="hidden sm:inline">View</span>
                      </button>

                      <button
                        onClick={() =>
                          router.push(`/allTemplates/templateOne/useTemplate`)
                        }
                        className="p-2 text-sm bg-[#262A3E] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 hover:bg-[#2A2F45]"
                        title="Edit Portfolio"
                      >
                        <Edit3 size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeletePortfolio(portfolio._id)}
                        className="p-2 text-sm bg-[#262A3E] text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center gap-1.5 hover:bg-[#2A2F45]"
                        title="Delete Portfolio"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Portfolio preview modal */}
        <AnimatePresence>
          {previewPortfolio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setPreviewPortfolio(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1E2132] rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  {previewPortfolio.heroImage ? (
                    <Image
                      src={previewPortfolio.heroImage}
                      alt={previewPortfolio.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={getTemplatePreview(previewPortfolio.templateType)}
                      alt={previewPortfolio.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2132] to-transparent"></div>
                  <button
                    onClick={() => setPreviewPortfolio(null)}
                    className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {previewPortfolio.title}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {previewPortfolio.description ||
                      previewPortfolio.aboutMeDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left column with portfolio details */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Portfolio Details
                      </h3>
                      <div className="space-y-3">
                        {previewPortfolio.brandName && (
                          <div>
                            <span className="text-sm text-gray-500">
                              Brand Name:
                            </span>
                            <p className="text-gray-300">
                              {previewPortfolio.brandName}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-500">
                            Template:
                          </span>
                          <p className="text-gray-300">
                            {getTemplateBadge(previewPortfolio.templateType)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <p className="text-gray-300">
                            {previewPortfolio.isPublic ? (
                              <span className="inline-flex items-center text-green-400">
                                <Globe size={14} className="mr-1" /> Public
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-gray-400">
                                <Lock size={14} className="mr-1" /> Private
                              </span>
                            )}
                          </p>
                        </div>
                        {previewPortfolio.customUrl && (
                          <div>
                            <span className="text-sm text-gray-500">
                              Custom URL:
                            </span>
                            <p className="text-gray-300 break-all">
                              {window.location.origin}/p/
                              {previewPortfolio.customUrl}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right column with tags and stats */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Stats & Tags
                      </h3>
                      {previewPortfolio.views && (
                        <div className="mb-4">
                          <span className="text-sm text-gray-500">Views:</span>
                          <p className="text-gray-300 flex items-center">
                            <Eye size={14} className="mr-1 text-blue-400" />{" "}
                            {previewPortfolio.views}
                          </p>
                        </div>
                      )}

                      {previewPortfolio.tags &&
                        previewPortfolio.tags.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-500">Tags:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {previewPortfolio.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-[#262A3E] text-gray-300 rounded-full text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#2E313C]">
                    <button
                      onClick={() => {
                        setPreviewPortfolio(null);
                        router.push(`/allTemplates/templateOne`);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Full Portfolio
                    </button>
                    <button
                      onClick={() => {
                        setPreviewPortfolio(null);
                        router.push(`/allTemplates/templateOne/useTemplate`);
                      }}
                      className="px-4 py-2 bg-[#262A3E] text-gray-300 hover:text-white rounded-lg hover:bg-[#2A2F45] transition-colors flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      Edit Portfolio
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature highlights - shown below portfolios (only when there are portfolios) */}
        {!isLoading && !error && portfolios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 bg-[#1E2132] border border-[#2E313C] rounded-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="mr-2 text-purple-400" size={20} />
              Portfolio Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Analytics & Insights",
                  description: "Track views and engagement with your portfolio",
                  icon: Activity,
                  color: "text-blue-400 bg-blue-500/10",
                },
                {
                  title: "Custom Url",
                  description: "Use your own domain name for your portfolio",
                  icon: Globe,
                  color: "text-purple-400 bg-purple-500/10",
                },
                {
                  title: "Premium Templates",
                  description: "Access exclusive designs for your portfolio",
                  icon: Star,
                  color: "text-amber-400 bg-amber-500/10",
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`p-3 rounded-lg ${feature.color} h-fit`}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-gray-200 font-medium mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolios;
