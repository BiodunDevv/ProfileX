"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  DevName: string;
  title: string;
  description: string;
  heroImage: string;
  Companies: string[];
}

const Hero = ({
  DevName,
  title,
  description,
  heroImage,
  Companies,
}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setIsLoaded(true);

    // Cycle through company highlights
    let timer: NodeJS.Timeout;
    if (Companies.length > 0) {
      timer = setInterval(() => {
        setActiveCompanyIndex((prev) =>
          prev === null ? 0 : (prev + 1) % Companies.length
        );
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [Companies.length]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.section
          className="w-full min-h-screen flex flex-col items-center bg-[#080808] text-white"
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar DevName={DevName} />

          <div className="flex flex-col lg:flex-row items-center justify-between w-[90%] max-w-9xl mx-auto px-4 py-6 flex-1 gap-8 lg:gap-12">
            <motion.div
              className="flex flex-col justify-center items-center lg:items-start w-full text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key="title"
                  className="raleway text-3xl sm:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  {title}
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key="description"
                  className="ibm text-sm sm:text-base lg:text-md mb-4 md:mb-6 text-[#9C9C9C] max-w-[700px] leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {description}
                </motion.p>
              </AnimatePresence>

              <motion.button
                className="px-8 sm:px-12 md:px-16 py-3 md:py-4 bg-[#3F8E00] hover:bg-[#4BA600] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.5)] rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#080808] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 12px 30px 0px rgba(63,142,0,0.65)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = "#getintouch";
                }}
              >
                Get in Touch
              </motion.button>
            </motion.div>

            <motion.div
              className="flex justify-center items-center w-full mt-4 lg:mt-0 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="hero-image"
                  className="relative w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                >
                  <Image
                    src={heroImage || "/placeholder-profile.png"}
                    alt="Hero Picture"
                    fill
                    priority
                    sizes="(max-width: 480px) 180px, (max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 340px, 380px"
                    className="rounded-full shadow-lg border-2 border-[#1B1B1B] object-cover"
                    unoptimized={
                      typeof heroImage === "string" &&
                      heroImage.includes("cloudinary.com")
                    }
                    onError={(e) => {
                      // Fallback for image loading errors
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-profile.png";
                      target.onerror = null; // Prevent infinite error loop
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(150, 150, 150, 0.3)",
                        "0 0 30px rgba(150, 150, 150, 0.5)",
                        "0 0 15px rgba(150, 150, 150, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#3F8E00]/30 to-[#3F8E00]/10 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-6 -left-6 w-20 h-20 md:w-28 md:h-28 bg-gradient-to-tr from-[#333]/40 to-[#555]/20 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Companies Section */}
          <motion.div
            className="w-full max-w-9xl mx-auto px-4 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.h5
              className="text-center text-gray-400 text-sm uppercase tracking-wider mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Previously worked with
            </motion.h5>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
              <AnimatePresence>
                {Companies.map((company, index) => (
                  <motion.div
                    key={index}
                    className={`px-4 py-2 ${
                      activeCompanyIndex === index
                        ? "bg-[#1a1a1a] border-[#444444]"
                        : "bg-[#111111] border-[#333333]"
                    } hover:bg-[#181818] border rounded-md text-gray-300 text-sm sm:text-base font-medium transition-all duration-300`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: activeCompanyIndex === index ? 1.05 : 1,
                      boxShadow:
                        activeCompanyIndex === index
                          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                          : "none",
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.8 + index * 0.1,
                      type: activeCompanyIndex === index ? "spring" : "tween",
                      stiffness: 200,
                      damping: 10,
                    }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      borderColor: "#444444",
                      scale: 1.05,
                    }}
                  >
                    {company}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Hero;
