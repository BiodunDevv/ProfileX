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
import Preloader from "@/app/components/UI/Preloader";

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

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);

        // If user is not authenticated, skip API fetching and use default data
        if (!isAuthenticated) {
          console.log("User not authenticated, using default data for preview");
          setHasExistingPortfolio(false);
          setIsPreviewMode(true);
          setLoading(false);
          return;
        }

        // Always try to fetch portfolio data if user is authenticated
        if (isAuthenticated) {
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
              setHasExistingPortfolio(false);
            }
          } catch (storeError) {
            console.error("Error fetching from store:", storeError);
            console.log("Store error, using default data");
            setHasExistingPortfolio(false);
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
  }, [getMyPortfolio, isAuthenticated]);

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

  if (loading) {
    return (
      <Preloader
        loadingText="Loading your portfolio..."
        loadingSubtitle="Please wait while we fetch your data."
      />
    );
  }

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Show preview banner for unauthenticated users or when explicitly on templatePreview page */}
      {(!isAuthenticated || pathname.includes("/templatePreview")) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-400 py-3 flex justify-center items-center"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Eye className="h-4 w-4" />
              <span>
                {!isAuthenticated
                  ? "Template Preview - Sign in to create your own portfolio"
                  : "Template Preview Mode"}
              </span>
            </div>
            {!isAuthenticated && (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 bg-amber-900 text-amber-50 rounded-lg hover:bg-amber-800 transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-amber-900 rounded-lg hover:bg-amber-50 transition-colors font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
