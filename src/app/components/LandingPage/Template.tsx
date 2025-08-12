import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Star,
  Sparkles,
  LogIn,
  CheckCircle,
  ExternalLink,
  LayoutTemplate,
  Loader2,
} from "lucide-react";
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";
import TemplateFivePreview from "../../../../public/TemplateFivePreview.png";
import TemplateSixPreview from "../../../../public/TemplateSixPreview.png";
import TemplateSevenPreview from "../../../../public/TemplateSevenPreview.png";
import TemplateEightPreview from "../../../../public/TemplateEightPreview.png";
import { useAuthStore } from "../../../../store/useAuthStore";

const allTemplates = [
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
    imageUrl: TemplateFivePreview,
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
    imageUrl: TemplateSixPreview,
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
    imageUrl: TemplateSevenPreview,
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
    isPreviewOnly: false,
    portfolioType:
      "Cybersecurity professionals, penetration testers, security researchers, red team operators",
    industry: "Cybersecurity, Information Security, Digital Forensics",
    designStyle: "Terminal-inspired, Hacker Aesthetic, Matrix-style",
  },
];

// Define a type for template objects
type TemplatePreview = {
  id: string;
  imageUrl: any;
  title: string;
  description: string;
  templatePath: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  available: boolean;
  isPreviewOnly: boolean;
  portfolioType: string;
  industry: string;
  designStyle: string;
};

