"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Code,
  Figma,
  Layers,
  Zap,
  Brush,
  Database,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";

interface ToolsData {
  designer: string[];
  developer: string[];
}

interface ToolsProps {
  activePersona: "designer" | "developer";
  toolsData: ToolsData;
}

const Tools: React.FC<ToolsProps> = ({ activePersona, toolsData }) => {
  const getToolIcon = (tool: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      // Designer tools
      Figma: Figma,
      Photoshop: Brush,
      Illustrator: Palette,
      Spline: Layers,
      Framer: Zap,
      Principle: Monitor,

      // Developer tools
      React: Code,
      "Next.js": Globe,
      TailwindCSS: Palette,
      "Framer Motion": Zap,
      TypeScript: Code,
      Vercel: Database,
    };

    return iconMap[tool] || (activePersona === "designer" ? Brush : Code);
  };

  const currentTools = toolsData[activePersona];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#1A1D29]">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Tools & Technologies
          </h2>
          <p className="text-[#B1B2B5]/80 text-lg max-w-2xl mx-auto">
            {activePersona === "designer"
              ? "The creative tools I use to bring ideas to life and craft beautiful, user-centered experiences."
              : "The cutting-edge technologies I leverage to build scalable, performant, and innovative applications."}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] mx-auto rounded-full mt-6" />
        </motion.div>

        <motion.div
          key={activePersona}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {currentTools.map((tool, index) => {
            const IconComponent = getToolIcon(tool);

            return (
              <motion.div
                key={tool}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  className="bg-[#B1B2B5]/5 border border-[#B1B2B5]/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-[#B1B2B5]/10 hover:border-[#B1B2B5]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/10"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 flex items-center justify-center bg-gradient-to-br from-[#B1B2B5]/20 to-[#D1D1D3]/20 rounded-xl group-hover:from-[#B1B2B5]/30 group-hover:to-[#D1D1D3]/30 transition-all duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#B1B2B5] group-hover:text-[#D1D1D3] transition-colors duration-300" />
                  </div>

                  <h3 className="text-white font-semibold text-xs sm:text-sm group-hover:text-[#D1D1D3] transition-colors duration-300">
                    {tool}
                  </h3>
                </motion.div>

                {/* Enhanced Floating Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#B1B2B5] to-[#D1D1D3] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-[#1A1D29] text-xs font-bold">
                    {index + 1}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            className="text-center p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              5+
            </div>
            <div className="text-[#B1B2B5]/80 text-sm">Years Experience</div>
          </motion.div>

          <motion.div
            className="text-center p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              50+
            </div>
            <div className="text-[#B1B2B5]/80 text-sm">Projects Completed</div>
          </motion.div>

          <motion.div
            className="text-center p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              25+
            </div>
            <div className="text-[#B1B2B5]/80 text-sm">Happy Clients</div>
          </motion.div>

          <motion.div
            className="text-center p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              100%
            </div>
            <div className="text-[#B1B2B5]/80 text-sm">Satisfaction Rate</div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="group bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] text-[#1A1D29] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/25 hover:scale-105">
            Start a Project
            <motion.span
              className="inline-block ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
