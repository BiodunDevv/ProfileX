"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronRight, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";

// Verification form component
function VerificationForm() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email from URL query params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Try getting from localStorage as fallback
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [searchParams]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setErrorMessage("Please enter your verification code");
      return;
    }
    
    if (!email) {
      setErrorMessage("Email is required for verification");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      } else {
        setErrorMessage(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "An error occurred during verification"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setErrorMessage("Email is required to resend the code");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        // Show a success message for resending code
        alert("Verification code has been resent to your email");
      } else {
        setErrorMessage(data.message || "Failed to resend verification code");
      }
    } catch (error) {
      console.error("Resend code error:", error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "An error occurred while resending the code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Verify your account" />

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
            <h2 className="text-xl font-semibold text-white">Verification Successful</h2>
            <p className="text-gray-300">
              Your account has been verified successfully. You will be redirected to the login page shortly.
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
          <motion.form onSubmit={handleVerification} className="space-y-6">
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
                We&apos;ve sent a verification code to your email address 
                {email && <strong className="text-white"> ({email})</strong>}. 
                Please enter the code below to verify your account.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 bg-[#2E313C] text-white rounded-lg border border-[#3E4049] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                placeholder="Enter verification code"
              />
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
                  Verifying...
                </>
              ) : (
                <>
                  Verify Account
                  <ChevronRight
                    className="ml-2 transform transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </>
              )}
            </motion.button>

            <div className="text-center mt-4 space-y-3">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-purple-500 hover:text-purple-400 transition-colors text-sm focus:outline-none"
              >
                Didn&apos;t receive a code? Resend
              </button>
              
              <div>
                <Link
                  href="/signin"
                  className="text-gray-400 hover:text-gray-300 transition-colors text-sm block mt-2"
                >
                  Back to Sign In
                </Link>
              </div>
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

// Main component with Suspense boundary
const VerificationPage = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <VerificationForm />
    </Suspense>
  );
};

export default VerificationPage;
