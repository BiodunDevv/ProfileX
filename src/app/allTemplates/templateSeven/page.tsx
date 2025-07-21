"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Hero from "@/app/components/TemplateSeven/Hero";
import About from "@/app/components/TemplateSeven/About";
import CreativePortfolio from "@/app/components/TemplateSeven/CreativePortfolio";
import BehanceProjects from "@/app/components/TemplateSeven/BehanceProjects";
import Blog from "@/app/components/TemplateSeven/Blog";
import Contact from "@/app/components/TemplateSeven/Contact";
import Navigation from "@/app/components/TemplateSeven/Navigation";
import { useTemplateSevenData } from "@/app/components/TemplateSeven/hooks/useTemplateSevenData";

// Default mock data with real content
const defaultMockData = {
  role: "fullstack",
  userProfile: {
    name: "Elena Rosewood",
    tagline: "Visual Storyteller & Creative Director",
    profileImage:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    location: "Paris, France",
    resumeLink: "https://example.com/portfolio.pdf",
  },
  platformHandles: {
    instagram: "@elenarosewood",
    behance: "elena-creative",
    dribbble: "rosewoodstudio",
    devto: "ben",
    linkedin: "elena-rosewood",
  },
  about: {
    title: "Crafting Visual Narratives",
    bio: "A passionate visual storyteller with 8 years of experience in brand identity, editorial design, and creative direction. I believe in the power of authentic storytelling through thoughtful design and meaningful connections.",
    interests: [
      "Brand Identity",
      "Editorial Design",
      "Photography",
      "Art Direction",
      "Visual Storytelling",
    ],
  },
  skills: {
    creative: [
      "Adobe Creative Suite",
      "Figma",
      "Photography",
      "Art Direction",
      "Brand Strategy",
    ],
    technical: [
      "Web Design",
      "Motion Graphics",
      "3D Modeling",
      "Video Editing",
    ],
    writing: [
      "Copywriting",
      "Content Strategy",
      "Storytelling",
      "Editorial Writing",
    ],
  },
  // Mock blog articles
  articles: [
    {
      id: 1,
      title: "The Philosophy of Code: Writing Software That Thinks",
      description:
        "Examining the intersection between philosophy and programming, and how ancient wisdom can inform modern software architecture and development practices.",
      url: "https://dev.to/ben/philosophy-of-code",
      published_at: "2024-01-15T10:00:00Z",
      reading_time_minutes: 8,
      public_reactions_count: 42,
      comments_count: 12,
      tag_list: ["philosophy", "programming", "architecture", "thinking"],
      cover_image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Building Scalable Design Systems with TypeScript",
      description:
        "A deep dive into creating maintainable and scalable design systems using TypeScript, focusing on type safety and component consistency across large applications.",
      url: "https://dev.to/ben/design-systems-typescript",
      published_at: "2024-02-10T14:30:00Z",
      reading_time_minutes: 12,
      public_reactions_count: 87,
      comments_count: 23,
      tag_list: ["typescript", "designsystem", "react", "frontend"],
      cover_image:
        "https://images.unsplash.com/photo-1555949963-ff9fe19c6dcf?q=80&w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "The Art of Minimalist Design in Modern Web Development",
      description:
        "Exploring how minimalism in design philosophy translates to cleaner, more efficient code and better user experiences in contemporary web applications.",
      url: "https://dev.to/ben/minimalist-web-design",
      published_at: "2024-03-05T09:15:00Z",
      reading_time_minutes: 15,
      public_reactions_count: 156,
      comments_count: 34,
      tag_list: ["webdev", "design", "minimalism", "ux"],
      cover_image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Understanding Community-Driven Development at Dev.to",
      description:
        "How we built and maintain one of the largest developer communities, focusing on inclusivity, engagement, and sustainable growth.",
      url: "https://dev.to/ben/community-driven-development",
      published_at: "2024-03-20T16:20:00Z",
      reading_time_minutes: 10,
      public_reactions_count: 203,
      comments_count: 45,
      tag_list: ["community", "development", "leadership", "opensource"],
      cover_image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&h=400&fit=crop",
    },
  ],
  // Creative Portfolio Projects
  creativeProjects: [
    {
      id: 1,
      title: "Lumière Magazine Redesign",
      category: "Editorial Design",
      description:
        "Complete visual identity and editorial redesign for a contemporary art magazine, focusing on typography, layout, and visual hierarchy to enhance readability and aesthetic appeal.",
      medium: "Print & Digital",
      year: "2024",
      client: "Lumière Publishing",
      images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800&h=600&fit=crop",
      ],
      awards: ["Design Excellence Award 2024"],
      skills: ["Typography", "Layout Design", "Art Direction"],
      featured: true,
    },
    {
      id: 2,
      title: "Ethereal Fashion Campaign",
      category: "Photography & Art Direction",
      description:
        "Conceptual fashion photography series exploring the intersection of nature and haute couture, featuring dramatic lighting and surreal compositions.",
      medium: "Photography",
      year: "2024",
      client: "Maison Éthérée",
      images: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&h=600&fit=crop",
      ],
      awards: ["International Photography Award"],
      skills: ["Fashion Photography", "Art Direction", "Post-Production"],
      featured: true,
    },

    {
      id: 4,
      title: "Wellness Brand Identity",
      category: "Brand Design",
      description:
        "Complete brand identity development for a holistic wellness center, including logo design, packaging, and digital presence with focus on organic, calming aesthetics.",
      medium: "Brand Identity",
      year: "2023",
      client: "Serenity Wellness",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&h=600&fit=crop",
      ],
      awards: ["Brand Design Excellence"],
      skills: ["Brand Strategy", "Logo Design", "Packaging"],
      featured: true,
    },
  ],
  contact: {
    email: "elena@rosewoodstudio.com",
    message: "Let's create something beautiful together.",
    socials: [
      {
        platform: "Instagram",
        icon: "instagram",
        url: "https://instagram.com/elenarosewood",
      },
      {
        platform: "Behance",
        icon: "behance",
        url: "https://behance.net/elena-creative",
      },
      {
        platform: "LinkedIn",
        icon: "linkedin",
        url: "https://linkedin.com/in/elena-rosewood",
      },
    ],
  },
};

