"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { NameField, EmailField, PasswordField } from "../components/UI/Form";
import { useAuthStore } from "../../../store/useAuthStore";

const Page = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { signUp } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
      return;
    }

    // Validate password requirements manually
    const passwordChecks = {
      hasLength: formData.password.length >= 8,
      hasCapital: /[A-Z]/.test(formData.password),
      hasNumber: /[0-9]/.test(formData.password),
      hasSpecial: /[^A-Za-z0-9]/.test(formData.password),
    };

    if (
      !passwordChecks.hasLength ||
      !passwordChecks.hasCapital ||
      !passwordChecks.hasNumber ||
      !passwordChecks.hasSpecial
    ) {
      setErrorMessage(
        "Password must have at least 8 characters, one capital letter, one number, and one special character"
      );
      return;
    }

    try {
      setIsSubmitting(true);

      console.log("📝 Attempting signup with:", formData.email);

      const response = await signUp({
        name: formData.fullName,
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      if (!response) {
        setErrorMessage("Network error. Please try again.");
        return;
      }

      console.log("📝 Signup response status:", response.status);

      if (response.status === 200 || response.status === 201) {
        console.log("✅ Signup successful, redirecting to verification");
        router.push(
          `/verification?email=${encodeURIComponent(formData.email.toLowerCase())}`
        );
      } else {
        // Parse error response
        try {
          const errorData = await response.json();
          console.log("❌ Signup failed:", errorData);

          if (response.status === 409) {
            setErrorMessage(
              "Email already registered. Please use a different email."
            );
          } else if (response.status === 400) {
            setErrorMessage(errorData.message || "All fields are required");
          } else if (response.status === 500) {
            setErrorMessage("Server error. Please try again later.");
          } else {
            setErrorMessage(
              errorData.message || "Something went wrong. Please try again."
            );
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("❌ Signup failed:", error);
      setErrorMessage("Failed to create account. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Create an account to start your portfolio journey" />

      {/* Progress Indicator */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="w-32 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
      </motion.div>

      {/* Signup Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6"
      >
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
            }}
          }
          className="space-y-6"
        >
          {errorMessage && (
            <motion.div
              variants={itemVariants}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
            >
              {errorMessage}
            </motion.div>
          )}

          <NameField
            value={formData.fullName}
            onChange={handleInputChange}
            name="fullName"
          />

          <EmailField
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />

          <PasswordField
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Create a strong password"
          />

          <motion.div variants={itemVariants} className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center w-full group
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-[#5C0F6B] hover:to-purple-700"}`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              ) : null}
              <span>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </span>
              {!isSubmitting && (
                <ChevronRight
                  className="ml-2 transform transition-transform group-hover:translate-x-1"
                  size={20}
                />
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.form>

      {/* Login Link */}
      <motion.div variants={itemVariants} className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-purple-500 hover:text-purple-400 transition-colors"
          >
            Log In
          </Link>
        </span>
      </motion.div>
    </AuthLayout>
  );
};

export default Page;
