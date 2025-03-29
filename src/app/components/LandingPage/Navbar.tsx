import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Rocket, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1b24]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center">
              <Rocket
                className="mr-2 text-[#711381]"
                size={40}
                strokeWidth={2}
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
                ProfileX
              </span>
            </Link>
          </motion.div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signin"
                className="text-purple-400 transition-colors px-4 py-2"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#711381] to-purple-600 px-5 py-2.5 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
              >
                Create Account
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg bg-[#2E313C]/50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed z-30 top-16 left-0 w-full bg-gradient-to-b from-[#272932] to-[#1a1b24] shadow-lg backdrop-blur-md"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col items-center space-y-4 py-6"
            >
              <motion.div
                className="w-full px-6 space-y-3 mt-2 pt-4 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <Link
                  href="/signin"
                  className="block text-center text-purple-400text-purple-400 transition-colors py-2 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full bg-gradient-to-r from-[#711381] to-purple-600 px-4 py-3 rounded-lg text-center hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
