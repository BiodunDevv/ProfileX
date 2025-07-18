"use client";

import React from "react";
import { motion } from "framer-motion";

interface CertificationsProps {
  data: {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }[];
}

const Certifications: React.FC<CertificationsProps> = ({ data }) => {
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
        className="text-center mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-3xl md:text-4xl text-[#1C1B1A] mb-4">
          Certifications & Credentials
        </h1>
        <div className="w-16 h-px bg-[#A6785C] mx-auto mb-4"></div>
        <p className="text-[#57534E] text-lg max-w-2xl mx-auto leading-relaxed">
          Continuous learning through formal certifications and professional
          development programs
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {data.map((certification, index) => (
          <motion.div
            key={certification.name}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Certificate Header */}
            <div className="bg-[#E4DCCB]/20 px-6 py-4 border-b border-[#DDD6CE]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-['DM_Serif_Display'] text-lg md:text-xl text-[#1C1B1A] mb-1">
                    {certification.name}
                  </h3>
                  <p className="text-[#A6785C] font-semibold">
                    {certification.issuer}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <div className="w-10 h-10 bg-[#A6785C] rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#57534E] text-sm">Date Earned:</span>
                  <span className="text-[#1C1B1A] font-medium">
                    {certification.date}
                  </span>
                </div>

                {certification.credentialId && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#57534E] text-sm">
                      Credential ID:
                    </span>
                    <span className="text-[#1C1B1A] font-mono text-sm">
                      {certification.credentialId}
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Journey */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-8 mb-8"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-6 text-center">
          Learning Timeline
        </h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#DDD6CE]"></div>

          <div className="space-y-8">
            {data.map((certification, index) => (
              <motion.div
                key={certification.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="relative flex items-center"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-[#A6785C] rounded-full border-2 border-white shadow-sm"></div>

                {/* Content */}
                <div className="ml-16 bg-[#E4DCCB]/20 rounded-lg p-4 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-semibold text-[#1C1B1A] mb-1">
                        {certification.name}
                      </h4>
                      <p className="text-[#A6785C] text-sm">
                        {certification.issuer}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="text-[#57534E] text-sm font-medium">
                        {certification.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Professional Development Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
            {data.length}
          </div>
          <p className="text-[#57534E] text-sm font-medium">
            Certifications Earned
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
            100+
          </div>
          <p className="text-[#57534E] text-sm font-medium">Learning Hours</p>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-[#DDD6CE]">
          <div className="text-3xl font-['DM_Serif_Display'] text-[#A6785C] mb-2">
            3
          </div>
          <p className="text-[#57534E] text-sm font-medium">
            Leading Institutions
          </p>
        </div>
      </motion.div>

      {/* Commitment to Learning */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="bg-[#E4DCCB]/30 rounded-lg p-8 border border-[#DDD6CE] text-center"
      >
        <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-4">
          Commitment to Excellence
        </h3>
        <p className="text-[#57534E] leading-relaxed max-w-3xl mx-auto mb-4">
          I believe that continuous learning is essential in our rapidly
          evolving field. These certifications represent my commitment to
          staying current with best practices, emerging methodologies, and
          industry standards in content design and user experience.
        </p>
        <p className="text-[#57534E] leading-relaxed max-w-3xl mx-auto">
          Each certification has provided valuable frameworks and perspectives
          that I apply daily in my work, ensuring that my approach remains
          informed by the latest research and proven strategies.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Certifications;
