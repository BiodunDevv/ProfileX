"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Rocket, X, LogOut, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import PWAInstallNotice from "../PWA/PWAInstallNotice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Get auth status from store instead of path-based detection
  const { isAuthenticated, user, signOut, checkAuthState } = useAuthStore();

  // Check auth state on mount to ensure user data is loaded
  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Debug effect to log user data
  useEffect(() => {
    console.log("🔍 Landing Navbar - User data:", {
      user,
      isAuthenticated,
      userName: user?.name,
      userEmail: user?.email,
      hasUser: !!user,
      userKeys: user ? Object.keys(user) : [],
    });
  }, [user, isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    console.log("Signing out...");
    await signOut();
    router.push("/");
  };

  // Animated dashboard button that appears when authenticated
  const DashboardButton = ({ className = "", onClick = () => {} }) => (
    <motion.div>
      <Link
        href="/dashboard"
        onClick={onClick}
        className={`flex items-center gap-2 bg-gradient-to-r from-[#711381] to-purple-600 px-4 py-2.5 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg group ${className}`}
      >
        <span>Go to Dashboard</span>
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );

  return (
    <>
      {/* PWA Install Notice */}
      <PWAInstallNotice />

      {/* Spacer for navbar */}
      <div className="h-20"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1b24]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
        ${
          isMobileMenuOpen
            ? "bg-[#1a1b24]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
        `}
      >
        <div className="max-w-9xl mx-auto flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Landing page links */}
            <div className="flex items-center space-x-6 mr-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/#features"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Features
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/#templates"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Templates
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/#developers"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Developers
                </Link>
              </motion.div>
            </div>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User info with dashboard button */}
                <motion.div
                  className="flex items-center gap-3"
                  transition={{ duration: 0.3 }}
                >
                  <div className="hidden lg:block">
                    <p className="text-sm text-gray-300">
                      Welcome back
                      <span className="font-medium text-purple-400 ml-1">
                        {user?.name?.split(" ")[0] || "User"}!
                      </span>
                    </p>
                  </div>
                  <DashboardButton />
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
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
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
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex flex-col items-center space-y-4 py-6"
            >
              {/* Landing page links - Mobile */}
              <div className="w-full px-6 space-y-2">
                <Link
                  href="/#features"
                  className="block text-center py-2.5 px-4 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#templates"
                  className="block text-center py-2.5 px-4 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/#developers"
                  className="block text-center py-2.5 px-4 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Developers
                </Link>
              </div>

              {/* Auth section - Mobile */}
              <motion.div
                className="w-full px-6 space-y-3 mt-2 pt-4 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                {isAuthenticated ? (
                  <>
                    {/* Welcome message for mobile */}
                    <div className="text-center mb-3">
                      <p className="text-gray-400 text-sm">Welcome back</p>
                      <p className="text-purple-400 font-medium">
                        {user?.name || "User"}!
                      </p>
                    </div>

                    {/* Dashboard button for mobile */}
                    <DashboardButton
                      className="w-full justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Sign out option */}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-center text-red-400 transition-colors py-2.5 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
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
                      className="block text-center text-purple-400 transition-colors py-2.5 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
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
