"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, AlertCircle, Loader2, Check, X } from "lucide-react";
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
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "Password must include at least one capital letter, one number, and one special character"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    hasLength: false,
    hasCapital: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const { signIn } = useAuthStore();
  const router = useRouter();

  // Check password requirements in real-time
  useEffect(() => {
    setPasswordChecks({
      hasLength: passwordValue.length >= 8,
      hasCapital: /[A-Z]/.test(passwordValue),
      hasNumber: /[0-9]/.test(passwordValue),
      hasSpecial: /[^A-Za-z0-9]/.test(passwordValue),
    });
  }, [passwordValue]);

  // Check if all requirements are met
  const allRequirementsMet =
    passwordChecks.hasLength &&
    passwordChecks.hasCapital &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSpecial;

  // Use react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Watch password field
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.password) {
        setPasswordValue(value.password);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Determine if we should show requirements
  const shouldShowRequirements =
    isPasswordFocused && passwordValue.length > 0 && !allRequirementsMet;

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
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-4"
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

        {/* Password Input with Interactive Requirements */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
            placeholder="Enter your password"
          />

          {/* Interactive Password Requirements */}
          <AnimatePresence>
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

            {/* Success message when all requirements are met while focused */}
            {isPasswordFocused &&
              passwordValue.length > 0 &&
              allRequirementsMet && (
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
          </AnimatePresence>

          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
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
