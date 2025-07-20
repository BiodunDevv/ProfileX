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
} from "lucide-react";
import { getPortfolioBySlug } from "@/lib/portfolio-data";
import { useAuthStore } from "../../../../store/useAuthStore";

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const portfolio = getPortfolioBySlug(slug);
  const [userPortfolios, setUserPortfolios] = useState<any[]>([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);
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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web developer":
        return <Code className="h-5 w-5" />;
      case "designer":
        return <Palette className="h-5 w-5" />;
      case "creative professional":
        return <Sparkles className="h-5 w-5" />;
      case "technical professional":
        return <Layers className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
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
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] py-10 w-full">
      <div className="w-full px-4 mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Templates
          </Link>
        </motion.div>

        {/* Portfolio Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {isLoadingPortfolios ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                ) : (
                  hasPortfolio && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Portfolio Created
                      </span>
                    </div>
                  )
                )}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400">
                  {getCategoryIcon(portfolio.category)}
                  <span className="text-sm font-medium">
                    {portfolio.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-300">
                  {portfolio.type === "mobile" ? (
                    <Smartphone className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                  <span className="text-sm">{portfolio.type}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                {portfolio.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed">
                {portfolio.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {isLoadingPortfolios ? (
              <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-gray-400 rounded-lg font-semibold">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading Portfolio Status...
              </div>
            ) : hasPortfolio ? (
              <>
                <Link
                  href={`${portfolio.liveUrl}?${userPortfolio.slug}`}
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <ExternalLink className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  View Live Portfolio
                </Link>
                <Link
                  href={`/templateForm?${portfolio.id}`}
                  className="inline-flex items-center px-6 py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group"
                >
                  <Edit3 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Edit Portfolio
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={portfolio.liveUrl}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Live Preview
                </Link>
                <Link
                  href={`/templateForm?${portfolio.id}`}
                  className="inline-flex items-center px-6 py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Use Template
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getDesignStyleColor(portfolio.designStyle)} opacity-20`}
            />
            <Image
              src={portfolio.images[0]}
              alt={portfolio.title}
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <Target className="h-8 w-8 text-purple-400" />
                Overview
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {portfolio.longDescription}
                </p>
              </div>
            </motion.section>

            {/* Project Goal */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-4 sm:p-6 border border-purple-500/20"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-400" />
                Project Goal
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {portfolio.goal}
              </p>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <Zap className="h-8 w-8 text-blue-400" />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {portfolio.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Best For / Not Recommended */}
            <div className="grid md:grid-cols-2 gap-4 sm:p-6">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-green-900/20 rounded-2xl p-4 sm-p-6 border border-green-500/20"
              >
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  Perfect For
                </h2>
                <div className="space-y-3">
                  {portfolio.bestFor.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-red-900/20 rounded-2xl p-4 sm:p-6 border border-red-500/20"
              >
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-400" />
                  Not Recommended For
                </h2>
                <div className="space-y-3">
                  {portfolio.notRecommendedFor.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
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
                className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center gap-3">
                  <Layout className="h-8 w-8 text-purple-400" />
                  Additional Screenshots
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {portfolio.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg border border-slate-700/50"
                    >
                      <Image
                        src={image}
                        alt={`${portfolio.title} preview ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50"
            >
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm font-medium border border-slate-600/30"
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
              className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Palette className="h-6 w-6 text-purple-400" />
                Design Details
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Style:</span>
                    <span className="text-gray-300 font-semibold text-right">
                      {portfolio.designStyle}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Theme:</span>
                    <span className="text-gray-300 font-semibold text-right">
                      {portfolio.colorScheme}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Layout:</span>
                    <span className="text-gray-300 font-semibold text-right">
                      {portfolio.layout}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">
                      Responsive:
                    </span>
                    <span
                      className={`font-semibold ${portfolio.responsive ? "text-green-400" : "text-red-400"}`}
                    >
                      {portfolio.responsive ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20 hover:border-slate-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">
                      Animations:
                    </span>
                    <span
                      className={`font-semibold ${portfolio.animations ? "text-green-400" : "text-red-400"}`}
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
              className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50"
            >
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-green-400" />
                Target Audience
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {portfolio.targetAudience}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-gray-400 text-sm">
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
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-4 sm:p-6 border border-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {isLoadingPortfolios ? (
                  <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-gray-400 rounded-lg font-semibold">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </div>
                ) : hasPortfolio ? (
                  <>
                    <Link
                      href={userPortfolio.publicUrl}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      View Live Portfolio
                    </Link>
                    <Link
                      href={`/allTemplates/${portfolio.templatePath}/${userPortfolio.slug}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group"
                    >
                      <Edit3 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Edit Portfolio
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={portfolio.liveUrl}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      Live Preview
                    </Link>
                    <Link
                      href={`/templateForm?${portfolio.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-slate-600 group"
                    >
                      <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Use Template
                    </Link>
                  </>
                )}
              </div>

              {isLoadingPortfolios ? (
                <div className="mt-4 p-3 bg-slate-900/20 border border-slate-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
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
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4" />
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
      </div>
    </div>
  );
}
