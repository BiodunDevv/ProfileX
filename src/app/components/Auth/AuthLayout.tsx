"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  motion,
  LazyMotion,
  domAnimation,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlackSphere from "../../../../public/BlackSphere.svg";
import pinkSphere from "../../../../public/pinkSphere.svg";

type AuthLayoutProps = {
  children: ReactNode;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
} as const;

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after the component mounts
    // This ensures the background is present before animations begin
    setIsLoaded(true);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen bg-[#17181E] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"></div>

        <AnimatePresence>
          {isLoaded && (
            <motion.div
              key="auth-container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="flex items-center justify-center min-h-screen w-full"
            >
              {/* Back to Home Button */}
              <motion.div
                className="absolute top-6 left-6 z-20 sm:top-8 sm:left-8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base text-white bg-[#24252D] rounded-lg hover:bg-[#2C2D37] border-l-2 border-purple-600 transition-all duration-300 shadow-lg group"
                  >
                    <ArrowLeft
                      size={18}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    <span className="hidden sm:block">Back to Home</span>
                    <span className="sm:hidden">Back</span>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Floating Spheres with Motion */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: 0.2,
                }}
                className="absolute top-0 left-10 md:left-46 animate-float"
              >
                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={pinkSphere}
                    alt="Pink Decorative Sphere"
                    width={170}
                    height={170}
                    priority
                    className="opacity-80"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: 0.3,
                }}
                className="absolute top-20 md:top-40 right-0 md:right-20 animate-float-delayed"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Image
                    src={BlackSphere}
                    alt="Black Decorative Sphere"
                    width={150}
                    height={150}
                    priority
                    className="opacity-100"
                  />
                </motion.div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                variants={containerVariants}
                className="relative z-10 w-full max-w-md px-4"
              >
                {children}
              </motion.div>

              {/* Improved background elements */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1a1b21]/80 to-transparent pointer-events-none"></div>

              {/* Subtle accent lighting */}
              <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-900/20 blur-3xl pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#711381]/10 blur-3xl pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default AuthLayout;
