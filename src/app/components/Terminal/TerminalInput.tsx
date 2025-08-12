"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTerminal } from "./TerminalContext";

// Define commands inline to avoid module issues
const COMMAND_LIST = [
  "help",
  "about",
  "projects",
  "repos",
  "skills",
  "contact",
  "experience",
  "socials",
  "resume",
  "clear",
  "whoami",
];

// Enhanced command processor with GitHub API integration
const processCommand = (command: string, profile: any): React.ReactNode => {
  const cmd = command.toLowerCase().trim();

  switch (cmd) {
    case "help":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-3 font-semibold text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            Available Commands:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span style={{ color: profile.theme.accentColor }}>about</span> –
              View intro & profile
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>projects</span>{" "}
              – List featured projects
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>repos</span> –
              GitHub repositories
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>contact</span>{" "}
              – Send a message
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>skills</span> –
              Technical expertise
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>
                experience
              </span>{" "}
              – Work history
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>socials</span>{" "}
              – Social media links
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>resume</span> –
              Download resume
            </div>
            <div>
              <span style={{ color: profile.theme.accentColor }}>clear</span> –
              Clear terminal
            </div>
          </div>
        </div>
      );
    case "about":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start gap-6"
          style={{ color: profile.theme.textColor }}
        >
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Image
              src={profile.profileImage}
              alt={`${profile.name} - ${profile.title}`}
              width={120}
              height={120}
              className="rounded-lg shadow-lg border-2"
              style={{ borderColor: profile.theme.accentColor + "40" }}
            />
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 sm:mb-3 font-semibold text-base sm:text-lg"
              style={{ color: profile.theme.accentColor }}
            >
              {profile.name}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-sm sm:text-lg font-medium"
            >
              {profile.title}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-2 sm:mb-3 text-xs sm:text-sm opacity-70 flex items-center gap-1"
            >
              📍 {profile.location}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs sm:text-sm leading-relaxed"
            >
              {profile.bio}
            </motion.div>
          </div>
        </motion.div>
      );
    case "repos":
      return <ReposComponent profile={profile} />;
    case "projects":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-2 sm:mb-3 font-semibold text-base sm:text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            All Projects:
          </div>
          {profile.projects.map((project: any, index: number) => (
            <div
              key={project.name}
              className="mb-4 border-l-2 pl-4"
              style={{ borderColor: profile.theme.accentColor + "60" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="font-semibold"
                  style={{ color: profile.theme.accentColor }}
                >
                  {project.name}
                </div>
                {project.featured && (
                  <span
                    className="text-xs px-2 py-0.5 rounded bg-opacity-20 font-medium"
                    style={{
                      backgroundColor: profile.theme.accentColor + "30",
                      color: profile.theme.accentColor,
                    }}
                  >
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm mb-2">
                {project.description}
              </div>
              <div className="text-xs opacity-70 mb-2">
                <span style={{ color: profile.theme.accentColor }}>
                  Tech Stack:
                </span>{" "}
                {project.technologies.join(", ")}
              </div>
              <div className="flex gap-3 text-xs">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <span style={{ color: profile.theme.accentColor }}>
                    📂 GitHub: {project.githubUrl}
                  </span>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <span style={{ color: profile.theme.accentColor }}>
                    🌐 Live: {project.liveUrl}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-3 font-semibold text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            Technical Skills:
          </div>
          {Object.entries(profile.skills).map(
            ([category, items]: [string, any]) => (
              <div key={category} className="mb-3">
                <div
                  className="font-semibold capitalize mb-1"
                  style={{ color: profile.theme.accentColor }}
                >
                  {category}:
                </div>
                <div className="text-sm">{items.join(", ")}</div>
              </div>
            )
          )}
        </div>
      );
    case "contact":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-3 font-semibold text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            Get In Touch:
          </div>
          <div>📧 {profile.email}</div>
          {profile.phone && <div>📞 {profile.phone}</div>}
        </div>
      );
    case "experience":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-3 font-semibold text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            Work Experience:
          </div>
          {profile.experience.map((exp: any, index: number) => (
            <div
              key={index}
              className="mb-4 border-l-2 pl-4"
              style={{ borderColor: profile.theme.accentColor + "60" }}
            >
              <div
                className="font-semibold"
                style={{ color: profile.theme.accentColor }}
              >
                {exp.position}
              </div>
              <div className="text-sm">
                {exp.company} • {exp.location}
              </div>
              <div className="text-xs opacity-70">{exp.duration}</div>
              <div className="text-sm mt-1">{exp.description}</div>
            </div>
          ))}
        </div>
      );
    case "socials":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div
            className="mb-3 font-semibold text-lg"
            style={{ color: profile.theme.accentColor }}
          >
            Social Links:
          </div>
          {Object.entries(profile.social).map(
            ([platform, url]: [string, any]) => (
              <div key={platform}>
                <span className="capitalize">{platform}:</span>{" "}
                <a
                  href={url}
                  className="underline"
                  style={{ color: profile.theme.accentColor }}
                >
                  {url}
                </a>
              </div>
            )
          )}
        </div>
      );
    case "resume":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div className="mb-2">Resume download:</div>
          <a
            href={profile.resume.downloadUrl}
            download={profile.resume.filename}
            className="underline"
            style={{ color: profile.theme.accentColor }}
          >
            📄 Download {profile.resume.filename}
          </a>
        </div>
      );
    case "whoami":
      return (
        <div style={{ color: profile.theme.textColor }}>
          <div>
            {profile.username}@{profile.terminal.hostname}
          </div>
          <div className="text-sm opacity-70">
            {profile.name} - {profile.title}
          </div>
        </div>
      );
    case "clear":
      return null;
    default:
      return (
        <div style={{ color: profile.theme.accentColor }}>
          <div>Command '{cmd}' not found.</div>
          <div className="text-sm mt-1 opacity-70">
            Type 'help' to see available commands.
          </div>
        </div>
      );
  }
};

