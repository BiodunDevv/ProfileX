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
  ArrowRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import PWAInstallNotice from "../PWA/PWAInstallNotice";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/signin", "/signup", "/reset-password"];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Click outside handler for profile menu
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isProfileMenuOpen && !target.closest("[data-profile-menu]")) {
        setIsProfileMenuOpen(false);
      }
      // Close mobile menu when clicking outside
      if (isMobileMenuOpen && !target.closest("[data-mobile-menu]")) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen, isMobileMenuOpen]);

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
      path: "/profile",
      icon: User,
      color: "text-blue-400",
    },
    {
      name: "Settings",
      path: "/settings",
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
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
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

      {/* PWA Install Notice */}
      <PWAInstallNotice />

      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1b24]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent backdrop-blur-none shadow-none"
        }
        ${isMobileMenuOpen ? "bg-[#1a1b24]/90 backdrop-blur-md shadow-lg" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          {/* Logo */}
          <motion.div
            className="flex items-center z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/dashboard" className="flex items-center">
              <Rocket
                className="mr-1 sm:mr-2 text-[#711381]"
                size={32}
                strokeWidth={2}
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
                ProfileX
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation links - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.path}
                  className={`transition-colors text-sm xl:text-base ${
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
                className="text-gray-300 hover:text-purple-400 transition-colors p-2"
                title="Home"
              >
                <Home size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Right section with user info and mobile menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User section - Responsive */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Profile Dropdown */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                  data-profile-menu
                >
                  <motion.button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 sm:space-x-3 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg"
                    >
                      {getInitials(user.name)}
                    </motion.div>
                    {/* User info text - hidden on very small screens */}
                    <div className="hidden sm:flex flex-col items-start max-w-[100px] md:max-w-[120px]">
                      <span className="text-gray-200 text-xs md:text-sm font-medium truncate">
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
                        initial={{ y: -10, scale: 0.95 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-56 sm:w-60 bg-[#272932]/95 backdrop-blur-md border border-[#3E4154] rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="p-3 sm:p-4 border-b border-[#3E4049] bg-gradient-to-r from-purple-900/20 to-purple-800/10">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg">
                              {getInitials(user.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-200 truncate">
                                {user?.name || "User"}
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {user?.email || "user@example.com"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-2">
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: { staggerChildren: 0.05 },
                              },
                            }}
                          >
                            {/* Profile Link */}
                            <motion.div
                              variants={{
                                hidden: { x: -10 },
                                visible: { x: 0 },
                              }}
                            >
                              <Link
                                href="/profile"
                                className="group flex items-center px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-300 hover:bg-[#2E313C]/70 hover:text-white transition-all duration-200"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="mr-3 text-blue-400 group-hover:scale-110 transition-transform"
                                >
                                  <User size={16} />
                                </motion.div>
                                <span className="font-medium">Profile</span>
                                <motion.div
                                  initial={{ x: -10 }}
                                  whileHover={{ x: 0 }}
                                  className="ml-auto text-gray-500"
                                >
                                  →
                                </motion.div>
                              </Link>
                            </motion.div>

                            {/* Settings Link */}
                            <motion.div
                              variants={{
                                hidden: { x: -10 },
                                visible: { x: 0 },
                              }}
                            >
                              <Link
                                href="/settings"
                                className="group flex items-center px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-300 hover:bg-[#2E313C]/70 hover:text-white transition-all duration-200"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="mr-3 text-purple-400 group-hover:scale-110 transition-transform"
                                >
                                  <Settings size={16} />
                                </motion.div>
                                <span className="font-medium">Settings</span>
                                <motion.div
                                  initial={{ x: -10 }}
                                  whileHover={{ x: 0 }}
                                  className="ml-auto text-gray-500"
                                >
                                  →
                                </motion.div>
                              </Link>
                            </motion.div>

                            {/* Separator */}
                            <div className="border-t border-[#3E4049] my-2"></div>

                            {/* Sign out button */}
                            <motion.div
                              variants={{
                                hidden: { x: -10 },
                                visible: { x: 0 },
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
                                className="group flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  className="mr-3 group-hover:scale-110 transition-transform"
                                >
                                  <LogOut size={16} />
                                </motion.div>
                                <span className="font-medium">Sign Out</span>
                                <motion.div
                                  initial={{ x: -10 }}
                                  whileHover={{ x: 0 }}
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
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signin"
                    className="text-purple-400 hover:text-purple-300 transition-colors px-3 py-2 text-sm"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Toggle - Always visible on small screens */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg bg-[#2E313C]/50 hover:bg-[#2E313C]/70 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed z-30 top-[64px] sm:top-[72px] left-0 w-full bg-gradient-to-b from-[#272932] to-[#1a1b24] shadow-lg backdrop-blur-md border-b border-[#3E4154]/50"
            data-mobile-menu
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col space-y-2 py-4 px-3 sm:px-4 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              {/* Navigation links for mobile/tablet */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      visible: { x: 0, opacity: 1 },
                    }}
                  >
                    <Link
                      href={link.path}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 group ${
                        pathname === link.path
                          ? "bg-gradient-to-r from-purple-600/20 to-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-transparent hover:border-purple-500/20"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
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
                      </div>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-gray-500 group-hover:text-purple-400"
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* Home link for mobile */}
                <motion.div
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                >
                  <Link
                    href="/"
                    className="flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 bg-[#2E313C]/50 text-gray-300 hover:bg-[#2E313C]/80 hover:text-white border border-transparent hover:border-purple-500/20 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mr-3 group-hover:text-purple-400"
                      >
                        <Home size={18} />
                      </motion.div>
                      <span className="font-medium">Home</span>
                    </div>
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-gray-500 group-hover:text-purple-400"
                    >
                      →
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* User section for mobile */}
              <motion.div
                className="pt-4 mt-2 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    {/* User info card for mobile */}
                    <div className="flex items-center p-3 bg-[#2E313C]/50 rounded-xl border border-purple-500/20">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg mr-3"
                      >
                        {getInitials(user.name)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-400 text-xs">Welcome back</p>
                        <p className="text-purple-400 font-medium text-sm truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>

                    {/* Profile and Settings links for mobile */}
                    <div className="space-y-1">
                      {menuLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          className="flex items-center justify-between py-2.5 px-4 rounded-lg transition-all duration-300 bg-[#2E313C]/30 text-gray-300 hover:bg-[#2E313C]/60 hover:text-white group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`mr-3 ${link.color} group-hover:scale-110 transition-transform`}
                            >
                              <link.icon size={16} />
                            </motion.div>
                            <span className="font-medium text-sm">
                              {link.name}
                            </span>
                          </div>
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="text-gray-500 group-hover:text-purple-400"
                          >
                            →
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {/* Sign out button for mobile */}
                    <motion.button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 rounded-xl border border-red-500/20 hover:border-red-500/30 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mr-3 group-hover:scale-110 transition-transform"
                      >
                        <LogOut size={18} />
                      </motion.div>
                      <span className="font-medium">Sign Out</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/signin"
                      className="block text-center text-purple-400 hover:text-purple-300 transition-colors py-3 px-4 bg-[#2E313C]/50 hover:bg-[#2E313C]/70 rounded-xl border border-purple-500/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block text-center text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition-all py-3 px-4 rounded-xl font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
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
