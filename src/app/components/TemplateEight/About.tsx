"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Calendar, ExternalLink } from "lucide-react";
import { AboutData, StatItem } from "../../allTemplates/templateEight/page";

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#38BDF8] mr-2 sm:mr-3" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                About Me
              </h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Bio Section - Enhanced responsive */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#161B22]/90 backdrop-blur-sm border border-[#38BDF8]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#38BDF8]/40 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#38BDF8] mb-3 sm:mb-4 lg:mb-6 flex items-center">
                  <span className="text-[#22C55E] mr-2 font-mono text-base sm:text-lg lg:text-xl">
                    $
                  </span>
                  cat about.txt
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {data.bio}
                  </p>
                </div>

                {/* Dynamic Stats - Mobile responsive grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {data.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-3 sm:p-4 bg-[#1F2937]/50 rounded-xl border hover:scale-105 transition-all duration-300"
                      style={{
                        borderColor: `${stat.color}20`,
                        backgroundColor: `${stat.color}05`,
                      }}
                    >
                      <div
                        className="text-xl sm:text-2xl lg:text-3xl font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Section - Enhanced responsive */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#161B22]/90 backdrop-blur-sm border border-[#38BDF8]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full hover:border-[#38BDF8]/40 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#38BDF8] mb-4 sm:mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Experience
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {data.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Line - Hidden on mobile, visible on larger screens */}
                      {index !== data.experience.length - 1 && (
                        <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-[#38BDF8] to-[#A855F7] hidden sm:block"></div>
                      )}

                      <div className="flex items-start space-x-3 sm:space-x-4">
                        {/* Timeline Dot - Responsive sizing */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] rounded-full flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                        </div>

                        {/* Experience Content - Enhanced responsive */}
                        <div className="flex-1 min-w-0">
                          <div className="bg-[#1F2937]/50 border border-[#38BDF8]/20 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:border-[#38BDF8]/40 transition-colors duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-0">
                                {exp.role}
                              </h4>
                              <div className="flex items-center text-[#22C55E] text-xs sm:text-sm">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {exp.year}
                              </div>
                            </div>

                            <div className="text-[#38BDF8] font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center">
                              <span className="truncate">{exp.company}</span>
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-60 flex-shrink-0" />
                            </div>

                            <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                              {exp.description}
                            </p>

                            {/* Skills Tags - Responsive sizing */}
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                              {index === 0 && (
                                <>
                                  <span className="px-2 py-1 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded text-[#22C55E] text-xs">
                                    Red Team
                                  </span>
                                  <span className="px-2 py-1 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded text-[#A855F7] text-xs">
                                    Pen Testing
                                  </span>
                                </>
                              )}
                              {index === 1 && (
                                <>
                                  <span className="px-2 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded text-[#38BDF8] text-xs">
                                    SOC Analysis
                                  </span>
                                  <span className="px-2 py-1 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded text-[#22C55E] text-xs">
                                    Incident Response
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Download Resume CTA - Enhanced responsive */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-[#38BDF8]/10 to-[#A855F7]/10 border border-[#38BDF8]/20 rounded-lg sm:rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">
                        Want to know more?
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Download my full resume
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#38BDF8] hover:bg-[#38BDF8]/80 text-[#0D1117] px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300 self-start sm:self-auto"
                    >
                      Download
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
