"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { usePWAInstall } from "../../../hooks/usePWAInstall";

interface PWAInstallNoticeProps {
  className?: string;
}

const PWAInstallNotice: React.FC<PWAInstallNoticeProps> = ({
  className = "",
}) => {
  const { isInstallable, isInstalled, installPWA } = usePWAInstall();
  const [showNotice, setShowNotice] = useState(false);
  const [hasSeenNotice, setHasSeenNotice] = useState(false);

  useEffect(() => {
    // Check if user has seen the notice before
    const hasSeenPWANotice = localStorage.getItem("pwaNoticeShown");

    // Show notice if PWA is installable, not installed, and user hasn't seen it
    if (isInstallable && !isInstalled && !hasSeenPWANotice && !hasSeenNotice) {
      const timer = setTimeout(() => {
        setShowNotice(true);
        setHasSeenNotice(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, hasSeenNotice]);

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      setShowNotice(false);
      localStorage.setItem("pwaNoticeShown", "true");
    }
  };

  const handleDismiss = () => {
    setShowNotice(false);
    localStorage.setItem("pwaNoticeShown", "true");
  };

  // Auto-hide after 15 seconds
  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        setShowNotice(false);
        localStorage.setItem("pwaNoticeShown", "true");
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  if (!showNotice || isInstalled) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
        className={`fixed top-0 left-0 right-0 z-50 mx-2 mt-2 sm:mx-4 sm:mt-4 ${className}`}
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-[#711381] to-purple-600 backdrop-blur-md border border-[#711381]/30 rounded-xl sm:rounded-2xl shadow-2xl shadow-[#711381]/30">
          {/* Subtle animated background */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative p-3 sm:p-4 flex items-start gap-3">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex-shrink-0 p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </motion.div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <motion.h4
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="font-semibold text-white text-xs sm:text-sm leading-tight"
              >
                📱 Install ProfileX App
              </motion.h4>
              <motion.p
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-white/90 text-xs leading-relaxed mt-1"
              >
                Get the full app experience! Install ProfileX on your device for
                offline access and native app features.
              </motion.p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-2 sm:mt-3">
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-md sm:rounded-lg transition-all border border-white/20"
                  onClick={handleInstall}
                >
                  <Download className="w-3 h-3" />
                  <span>Install App</span>
                </motion.button>

                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/80 text-xs px-2 py-1 hover:text-white transition-colors"
                  onClick={handleDismiss}
                >
                  Maybe later
                </motion.button>
              </div>
            </div>

            {/* Dismiss button */}
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              onClick={handleDismiss}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-all group"
              aria-label="Dismiss notice"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 group-hover:text-white" />
            </motion.button>
          </div>

          {/* Progress bar animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 15,
              ease: "linear",
            }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallNotice;
