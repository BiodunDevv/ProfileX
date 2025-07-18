"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import { useTerminal } from "./TerminalContext";

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { history, profile } = useTerminal();

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-lg sm:rounded-xl shadow-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: profile.theme.terminalBackground,
          borderColor: profile.theme.primaryColor + "40",
          boxShadow: `0 25px 50px -12px ${profile.theme.primaryColor}30, 0 0 0 1px ${profile.theme.primaryColor}20`,
        }}
      >
        {/* Terminal Header */}
        <div
          className="px-3 sm:px-4 py-2 sm:py-3 border-b flex items-center justify-between backdrop-blur-md"
          style={{
            backgroundColor: profile.theme.primaryColor + "20",
            borderBottomColor: profile.theme.primaryColor + "30",
          }}
        >
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <motion.div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 shadow-sm"
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 8px rgba(239, 68, 68, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-sm"
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 8px rgba(251, 191, 36, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 shadow-sm"
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="flex-1 text-center">
            <span
              className="text-xs sm:text-sm font-mono font-medium tracking-wide"
              style={{ color: profile.theme.textColor }}
            >
              {profile.terminal.prompt}:~
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-xs opacity-70">
            <motion.div
              className="hidden sm:flex items-center space-x-1"
              whileHover={{ opacity: 1, scale: 1.05 }}
              style={{ color: profile.theme.textColor }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Online</span>
            </motion.div>
            <span
              className="hidden md:inline"
              style={{ color: profile.theme.textColor }}
            >
              Terminal
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-3 sm:p-4 lg:p-6 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed scroll-smooth custom-scrollbar"
          style={{
            backgroundColor: profile.theme.terminalBackground,
            color: profile.theme.textColor,
          }}
        >
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <motion.div
              className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-current to-opacity-70 bg-clip-text"
              style={{ color: profile.theme.accentColor }}
            >
              {profile.terminal.welcomeMessage}
            </motion.div>
            <motion.div
              className="mb-1 sm:mb-2 opacity-80 text-xs sm:text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              ╭─ Type{" "}
              <span
                className="font-semibold px-1 py-0.5 rounded text-xs sm:text-sm"
                style={{
                  color: profile.theme.accentColor,
                  backgroundColor: profile.theme.accentColor + "20",
                }}
              >
                'help'
              </span>{" "}
              to see available commands
            </motion.div>
            <motion.div
              className="mb-1 sm:mb-2 opacity-80 text-xs sm:text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              ├─ Use{" "}
              <span style={{ color: profile.theme.accentColor }}>Tab</span> for
              autocomplete,{" "}
              <span style={{ color: profile.theme.accentColor }}>↑↓</span> for
              history
            </motion.div>
            <motion.div
              className="opacity-80 text-xs sm:text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              ╰─ Press{" "}
              <span style={{ color: profile.theme.accentColor }}>Ctrl+C</span>{" "}
              anytime to interrupt
            </motion.div>
          </motion.div>

          {/* Terminal Output */}
          <TerminalOutput />

          {/* Current Input */}
          <TerminalInput />
        </div>
      </motion.div>

      {/* Command Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-center text-sm"
        style={{ color: profile.theme.textColor + "80" }}
      >
        <span className="mr-4">💡 Try:</span>
        {["about", "projects", "repos"].map((cmd, index) => (
          <React.Fragment key={cmd}>
            <motion.span
              className="mx-1 px-2 py-1 rounded cursor-pointer transition-all duration-200 hover:shadow-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: profile.theme.accentColor + "20",
                boxShadow: `0 4px 12px ${profile.theme.accentColor}30`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ color: profile.theme.accentColor }}
              onClick={() => {
                // Trigger command execution via custom event
                const event = new CustomEvent("executeCommand", {
                  detail: cmd,
                });
                document.dispatchEvent(event);
              }}
            >
              {cmd}
            </motion.span>
            {index < 4 && <span className="mx-1 opacity-50">•</span>}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${profile.theme.primaryColor}20;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${profile.theme.accentColor}60;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${profile.theme.accentColor}80;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
