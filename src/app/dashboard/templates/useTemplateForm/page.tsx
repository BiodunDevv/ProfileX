"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Eye, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

// Loading component for Suspense fallback
const LoadingUI = () => (
  <div className="flex flex-col justify-center items-center h-[600px] bg-[#1E2132]">
    <div className="relative w-16 h-16 mb-4">
      <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
    </div>
    <p className="text-gray-400">Loading template...</p>
  </div>
);

// Component that uses searchParams - wrapped in Suspense
const TemplateContentWithParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [templateData, setTemplateData] = useState({
    id: "",
    title: "",
    templatePath: "",
  });
  const [TemplateComponent, setTemplateComponent] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id") || "";
    const title = searchParams.get("title") || "Template";
    const templatePath = searchParams.get("path") || "";

    setTemplateData({
      id,
      title,
      templatePath,
    });

    const loadTemplate = async () => {
      try {
        setIsLoading(true);

        if (templatePath.includes("TemplateOne")) {
          const Template = dynamic(
            () => import("../../../allTemplates/templateOne/useTemplate/page"),
            {
              ssr: false,
            }
          );
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateTwo")) {
          const Template = dynamic(
            () => import("../../../allTemplates/templateTwo/useTemplate/page"),
            {
              ssr: false,
            }
          );
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateThree")) {
          const Template = dynamic(
            () =>
              import("../../../allTemplates/templateThree/useTemplate/page"),
            {
              ssr: false,
            }
          );
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateFour")) {
          const Template = dynamic(
            () => import("../../../allTemplates/templateFour/useTemplate/page"),
            {
              ssr: false,
            }
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
    router.push(
      `/dashboard/templates/templatedisplay?id=${templateData.id}&title=${templateData.title}&path=${templateData.templatePath}`
    );
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
        className="max-w-7xl mx-auto px-2 sm:px-4 py-6 flex justify-between items-center"
      >
        <Link
          href="/dashboard/templates"
          className="flex items-center gap-2 bg-[#1E2132]/80 border border-[#2E313C] px-4 py-2 rounded-lg hover:bg-[#262A3E] transition-colors text-gray-300 font-medium text-sm"
        >
          <IoArrowBack className="text-lg" />
          <span>Back to Templates</span>
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
        className="max-w-7xl mx-auto px-2 sm:px-4 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
          <Sparkles size={14} className="mr-1.5" />
          Template Editor
        </div>
        <h1 className="text-2xl font-bold text-white">{templateData.title}</h1>
        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Customize this template to fit your needs, then preview and publish
          your portfolio.
        </motion.p>
      </motion.div>

      {/* Template preview */}
      <motion.div
        className="flex justify-center items-center relative px-2 sm:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-7xl w-full border border-[#2E313C]">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[600px] bg-[#1E2132]">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
              </div>
              <p className="text-gray-400">Loading template editor...</p>
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
            <div className="template-editor-container">
              <TemplateComponent />
            </div>
          )}
        </div>
      </motion.div>

      {/* Instructions section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#1E2132]/80 border border-[#2E313C] rounded-xl p-2 sm:p-4 hover:border-[#3E4154] transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <CheckCircle size={20} className="text-purple-400 mr-2" />
            Template Customization Steps
          </h2>

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
              Customize Template when ready to see your changes in action
            </li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

// Main component with Suspense
const TemplateContent = () => {
  return (
    <Suspense fallback={<LoadingUI />}>
      <TemplateContentWithParams />
    </Suspense>
  );
};

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-[#171826] to-[#0D0F1A]">
      <TemplateContent />
    </div>
  );
};

export default Page;