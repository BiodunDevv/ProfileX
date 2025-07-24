"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Star,
  CheckCircle,
  LayoutDashboard,
  Eye,
} from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isGetStartedHovered, setIsGetStartedHovered] = useState(false);
  const [isTemplatesHovered, setIsTemplatesHovered] = useState(false);

  const containerVariants = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Handle get started button click based on auth state
  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <main className="relative z-10 px-2 sm:px-6 py-2 md:py-10 max-w-6xl mx-auto h-[100vh] flex flex-col items-end justify-end">
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

        {/* CTA Buttons with authentication-aware behavior */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4"
        >
          {/* Dynamic Get Started Button that changes based on auth state */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setIsGetStartedHovered(true)}
            onMouseLeave={() => setIsGetStartedHovered(false)}
            className="relative"
          >
            {/* Animated background glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-lg bg-purple-600/20 opacity-0 blur-md"
              animate={{
                opacity: isGetStartedHovered ? 0.8 : 0,
              }}
              transition={{ duration: 0.2 }}
            />

            <button
              onClick={handleGetStarted}
              className="relative w-full sm:w-auto bg-gradient-to-r from-[#711381] to-purple-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:from-[#5C0F6B] hover:to-purple-700 transition-all flex items-center justify-center shadow-md shadow-purple-900/20 text-sm sm:text-base group overflow-hidden"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full"
                animate={{
                  x: isGetStartedHovered ? ["0%", "200%"] : "-100%",
                }}
                transition={{
                  duration: 1.2,
                  repeat: isGetStartedHovered ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              />

              {/* Dynamic text and icon based on auth state */}
              <span className="mr-1.5 sm:mr-2 relative z-10">
                {isAuthenticated ? (
                  <>
                    <span className="flex items-center">
                      <LayoutDashboard size={18} className="mr-2" />
                      Go to Dashboard
                    </span>
                  </>
                ) : (
                  "Get Started"
                )}
              </span>
              <motion.span
                animate={{
                  x: isGetStartedHovered ? 3 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <ChevronRight size={18} />
              </motion.span>
            </button>
          </motion.div>

          {/* Enhanced View Templates button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setIsTemplatesHovered(true)}
            onMouseLeave={() => setIsTemplatesHovered(false)}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 rounded-lg bg-purple-500/10 opacity-0 blur-sm"
              animate={{ opacity: isTemplatesHovered ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
            />

            <Link
              href={isAuthenticated ? "/templates" : "#templates"}
              className="relative w-full sm:w-auto border border-[#711381] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:bg-[#711381]/10 transition-all flex items-center justify-center text-sm sm:text-base group"
            >
              <Eye
                size={18}
                className={`mr-2 transition-all duration-300 ${isTemplatesHovered ? "text-purple-400" : "text-white"}`}
              />
              View Templates
              <AnimatePresence>
                {isTemplatesHovered && (
                  <motion.div
                    className="absolute -bottom-12 left-0 right-0 mx-auto bg-purple-900/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs text-gray-200 whitespace-nowrap"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isAuthenticated
                      ? "Explore all premium templates"
                      : "Preview available templates"}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </motion.div>

        {/* Conditionally show authenticated user message */}
        <AnimatePresence>
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mt-6 text-sm text-purple-400/80 sm:mb-16"
            >
              You&apos;re signed in! Continue building your professional
              presence.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default HeroSection;
