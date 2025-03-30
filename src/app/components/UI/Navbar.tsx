"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Rocket,
  X,
  User,
  LogOut,
  Settings,
  Layout,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  // Check if user is in dashboard or other authenticated routes
  useEffect(() => {
    // This is a simple check - in a real app, you'd verify with your auth provider
    const authenticatedPaths = [
      "/dashboard",
      "/profile",
      "/settings",
      "/templates",
    ];
    setIsAuthenticated(
      authenticatedPaths.some((path) => pathname?.startsWith(path))
    );
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    window.location.href = "/";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-6 py-4 transition-all duration-300 ${
          scrolled || isAuthenticated
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
            <Link
              href={isAuthenticated ? "/dashboard" : "/"}
              className="flex items-center"
            >
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

          {/* Navigation Links for Authenticated Users */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-6 mr-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/dashboard"
                  className={`transition-colors ${
                    pathname === "/dashboard"
                      ? "text-purple-400 font-medium"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/templates"
                  className={`transition-colors ${
                    pathname?.startsWith("/template")
                      ? "text-purple-400 font-medium"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  Templates
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/settings"
                  className={`transition-colors ${
                    pathname === "/settings"
                      ? "text-purple-400 font-medium"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  Settings
                </Link>
              </motion.div>
            </div>
          )}

          {/* Authentication Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <button className="bg-gradient-to-r from-[#711381] to-purple-600 p-2 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg">
                    <Plus size={20} className="text-white" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#272932] border border-[#2E313C] rounded-lg shadow-xl z-50">
                    <div className="py-1">
                      <Link
                        href="/template-form"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                      >
                        Create New Portfolio
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <button className="flex items-center space-x-2 bg-[#2E313C]/50 px-3 py-2 rounded-lg hover:bg-[#2E313C]/80 transition-all">
                    <User size={18} className="text-purple-400" />
                    <span className="text-gray-300">My Account</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#272932] border border-[#2E313C] rounded-lg shadow-xl z-50">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                      >
                        <div className="flex items-center">
                          <User size={16} className="mr-2" />
                          Profile
                        </div>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                      >
                        <div className="flex items-center">
                          <Layout size={16} className="mr-2" />
                          Dashboard
                        </div>
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                      >
                        <div className="flex items-center">
                          <Settings size={16} className="mr-2" />
                          Settings
                        </div>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2E313C]"
                      >
                        <div className="flex items-center">
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signin"
                    className="text-purple-400 transition-colors px-4 py-2"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-[#711381] to-purple-600 px-5 py-2.5 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
                  >
                    Create Account
                  </Link>
                </motion.div>
              </>
            )}
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
              {isAuthenticated && (
                <div className="w-full px-6 space-y-3">
                  <Link
                    href="/dashboard"
                    className={`block text-center py-2 px-4 rounded-md transition-colors ${
                      pathname === "/dashboard"
                        ? "bg-[#2E313C] text-purple-400"
                        : "bg-[#2E313C]/50 text-gray-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/templates"
                    className={`block text-center py-2 px-4 rounded-md transition-colors ${
                      pathname?.startsWith("/template")
                        ? "bg-[#2E313C] text-purple-400"
                        : "bg-[#2E313C]/50 text-gray-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Templates
                  </Link>
                  <Link
                    href="/settings"
                    className={`block text-center py-2 px-4 rounded-md transition-colors ${
                      pathname === "/settings"
                        ? "bg-[#2E313C] text-purple-400"
                        : "bg-[#2E313C]/50 text-gray-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/profile"
                    className={`block text-center py-2 px-4 rounded-md transition-colors ${
                      pathname === "/profile"
                        ? "bg-[#2E313C] text-purple-400"
                        : "bg-[#2E313C]/50 text-gray-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </div>
              )}

              <motion.div
                className="w-full px-6 space-y-3 mt-2 pt-4 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/template-form"
                      className="block w-full bg-gradient-to-r from-[#711381] to-purple-600 px-4 py-3 rounded-lg text-center hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center">
                        <Plus size={18} className="mr-2" />
                        Create New Portfolio
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-center text-red-400 transition-colors py-2 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
                    >
                      <div className="flex items-center justify-center">
                        <LogOut size={18} className="mr-2" />
                        Sign Out
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="block text-center text-purple-400 transition-colors py-2 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
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
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
