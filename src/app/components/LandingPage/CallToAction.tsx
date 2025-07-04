"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ArrowRight,
  Rocket,
  LayoutDashboard,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Function to handle CTA button click based on auth state
  const handleCTAClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <section className="relative z-10 px-6 py-16 md:py-24">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-[#272932]/50 backdrop-blur-sm -z-10"></div>

      {/* Purple glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-purple-700/20 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Dynamic heading based on authentication state */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {isAuthenticated
            ? "Continue Building Your Professional Presence"
            : "Start Your Professional Journey Today"}
        </motion.h2>

        {/* Dynamic paragraph based on authentication state */}
        <motion.p
          className="text-gray-300 text-sm max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {isAuthenticated
            ? `Welcome back${user?.name ? ", " + user.name.split(" ")[0] : ""}! Your portfolio is waiting for you. Continue building your professional online presence and showcase your talents to the world.`
            : "Create a portfolio that opens doors, showcases your talents, and sets you apart in today's competitive landscape."}
        </motion.p>

        {/* Animated button container */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Main CTA Button - Customized for authenticated/non-authenticated users */}
          <motion.div
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative"
          >
            {/* Animated background glow effect */}
            <motion.div
              className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-fuchsia-500/30 opacity-0 blur-lg"
              animate={{
                opacity: isButtonHovered ? 0.8 : 0,
                scale: isButtonHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />

            <button
              onClick={handleCTAClick}
              className="relative bg-gradient-to-r from-[#711381] to-purple-600 px-6 py-3.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center group overflow-hidden"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full"
                animate={{
                  x: isButtonHovered ? ["0%", "200%"] : "-100%",
                }}
                transition={{
                  duration: 1.2,
                  repeat: isButtonHovered ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              />

              {/* Icon for authenticated users */}
              {isAuthenticated && (
                <LayoutDashboard size={20} className="mr-2 relative z-10" />
              )}

              {/* Text changes based on authentication */}
              <span className="relative z-10 font-medium">
                {isAuthenticated ? "Go to Dashboard" : "Create Your Portfolio"}
              </span>

              {/* Icon on the right */}
              <motion.div
                animate={{
                  x: isButtonHovered ? 3 : 0,
                  rotate: isButtonHovered ? 0 : -5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="ml-2 relative z-10"
              >
                {isAuthenticated ? (
                  <ChevronRight size={20} />
                ) : (
                  <Star className="text-white" size={20} />
                )}
              </motion.div>

              {/* Optional animated sparkles element */}
              <AnimatePresence>
                {isButtonHovered && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute top-0 right-0 -mr-1 -mt-1"
                  >
                    <Sparkles className="text-purple-200/70" size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Secondary action based on authentication */}
          {isAuthenticated ? (
            <Link
              href="/dashboard/templates"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center group px-4 py-2"
            >
              <span>Explore Templates</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: isButtonHovered ? 0 : 3 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="ml-1"
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          ) : (
            <Link
              href="/templates"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center px-4 py-2 group"
            >
              <span>Browse Templates</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 3 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="ml-1"
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          )}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex justify-center"
          viewport={{ once: true }}
        >
          <div className="flex items-center text-[10px] text-gray-400">
            <Rocket className="text-purple-500 mr-1.5" size={12} />
            <span>
              Join ProfileX and take your professional presence to the next level!
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
