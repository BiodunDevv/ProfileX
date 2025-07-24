"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Shield,
  Github,
  Linkedin,
  Twitter,
  Send,
  Key,
  Globe,
  MessageSquare,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { ContactData } from "../../allTemplates/templateEight/page";

interface ContactProps {
  data: ContactData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialPlatforms = [
    {
      name: "GitHub",
      icon: Github,
      color: "#fff",
      url: data.social.find((s) => s.platform === "GitHub")?.url,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0077B5",
      url: data.social.find((s) => s.platform === "LinkedIn")?.url,
    },
    {
      name: "TryHackMe",
      icon: Shield,
      color: "#22C55E",
      url: data.social.find((s) => s.platform === "TryHackMe")?.url,
    },
    { name: "Twitter", icon: Twitter, color: "#1DA1F2", url: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#38BDF8] mr-3" />
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                Get In Touch
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Looking for cybersecurity expertise? Let's discuss your security
              needs, collaborate on projects, or talk about potential
              opportunities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Primary Contact */}
              <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-[#38BDF8]" />
                  Let's Connect
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-[#1F2937] rounded-xl hover:bg-[#38BDF8]/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="p-3 bg-[#38BDF8]/20 border border-[#38BDF8]/40 rounded-xl">
                      <Mail className="w-6 h-6 text-[#38BDF8]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <div className="text-[#38BDF8]">{data.email}</div>
                    </div>
                  </motion.div>

                  {/* Availability */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-[#1F2937] rounded-xl hover:bg-[#A855F7]/10 transition-all duration-300"
                  >
                    <div className="p-3 bg-[#A855F7]/20 border border-[#A855F7]/40 rounded-xl">
                      <Globe className="w-6 h-6 text-[#A855F7]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Availability
                      </div>
                      <div className="text-[#A855F7] text-sm">
                        Available for new opportunities
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Response Time */}
                <div className="mt-6 p-4 bg-gradient-to-r from-[#22C55E]/5 to-[#38BDF8]/5 border border-[#22C55E]/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">
                        Response Time
                      </div>
                      <div className="text-gray-400 text-sm">
                        I typically respond within 24 hours
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                      <span className="text-[#22C55E] text-sm font-medium">
                        Fast Response
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Social Platforms
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socialPlatforms.map((platform, index) => {
                    const Icon = platform.icon;
                    return (
                      <motion.a
                        key={platform.name}
                        href={platform.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group p-4 bg-[#1F2937] border border-[#38BDF8]/20 rounded-xl hover:border-[#38BDF8]/40 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: platform.color }}
                          />
                          <div>
                            <div className="text-white font-medium group-hover:text-[#38BDF8] transition-colors duration-300">
                              {platform.name}
                            </div>
                            <div className="text-gray-400 text-sm">Connect</div>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-3 text-[#38BDF8]" />
                  Send Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1F2937] border border-[#38BDF8]/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-[#38BDF8]/50 focus:outline-none transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1F2937] border border-[#38BDF8]/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-[#38BDF8]/50 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-[#1F2937] border border-[#38BDF8]/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-[#38BDF8]/50 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project, opportunity, or question..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                      isSubmitted
                        ? "bg-[#22C55E] text-white"
                        : isSubmitting
                          ? "bg-[#38BDF8]/50 text-white cursor-not-allowed"
                          : "bg-[#38BDF8] hover:bg-[#38BDF8]/80 text-[#0D1117]"
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl">
                  <div className="flex items-center space-x-2 text-[#22C55E] text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Secure Communication</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    Your message is transmitted securely. For sensitive
                    information, please use my PGP key.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="bg-[#161B22] border border-[#38BDF8]/20 rounded-2xl p-8">
              <div className="text-gray-400 mb-4">
                "Security is not a product, but a process." - Bruce Schneier
              </div>
              <div className="text-[#38BDF8] font-mono text-sm">
                $ echo "Thanks for visiting my portfolio!"
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
