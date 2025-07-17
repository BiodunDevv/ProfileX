"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import Image from "next/image";

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

interface HeroProps {
  DevName: string;
  title: string;
  description: string;
  heroImage: string;
  Companies: string[];
  socialLinks?: SocialLink[];
}

const Hero: React.FC<HeroProps> = ({
  DevName,
  title,
  description,
  heroImage,
  Companies,
  socialLinks,
}) => {
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return FaLinkedin;
      case "Behance":
        return FaBehance;
      case "Mail":
        return Mail;
      case "Github":
        return FaGithub;
      case "Instagram":
        return FaInstagram;
      case "Twitter":
        return FaTwitter;
      default:
        return Mail;
    }
  };
  return (
    <section
      id="Home"
      className="relative min-h-screen flex items-center justify-center bg-slate-800 overflow-hidden pt-16"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-6">
            <Image
              src={heroImage}
              alt={DevName}
              fill
              className="rounded-full object-cover shadow-2xl ring-4 ring-white/20"
              priority
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {DevName}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-blue-200 mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center space-x-4 sm:space-x-6 mb-12"
        >
          {socialLinks?.map(({ platform, icon, url }) => {
            const IconComponent = getSocialIcon(icon);
            return (
              <motion.a
                key={platform}
                href={url}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20"
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Companies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-12"
        >
          <p className="text-sm text-slate-400 mb-4 font-medium">
            Trusted by leading brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
            {Companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-slate-300 font-medium text-sm sm:text-base lg:text-lg hover:text-blue-300 transition-colors duration-300"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector("#about");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.button>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mt-4" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
