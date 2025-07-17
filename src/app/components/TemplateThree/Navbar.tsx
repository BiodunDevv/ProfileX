"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  DevName: string;
}

const Navbar = ({ DevName }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if we're in a preview context
    setIsPreview(window.location.pathname.includes('/templatePreview'));
    
    const handleScroll = () => {
      if (isPreview) {
        // In preview mode, check scroll within the preview container
        const previewContainer = document.querySelector('.template-preview-container');
        if (previewContainer) {
          setIsScrolled(previewContainer.scrollTop > 100);
        }
      } else {
        // Normal scroll detection
        setIsScrolled(window.scrollY > 100);
      }
    };

    if (isPreview) {
      const previewContainer = document.querySelector('.template-preview-container');
      if (previewContainer) {
        previewContainer.addEventListener("scroll", handleScroll);
        return () => previewContainer.removeEventListener("scroll", handleScroll);
      }
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isPreview]);

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    
    if (isPreview) {
      // In preview mode, scroll within the preview container
      const previewContainer = document.querySelector('.template-preview-container');
      const element = previewContainer?.querySelector(`#${targetId}`);
      
      if (element && previewContainer) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Normal navigation
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: isPreview ? -100 : 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${isPreview ? 'sticky' : 'fixed'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-800 backdrop-blur-md shadow-sm"
          : "bg-slate-800"
      }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <span
              className={`text-xl font-bold text-white`}
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {DevName}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`relative text-white hover:text-slate-400 transition-colors duration-200 font-medium`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex items-center justify-center shadow-lg`}
          >
            {isMobileMenuOpen ? (
              <X className={`w-5 h-5 text-white`} />
            ) : (
              <Menu className={`w-5 h-5 text-white`} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div
                className={`py-4 space-y-3 bg-white/90 backdrop-blur-md rounded-lg my-2 shadow-lg`}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      handleNavClick(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`block w-full text-left px-6 py-2 text-slate-700 hover:text-slate-800 hover:bg-zinc-50 transition-colors duration-200 font-medium`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
