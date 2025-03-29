"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AuthLayout, { itemVariants } from "../components/Auth/AuthLayout";
import LogoHeader from "../components/UI/LogoHeader";
import { NameField, EmailField, PasswordField } from "../components/UI/Form";
import { useAuthStore } from "../../../store/useAuthStore";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: ["", "", "", "", "", ""],
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const { signUp } = useAuthStore();
  // Create refs at the top level
  const verificationInputRef1 = useRef<HTMLInputElement>(null);
  const verificationInputRef2 = useRef<HTMLInputElement>(null);
  const verificationInputRef3 = useRef<HTMLInputElement>(null);
  const verificationInputRef4 = useRef<HTMLInputElement>(null);
  const verificationInputRef5 = useRef<HTMLInputElement>(null);
  const verificationInputRef6 = useRef<HTMLInputElement>(null);

  // Create an array of the refs
  const verificationInputRefs = [
    verificationInputRef1,
    verificationInputRef2,
    verificationInputRef3,
    verificationInputRef4,
    verificationInputRef5,
    verificationInputRef6,
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Update the code at the current index
    const newVerificationCode = [...formData.verificationCode];
    newVerificationCode[index] = value;

    setFormData((prev) => ({
      ...prev,
      verificationCode: newVerificationCode,
    }));

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
    if (
      e.key === "Backspace" &&
      formData.verificationCode[index] === "" &&
      index > 0
    ) {
      verificationInputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // If we have a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newVerificationCode = pastedData.split("");
      setFormData((prev) => ({
        ...prev,
        verificationCode: newVerificationCode,
      }));

      // Focus the last input
      verificationInputRefs[5].current?.focus();
    }
  };

  // const nextStep = () => {
  //   if (currentStep < 3) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await signUp({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      if (response?.status === 200 || response?.status === 201) {
        console.log("Signup successful:", response);
        setSignupComplete(true);
      }
    } catch {
      console.error("Signup failed");
    }

    console.log("Signup Data:", formData);
  };

  const renderStep = () => {
    if (signupComplete) {
      return (
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
          className="space-y-8 py-6 text-center"
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
              className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-3 px-8 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Go to Dashboard</span>
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
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
            className="space-y-6"
          >
            <NameField
              value={formData.fullName}
              onChange={handleInputChange}
              name="fullName"
            />

            <EmailField value={formData.email} onChange={handleInputChange} />

            <PasswordField
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
            />

            <motion.div variants={itemVariants} className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 px-4 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center group"
              >
                Verify Account
                <ChevronRight
                  className="ml-2 transform transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
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
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Verify Your Account
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                We&apos;ve sent a 6-digit code to{" "}
                <span className="text-purple-400">{formData.email}</span>.
                Please enter it below.
              </p>

              {isVerifying ? (
                <div className="flex justify-center my-8">
                  <div className="w-8 h-8 border-t-2 border-purple-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center space-x-2 my-8">
                    {formData.verificationCode.map((digit, index) => (
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
                      onClick={() => {
                        setIsVerifying(true);
                        setTimeout(() => setIsVerifying(false), 2000);
                      }}
                    >
                      Resend Code
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-between"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                className="text-gray-300 py-2 px-6 rounded-lg hover:bg-[#2E313C] transition-all duration-300 flex items-center group"
              >
                <ChevronLeft
                  className="mr-2 transform transition-transform group-hover:-translate-x-1"
                  size={20}
                />
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  // Simulate form submission
                  setIsVerifying(true);
                  setTimeout(() => {
                    setIsVerifying(false);
                    setSignupComplete(true);
                  }, 2000);
                }}
                className="bg-gradient-to-r from-[#711381] to-purple-600 text-white py-2 px-6 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all duration-300 flex items-center group"
              >
                Complete Signup
                <CheckCircle2 className="ml-2" size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <LogoHeader title="Create an account to start your portfolio journey" />

      {/* Progress Indicator */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-10 h-1.5 mx-1 rounded-full transition-all duration-300 ${
              signupComplete
                ? "bg-gradient-to-r from-pink-500 to-purple-600"
                : currentStep >= step && step <= 2
                  ? "bg-gradient-to-r from-pink-500 to-purple-600"
                  : currentStep === 2 && step === 3 && isVerifying
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"
                    : "bg-gray-700"
            }`}
          />
        ))}
      </motion.div>

      {/* Signup Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-[#272932] rounded-2xl shadow-2xl border border-[#2E313C] p-6 space-y-6"
      >
        {renderStep()}
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