// GitHub Repos Component
const ReposComponent = ({ profile }: { profile: any }) => {
  const [repos, setRepos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract username from GitHub URL
        const githubUrl = profile.social.github;
        const username =
          githubUrl.split("/").pop() ||
          githubUrl.split("/")[githubUrl.split("/").length - 1];

        if (!username || username === "#") {
          throw new Error("Invalid GitHub username");
        }

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [profile.social.github]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ color: profile.theme.textColor }}
    >
      <div
        className="mb-4 font-semibold text-lg"
        style={{ color: profile.theme.accentColor }}
      >
        GitHub Repositories:
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div
            className="animate-spin rounded-full h-4 w-4 border-b-2"
            style={{ borderColor: profile.theme.accentColor }}
          ></div>
          <span>Fetching repositories...</span>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400"
        >
          <div>❌ {error}</div>
          <div className="text-sm mt-2 opacity-70">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: profile.theme.accentColor }}
            >
              View repositories on GitHub →
            </a>
          </div>
        </motion.div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="space-y-3">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-2 pl-4 py-2"
              style={{ borderColor: profile.theme.accentColor + "60" }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lg hover:underline"
                    style={{ color: profile.theme.accentColor }}
                  >
                    {repo.name}
                  </a>
                  {repo.fork && (
                    <span
                      className="ml-2 text-xs px-1 py-0.5 rounded"
                      style={{
                        backgroundColor: profile.theme.primaryColor + "40",
                      }}
                    >
                      Fork
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      🍴 {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>

              {repo.description && (
                <div className="text-sm mb-2 opacity-90">
                  {repo.description}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs">
                {repo.language && (
                  <span
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor: profile.theme.accentColor + "20",
                      color: profile.theme.accentColor,
                    }}
                  >
                    {repo.language}
                  </span>
                )}

                <span className="opacity-70">
                  Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </span>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline opacity-80 hover:opacity-100"
                    style={{ color: profile.theme.accentColor }}
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: repos.length * 0.1 + 0.2 }}
            className="mt-4 text-sm opacity-70"
          >
            <div className="mb-2">
              Showing {repos.length} most recently updated repositories.
            </div>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: profile.theme.accentColor }}
            >
              View all repositories on GitHub →
            </a>
          </motion.div>
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="mb-2">No public repositories found.</div>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: profile.theme.accentColor }}
          >
            View profile on GitHub →
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

