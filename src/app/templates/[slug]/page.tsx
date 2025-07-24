"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Monitor,
  Users,
  Target,
  Palette,
  Layout,
  Zap,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  Code,
  Layers,
  Sparkles,
  Edit3,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  AlertTriangle,
} from "lucide-react";
import { getPortfolioBySlug } from "@/lib/portfolio-data";
import { useAuthStore } from "../../../../store/useAuthStore";

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const portfolio = getPortfolioBySlug(slug);
  const [userPortfolios, setUserPortfolios] = useState<any[]>([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const { getAllUserPortfolios, isAuthenticated } = useAuthStore();

  if (!portfolio) {
    notFound();
  }

  // Fetch user portfolios
  useEffect(() => {
    const fetchUserPortfolios = async () => {
      if (isAuthenticated) {
        setIsLoadingPortfolios(true);
        try {
          const response = await getAllUserPortfolios();
          if (response?.success && response?.data?.portfolios) {
            setUserPortfolios(response.data.portfolios);
          }
        } catch (error) {
          console.error("Error fetching portfolios:", error);
        } finally {
          setIsLoadingPortfolios(false);
        }
      }
    };

    fetchUserPortfolios();
  }, [isAuthenticated, getAllUserPortfolios]);

  // Helper function to get user portfolio for this template
  const getUserPortfolioForTemplate = () => {
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

    const expectedType = templateToTypeMap[portfolio.id];
    return userPortfolios.find((p) => p.type === expectedType);
  };

  const userPortfolio = getUserPortfolioForTemplate();
  const hasPortfolio = !!userPortfolio;

  // Modal handlers
  const openImageModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageIndex(0);
  };

  const navigateImage = (direction: "next" | "prev") => {
    const totalImages = portfolio.images.length;
    if (direction === "next") {
      const nextIndex = (imageIndex + 1) % totalImages;
      setImageIndex(nextIndex);
      setSelectedImage(portfolio.images[nextIndex]);
    } else {
      const prevIndex = (imageIndex - 1 + totalImages) % totalImages;
      setImageIndex(prevIndex);
      setSelectedImage(portfolio.images[prevIndex]);
    }
  };

  // Handle touch gestures for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && portfolio.images.length > 1) {
      navigateImage("next");
    }
    if (isRightSwipe && portfolio.images.length > 1) {
      navigateImage("prev");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          closeImageModal();
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, imageIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web developer":
        return <Code className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "designer":
        return <Palette className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "creative professional":
        return <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "technical professional":
        return <Layers className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getDesignStyleColor = (style: string) => {
    if (style.toLowerCase().includes("dark"))
      return "from-slate-900 to-slate-700";
    if (style.toLowerCase().includes("creative"))
      return "from-purple-900 to-blue-900";
    if (style.toLowerCase().includes("minimalist"))
      return "from-gray-900 to-gray-700";
    return "from-blue-900 to-indigo-900";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] py-6 sm:py-10 w-full">
      <div className="max-w-9xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group text-sm sm:text-base"
          >
            <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Templates
          </Link>
        </motion.div>

        {/* Portfolio Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                {isLoadingPortfolios ? (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400">
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    <span className="text-xs sm:text-sm font-medium">
                      Loading...
                    </span>
                  </div>
                ) : (
                  hasPortfolio && (
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Portfolio Created
                      </span>
                    </div>
                  )
                )}
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400">
                  {getCategoryIcon(portfolio.category)}
                  <span className="text-xs sm:text-sm font-medium">
                    {portfolio.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-300">
                  {portfolio.type === "mobile" ? (
                    <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Monitor className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  <span className="text-xs sm:text-sm">{portfolio.type}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 text-white leading-tight">
                {portfolio.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed">
                {portfolio.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {isLoadingPortfolios ? (
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 border border-slate-700/50 text-gray-400 rounded-lg font-semibold text-sm sm:text-base">
                <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Loading Portfolio Status...
              </div>
            ) : hasPortfolio ? (
              <>
                <Link
                  href={`${portfolio.liveUrl}?${userPortfolio.slug}`}
                  target="_blank"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                >
                  <ExternalLink className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">View Live Portfolio</span>
                  <span className="sm:hidden">Live Portfolio</span>
                </Link>
                <Link
                  href={`/allTemplates/${portfolio.templatePath}`}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group text-sm sm:text-base"
                >
                  <Eye className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">View Template</span>
                  <span className="sm:hidden">Template</span>
                </Link>
                <Link
                  href={`/templateForm?${portfolio.id}`}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group text-sm sm:text-base"
                >
                  <Edit3 className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Edit Portfolio</span>
                  <span className="sm:hidden">Edit</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={portfolio.liveUrl}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                >
                  <Eye className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Live Preview</span>
                  <span className="sm:hidden">Preview</span>
                </Link>
                {!isAuthenticated ? (
                  <Link
                    href="/signin"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                  >
                    <Sparkles className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                    <span className="inline">Sign In to Use Template</span>
                  </Link>
                ) : portfolio.available ? (
                  <Link
                    href={`/templateForm?${portfolio.id}`}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                  >
                    <Sparkles className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                    <span className="inline">Use Template</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base opacity-80 cursor-not-allowed">
                    <AlertTriangle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="inline">Form Not Available</span>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Main Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 cursor-pointer group"
            onClick={() => openImageModal(portfolio.images[0], 0)}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getDesignStyleColor(portfolio.designStyle)} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <Maximize2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <Image
              src={portfolio.images[0]}
              alt={portfolio.title}
              width={1200}
              height={800}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2 sm:gap-3">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                Overview
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                  {portfolio.longDescription}
                </p>
              </div>
            </motion.section>

            {/* Project Goal */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-500/20"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2 sm:gap-3">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                Project Goal
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                {portfolio.goal}
              </p>
            </motion.section>

            {/* Availability Status & Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-600/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    {portfolio.available ? (
                      <>
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                        Template Available
                      </>
                    ) : (
                      <>
                        <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                        Preview Only
                      </>
                    )}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {portfolio.available
                      ? "This template is fully functional with form integration ready to use."
                      : "This template is currently preview-only. The interactive form is not yet available."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:min-w-fit">
                  <Link
                    href={portfolio.liveUrl}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Live Preview</span>
                    <span className="sm:hidden">Preview</span>
                  </Link>

                  {!isAuthenticated ? (
                    <Link
                      href="/signin"
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="inline">Sign In to Use</span>
                    </Link>
                  ) : portfolio.available ? (
                    <Link
                      href={`/templateForm?${portfolio.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="inline">Use Template</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base opacity-80 cursor-not-allowed">
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="inline">Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2 sm:gap-3">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {portfolio.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm sm:text-base">
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Best For / Not Recommended */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-green-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-green-500/20"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                  Perfect For
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {portfolio.bestFor.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 sm:space-x-3"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-xs sm:text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-red-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-red-500/20"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center gap-2">
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
                  Not Recommended For
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {portfolio.notRecommendedFor.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 sm:space-x-3"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-xs sm:text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Additional Screenshots */}
            {portfolio.images.length > 1 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2 sm:gap-3">
                  <Layout className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                  Additional Screenshots
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {portfolio.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg border border-slate-700/50 cursor-pointer group relative"
                      onClick={() => openImageModal(image, index + 1)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
                          <Maximize2 className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <Image
                        src={image}
                        alt={`${portfolio.title} preview ${index + 2}`}
                        width={600}
                        height={400}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center gap-2">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-slate-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Design Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2">
                <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                Design Details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Style:
                    </span>
                    <span className="text-gray-300 font-semibold text-sm sm:text-base text-left sm:text-right">
                      {portfolio.designStyle}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Theme:
                    </span>
                    <span className="text-gray-300 font-semibold text-sm sm:text-base text-left sm:text-right">
                      {portfolio.colorScheme}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Layout:
                    </span>
                    <span className="text-gray-300 font-semibold text-sm sm:text-base text-left sm:text-right">
                      {portfolio.layout}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Responsive:
                    </span>
                    <span
                      className={`font-semibold text-sm sm:text-base ${portfolio.responsive ? "text-green-400" : "text-red-400"}`}
                    >
                      {portfolio.responsive ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Animations:
                    </span>
                    <span
                      className={`font-semibold text-sm sm:text-base ${portfolio.animations ? "text-green-400" : "text-red-400"}`}
                    >
                      {portfolio.animations ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Target Audience */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-slate-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center gap-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                Target Audience
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {portfolio.targetAudience}
              </p>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="font-medium">Industry:</span>{" "}
                  {portfolio.industry}
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-500/20"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Quick Actions
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {!isAuthenticated ? (
                  <>
                    <Link
                      href={portfolio.liveUrl}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                    >
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Live Preview</span>
                      <span className="sm:hidden">Preview</span>
                    </Link>
                    <Link
                      href="/signin"
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                    >
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                      <span className="hidden sm:inline">
                        Sign In to Use Template
                      </span>
                      <span className="sm:hidden">Sign In to Use</span>
                    </Link>
                  </>
                ) : isLoadingPortfolios ? (
                  <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-slate-700/50 text-gray-400 rounded-lg font-semibold text-sm sm:text-base">
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Loading...
                  </div>
                ) : hasPortfolio ? (
                  <>
                    <Link
                      href={userPortfolio.publicUrl}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">
                        View Live Portfolio
                      </span>
                      <span className="sm:hidden">Live Portfolio</span>
                    </Link>
                    <Link
                      href={`/allTemplates/${portfolio.templatePath}/${userPortfolio.slug}`}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group text-sm sm:text-base"
                    >
                      <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                      <span className="hidden sm:inline">Edit Portfolio</span>
                      <span className="sm:hidden">Edit</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={portfolio.liveUrl}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                    >
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Live Preview</span>
                      <span className="sm:hidden">Preview</span>
                    </Link>
                    {portfolio.available ? (
                      <Link
                        href={`/templateForm?${portfolio.id}`}
                        className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                      >
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                        <span className="hidden sm:inline">Use Template</span>
                        <span className="sm:hidden">Use Template</span>
                      </Link>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base opacity-80 cursor-not-allowed">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="inline">Form Not Available</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {!isAuthenticated ? (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-blue-400 text-xs sm:text-sm">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium">Ready to Get Started?</span>
                  </div>
                  <p className="text-blue-300/80 text-xs mt-1">
                    Sign in to create your own portfolio using this template and
                    unlock all features.
                  </p>
                </div>
              ) : isLoadingPortfolios ? (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-slate-900/20 border border-slate-500/30 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    <span className="font-medium">
                      Checking Portfolio Status...
                    </span>
                  </div>
                  <p className="text-slate-300/80 text-xs mt-1">
                    Please wait while we check if you have created a portfolio
                    with this template.
                  </p>
                </div>
              ) : hasPortfolio ? (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-400 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium">Portfolio Created</span>
                  </div>
                  <p className="text-green-300/80 text-xs mt-1">
                    You have already created a portfolio using this template.
                  </p>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>

        {/* Advanced Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeImageModal}
                whileHover={{
                  scale: 1.05,
                  rotate: 90,
                  backgroundColor: "rgba(239, 68, 68, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                className="absolute -top-11 sm:-top-13 md:-top-15 right-0 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />

                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* Navigation Buttons */}
              {portfolio.images.length > 1 && (
                <>
                  {/* Previous Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("prev");
                    }}
                    whileHover={{
                      scale: 1.05,
                      x: -3,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />

                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Next Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("next");
                    }}
                    whileHover={{
                      scale: 1.05,
                      x: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />

                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Mobile Touch Areas (invisible but larger touch targets) */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-20 sm:w-24 md:hidden z-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("prev");
                    }}
                    aria-label="Previous image (touch area)"
                  />
                  <div
                    className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 md:hidden z-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("next");
                    }}
                    aria-label="Next image (touch area)"
                  />
                </>
              )}

              {/* Image Counter */}
              <div className="absolute -top-8 sm:-top-10 md:-top-12 left-0 text-white/90 text-xs sm:text-sm md:text-base font-medium bg-black/40 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 border border-white/30 shadow-lg">
                <span className="hidden sm:inline">
                  {imageIndex + 1} of {portfolio.images.length}
                </span>
                <span className="sm:hidden">
                  {imageIndex + 1}/{portfolio.images.length}
                </span>
              </div>

              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src={selectedImage}
                  alt={`${portfolio.title} preview ${imageIndex + 1}`}
                  width={1400}
                  height={900}
                  className="w-full h-full object-contain max-h-[80vh]"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute -bottom-12 sm:-bottom-14 md:-bottom-16 left-0 right-0 text-center">
                <p className="text-white/90 text-xs sm:text-sm md:text-base bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 border border-white/30 inline-block shadow-lg">
                  <span className="hidden sm:inline">
                    {portfolio.title} - Preview {imageIndex + 1}
                  </span>
                  <span className="sm:hidden">Preview {imageIndex + 1}</span>
                </p>
              </div>

              {/* Keyboard Hints */}
              <div className="absolute -bottom-6 sm:-bottom-7 md:-bottom-8 right-0 text-white/70 text-xs sm:text-sm sm:flex items-center gap-2 sm:gap-3 md:gap-4 bg-black/30 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 border border-white/20 hidden">
                {portfolio.images.length > 1 && (
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                      ←
                    </kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                      →
                    </kbd>
                    <span className="text-xs">Navigate</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                    ESC
                  </kbd>
                  <span className="text-xs">Close</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
