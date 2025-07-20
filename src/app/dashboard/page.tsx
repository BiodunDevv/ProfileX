"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/UI/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";
import { motion } from "framer-motion";
import {
  Eye,
  Star,
  PlusCircle,
  Edit3,
  Rocket,
  BarChart3,
  FileText,
  PanelLeft,
  Bolt,
  ChevronRight,
  Clock,
  PieChart,
  Zap,
  CheckCircle,
  Layout,
  Grid,
  ArrowUpRight,
  LayoutTemplate,
  Sparkles,
  Globe,
  Lock,
  Plus,
  TrendingUp,
  ExternalLink,
  Calendar,
  Activity,
  Users,
} from "lucide-react";
import Preloader from "../components/UI/Preloader";

// Portfolio interface to match API response
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
  lastViewedAt?: string;
  apiEndpoint: string;
  editEndpoint: string;
  publicUrl: string;
}

interface PortfolioStats {
  totalPortfolios: number;
  totalViews: number;
  publicPortfolios: number;
  privatePortfolios: number;
  mostRecentUpdate: string;
  oldestPortfolio: string;
  portfolio1Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
  portfolio2Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Mock data for recent projects (can be replaced with actual API calls)
interface Project {
  id: string;
  name: string;
  updatedAt: string;
  progress: number;
  template: string;
  image: string;
}

// This is no longer used since we have real portfolio data
const mockProjects: Project[] = [];

const DashboardPage = () => {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    token,
    checkAuthState,
    getPortfolioStats,
    getAllUserPortfolios,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [hasProjects, setHasProjects] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(
    null
  );
  const [recentActivity, setRecentActivity] = useState<any>(null);

  // Check auth state on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthState();
        setAuthChecked(true);

        if (!isAuth) {
          console.log("User not authenticated, redirecting to signin");
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        router.push("/signin");
      }
    };

