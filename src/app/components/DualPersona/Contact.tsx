"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { FaBehance, FaDribbble } from "react-icons/fa6";

interface Social {
  name: string;
  icon: string;
  url: string;
}

interface ContactData {
  email: string;
  phone: string;
  location: string;
  socials: Social[];
}

interface ContactProps {
  activePersona: "designer" | "developer";
  contactData: ContactData;
}

const Contact: React.FC<ContactProps> = ({ activePersona, contactData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "linkedin":
        return Linkedin;
      case "behance":
        return FaBehance;
      case "github":
        return Github;
      case "dribbble":
        return FaDribbble;
      default:
        return Mail;
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
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#1A1D29]">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Let's build something meaningful.
          </h2>
          <p className="text-[#B1B2B5]/80 text-lg max-w-2xl mx-auto">
            Whether you need stunning designs or powerful development, I'm here
            to help.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Get in Touch
              </h3>

              <p className="text-[#B1B2B5]/80 leading-relaxed text-base sm:text-lg">
                {activePersona === "designer"
                  ? "Ready to bring your brand vision to life? Let's discuss how we can create something extraordinary together that resonates with your audience."
                  : "Looking to build your next digital product? I'd love to help you create something amazing with cutting-edge technology and best practices."}
              </p>
            </div>

            {/* Enhanced Contact Methods */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                className="flex items-center space-x-4 p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 hover:border-[#B1B2B5]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/10"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#B1B2B5]/20 to-[#D1D1D3]/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-[#B1B2B5]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm sm:text-base">
                    Email
                  </div>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-[#B1B2B5]/80 hover:text-[#D1D1D3] transition-colors text-sm sm:text-base"
                  >
                    {contactData.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 hover:border-[#B1B2B5]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/10"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#B1B2B5]/20 to-[#D1D1D3]/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#B1B2B5]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm sm:text-base">
                    Phone
                  </div>
                  <div className="text-[#B1B2B5]/80 text-sm sm:text-base">
                    {contactData.phone}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 sm:p-6 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 hover:border-[#B1B2B5]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/10"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#B1B2B5]/20 to-[#D1D1D3]/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#B1B2B5]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm sm:text-base">
                    Location
                  </div>
                  <div className="text-[#B1B2B5]/80 text-sm sm:text-base">
                    {contactData.location}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Social Links */}
            <div className="space-y-4 pt-4">
              <h4 className="text-lg sm:text-xl font-semibold text-white">
                Connect With Me
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {contactData.socials.map((social, index) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-[#B1B2B5]/10 hover:bg-[#B1B2B5]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[#B1B2B5]/20 hover:border-[#B1B2B5]/40"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#B1B2B5] group-hover:text-[#D1D1D3] transition-colors duration-300" />

                      {/* Tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#B1B2B5] text-[#1A1D29] px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {social.name}
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#B1B2B5]/5 border border-[#B1B2B5]/10 rounded-3xl p-4 sm:p-6 backdrop-blur-sm hover:bg-[#B1B2B5]/10 transition-all duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                  <label className="text-white font-medium text-sm sm:text-base">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-4 bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-xl text-white placeholder-[#B1B2B5]/50 focus:outline-none focus:border-[#B1B2B5]/50 focus:bg-[#B1B2B5]/15 transition-all duration-300"
                    placeholder="Your Name"
                    required
                  />
                </motion.div>

                <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                  <label className="text-white font-medium text-sm sm:text-base">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-4 bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-xl text-white placeholder-[#B1B2B5]/50 focus:outline-none focus:border-[#B1B2B5]/50 focus:bg-[#B1B2B5]/15 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                <label className="text-white font-medium text-sm sm:text-base">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 sm:py-4 bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-xl text-white placeholder-[#B1B2B5]/50 focus:outline-none focus:border-[#B1B2B5]/50 focus:bg-[#B1B2B5]/15 transition-all duration-300"
                  placeholder="Project Subject"
                  required
                />
              </motion.div>

              <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                <label className="text-white font-medium text-sm sm:text-base">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 sm:py-4 bg-[#B1B2B5]/10 border border-[#B1B2B5]/20 rounded-xl text-white placeholder-[#B1B2B5]/50 focus:outline-none focus:border-[#B1B2B5]/50 focus:bg-[#B1B2B5]/15 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] text-[#1A1D29] px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/25 hover:scale-105 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
