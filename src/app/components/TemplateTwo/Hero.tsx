"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaArrowDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import HeroPicture from "./images/Hero picture.svg";
import { StaticImageData } from "next/image";
import type { Variants } from "framer-motion";


interface SocialLink {
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "dribbble"
    | string;
  url: string;
}

interface HeroProps {
  name?: string;
  title?: string;
  about?: string;
  heroImage?: StaticImageData | string;
  cvUrl?: string;
  contactLink?: string;
  socialLinks?: SocialLink[];
}

const Hero = ({
  name,
  title,
  about,
  heroImage,
  cvUrl,
  contactLink,
  socialLinks,
}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSocial, setActiveSocial] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getSocialIcon = (platform: string, size = 20) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <FaGithub size={size} />;
      case "linkedin":
        return <FaLinkedinIn size={size} />;
      case "twitter":
        return <FaTwitter size={size} />;
      case "instagram":
        return <FaInstagram size={size} />;
      case "dribbble":
        return <FaDribbble size={size} />;
      default:
        return <FaGithub size={size} />;
    }
  };

  // Animation variants

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const socialVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number = 0) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: 0.8 + i * 0.1,
      },
    }),
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      borderColor: "rgb(245, 158, 11)",
      color: "rgb(251, 191, 36)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="bg-gradient-to-b from-[#0f0f12] to-[#0f0f12] text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-500/5 rounded-bl-full blur-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-27 left-0 w-1/4 h-1/4 bg-amber-500/5 rounded-tr-full blur-3xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            ></motion.div>
            <motion.div
              className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-amber-500/3 rounded-full blur-3xl"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-10 right-1/8 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1.5,
              }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="container mx-auto px-6 py-20 flex flex-col items-center z-10 max-w-9xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Profile Picture with AnimatePresence */}
            <motion.div
              className="relative mb-8"
              variants={itemVariants}
              custom={0}
            >
              <motion.div
                className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-amber-500/20 p-2 shadow-2xl shadow-amber-500/10 z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  scale: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                  },
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-amber-500/20 to-transparent">
                  <Image
                    src={heroImage || HeroPicture}
                    alt={`${name} profile picture`}
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    priority
                    sizes="(max-width: 480px) 180px, (max-width: 768px) 240px, 260px"
                  />
                </div>
              </motion.div>

              {/* Floating accent circles */}
              <motion.div
                className="absolute -right-2 top-1/2 w-6 h-6 rounded-full bg-amber-500/30 blur-sm"
                animate={{
                  y: [-4, 4, -4],
                  x: [2, -2, 2],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              ></motion.div>

              <motion.div
                className="absolute -left-4 bottom-4 w-4 h-4 rounded-full bg-amber-500/20 blur-sm"
                animate={{
                  y: [-3, 3, -3],
                  x: [-2, 3, -2],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>

            {/* Introduction Line */}
            <motion.div
              className="mb-3 text-center"
              variants={itemVariants}
              custom={1}
            >
              <motion.span
                className="text-amber-400 text-lg font-medium inline-block relative px-1"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 3,
                }}
              >
                Hello, I&apos;m
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                ></motion.span>
              </motion.span>
            </motion.div>

            {/* Name with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
                variants={itemVariants}
                custom={2}
                key="name"
              >
                {name}
              </motion.h1>
            </AnimatePresence>

            {/* Title with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.h2
                className="text-2xl md:text-3xl font-semibold mb-5 text-center text-slate-200 max-w-2xl"
                variants={itemVariants}
                custom={3}
                key="title"
              >
                {title}
              </motion.h2>
            </AnimatePresence>

            {/* Description with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.p
                className="text-slate-300 mb-8 text-lg text-center max-w-2xl leading-relaxed"
                variants={itemVariants}
                custom={4}
                key="about"
              >
                {about}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-5 mb-10 justify-center"
              variants={itemVariants}
              custom={5}
            >
              <motion.a
                href={contactLink}
                className="px-7 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-black font-medium rounded-md transition-all duration-300 flex items-center shadow-lg shadow-amber-500/20"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>

              {cvUrl && (
                <motion.a
                  href={cvUrl}
                  download
                  className="px-7 py-3 bg-transparent border border-amber-500 text-amber-400 font-medium rounded-md transition-all duration-300 shadow-lg shadow-amber-500/5 flex items-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowDown size={14} />
                  </motion.span>
                </motion.a>
              )}
            </motion.div>

            {/* Social Links with AnimatePresence */}
            <motion.div
              className="flex gap-4"
              variants={itemVariants}
              custom={6}
            >
              <AnimatePresence>
                {socialLinks?.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-amber-500/30 rounded-full transition-all bg-[#161513]/50 backdrop-blur-sm"
                    aria-label={`${link.platform} profile`}
                    variants={socialVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setActiveSocial(index)}
                    onHoverEnd={() => setActiveSocial(null)}
                  >
                    <motion.div
                      animate={
                        activeSocial === index
                          ? { rotate: [0, 15, -15, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {getSocialIcon(link.platform, 22)}
                    </motion.div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hero;
