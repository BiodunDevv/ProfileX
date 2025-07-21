"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { MapPin, Download, Scroll, Loader2 } from "lucide-react";

interface HeroProps {
  userProfile: {
    name: string;
    tagline: string;
    profileImage: string;
    location: string;
    resumeLink: string;
  };
  skills: {
    frontend?: string[];
    backend?: string[];
    designer?: string[];
    creative?: string[];
    technical?: string[];
    writing?: string[];
  };
  onNext?: () => void;
}

const Hero: React.FC<HeroProps> = ({ userProfile, skills, onNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const allSkills = [
    ...(skills.frontend || []),
    ...(skills.backend || []),
    ...(skills.designer || []),
    ...(skills.creative || []),
    ...(skills.technical || []),
    ...(skills.writing || []),
  ];

  // Animation variants that respect reduced motion preferences
  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 sm:pt-16 sm:pb-20">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Animated Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6 sm:space-y-8 -mt-10 sm:mt-0"
        >
          {/* Ornate Header Border */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 1.2,
              delay: 0.2,
            }}
            className="relative"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 1.2,
                delay: 0.3,
              }}
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            />
          </motion.div>

          {/* Profile Image with Enhanced Loading */}
          <motion.div
            variants={variants}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: 0.4 }}
            className="relative"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto relative">
              {/* Loading State */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#722F37] rounded-full p-1 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0F0F0F] rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-[#D4AF37] animate-spin" />
                  </div>
                </div>
              )}

              {/* Ornate Frame */}
              <motion.div
                initial={{ scale: 0, rotate: shouldReduceMotion ? 0 : -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.3 : 1,
                  delay: 0.5,
                  type: shouldReduceMotion ? "tween" : "spring",
                  stiffness: 100,
                }}
                className={`absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#722F37] rounded-full p-1 transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-full bg-[#0F0F0F] rounded-full p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#D4AF37]/30">
                    <Image
                      src={userProfile.profileImage}
                      alt={userProfile.name}
                      fill
                      className="object-cover transition-opacity duration-500"
                      priority
                      onLoad={() => setImageLoaded(true)}
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Name with Enhanced Typography */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: 0.6,
            }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="font-garamond text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4ECD8] leading-tight">
              <motion.span
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.3 : 0.8,
                  delay: 0.7,
                }}
                className="inline-block"
              >
                <span className="text-[#D4AF37] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl float-left mr-2 sm:mr-3 mt-1 sm:mt-2 leading-none font-bold drop-shadow-lg">
                  {userProfile.name.charAt(0)}
                </span>
                <span className="drop-shadow-md">
                  {userProfile.name.slice(1)}
                </span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline with Better Typography */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: 0.8,
            }}
            className="max-w-3xl mx-auto"
          >
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-[#F4ECD8]/85 leading-relaxed font-light italic">
              {userProfile.tagline}
            </p>
          </motion.div>

          {/* Location with Icon */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: 0.9,
            }}
            className="flex items-center justify-center gap-2 text-[#D4AF37]"
          >
            <motion.div
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-inter font-medium text-sm sm:text-base">
                {userProfile.location}
              </span>
            </motion.div>
          </motion.div>

          {/* Skills Showcase with Better Animation */}
          <motion.div
            variants={variants}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: 1.0 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="font-garamond text-lg sm:text-xl md:text-2xl text-[#D4AF37] mb-4 sm:mb-6 italic">
              Artisan of Digital Craft
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {allSkills.slice(0, 8).map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.3 : 0.5,
                    delay: shouldReduceMotion ? 0 : 1.2 + index * 0.1,
                    type: shouldReduceMotion ? "tween" : "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.05,
                    backgroundColor: "rgba(114, 47, 55, 0.3)",
                  }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#722F37]/20 border border-[#D4AF37]/30 rounded-full text-[#F4ECD8] font-inter text-xs sm:text-sm backdrop-blur-sm hover:border-[#D4AF37]/50 transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: 1.4,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.a
              href={userProfile.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 text-[#0F0F0F] font-inter font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20 text-sm sm:text-base w-full sm:w-auto justify-center max-w-xs"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
              View Résumé
            </motion.a>

            {onNext && (
              <motion.button
                onClick={onNext}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#D4AF37]/50 text-[#D4AF37] font-inter font-semibold rounded-lg transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-sm sm:text-base w-full sm:w-auto justify-center max-w-xs"
              >
                <Scroll className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
                Explore Works
              </motion.button>
            )}
          </motion.div>

          {/* Decorative Footer Border */}
          <motion.div
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 1.2,
              delay: 1.6,
            }}
            className="relative"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 1.2,
                delay: 1.8,
              }}
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: shouldReduceMotion ? 0 : [0, 10, 0],
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-300"
        >
          <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full" />
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
