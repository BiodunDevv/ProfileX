import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Star, Sparkles, LogIn } from "lucide-react";
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";
import { useAuthStore } from "../../../../store/useAuthStore";

const templatePreviews = [
  {
    id: "modern-pro",
    imageUrl: TemplateOnePreview,
    title: "Modern Pro",
    description: "Clean & Professional",
    Template: "TemplateOne",
    tags: ["Minimal", "Light", "Corporate"],
    popular: true,
    isNew: false,
  },
  {
    id: "minimalist",
    imageUrl: TemplateTwoPreview,
    title: "Minimalist",
    description: "Simple & Elegant",
    Template: "TemplateTwo",
    tags: ["Clean", "Light", "Simple"],
    popular: false,
    isNew: true,
  },
  {
    id: "creative-portfolio",
    imageUrl: TemplateThreePreview,
    title: "Creative Portfolio",
    description: "Bold & Innovative",
    Template: "TemplateThree",
    tags: ["Bold", "Dark", "Modern"],
    popular: true,
    isNew: false,
  },
  {
    id: "tech-resume",
    imageUrl: TemplateFourPreview,
    title: "Tech Resume",
    description: "Digital & Dynamic",
    Template: "TemplateFour",
    tags: ["Modern", "Dark", "Interactive"],
    popular: false,
    isNew: true,
  },
];

const Template = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
              Professional Templates
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from a wide range of professionally designed templates that
              can be fully customized.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {templatePreviews.map((template, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                className="group bg-[#1E2132] rounded-lg overflow-hidden border border-[#2E313C] hover:border-[#3E4154] hover:shadow-lg hover:shadow-purple-900/10 transition-all"
              >
                <motion.div className="h-full flex flex-col">
                  {/* Template image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={template.imageUrl}
                      alt={template.title}
                      width={400}
                      height={300}
                      className="w-full object-cover sm:group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Template badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {template.isNew && (
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                          <Sparkles size={10} className="mr-1" />
                          New
                        </span>
                      )}
                      {template.popular && (
                        <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                          <Star size={10} className="mr-1" />
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Template info */}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-gray-200 text-lg mb-1">
                      {template.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#262A3E] text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Template footer */}
                  <div className="p-4 pt-0 flex flex-col items-center gap-2 justify-center">
                    {isAuthenticated ? (
                      <Link
                        href={`/templatedisplay?id=${template.id}&title=${template.title}&path=${template.Template}`}
                        className="w-full bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg shadow-purple-900/10"
                      >
                        Use Template
                        <motion.div
                          animate={
                            hoveredTemplate === template.id
                              ? { x: 3 }
                              : { x: 0 }
                          }
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </Link>
                    ) : (
                      <Link
                        href="/signin"
                        className="w-full bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group shadow-lg shadow-purple-900/10"
                      >
                        Sign In to Use
                        <motion.div
                          animate={
                            hoveredTemplate === template.id
                              ? { x: 3 }
                              : { x: 0 }
                          }
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <LogIn size={16} />
                        </motion.div>
                      </Link>
                    )}

                    <Link
                      href={`/templates/templatedisplay?id=${template.id}&title=${template.title}&path=${template.Template}`}
                      className="w-full text-purple-400 hover:text-purple-300 text-sm font-medium px-4 py-2 flex items-center justify-center gap-1.5 bg-[#1E2132]/80 hover:bg-[#262A3E] backdrop-blur-sm border border-purple-500/20 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      Preview
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href={isAuthenticated ? "/dashboard/templates" : "/signin"}
              className="bg-gradient-to-r from-[#711381] to-purple-600 px-6 py-3 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all font-medium shadow-lg shadow-purple-900/10 inline-flex items-center gap-2"
            >
              {isAuthenticated
                ? "View All Templates"
                : "Sign In to Explore More"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Template;
