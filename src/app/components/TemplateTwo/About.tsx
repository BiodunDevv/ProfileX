import React from "react";
import Image from "next/image";
import { FaBookOpen, FaBriefcase } from "react-icons/fa";
import { StaticImageData } from "next/image";

interface Skill {
  name: string;
  level: number; // 1-100
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description?: string;
}

interface AboutProps {
  bio?: string;
  aboutImage?: StaticImageData | string;
  skills?: Skill[];
  education?: Education[];
  experience?: Experience[];
}

const About: React.FC<AboutProps> = ({
  bio = "I specialize in creating responsive, user-friendly web applications using modern technologies. With a focus on clean code and intuitive interfaces, I strive to build digital experiences that make a difference.",
  aboutImage,
  skills = [],
  education = [],
  experience = [],
}) => {
  return (
    <div
      id="about"
      className="bg-[#0f0f12] text-white py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-30 right-0 w-1/3 h-1/3 bg-amber-500/5 rounded-tl-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-1/4 h-1/4 bg-amber-500/5 rounded-br-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative max-w-9xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
        </div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          {aboutImage && (
            <div className="order-2 md:order-1 relative">
              <div className="relative rounded-lg overflow-hidden border-2 border-amber-500/20 p-1 shadow-xl shadow-amber-500/10">
                <Image
                  src={aboutImage}
                  alt="About Me Image"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161513] to-transparent opacity-40"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-amber-500/20 rounded-lg z-[-1]"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-amber-500/20 rounded-lg z-[-1]"></div>
            </div>
          )}

          <div
            className={`order-1 md:order-2 ${!aboutImage ? "col-span-2" : ""}`}
          >
            <h3 className="text-2xl font-semibold mb-4 text-amber-400">
              Who I am
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">{bio}</p>

            {/* Skills Progress Bars */}
            {skills.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  My Skills
                </h4>
                <div className="space-y-4">
                  {skills.slice(0, 4).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-amber-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-[#0f0f12]/80 p-8 rounded-lg border border-amber-500/10 backdrop-blur-sm shadow-lg shadow-amber-500/5">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                  <FaBriefcase className="text-amber-500" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Experience
                </h3>
              </div>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-amber-500/30"
                  >
                    <div className="absolute w-4 h-4 bg-amber-500/30 rounded-full -left-[9px] top-0"></div>
                    <h4 className="text-xl font-medium text-white">
                      {exp.role}
                    </h4>
                    <p className="text-amber-400 mb-1">{exp.company}</p>
                    <p className="text-slate-400 text-sm mb-2">{exp.period}</p>
                    {exp.description && (
                      <p className="text-slate-300">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-[#0f0f12]/80 p-8 rounded-lg border border-amber-500/10 backdrop-blur-sm shadow-lg shadow-amber-500/5">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                  <FaBookOpen className="text-amber-500" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-white">Education</h3>
              </div>

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-amber-500/30"
                  >
                    <div className="absolute w-4 h-4 bg-amber-500/30 rounded-full -left-[9px] top-0"></div>
                    <h4 className="text-xl font-medium text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-amber-400 mb-1">{edu.institution}</p>
                    <p className="text-slate-400 text-sm mb-2">{edu.period}</p>
                    {edu.description && (
                      <p className="text-slate-300">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
