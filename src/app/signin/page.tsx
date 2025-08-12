"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { useAuthStore } from "../../../store/useAuthStore";

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
  const [showPassword, setShowPassword] = useState(false);
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
    const subscription = watch((value: Partial<LoginFormData>) => {
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
      console.log("🔐 Attempting to sign in with:", data.email);

      const response = await signIn({
        email: data.email,
        password: data.password,
      });

      if (!response) {
        setErrorMessage("Network error. Please try again.");
        return;
      }

      // Parse response data
      const responseData = await response.json();
      console.log("🔐 Response data:", responseData);

      if (!response.ok) {
        console.log("🔐 Response not ok, status:", response.status);

        // Handle verification error specifically
        if (
          responseData.needsVerification ||
          responseData.message?.toLowerCase().includes("verify")
        ) {
          console.log(
            "� User needs email verification, redirecting to verification page"
          );

          // Store email in localStorage for verification process
          const emailToStore = responseData.email || data.email;
          if (emailToStore) {
            localStorage.setItem("userEmail", emailToStore);
          }

          // Redirect to verification page with email parameter
          router.push(
            `/verification?email=${encodeURIComponent(emailToStore)}`
          );
          return;
        }

        // Handle other authentication errors
        if (response.status === 403 && responseData.verified === false) {
          console.log("🔐 User not verified, redirecting to verification");
          localStorage.setItem("userEmail", data.email);
          router.push(`/verification?email=${encodeURIComponent(data.email)}`);
          return;
        }

        setErrorMessage(responseData.message || "Invalid credentials");
        return;
      }

      // Check if signin was successful by checking auth store state
      const authState = useAuthStore.getState();
      console.log("🔐 Auth state after signin:", {
        isAuthenticated: authState.isAuthenticated,
        hasToken: !!authState.token,
        hasUser: !!authState.user,
        userName: authState.user?.name,
      });

      if (authState.isAuthenticated && authState.token && authState.user) {
        console.log("✅ Sign-in successful!");
        console.log("👤 User authenticated:", authState.user.name);
        console.log("🔑 Token available:", "Yes");

        // Navigate to dashboard
        router.push("/dashboard");
      } else {
        console.error("❌ Auth state not updated properly after signin");
        setErrorMessage("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Interactive Password Requirements */}
          <AnimatePresence>
            {shouldShowRequirements && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-[#1E2132] border border-[#3E4049] rounded-lg p-3 space-y-1 text-xs"
              >
                <p className="text-gray-400 font-medium mb-2 flex items-center">
                  <Shield size={12} className="mr-1" />
                  Password Requirements:
                </p>
                {[
                  { key: "hasLength", text: "At least 8 characters" },
                  { key: "hasCapital", text: "One uppercase letter" },
                  { key: "hasNumber", text: "One number" },
                  { key: "hasSpecial", text: "One special character" },
                ].map((req) => (
                  <div key={req.key} className="flex items-center">
                    <CheckCircle
                      size={12}
                      className={`mr-2 ${
                        passwordChecks[req.key as keyof typeof passwordChecks]
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={
                        passwordChecks[req.key as keyof typeof passwordChecks]
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

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
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-300">Remember me</span>
          </label>
          <Link
            href="/forgotpassword"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:from-[#5C0F6B] hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
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
