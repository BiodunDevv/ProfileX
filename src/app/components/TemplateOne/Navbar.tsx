"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  DevName: string;
}

const Navbar = ({ DevName }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className="w-full max-w-9xl mx-auto py-4 px-4 sm:px-6 md:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full flex justify-between items-center p-3 bg-[#1B1B1B] rounded-lg backdrop-blur-sm bg-opacity-80">
        {/* Logo/Brand */}
        <motion.div
          className="text-[#3F8E00] font-bold text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          {DevName}
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <X className="text-white" size={24} strokeWidth={2} />
          ) : (
            <Menu className="text-white" size={24} strokeWidth={2} />
          )}
        </motion.button>

        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center space-x-8 items-center text-center">
          {["Home", "About", "Experience", "Get in Touch"].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="text-base lg:text-lg font-normal hover:text-[#3F8E00] transition-colors"
            >
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className="relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3F8E00] transition-all group-hover:w-full duration-300"></span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-[#1B1B1B] mt-2 rounded-lg p-4 shadow-xl backdrop-blur-sm bg-opacity-90"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul className="flex flex-col space-y-4">
              {["Home", "About", "Experience", "Get in Touch"].map(
                (item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    className="text-center hover:text-[#3F8E00] transition-colors"
                  >
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      onClick={toggleMenu}
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
