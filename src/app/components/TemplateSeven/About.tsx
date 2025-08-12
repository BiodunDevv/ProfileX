"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Feather } from "lucide-react";

interface AboutProps {
  title: string;
  bio: string;
  interests: string[];
}

const About: React.FC<AboutProps> = ({ title, bio, interests }) => {
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

          <h2 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] mb-4 italic">
            {title}
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-16 h-px bg-[#D4AF37] mx-auto"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="lg:col-span-8"
          >
            {/* Manuscript Paper Effect */}
            <div className="bg-[#F4ECD8]/5 border border-[#D4AF37]/20 rounded-lg p-8 manuscript-paper relative overflow-hidden">
              {/* Decorative Corner Flourishes */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37]/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#D4AF37]/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#D4AF37]/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37]/30 rounded-br-lg" />

              {/* Quote Mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-6 left-6 text-6xl text-[#D4AF37]/20 font-garamond leading-none"
              >
                "
              </motion.div>

              {/* Bio Text with Drop Cap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="relative z-10 pt-4"
              >
                <p className="font-garamond text-lg md:text-xl text-[#F4ECD8] leading-relaxed drop-cap text-justify">
                  {bio}
                </p>
              </motion.div>

              {/* Author Attribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="mt-8 flex items-center justify-end"
              >
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <Feather className="h-5 w-5" />
                  <span className="font-inter text-sm italic">
                    — Personal Manifesto
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interests Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#722F37]/20 border border-[#D4AF37]/30 rounded-lg p-6 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="font-garamond text-2xl text-[#F4ECD8] italic">
                  Areas of Study
                </h3>
              </div>

              {/* Interests List */}
              <div className="space-y-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#F4ECD8]/5 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-inter text-[#F4ECD8] leading-relaxed">
                      {interest}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-6 h-px bg-gradient-to-r from-[#D4AF37] to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-[#355E3B]/20 border border-[#D4AF37]/20 rounded-lg p-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <BookOpen className="h-8 w-8 text-[#D4AF37]" />
              <h4 className="font-garamond text-2xl text-[#F4ECD8] italic">
                Philosophy
              </h4>
              <BookOpen className="h-8 w-8 text-[#D4AF37]" />
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="font-garamond text-xl md:text-2xl text-[#F4ECD8] italic leading-relaxed mb-4"
            >
              "Code is poetry written in logic. Design is philosophy expressed
              in pixels. Together, they form the modern manuscript of human
              creativity."
            </motion.blockquote>

            <motion.cite
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="font-inter text-[#D4AF37] text-sm not-italic"
            >
              — Personal Coding Philosophy
            </motion.cite>
          </div>
        </motion.div>

        {/* Page Turn Effect */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
          className="fixed top-10 right-10 w-8 h-8 bg-[#D4AF37]/10 rounded-full opacity-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        />
      </div>
    </section>
  );
};

export default About;
