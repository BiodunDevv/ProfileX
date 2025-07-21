"use client";
import { useState, useEffect } from "react";

export interface TemplateSevenData {
  role: string;
  userProfile: {
    name: string;
    tagline: string;
    profileImage: string;
    location: string;
    resumeLink: string;
  };
  platformHandles: {
    github?: string;
    behance?: string;
    dribbble?: string;
    devto?: string;
    linkedin?: string;
    instagram?: string;
  };
  about: {
    title: string;
    bio: string;
    interests: string[];
  };
  skills: {
    frontend?: string[];
    backend?: string[];
    designer?: string[];
    creative?: string[];
    technical?: string[];
    writing?: string[];
  };
  projects?: any[];
  creativeProjects?: any[];
  behanceProjects?: any[];
  articles?: any[];
  contact: {
    email: string;
    message: string;
    socials: Array<{
      platform: string;
      icon: string;
      url: string;
    }>;
  };
}

export const useTemplateSevenData = (initialData: any) => {
  const [data, setData] = useState<TemplateSevenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const enhancedData: TemplateSevenData = {
          ...initialData,

          behanceProjects: await fetchBehanceProjects(
            initialData.platformHandles?.behance
          ),
          articles: await fetchDevToArticles(
            initialData.platformHandles?.devto
          ),
        };

        setData(enhancedData);
      } catch (error) {
        console.error("Error fetching template data:", error);
        // Fallback to mock data if real APIs fail
        const fallbackData: TemplateSevenData = {
          ...initialData,
          behanceProjects: await getMockBehanceProjects(),
          articles: await getMockDevToArticles(),
        };
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  return { data, loading };
};

// Real Dev.to API integration
const fetchDevToArticles = async (username: string) => {
  if (!username) return getMockDevToArticles();

  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=5`
    );

    if (!response.ok) {
      throw new Error("Dev.to API request failed");
    }

    const articles = await response.json();

    return articles.map((article: any) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.published_at,
      readingTime: `${article.reading_time_minutes} min read`,
      tags: article.tag_list,
      reactions: article.public_reactions_count,
      comments: article.comments_count,
      coverImage: article.cover_image,
    }));
  } catch (error) {
    console.error("Error fetching Dev.to articles:", error);
    return getMockDevToArticles();
  }
};

// Behance API is restricted, so we'll use a placeholder or scraping alternative
const fetchBehanceProjects = async (username: string) => {
  // Note: Behance API requires special access and authentication
  // For now, return mock data or implement a custom scraping solution
  console.log(`Behance integration for ${username} - using mock data`);
  return getMockBehanceProjects();
};

const getMockBehanceProjects = async () => {
  return [
    {
      id: 1,
      title: "Ethereal Brand Identity",
      description:
        "Complete brand identity design for a sustainable fashion startup, including logo design, color palette, typography, and marketing materials.",
      image:
        "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1080",
      categories: ["Branding", "Identity Design"],
      url: "https://behance.net/gallery/ethereal-brand",
      appreciations: 1247,
      views: 8934,
    },
    {
      id: 2,
      title: "Digital Renaissance",
      description:
        "Art direction and visual design for a digital art exhibition exploring the intersection of classical art and modern technology.",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1080",
      categories: ["Art Direction", "Digital Art"],
      url: "https://behance.net/gallery/digital-renaissance",
      appreciations: 892,
      views: 6721,
    },
    {
      id: 3,
      title: "Minimalist Web Interface",
      description:
        "Clean, minimal interface design for a productivity app focusing on user experience and elegant interaction patterns.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1080",
      categories: ["UI/UX Design", "Web Design"],
      url: "https://behance.net/gallery/minimalist-interface",
      appreciations: 1156,
      views: 9834,
    },
  ];
};

const getMockDevToArticles = async () => {
  return [
    {
      id: 1,
      title: "The Philosophy of Code: Writing Software as Literature",
      description:
        "Exploring how the principles of great literature can transform the way we write and structure our code, making it more readable, maintainable, and beautiful.",
      url: "https://dev.to/alexwrites/philosophy-of-code",
      publishedAt: "2024-01-15",
      readingTime: "8 min read",
      tags: ["philosophy", "software", "clean-code"],
      reactions: 247,
      comments: 32,
    },
    {
      id: 2,
      title:
        "Building Design Systems That Scale: Lessons from Renaissance Architecture",
      description:
        "What classical architecture can teach us about creating design systems that stand the test of time and adapt to changing needs.",
      url: "https://dev.to/alexwrites/design-systems-architecture",
      publishedAt: "2024-01-08",
      readingTime: "12 min read",
      tags: ["design-systems", "architecture", "scalability"],
      reactions: 189,
      comments: 24,
    },
    {
      id: 3,
      title: "The Art of API Design: Creating Interfaces That Feel Natural",
      description:
        "Principles for designing APIs that developers love to use, focusing on intuitive design patterns and elegant abstractions.",
      url: "https://dev.to/alexwrites/art-of-api-design",
      publishedAt: "2024-01-02",
      readingTime: "10 min read",
      tags: ["api-design", "developer-experience", "software-architecture"],
      reactions: 312,
      comments: 45,
    },
  ];
};
