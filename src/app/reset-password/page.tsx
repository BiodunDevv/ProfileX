"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronRight, AlertCircle, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { useAuthStore } from "../../../store/useAuthStore";

// Validation schema with password matching
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// This component uses the search params
function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPassword } = useAuthStore();

  // Get token from URL parameters
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    
    if (!tokenParam) {
      setErrorMessage("Invalid or missing reset token. Please request a new password reset link.");
    } else {
      console.log("Token from URL:", tokenParam);
      setToken(tokenParam);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      setErrorMessage("Missing reset token. Please request a new password reset link.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await resetPassword({
        password: data.password,
        token: token,
      });

      if (!response) {
        setErrorMessage("Network error. Please try again.");
        return;
      }
      
      if (!response.ok) {
        const result = await response.json();
        setErrorMessage(result.message || "An error occurred. Please try again.");
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Create a new password" />

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
            <h2 className="text-xl font-semibold text-white">Password Reset Successful</h2>
            <p className="text-gray-300">
              Your password has been successfully reset. You will be redirected to the login page shortly.
            </p>
            <div className="mt-6">
              <Link
                href="/signin"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Go to login page
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
                Enter your new password below. Make sure it&apos;s strong and secure.
              </p>
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none pr-10"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none pr-10"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              type="submit"
              disabled={isLoading || !token}
              className={`w-full bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center group
                ${(isLoading || !token) ? "opacity-80 cursor-not-allowed" : "hover:from-[#5C0F6B] hover:to-purple-700"}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
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
}

// Loading fallback component
function LoadingComponent() {
  return (
    <AuthLayout>
      <LogoHeader title="Loading..." />
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    </AuthLayout>
  );
}

// Main component that wraps the form in a Suspense boundary
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;