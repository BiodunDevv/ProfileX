"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillsProps {
  data: {
    core: string[];
    technical: string[];
    tools: string[];
    languages: string[];
  };
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const skillCategories = [
    {
      title: "Core Skills",
      skills: data.core,
      color: "#A6785C",
      icon: "⚡",
    },
    {
      title: "Technical Skills",
      skills: data.technical,
      color: "#57534E",
      icon: "🔧",
    },
    {
      title: "Tools & Software",
      skills: data.tools,
      color: "#A6785C",
      icon: "💻",
    },
    {
      title: "Languages",
      skills: data.languages,
      color: "#57534E",
      icon: "🌍",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1C1B1A] mb-3 sm:mb-4">
          Skills & Expertise
        </h1>
        <div className="w-12 sm:w-16 h-px bg-[#A6785C] mx-auto mb-3 sm:mb-4"></div>
        <p className="text-[#57534E] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          A comprehensive toolkit built through years of hands-on experience and
          continuous learning
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-[#E4DCCB]/20 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#DDD6CE]">
              <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl text-[#1C1B1A] flex items-center">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">
                  {category.icon}
                </span>
                {category.title}
              </h3>
            </div>

            {/* Skills List */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.02,
                      duration: 0.3,
                    }}
                    className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      backgroundColor:
                        categoryIndex % 2 === 0 ? "#A6785C20" : "#57534E20",
                      color: categoryIndex % 2 === 0 ? "#A6785C" : "#57534E",
                      border: `1px solid ${categoryIndex % 2 === 0 ? "#A6785C40" : "#57534E40"}`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills Proficiency */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-4 sm:p-6 md:p-8"
      >
        <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl md:text-2xl text-[#1C1B1A] mb-6 sm:mb-8 text-center">
          Proficiency Highlights
        </h3>

        <div className="space-y-4 sm:space-y-6">
          {[
            {
              skill: "UX Writing & Content Design",
              level: 95,
              years: "6+ years",
            },
            { skill: "Product Strategy", level: 90, years: "5+ years" },
            { skill: "User Research & Testing", level: 85, years: "4+ years" },
            {
              skill: "Cross-functional Collaboration",
              level: 95,
              years: "6+ years",
            },
            { skill: "Design Systems", level: 80, years: "3+ years" },
            {
              skill: "Data Analysis & A/B Testing",
              level: 85,
              years: "4+ years",
            },
          ].map((item, index) => (
            <motion.div
              key={item.skill}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#1C1B1A] text-sm sm:text-base">
                  {item.skill}
                </span>
                <span className="text-xs sm:text-sm text-[#57534E]">
                  {item.years}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-[#E4DCCB] rounded-full h-1.5 sm:h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
                    className="bg-[#A6785C] h-2 rounded-full relative"
                  >
                    <div className="absolute right-0 top-0 h-full w-1 bg-[#1C1B1A] rounded-full"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Philosophy */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-8 bg-[#E4DCCB]/30 rounded-lg p-8 border border-[#DDD6CE] text-center"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-4">
          Continuous Learning
        </h3>
        <p className="text-[#57534E] leading-relaxed max-w-3xl mx-auto">
          I believe in staying current with industry trends and emerging
          technologies. I regularly attend conferences, participate in design
          communities, and experiment with new tools and methodologies to ensure
          my skills remain sharp and relevant in our rapidly evolving field.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
