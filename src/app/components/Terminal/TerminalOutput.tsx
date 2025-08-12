"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTerminal } from "./TerminalContext";

const TerminalOutput: React.FC = () => {
  const { history, profile } = useTerminal();

  return (
    <div className="space-y-3">
      {history.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
          }}
          className="terminal-entry"
        >
          {/* Command display */}
          <div className="flex items-center mb-2">
            <span
              className="font-mono text-sm mr-2 select-none font-medium"
              style={{ color: profile.theme.accentColor }}
            >
              {profile.terminal.prompt}:~$
            </span>
            <span
              className="font-mono text-sm select-all"
              style={{ color: profile.theme.textColor }}
            >
              {entry.command}
            </span>
            <span
              className="text-xs ml-auto hidden md:block opacity-50"
              style={{ color: profile.theme.textColor }}
            >
              {entry.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>

          {/* Command output */}
          {entry.output && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ml-6 mb-3 text-sm leading-relaxed"
            >
              {entry.output}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TerminalOutput;
