"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Edit3,
  Globe,
  Lock,
  Calendar,
  ExternalLink,
  Copy,
  Share2,
  Trash2,
  MoreVertical,
  Loader2,
  FolderOpen,
  Sparkles,
  LayoutTemplate,
  Plus,
  X,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import Navbar from "../components/UI/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../components/UI/Preloader";

interface Portfolio {
  id: string;
  type: string;
  templateType: string;
  title: string;
  brandName?: string;
  name?: string;
  devName?: string;
  slug: string;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  apiEndpoint: string;
  editEndpoint: string;
  publicUrl: string;
}

const Page = () => {
  const router = useRouter();
  const { getAllUserPortfolios, isAuthenticated } = useAuthStore();

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(
    null
  );
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!isAuthenticated) {
        router.push("/signin");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getAllUserPortfolios();

        if (response?.success && response.data?.portfolios) {
          setPortfolios(response.data.portfolios);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
        toast.error("Failed to load portfolios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, [isAuthenticated, getAllUserPortfolios, router]);

  // Filter portfolios
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.templateType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (portfolio.brandName &&
        portfolio.brandName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (portfolio.name &&
        portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      (filterType === "public" && portfolio.isPublic) ||
      (filterType === "private" && !portfolio.isPublic) ||
      (filterType === "template1" && portfolio.type === "template1") ||
      (filterType === "template2" && portfolio.type === "template2");

    return matchesSearch && matchesFilter;
  });

  const handlePortfolioInfo = (portfolio: Portfolio) => {
    router.push(`/portfolio-info/${portfolio.id}?type=${portfolio.type}`);
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    if (portfolio.type === "template1") {
      router.push(`/allTemplates/templateOne/useTemplate`);
    } else if (portfolio.type === "template2") {
      router.push(`/allTemplates/templateTwo/useTemplate`);
    }
  };

  const handleViewPortfolio = (portfolio: Portfolio) => {
    window.open(portfolio.publicUrl, "_blank");
  };

  const handleCopyLink = (portfolio: Portfolio) => {
    const fullUrl = `${window.location.origin}${portfolio.publicUrl}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Portfolio link copied to clipboard!");
  };

  const getTemplateImage = (type: string) => {
    switch (type) {
      case "template1":
        return "/TemplateOnePreveiw.png";
      case "template2":
        return "/TemplateTwoPreview.png";
      default:
        return "/TemplateOnePreveiw.png";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Animation variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (isLoading) {
    return (
      <Preloader
        loadingText="Loading Your Portfolios..."
        loadingSubtitle="Please wait while we fetch your portfolios."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pt-20 pb-5">
      <Navbar />
      <div className="max-w-9xl mx-auto px-2 sm:px-6 py-5">
        {/* Header section */}
        <div className="mb-8">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-between items-end"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
                <FolderOpen size={14} className="mr-1.5" fill="currentColor" />
                My Portfolios
              </div>
              <h1 className="text-4xl font-bold text-white mb-1">
                Your Portfolio Collection
              </h1>
              <p className="text-gray-400 mt-2">
                Manage and showcase your professional portfolios
              </p>
            </div>
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

            {/* Create Portfolio Button */}
            <motion.button
              onClick={() => router.push("/templates")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              <span>Create Portfolio</span>
            </motion.button>
          </motion.div>

          {/* Filter categories */}
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { value: "all", label: "All Portfolios" },
              { value: "public", label: "Public" },
              { value: "private", label: "Private" },
              { value: "template1", label: "Template One" },
              { value: "template2", label: "Template Two" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filterType === filter.value
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-[#1E2132]/70 text-gray-300 hover:bg-[#262A3E] border border-[#2E313C]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolios.length === 0 ? (
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-[#1E2132] rounded-xl border border-[#2E313C] p-8 flex flex-col items-center text-center shadow-md"
          >
            <LayoutTemplate size={40} className="text-gray-400 mb-3" />
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              {searchQuery || filterType !== "all"
                ? "No portfolios found"
                : "No portfolios yet"}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchQuery || filterType !== "all"
                ? "We couldn't find any portfolios matching your search criteria."
                : "Create your first portfolio to get started"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
                router.push("/templates");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {searchQuery || filterType !== "all"
                ? "Clear filters"
                : "Create Your First Portfolio"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 auto-rows-fr"
            key="portfolios-grid"
          >
            {filteredPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredPortfolio(portfolio.id)}
                onMouseLeave={() => setHoveredPortfolio(null)}
                className="group relative bg-[#1E2132] rounded-2xl overflow-hidden border border-[#2E313C] 
                         hover:border-[#3E4154] hover:shadow-xl hover:shadow-purple-900/20 
                         transition-all duration-300 transform hover:-translate-y-1
                         backdrop-blur-sm"
              >
                {/* Portfolio card */}
                <div className="h-full flex flex-col relative overflow-hidden">
                  {/* Portfolio image */}
                  <div className="relative h-50 overflow-hidden cursor-pointer group/image">
                    <img
                      src={getTemplateImage(portfolio.type)}
                      alt={portfolio.title}
                      className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                      onClick={() => handleViewPortfolio(portfolio)}
                    />

                    {/* Image overlay on hover */}
                    <motion.div
                      animate={
                        hoveredPortfolio === portfolio.id
                          ? { opacity: 1 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />

                    {/* Portfolio badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          type: "spring",
                          stiffness: 150,
                          damping: 15,
                        }}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg ${
                          portfolio.isPublic
                            ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                            : "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                        }`}
                      >
                        {portfolio.isPublic ? (
                          <>
                            <Globe size={10} className="mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock size={10} className="mr-1" />
                            Private
                          </>
                        )}
                      </motion.span>
                    </div>

                    {/* Quick actions overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        hoveredPortfolio === portfolio.id
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 
                               rounded-full p-2 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPortfolio(portfolio);
                      }}
                    >
                      <Eye size={14} />
                    </motion.div>
                  </div>

                  {/* Portfolio info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-100 text-lg leading-tight truncate pr-2 flex-1">
                        {portfolio.title}
                      </h3>
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{
                          rotate: hoveredPortfolio === portfolio.id ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-purple-400 flex-shrink-0"
                      >
                        <Sparkles size={16} fill="currentColor" />
                      </motion.div>
                    </div>

                    <p className="text-gray-400 text-sm mb-2 leading-relaxed">
                      {portfolio.templateType}
                    </p>

                    {(portfolio.brandName ||
                      portfolio.name ||
                      portfolio.devName) && (
                      <p className="text-gray-500 text-xs mb-4">
                        {portfolio.brandName ||
                          portfolio.name ||
                          portfolio.devName}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {portfolio.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(portfolio.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Portfolio footer */}
                  <div className="p-4 pt-0">
                    <div className="relative">
                      {/* Main action button - Edit Portfolio */}
                      <motion.button
                        onClick={() => handleEditPortfolio(portfolio)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full relative overflow-hidden bg-gradient-to-r from-[#711381] via-purple-600 to-[#8B5CF6] 
                                 hover:from-[#5C0F6B] hover:via-purple-700 hover:to-[#7C3AED] 
                                 text-white px-6 py-3 rounded-xl transition-all duration-300 
                                 flex items-center justify-center gap-3 font-semibold text-sm
                                 shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40
                                 group/button"
                      >
                        {/* Animated background shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          animate={
                            hoveredPortfolio === portfolio.id
                              ? { x: "200%" }
                              : { x: "-100%" }
                          }
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        <span className="relative z-10">Edit Portfolio</span>
                        <motion.div
                          className="relative z-10"
                          animate={
                            hoveredPortfolio === portfolio.id
                              ? { x: 4, scale: 1.1 }
                              : { x: 0, scale: 1 }
                          }
                          transition={{
                            type: "spring" as const,
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <Edit3 size={16} className="drop-shadow-sm" />
                        </motion.div>
                      </motion.button>

                      {/* Secondary actions - positioned as floating overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          hoveredPortfolio === portfolio.id
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute -top-12 right-0 z-20 flex gap-2"
                      >
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePortfolioInfo(portfolio);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#1A1D2E]/95 backdrop-blur-md border border-purple-400/30
                                   text-purple-300 hover:text-white hover:border-purple-400/50
                                   px-3 py-2 rounded-lg transition-all duration-200
                                   flex items-center gap-2 text-xs font-medium
                                   shadow-lg shadow-black/20"
                        >
                          <BarChart3 size={12} />
                          <span className="whitespace-nowrap">Info</span>
                        </motion.button>

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPortfolio(portfolio);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#1A1D2E]/95 backdrop-blur-md border border-purple-400/30
                                   text-purple-300 hover:text-white hover:border-purple-400/50
                                   px-3 py-2 rounded-lg transition-all duration-200
                                   flex items-center gap-2 text-xs font-medium
                                   shadow-lg shadow-black/20"
                        >
                          <ExternalLink size={12} />
                          <span className="whitespace-nowrap">View</span>
                        </motion.button>

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(portfolio);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#1A1D2E]/95 backdrop-blur-md border border-purple-400/30
                                   text-purple-300 hover:text-white hover:border-purple-400/50
                                   px-3 py-2 rounded-lg transition-all duration-200
                                   flex items-center gap-2 text-xs font-medium
                                   shadow-lg shadow-black/20"
                        >
                          <Share2 size={12} />
                          <span className="whitespace-nowrap">Share</span>
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Quick stats bar */}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            portfolio.isPublic ? "bg-green-500" : "bg-gray-500"
                          }`}
                        ></div>
                        <span>{portfolio.isPublic ? "Live" : "Draft"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{portfolio.templateType}</span>
                      </div>
                    </div>
                  </div>
                </div>
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

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Page;
