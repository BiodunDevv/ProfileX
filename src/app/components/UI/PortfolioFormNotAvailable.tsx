"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Sparkles, Clock, Home } from "lucide-react";

interface PortfolioFormNotAvailableProps {
  templateName?: string;
  templateNumber?: string;
}

const PortfolioFormNotAvailable: React.FC<PortfolioFormNotAvailableProps> = ({
  templateName = "Portfolio Template",
  templateNumber = "X",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] flex flex-col items-center justify-center px-4 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated floating elements */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-4 h-4 bg-purple-500/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 left-16 w-3 h-3 bg-blue-500/30 rounded-full blur-sm"
      />

      <motion.div
        className="max-w-2xl text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            type: "spring",
            stiffness: 200,
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-24 h-24 border-2 border-purple-500/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-2 w-20 h-20 border border-purple-400/30 rounded-full"
            />
            <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
              <Wrench className="w-10 h-10 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Template Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">
            Template {templateNumber}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] via-purple-500 to-blue-500"
        >
          Portfolio Form Coming Soon
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            We're crafting an amazing portfolio builder experience for{" "}
            <span className="text-purple-400 font-semibold">
              {templateName}
            </span>
          </p>
          <p className="text-gray-400 leading-relaxed">
            Our team is working hard to bring you a seamless form interface that
            will make creating your professional portfolio effortless and
            enjoyable.
          </p>
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">In Development</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Enhanced Features</span>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/templates"
            className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40 hover:scale-105"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Explore Other Templates
          </Link>

          <Link
            href="/"
            className="group flex items-center justify-center gap-3 px-6 py-3 border border-purple-500/30 hover:border-purple-500/60 text-purple-400 hover:text-purple-300 rounded-lg transition-all duration-300 font-medium hover:bg-purple-500/5"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            Back to Home
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg backdrop-blur-sm"
        >
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-purple-400 font-medium">💡 Pro Tip:</span>{" "}
            While this template form is being perfected, you can explore our
            available templates or check back soon for updates. We're committed
            to delivering the best portfolio building experience!
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
      />
    </div>
  );
};

export default PortfolioFormNotAvailable;
