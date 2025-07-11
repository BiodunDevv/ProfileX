"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { useAuthStore } from "../../../store/useAuthStore";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { forgotPassword } = useAuthStore();

  // Use react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await forgotPassword(data.email);

      if (!response) {
        setErrorMessage("Network error. Please try again.");
        return;
      }
      
      if (!response.ok) {
        const result = await response.json();
        setErrorMessage(result.message || "An error occurred. Please try again.");
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to process your request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Reset your password" />

      <motion.div
        variants={itemVariants}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6 w-full max-w-md"
      >
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Check your email</h2>
            <p className="text-gray-300">
              We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <div className="mt-6">
              <Link
                href="/signin"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Return to sign in
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
              >
                <AlertCircle size={16} />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}

            <div>
              <p className="text-gray-300 mb-4">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                placeholder="Your email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center group
                ${isLoading ? "opacity-80 cursor-not-allowed" : "hover:from-[#5C0F6B] hover:to-purple-700"}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ChevronRight
                    className="ml-2 transform transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </>
              )}
            </motion.button>

            <div className="text-center mt-4">
              <Link
                href="/signin"
                className="text-purple-500 hover:text-purple-400 transition-colors text-sm"
              >
                Back to Sign In
              </Link>
            </div>
          </motion.form>
        )}
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
