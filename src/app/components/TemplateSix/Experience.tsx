"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceProps {
  data: {
    role: string;
    company: string;
    duration: string;
    location: string;
    summary: string;
    achievements: string[];
  }[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1C1B1A] mb-3 sm:mb-4">
          Professional Experience
        </h1>
        <div className="w-12 sm:w-16 h-px bg-[#A6785C] mx-auto"></div>
      </motion.div>

      {/* Experience Timeline */}
      <div className="space-y-6 sm:space-y-8">
        {data.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#E4DCCB]/20 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-[#DDD6CE]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl md:text-2xl text-[#1C1B1A] mb-1">
                    {experience.role}
                  </h3>
                  <p className="text-[#A6785C] font-semibold text-base sm:text-lg">
                    {experience.company}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-[#57534E] font-medium text-sm sm:text-base">
                    {experience.duration}
                  </p>
                  <p className="text-[#57534E] text-xs sm:text-sm">
                    {experience.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-[#57534E] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                {experience.summary}
              </p>

              {/* Key Achievements */}
              <div>
                <h4 className="font-semibold text-[#1C1B1A] mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A6785C] rounded-full mr-2 sm:mr-3"></span>
                  Key Achievements
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {experience.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1 + achIndex * 0.05,
                      }}
                      className="flex items-start space-x-2 sm:space-x-3"
                    >
                      <div className="flex-shrink-0 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#A6785C] rounded-full mt-1.5 sm:mt-2"></div>
                      <p className="text-[#57534E] leading-relaxed text-xs sm:text-sm md:text-base">
                        {achievement}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Career Progression Visual */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 sm:mt-12 bg-[#E4DCCB]/30 rounded-lg p-4 sm:p-6 md:p-8 border border-[#DDD6CE]"
      >
        <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl md:text-2xl text-[#1C1B1A] mb-4 sm:mb-6 text-center">
          Career Progression
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
          {data.map((exp, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-[#A6785C] rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg">
                    {data.length - index}
                  </span>
                </div>
                <p className="text-[#57534E] text-xs sm:text-sm font-medium max-w-[100px] mx-auto">
                  {exp.company}
                </p>
                <p className="text-[#57534E] text-xs">
                  {exp.duration.split(" ")[0]}
                </p>
              </motion.div>
              {index < data.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="hidden md:block w-8 lg:w-12 h-px bg-[#A6785C]/40"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;
