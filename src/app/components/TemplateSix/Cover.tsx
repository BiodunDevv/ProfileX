"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CoverProps {
  data: {
    name: string;
    title: string;
    summary: string;
    location: string;
    email: string;
    phone?: string;
    website?: string;
    image: string;
  };
}

const Cover: React.FC<CoverProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center relative px-4"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-[#A6785C] to-transparent"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-[#A6785C]/20 shadow-lg">
            <Image
              src={data.image}
              alt={data.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['DM_Serif_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1C1B1A] mb-3 sm:mb-4"
        >
          {data.name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-[#A6785C] font-medium mb-4 sm:mb-6"
        >
          {data.title}
        </motion.h2>

        {/* Summary */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-[#57534E] leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto"
        >
          {data.summary}
        </motion.p>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-[#57534E] text-sm sm:text-base"
        >
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-[#A6785C] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{data.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-[#A6785C] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate">{data.email}</span>
          </div>
          {data.phone && (
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-[#A6785C] flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="truncate">{data.phone}</span>
            </div>
          )}
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 sm:mt-12 w-16 sm:w-20 h-px bg-[#A6785C] mx-auto"
        />
      </div>
    </motion.div>
  );
};

export default Cover;
