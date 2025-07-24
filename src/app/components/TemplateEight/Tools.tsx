"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Shield,
  Terminal,
  Search,
  Lock,
  Eye,
  Network,
  Bug,
  Zap,
  FileText,
  Database,
  Globe,
} from "lucide-react";

export interface ToolItem {
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  proficiency: number;
}

interface ToolsProps {
  data: ToolItem[];
}

const Tools: React.FC<ToolsProps> = ({ data = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from data props and create category list
  const uniqueCategories = [
    "all",
    ...new Set(data.map((tool) => tool.category)),
  ];

  const toolCategories = [
    { id: "all", label: "All Tools", count: data.length },
    ...uniqueCategories
      .filter((cat) => cat !== "all")
      .map((category) => {
        const count = data.filter((tool) => tool.category === category).length;
        return {
          id: category,
          label: category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          count,
        };
      }),
  ];

  // Map icon strings to actual Lucide components
  const iconMap: { [key: string]: React.FC<any> } = {
    Wrench: Wrench,
    Shield: Shield,
    Terminal: Terminal,
    Search: Search,
    Lock: Lock,
    Eye: Eye,
    Network: Network,
    Bug: Bug,
    Zap: Zap,
    FileText: FileText,
    Database: Database,
    Globe: Globe,
  };

  const filteredTools =
    selectedCategory === "all"
      ? data
      : data.filter((tool) => tool.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  return (
    <section id="tools" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Wrench className="w-8 h-8 text-[#38BDF8] mr-3" />
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                Security Arsenal
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Comprehensive toolkit for offensive and defensive security
              operations across all phases of engagement.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {toolCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-[#38BDF8] text-[#0D1117]"
                      : "bg-[#161B22] text-[#38BDF8] border border-[#38BDF8]/20 hover:border-[#38BDF8]/40"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                  <span className="ml-2 opacity-80">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool, index) => {
              // Get the icon component from the map using the icon string
              const Icon = iconMap[tool.icon] || Wrench; // Default to Wrench if icon not found

              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-6 hover:border-[#38BDF8]/40 transition-all duration-300 h-full">
                    {/* Tool Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          backgroundColor: `${tool.color}20`,
                          border: `1px solid ${tool.color}40`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: tool.color }}
                        />
                      </div>

                      {/* Proficiency Badge */}
                      <div className="text-right">
                        <div
                          className="text-sm font-bold"
                          style={{ color: tool.color }}
                        >
                          {tool.proficiency}%
                        </div>
                        <div className="text-xs text-gray-400">Proficiency</div>
                      </div>
                    </div>

                    {/* Tool Info */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors duration-300">
                      {tool.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Proficiency Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Experience Level</span>
                        <span>
                          {tool.proficiency >= 90
                            ? "Expert"
                            : tool.proficiency >= 80
                              ? "Advanced"
                              : "Intermediate"}
                        </span>
                      </div>
                      <div className="h-2 bg-[#0D1117] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tool.proficiency}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: tool.color }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="flex justify-between items-center">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium capitalize"
                        style={{
                          backgroundColor: `${tool.color}20`,
                          border: `1px solid ${tool.color}40`,
                          color: tool.color,
                        }}
                      >
                        {tool.category.replace("-", " ")}
                      </span>

                      {/* Status Indicator */}
                      <div className="flex items-center space-x-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tool.color }}
                        ></div>
                        <span className="text-xs text-gray-400">Active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Tool Mastery Overview
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {toolCategories.slice(1).map((category, index) => {
                  const categoryTools = data.filter(
                    (tool) => tool.category === category.id
                  );
                  const avgProficiency = categoryTools.length
                    ? Math.round(
                        categoryTools.reduce(
                          (sum, tool) => sum + tool.proficiency,
                          0
                        ) / categoryTools.length
                      )
                    : 0;

                  const colors = [
                    "#22C55E",
                    "#3B82F6",
                    "#EF4444",
                    "#A855F7",
                    "#F59E0B",
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <div key={category.id} className="text-center">
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ color }}
                      >
                        {avgProficiency}%
                      </div>
                      <div className="text-gray-400 text-sm capitalize">
                        {category.label.replace("-", " ")}
                      </div>
                      <div className="mt-2 h-1 bg-[#0D1117] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${avgProficiency}%` }}
                          transition={{ delay: index * 0.2, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Terminal Command */}
              <div className="mt-8 bg-[#0D1117] border border-[#38BDF8]/10 rounded-lg p-4 font-mono text-sm">
                <div className="text-[#22C55E]">
                  <span className="text-[#A855F7]">security@arsenal:</span>
                  <span className="text-[#38BDF8]">~$</span>
                  <span className="text-white ml-1">
                    ./deploy-tools.sh --all
                  </span>
                </div>
                <div className="mt-2 text-gray-400">
                  <div>Loading security toolkit...</div>
                  <div className="text-[#22C55E]">
                    ✓ All {data.length} tools ready for deployment
                  </div>
                  <div className="text-[#38BDF8]">
                    Arsenal status: OPERATIONAL
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
