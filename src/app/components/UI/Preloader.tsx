import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

interface PreloaderProps {
  loadingText?: string;
  loadingSubtitle?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ loadingText, loadingSubtitle }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A]">
      <div className="relative flex flex-col items-center gap-16">
        {/* Spinner */}
        <div className="flex justify-center items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
            <LayoutGrid
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500"
              size={24}
            />
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-gray-300 whitespace-nowrap">
            {loadingText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ...
            </motion.span>
          </p>
          <p className="text-xs text-purple-400/80 mt-1">
            {
              loadingSubtitle
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Preloader;
