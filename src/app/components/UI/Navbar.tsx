"use client";
import React, { useState } from "react";
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
  UserCircle,
  LayoutDashboard,
  FileCode,
  Palette,
  Home,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Use auth store for authentication status
  const { user, signOut } = useAuthStore();


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
      path: "/dashboard/templates",
      icon: Palette,
    },
    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: FileCode,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-20 px-4 sm:px-6 py-3 transition-all duration-300 bg-[#1a1b24]/90 backdrop-blur-md shadow-lg`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <button className="bg-gradient-to-r from-[#711381] to-purple-600 p-2 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all shadow-lg">
                <Link
                  href="/dashboard/templates"
                  className="text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                >
                  <Plus size={20} className="text-white" />
                </Link>
              </button>
            </motion.div>

            {/* User Profile Dropdown */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 bg-[#2E313C]/50 px-3 py-2 rounded-lg hover:bg-[#2E313C]/80 transition-all"
              >
                <div className="h-7 w-7 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white text-xs font-medium">
                  {user?.name ? (
                    getInitials(user.name)
                  ) : (
                    <UserCircle size={20} />
                  )}
                </div>
                <span className="text-gray-300 max-w-[100px] truncate">
                  {user?.name || "My Account"}
                </span>
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 bg-[#272932] border border-[#2E313C] rounded-lg shadow-xl z-50"
                  >
                    <div className="p-3 border-b border-[#3E4049]">
                      <p className="text-sm font-medium text-gray-200">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 break-all">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <User size={16} className="mr-2" />
                          Profile
                        </div>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <Layout size={16} className="mr-2" />
                          Dashboard
                        </div>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2E313C] hover:text-purple-400"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <Settings size={16} className="mr-2" />
                          Settings
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2E313C]"
                      >
                        <div className="flex items-center">
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </div>
                      </button>
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
            className="md:hidden fixed z-30 top-16 left-0 w-full bg-gradient-to-b from-[#272932] to-[#1a1b24] shadow-lg backdrop-blur-md"
          >
            {/* User Profile - Mobile */}
            <div className="p-4 border-b border-[#3E4049]">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white text-sm font-medium">
                  {user?.name ? getInitials(user.name) : "PX"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-200">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
                </div>
              </div>
            </div>

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
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                      pathname === link.path
                        ? "bg-[#2E313C] text-purple-400"
                        : "bg-[#2E313C]/50 text-gray-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon size={16} className="mr-2" />
                    {link.name}
                  </Link>
                ))}

                {/* Link to home page */}
                <Link
                  href="/"
                  className="flex items-center justify-center py-2 px-4 rounded-md transition-colors bg-[#2E313C]/50 text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home size={16} className="mr-2" />
                  Home
                </Link>
              </div>

              <motion.div
                className="w-full px-6 space-y-3 mt-2 pt-4 border-t border-gray-700/50"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <Link
                  href="/dashboard/template-form"
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
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center text-red-400 transition-colors py-2 px-4 bg-[#2E313C]/50 rounded-md hover:bg-[#2E313C]/70"
                >
                  <div className="flex items-center justify-center">
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close profile dropdown when clicking outside */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
