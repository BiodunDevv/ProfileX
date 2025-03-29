"use client";
import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-[#080808] text-white">
      <Navbar DevName={DevName} />

      <div className="flex flex-col lg:flex-row items-center justify-between w-[90%] max-w-7xl mx-auto px-4 py-6 flex-1 gap-8 lg:gap-12">
        <motion.div
          className="flex flex-col justify-center items-center lg:items-start w-full text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1
            className="raleway text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="ibm text-sm sm:text-base lg:text-lg mb-4 md:mb-6 text-[#9C9C9C] max-w-[700px] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {description}
          </motion.p>

          <motion.button
            className="px-8 sm:px-12 md:px-16 py-3 md:py-4 bg-[#3F8E00] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.5)] rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#080808]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, backgroundColor: "#4BA600" }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="flex justify-center items-center w-full mt-4 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="relative w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px]">
            <Image
              src={heroImage}
              alt="Hero Picture"
              fill
              className="rounded-full shadow-lg border-2 border-[#1B1B1B] object-cover"
              priority
              sizes="(max-width: 480px) 180px, (max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 340px, 380px"
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
          </div>
        </motion.div>
      </div>

      {/* Companies Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.h5
          className="text-center text-gray-400 text-sm uppercase tracking-wider mb-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Previously worked with
        </motion.h5>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
          {Companies.map((company, index) => (
            <motion.div
              key={index}
              className="px-4 py-2 bg-[#111111] hover:bg-[#181818] border border-[#333333] rounded-md text-gray-300 text-sm sm:text-base font-medium transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              whileHover={{
                y: -3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                borderColor: "#444444",
              }}
            >
              {company}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
