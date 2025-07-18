"use client";

import React from "react";
import { motion } from "framer-motion";

interface ToggleProps {
  activePersona: "designer" | "developer";
  setActivePersona: (persona: "designer" | "developer") => void;
}

const Toggle: React.FC<ToggleProps> = ({ activePersona, setActivePersona }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-[#1A1D29]/80 backdrop-blur-md border border-[#B1B2B5]/20 rounded-full p-2">
        <div className="flex items-center relative">
          <motion.div
            className="absolute bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] rounded-full h-12"
            animate={{
              x: activePersona === "designer" ? 0 : 128,
              width: 128,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          />
          
          <button
            onClick={() => setActivePersona("designer")}
            className={`relative z-10 px-6 py-3 rounded-full transition-all duration-300 font-medium text-sm w-32 ${
              activePersona === "designer"
                ? "text-[#1A1D29]"
                : "text-[#B1B2B5] hover:text-[#D1D1D3]"
            }`}
          >
            Designer
          </button>
          
          <button
            onClick={() => setActivePersona("developer")}
            className={`relative z-10 px-6 py-3 rounded-full transition-all duration-300 font-medium text-sm w-32 ${
              activePersona === "developer"
                ? "text-[#1A1D29]"
                : "text-[#B1B2B5] hover:text-[#D1D1D3]"
            }`}
          >
            Developer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Toggle;
