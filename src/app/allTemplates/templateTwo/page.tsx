"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Eye } from "lucide-react";
import Link from "next/link";
import Hero from "../../components/TemplateTwo/Hero";
import About from "../../components/TemplateTwo/About";
import Navbar from "../../components/TemplateTwo/Navbar";
import HeroImage from "../../components/TemplateTwo/images/Hero picture.svg";
import Projects from "../../components/TemplateTwo/Projects";
import ProjectsImage from "../../components/TemplateTwo/images/Projects.jpg";
import Contact from "../../components/TemplateTwo/Contact";

const HeroDetails = {
  Name: "Your Name Here",
  title: "Your Title Here Eg. A Frontend Developer",
  About:
    "About you: Lorem, ipsum dolor sit amet consectetur adipisicing elit Recusandae, aperiam quidem iste eligendi fugiat porro sapiente dolorem dolor numquam rem vel molestiae nobis accusantium provident, voluptatibus.",
  CvUrl: "#",
  ContactLink: "#",
  SocialLinks: [
    { platform: "github", url: "#" },
    { platform: "linkedin", url: "#" },
    { platform: "twitter", url: "#" },
    { platform: "instagram", url: "#" },
    { platform: "dribbble", url: "#" },
  ],
  heroImage: HeroImage,
};

const AboutDetails = {
  bio: "About you: Lorem, ipsum dolor sit amet consectetur adipisicing elit Recusandae, aperiam quidem iste eligendi fugiat porro sapiente dolorem dolor numquam rem vel molestiae nobis accusantium provident, voluptatibus.",
  aboutImage: HeroImage,
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "CSS", level: 75 },
    { name: "HTML", level: 95 },
  ],
  education: [
    {
      degree: "Bachelor of Science in Lorem Ipsum",
      institution: "University of Example",
      period: "2015 - 2019",
      description: "Description of your education.",
    },
    {
      degree: "Master of Science in Dolor Sit Amet",
      institution: "Institute of Example",
      period: "2019 - 2021",
      description: "Description of your education.",
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Tech Company",
      period: "2021 - Present",
      description: "Description of your experience.",
    },
    {
      role: "Intern",
      company: "Another Tech Company",
      period: "2020 - 2021",
      description: "Description of your experience.",
    },
  ],
};

const projects = [
  {
    id: 1,
    title: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum!",
    image: ProjectsImage,
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Node.js", "CSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum!",
    image: ProjectsImage,
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Node.js", "CSS"],
    featured: false,
  },
  {
    id: 3,
    title: "Project Name",
    description:
      "About Project: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit assumenda iste illum explicabo dolore velit exercitationem harum!",
    image: ProjectsImage,
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Node.js", "CSS"],
    featured: true,
  },
];

const contactInfo = {
  email: "hello@example.com",
  phone: "+1 (123) 456-7890",
  location: "New York, NY",
};

const TemplateTwo = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-gradient-to-b from-[#0f0f12] to-[#0f0f12]">
      {/* Show preview banner for unauthenticated users or when explicitly on templatePreview page */}
      {(!isAuthenticated || pathname.includes("/templatePreview")) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-400 py-3 flex justify-center items-center"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Eye className="h-4 w-4" />
              <span>
                {!isAuthenticated
                  ? "Template Preview - Sign in to create your own portfolio"
                  : "Template Preview Mode"}
              </span>
            </div>
            {!isAuthenticated && (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 bg-amber-900 text-amber-50 rounded-lg hover:bg-amber-800 transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-amber-900 rounded-lg hover:bg-amber-50 transition-colors font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <Navbar DevName="DevName" />
      <Hero
        name={HeroDetails.Name}
        title={HeroDetails.title}
        about={HeroDetails.About}
        heroImage={HeroDetails.heroImage}
        cvUrl={HeroDetails.CvUrl}
        contactLink={HeroDetails.ContactLink}
        socialLinks={HeroDetails.SocialLinks}
      />
      <About
        bio={AboutDetails.bio}
        aboutImage={AboutDetails.aboutImage}
        skills={AboutDetails.skills}
        education={AboutDetails.education}
        experience={AboutDetails.experience}
      />
      <Projects projects={projects} />
      <Contact contactInfo={contactInfo} />
    </div>
  );
};

export default TemplateTwo;
