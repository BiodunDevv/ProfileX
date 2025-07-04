/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";

interface SocialLinkProps {
  platform: string;
  icon: string;
  url: string;
}

interface ContactProps {
  email: string;
  phone?: string;
  socialLinks: SocialLinkProps[];
  portfolioId?: string;
  portfolioCustomUrl?: string;
}

const Contact = ({
  email = "your.email@example.com",
  phone,
  socialLinks = [],
  portfolioId,
  portfolioCustomUrl,
}: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const customUrl = window.location.pathname.split('/')[2]; 
      
      // Add portfolio information to the request
      const requestData = {
        ...formData,
        portfolioCustomUrl: customUrl,
        recipientEmail: email, 
      };
      
      // Send the contact form data to our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      // Handle success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      // Show error notification (you might want to add toast notifications)
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "linkedin":
        return <FaLinkedinIn className="h-5 w-5" />;
      case "github":
        return <FaGithub className="h-5 w-5" />;
      case "twitter":
        return <FaXTwitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const inputClasses =
    "w-full bg-[#111111] text-white border border-[#333333] rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#3F8E00] transition duration-200";
  const btnBaseClass = `text-white bg-[#3F8E00] hover:bg-[#4BA600] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.3)] transition duration-300 font-medium py-3 px-8 rounded-lg`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.4 } },
  };

  return (
    <motion.section
      className="w-full min-h-screen flex items-center bg-[#080808] text-white py-8"
      id="getintouch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-[#9C9C9C]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Let&apos;s build something amazing together
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={slideInLeft} initial="hidden" animate="visible">
            <motion.h3
              className="text-2xl font-semibold mb-6 border-b border-[#333333] pb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Contact Information
            </motion.h3>
            <motion.p
              className="text-[#9C9C9C] mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I&apos;m always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say
              hello, I&apos;ll try my best to get back to you!
            </motion.p>

            <motion.div
              className="mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, borderColor: "#4BA600" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-sm text-[#9C9C9C]">Email</p>
                  <motion.a
                    href={`mailto:${email}`}
                    className="text-[#6FC742] hover:underline transition"
                    whileHover={{ color: "#8AFF5D" }}
                  >
                    {email}
                  </motion.a>
                </div>
              </motion.div>

              {phone && (
                <motion.div
                  className="flex items-center mb-6"
                  variants={itemVariants}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1, borderColor: "#4BA600" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-sm text-[#9C9C9C]">Phone</p>
                    <motion.a
                      href={`tel:${phone}`}
                      className="text-[#6FC742] hover:underline transition"
                      whileHover={{ color: "#8AFF5D" }}
                    >
                      {phone}
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.h4
                  className="text-xl font-medium mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Connect With Me
                </motion.h4>
                <motion.div
                  className="flex space-x-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center hover:bg-[#181818] hover:border-[#444444] transition"
                      whileHover={{
                        y: -3,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        borderColor: "#4BA600",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      {renderSocialIcon(link.icon)}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="bg-[#0D0D0D] border border-[#1B1B1B] p-3 rounded-lg shadow-lg"
          >
            <motion.h3
              className="text-2xl font-semibold mb-6 border-b border-[#333333] pb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Send a Message
            </motion.h3>

            {submitted ? (
              <motion.div
                className="bg-[#0F3E07] border border-[#3F8E00] text-[#A3E681] px-6 py-6 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <motion.p
                  className="font-medium text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Thank you for your message!
                </motion.p>
                <motion.p
                  className="mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  I&apos;ll get back to you as soon as possible.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={inputClasses}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    variants={itemVariants}
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "#4BA600",
                      transition: { duration: 0.2 },
                    }}
                  />
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className={inputClasses}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    variants={itemVariants}
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "#4BA600",
                      transition: { duration: 0.2 },
                    }}
                  />
                </div>
                <motion.input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className={inputClasses}
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  variants={itemVariants}
                  whileFocus={{
                    scale: 1.02,
                    borderColor: "#4BA600",
                    transition: { duration: 0.2 },
                  }}
                />
                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  className={`${inputClasses} h-40 resize-none`}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  variants={itemVariants}
                  whileFocus={{
                    scale: 1.02,
                    borderColor: "#4BA600",
                    transition: { duration: 0.2 },
                  }}
                ></motion.textarea>
                <motion.button
                  type="submit"
                  className={`${btnBaseClass} w-full md:w-auto ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, backgroundColor: "#4BA600" }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  {isSubmitting ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
