"use client";

import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
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

const About: React.FC<AboutProps> = ({ data }) => {
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
          About Me
        </h1>
        <div className="w-12 sm:w-16 h-px bg-[#A6785C] mx-auto"></div>
      </motion.div>

      {/* Content */}
      <div className="space-y-6 sm:space-y-8">
        {/* Main Bio */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#DDD6CE]"
        >
          <div className="prose prose-lg max-w-none text-[#57534E] leading-relaxed">
            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
              {data.summary}
            </p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              With over 6 years of experience in content design and UX writing,
              I specialize in creating user-centered experiences that drive
              business results. My background spans across leading tech
              companies where I've had the privilege of working on products used
              by millions of people worldwide.
            </p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              I believe in the power of words to shape user behavior and create
              meaningful connections between people and technology. Every piece
              of copy I write is backed by research, tested with users, and
              optimized for both usability and business impact.
            </p>
            <p className="text-sm sm:text-base">
              When I'm not crafting microcopy or designing content strategies,
              you'll find me mentoring emerging designers, speaking at
              conferences, or exploring the intersection of technology and human
              psychology through my writing.
            </p>
          </div>
        </motion.div>

        {/* Key Strengths */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#DDD6CE]"
        >
          <h3 className="font-['DM_Serif_Display'] text-xl sm:text-2xl text-[#1C1B1A] mb-4 sm:mb-6">
            What I Bring to Teams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#A6785C] mb-2 text-sm sm:text-base">
                  Strategic Thinking
                </h4>
                <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                  I approach content design as a business problem, always
                  connecting copy decisions to user needs and company
                  objectives.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#A6785C] mb-2 text-sm sm:text-base">
                  Cross-functional Collaboration
                </h4>
                <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                  Experienced working closely with product managers, designers,
                  engineers, and researchers to ship cohesive experiences.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#A6785C] mb-2 text-sm sm:text-base">
                  Data-Driven Optimization
                </h4>
                <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                  I use A/B testing, user research, and analytics to
                  continuously improve content performance and user outcomes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#A6785C] mb-2 text-sm sm:text-base">
                  Global Perspective
                </h4>
                <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                  Having worked on products for international markets, I
                  understand the nuances of creating inclusive, accessible
                  content.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal Touch */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-[#E4DCCB]/30 rounded-lg p-6 sm:p-8 border border-[#DDD6CE]"
        >
          <h3 className="font-['DM_Serif_Display'] text-xl sm:text-2xl text-[#1C1B1A] mb-3 sm:mb-4">
            Beyond Work
          </h3>
          <p className="text-[#57534E] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            I'm passionate about democratizing design education and have
            mentored over 50 emerging designers through various programs. I also
            write about the intersection of language, technology, and culture on
            my personal blog.
          </p>
          <p className="text-[#57534E] leading-relaxed text-sm sm:text-base">
            In my free time, I enjoy exploring Lagos' vibrant art scene,
            practicing calligraphy, and experimenting with traditional Nigerian
            recipes with a modern twist.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
