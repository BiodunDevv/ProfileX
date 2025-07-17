"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  level: number;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface AboutProps {
  subtitle: string;
  description: string;
  skills: Skill[];
  education: Education[];
}

const About: React.FC<AboutProps> = ({
  subtitle,
  description,
  skills,
  education,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-10 sm:py-20 bg-gray-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                About
              </h2>
              <h3
                className="text-xl sm:text-2xl text-gray-600 mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {subtitle}
              </h3>
              <p
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {description}
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4
                className="text-lg sm:text-xl font-semibold text-gray-800"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Core Skills
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-medium text-gray-700"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {skill.level}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${(skill.level / 10) * 100}%` }
                            : { width: 0 }
                        }
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                        className="h-2 rounded-full bg-slate-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Education */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4
              className="text-xl font-semibold text-slate-700"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Education
            </h4>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5
                        className="text-lg font-semibold text-slate-700"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {edu.degree}
                      </h5>
                      <p
                        className="text-sky-600 font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-sm text-slate-500 bg-neutral-200 px-3 py-1 rounded-full">
                      {edu.year}
                    </span>
                  </div>
                  <p
                    className="text-slate-600 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.8, delay: 1.6 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <blockquote
                className="text-white italic text-md sm:text-lg"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                "Design is not just what it looks like and feels like. Design is
                how it works."
              </blockquote>
              <cite className="text-slate-300 text-sm mt-2 block">
                — Steve Jobs
              </cite>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.8, delay: 1.6 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <blockquote
                className="text-white italic text-md sm:text-lg"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                "Simplicity is the ultimate sophistication."
              </blockquote>
              <cite className="text-slate-300 text-sm mt-2 block">
                — Leonardo da Vinci
              </cite>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
