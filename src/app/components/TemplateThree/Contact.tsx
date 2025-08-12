"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { FaBehance, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

interface ContactProps {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

const Contact: React.FC<ContactProps> = ({
  email,
  phone,
  location,
  socialLinks,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return FaLinkedin;
      case "Behance":
        return FaBehance;
      case "Github":
        return FaGithub;
      case "Instagram":
        return FaInstagram;
        case "Twitter":
        return FaTwitter;
      default:
        return Mail;
    }
  };

  return (
    <section
      id="contact"
      className="py-10 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Let's Work Together
          </h2>
          <p
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to bring your vision to life? I'd love to hear about your
            project and discuss how we can create something amazing together.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-6 items-start"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-700">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Get in Touch
              </h3>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-slate-200 hover:text-blue-400 transition-colors duration-300 font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <a
                      href={`tel:${phone}`}
                      className="text-slate-200 hover:text-blue-400 transition-colors duration-300 font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p
                      className="text-slate-200 font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {location}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-700"
            >
              <h4
                className="text-lg sm:text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Follow My Work
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30 hover:border-blue-400 transition-colors duration-300 group"
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-slate-400"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
