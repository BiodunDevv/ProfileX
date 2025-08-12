"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { ArrowRight, LogIn, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../../../store/useAuthStore";
import LoadingUI from "../components/UI/Preloader";
import { Eye } from "lucide-react";

const TemplateFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const [templateData, setTemplateData] = useState({
    id: "",
    title: "",
  });
  const [TemplateComponent, setTemplateComponent] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthRedirect, setShowAuthRedirect] = useState(false);

  useEffect(() => {
    // If not authenticated, allow a brief preview before showing auth message
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowAuthRedirect(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Get template type from URL parameters
    const getTemplateFromParams = () => {
      // Check for template parameter in URL or use the first parameter key
      const templateParam =
        searchParams.get("template") || Array.from(searchParams.keys())[0];

      if (!templateParam) return null;

      // Map template parameters to template data
      const templateMap: Record<string, { id: string; title: string }> = {
        templateOne: {
          id: "templateOne",
          title: "Modern Pro",
        },
        templateTwo: {
          id: "templateTwo",
          title: "Minimalist",
        },
        templateThree: {
          id: "templateThree",
          title: "Creative Portfolio",
        },
        templateFour: {
          id: "templateFour",
          title: "Dual Persona Pro",
        },
        templateFive: {
          id: "templateFive",
          title: "CLI-Verse",
        },
        templateSix: {
          id: "templateSix",
          title: "PaperTrail Editorial Resume Portfolio",
        },
        templateSeven: {
          id: "templateSeven",
          title: "Dark Academia Gothic Portfolio",
        },
        templateEight: {
          id: "templateEight",
          title: "Cyber Sentinel Portfolio",
        },
      };

      return templateMap[templateParam] || null;
    };

    const loadTemplate = async () => {
      try {
        setIsLoading(true);
        const template = getTemplateFromParams();

        if (!template) {
          console.error("Template not found");
          return;
        }

        setTemplateData(template);

        // Load the appropriate template editor component based on template ID
        if (template.id === "templateOne") {
          const Template = dynamic(
            () => import("../allTemplates/templateOne/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateTwo") {
          const Template = dynamic(
            () => import("../allTemplates/templateTwo/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateThree") {
          const Template = dynamic(
            () => import("../allTemplates/templateThree/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateFour") {
          const Template = dynamic(
            () => import("../allTemplates/templateFour/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateFive") {
          const Template = dynamic(
            () => import("../allTemplates/templateFive/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateSix") {
          const Template = dynamic(
            () => import("../allTemplates/templateSix/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateSeven") {
          const Template = dynamic(
            () => import("../allTemplates/templateSeven/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateEight") {
          const Template = dynamic(
            () => import("../allTemplates/templateEight/useTemplate/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        }
      } catch (error) {
        console.error("Error loading template:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplate();
  }, [searchParams]);

  const handlePreviewTemplate = () => {
    router.push(`/templatePreview?${templateData.id}`);
  };

  const handleSignIn = () => {
    setShowAuthRedirect(true);
    const templateParam =
      searchParams.get("template") || Array.from(searchParams.keys())[0];
    setTimeout(() => {
      router.push(`/signin?redirect=templateForm?${templateParam}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pb-5">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-pink-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation and controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-9xl mx-auto px-2 sm:px-4 py-6 flex justify-between items-center"
      >
        <Link
          href={isAuthenticated ? "/templates" : "/signin"}
          className="flex items-center gap-2 bg-[#1E2132]/80 border border-[#2E313C] px-4 py-2 rounded-lg hover:bg-[#262A3E] transition-colors text-gray-300 font-medium text-sm"
        >
          <IoArrowBack className="text-lg" />
          <span>
            {isAuthenticated ? "Back to Templates" : "Sign In to Templates"}
          </span>
        </Link>

        <div className="flex gap-3">
          <motion.button
            className="px-4 py-2 rounded-lg shadow-lg shadow-purple-900/20 flex items-center gap-2 bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white transition-all font-medium text-sm"
            onClick={handlePreviewTemplate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Preview Template
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Template info */}
      <motion.div
        className="max-w-9xl mx-auto px-2 sm:px-4 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
          <Sparkles size={14} className="mr-1.5" />
          {isAuthenticated ? "Template Editor" : "Template Preview"}
        </div>
        <h1 className="text-2xl font-bold text-white">{templateData.title}</h1>
        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isAuthenticated
            ? "Customize this template to fit your needs, then preview and publish your portfolio."
            : "Sign in to edit this template and build your professional portfolio."}
        </motion.p>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3 flex"
          >
            <button
              onClick={handleSignIn}
              className="px-4 py-1 rounded-lg flex items-center gap-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 transition-colors text-sm font-medium border border-purple-500/30"
            >
              <LogIn size={14} />
              Sign in to edit
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Template preview */}
      <motion.div
        className="flex justify-center items-center relative px-2 sm:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-9xl w-full border border-[#2E313C] relative">
          {isLoading ? (
            <LoadingUI />
          ) : !TemplateComponent ? (
            <div className="flex flex-col justify-center items-center h-[600px] bg-[#1E2132]">
              <div className="p-4 rounded-full bg-[#262A3E] mb-4">
                <Eye size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-300 font-medium">Template not found</p>
              <p className="text-gray-500 mt-2">
                The requested template could not be loaded
              </p>
            </div>
          ) : (
            <div className="template-editor-container relative">
              <TemplateComponent />
            </div>
          )}
        </div>
      </motion.div>

      {/* Instructions section */}
      <div className="max-w-9xl mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#1E2132]/80 border border-[#2E313C] rounded-xl p-2 sm:p-4 hover:border-[#3E4154] transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <CheckCircle size={20} className="text-purple-400 mr-2" />
            {isAuthenticated ? "Template Customization Steps" : "Why Sign In?"}
          </h2>

          {isAuthenticated ? (
            <ol className="space-y-3 ml-6 list-decimal text-gray-300">
              <li className="text-gray-400">
                <span className="text-white font-medium">Edit content:</span>{" "}
                Click on any text element to modify it with your information
              </li>
              <li className="text-gray-400">
                <span className="text-white font-medium">Upload images:</span>{" "}
                Replace placeholder images with your own photos
              </li>
              <li className="text-gray-400">
                <span className="text-white font-medium">Adjust styles:</span>{" "}
                Customize colors, fonts, and layout to match your preferences
              </li>
              <li className="text-gray-400">
                <span className="text-white font-medium">Preview:</span> Click
                Preview Template when ready to see your changes in action
              </li>
            </ol>
          ) : (
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start mb-3">
                <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                  <CheckCircle size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Save your changes</p>
                  <p className="text-gray-400 text-sm">
                    Create and save personalized templates with your own content
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                  <CheckCircle size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Advanced customization
                  </p>
                  <p className="text-gray-400 text-sm">
                    Access all editing tools to make the template truly yours
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                  <CheckCircle size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Publish your portfolio
                  </p>
                  <p className="text-gray-400 text-sm">
                    Share your professional portfolio with the world
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={handleSignIn}
                  className="px-6 py-2 rounded-lg shadow-lg shadow-purple-900/20 flex items-center gap-2 bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white transition-all font-medium"
                >
                  Sign In to Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateFormContent;
