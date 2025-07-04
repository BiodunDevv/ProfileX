"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/UI/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import Preloader from "../components/UI/Preloader";

// Mock data for recent projects (can be replaced with actual API calls)
interface Project {
  id: string;
  name: string;
  updatedAt: string;
  progress: number;
  template: string;
  image: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Personal Portfolio",
    updatedAt: "2 days ago",
    progress: 70,
    template: "Modern Dark",
    image: "/project-thumb-1.jpg",
  },
  {
    id: "2",
    name: "Freelance Showcase",
    updatedAt: "5 days ago",
    progress: 40,
    template: "Creative",
    image: "/project-thumb-2.jpg",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, token, checkAuthState } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hasProjects, setHasProjects] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

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
    // Set mock projects
    setHasProjects(mockProjects.length > 0);
    setProjects(mockProjects);
  }, [user]);

  // Handle loading state
  useEffect(() => {
    // Only finish loading if auth check is complete
    if (authChecked) {
      // Simulate data loading with a minimum display time for the preloader
      const timer = setTimeout(() => {
        setIsLoading(false);

        // Trigger stats animation after a brief delay
        setTimeout(() => {
          setAnimateStats(true);
        }, 300);
      }, 1500); // Show preloader for at least 1.5 seconds for a smooth experience

      return () => clearTimeout(timer);
    }
  }, [authChecked]);

  // Show preloader while loading or checking auth
  if (isLoading || !authChecked) {
    return <Preloader />;
  }

  // Do not render page content if not authenticated
  if (!isAuthenticated || !token) {
    return null; // Auth check will redirect
  }

  // Function to handle creating a new project
  const handleCreateProject = () => {
    router.push("/templates");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pb-2">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-24 px-2 sm:px-6 flex-1 relative z-10 overflow-hidden "
      >
        <div className="max-w-9xl mx-auto">
          {/* Dashboard Header with Welcome Message and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-grow"
            >
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-500">
                {welcomeMessage}
              </h1>
              <p className="mt-2 text-gray-400">
                Here&apos;s what&apos;s happening with your portfolio today
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-3"
            >
              <button
                onClick={handleCreateProject}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#711381] to-purple-600 text-white rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 shadow-lg shadow-purple-900/20 transition-all group"
              >
                <PlusCircle size={18} />
                <span className="font-medium">New Portfolio</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </button>
            </motion.div>
          </div>

          {/* Hero Banner - Onboarding or Featured Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
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
                {/* Abstract decoration element */}
                <div className="absolute right-0 inset-y-0 w-full h-full">
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 h-40 w-40 bg-purple-500/30 rounded-full blur-2xl"></div>
                  <div className="absolute right-20 top-10 h-20 w-20 bg-pink-500/20 rounded-full blur-xl"></div>
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <motion.div
                      className="relative h-44 w-44 bg-gradient-to-br from-[#711381] to-purple-700 rounded-xl rotate-6 shadow-xl"
                      animate={{
                        rotate: [6, -3, 6],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="absolute right-0 bottom-0 p-3 bg-white/10 backdrop-blur-md rounded-lg m-2"
                        animate={{
                          rotate: [-6, 3, -6],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3,
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

          {/* Main Dashboard Content - Layout Changes Based on Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Quick Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[
                  {
                    title: "Portfolio Views",
                    value: 0,
                    prevValue: 0,
                    change: 0,
                    icon: Eye,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/10",
                  },
                  {
                    title: "Active Portfolios",
                    value: hasProjects ? projects.length : 0,
                    prevValue: 0,
                    change: hasProjects ? "+100%" : "0%",
                    icon: Layout,
                    color: "text-purple-500",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/10",
                  },
                  {
                    title: "Templates Used",
                    value: hasProjects ? projects.length : 0,
                    prevValue: 0,
                    change: hasProjects ? "+1" : "0",
                    icon: Grid,
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                    border: "border-green-500/10",
                  },
                  {
                    title: "Completion Rate",
                    value: hasProjects ? "42%" : "0%",
                    prevValue: "0%",
                    change: hasProjects ? "+42%" : "0%",
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
                      delay: 0.2 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="bg-[#1E2132] border border-[#2E313C] rounded-xl p-4 flex flex-col"
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
                    <AnimatePresence>
                      <motion.div
                        key={stat.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-bold text-white"
                      >
                        {stat.value}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>

              {/* Projects Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <FileText className="text-purple-400 mr-2" size={18} />
                    Your Portfolios
                  </h2>
                  <Link
                    href="/projects"
                    className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {hasProjects ? (
                  <div className="p-5">
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.5 }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-[#262A3E] hover:bg-[#2A2F45] border border-[#3E4154] rounded-lg p-4 mb-3 last:mb-0 transition-colors cursor-pointer"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        {/* Project thumbnail - can be replaced with real images */}
                        <div className="h-16 w-20 bg-[#1E2132] rounded-md flex-shrink-0 overflow-hidden relative">
                          {project.image ? (
                            <div className="relative h-full w-full">
                              {/* Would need to replace with your Image implementation */}
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 mix-blend-overlay"></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Layout size={24} className="text-gray-600" />
                            </div>
                          )}
                        </div>

                        {/* Project details */}
                        <div className="flex-grow">
                          <h3 className="text-base font-medium text-white mb-1">
                            {project.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-2">
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              Updated {project.updatedAt}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center">
                              <LayoutTemplate size={12} className="mr-1" />
                              {project.template}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-[#1E2132] rounded-full h-1.5 mb-1">
                            <motion.div
                              className={`h-1.5 rounded-full ${
                                project.progress >= 70
                                  ? "bg-green-500"
                                  : project.progress >= 30
                                    ? "bg-amber-500"
                                    : "bg-purple-500"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{
                                delay: 0.3,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              Completion
                            </span>
                            <span className="text-xs font-medium text-gray-300">
                              {project.progress}%
                            </span>
                          </div>
                        </div>

                        {/* Action button */}
                        <div className="flex-shrink-0 mt-3 md:mt-0">
                          <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                            <Edit3 size={14} className="mr-1" />
                            Edit
                          </button>
                        </div>
                      </motion.div>
                    ))}
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
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <Zap className="text-purple-400 mr-2" size={18} />
                    Activity Feed
                  </h2>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Rocket size={16} className="text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        <span className="font-medium">
                          Welcome to ProfileX!
                        </span>
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        We&apos;re excited to have you on board. Start by
                        creating your first portfolio.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Star size={16} className="text-purple-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        <span className="font-medium">
                          Account created successfully
                        </span>
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Your ProfileX account has been set up and is ready to
                        use.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Today</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
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

              {/* Templates Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-[#1E2132] border border-[#2E313C] rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#2E313C]">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <LayoutTemplate
                      className="text-purple-400 mr-2"
                      size={18}
                    />
                    Featured Templates
                  </h2>
                  <Link
                    href="/templates"
                    className="text-sm font-medium text-purple-400 hover:text-purple-300"
                  >
                    View All
                  </Link>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: "Modern",
                        color: "bg-gradient-to-br from-purple-500 to-pink-500",
                      },
                      {
                        name: "Professional",
                        color: "bg-gradient-to-br from-blue-500 to-cyan-500",
                      },
                      {
                        name: "Minimal",
                        color: "bg-gradient-to-br from-gray-700 to-gray-900",
                      },
                      {
                        name: "Creative",
                        color: "bg-gradient-to-br from-amber-500 to-red-500",
                      },
                    ].map((template, i) => (
                      <Link
                        key={i}
                        href={`/templates?filter=${template.name.toLowerCase()}`}
                        className="group cursor-pointer relative overflow-hidden rounded-lg"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${template.color} h-26 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}
                        >
                          <span className="text-white font-medium text-sm relative z-10">
                            {template.name}
                          </span>
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                          <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={14} className="text-white" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/templates"
                    className="block w-full mt-4 text-sm text-center text-purple-400 font-medium hover:text-purple-300 py-2 border border-[#3E4154] hover:border-purple-500/30 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-center">
                      <Eye size={14} className="mr-1.5" />
                      Browse All Templates
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