// Section configurations based on role
const sectionsByRole = {
  designer: ["Hero", "About", "CreativePortfolio", "Contact"],
  writer: ["Hero", "About", "CreativePortfolio", "Blog", "Contact"],
  photographer: ["Hero", "About", "CreativePortfolio", "Contact"],
  "content-creator": ["Hero", "About", "CreativePortfolio", "Blog", "Contact"],
  fullstack: [
    "Hero",
    "About",
    "CreativePortfolio",
    "Blog",
    "BehanceProjects",
    "Contact",
  ],
};

export default function TemplateSevenPage() {
  const [activeSection, setActiveSection] = useState(0);
  const { data, loading } = useTemplateSevenData(defaultMockData);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const role = data?.role || defaultMockData.role;
  const activeSections =
    sectionsByRole[role as keyof typeof sectionsByRole] ||
    sectionsByRole.fullstack;

  // Intersection Observer for section detection
  useEffect(() => {
    // Clear existing refs array to ensure fresh setup
    sectionRefs.current = new Array(activeSections.length).fill(null);

    // Small delay to ensure all components are mounted
    const setupObservers = () => {
      const observers = sectionRefs.current.map((ref, index) => {
        if (!ref) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
              setActiveSection(index);
            }
          },
          {
            threshold: [0.3, 0.6, 0.8],
            rootMargin: "-15% 0px -15% 0px",
          }
        );

        observer.observe(ref);
        return observer;
      });

      return () => {
        observers.forEach((observer) => {
          if (observer) observer.disconnect();
        });
      };
    };

    const timeoutId = setTimeout(setupObservers, 100);
    return () => clearTimeout(timeoutId);
  }, [activeSections]);

  // Smooth scroll to section
  const scrollToSection = (index: number) => {
    const targetRef = sectionRefs.current[index];
    if (targetRef) {
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderSection = (sectionName: string, index: number) => {
    const sectionProps = {
      ref: (el: HTMLElement | null) => {
        sectionRefs.current[index] = el;
      },
    };

    switch (sectionName) {
      case "Hero":
        return (
          <section {...sectionProps} id="hero">
            <Hero
              userProfile={data?.userProfile || defaultMockData.userProfile}
              skills={data?.skills || defaultMockData.skills}
              onNext={() => scrollToSection(1)}
            />
          </section>
        );
      case "About":
        return (
          <section {...sectionProps} id="about">
            <About
              title={data?.about?.title || defaultMockData.about.title}
              bio={data?.about?.bio || defaultMockData.about.bio}
              interests={
                data?.about?.interests || defaultMockData.about.interests
              }
            />
          </section>
        );
      case "CreativePortfolio":
        return (
          <section {...sectionProps} id="creative-portfolio">
            <CreativePortfolio
              projects={
                data?.creativeProjects || defaultMockData.creativeProjects
              }
              instagramHandle={
                data?.platformHandles?.instagram ||
                defaultMockData.platformHandles.instagram
              }
            />
          </section>
        );
      case "GitHubProjects":
        return (
          <section {...sectionProps} id="github-projects">
            <CreativePortfolio
              projects={
                data?.creativeProjects || defaultMockData.creativeProjects
              }
              instagramHandle={
                data?.platformHandles?.instagram ||
                defaultMockData.platformHandles.instagram
              }
            />
          </section>
        );
      case "BehanceProjects":
        return (
          <section {...sectionProps} id="behance-projects">
            <BehanceProjects
              projects={data?.behanceProjects}
              behanceHandle={
                data?.platformHandles?.behance ||
                defaultMockData.platformHandles.behance
              }
            />
          </section>
        );
      case "Blog":
        return (
          <section {...sectionProps} id="blog">
            <Blog
              articles={data?.articles || defaultMockData.articles}
              devtoHandle={
                data?.platformHandles?.devto ||
                defaultMockData.platformHandles.devto
              }
            />
          </section>
        );
      case "Contact":
        return (
          <section {...sectionProps} id="contact">
            <Contact
              email={data?.contact?.email || defaultMockData.contact.email}
              message={
                data?.contact?.message || defaultMockData.contact.message
              }
              socials={
                data?.contact?.socials || defaultMockData.contact.socials
              }
            />
          </section>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#722F37] font-serif relative overflow-x-hidden"
    >
      {/* Custom fonts and styling */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap");

        .font-garamond {
          font-family: "EB Garamond", serif;
        }

        .font-inter {
          font-family: "Inter", sans-serif;
        }

        .manuscript-paper {
          background-image: linear-gradient(
              transparent 95%,
              rgba(212, 175, 55, 0.1) 95%
            ),
            linear-gradient(
              90deg,
              transparent 95%,
              rgba(212, 175, 55, 0.05) 95%
            );
          background-size: 1.2rem 1.2rem;
        }

        .parchment-texture {
          background-image: radial-gradient(
              circle at 20% 50%,
              rgba(244, 236, 216, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(244, 236, 216, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 80%,
              rgba(244, 236, 216, 0.02) 0%,
              transparent 50%
            );
        }

        .drop-cap::first-letter {
          float: left;
          font-size: 3.5rem;
          line-height: 1;
          padding-right: 0.5rem;
          margin-top: 0.1rem;
          color: #d4af37;
          font-family: "EB Garamond", serif;
          font-weight: 700;
        }

        .ink-fade-in {
          animation: inkFadeIn 1.5s ease-out forwards;
        }

        @keyframes inkFadeIn {
          0% {
            opacity: 0;
            filter: blur(2px);
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <Navigation
        activeSections={activeSections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        DevName={defaultMockData.userProfile.name}
      />
      {/* Main Content - Continuous Scroll */}
      <main className="parchment-texture pt-20">
        {activeSections.map((sectionName, index) => (
          <div key={sectionName}>{renderSection(sectionName, index)}</div>
        ))}
      </main>
    </div>
  );
}
