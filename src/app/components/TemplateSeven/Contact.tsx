"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  MessageSquare,
  Feather,
} from "lucide-react";

interface Social {
  platform: string;
  icon: string;
  url: string;
}

interface ContactProps {
  email: string;
  message: string;
  socials: Social[];
}

const Contact: React.FC<ContactProps> = ({ email, message, socials }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "twitter":
        return Twitter;
      case "instagram":
        return Instagram;
      default:
        return ExternalLink;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const subject = encodeURIComponent(formData.subject || "Portfolio Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\\n\\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
          />

          <h2 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] mb-6 italic">
            Begin a Correspondence
          </h2>

          <p className="font-inter text-lg text-[#F4ECD8]/80 max-w-2xl mx-auto leading-relaxed mb-4">
            {message}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-[#D4AF37] font-inter text-sm"
          >
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-[#722F37]/10 backdrop-blur-md border border-[#D4AF37]/20 rounded-lg p-8 manuscript-paper">
              <div className="flex items-center gap-3 mb-6">
                <Feather className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="font-garamond text-2xl text-[#F4ECD8] italic">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-inter text-sm text-[#F4ECD8]/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0F0F0F]/30 border border-[#D4AF37]/20 rounded-lg text-[#F4ECD8] font-inter text-sm focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm text-[#F4ECD8]/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0F0F0F]/30 border border-[#D4AF37]/20 rounded-lg text-[#F4ECD8] font-inter text-sm focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm text-[#F4ECD8]/70 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0F0F0F]/30 border border-[#D4AF37]/20 rounded-lg text-[#F4ECD8] font-inter text-sm focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm text-[#F4ECD8]/70 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0F0F0F]/30 border border-[#D4AF37]/20 rounded-lg text-[#F4ECD8] font-inter text-sm focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300 resize-none"
                    placeholder="Share your thoughts, ideas, or collaboration proposals..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 text-[#0F0F0F] font-inter font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Social Links & Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-6"
          >
            {/* Social Links */}
            <div className="bg-[#722F37]/10 backdrop-blur-md border border-[#D4AF37]/20 rounded-lg p-8 manuscript-paper">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="font-garamond text-2xl text-[#F4ECD8] italic">
                  Connect & Follow
                </h3>
              </div>

              <div className="space-y-4">
                {socials.map((social, index) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-4 bg-[#0F0F0F]/20 border border-[#D4AF37]/20 rounded-lg hover:border-[#D4AF37]/40 hover:bg-[#722F37]/20 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-[#D4AF37]/10 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                        <IconComponent className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h4 className="font-inter font-medium text-[#F4ECD8] group-hover:text-[#D4AF37] transition-colors duration-300">
                          {social.platform}
                        </h4>
                        <p className="font-inter text-sm text-[#F4ECD8]/60">
                          Follow my journey
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#F4ECD8]/40 ml-auto group-hover:text-[#D4AF37] transition-colors duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Additional Contact Info */}
            <div className="bg-[#722F37]/10 backdrop-blur-md border border-[#D4AF37]/20 rounded-lg p-8 manuscript-paper">
              <div className="text-center">
                <h4 className="font-garamond text-xl text-[#F4ECD8] mb-4 italic">
                  Collaboration & Opportunities
                </h4>
                <p className="font-inter text-sm text-[#F4ECD8]/70 leading-relaxed">
                  Open to meaningful collaborations, innovative projects, and
                  discussions about technology, design, and the future of
                  digital experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ornamental Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 text-[#D4AF37]/30">
            <div className="w-8 h-px bg-[#D4AF37]/30" />
            <Mail className="h-4 w-4" />
            <div className="w-8 h-px bg-[#D4AF37]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
