"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Shield, Terminal, Zap, ChevronRight } from "lucide-react";
import { SkillsData } from "../../allTemplates/templateEight/page";

interface SkillsProps {
  data: SkillsData;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState("redTeam");

  const skillCategories = [
    {
      id: "redTeam",
      title: "Red Team",
      icon: Shield,
      color: "#EF4444",
      skills: data.redTeam,
      description: "Offensive security tools and techniques",
    },
    {
      id: "blueTeam",
      title: "Blue Team",
      icon: Zap,
      color: "#3B82F6",
      skills: data.blueTeam,
      description: "Defensive security and monitoring",
    },
    {
      id: "scripting",
      title: "Scripting",
      icon: Code,
      color: "#10B981",
      skills: data.scripting,
      description: "Automation and development languages",
    },
    {
      id: "other",
      title: "Frameworks",
      icon: Terminal,
      color: "#A855F7",
      skills: data.other,
      description: "Security frameworks and methodologies",
    },
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 px-2 sm:px-6 bg-[#0D1117] scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-[#38BDF8] mr-2 sm:mr-3" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                Technical Arsenal
              </h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Tools and technologies I use to identify vulnerabilities, defend
              systems, and automate security processes.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Selector */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-4 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Categories
                </h3>
                <div className="space-y-2">
                  {skillCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                          activeCategory === category.id
                            ? "bg-[#38BDF8]/20 border border-[#38BDF8]/40"
                            : "hover:bg-[#1F2937] border border-transparent"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{
                            color:
                              activeCategory === category.id
                                ? "#38BDF8"
                                : category.color,
                          }}
                        />
                        <div className="flex-1 text-left">
                          <div
                            className={`font-medium ${
                              activeCategory === category.id
                                ? "text-[#38BDF8]"
                                : "text-white"
                            }`}
                          >
                            {category.title}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {category.skills.length} tools
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeCategory === category.id
                              ? "rotate-90 text-[#38BDF8]"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Command Line Display */}
                <div className="mt-6 bg-[#0D1117] border border-[#38BDF8]/10 rounded-lg p-4 font-mono text-sm">
                  <div className="text-[#22C55E]">
                    <span className="text-[#A855F7]">user@security:</span>
                    <span className="text-[#38BDF8]">~$</span>
                    <span className="text-white ml-1">ls skills/</span>
                  </div>
                  <div className="mt-2 text-gray-400">
                    {skillCategories.map((cat, index) => (
                      <div
                        key={cat.id}
                        className={`${activeCategory === cat.id ? "text-[#38BDF8]" : ""}`}
                      >
                        {cat.title.toLowerCase()}/
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Display */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-4">
                <AnimatePresence mode="wait">
                  {skillCategories.map((category) => {
                    if (category.id !== activeCategory) return null;

                    const Icon = category.icon;

                    return (
                      <motion.div
                        key={category.id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={skillVariants}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Category Header */}
                        <div className="flex items-center space-x-4 mb-8">
                          <div
                            className="p-3 rounded-xl"
                            style={{
                              backgroundColor: `${category.color}20`,
                              border: `1px solid ${category.color}40`,
                            }}
                          >
                            <Icon
                              className="w-8 h-8"
                              style={{ color: category.color }}
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {category.title}
                            </h3>
                            <p className="text-gray-400">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        {/* Skills Grid - Mobile responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {category.skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className="group"
                            >
                              <div className="bg-[#1F2937]/80 backdrop-blur-sm border border-[#38BDF8]/20 rounded-xl p-3 sm:p-4 hover:border-[#38BDF8]/40 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium text-sm sm:text-base group-hover:text-[#38BDF8] transition-colors duration-300 truncate">
                                    {skill}
                                  </span>
                                  <div
                                    className="w-2 h-2 rounded-full flex-shrink-0 ml-2"
                                    style={{ backgroundColor: category.color }}
                                  ></div>
                                </div>

                                {/* Skill proficiency bar */}
                                <div className="mt-2 sm:mt-3 h-1 bg-[#0D1117] rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${Math.random() * 30 + 70}%`,
                                    }}
                                    transition={{
                                      delay: index * 0.1,
                                      duration: 1,
                                    }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: category.color }}
                                  ></motion.div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Additional Info */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-8 p-6 bg-gradient-to-r from-[#38BDF8]/5 to-[#A855F7]/5 border border-[#38BDF8]/20 rounded-xl"
                        >
                          <div className="flex items-start space-x-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${category.color}20` }}
                            >
                              <Icon
                                className="w-6 h-6"
                                style={{ color: category.color }}
                              />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-2">
                                Expertise in {category.title}
                              </h4>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {category.id === "redTeam" &&
                                  "Specialized in offensive security operations, exploit development, and adversary simulation to identify and exploit vulnerabilities."}
                                {category.id === "blueTeam" &&
                                  "Expert in defensive security measures, threat detection, incident response, and security monitoring solutions."}
                                {category.id === "scripting" &&
                                  "Proficient in multiple programming languages for automation, tool development, and security script creation."}
                                {category.id === "other" &&
                                  "Deep understanding of security frameworks, compliance standards, and industry best practices."}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
