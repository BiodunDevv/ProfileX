import React from "react";
import Hero from "../components/TemplateTwo/Hero";
import About from "../components/TemplateTwo/About";
import Navbar from "../components/TemplateTwo/Navbar";
import HeroImage from "../components/TemplateTwo/images/Hero picture.svg";
import Projects from "../components/TemplateTwo/Projects";
import ProjectsImage from "../components/TemplateTwo/images/Projects.jpg";
import Contact from "../components/TemplateTwo/Contact";

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
  return (
    <div>
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
