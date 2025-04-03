"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/navigation";

// Update Zod schema to match our API
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthStore();
  const router = useRouter();

  // Use react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });

      if (!response) {
        setErrorMessage("Network error. Please try again.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();

        // Handle verification error specifically
        if (response.status === 403 && errorData.verified === false) {
          // Store email in localStorage for verification process
          localStorage.setItem("userEmail", data.email);
          // Redirect to verification page
          router.push(`/verification?email=${encodeURIComponent(data.email)}`);
          return;
        }

        setErrorMessage(errorData.message || "Invalid credentials");
        return;
      }
      const { token, user } = useAuthStore.getState();

      // Log token for verification
      console.log("Sign-in successful!");
      console.log("User authenticated:", user?.name);
      console.log("Token available:", token ? "Yes" : "No");
      console.log("Token:", token);

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Welcome back to your portfolio journey" />

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={itemVariants}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6"
      >
        {/* Error Message */}
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

        {/* Email Input */}
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
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded bg-[#2E313C]"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-300"
            >
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
                Signing in...
              </>
            ) : (
              <>
                Login
                <ChevronRight
                  className="ml-2 transform transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </>
            )}
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

export default SignInPage;
