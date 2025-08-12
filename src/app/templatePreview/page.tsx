"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { ArrowRight, LogIn, Eye, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../../../store/useAuthStore";

const TemplatePreview = () => {
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    // Get template type from URL parameters
    const getTemplateFromParams = () => {
      // Check for template parameter in URL
      const templateParam =
        searchParams.get("template") || Array.from(searchParams.keys())[0]; // Get first param key if no 'template' key

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

        // Load the appropriate template preview component based on template ID
        if (template.id === "templateOne") {
          const Template = dynamic(
            () => import("../allTemplates/templateOne/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateTwo") {
          const Template = dynamic(
            () => import("../allTemplates/templateTwo/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateThree") {
          const Template = dynamic(
            () => import("../allTemplates/templateThree/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateFour") {
          const Template = dynamic(
            () => import("../allTemplates/templateFour/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateFive") {
          const Template = dynamic(
            () => import("../allTemplates/templateFive/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateSix") {
          const Template = dynamic(
            () => import("../allTemplates/templateSix/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateSeven") {
          const Template = dynamic(
            () => import("../allTemplates/templateSeven/page"),
            { ssr: false }
          );
          setTemplateComponent(() => Template);
        } else if (template.id === "templateEight") {
          const Template = dynamic(
            () => import("../allTemplates/templateEight/page"),
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

  const handleUseTemplate = () => {
    router.push(`/templateForm?${templateData.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] pb-5">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation and controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-9xl mx-auto px-2 sm:px-4 py-4 flex justify-between items-center"
      >
        {/* Back button - conditionally show either "Back to Templates" or "Back to Home" */}
        <Link
          href={isAuthenticated ? "/templates" : "/"}
          className="flex items-center gap-2 bg-[#1E2132]/80 border border-[#2E313C] px-4 py-2 rounded-lg hover:bg-[#262A3E] transition-colors text-gray-300 font-medium"
        >
          <IoArrowBack className="text-lg" />
          <span>{isAuthenticated ? "Templates" : "Back to Home"}</span>
        </Link>

        <div className="flex gap-3">
          {isAuthenticated ? (
            <motion.button
              className="px-6 py-2 rounded-lg shadow-lg shadow-purple-900/20 flex items-center gap-2 bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white transition-all font-medium"
              onClick={handleUseTemplate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Use Template
              <ArrowRight size={16} />
            </motion.button>
          ) : (
            <motion.button
              className="px-6 py-2 rounded-lg shadow-lg shadow-purple-900/20 flex items-center gap-2 bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white transition-all font-medium"
              onClick={handleUseTemplate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In to Use
              <LogIn size={16} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Template info */}
      <motion.div
        className="max-w-9xl mx-auto p-2 sm:p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
          <Eye size={14} className="mr-1.5" />
          Template Preview
        </div>
        <h1 className="text-2xl font-bold text-white">{templateData.title}</h1>
        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Preview how this template looks.{" "}
          {isAuthenticated
            ? 'Click "Use This Template" to personalize it with your information.'
            : "Sign in to use this template for your portfolio."}
        </motion.p>
      </motion.div>

      {/* Template preview */}
      <motion.div
        className="flex justify-center items-center relative px-2 sm:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-9xl w-full border border-[#2E313C]">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[600px] bg-[#1E2132]">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
              </div>
              <p className="text-gray-400">Loading template preview...</p>
            </div>
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
            <div className="template-preview-container">
              <TemplateComponent />
            </div>
          )}
        </div>
      </motion.div>

      {/* Auth CTA banner for non-authenticated users */}
      {!isAuthenticated && !isLoading && TemplateComponent && (
        <motion.div
          className="max-w-9xl mx-auto mt-6 mb-2 p-4 bg-[#252739] border border-purple-500/20 rounded-lg flex flex-col sm:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-medium text-white">
              Like what you see?
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Create an account to start building your professional portfolio
              today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/signin"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
            >
              Sign In
              <LogIn size={14} />
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 border border-purple-500/50 hover:border-purple-500 text-purple-400 hover:text-purple-300 rounded-md text-sm font-medium transition-colors"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      )}

      {/* Selection confirmation message */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-auto md:bottom-10 md:w-auto md:max-w-md mx-auto bg-[#1E2132]/80 backdrop-blur-lg border border-green-500/30 shadow-xl rounded-xl p-4 text-center z-50"
          >
            <p className="text-green-400 flex items-center justify-center">
              <CheckCircle size={16} className="mr-2" />
              Template selected! Redirecting to customization...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth prompt message */}
      <AnimatePresence>
        {showAuthPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-auto md:bottom-10 md:w-auto md:max-w-md mx-auto bg-[#1E2132]/80 backdrop-blur-lg border border-blue-500/30 shadow-xl rounded-xl p-4 text-center z-50"
          >
            <p className="text-blue-400 flex items-center justify-center">
              <LogIn size={16} className="mr-2" />
              Redirecting to sign in page...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplatePreview;
