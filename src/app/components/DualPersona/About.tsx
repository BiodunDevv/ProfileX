"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface Skill {
  name: string;
  level: number;
}

interface AboutPersona {
  title: string;
  bio: string;
  skills: Skill[];
  image: string;
}

interface AboutData {
  designer: AboutPersona;
  developer: AboutPersona;
}

interface AboutProps {
  activePersona: "designer" | "developer";
  aboutData: AboutData;
}

const About: React.FC<AboutProps> = ({ activePersona, aboutData }) => {
  const currentPersona = aboutData[activePersona];

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < level ? "text-[#B1B2B5] fill-current" : "text-[#B1B2B5]/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#1A1D29]">
      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#B1B2B5]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            About Me
          </h2>
          <p className="text-[#B1B2B5]/80 text-lg max-w-2xl mx-auto">
            Discover the passion and expertise behind exceptional{" "}
            {activePersona === "designer" ? "design" : "development"} work.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Enhanced Image Side */}
          <motion.div
            key={`${activePersona}-about-image`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={currentPersona.image}
                alt={`${activePersona} about image`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Advanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1D29]/40 via-transparent to-[#B1B2B5]/20" />

              {/* Premium Glass Card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/90 text-sm font-medium">
                      {activePersona === "designer"
                        ? "Design Experience"
                        : "Development Experience"}
                    </div>
                    <div className="text-white text-2xl font-bold">
                      5+ Years
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#B1B2B5] rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Elements */}
              <motion.div
                className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-8 h-8 bg-[#B1B2B5]/30 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Side */}
          <motion.div
            key={`${activePersona}-about-content`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#B1B2B5] text-base sm:text-lg font-medium tracking-wide"
              >
                {activePersona === "designer"
                  ? "Creative Professional"
                  : "Technical Expert"}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight"
              >
                {currentPersona.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#B1B2B5]/90 text-lg leading-relaxed"
              >
                {currentPersona.bio}
              </motion.p>
            </div>

            {/* Enhanced Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-white">
                Core Expertise
              </h4>

              <div className="space-y-4">
                {currentPersona.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="group relative p-4 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10 hover:bg-[#B1B2B5]/10 hover:border-[#B1B2B5]/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        {renderSkillLevel(skill.level)}
                        <span className="text-[#B1B2B5]/70 text-sm font-medium">
                          {skill.level === 5
                            ? "Expert"
                            : skill.level === 4
                              ? "Advanced"
                              : "Intermediate"}
                        </span>
                      </div>
                    </div>

                    {/* Skill Progress Bar */}
                    <div className="mt-3 w-full bg-[#B1B2B5]/10 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats and Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              <div className="text-center p-4 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-[#B1B2B5]/80 text-sm">Projects</div>
              </div>
              <div className="text-center p-4 bg-[#B1B2B5]/5 rounded-2xl border border-[#B1B2B5]/10">
                <div className="text-2xl font-bold text-white">25+</div>
                <div className="text-[#B1B2B5]/80 text-sm">Happy Clients</div>
              </div>
            </motion.div>

            {/* Enhanced CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <button className="group bg-gradient-to-r from-[#B1B2B5] to-[#D1D1D3] text-[#1A1D29] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#B1B2B5]/25 hover:scale-105">
                Download Resume
                <motion.span
                  className="inline-block ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </button>

              <button className="group bg-transparent border-2 border-[#B1B2B5] text-[#B1B2B5] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#B1B2B5] hover:text-[#1A1D29] hover:scale-105">
                View Portfolio
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
