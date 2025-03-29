import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
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
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
    </motion.div>
  );
};
