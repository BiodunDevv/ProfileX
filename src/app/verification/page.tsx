"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../store/useAuthStore";

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyCode, resendVerificationCode } = useAuthStore();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Check localStorage for email
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        router.push("/signup");
      }
    }
  }, [searchParams, router]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      setIsLoading(false);
      return;
    }

    if (!email) {
      setError("Email address is missing");
      setIsLoading(false);
      return;
    }

    try {
      const response = await verifyCode({
        email,
        verificationCode,
      });

      if (response && response.ok) {
        setSuccess("Email verified successfully! Redirecting to sign in...");
        localStorage.removeItem("userEmail");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        const data = await response?.json();
        setError(data?.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await resendVerificationCode(email);

      if (response && response.ok) {
        setSuccess("Verification code resent successfully!");
      } else {
        const data = await response?.json();
        setError(data?.message || "Failed to resend verification code.");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setError("An error occurred while resending the code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-300">
              We sent a verification code to{" "}
              <span className="text-purple-400 font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setVerificationCode(value);
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg"
              >
                {success}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !verificationCode}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-purple-400 hover:text-purple-300 font-semibold disabled:opacity-50"
              >
                Resend Code
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/signup")}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;
