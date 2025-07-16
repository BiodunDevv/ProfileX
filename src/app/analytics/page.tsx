"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/UI/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePortfolioOneStore } from "../../../store/portfolioOneStore";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Eye,
  Globe,
  Lock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Clock,
  ExternalLink,
  Download,
  Share2,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
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

const AnalyticsPage = () => {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    token,
    checkAuthState,
    getPortfolioStats,
    getAllUserPortfolios,
  } = useAuthStore();
  const { getPortfolioInfo } = usePortfolioOneStore();

  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(
    null
  );
  const [detailedPortfolioData, setDetailedPortfolioData] = useState<any[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthState();
        setAuthChecked(true);

        if (!isAuth) {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        router.push("/signin");
      }
    };

    verifyAuth();
  }, [checkAuthState, router]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (isAuthenticated && authChecked) {
        try {
          setIsLoading(true);
          const [stats, portfoliosData] = await Promise.all([
            getPortfolioStats(),
            getAllUserPortfolios(),
          ]);

          if (stats?.success) {
            setPortfolioStats(stats.data);
          }

          if (portfoliosData?.success && portfoliosData.data?.portfolios) {
            setPortfolios(portfoliosData.data.portfolios);

            // Fetch detailed data for each portfolio
            const detailedData = await Promise.all(
              portfoliosData.data.portfolios.map(
                async (portfolio: Portfolio) => {
                  if (portfolio.type === "template1") {
                    const info = await getPortfolioInfo(portfolio.id);
                    return {
                      ...portfolio,
                      detailedInfo: info,
                    };
                  }
                  return { ...portfolio, detailedInfo: null };
                }
              )
            );

            setDetailedPortfolioData(detailedData);
          }
        } catch (error) {
          console.error("Error fetching analytics data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAnalyticsData();
  }, [
    isAuthenticated,
    authChecked,
    getPortfolioStats,
    getAllUserPortfolios,
    getPortfolioInfo,
  ]);

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Re-fetch data
    const [stats, portfoliosData] = await Promise.all([
      getPortfolioStats(),
      getAllUserPortfolios(),
    ]);

    if (stats?.success) {
      setPortfolioStats(stats.data);
    }

    if (portfoliosData?.success) {
      setPortfolios(portfoliosData.data.portfolios);
    }

    setRefreshing(false);
  };

  // Utility functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

  const calculateGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Show preloader while loading
  if (isLoading || !authChecked) {
    return <Preloader />;
  }

  // Do not render if not authenticated
  if (!isAuthenticated || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pb-5">
      <Navbar />
      <div className="pt-20 pb-5">
        <div className="max-w-9xl mx-auto px-2 sm:px-6 py-5">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="p-2 bg-[#1E2132] border border-[#2E313C] rounded-lg hover:bg-[#262A3E] transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-300" />
                </Link>
                <div>
                  <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-sm text-blue-400">
                    <BarChart3
                      size={14}
                      className="mr-1.5"
                      fill="currentColor"
                    />
                    Analytics Dashboard
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-1">
                    Portfolio Analytics
                  </h1>
                  <p className="text-gray-400">
                    Track your portfolio performance and engagement metrics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Time Range Selector */}
                <div className="flex items-center bg-[#1E2132] border border-[#2E313C] rounded-lg p-1">
                  {["7d", "30d", "90d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedTimeRange === range
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {range === "7d"
                        ? "7 Days"
                        : range === "30d"
                          ? "30 Days"
                          : "90 Days"}
                    </button>
                  ))}
                </div>

                {/* Refresh Button */}
                <motion.button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2.5 bg-[#1E2132] border border-[#2E313C] rounded-lg hover:bg-[#262A3E] transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw
                    size={18}
                    className={`text-gray-300 ${refreshing ? "animate-spin" : ""}`}
                  />
                </motion.button>

                {/* Export Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-medium shadow-lg shadow-purple-900/25"
                >
                  <Download size={16} />
                  Export
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Overview Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              {
                title: "Total Views",
                value: portfolioStats?.totalViews || 0,
                change: "+12%",
                trend: "up",
                icon: Eye,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
              {
                title: "Total Portfolios",
                value: portfolioStats?.totalPortfolios || 0,
                change: "+25%",
                trend: "up",
                icon: BarChart3,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
              },
              {
                title: "Public Portfolios",
                value: portfolioStats?.publicPortfolios || 0,
                change: "0%",
                trend: "neutral",
                icon: Globe,
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-500/20",
              },
              {
                title: "Private Portfolios",
                value: portfolioStats?.privatePortfolios || 0,
                change: "+50%",
                trend: "up",
                icon: Lock,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`bg-[#1E2132] border ${stat.border} rounded-xl p-6 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <stat.icon className={`${stat.color}`} size={20} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-green-400"
                        : stat.trend === "down"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight size={12} />
                    ) : stat.trend === "down" ? (
                      <ArrowDownRight size={12} />
                    ) : null}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="lg:col-span-2 bg-[#1E2132] border border-[#2E313C] rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="text-blue-400 mr-2" size={20} />
                  Portfolio Performance
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Views
                </div>
              </div>

              {/* Simplified Chart Visualization */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {portfolios.map((portfolio, index) => (
                  <div
                    key={portfolio.id}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg min-h-[20px] mb-2"
                      style={{
                        height: `${Math.max((portfolio.views / Math.max(...portfolios.map((p) => p.views), 1)) * 200, 20)}px`,
                      }}
                    />
                    <span className="text-xs text-gray-400 text-center">
                      {portfolio.title.length > 10
                        ? portfolio.title.substring(0, 10) + "..."
                        : portfolio.title}
                    </span>
                    <span className="text-xs text-blue-400 font-medium">
                      {portfolio.views}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Performing Portfolios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="bg-[#1E2132] border border-[#2E313C] rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white flex items-center mb-6">
                <Sparkles className="text-purple-400 mr-2" size={20} />
                Top Performers
              </h2>

              <div className="space-y-4">
                {portfolios
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 3)
                  .map((portfolio, index) => (
                    <div
                      key={portfolio.id}
                      className="flex items-center gap-3 p-3 bg-[#262A3E] rounded-lg"
                    >
                      <div className="relative">
                        <img
                          src={getTemplateImage(portfolio.type)}
                          alt={portfolio.title}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div
                          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? "bg-yellow-500 text-yellow-900"
                              : index === 1
                                ? "bg-gray-400 text-gray-900"
                                : "bg-amber-600 text-amber-100"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm truncate">
                          {portfolio.title}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {portfolio.views} views
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {portfolio.isPublic ? (
                          <Globe size={12} className="text-green-400" />
                        ) : (
                          <Lock size={12} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {portfolios.length === 0 && (
                <div className="text-center py-8">
                  <PieChart className="mx-auto text-gray-500 mb-3" size={40} />
                  <p className="text-gray-400">No portfolios to analyze yet</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Detailed Portfolio List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-8 bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#2E313C]">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Activity className="text-green-400 mr-2" size={20} />
                Portfolio Details
              </h2>
              <Link
                href="/portfolios"
                className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center"
              >
                Manage All
                <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#262A3E]">
                  <tr>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Portfolio
                    </th>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Type
                    </th>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Views
                    </th>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Last Updated
                    </th>
                    <th className="text-left py-3 px-6 text-gray-400 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolios.map((portfolio, index) => (
                    <motion.tr
                      key={portfolio.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-[#2E313C] hover:bg-[#262A3E] transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={getTemplateImage(portfolio.type)}
                            alt={portfolio.title}
                            className="w-10 h-7 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium text-white text-sm">
                              {portfolio.title}
                            </h3>
                            {(portfolio.brandName ||
                              portfolio.name ||
                              portfolio.devName) && (
                              <p className="text-xs text-gray-400">
                                {portfolio.brandName ||
                                  portfolio.name ||
                                  portfolio.devName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-purple-400">
                          {portfolio.templateType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            portfolio.isPublic
                              ? "bg-green-900/50 text-green-300"
                              : "bg-gray-900/50 text-gray-300"
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
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Eye size={12} className="text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {portfolio.views}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {formatDate(portfolio.updatedAt)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              window.open(portfolio.publicUrl, "_blank")
                            }
                            className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded transition-colors"
                            title="View Portfolio"
                          >
                            <ExternalLink size={14} />
                          </button>
                          <button
                            className="p-1.5 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded transition-colors"
                            title="Share Portfolio"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {portfolios.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="mx-auto text-gray-500 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No portfolio data available
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first portfolio to start seeing analytics
                  </p>
                  <Link
                    href="/templates"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Create Portfolio
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
