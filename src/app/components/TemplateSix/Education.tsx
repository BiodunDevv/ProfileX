"use client";

import React from "react";
import { motion } from "framer-motion";

interface EducationProps {
  data: {
    degree: string;
    institution: string;
    duration: string;
    gpa?: string;
    honors?: string[];
  }[];
}

const Education: React.FC<EducationProps> = ({ data }) => {
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
          Education
        </h1>
        <div className="w-12 sm:w-16 h-px bg-[#A6785C] mx-auto"></div>
      </motion.div>

      {/* Education Cards */}
      <div className="space-y-6 sm:space-y-8">
        {data.map((education, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#E4DCCB]/20 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-[#DDD6CE]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl md:text-2xl text-[#1C1B1A] mb-1 sm:mb-2">
                    {education.degree}
                  </h3>
                  <p className="text-[#A6785C] font-semibold text-base sm:text-lg">
                    {education.institution}
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 md:mt-0 md:text-right">
                  <p className="text-[#57534E] font-medium mb-1 text-sm sm:text-base">
                    {education.duration}
                  </p>
                  {education.gpa && (
                    <p className="text-[#57534E] text-xs sm:text-sm">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Honors & Achievements */}
            {education.honors && education.honors.length > 0 && (
              <div className="p-4 sm:p-6 md:p-8">
                <h4 className="font-semibold text-[#1C1B1A] mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A6785C] rounded-full mr-2 sm:mr-3"></span>
                  Honors & Recognition
                </h4>
                <ul className="space-y-2">
                  {education.honors.map((honor, honorIndex) => (
                    <motion.li
                      key={honorIndex}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1 + honorIndex * 0.05,
                      }}
                      className="flex items-center space-x-2 sm:space-x-3"
                    >
                      <div className="flex-shrink-0 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#A6785C] rounded-full"></div>
                      <p className="text-[#57534E] text-xs sm:text-sm md:text-base">
                        {honor}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Academic Philosophy */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 sm:mt-12 bg-[#E4DCCB]/30 rounded-lg p-4 sm:p-6 md:p-8 border border-[#DDD6CE]"
      >
        <h3 className="font-['DM_Serif_Display'] text-lg sm:text-xl md:text-2xl text-[#1C1B1A] mb-4 sm:mb-6 text-center">
          Academic Foundation
        </h3>
        <div className="prose prose-lg max-w-none text-[#57534E] leading-relaxed text-center">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            My academic journey laid the foundation for my approach to content
            design and strategic thinking. The combination of creative writing
            and literature studies developed my understanding of narrative,
            audience, and the power of language to influence behavior.
          </p>
          <p className="text-sm sm:text-base">
            These educational experiences taught me to think critically,
            research thoroughly, and communicate complex ideas with clarity and
            empathy — skills that directly translate to creating user-centered
            experiences in the tech industry.
          </p>
        </div>
      </motion.div>

      {/* Academic Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        <div className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-xl sm:text-2xl font-['DM_Serif_Display'] text-[#A6785C] mb-1 sm:mb-2">
            {data.length}
          </div>
          <p className="text-[#57534E] text-xs sm:text-sm">Degrees Earned</p>
        </div>
        <div className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-xl sm:text-2xl font-['DM_Serif_Display'] text-[#A6785C] mb-1 sm:mb-2">
            6+
          </div>
          <p className="text-[#57534E] text-xs sm:text-sm">Years of Study</p>
        </div>
        <div className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-xl sm:text-2xl font-['DM_Serif_Display'] text-[#A6785C] mb-1 sm:mb-2">
            {data.reduce((total, edu) => total + (edu.honors?.length || 0), 0)}
          </div>
          <p className="text-[#57534E] text-xs sm:text-sm">Academic Honors</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Education;
