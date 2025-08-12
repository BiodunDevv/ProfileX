"use client";

import React from "react";
import { motion } from "framer-motion";

interface ContactProps {
  data: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    website?: string;
    location: string;
    social: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
      behance?: string;
      dribbble?: string;
    };
  };
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const contactMethods = [
    {
      type: "Email",
      value: data.email,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      href: `mailto:${data.email}`,
      primary: true,
    },
    ...(data.phone
      ? [
          {
            type: "Phone",
            value: data.phone,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            ),
            href: `tel:${data.phone}`,
            primary: false,
          },
        ]
      : []),
    ...(data.website
      ? [
          {
            type: "Website",
            value: data.website.replace(/^https?:\/\//, ""),
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            href: data.website.startsWith("http")
              ? data.website
              : `https://${data.website}`,
            primary: false,
          },
        ]
      : []),
  ];

  const socialLinks = [
    ...(data.social.linkedin
      ? [
          {
            name: "LinkedIn",
            url: data.social.linkedin,
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
          },
        ]
      : []),
    ...(data.social.github
      ? [
          {
            name: "GitHub",
            url: data.social.github,
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            ),
          },
        ]
      : []),
    ...(data.social.behance
      ? [
          {
            name: "Behance",
            url: data.social.behance,
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-2.904 0-5.686-1.254-5.686-4.957 0-4.085 2.671-4.835 5.686-4.835 3.196 0 5.543 1.424 5.543 4.835 0 .295-.031.622-.063.957h-8.482c-.102 1.751 1.129 2.511 2.787 2.511 1.063 0 2.002-.375 2.317-1.511h3zm-7.686-3h5.333c-.146-1.338-.943-2-2.666-2-1.724 0-2.521.662-2.667 2zm-3.84 7c-.803 0-3.5-2-3.5-5s2.697-5 3.5-5c.344 0 .672.014.984.04-.217.343-.426.746-.589 1.195-.344-.149-.714-.235-1.089-.235-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4c.375 0 .745-.086 1.089-.235.163.449.372.852.589 1.195-.312.026-.64.04-.984.04z" />
              </svg>
            ),
          },
        ]
      : []),
    ...(data.social.portfolio
      ? [
          {
            name: "Portfolio",
            url: data.social.portfolio,
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM8 4h8v2H8V4zm8 14H8v-2h8v2z" />
              </svg>
            ),
          },
        ]
      : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="font-['DM_Serif_Display'] text-3xl md:text-4xl text-[#1C1B1A] mb-4">
          Let's Connect
        </h1>
        <div className="w-16 h-px bg-[#A6785C] mx-auto mb-4"></div>
        <p className="text-[#57534E] text-lg max-w-2xl mx-auto leading-relaxed">
          Ready to collaborate on meaningful projects that make a difference?
          I'd love to hear from you.
        </p>
      </motion.div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.type}
            href={method.href}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`block bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-6 hover:shadow-md transition-all duration-200 group ${
              method.primary ? "ring-2 ring-[#A6785C]/20" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  method.primary
                    ? "bg-[#A6785C] text-white"
                    : "bg-[#E4DCCB] text-[#A6785C]"
                } group-hover:scale-110 transition-transform duration-200`}
              >
                {method.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1C1B1A] mb-1">
                  {method.type}
                </h3>
                <p className="text-[#57534E] group-hover:text-[#A6785C] transition-colors duration-200">
                  {method.value}
                </p>
              </div>
              <div className="text-[#A6785C] group-hover:translate-x-2 transition-transform duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
            {method.primary && (
              <div className="mt-4 text-xs text-[#A6785C] font-medium">
                Primary Contact Method
              </div>
            )}
          </motion.a>
        ))}
      </div>

      {/* Location & Availability */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-8 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-['DM_Serif_Display'] text-xl text-[#1C1B1A] mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-[#A6785C] mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Location
            </h3>
            <p className="text-[#57534E] leading-relaxed">
              Based in {data.location}, I work with teams globally across
              different time zones. I'm experienced in remote collaboration and
              have worked with distributed teams at leading tech companies.
            </p>
          </div>
          <div>
            <h3 className="font-['DM_Serif_Display'] text-xl text-[#1C1B1A] mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-[#A6785C] mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Availability
            </h3>
            <p className="text-[#57534E] leading-relaxed">
              Currently available for new opportunities, consulting projects,
              and collaborative partnerships. I typically respond to inquiries
              within 24 hours.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#E4DCCB]/30 rounded-lg p-8 border border-[#DDD6CE] text-center mb-8"
        >
          <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-6">
            Connect on Social
          </h3>
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#A6785C] hover:bg-[#A6785C] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="bg-white rounded-lg shadow-sm border border-[#DDD6CE] p-8">
          <h3 className="font-['DM_Serif_Display'] text-2xl text-[#1C1B1A] mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-[#57534E] leading-relaxed mb-6 max-w-2xl mx-auto">
            Whether you're looking for a content design lead, strategic partner,
            or someone to help elevate your product's user experience, I'd love
            to explore how we can create something meaningful together.
          </p>
          <motion.a
            href={`mailto:${data.email}?subject=Let's collaborate&body=Hi ${data.name.split(" ")[0]}, I'd love to discuss...`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-[#A6785C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1C1B1A] transition-colors duration-200"
          >
            <span>Start a Conversation</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
