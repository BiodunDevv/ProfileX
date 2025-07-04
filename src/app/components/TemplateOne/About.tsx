import React from "react";

interface SkillProps {
  name: string;
  level: number; // 1-5 for skill proficiency level
  color?: string;
}

interface EducationProps {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

interface AboutProps {
  title: string;
  subtitle: string;
  description: string;
  skills: SkillProps[];
  education: EducationProps[];
}

const SkillBar = ({ name, level, color = "bg-blue-500" }: SkillProps) => {
  const width = `${level * 20}%`; // Convert 1-5 scale to percentage

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}/5</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width }}></div>
      </div>
    </div>
  );
};

const EducationCard = ({
  degree,
  institution,
  year,
  description,
}: EducationProps) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">{degree}</h3>
      <p className="text-gray-600">
        {institution} • {year}
      </p>
      {description && <p className="text-gray-600 mt-2">{description}</p>}
    </div>
  );
};

const About = ({
  title,
  subtitle,
  description,
  skills,
  education,
}: AboutProps) => {
  return (
    <section className={`py-16 bg-gray-50`} id="about">
      <div className="container mx-auto px-4 max-w-9xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* About Me Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

            {/* Education Section */}
            <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <EducationCard key={index} {...edu} />
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Skills & Expertise
            </h3>
            <div className="mt-6">
              {skills.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
