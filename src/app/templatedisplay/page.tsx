"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TemplateContent = () => {
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
          const Template = dynamic(() => import("../templateone/page"), {
            ssr: false,
          });
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateTwo")) {
          const Template = dynamic(() => import("../templatetwo/page"), {
            ssr: false,
          });
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateThree")) {
          const Template = dynamic(() => import("../templateThree/page"), {
            ssr: false,
          });
          setTemplateComponent(() => Template);
        } else if (templatePath.includes("TemplateFour")) {
          const Template = dynamic(() => import("../templateFour/page"), {
            ssr: false,
          });
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
    router.push(
      `/template-form?template=${templateData.id}&path=${templateData.templatePath}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navigation and controls */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors text-gray-800 font-medium"
        >
          <IoArrowBack className="text-lg" />
          <span>Back to Templates</span>
        </Link>

        <div className="flex gap-3">
          <motion.button
            className="px-6 py-2 rounded-lg shadow flex items-center bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            onClick={handleUseTemplate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Use This Template
          </motion.button>
        </div>
      </div>

      {/* Template info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {templateData.title}
        </h1>
        <motion.p
          className="text-center text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Click &quot;Use This Template&quot; to personalize with your
          information
        </motion.p>
      </div>

      {/* Template preview */}
      <div className="flex justify-center items-center px-4 pb-10 relative">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : !TemplateComponent ? (
            <div className="flex justify-center items-center h-[600px]">
              <p className="text-gray-500">Template not found</p>
            </div>
          ) : (
            <div>
              <TemplateComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      }
    >
      <TemplateContent />
    </Suspense>
  );
};

export default Page;
