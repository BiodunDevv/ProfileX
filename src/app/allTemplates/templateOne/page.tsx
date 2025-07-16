/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/TemplateOne/Hero";
import HeroImage from "../../components/TemplateOne/images/Hero picture.svg";
import Experience from "../../components/TemplateOne/Experience";
import Projects from "../../components/TemplateOne/images/Projects.jpg";
import About from "../../components/TemplateOne/About";
import Contact from "../../components/TemplateOne/Contact";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../../../store/useAuthStore";
import usePortfolioOneStore from "../../../../store/portfolioOneStore";
import { LayoutGrid, Loader2 } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PencilIcon, Home, ChevronLeft, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const defaultHeroDetails = {
  DevName: "WorkName",
  title: "Your Name Here",
  description:
    "About you: Lorem, ipsum dolor sit amet consectetur adipisicing elit Recusandae, aperiam quidem iste eligendi fugiat porro sapiente dolorem dolor numquam rem vel molestiae nobis accusantium provident, voluptatibus.",
  heroImage: HeroImage,
  Companies: ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"],
};

const defaultProjects = [
  {
    id: 1,
    type: "Project Type",
    typeColor: "blue",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 2,
    type: "Project Type",
    typeColor: "purple",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 3,
    type: "Project Type",
    typeColor: "green",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
  {
    id: 4,
    type: "Project Type",
    typeColor: "amber",
    name: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum iure nulla quasi aperiam recusandae sed doloremque reiciendis, doloribus ex mollitia distinctio!",
    image: Projects,
    sourceLink: "#",
    demoLink: "#",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
};

const defaultAboutData = {
  title: "About Me",
  subtitle: "Professional Background & Expertise",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae felis vel magna scelerisque facilisis. Fusce at fringilla orci. Proin gravida, nisi vel cursus pulvinar, justo nulla faucibus mauris, sit amet convallis erat magna vel velit. Donec vel luctus est, vel malesuada libero. Vestibulum luctus sapien at consequat eleifend.",
  skills: [
    { name: "Frontend Development", level: 5, color: "bg-blue-500" },
    { name: "Backend Architecture", level: 4, color: "bg-yellow-500" },
    { name: "UI/UX Design", level: 3, color: "bg-blue-600" },
    { name: "Database Management", level: 4, color: "bg-green-600" },
    { name: "Cloud Services", level: 4, color: "bg-black" },
    { name: "RESTful APIs", level: 5, color: "bg-orange-500" },
    { name: "Mobile Development", level: 3, color: "bg-cyan-500" },
    { name: "DevOps", level: 2, color: "bg-purple-500" },
  ],
  education: [
    {
      degree: "Master of Lorem Ipsum",
      institution: "University of Placeholder",
      year: "2018-2020",
      description:
        "Magna cum laude, focus on advanced dolor sit amet technologies",
    },
    {
      degree: "Bachelor of Consectetur",
      institution: "Adipiscing Institute",
      year: "2014-2018",
      description:
        "Specialized in elit consequat with minor in vestibulum methods",
    },
  ],
};

const defaultContactData = {
  email: "contact@example.com",
  phone: "+1 (123) 456-7890",
  socialLinks: [
    {
      platform: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/in/yourusername",
    },
    {
      platform: "GitHub",
      icon: "github",
      url: "https://github.com/yourusername",
    },
    {
      platform: "Twitter",
      icon: "twitter",
      url: "https://twitter.com/yourusername",
    },
  ],
};

const TemplateOne = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    hero: { ...defaultHeroDetails },
    about: { ...defaultAboutData },
    projects: [...defaultProjects],
    contact: { ...defaultContactData },
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasExistingPortfolio, setHasExistingPortfolio] = useState(false);

  // Get auth state directly from the store
  const { isAuthenticated, token } = useAuthStore();
  const {
    getMyPortfolio,
    portfolio,
    isLoading: isPortfolioLoading,
  } = usePortfolioOneStore();

  // Updated URL detection logic to properly handle template preview URLs
  const isPublicTemplatePreview =
    pathname === "/templatePreview" && searchParams.has("template1");

  useEffect(() => {
    // If this is a public template preview (templatePreview?template1), always use default data
    if (isPublicTemplatePreview) {
      console.log("Public template preview detected, using default data");
      setLoading(false);
      setIsPreviewMode(true);
      return;
    }

    const fetchPortfolio = async () => {
      try {
        setLoading(true);

        // For allTemplates/templateOne URL, always try to fetch portfolio using getMyPortfolio
        if (pathname.startsWith("/allTemplates/templateOne")) {
          console.log("Fetching user's portfolio from store...");

          try {
            // Get portfolio from the store using the getMyPortfolio API
            const userPortfolio = await getMyPortfolio();

            if (userPortfolio) {
              // User has an existing portfolio
              setHasExistingPortfolio(true);

              // Cast to any to handle dynamic API response structure
              const portfolioAny =
                (userPortfolio as any)?.data?.portfolio || userPortfolio;

              // Transform the fetched data into the format expected by our components
              const transformedData = {
                hero: {
                  DevName: portfolioAny.brandName || defaultHeroDetails.DevName,
                  title: portfolioAny.title || defaultHeroDetails.title,
                  description:
                    portfolioAny.description || defaultHeroDetails.description,
                  heroImage:
                    portfolioAny.heroImage || defaultHeroDetails.heroImage,
                  Companies:
                    portfolioAny.companies || defaultHeroDetails.Companies,
                },
                about: {
                  title: portfolioAny.sectionAbout || defaultAboutData.title,
                  subtitle:
                    portfolioAny.sectionSubtitle || defaultAboutData.subtitle,
                  description:
                    portfolioAny.aboutMeDescription ||
                    defaultAboutData.description,
                  skills:
                    portfolioAny.skills?.map((skill: any) => ({
                      name: skill.name,
                      level: skill.level || 3,
                      color: skill.color || "bg-purple-500",
                    })) || defaultAboutData.skills,
                  education:
                    portfolioAny.education?.map((edu: any) => ({
                      degree: edu.degree,
                      institution: edu.institution,
                      year: edu.years || edu.year,
                      description: edu.description,
                    })) || defaultAboutData.education,
                },
                projects:
                  portfolioAny.projects?.map((project: any, index: number) => ({
                    id: index + 1,
                    type: project.technologies?.[0] || "Project",
                    typeColor: ["blue", "purple", "green", "amber"][index % 4],
                    name: project.name || project.title,
                    description: project.description,
                    image: project.imageUrl || Projects,
                    sourceLink: project.repoUrl || project.githubUrl || "#",
                    demoLink: project.liveUrl || "#",
                  })) || defaultProjects,
                contact: {
                  email:
                    portfolioAny.contactInfo?.[0]?.emailAddress ||
                    portfolioAny.personalInfo?.email ||
                    defaultContactData.email,
                  phone:
                    portfolioAny.contactInfo?.[0]?.phoneNumber ||
                    portfolioAny.personalInfo?.phone ||
                    defaultContactData.phone,
                  socialLinks:
                    portfolioAny.socialLinks?.map((link: any) => ({
                      platform: link.platform,
                      icon: link.icon || link.platform.toLowerCase(),
                      url: link.url,
                    })) || defaultContactData.socialLinks,
                },
              };

              setPortfolioData(transformedData);
              console.log("Portfolio data set successfully");
            } else {
              console.log("No portfolio found, using default data");
            }
          } catch (storeError) {
            console.error("Error fetching from store:", storeError);
            console.log("Store error, using default data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong while loading portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [pathname, searchParams, isPublicTemplatePreview, getMyPortfolio]);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("Loading timeout reached, forcing default data");
        setLoading(false);
      }
    }, 8000); // 8 second maximum loading time

    return () => clearTimeout(timeout);
  }, [loading]);

  const handlePreviewPortfolio = () => {
    router.push("/allTemplates/templateOne");
  };

  const handleEditPortfolio = () => {
    router.push("/templates/templateOne/edit");
  };

  const handleBackToPortfolios = () => {
    router.push("/portfolios");
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-2.5 items-center justify-center bg-gradient-to-br from-[#171826] to-[#0D0F1A]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
          <LayoutGrid
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500"
            size={24}
          />
        </div>
        <div className="text-center mt-4">
          <h3 className="text-white font-medium text-lg mb-2">
            Loading Portfolio
          </h3>
          <p className="text-gray-400 text-sm">
            {isPortfolioLoading
              ? "Fetching your portfolio data..."
              : "Please wait..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Modern top navigation - only show if not in public template preview */}
      {!isPublicTemplatePreview && isAuthenticated && (
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-3 px-6 shadow-lg z-40">
          <div className="max-w-9xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white font-medium text-lg mr-6"
              >
                Preview Mode
              </motion.h3>
            </div>

            <div className="flex gap-3">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleBackToPortfolios}
                className="group flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>All Portfolios</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleEditPortfolio}
                className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <PencilIcon className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span>Edit Portfolio</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Dashboard</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Preview mode banner */}
      {isPublicTemplatePreview && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-400 py-2 flex justify-center items-center"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Eye className="h-4 w-4" />
              <span>Template Preview Mode</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Portfolio content */}
      <Hero
        DevName={portfolioData.hero.DevName}
        title={portfolioData.hero.title}
        description={portfolioData.hero.description}
        heroImage={portfolioData.hero.heroImage}
        Companies={portfolioData.hero.Companies}
      />
      <About
        title={portfolioData.about.title}
        subtitle={portfolioData.about.subtitle}
        description={portfolioData.about.description}
        skills={portfolioData.about.skills}
        education={portfolioData.about.education}
      />
      <Experience projects={portfolioData.projects} colorMap={colorMap} />
      <Contact
        email={portfolioData.contact.email}
        phone={portfolioData.contact.phone}
        socialLinks={portfolioData.contact.socialLinks}
      />
      <ToastContainer position="bottom-right" theme="dark" />
    </motion.div>
  );
};

export default TemplateOne;
