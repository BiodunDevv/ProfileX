"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialsProps {
  data: {
    name: string;
    role: string;
    company: string;
    quote: string;
    image?: string;
  }[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-3xl md:text-4xl text-[#1C1B1A] mb-4">
          What Colleagues Say
        </h1>
        <div className="w-16 h-px bg-[#A6785C] mx-auto mb-4"></div>
        <p className="text-[#57534E] text-lg max-w-2xl mx-auto leading-relaxed">
          Testimonials from leaders and peers who have experienced my work
          firsthand
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="space-y-8 mb-12">
        {data.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Quote Section */}
            <div
              className={`lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center ${
                index % 2 === 1 ? "lg:col-start-1" : ""
              }`}
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="w-12 h-12 bg-[#A6785C]/10 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  className="w-6 h-6 text-[#A6785C]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </motion.div>

              {/* Quote Text */}
              <motion.blockquote
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="text-[#1C1B1A] text-lg md:text-xl leading-relaxed font-['DM_Serif_Display'] mb-6"
              >
                "{testimonial.quote}"
              </motion.blockquote>

              {/* Attribution */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E4DCCB]">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A6785C] font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#1C1B1A]">
                    {testimonial.name}
                  </p>
                  <p className="text-[#57534E] text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Visual Section */}
            <div
              className={`lg:col-span-4 bg-[#E4DCCB]/20 flex items-center justify-center p-8 ${
                index % 2 === 1 ? "lg:col-start-9" : ""
              }`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="text-center"
              >
                {/* Company Logo Placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-2xl font-bold text-[#A6785C]">
                    {testimonial.company.charAt(0)}
                  </span>
                </div>
                <p className="text-[#57534E] font-medium">
                  {testimonial.company}
                </p>
                <div className="flex items-center justify-center mt-2 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#A6785C]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Social Proof */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-8 mb-8"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-8 text-center">
          Impact by the Numbers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
              50+
            </div>
            <p className="text-[#57534E] text-sm">People Mentored</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
              15+
            </div>
            <p className="text-[#57534E] text-sm">Product Launches</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center"
          >
            <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
              100M+
            </div>
            <p className="text-[#57534E] text-sm">Users Impacted</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
              3
            </div>
            <p className="text-[#57534E] text-sm">Fortune 500 Companies</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Collaboration Philosophy */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="bg-[#E4DCCB]/30 rounded-lg p-8 border border-[#DDD6CE] text-center"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-4">
          Why Teams Love Working With Me
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-2xl mb-2">🤝</div>
            <h4 className="font-semibold text-[#1C1B1A] mb-2">Collaborative</h4>
            <p className="text-[#57534E] text-sm">
              I thrive in cross-functional environments and value diverse
              perspectives
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-[#1C1B1A] mb-2">Data-Driven</h4>
            <p className="text-[#57534E] text-sm">
              Every decision is backed by research and validated through testing
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🚀</div>
            <h4 className="font-semibold text-[#1C1B1A] mb-2">
              Results-Focused
            </h4>
            <p className="text-[#57534E] text-sm">
              I'm committed to delivering measurable impact for users and
              business
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;
