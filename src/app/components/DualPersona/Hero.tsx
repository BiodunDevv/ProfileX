"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FaBehance, FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface HeroData {
  designerName: string;
  developerName: string;
  descriptionDesigner: string;
  descriptionDeveloper: string;
  heroImageDesigner: string;
  heroImageDeveloper: string;
  socialLinks: SocialLink[];
}

interface HeroProps {
  activePersona: "designer" | "developer";
  heroData: HeroData;
}

const Hero: React.FC<HeroProps> = ({ activePersona, heroData }) => {
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "linkedin":
        return FaLinkedin;
      case "behance":
        return FaBehance;
      case "github":
        return FaGithub;
      case "dribbble":
        return FaDribbble;
      default:
        return FaGithub;
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-[#B1B2B5]">
      {/* Advanced Background with Animated Gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background:
              activePersona === "designer"
                ? "radial-gradient(circle at 30% 20%, rgba(26, 29, 41, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(26, 29, 41, 0.2) 0%, transparent 50%)"
                : "radial-gradient(circle at 70% 20%, rgba(26, 29, 41, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(26, 29, 41, 0.2) 0%, transparent 50%)",
          }}
          transition={{ duration: 1.2 }}
        />

        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background:
              activePersona === "designer"
                ? "linear-gradient(45deg, rgba(26, 29, 41, 0.1) 0%, transparent 25%, rgba(26, 29, 41, 0.05) 50%, transparent 75%, rgba(26, 29, 41, 0.1) 100%)"
                : "linear-gradient(-45deg, rgba(26, 29, 41, 0.1) 0%, transparent 25%, rgba(26, 29, 41, 0.05) 50%, transparent 75%, rgba(26, 29, 41, 0.1) 100%)",
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#1A1D29]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-2 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Content Side */}
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#1A1D29]/80 text-base sm:text-lg font-medium tracking-wide"
              >
                Hello, I'm
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1D29] leading-tight tracking-tight"
              >
                {activePersona === "designer"
                  ? heroData.designerName
                  : heroData.developerName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#1A1D29]/70 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
              >
                {activePersona === "designer"
                  ? heroData.descriptionDesigner
                  : heroData.descriptionDeveloper}
              </motion.p>
            </div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center lg:justify-start space-x-4 sm:space-x-6"
            >
              {heroData.socialLinks.map((social, index) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1D29]/10 hover:bg-[#1A1D29]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-[#1A1D29]/20 hover:border-[#1A1D29]/40"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1D29]/70 group-hover:text-[#1A1D29] transition-colors" />

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#1A1D29] text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {social.name}
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="group relative bg-[#1A1D29] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#1A1D29]/40 hover:scale-105 overflow-hidden">
                <span className="relative z-10">Let's Connect</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1A1D29] to-[#1A1D29]/80"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <ArrowDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform relative z-10" />
              </button>

              <button className="group bg-transparent border-2 border-[#1A1D29] text-[#1A1D29] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#1A1D29] hover:text-white hover:scale-105">
                View Work
                <motion.span
                  className="inline-block ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Side */}
          <motion.div
            key={`${activePersona}-image`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-first lg:order-last"
          >
            <motion.div
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={
                  activePersona === "designer"
                    ? heroData.heroImageDesigner
                    : heroData.heroImageDeveloper
                }
                alt={`${activePersona} hero image`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Advanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D29]/60 via-transparent to-[#1A1D29]/20" />

              {/* Glass Morphism Card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium opacity-90">
                      {activePersona === "designer"
                        ? "Design Experience"
                        : "Development Experience"}
                    </div>
                    <div className="text-white text-2xl font-bold">
                      5+ Years
                    </div>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-6 h-6 bg-white/30 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements with Physics */}
              <motion.div
                className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </motion.div>

              <motion.div
                className="absolute top-20 left-6 w-12 h-12 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="w-6 h-6 bg-white/20 rounded-full" />
              </motion.div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1A1D29]/20 to-transparent rounded-bl-3xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