const TerminalInput: React.FC = () => {
  const {
    addToHistory,
    commandHistory,
    clearHistory,
    addToCommandHistory,
    profile,
  } = useTerminal();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Focus input on mount and keep focused
  useEffect(() => {
    inputRef.current?.focus();

    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);

    // Listen for custom command execution events
    const handleExecuteCommand = (event: CustomEvent) => {
      const command = event.detail;
      if (command && typeof command === "string") {
        // Execute the command directly
        const output = processCommand(command, profile);
        addToHistory(command, output);
        addToCommandHistory(command);
      }
    };

    document.addEventListener(
      "executeCommand",
      handleExecuteCommand as EventListener
    );

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener(
        "executeCommand",
        handleExecuteCommand as EventListener
      );
    };
  }, [profile, addToHistory, addToCommandHistory]);

  // Get autocomplete suggestions
  const getSuggestions = (value: string): string[] => {
    if (!value.trim()) return [];

    return COMMAND_LIST.filter((cmd) =>
      cmd.toLowerCase().startsWith(value.toLowerCase())
    ).slice(0, 5);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1);

    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0 && value.trim() !== "");
    setSelectedSuggestion(0);
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const command = input.trim();
    setInput("");
    setShowSuggestions(false);
    setHistoryIndex(-1);

    // Handle clear command specially
    if (command.toLowerCase() === "clear") {
      clearHistory();
      return;
    }

    // Process command and add to history
    const output = processCommand(command, profile);
    addToHistory(command, output);
    addToCommandHistory(command);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestion((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        } else if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestion((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        } else if (historyIndex > -1) {
          const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
          setHistoryIndex(newIndex);
          setInput(
            newIndex === -1
              ? ""
              : commandHistory[commandHistory.length - 1 - newIndex] || ""
          );
        }
        break;

      case "Tab":
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setInput(suggestions[selectedSuggestion]);
          setShowSuggestions(false);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setInput("");
        setHistoryIndex(-1);
        break;

      case "Enter":
        if (showSuggestions && suggestions.length > 0) {
          e.preventDefault();
          setInput(suggestions[selectedSuggestion]);
          setShowSuggestions(false);
          // Don't submit the form, just fill the input
          return;
        }
        // Let the form submission handle the Enter key when no suggestions
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestion(0);
    // Focus back to input after a short delay to ensure the click is processed
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="relative">
      {/* Autocomplete suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 w-full mb-2 rounded-lg shadow-xl overflow-hidden z-50 border backdrop-blur-md"
            style={{
              backgroundColor: profile.theme.terminalBackground + "f0",
              borderColor: profile.theme.primaryColor + "40",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                ref={(el) => {
                  suggestionRefs.current[index] = el;
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-200 text-xs sm:text-sm hover:scale-[1.02]"
                style={{
                  backgroundColor:
                    index === selectedSuggestion
                      ? profile.theme.accentColor + "30"
                      : "transparent",
                  color:
                    index === selectedSuggestion
                      ? profile.theme.accentColor
                      : profile.theme.textColor,
                }}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedSuggestion(index)}
              >
                <span className="font-mono font-semibold">{suggestion}</span>
                <span className="ml-1 sm:ml-2 text-xs opacity-70">
                  {suggestion === "help" && "Show available commands"}
                  {suggestion === "about" && "View profile info"}
                  {suggestion === "projects" && "List featured projects"}
                  {suggestion === "repos" && "GitHub repositories"}
                  {suggestion === "skills" && "Show technical skills"}
                  {suggestion === "contact" && "Get in touch"}
                  {suggestion === "experience" && "Work history"}
                  {suggestion === "socials" && "Social media links"}
                  {suggestion === "resume" && "Download resume"}
                  {suggestion === "clear" && "Clear terminal"}
                  {suggestion === "whoami" && "User information"}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command input */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span
          className="font-mono text-xs sm:text-sm mr-1 sm:mr-2 select-none font-medium"
          style={{ color: profile.theme.accentColor }}
        >
          {profile.terminal.prompt}:~$
        </span>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none font-mono text-xs sm:text-sm"
            style={{
              color: profile.theme.textColor,
              caretColor: profile.theme.accentColor,
            }}
            placeholder="Type 'help' to get started..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Input hints */}
        <div
          className="text-xs ml-2 sm:ml-4 hidden md:block opacity-60"
          style={{ color: profile.theme.textColor }}
        >
          {showSuggestions ? (
            <span>↑↓ navigate • Tab/Enter to select • Esc to cancel</span>
          ) : (
            <span>↑↓ history • Tab to autocomplete</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default TerminalInput;
