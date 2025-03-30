"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const { resendVerificationCode } = useAuthStore();

  // Create refs for the verification inputs properly
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);
  const ref6 = useRef<HTMLInputElement>(null);

  const verificationInputRefs = [ref1, ref2, ref3, ref4, ref5, ref6];

  useEffect(() => {
    // Get email from URL parameters
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      // Store email in localStorage as fallback for verification
      localStorage.setItem("userEmail", emailParam);
    }

    // Focus the first input field when component mounts
    verificationInputRefs[0].current?.focus();
  }, [searchParams]);

  const handleVerificationChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Update the code at the current index
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Auto-advance to next input if a digit was entered
    if (value !== "" && index < 5) {
      verificationInputRefs[index + 1].current?.focus();
    }
  };

  const handleVerificationKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // If backspace and empty, move to previous input
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      verificationInputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // If we have a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newVerificationCode = pastedData.split("");
      setVerificationCode(newVerificationCode);

      // Focus the last input
      verificationInputRefs[5].current?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      setIsVerifying(true);
      setError("");
      const code = verificationCode.join("");

      // If email is not in state, try to get it from localStorage
      const emailToUse = email || localStorage.getItem("userEmail");

      if (!emailToUse) {
        throw new Error("Email address is missing. Please try again.");
      }

      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email: emailToUse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed. Please try again.");
      }

      // If verification is successful, proceed to the next step
      setVerificationComplete(true);
    } catch (error) {
      console.error("Verification error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsVerifying(true);
    setError("");
    try {
      const emailToUse = email;

      if (!emailToUse) {
        throw new Error("Email address is missing. Please try again.");
      }

      await resendVerificationCode();
      // Reset verification code inputs
      setVerificationCode(["", "", "", "", "", ""]);
      // Focus the first input again
      verificationInputRefs[0].current?.focus();
    } catch (error) {
      console.error("Failed to resend code:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  if (verificationComplete) {
    return (
      <AuthLayout>
        <LogoHeader title="Account Verified" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
          className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-8 space-y-8 text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="flex justify-center"
          >
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#711381] to-purple-600 flex items-center justify-center">
              <CheckCircle2 className="text-white" size={50} />
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Welcome to ProfileX!
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-md mx-auto"
          >
            Your portfolio journey begins now. We&apos;re excited to help you
            showcase your talents to the world.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 px-8 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 w-full"
            >
              <span>Go to Dashboard</span>
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <LogoHeader title="Verify Your Account" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1,
            },
          },
        }}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Enter Verification Code
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            We&apos;ve sent a 6-digit code to{" "}
            <span className="text-purple-400">{email || "your email"}</span>.
            Please enter it below.
          </p>

          {error && (
            <div className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {error}
            </div>
          )}

          {isVerifying ? (
            <div className="flex justify-center my-8">
              <div className="w-8 h-8 border-t-2 border-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-center space-x-2 my-8">
                {verificationCode.map((digit, index) => (
                  <div key={index} className="w-12 h-14 relative">
                    <input
                      ref={verificationInputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleVerificationChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-full h-full text-center text-xl font-bold bg-[#2E313C] text-white rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 text-sm text-gray-400">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  className="text-purple-500 hover:text-purple-400 transition-colors ml-1"
                  onClick={handleResendCode}
                >
                  Resend Code
                </button>
              </div>
            </>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleVerify}
            disabled={
              isVerifying || verificationCode.some((code) => code === "")
            }
            className={`bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full
              ${
                isVerifying || verificationCode.some((code) => code === "")
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-[#5C0F6B] hover:to-purple-700"
              }`}
          >
            <span>Verify Account</span>
            <CheckCircle2 size={20} />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          Back to{" "}
          <Link
            href="/signup"
            className="text-purple-500 hover:text-purple-400 transition-colors"
          >
            Sign Up
          </Link>
        </span>
      </motion.div>
    </AuthLayout>
  );
};

export default VerificationPage;
