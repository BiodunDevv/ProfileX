import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, Check, X } from "lucide-react";
import { itemVariants } from "../Auth/AuthLayout";

export const NameField = ({
  value,
  onChange,
  placeholder = "Enter your full name",
  label = "Full Name",
  name = "fullName",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
}) => {
  return (
    <motion.div variants={itemVariants}>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="text-gray-500" size={20} />
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-3 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export const EmailField = ({
  value,
  onChange,
  placeholder = "Enter your email address",
  label = "Email Address",
  name = "email",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
}) => {
  return (
    <motion.div variants={itemVariants}>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="text-gray-500" size={20} />
        </div>
        <input
          type="email"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-3 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export const PasswordField = ({
  value,
  onChange,
  placeholder = "Enter your password",
  label = "Password",
  name = "password",
  showRequirements = true,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  showRequirements?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    hasLength: false,
    hasCapital: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Check password requirements in real-time
  useEffect(() => {
    setPasswordChecks({
      hasLength: value.length >= 8,
      hasCapital: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[^A-Za-z0-9]/.test(value),
    });
  }, [value]);

  // Check if all password requirements are met
  const allRequirementsMet =
    passwordChecks.hasLength &&
    passwordChecks.hasCapital &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSpecial;

  // Show requirements only when password has some input AND not all requirements are met
  const shouldShowRequirements =
    showRequirements && value.length > 0 && !allRequirementsMet;

  return (
    <motion.div variants={itemVariants}>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="text-gray-500" size={20} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-10 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff
              className="text-gray-500 hover:text-gray-300 transition-colors"
              size={20}
            />
          ) : (
            <Eye
              className="text-gray-500 hover:text-gray-300 transition-colors"
              size={20}
            />
          )}
        </button>
      </div>

      {/* Password Requirements Checker - Only shows when not all requirements are met */}
      {shouldShowRequirements && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 overflow-hidden"
        >
          <div className="p-3 bg-[#1F212A] rounded-lg border border-[#3E4049]/50">
            <p className="text-sm text-gray-300 mb-2 font-medium">
              Password requirements:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs">
                {passwordChecks.hasLength ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <X size={14} className="text-red-400" />
                )}
                <span
                  className={
                    passwordChecks.hasLength
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  At least 8 characters
                </span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                {passwordChecks.hasCapital ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <X size={14} className="text-red-400" />
                )}
                <span
                  className={
                    passwordChecks.hasCapital
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  At least one capital letter
                </span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                {passwordChecks.hasNumber ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <X size={14} className="text-red-400" />
                )}
                <span
                  className={
                    passwordChecks.hasNumber
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  At least one number
                </span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                {passwordChecks.hasSpecial ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <X size={14} className="text-red-400" />
                )}
                <span
                  className={
                    passwordChecks.hasSpecial
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  At least one special character (@, #, $, etc.)
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Success message when all requirements are met */}
      {showRequirements && value.length > 0 && allRequirementsMet && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3"
        >
          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2">
            <Check size={16} />
            <span>Password meets all requirements</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
