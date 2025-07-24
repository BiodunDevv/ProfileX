"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, Check, Star } from "lucide-react";
import { CertificationItem } from "../../allTemplates/templateEight/page";

interface CertificationsProps {
  data: CertificationItem[];
}

const Certifications: React.FC<CertificationsProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const certificationColors = [
    { bg: "#EF4444", light: "#FEE2E2" },
    { bg: "#3B82F6", light: "#DBEAFE" },
    { bg: "#10B981", light: "#D1FAE5" },
    { bg: "#F59E0B", light: "#FEF3C7" },
    { bg: "#8B5CF6", light: "#EDE9FE" },
    { bg: "#EF4444", light: "#FEE2E2" },
  ];

  return (
    <section
      id="certifications"
      className="py-16 sm:py-20 px-2 sm:px-6  scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[#38BDF8] mr-3" />
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                Certifications
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in
              cybersecurity.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.map((cert, index) => {
              const color =
                certificationColors[index % certificationColors.length];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-4 hover:border-[#38BDF8]/40 transition-all duration-300 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div
                        className="w-full h-full rounded-full blur-xl"
                        style={{ backgroundColor: color.bg }}
                      ></div>
                    </div>

                    {/* Certification Badge */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="p-3 rounded-xl"
                          style={{
                            backgroundColor: `${color.bg}20`,
                            border: `1px solid ${color.bg}40`,
                          }}
                        >
                          <Award
                            className="w-6 h-6"
                            style={{ color: color.bg }}
                          />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                          <span className="text-sm text-gray-400">
                            Verified
                          </span>
                        </div>
                      </div>

                      {/* Certification Info */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors duration-300">
                        {cert.title}
                      </h3>

                      <p className="text-[#38BDF8] font-medium mb-3">
                        {cert.issuer}
                      </p>

                      <div className="flex items-center text-gray-400 text-sm mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        Obtained in {cert.year}
                      </div>

                      {/* Validation Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-[#22C55E]" />
                          <span className="text-[#22C55E] text-sm font-medium">
                            Active
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar (representing validity period) */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                          <span>Validity</span>
                          <span>Active</span>
                        </div>
                        <div className="h-2 bg-[#0D1117] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            transition={{ delay: index * 0.1, duration: 1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: color.bg }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
