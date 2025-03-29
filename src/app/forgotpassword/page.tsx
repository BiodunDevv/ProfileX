"use client";
import React, { useState } from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import {
  Mail,
  Shield,
  RefreshCcw,
  ChevronRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BlackSphere from "../../../public/BlackSphere.svg";
import pinkSphere from "../../../public/pinkSphere.svg";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startVerificationCodeTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to send verification code
    console.log("Sending verification code to:", formData.email);
    startVerificationCodeTimer();
    setCurrentStep(2);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying code:", formData.verificationCode);
    setCurrentStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password for:", formData.email);
  };

  // Page entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">
                Forgot Password
              </h2>
              <p className="text-gray-400 text-sm">
                Enter the email associated with your account
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-500" size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-3 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              onClick={handleSendVerificationCode}
              className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 px-4 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
            >
              Send Verification Code
              <ChevronRight
                className="ml-2 transform transition-transform group-hover:translate-x-1"
                size={20}
              />
            </motion.button>

            <motion.div variants={itemVariants} className="text-center">
              <Link
                href="/signin"
                className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
              >
                Back to Login
              </Link>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">
                Verification Code
              </h2>
              <p className="text-gray-400 text-sm">
                Enter the 6-digit code sent to {formData.email}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="text-gray-500" size={20} />
                </div>
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 text-center tracking-[0.5em]"
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center"
            >
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-gray-400 hover:text-pink-500 transition-colors flex items-center"
              >
                Change Email
              </button>

              {timer > 0 ? (
                <p className="text-gray-400 text-sm">
                  Resend Code in {timer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  className="text-pink-500 hover:text-pink-400 transition-colors flex items-center"
                >
                  <RefreshCcw className="mr-2" size={16} />
                  Resend Code
                </button>
              )}
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              onClick={handleVerifyCode}
              className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 px-4 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
            >
              Verify Code
              <ChevronRight
                className="ml-2 transform transition-transform group-hover:translate-x-1"
                size={20}
              />
            </motion.button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-400 text-sm">
                Create a new password for your account
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="text-gray-500" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Create new password"
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

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="text-gray-500" size={20} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-[#2E313C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
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

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              onClick={handleResetPassword}
              className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 px-4 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
            >
              Reset Password
              <CheckCircle2
                className="ml-2 transform transition-transform group-hover:scale-110"
                size={20}
              />
            </motion.button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A] overflow-hidden"
      >
        {/* Floating Spheres with Motion */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
          className="absolute top-0 left-60 animate-float"
        >
          <Image
            src={pinkSphere}
            alt="Pink Decorative Sphere"
            width={170}
            height={170}
            priority
            className="opacity-70"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
          className="absolute top-6 right-40 animate-float-delayed"
        >
          <Image
            src={BlackSphere}
            alt="Black Decorative Sphere"
            width={150}
            height={150}
            priority
            className="opacity-50"
          />
        </motion.div>

        {/* Forgot Password Container */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 w-full max-w-md px-6"
        >
          {/* Logo and Title */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              ProfileX
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Forgot your password? No worries, we got you!
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-10 h-1.5 mx-1 rounded-full transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-pink-500 to-purple-600"
                    : "bg-gray-700"
                }`}
              />
            ))}
          </motion.div>

          {/* Forgot Password Form */}
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-8 space-y-6"
          >
            {renderStep()}
          </motion.form>
        </motion.div>

        {/* Additional Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-30 blur-3xl"></div>
        </div>
      </motion.div>
    </LazyMotion>
  );
};

export default Page;
