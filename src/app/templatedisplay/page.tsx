"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit2, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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
  const [customizationStep, setCustomizationStep] = useState(0);
  const [customizationComplete, setCustomizationComplete] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id") || "";
    const title = searchParams.get("title") || "Template";
    const templatePath = searchParams.get("path") || "";

    setTemplateData({
      id,
      title,
      templatePath,
    });

    // Dynamically import the template component based on the path
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
    if (customizationComplete) {
      // Navigate to editor or create new profile with this template
      router.push(`/editor?template=${templateData.templatePath}`);
    } else {
      // Show first customization step
      setCustomizationStep(1);
    }
  };

  const handleCompleteCustomization = () => {
    setCustomizationComplete(true);
    setCustomizationStep(0);
  };

  const CustomizationOverlay = () => {
    const steps = [
      {
        title: "Customize Personal Information",
        description:
          "Add your name, title, and a brief introduction about yourself.",
        icon: <FiEdit2 className="text-xl" />,
      },
      {
        title: "Add Your Experience",
        description: "Include your work history, education, and skills.",
        icon: <FiEdit2 className="text-xl" />,
      },
      {
        title: "Personalize Design",
        description:
          "Choose colors, fonts, and layout options that match your style.",
        icon: <FiEdit2 className="text-xl" />,
      },
    ];

    return (
      <AnimatePresence>
        {customizationStep > 0 && (
          <motion.div
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  {steps[customizationStep - 1].icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {steps[customizationStep - 1].title}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                {steps[customizationStep - 1].description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        customizationStep === index + 1
                          ? "bg-purple-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setCustomizationStep(0)}
                    className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  {customizationStep < steps.length ? (
                    <button
                      onClick={() =>
                        setCustomizationStep(customizationStep + 1)
                      }
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteCustomization}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                    >
                      <FiCheck className="mr-2" />
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Customization overlay */}
      <CustomizationOverlay />

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
            className={`px-6 py-2 rounded-lg shadow flex items-center ${
              customizationComplete
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white transition-colors`}
            onClick={handleUseTemplate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {customizationComplete && <FiCheck className="mr-2" />}
            {customizationComplete ? "Use Template" : "Customize Template"}
          </motion.button>
        </div>
      </div>

      {/* Template info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {templateData.title}
        </h1>

        {!customizationComplete && (
          <motion.p
            className="text-center text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Customize this template to make it your own
          </motion.p>
        )}
      </div>

      {/* Template preview */}
      <div className="flex justify-center items-center px-4 pb-10 relative">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : TemplateComponent ? (
            <div
              className={`template-preview p-4 relative ${
                !customizationComplete ? "pointer-events-none select-none" : ""
              }`}
            >
              {!customizationComplete && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center z-0">
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Template Preview
                    </h3>
                    <p className="text-gray-600">
                      Click &quot;Customize Template&quot; to make this template your own
                      and unlock editing features
                    </p>
                  </motion.div>
                </div>
              )}
              <TemplateComponent />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[600px] text-gray-500">
              Template not found
            </div>
          )}
        </div>
      </div>

      {/* Completion status */}
      {customizationComplete && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <FiCheck className="mr-2 text-green-600" />
          Customization complete! You can now use this template.
        </motion.div>
      )}
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