    verifyAuth();
  }, [checkAuthState, router]);

  // Generate personalized welcome message based on time of day
  useEffect(() => {
    if (!user) return;

    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    setWelcomeMessage(`${greeting}, ${user?.name?.split(" ")[0] || "there"}!`);
  }, [user]);

  // Handle loading state
  useEffect(() => {
    // Only finish loading if auth check is complete
    if (authChecked) {
      // Reduced loading time for better performance
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Trigger stats animation immediately
        setAnimateStats(true);
      }, 300); // Reduced from 1.5s to 300ms

      return () => clearTimeout(timer);
    }
  }, [authChecked]);

  // Fetch portfolio stats and portfolios
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && authChecked) {
        try {
          const [stats, portfoliosData] = await Promise.all([
            getPortfolioStats(),
            getAllUserPortfolios(),
          ]);

          if (stats?.success) {
            setPortfolioStats(stats.data);
          }

          if (portfoliosData?.success && portfoliosData.data?.portfolios) {
            setPortfolios(portfoliosData.data.portfolios);
            setHasProjects(portfoliosData.data.portfolios.length > 0);

            // Determine recent activity based on mostRecentUpdate
            if (stats?.success && portfoliosData.data.portfolios.length > 0) {
              const mostRecentDate = new Date(stats.data.mostRecentUpdate);
              const recentPortfolio = portfoliosData.data.portfolios.find(
                (p) => {
                  const updatedDate = new Date(p.updatedAt);
                  return (
                    Math.abs(updatedDate.getTime() - mostRecentDate.getTime()) <
                    1000
                  ); // Within 1 second
                }
              );

              if (recentPortfolio) {
                setRecentActivity({
                  type: "portfolio_updated",
                  portfolio: recentPortfolio,
                  timestamp: stats.data.mostRecentUpdate,
                });
              }
            }
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, authChecked, getPortfolioStats, getAllUserPortfolios]);

  // Show preloader while loading or checking auth
  if (isLoading || !authChecked) {
    return (
      <Preloader
        loadingText="Loading Dashboard"
        loadingSubtitle="Preparing your workspace..."
      />
    );
  }

  // Do not render page content if not authenticated
  if (!isAuthenticated || !token) {
    return null; // Auth check will redirect
  }

  // Function to handle creating a new project
  const handleCreateProject = () => {
    router.push("/templates");
  };

  // Function to get template image
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

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to handle portfolio actions
  const handleEditPortfolio = (portfolio: Portfolio) => {
    if (portfolio.type === "template1") {
      router.push(`/templateForm?templateOne`);
    } else if (portfolio.type === "template2") {
      router.push(`/templateForm?templateTwo`);
    }
  };

  const handleViewPortfolio = (portfolio: Portfolio) => {
    window.open(portfolio.publicUrl, "_blank");
  };

  const handlePortfolioInfo = (portfolio: Portfolio) => {
    router.push(`/portfolio-info/${portfolio.id}?type=${portfolio.type}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A] pb-2">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-24 px-2 sm:px-6 flex-1 relative z-10 overflow-hidden "
      >
        <div className="max-w-9xl mx-auto">
          {/* Hero Banner - Onboarding or Featured Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="mb-4 bg-gradient-to-r from-[#1A1E30] to-[#292B3D] border border-[#2E313C] p-3 md:p-6 rounded-2xl overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-8 items-center justify-between">
              <div className="md:max-w-xl">
                <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
                  <Sparkles size={14} className="mr-1.5" fill="currentColor" />
                  New Feature
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                  Your portfolio is waiting to be created
                </h2>
                <p className="text-gray-300 mb-5">
                  Choose from our premium templates, customize with your
                  content, and launch your professional portfolio in minutes —
                  no coding required.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/templates"
                    className="flex items-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-lg shadow-purple-900/20"
                  >
                    <LayoutTemplate size={18} className="mr-1.5" />
                    Choose a Template
                  </Link>
                  <Link
                    href="/tutorials"
                    className="flex items-center px-4 py-2.5 bg-[#2E313C] hover:bg-[#3E4154] text-gray-200 rounded-lg transition-colors"
                  >
                    <Eye size={18} className="mr-1.5" />
                    View Tutorial
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block relative w-80 h-56">
                {/* Portfolio maker showcase */}
                <div className="absolute right-0 inset-y-0 w-full h-full">
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 h-40 w-40 bg-purple-500/30 rounded-full blur-2xl"></div>
                  <div className="absolute right-20 top-10 h-20 w-20 bg-pink-500/20 rounded-full blur-xl"></div>
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <motion.div
                      className="relative h-60 w-60 bg-gradient-to-br from-[#711381] to-purple-700 rounded-xl rotate-4 shadow-xl overflow-hidden"
                      animate={{
                        rotate: [6, -2, 6],
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Portfolio preview image */}
                      <img
                        src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80"
                        alt="Portfolio maker preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-purple-500/20"></div>
                      <motion.div
                        className="absolute right-0 bottom-0 p-3 bg-white/10 backdrop-blur-md rounded-lg m-2"
                        animate={{
                          rotate: [-6, 2, -6],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      >
                        <CheckCircle size={24} className="text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-10 -top-20 h-40 w-40 bg-purple-700/10 rounded-full blur-3xl"></div>
              <div className="absolute left-10 -bottom-20 h-60 w-60 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Main Dashboard Content - Improved Grid Management */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Quick Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[
                  {
                    title: "Total Views",
                    value: portfolioStats?.totalViews || 0,
                    prevValue: 0,
                    change:
                      (portfolioStats?.totalViews ?? 0) > 0
                        ? `+${portfolioStats?.totalViews}`
                        : "0",
                    icon: Eye,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/10",
                  },
                  {
                    title: "Total Portfolios",
                    value: portfolioStats?.totalPortfolios || 0,
                    prevValue: 0,
                    change:
                      (portfolioStats?.totalPortfolios ?? 0) > 0
                        ? `+${portfolioStats?.totalPortfolios}`
                        : "0",
                    icon: Layout,
                    color: "text-purple-500",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/10",
                  },
                  {
                    title: "Public Portfolios",
                    value: portfolioStats?.publicPortfolios || 0,
                    prevValue: 0,
                    change:
                      (portfolioStats?.publicPortfolios ?? 0) > 0
                        ? `+${portfolioStats?.publicPortfolios}`
                        : "0",
                    icon: Grid,
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                    border: "border-green-500/10",
                  },
                  {
                    title: "Private Portfolios",
                    value: portfolioStats?.privatePortfolios || 0,
                    prevValue: 0,
                    change:
                      (portfolioStats?.privatePortfolios ?? 0) > 0
                        ? `+${portfolioStats?.privatePortfolios}`
                        : "0",
                    icon: PieChart,
                    color: "text-amber-500",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/10",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: animateStats ? 1 : 0,
                      y: animateStats ? 0 : 20,
                    }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      y: -3,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                    className="bg-[#1E2132] border border-[#2E313C] rounded-xl p-4 flex flex-col h-[120px] justify-between"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`${stat.bg} p-2 rounded-lg ${stat.border}`}
                      >
                        <stat.icon className={`${stat.color}`} size={18} />
                      </div>
                      {stat.change && (
                        <div
                          className={`text-xs font-medium ${
                            typeof stat.change === "string" &&
                            stat.change.startsWith("+")
                              ? "text-green-400"
                              : stat.change === "0%"
                                ? "text-gray-500"
                                : "text-red-400"
                          }`}
                        >
                          {stat.change}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-1.5">{stat.title}</p>
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Portfolios Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <FileText className="text-purple-400 mr-2" size={18} />
                    Your Portfolios
                  </h2>
                  <div className="flex gap-2">
                    <Link
                      href="/portfolios"
                      className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      View All
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                    <Link
                      href="/analytics"
                      className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center px-2 py-1 bg-blue-500/10 rounded-lg"
                    >
                      <TrendingUp size={14} className="mr-1" />
                      Analytics
                    </Link>
                  </div>
                </div>

                {hasProjects && portfolios.length > 0 ? (
                  <div className="p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr">
                      {portfolios.slice(0, 4).map((portfolio, idx) => (
                        <motion.div
                          key={portfolio.id}
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.05, duration: 0.3 }}
                          className="group relative bg-[#262A3E] hover:bg-[#2A2F45] border border-[#3E4154] rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 min-h-[200px] flex flex-col justify-between"
                        >
                          <div className="flex-1">
                            {/* Portfolio Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-16 bg-[#1E2132] rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={getTemplateImage(portfolio.type)}
                                    alt={portfolio.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-white text-sm mb-1 truncate">
                                    {portfolio.title}
                                  </h3>
                                  <p className="text-xs text-purple-400 mb-1">
                                    {portfolio.templateType}
                                  </p>
                                  {(portfolio.brandName ||
                                    portfolio.name ||
                                    portfolio.devName) && (
                                    <p className="text-xs text-gray-500 truncate">
                                      {portfolio.brandName ||
                                        portfolio.name ||
                                        portfolio.devName}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Status Badge */}
                              <div className="flex-shrink-0">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    portfolio.isPublic
                                      ? "bg-green-900/50 text-green-300 border border-green-500/30"
                                      : "bg-gray-900/50 text-gray-300 border border-gray-500/30"
                                  }`}
                                >
                                  {portfolio.isPublic ? (
                                    <>
                                      <Globe size={8} className="mr-1" />
                                      Public
                                    </>
                                  ) : (
                                    <>
                                      <Lock size={8} className="mr-1" />
                                      Private
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Portfolio Stats */}
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center">
                                  <Eye size={10} className="mr-1" />
                                  {portfolio.views} views
                                </span>
                                <span className="flex items-center">
                                  <Clock size={10} className="mr-1" />
                                  {formatDate(portfolio.updatedAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-auto">
                            <button
                              onClick={() => handleEditPortfolio(portfolio)}
                              className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                            >
                              <Edit3 size={12} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleViewPortfolio(portfolio)}
                              className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                            >
                              <ExternalLink size={12} />
                              View
                            </button>
                            <button
                              onClick={() => handlePortfolioInfo(portfolio)}
                              className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                            >
                              <BarChart3 size={12} />
                            </button>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Show more portfolios indicator */}
                    {portfolios.length > 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-center"
                      >
                        <Link
                          href="/portfolios"
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center justify-center gap-1"
                        >
                          View {portfolios.length - 4} more portfolios
                          <ChevronRight size={14} />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="py-10 text-center bg-[#1E2132]/50 rounded-lg mx-4 my-5 border border-dashed border-[#3E4154]">
                    <PlusCircle
                      className="mx-auto text-gray-500 mb-3"
                      size={40}
                    />
                    <h3 className="text-lg font-medium text-gray-300 mb-1">
                      No portfolios yet
                    </h3>
                    <p className="text-gray-500 mb-5 max-w-md mx-auto">
                      Create your first portfolio to showcase your skills and
                      experience
                    </p>
                    <button
                      onClick={handleCreateProject}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#711381] to-purple-600 text-white rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20"
                    >
                      <div className="flex items-center">
                        <PlusCircle size={16} className="mr-1.5" />
                        Create Portfolio
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <Activity className="text-purple-400 mr-2" size={18} />
                    Recent Activity
                  </h2>
                </div>

                <div className="p-5 space-y-4">
                  {/* Recent Portfolio Activity */}
                  {recentActivity && (
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Edit3 size={16} className="text-green-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-200">
                          <span className="font-medium">
                            Portfolio "{recentActivity.portfolio.title}" updated
                          </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {recentActivity.portfolio.templateType} was recently
                          modified
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(recentActivity.timestamp)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Portfolio Stats Summary */}
                  {portfolioStats && (
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <TrendingUp size={16} className="text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-200">
                          <span className="font-medium">
                            Portfolio views: {portfolioStats.totalViews}
                          </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {portfolioStats.publicPortfolios} public,{" "}
                          {portfolioStats.privatePortfolios} private portfolios
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Today</p>
                      </div>
                    </div>
                  )}

                  {/* Welcome Message */}
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Rocket size={16} className="text-purple-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        <span className="font-medium">
                          Welcome to ProfileX!
                        </span>
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Build amazing portfolios with our professional templates
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Welcome</p>
                    </div>
                  </div>

                  {/* Account Setup */}
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        <span className="font-medium">
                          Account setup complete
                        </span>
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Your ProfileX account is ready to use
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Account</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6 self-start">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <Bolt className="text-purple-400 mr-2" size={18} />
                    Quick Actions
                  </h2>
                </div>

                <div className="p-5 space-y-3">
                  {[
                    {
                      label: "Create Portfolio",
                      icon: PlusCircle,
                      color: "bg-purple-500/20 text-purple-400",
                      path: "/templates",
                    },
                    {
                      label: "Edit Profile",
                      icon: Edit3,
                      color: "bg-blue-500/20 text-blue-400",
                      path: "/profile",
                    },
                    {
                      label: "Browse Templates",
                      icon: PanelLeft,
                      color: "bg-green-500/20 text-green-400",
                      path: "/templates",
                    },
                    {
                      label: "View Analytics",
                      icon: BarChart3,
                      color: "bg-amber-500/20 text-amber-400",
                      path: "/analytics",
                    },
                  ].map((action, idx) => (
                    <Link
                      key={idx}
                      href={action.path}
                      className="w-full p-3 flex items-center justify-between rounded-lg bg-[#262A3E] hover:bg-[#2A2F45] border border-[#3E4154] hover:border-[#4E5164] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md ${action.color} mr-3`}>
                          <action.icon size={16} />
                        </div>
                        <span className="text-gray-200 font-medium text-sm">
                          {action.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-gray-500 group-hover:text-purple-400 transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio Statistics Detail */}
              {portfolioStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
                >
                  <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                    <h2 className="text-lg font-bold text-white flex items-center">
                      <BarChart3 className="text-purple-400 mr-2" size={18} />
                      Portfolio Analytics
                    </h2>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-300">
                        Recent Activity
                      </h3>

                      {portfolioStats.mostRecentUpdate && (
                        <div className="flex items-center justify-between p-3 bg-[#262A3E] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            <div>
                              <p className="text-sm text-gray-200">
                                Last Updated
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(
                                  portfolioStats.mostRecentUpdate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                          <Clock size={16} className="text-gray-400" />
                        </div>
                      )}

                      {portfolioStats.oldestPortfolio && (
                        <div className="flex items-center justify-between p-3 bg-[#262A3E] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            <div>
                              <p className="text-sm text-gray-200">
                                First Portfolio
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(
                                  portfolioStats.oldestPortfolio
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <Sparkles size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Template Breakdown */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-300">
                        Template Usage
                      </h3>

                      {portfolioStats.portfolio1Stats && (
                        <div className="flex items-center justify-between p-3 bg-[#262A3E] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-purple-400">
                                1
                              </span>
                            </div>
                            <div>
                              <p className="text-sm text-gray-200">
                                Template One
                              </p>
                              <p className="text-xs text-gray-400">
                                {portfolioStats.portfolio1Stats.views} views •
                                {portfolioStats.portfolio1Stats.isPublic
                                  ? " Public"
                                  : " Private"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                portfolioStats.portfolio1Stats.isPublic
                                  ? "bg-green-900/50 text-green-300"
                                  : "bg-gray-900/50 text-gray-300"
                              }`}
                            >
                              {portfolioStats.portfolio1Stats.isPublic ? (
                                <Globe size={10} className="mr-1" />
                              ) : (
                                <Lock size={10} className="mr-1" />
                              )}
                              {portfolioStats.portfolio1Stats.isPublic
                                ? "Live"
                                : "Draft"}
                            </div>
                          </div>
                        </div>
                      )}

                      {portfolioStats.portfolio2Stats && (
                        <div className="flex items-center justify-between p-3 bg-[#262A3E] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-blue-400">
                                2
                              </span>
                            </div>
                            <div>
                              <p className="text-sm text-gray-200">
                                Template Two
                              </p>
                              <p className="text-xs text-gray-400">
                                {portfolioStats.portfolio2Stats.views} views •
                                {portfolioStats.portfolio2Stats.isPublic
                                  ? " Public"
                                  : " Private"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                portfolioStats.portfolio2Stats.isPublic
                                  ? "bg-green-900/50 text-green-300"
                                  : "bg-gray-900/50 text-gray-300"
                              }`}
                            >
                              {portfolioStats.portfolio2Stats.isPublic ? (
                                <Globe size={10} className="mr-1" />
                              ) : (
                                <Lock size={10} className="mr-1" />
                              )}
                              {portfolioStats.portfolio2Stats.isPublic
                                ? "Live"
                                : "Draft"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Link
                        href="/analytics"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>View All</span>
                      </Link>
                      <Link
                        href="/templates"
                        className="flex-1 bg-[#2A2D3A] hover:bg-[#363A4B] text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Plus size={14} />
                        <span>Create</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
