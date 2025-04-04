"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

interface NavbarProps {
  DevName?: string;
}

const Navbar = ({ DevName }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["About", "Projects", "Contact"];

  const firstLetter = DevName?.charAt(0) || "";
  const restOfName = DevName?.slice(1) || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`w-full px-6 md:px-12 py-4 transition-all duration-300 
      ${
        scrolled
          ? "bg-[#161513]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-2xl font-bold text-white">
            <span className="text-amber-500">{firstLetter}</span>
            {restOfName}
          </h1>
          <motion.div
            className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-amber-400 relative px-1 py-2 font-medium text-lg"
                  whileHover="hover"
                >
                  {item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500"
                    initial={{ scaleX: 0, originX: 0 }}
                    variants={{
                      hover: { scaleX: 1, transition: { duration: 0.3 } },
                    }}
                  />
                </motion.a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="ml-4 px-6 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-medium transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Resume
              </motion.button>
            </motion.li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <IoCloseOutline className="w-8 h-8 text-amber-500" />
            ) : (
              <IoMenuOutline className="w-8 h-8 text-amber-500" />
            )}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 bg-[#161513]/95 backdrop-blur-md shadow-lg border-t border-amber-500/20"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <ul className="flex flex-col py-4 px-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: mobileMenuOpen ? 0 : -20,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ delay: 0.05 * index }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-amber-400 block py-2 text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: mobileMenuOpen ? 0 : -20,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ delay: 0.25 }}
          >
            <button className="w-full mt-2 py-3 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-medium transition-all duration-300">
              Resume
            </button>
          </motion.li>
        </ul>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
