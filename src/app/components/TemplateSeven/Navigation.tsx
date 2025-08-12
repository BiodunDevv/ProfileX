"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Home, User, Briefcase, FileText, Mail } from "lucide-react";

interface NavigationProps {
  activeSections: string[];
  activeSection: number;
  onSectionClick: (index: number) => void;
  DevName: string;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSections,
  activeSection,
  onSectionClick,
  DevName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when section is clicked
  const handleSectionClick = (index: number) => {
    onSectionClick(index);
    setIsDropdownOpen(false);
  };

  // Get icon for each section
  const getSectionIcon = (sectionName: string) => {
    switch (sectionName) {
      case "Hero":
        return Home;
      case "About":
        return User;
      case "CreativePortfolio":
      case "GitHubProjects":
      case "BehanceProjects":
        return Briefcase;
      case "Blog":
        return FileText;
      case "Contact":
        return Mail;
      default:
        return Home;
    }
  };

  // Format section name for display
  const formatSectionName = (sectionName: string) => {
    return sectionName
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace("Git Hub", "GitHub")
      .replace("Creative Portfolio", "Portfolio");
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#D4AF37]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#722F37] rounded-lg flex items-center justify-center">
                <span className="text-[#0F0F0F] font-garamond font-bold text-sm">
                  {DevName.charAt(0)}
                </span>
              </div>
              <span className="font-garamond text-xl text-[#F4ECD8] font-semibold italic">
                {DevName.split(" ")[0]}
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {activeSections.map((section, index) => {
                const IconComponent = getSectionIcon(section);
                const isActive = activeSection === index;

                return (
                  <motion.button
                    key={section}
                    onClick={() => onSectionClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-inter text-sm ${
                      isActive
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                        : "text-[#F4ECD8]/70 hover:text-[#F4ECD8] hover:bg-[#722F37]/20"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">
                      {formatSectionName(section)}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Dropdown */}
            <div className="lg:hidden relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#722F37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-inter text-sm"
              >
                <span className="font-medium">
                  {formatSectionName(activeSections[activeSection])}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#0F0F0F]/95 backdrop-blur-md border border-[#D4AF37]/20 rounded-lg shadow-xl z-10"
                  >
                    <div className="p-2 space-y-1">
                      {activeSections.map((section, index) => {
                        const IconComponent = getSectionIcon(section);
                        const isActive = activeSection === index;

                        return (
                          <motion.button
                            key={section}
                            onClick={() => handleSectionClick(index)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 font-inter text-sm text-left ${
                              isActive
                                ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                                : "text-[#F4ECD8]/70 hover:text-[#F4ECD8] hover:bg-[#722F37]/20"
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="font-medium">
                              {formatSectionName(section)}
                            </span>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto w-2 h-2 bg-[#D4AF37] rounded-full"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
