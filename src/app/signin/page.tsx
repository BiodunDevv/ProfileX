"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { EmailField, PasswordField } from "../components/UI/Form";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <AuthLayout>
      <LogoHeader title="Welcome back to your portfolio journey" />

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={itemVariants}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6"
      >
        {/* Email Input */}
        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* Password Input */}
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me & Forgot Password */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded bg-[#2E313C]"
            />
            <label className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <Link
            href="/forgotpassword"
            className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
          >
            Forgot Password?
          </Link>
        </motion.div>

        {/* Login Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
          >
            Login
            <ChevronRight
              className="ml-2 transform transition-transform group-hover:translate-x-1"
              size={20}
            />
          </motion.button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={itemVariants} className="text-center mt-4">
          <span className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              Sign Up
            </Link>
          </span>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default Page;
