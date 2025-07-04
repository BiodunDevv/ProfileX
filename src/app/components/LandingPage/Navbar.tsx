"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Rocket,
  X,
  LogOut,
  ArrowRight,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasShownNotice, setHasShownNotice] = useState(false); // Track if notice was shown this session
  const router = useRouter();

  // Get auth status from store instead of path-based detection
  const { isAuthenticated, user, signOut } = useAuthStore();

  // Handle scroll effect and mobile detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);

      // Show mobile notice only if:
      // 1. On mobile device
      // 2. Haven't been permanently dismissed (localStorage)
      // 3. Haven't shown this session yet
      if (isMobileDevice && !hasShownNotice) {
        const hasSeenNotice = localStorage.getItem("mobileNotice");
        if (!hasSeenNotice) {
          setShowMobileNotice(true);
          setHasShownNotice(true); // Mark as shown for this session
        }
      }
    };

    // Only check mobile on initial load
    if (!hasShownNotice) {
      checkMobile();
    }

    const handleResize = () => {
      // Only update isMobile state on resize, don't trigger notice
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasShownNotice]); // Add hasShownNotice to dependency array

  const handleSignOut = async () => {
    console.log("Signing out...");
    await signOut();
    router.push("/");
  };

  // Dismiss mobile notice
  const dismissMobileNotice = () => {
    setShowMobileNotice(false);
    localStorage.setItem("mobileNotice", "true");
  };

  // Auto-hide after progress bar completes
  useEffect(() => {
    if (showMobileNotice) {
      const timer = setTimeout(() => {
        setShowMobileNotice(false);
        // Don't reset hasShownNotice here so it stays hidden for this session
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showMobileNotice]);

  // Animated dashboard button that appears when authenticated
  const DashboardButton = ({ className = "", onClick = () => {} }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
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
      {/* Advanced Mobile Notice - Only shows on mobile devices */}
      <AnimatePresence>
        {showMobileNotice && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.6,
            }}
            className="fixed top-0 left-0 right-0 z-50 mx-2 mt-2"
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#711381] to-purple-600 backdrop-blur-md border border-[#711381]/30 rounded-2xl shadow-2xl shadow-[#711381]/30">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative p-4 flex items-start gap-3">
                {/* Icon with animation */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="flex-shrink-0 p-2 bg-white/20 rounded-xl backdrop-blur-sm"
                >
                  <Monitor className="w-5 h-5 text-white" />
                </motion.div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-bold text-white text-sm leading-tight"
                  >
                    🚀 Best Experience on Desktop
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-xs mt-1 leading-relaxed"
                  >
                    For the ultimate ProfileX experience with all features, we
                    recommend using a desktop browser.
                  </motion.p>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-lg transition-all border border-white/20"
                      onClick={dismissMobileNotice}
                    >
                      <Smartphone className="w-3 h-3" />
                      Continue on Mobile
                    </motion.button>
                  </div>
                </div>

                {/* Dismiss button */}
                <motion.button
                  onClick={dismissMobileNotice}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0 p-2 hover:bg-white/20 rounded-lg transition-all group"
                  aria-label="Dismiss notice"
                >
                  <X className="w-4 h-4 text-white/80 group-hover:text-white" />
                </motion.button>
              </div>

              {/* Progress bar animation */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 8,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for navbar */}
      <div className="h-20"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
