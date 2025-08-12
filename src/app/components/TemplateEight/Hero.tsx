"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Terminal,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  ExternalLink,
} from "lucide-react";
import { HeroData } from "../../allTemplates/templateEight/page";

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [showCursor, setShowCursor] = useState(true);

  const fullText = `> whoami\n${data.DevName}\n\n> cat mission.txt\n${data.title}\n\n> echo "${data.description}"`;

  // Helper function to handle file downloads
  const handleFileDownload = (fileUrl: string) => {
    try {
      // Validate URL
      if (!fileUrl || !fileUrl.startsWith("http")) {
        console.error("Invalid file URL");
        return;
      }

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      // Try to extract filename from URL or use default
      const urlParts = fileUrl.split("/");
      const filename = urlParts[urlParts.length - 1] || "resume.pdf";

      // Set download attribute to suggest filename
      link.download = filename;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Fallback: open in new tab
      if (fileUrl) {
        window.open(fileUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-2 sm:px-6 lg:px-6 pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 space-y-6 lg:space-y-8"
          >
            {/* Terminal Window - Enhanced for mobile */}
            <motion.div
              variants={itemVariants}
              className="bg-[#161B22]/90 backdrop-blur-xl border border-[#38BDF8]/20 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#38BDF8]/10 transition-all duration-500"
            >
              {/* Terminal Header - Responsive */}
              <div className="bg-[#1F2937]/90 px-3 sm:px-4 py-2 sm:py-3 flex items-center space-x-2 border-b border-[#38BDF8]/20">
                <div className="flex space-x-1.5 sm:space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
                <div className="flex items-center space-x-2 ml-2 sm:ml-4">
                  <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-[#38BDF8]" />
                  <span className="text-[#38BDF8] text-xs sm:text-sm font-mono hidden sm:block">
                    zsh - Terminal
                  </span>
                  <span className="text-[#38BDF8] text-xs font-mono sm:hidden">
                    terminal
                  </span>
                </div>
              </div>

              {/* Terminal Content - Responsive font sizes */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm lg:text-base">
                <pre className="text-[#22C55E] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                  {fullText}
                  {showCursor && (
                    <span className="text-[#38BDF8] animate-pulse">█</span>
                  )}
                </pre>
              </div>
            </motion.div>

            {/* Certifications & Availability - Enhanced mobile layout */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 lg:space-y-6"
            >
              {/* Certifications */}
              <div>
                <h3 className="text-[#38BDF8] font-semibold mb-3 flex items-center text-sm sm:text-base">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Active Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((cert, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-2 sm:px-3 py-1 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full text-[#22C55E] text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-[#22C55E]/20 transition-all duration-300"
                    >
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Available For */}
              <div>
                <h3 className="text-[#A855F7] font-semibold mb-3 text-sm sm:text-base">
                  Available For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.availableFor.map((service, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-2 sm:px-3 py-1 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-full text-[#A855F7] text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-[#A855F7]/20 transition-all duration-300"
                    >
                      {service}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - Mobile responsive */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(56, 189, 248, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:from-[#38BDF8]/90 hover:to-[#0EA5E9]/90 text-[#0D1117] px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
                onClick={() => {
                  if (data.resumeFile) {
                    handleFileDownload(data.resumeFile);
                  }
                }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Download Resume</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                onClick={() => {
                  window.location.href = "#projects";
                }}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social Links - Enhanced mobile layout */}
            <motion.div
              variants={itemVariants}
              className="flex space-x-3 sm:space-x-4"
            >
              {data.socialLinks &&
                data.socialLinks.length > 0 &&
                data.socialLinks.map((social, index) => {
                  // Map icon strings to actual icon components
                  const getIcon = (iconName: string) => {
                    switch (iconName) {
                      case "Github":
                        return Github;
                      case "Linkedin":
                        return Linkedin;
                      case "Mail":
                        return Mail;
                      case "Twitter":
                        return Twitter;
                      case "Globe":
                      case "Website":
                        return Globe;
                      case "ExternalLink":
                        return ExternalLink;
                      default:
                        return ExternalLink; // fallback for unknown platforms
                    }
                  };

                  const getIconColor = (iconName: string) => {
                    switch (iconName) {
                      case "Github":
                        return "#fff";
                      case "Linkedin":
                        return "#0077B5";
                      case "Mail":
                        return "#38BDF8";
                      case "Twitter":
                        return "#1DA1F2";
                      case "Globe":
                      case "Website":
                        return "#22C55E";
                      case "ExternalLink":
                      default:
                        return "#A855F7";
                    }
                  };

                  const Icon = getIcon(social.icon);
                  const iconColor = getIconColor(social.icon);

                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.1,
                        rotate: index % 2 === 0 ? 5 : -5,
                        y: -3,
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 sm:p-3 bg-[#161B22]/90 backdrop-blur-sm border border-[#38BDF8]/20 rounded-xl hover:border-[#38BDF8]/50 transition-all duration-300 hover:shadow-lg"
                      style={
                        { "--hover-shadow": `0 0 20px ${iconColor}40` } as any
                      }
                      title={social.platform}
                    >
                      <Icon
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: iconColor }}
                      />
                    </motion.a>
                  );
                })}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image - Enhanced for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative group">
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#22C55E] rounded-2xl lg:rounded-3xl blur-lg opacity-20  transition-all duration-500"></div>

              {/* Image Container - Responsive sizing */}
              <div className="relative bg-[#161B22]/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-1.5 sm:p-2  transition-all duration-500">
                <img
                  src={data.heroImage}
                  alt="Cybersecurity Professional"
                  className="w-full h-64 sm:h-80 lg:h-[500px] object-cover rounded-lg lg:rounded-xl"
                />

                {/* Overlay Effect */}
                <div className="absolute inset-1.5 sm:inset-2 rounded-lg lg:rounded-xl bg-gradient-to-t from-[#0D1117]/80 via-transparent to-transparent"></div>

                {/* Status Indicator - Mobile responsive */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#161B22]/90 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-[#22C55E]/30">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <span className="text-[#22C55E] text-xs sm:text-sm font-mono">
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Security Level Indicator */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-[#161B22]/90 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-[#A855F7]/30">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#A855F7]" />
                    <span className="text-[#A855F7] text-xs sm:text-sm font-mono">
                      SEC_LEVEL_MAX
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only floating indicators */}
            <div className="sm:hidden absolute top-2 left-2 bg-[#161B22]/90 backdrop-blur-sm border border-[#A855F7]/30 rounded-lg p-2">
              <div className="text-[#A855F7] text-xs font-mono">Red Team</div>
            </div>

            <div className="sm:hidden absolute bottom-2 right-2 bg-[#161B22]/90 backdrop-blur-sm border border-[#38BDF8]/30 rounded-lg p-2">
              <div className="text-[#38BDF8] text-xs font-mono">./exploit</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
