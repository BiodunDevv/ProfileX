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
  UserCircle,
  LayoutDashboard,
  FileCode,
  Palette,
  Home,
  AlertTriangle,
  Monitor,
  Smartphone,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/signin", "/signup", "/reset-password"];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasShownNotice, setHasShownNotice] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Use auth store for authentication status
  const { user, signOut, checkAuthState, isAuthenticated } = useAuthStore();

  // Check authentication on component mount and route changes
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Skip auth check for public pages
        if (PUBLIC_ROUTES.includes(pathname)) {
          return;
        }

        const isAuth = await checkAuthState();

        if (!isAuth) {
          console.log("User not authenticated, showing warning");
          setShowAuthWarning(true);

          // Set a timeout to redirect after showing the message
          setTimeout(() => {
            console.log("Redirecting to signin page");
            router.push("/signin");
          }, 3000); // 3 second delay before redirect
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setShowAuthWarning(true);

        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      }
    };

    verifyAuth();
  }, [pathname, router, checkAuthState]);

  // Additional effect to ensure auth state is checked on mount
  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      checkAuthState();
    }
  }, [checkAuthState, pathname]);

  // Debug effect to log user data
  useEffect(() => {
    console.log("🔍 UI Navbar - Current user data:", {
      user,
      isAuthenticated,
      userName: user?.name,
      userEmail: user?.email,
      hasUser: !!user,
      userKeys: user ? Object.keys(user) : [],
    });
  }, [user, isAuthenticated]);

  // Mobile detection and notice logic
  useEffect(() => {
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
          setHasShownNotice(true);
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasShownNotice]);

  // Auto-hide mobile notice after progress bar completes
  useEffect(() => {
    if (showMobileNotice) {
      const timer = setTimeout(() => {
        setShowMobileNotice(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showMobileNotice]);

  // Dismiss mobile notice
  const dismissMobileNotice = () => {
    setShowMobileNotice(false);
    localStorage.setItem("mobileNotice", "true");
  };

  // Format user name for avatar
  const getInitials = (name?: string) => {
    if (!name) return "PX";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Navigation links for dashboard
  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Templates",
      path: "/templates",
      icon: Palette,
    },
    {
      name: "Portfolios",
      path: "/portfolios",
      icon: FileCode,
    },
  ];

  const menuLinks = [
    {
      name: "Profile",
      path: "profile",
      icon: User,
      color: "text-blue-400",
    },
    {
      name: "Settings",
      path: "settings",
      icon: Settings,
      color: "text-purple-400",
    },
  ];

  return (
    <>
      {/* Authentication Warning Message */}
      <AnimatePresence>
        {showAuthWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 inset-x-0 z-50 flex justify-center items-center"
          >
            <div className="bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-b-lg shadow-lg flex items-center max-w-md mx-auto">
              <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
              <div>
                <p className="font-medium">Authentication required</p>
                <p className="text-sm">Redirecting you to sign in page...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-2 sm:px-6 py-3 transition-all duration-300 bg-[#1a1b24]/90 backdrop-blur-md shadow-lg`}
      >
        <div className="max-w-9xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/dashboard" className="flex items-center">
              <Rocket
                className="mr-2 text-[#711381]"
                size={36}
                strokeWidth={2}
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
                ProfileX
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 mr-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.path}
                  className={`transition-colors ${
                    pathname === link.path
                      ? "text-purple-400 font-medium"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            {/* Home Link to return to landing page */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Home size={18} />
              </Link>
            </motion.div>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Profile Dropdown */}
            <motion.div whileTap={{ scale: 0.98 }} className="relative">
              <motion.button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                whileHover={{ backgroundColor: "rgba(46, 49, 60, 0.9)" }}
                className="flex items-center space-x-3 bg-[#2E313C]/50 px-4 py-2.5 rounded-xl hover:bg-[#2E313C]/80 transition-all duration-300 border border-transparent hover:border-purple-500/20"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg"
                >
                  {user?.name ? (
                    getInitials(user.name)
                  ) : (
                    <UserCircle size={20} />
                  )}
                </motion.div>
                <div className="flex flex-col items-start max-w-[120px]">
                  <span className="text-gray-200 text-sm font-medium truncate">
                    {user?.name || "Loading..."}
                  </span>
                  <span className="text-gray-400 text-xs truncate">
                    {user?.email?.split("@")[0] || "user"}
                  </span>
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-60 bg-[#272932]/95 backdrop-blur-md border border-[#3E4154] rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {/* Menu items */}
                    <div className="py-2">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 },
                          },
                        }}
                      >
                        {menuLinks.map((item) => (
                          <motion.div
                            key={item.path}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            <Link
                              href={item.path}
                              className="group flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-[#2E313C]/70 hover:text-white transition-all duration-200"
                              onClick={() => setIsProfileMenuOpen(false)}
                            >
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`mr-3 ${item.color} group-hover:scale-110 transition-transform`}
                              >
                                <item.icon size={18} />
                              </motion.div>
                              <span className="font-medium">{item.name}</span>
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="ml-auto text-gray-500"
                              >
                                →
                              </motion.div>
                            </Link>
                          </motion.div>
                        ))}

                        {/* Separator */}
                        <div className="border-t border-[#3E4049] my-2"></div>

                        {/* Sign out button */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <motion.button
                            onClick={() => {
                              handleLogout();
                              setIsProfileMenuOpen(false);
                            }}
                            whileHover={{
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="mr-3 group-hover:scale-110 transition-transform"
                            >
                              <LogOut size={18} />
                            </motion.div>
                            <span className="font-medium">Sign Out</span>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              className="ml-auto text-red-500/70"
                            >
                              ↗
                            </motion.div>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            className="h-screen md:hidden fixed z-30 top-16 left-0 w-full bg-gradient-to-b from-[#272932] to-[#1a1b24] shadow-lg backdrop-blur-md"
          >
            {/* User Profile - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 border-b border-[#3E4049] bg-[#2E313C]/50"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white text-lg font-semibold shadow-lg"
                >
                  {user?.name ? getInitials(user.name) : "U"}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base font-semibold text-gray-100 truncate"
                  >
                    {user?.name || "Loading..."}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-400 truncate"
                  >
                    {user?.email || "user@example.com"}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Links - Mobile */}
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
              <div className="w-full px-6 space-y-3">
                {menuLinks.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 },
                      },
                    }}
                  >
                    <Link
                      href={item.path}
                      className="flex items-center justify-start py-3 px-4 rounded-xl transition-all duration-300 bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-transparent hover:border-purple-500/20 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`mr-3 group-hover:scale-110 transition-transform`}
                      >
                        <item.icon size={18} />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-auto text-gray-500 group-hover:text-purple-400"
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 },
                      },
                    }}
                  >
                    <Link
                      href={link.path}
                      className={`flex items-center justify-start py-3 px-4 rounded-xl transition-all duration-300 group ${
                        pathname === link.path
                          ? "bg-gradient-to-r from-purple-600/20 to-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-transparent hover:border-purple-500/20"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`mr-3 ${
                          pathname === link.path
                            ? "text-purple-400"
                            : "group-hover:text-purple-400"
                        }`}
                      >
                        <link.icon size={18} />
                      </motion.div>
                      <span className="font-medium">{link.name}</span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-auto text-gray-500 group-hover:text-purple-400"
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* Link to home page */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: navLinks.length * 0.1 },
                    },
                  }}
                >
                  <Link
                    href="/"
                    className="flex items-center justify-start py-3 px-4 rounded-xl transition-all duration-300 bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-transparent hover:border-purple-500/20 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mr-3 group-hover:text-purple-400"
                    >
                      <Home size={18} />
                    </motion.div>
                    <span className="font-medium">Home</span>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="ml-auto text-gray-500 group-hover:text-purple-400"
                    >
                      →
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="w-full px-6 space-y-4 mt-2 pt-6 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center text-red-400 hover:text-red-300 transition-all duration-300 py-3 px-6 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 hover:border-red-500/30 group"
                  >
                    <div className="flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mr-3 group-hover:scale-110 transition-transform"
                      >
                        <LogOut size={18} />
                      </motion.div>
                      <span className="font-medium">Sign Out</span>
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
