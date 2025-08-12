"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ChevronDown,
  Terminal,
  Code,
  Award,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";

const Navigation = ({
  DevName
}: {
  DevName: string
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "hero", label: "Home", icon: Shield },
    { id: "about", label: "About", icon: Terminal },
    { id: "skills", label: "Skills", icon: Code },
    { id: "certifications", label: "Certs", icon: Award },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "writeups", label: "Writeups", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when section is clicked
  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight =
        window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 72 : 64;
      const targetPosition = section.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsDropdownOpen(false);
  };

  // Format section name for display
  const formatSectionName = (sectionName: string) => {
    return sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
  };

  return (
    <>
      {/* Top Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D1117]/95 backdrop-blur-md border-b border-[#38BDF8]/20 shadow-lg shadow-[#38BDF8]/5"
            : "bg-[#0D1117]/20 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#38BDF8] to-[#A855F7] rounded-lg flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-mono text-lg sm:text-xl text-[#38BDF8] font-bold">
                {DevName}
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 font-mono text-sm ${
                      isActive
                        ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 shadow-lg"
                        : "text-gray-300 hover:text-[#38BDF8] hover:bg-[#1F2937]/50"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium hidden xl:inline">
                      {formatSectionName(item.label)}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-[#38BDF8]/10 rounded-lg border border-[#38BDF8]/30"
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
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#1F2937]/50 border border-[#38BDF8]/30 text-[#38BDF8] font-mono text-sm backdrop-blur-sm"
              >
                <span className="font-medium text-xs sm:text-sm">
                  {formatSectionName(
                    navItems.find((item) => item.id === activeSection)?.label ||
                      "Home"
                  )}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
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
                    className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-[#0D1117]/95 backdrop-blur-md border border-[#38BDF8]/20 rounded-lg shadow-xl z-10"
                  >
                    <div className="p-2 space-y-1">
                      {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                          <motion.button
                            key={item.id}
                            onClick={() => handleSectionClick(item.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 font-mono text-xs sm:text-sm text-left ${
                              isActive
                                ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30"
                                : "text-gray-300 hover:text-[#38BDF8] hover:bg-[#1F2937]/50"
                            }`}
                          >
                            <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="font-medium truncate">
                              {formatSectionName(item.label)}
                            </span>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#38BDF8] rounded-full flex-shrink-0"
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
