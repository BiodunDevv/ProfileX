export interface PortfolioType {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  templatePath: string;
  goal: string;
  features: string[];
  challenges: string[];
  learned: string[];
  technologies: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
  type: "web" | "mobile" | "desktop";
  targetAudience: string;
  industry: string;
  designStyle: string;
  colorScheme: string;
  layout: string;
  responsive: boolean;
  animations: boolean;
  darkMode: boolean;
  sections: string[];
  bestFor: string[];
  notRecommendedFor: string[];
}

export const portfolioTypes: PortfolioType[] = [
  {
    id: "template1",
    title: "Modern Pro Developer Portfolio",
    category: "Web Developer",
    description:
      "A sleek, dark-themed portfolio perfect for full-stack developers and software engineers",
    longDescription:
      "This modern developer portfolio showcases your technical skills with a professional dark theme. Built with performance in mind, it features smooth animations, interactive elements, and a clean code structure that reflects your attention to detail. Perfect for developers who want to make a strong impression with potential employers or clients.",
    templatePath: "TemplateOne",
    goal: "Create a professional online presence that showcases technical expertise, projects, and experience in a visually appealing and user-friendly manner.",
    features: [
      "Responsive dark theme design",
      "Interactive project showcase",
      "Skills visualization with progress bars",
      "Experience timeline",
      "Contact form with validation",
      "Social media integration",
      "SEO optimized",
      "Fast loading performance",
    ],
    challenges: [
      "Balancing visual appeal with code readability",
      "Ensuring cross-browser compatibility",
      "Optimizing for mobile devices",
      "Creating smooth animations without performance impact",
    ],
    learned: [
      "Advanced CSS Grid and Flexbox techniques",
      "React performance optimization",
      "Accessibility best practices",
      "Modern web development workflows",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
    ],
    images: [
      "/TemplateOnePreveiw.png",
      "/templateOne-2.png",
      "/templateOne-3.png",
      "/templateOne-4.png",
    ],
    liveUrl: "/allTemplates/templateOne",
    githubUrl: "https://github.com/example/template-one",
    type: "web",
    targetAudience:
      "Full-stack developers, software engineers, tech professionals",
    industry: "Technology, Software Development",
    designStyle: "Modern, Minimalist, Professional",
    colorScheme: "Dark theme with accent colors",
    layout: "Single-page application with smooth scrolling",
    responsive: true,
    animations: true,
    darkMode: true,
    sections: ["Hero", "About", "Experience", "Projects", "Contact"],
    bestFor: [
      "Software developers",
      "Full-stack engineers",
      "Tech professionals",
      "Recent coding bootcamp graduates",
      "Computer science students",
    ],
    notRecommendedFor: [
      "Creative designers",
      "Artists",
      "Non-tech professionals",
      "Traditional business roles",
    ],
  },
  {
    id: "template2",
    title: "Elegant Minimalist Portfolio",
    category: "Designer",
    description:
      "A clean, light-themed portfolio designed for UX/UI designers and creative professionals",
    longDescription:
      "This elegant minimalist portfolio puts your design work front and center. With a focus on typography, whitespace, and visual hierarchy, it's perfect for designers who want to showcase their aesthetic sensibility and attention to detail. The clean design ensures your work is the star of the show.",
    templatePath: "TemplateTwo",
    goal: "Create a sophisticated platform that highlights design skills, creative projects, and professional experience while maintaining visual elegance.",
    features: [
      "Clean minimalist design",
      "Portfolio gallery with lightbox",
      "Typography-focused layout",
      "Smooth page transitions",
      "Client testimonials section",
      "Resume/CV download",
      "Mobile-first responsive design",
      "Optimized image loading",
    ],
    challenges: [
      "Achieving perfect visual balance",
      "Maintaining consistency across devices",
      "Optimizing large design files",
      "Creating intuitive navigation",
    ],
    learned: [
      "Advanced design principles",
      "Image optimization techniques",
      "User experience best practices",
      "Typography hierarchy implementation",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
      "Image optimization",
    ],
    images: [
      "/TemplateTwoPreview.png",
      "/templateTwo-2.png",
      "/templateTwo-3.png",
      "/templateTwo-4.png",
    ],
    liveUrl: "/allTemplates/templateTwo",
    githubUrl: "https://github.com/example/template-two",
    type: "web",
    targetAudience:
      "UX/UI designers, graphic designers, creative professionals",
    industry: "Design, Creative Services, Digital Agencies",
    designStyle: "Minimalist, Elegant, Typography-focused",
    colorScheme: "Light theme with subtle accent colors",
    layout: "Multi-section with smooth scrolling",
    responsive: true,
    animations: true,
    darkMode: false,
    sections: ["Hero", "About", "Projects", "Contact"],
    bestFor: [
      "UX/UI designers",
      "Graphic designers",
      "Creative directors",
      "Design students",
      "Freelance designers",
    ],
    notRecommendedFor: [
      "Software developers",
      "Data scientists",
      "Business analysts",
      "Traditional corporate roles",
    ],
  },
  {
    id: "template3",
    title: "Creative Portfolio Showcase",
    category: "Creative Professional",
    description:
      "A bold, innovative portfolio with dark theme perfect for creative designers and artists",
    longDescription:
      "This creative portfolio template breaks conventional boundaries with its bold design and innovative features. Perfect for creative professionals who want to make a statement, it combines stunning visuals with smooth animations and interactive elements. The dark theme creates a sophisticated backdrop that makes your work pop.",
    templatePath: "TemplateThree",
    goal: "Provide a cutting-edge platform for creative professionals to showcase their work with maximum visual impact and artistic flair.",
    features: [
      "Bold creative design",
      "Interactive project previews",
      "Advanced animation effects",
      "Skills visualization",
      "Professional contact form",
      "Social media integration",
      "Responsive dark theme",
      "Optimized performance",
    ],
    challenges: [
      "Creating unique visual elements",
      "Balancing creativity with usability",
      "Implementing complex animations",
      "Ensuring consistent branding",
    ],
    learned: [
      "Advanced animation techniques",
      "Creative design principles",
      "Performance optimization",
      "User interaction design",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
    ],
    images: [
      "/TemplateThreePreview.png",
      "/templateThree-2.png",
      "/templateThree-3.png",
      "/templateThree-4.png",
    ],
    liveUrl: "/allTemplates/templateThree",
    githubUrl: "https://github.com/example/template-three",
    type: "web",
    targetAudience: "Creative designers, artists, brand specialists",
    industry: "Creative Industries, Design Agencies, Art",
    designStyle: "Bold, Innovative, Artistic",
    colorScheme: "Dark theme with blue accents",
    layout: "Single-page with immersive sections",
    responsive: true,
    animations: true,
    darkMode: true,
    sections: ["Hero", "About", "Projects", "Contact"],
    bestFor: [
      "Creative designers",
      "Brand specialists",
      "Art directors",
      "Digital artists",
      "Creative agencies",
    ],
    notRecommendedFor: [
      "Traditional businesses",
      "Corporate professionals",
      "Conservative industries",
      "Technical documentation",
    ],
  },
];

export function getPortfolioBySlug(slug: string): PortfolioType | undefined {
  return portfolioTypes.find((portfolio) => portfolio.id === slug);
}

export function getPortfoliosByCategory(category: string): PortfolioType[] {
  if (category === "all") return portfolioTypes;
  return portfolioTypes.filter((portfolio) =>
    portfolio.category.toLowerCase().includes(category.toLowerCase())
  );
}