const Template = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [userPortfolios, setUserPortfolios] = useState<any[]>([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [templatePreviews, setTemplatePreviews] = useState<TemplatePreview[]>(
    []
  );
  const { isAuthenticated, getAllUserPortfolios } = useAuthStore();

  // Function to randomly select templates
  const getRandomTemplates = (count: number) => {
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...allTemplates];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'count' items
    return shuffled.slice(0, count);
  };

  // Function to handle shuffling with loading state
  const handleShuffle = () => {
    setIsShuffling(true);

    // Simulate loading for a better user experience (800ms)
    setTimeout(() => {
      setTemplatePreviews(getRandomTemplates(4));
      setIsShuffling(false);
    }, 800);
  };

  // Initialize with random templates and fetch portfolios when authenticated
  useEffect(() => {
    // Show initial loading state when component mounts
    setIsShuffling(true);

    // Select 4 random templates with a slight delay for better UX
    setTimeout(() => {
      setTemplatePreviews(getRandomTemplates(4));
      setIsShuffling(false);
    }, 600);

    const fetchData = async () => {
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
    };

    fetchData();
  }, [isAuthenticated, getAllUserPortfolios]);

  // Helper function to check if user has a portfolio for a specific template
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

  // Animation variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
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
        damping: 15,
      },
    },
  };

  return (
    <>
      {/* Templates Section */}
      <section
        id="templates"
        className="relative z-10 px-2 sm:px-6 py-16 md:py-24"
      >
        <div className="max-w-9xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
              Professional Templates
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4">
              Choose from a wide range of professionally designed templates that
              can be fully customized.
            </p>
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className={`text-sm transition-colors flex items-center gap-1.5 mx-auto px-3 py-1 rounded-full ${
                isShuffling
                  ? "bg-purple-500/10 text-purple-300 cursor-wait"
                  : "text-purple-400 hover:text-purple-300 hover:bg-purple-500/5"
              }`}
            >
              <span>{isShuffling ? "Shuffling..." : "Shuffle templates"}</span>
              <motion.div
                animate={{ rotate: isShuffling ? 360 : 0 }}
                transition={{
                  duration: 0.8,
                  repeat: isShuffling ? Infinity : 0,
                  ease: "linear",
                }}
                className="inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              </motion.div>
            </button>
          </div>

          {isShuffling ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((placeholder) => (
                <div
                  key={placeholder}
                  className="bg-[#1E2132] rounded-xl sm:rounded-2xl overflow-hidden border border-[#2E313C] h-[360px] sm:h-[400px]"
                >
                  <div className="h-full flex flex-col relative overflow-hidden animate-pulse">
                    <div className="relative h-40 sm:h-48 lg:h-52 bg-gray-700/30"></div>
                    <div className="p-4 flex-grow flex flex-col gap-4">
                      <div className="h-6 bg-gray-700/30 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-700/30 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/30 rounded w-3/4"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-6 bg-gray-700/30 rounded w-16"></div>
                        <div className="h-6 bg-gray-700/30 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <div className="h-10 bg-gray-700/30 rounded w-full mt-2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {templatePreviews.map((template, index) => {
                const userPortfolio = getUserPortfolioForTemplate(template.id);
                const hasPortfolio = !!userPortfolio;

                return (
                  <motion.div
                    key={template.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className="group relative bg-[#1E2132] rounded-xl sm:rounded-2xl overflow-hidden border border-[#2E313C] 
                     hover:border-[#3E4154] hover:shadow-xl hover:shadow-purple-900/20 
                     transition-all duration-300 transform 
                     backdrop-blur-sm"
                  >
                    <div className="h-full flex flex-col relative overflow-hidden">
                      {/* Template image */}
                      <div className="relative h-40 sm:h-48 lg:h-52 overflow-hidden cursor-pointer group/image">
                        <Image
                          src={template.imageUrl}
                          alt={template.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Image overlay on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={
                            hoveredTemplate === template.id
                              ? { opacity: 1 }
                              : { opacity: 0 }
                          }
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        />

                        {/* Template badges */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5 z-10 max-w-[calc(100%-4rem)]">
                          {hasPortfolio ? (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.2,
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
                          ) : template.available ? (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.2,
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
                                delay: 0.2,
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
                      <div className="p-3 sm:p-4 sm:pb-0 flex-grow flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-100 text-base sm:text-lg leading-tight pr-2">
                            {template.title}
                          </h3>
                          {template.featured && (
                            <motion.div
                              initial={{ rotate: 0 }}
                              animate={{
                                rotate:
                                  hoveredTemplate === template.id ? 360 : 0,
                              }}
                              transition={{ duration: 0.5 }}
                              className="text-purple-400 flex-shrink-0"
                            >
                              <Star className="w-4 h-4" fill="currentColor" />
                            </motion.div>
                          )}
                        </div>

                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                          {template.description}
                        </p>

                        {/* Portfolio Type - Hidden on mobile for space */}
                        <div className="mb-3 hidden sm:block">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-purple-400">
                              Perfect for:
                            </span>
                          </div>
                          <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                            {template.portfolioType}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {template.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tagIndex * 0.1 }}
                              className="bg-gradient-to-r from-[#262A3E] to-[#2A2E42] text-gray-300 
                               px-2 py-1 rounded-lg text-xs font-medium
                               border border-gray-600/20 hover:border-purple-500/30
                               transition-colors duration-200"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Template footer */}
                      <div className="p-3 sm:p-4 pt-0 flex flex-col items-center gap-2 justify-center">
                        {isAuthenticated ? (
                          <div className="w-full space-y-2">
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
                                <span className="hidden sm:inline">
                                  Details
                                </span>
                                <span className="sm:hidden">Info</span>
                              </Link>
                            </div>

                            {/* Primary Action */}
                            {template.available ? (
                              hasPortfolio ? (
                                <Link
                                  href={`/allTemplates/${template.templatePath}/${userPortfolio.slug}`}
                                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg border border-slate-600/50 hover:border-slate-500"
                                >
                                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  Edit Portfolio
                                  <motion.div
                                    animate={
                                      hoveredTemplate === template.id
                                        ? { x: 3 }
                                        : { x: 0 }
                                    }
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    <ArrowRight size={16} />
                                  </motion.div>
                                </Link>
                              ) : (
                                <Link
                                  href={`/templateForm?${template.id}`}
                                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg shadow-green-900/20"
                                >
                                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                  Use Template
                                  <motion.div
                                    animate={
                                      hoveredTemplate === template.id
                                        ? { x: 3 }
                                        : { x: 0 }
                                    }
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    <ArrowRight size={16} />
                                  </motion.div>
                                </Link>
                              )
                            ) : (
                              <div className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-medium opacity-80 cursor-not-allowed">
                                <Loader2 className="w-4 h-4" />
                                Coming Soon
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full space-y-2">
                            <Link
                              href={`/templates/${template.id}`}
                              className="w-full bg-slate-800/50 hover:bg-slate-800/70 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium border border-slate-700/50 hover:border-slate-600 group text-sm"
                            >
                              <LayoutTemplate className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                              View Details
                            </Link>
                            <Link
                              href="/signin"
                              className="w-full bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg shadow-purple-900/20 text-sm"
                            >
                              <LogIn className="w-4 h-4" />
                              Sign In to Use
                            </Link>
                          </div>
                        )}

                        {/* Quick stats bar */}
                        <div className="w-full mt-2 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                hasPortfolio
                                  ? "bg-green-500"
                                  : template.available
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                              }`}
                            ></div>
                            <span className="text-xs">
                              {hasPortfolio
                                ? "Portfolio Created"
                                : template.available
                                  ? "Ready to Use"
                                  : "Preview Only"}
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

          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12 md:mt-16"
            >
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <span>View All {allTemplates.length} Templates</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Template;
