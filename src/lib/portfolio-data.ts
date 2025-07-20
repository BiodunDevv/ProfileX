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
    id: "templateOne",
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
    id: "templateTwo",
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
    id: "templateThree",
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
  {
    id: "templateFour",
    title: "Dual Persona Professional Portfolio",
    category: "Developer & Designer",
    description:
      "A premium dual-persona portfolio perfect for professionals who excel in both design and development",
    longDescription:
      "This cutting-edge dual-persona portfolio template allows you to showcase two professional identities seamlessly. Perfect for full-stack developers who also design, UX engineers, or any professional with dual expertise. Features an elegant toggle mechanism, premium animations, and enterprise-grade design that's impressive enough for companies like Apple, Google, and Microsoft.",
    templatePath: "TemplateFour",
    goal: "Create a sophisticated platform that showcases dual professional expertise with seamless persona switching, premium animations, and enterprise-grade design quality.",
    features: [
      "Dual-persona toggle mechanism",
      "Premium glassmorphism design",
      "Advanced animations with Framer Motion",
      "Mobile-responsive with status bar integration",
      "Progressive skill visualization",
      "Interactive project filtering",
      "Enhanced contact forms with validation",
      "Enterprise-grade styling and interactions",
      "Floating elements and physics-based animations",
      "Professional color scheme (#B1B2B5 hero, #1A1D29 sections)",
      "Mobile action buttons for projects",
      "Advanced background patterns and gradients",
    ],
    challenges: [
      "Creating seamless persona transitions",
      "Implementing complex dual-state management",
      "Ensuring mobile responsiveness across both personas",
      "Balancing visual complexity with performance",
      "Creating enterprise-grade design quality",
    ],
    learned: [
      "Advanced state management for dual personas",
      "Complex animation orchestration",
      "Mobile-first responsive design principles",
      "Enterprise-level UI/UX patterns",
      "Advanced TypeScript type safety",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js 14+",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
      "React Icons",
      "Glassmorphism Design",
      "Advanced CSS Grid",
    ],
    images: [
      "/TemplateFourPreview.png",
      "/templateFour-2.png",
      "/templateFour-3.png",
      "/templateFour-4.png",
      "/templateFour-5.png",
    ],
    liveUrl: "/allTemplates/templateFour",
    githubUrl: "https://github.com/example/template-four",
    type: "web",
    targetAudience:
      "Full-stack developers with design skills, UX engineers, design-dev hybrids, senior professionals",
    industry: "Technology, Design, Creative Tech, Enterprise Software",
    designStyle: "Premium, Modern, Glassmorphism, Enterprise-grade",
    colorScheme: "Sophisticated gray palette with dual-tone design",
    layout: "Single-page with dual-persona sections and smooth transitions",
    responsive: true,
    animations: true,
    darkMode: true,
    sections: ["Hero", "About", "Projects", "Tools", "Contact", "Toggle"],
    bestFor: [
      "Full-stack developers with design skills",
      "UX engineers",
      "Design-development hybrids",
      "Senior tech professionals",
      "Creative technologists",
      "Professionals targeting top-tier companies",
      "Multi-disciplinary experts",
    ],
    notRecommendedFor: [
      "Single-discipline professionals",
      "Entry-level candidates",
      "Traditional business roles",
      "Non-technical industries",
      "Conservative corporate environments",
    ],
  },
  {
    id: "templateFive",
    title: "CLI-Verse Portfolio",
    category: "CLI Developer",
    description:
      "A terminal-inspired portfolio that showcases your command-line expertise and developer workflow",
    longDescription:
      "Stand out with this unique terminal-style portfolio that demonstrates your familiarity with command-line interfaces. Interactive commands, autocomplete functionality, and keyboard navigation create an immersive experience that appeals to technical recruiters and fellow developers. Perfect for backend developers, DevOps engineers, and CLI tool creators.",
    templatePath: "TemplateFive",
    goal: "Create an interactive terminal experience that showcases technical skills while demonstrating proficiency with command-line interfaces and developer tools.",
    features: [
      "Interactive terminal interface",
      "Command autocomplete with Tab",
      "Command history navigation",
      "Keyboard-focused navigation",
      "Custom command processor",
      "Animated command output",
      "Responsive terminal window",
      "Blinking cursor animation",
      "Multiple command aliases",
      "Real-time command suggestions",
    ],
    challenges: [
      "Building terminal-like keyboard interactions",
      "Creating smooth autocomplete functionality",
      "Implementing command history navigation",
      "Designing responsive terminal interface",
      "Managing complex state with React Context",
    ],
    learned: [
      "Advanced keyboard event handling",
      "Complex React Context patterns",
      "Terminal UI/UX principles",
      "Command-line interface design",
      "Performance optimization for real-time typing",
    ],
    technologies: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Framer Motion",
      "TailwindCSS",
      "React Context API",
    ],
    images: [
      "/TemplateFivePreview.png",
      "/templateFive-2.png",
      "/templateFive-3.png",
      "/templateFive-4.png",
    ],
    liveUrl: "/allTemplates/templateFive",
    githubUrl: "https://github.com/devuser/terminal-portfolio",
    type: "web",
    targetAudience:
      "Backend developers, DevOps engineers, CLI tool creators, system administrators",
    industry: "Technology, Software Development, DevOps",
    designStyle: "Terminal/CLI interface, Minimalist, Monospace typography",
    colorScheme: "Grayscale with burgundy accents (#5B2333)",
    layout: "Single-page terminal window",
    responsive: true,
    animations: true,
    darkMode: false,
    sections: [
      "Welcome message",
      "Command input",
      "About section",
      "Projects showcase",
      "Skills display",
      "Experience timeline",
      "Contact information",
      "Social links",
      "Resume download",
    ],
    bestFor: [
      "Backend developers",
      "DevOps engineers",
      "CLI tool creators",
      "System administrators",
      "Infrastructure engineers",
      "Terminal enthusiasts",
      "Technical professionals",
      "Developer tool builders",
    ],
    notRecommendedFor: [
      "Non-technical roles",
      "Frontend-only developers",
      "Design-focused portfolios",
      "Traditional business profiles",
      "Client-facing roles",
      "Non-developer positions",
    ],
  },
  {
    id: "templateSix",
    title: "PaperTrail Editorial Resume Portfolio",
    category: "Content Professional",
    description:
      "An editorial-style resume portfolio with paper-like aesthetic perfect for content strategists and UX writers",
    longDescription:
      "PaperTrail is a sophisticated editorial resume portfolio designed specifically for content professionals, UX writers, and editorial strategists. With its paper-like aesthetic, editorial typography, and print-ready design, it creates a professional impression that's perfect for content-focused roles. The template features comprehensive sections for showcasing writing samples, content strategy work, and professional experience in an elegant, readable format.",
    templatePath: "TemplateSix",
    goal: "Create a professional editorial resume portfolio that showcases content expertise, writing skills, and strategic thinking in a sophisticated paper-like format optimized for both digital viewing and PDF sharing.",
    features: [
      "Editorial paper-like design aesthetic",
      "Comprehensive resume sections (Cover, About, Experience, Education, Skills, Projects, Certifications, Testimonials, Contact)",
      "PDF download functionality for easy sharing",
      "Responsive design across all devices",
      "Interactive navigation with mobile dropdown",
      "Print-optimized styling",
      "Professional typography with DM Serif Display and Inter fonts",
      "Smooth animations and transitions",
      "Content-focused layout hierarchy",
      "Professional color palette (#F8F6F3, #A6785C, #1C1B1A)",
      "Mobile-first responsive design",
      "Accessibility-focused implementation",
    ],
    challenges: [
      "Creating print-ready PDF generation from web content",
      "Balancing editorial aesthetics with digital usability",
      "Implementing comprehensive responsive design across 9 sections",
      "Optimizing content layout for readability and professional appeal",
      "Managing complex portfolio data structure and state",
    ],
    learned: [
      "Advanced PDF generation techniques with html2canvas and jsPDF",
      "Editorial design principles for digital portfolios",
      "Comprehensive responsive design implementation",
      "Professional resume layout and typography",
      "Complex React component architecture for portfolio systems",
    ],
    technologies: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "html2canvas",
      "jsPDF",
      "DM Serif Display Font",
      "Inter Font",
    ],
    images: [
      "/TemplateSixPreview.png",
      "/templateSix-2.png",
      "/templateSix-3.png",
      "/templateSix-4.png",
      "/templateSix-5.png",
    ],
    liveUrl: "/allTemplates/templateSix",
    githubUrl: "https://github.com/example/template-six",
    type: "web",
    targetAudience:
      "Content strategists, UX writers, editorial professionals, content designers, communications specialists",
    industry:
      "Content Strategy, UX Writing, Editorial, Communications, Digital Marketing",
    designStyle: "Editorial, Professional, Paper-like, Typography-focused",
    colorScheme:
      "Warm paper tones with brown accents (#F8F6F3 background, #A6785C accent, #1C1B1A text)",
    layout: "Multi-section resume portfolio with smooth navigation",
    responsive: true,
    animations: true,
    darkMode: false,
    sections: [
      "Cover",
      "About",
      "Experience",
      "Education",
      "Skills",
      "Projects",
      "Certifications",
      "Testimonials",
      "Contact",
    ],
    bestFor: [
      "UX writers and content designers",
      "Content strategists and managers",
      "Editorial professionals and copywriters",
      "Communications specialists",
      "Technical writers",
      "Brand content creators",
      "Content marketing professionals",
      "Digital content producers",
    ],
    notRecommendedFor: [
      "Software developers (unless content-focused)",
      "Pure visual designers",
      "Data scientists",
      "Technical engineers",
      "Non-content focused roles",
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
