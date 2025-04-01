import React from "react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaArrowDown,
} from "react-icons/fa";
import HeroPicture from "./images/Hero picture.svg";
import { StaticImageData } from "next/image";

interface SocialLink {
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "dribbble"
    | string;
  url: string;
}

interface HeroProps {
  name?: string;
  title?: string;
  about?: string;
  heroImage?: StaticImageData | string;
  cvUrl?: string;
  contactLink?: string;
  socialLinks?: SocialLink[];
}

const Hero = ({
  name,
  title,
  about,
  heroImage,
  cvUrl,
  contactLink,
  socialLinks,
}: HeroProps) => {
  const getSocialIcon = (platform: string, size = 20) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <FaGithub size={size} />;
      case "linkedin":
        return <FaLinkedinIn size={size} />;
      case "twitter":
        return <FaTwitter size={size} />;
      case "instagram":
        return <FaInstagram size={size} />;
      case "dribbble":
        return <FaDribbble size={size} />;
      default:
        return <FaGithub size={size} />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0f0f12] to-[#0f0f12] text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-500/5 rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-27 left-0 w-1/4 h-1/4 bg-amber-500/5 rounded-tr-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-amber-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/8 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col items-center z-10 max-w-5xl">
        {/* Profile Picture */}
        <div className="relative mb-8 animate-float">
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-amber-500/20 p-2 shadow-2xl shadow-amber-500/10 z-10">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-amber-500/20 to-transparent">
              <Image
                src={heroImage || HeroPicture}
                alt={`${name} profile picture`}
                className="w-full h-full object-cover"
                width={300}
                height={300}
                priority
                sizes="(max-width: 480px) 180px, (max-width: 768px) 240px, 260px"
              />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/5 scale-[1.15] animate-pulse"></div>

          {/* Floating accent circles */}
          <div className="absolute -right-2 top-1/2 w-6 h-6 rounded-full bg-amber-500/30 animate-float-delay blur-sm"></div>
          <div className="absolute -left-4 bottom-4 w-4 h-4 rounded-full bg-amber-500/20 animate-float-slow blur-sm"></div>
        </div>

        {/* Introduction Line */}
        <div className="mb-3 text-center">
          <span className="text-amber-400 text-lg font-medium inline-block relative px-1">
            Hello, I&apos;m
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500/30"></span>
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
          {name}
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-center text-slate-200 max-w-2xl">
          {title}
        </h2>

        {/* Description */}
        <p className="text-slate-300 mb-8 text-lg text-center max-w-2xl leading-relaxed">
          {about}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-5 mb-10 justify-center">
          <a
            href={contactLink}
            className="px-7 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-black font-medium rounded-md transition-all duration-300 flex items-center shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:translate-y-[-2px] hover:scale-105"
          >
            Get in Touch
          </a>
          {cvUrl && (
            <a
              href={cvUrl}
              download
              className="px-7 py-3 bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-medium rounded-md transition-all duration-300 shadow-lg shadow-amber-500/5 hover:shadow-amber-500/10 hover:translate-y-[-2px] hover:scale-105 flex items-center gap-2"
            >
              Download CV <FaArrowDown size={14} />
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-amber-500/30 rounded-full hover:border-amber-500 hover:text-amber-400 hover:scale-110 transition-all bg-[#161513]/50 backdrop-blur-sm"
              aria-label={`${link.platform} profile`}
            >
              {getSocialIcon(link.platform, 22)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
