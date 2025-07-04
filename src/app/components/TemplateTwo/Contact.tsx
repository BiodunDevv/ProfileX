"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
}

interface ContactProps {
  contactInfo?: ContactInfo;
}

const Contact: React.FC<ContactProps> = ({
  contactInfo = {
    email: "hello@example.com",
    phone: "+1 (123) 456-7890",
    location: "New York, NY",
  },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to an API
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div
      id="contact"
      className="bg-[#0f0f12] text-white py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-25 right-0 w-1/3 h-1/3 bg-amber-500/5 rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-500/5 rounded-tr-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {" "}
            Have a question or want to work together? I would love to hear from
            you! Fill out the form below or reach out via email or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Information */}
          <div className="bg-[#0f0f12]/60 p-8 rounded-lg border border-amber-500/10 backdrop-blur-sm shadow-lg shadow-amber-500/5">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.email && (
                <div className="flex items-center">
                  <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                    <FaEnvelope className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-sm">Email</h4>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white hover:text-amber-400 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.phone && (
                <div className="flex items-center">
                  <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                    <FaPhone className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-sm">Phone</h4>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-white hover:text-amber-400 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.location && (
                <div className="flex items-center">
                  <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-sm">Location</h4>
                    <p className="text-white">{contactInfo.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative element */}
            <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent"></div>

            <div className="mt-8">
              <h4 className="text-xl font-medium mb-4 text-white">
                Let&apos;s Connect
              </h4>
              <p className="text-slate-300 mb-4">
                Whether you have a question about a project, job opportunity, or
                just want to say hello, I&apos;ll do my best to get back to you
                as soon as possible.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0f0f12]/60 p-8 rounded-lg border border-amber-500/10 backdrop-blur-sm shadow-lg shadow-amber-500/5">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1d] border border-amber-500/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1d] border border-amber-500/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#1a1a1d] border border-amber-500/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-black font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed w-full"
              >
                <FaPaperPlane size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
