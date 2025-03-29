"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <main className="relative z-10 px-4 sm:px-6 py-2 md:py-10 max-w-6xl mx-auto h-[100vh] flex flex-col items-end justify-end">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center w-full"
      >
        {/* Eyebrow text */}
        <motion.div variants={itemVariants} className="mb-2 sm:mb-3">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-xs sm:text-sm text-purple-300">
            <Star
              size={12}
              className="mr-1 text-purple-400"
              fill="currentColor"
            />
            Portfolio builder for professionals
          </span>
        </motion.div>

        {/* Main heading with gradient and animation */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
            Build Your Perfect
          </span>
          <span className="block text-white">Professional Portfolio</span>
        </motion.h1>

        {/* Subheading with improved typography */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed"
        >
          Create stunning, customizable portfolios that showcase your work and
          impress potential employers or clients.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-xs sm:text-sm text-gray-300"
        >
          {["No coding required", "Modern templates", "Custom domains"].map(
            (feature) => (
              <div key={feature} className="flex items-center">
                <CheckCircle
                  size={14}
                  className="mr-1 sm:mr-1.5 text-purple-500"
                />
                {feature}
              </div>
            )
          )}
        </motion.div>

        {/* CTA Buttons with animation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-[#711381] to-purple-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:from-[#5C0F6B] hover:to-purple-700 transition-all flex items-center justify-center shadow-md shadow-purple-900/20 text-sm sm:text-base"
            >
              Get Started
              <ChevronRight
                className="ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/templates"
              className="w-full sm:w-auto border border-[#711381] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:bg-[#711381]/10 transition-all flex items-center justify-center text-sm sm:text-base"
            >
              View Templates
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
