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
  available?: boolean;
  isPreviewOnly?: boolean;
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
    templatePath: "templateOne",
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
    available: true, // Form is available
    isPreviewOnly: false,
  },
  {
    id: "templateTwo",
    title: "Elegant Minimalist Portfolio",
    category: "Designer",
    description:
      "A clean, light-themed portfolio designed for UX/UI designers and creative professionals",
    longDescription:
      "This elegant minimalist portfolio puts your design work front and center. With a focus on typography, whitespace, and visual hierarchy, it's perfect for designers who want to showcase their aesthetic sensibility and attention to detail. The clean design ensures your work is the star of the show.",
    templatePath: "templateTwo",
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
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateThree",
    title: "Creative Portfolio Showcase",
    category: "Creative Professional",
    description:
      "A bold, innovative portfolio with dark theme perfect for creative designers and artists",
    longDescription:
      "This creative portfolio template breaks conventional boundaries with its bold design and innovative features. Perfect for creative professionals who want to make a statement, it combines stunning visuals with smooth animations and interactive elements. The dark theme creates a sophisticated backdrop that makes your work pop.",
    templatePath: "templateThree",
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
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateFour",
    title: "Dual Persona Professional Portfolio",
    category: "Developer & Designer",
    description:
      "A premium dual-persona portfolio perfect for professionals who excel in both design and development",
    longDescription:
      "This cutting-edge dual-persona portfolio template allows you to showcase two professional identities seamlessly. Perfect for full-stack developers who also design, UX engineers, or any professional with dual expertise. Features an elegant toggle mechanism, premium animations, and enterprise-grade design that's impressive enough for companies like Apple, Google, and Microsoft.",
    templatePath: "templateFour",
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
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateFive",
    title: "CLI-Verse Portfolio",
    category: "CLI Developer",
    description:
      "A terminal-inspired portfolio that showcases your command-line expertise and developer workflow",
    longDescription:
      "Stand out with this unique terminal-style portfolio that demonstrates your familiarity with command-line interfaces. Interactive commands, autocomplete functionality, and keyboard navigation create an immersive experience that appeals to technical recruiters and fellow developers. Perfect for backend developers, DevOps engineers, and CLI tool creators.",
    templatePath: "templateFive",
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
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateSix",
    title: "PaperTrail Editorial Resume Portfolio",
    category: "Content Professional",
    description:
      "An editorial-style resume portfolio with paper-like aesthetic perfect for content strategists and UX writers",
    longDescription:
      "PaperTrail is a sophisticated editorial resume portfolio designed specifically for content professionals, UX writers, and editorial strategists. With its paper-like aesthetic, editorial typography, and print-ready design, it creates a professional impression that's perfect for content-focused roles. The template features comprehensive sections for showcasing writing samples, content strategy work, and professional experience in an elegant, readable format.",
    templatePath: "templateSix",
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
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateSeven",
    title: "Dark Academia Gothic",
    category: "Creative Professionals",
    description:
      "A sophisticated, dark-themed adaptive portfolio with library-inspired design and real-time platform integration",
    longDescription:
      "This Dark Academia Gothic portfolio template combines the elegance of classical manuscripts with modern web technologies. Featuring adaptive sections based on user roles, real-time data fetching from GitHub, Behance, Dribbble, and Dev.to, it creates a unique intellectual aesthetic. Perfect for developers, designers, and creative professionals who appreciate thoughtful design and sophisticated typography.",
    templatePath: "templateSeven",
    goal: "Create a visually striking, intellectually sophisticated portfolio that adapts to different creative profiles while maintaining a cohesive Dark Academia aesthetic.",
    features: [
      "Dark Academia Gothic theme with deep burgundy and gold accents",
      "Role-based adaptive UI (designer, frontend, backend, fullstack)",
      "Real-time GitHub repository integration",
      "Behance/Dribbble creative project showcase",
      "Dev.to blog article integration",
      "EB Garamond typography with drop caps and manuscript styling",
      "Parchment textures and vintage border effects",
      "Framer Motion page-turns and ink-fade animations",
      "Responsive library-inspired scroll layout",
      "Performance optimized with API caching",
    ],
    challenges: [
      "Creating authentic manuscript-style UI components",
      "Implementing smooth page-turn animations",
      "Integrating multiple external APIs efficiently",
      "Balancing vintage aesthetics with modern usability",
      "Managing role-based conditional rendering",
      "Optimizing custom font loading performance",
    ],
    learned: [
      "Advanced Framer Motion animation techniques",
      "Multi-platform API integration patterns",
      "Custom typography and font optimization",
      "Responsive design with complex layouts",
      "Performance optimization for rich animations",
      "Accessible design with decorative elements",
    ],
    technologies: [
      "Next.js 14+",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "EB Garamond Font",
      "Dev.to RSS API",
      "Lucide React Icons",
      "Custom CSS Animations",
    ],
    images: [
      "/TemplateSevenPreview.png",
      "/templateSeven-2.png",
      "/templateSeven-3.png",
      "/templateSeven-4.png",
      "/templateSeven-5.png",
    ],
    liveUrl: "/allTemplates/templateSeven",
    githubUrl: "https://github.com/example/template-seven",
    type: "web",
    targetAudience:
      "Designer-developers, creative technologists, academics, writers, and intellectual professionals",
    industry:
      "Technology, Design, Academia, Publishing, Creative Technology, Research",
    designStyle:
      "Dark Academia Gothic, Manuscript-inspired, Vintage Academic, Literary",
    colorScheme:
      "Deep burgundy (#722F37), forest green (#355E3B), parchment (#F4ECD8), gold (#D4AF37), dark backgrounds (#1A1A1A, #0F0F0F)",
    layout:
      "Single-page library scroll with adaptive sections based on user role",
    responsive: true,
    animations: true,
    darkMode: true,
    sections: [
      "Hero with Drop Cap Typography",
      "About with Manuscript Styling",
      "GitHub Projects (Role-based)",
      "Behance Creative Portfolio (Role-based)",
      "Dev.to Blog Articles (Role-based)",
      "Contact with Ornate Form",
    ],
    bestFor: [
      "Creative technologists and digital artists",
      "Academic professionals and researchers",
      "Writer-developers and technical authors",
      "Design-oriented software engineers",
      "Professionals who value intellectual aesthetics",
      "Multi-disciplinary creatives",
      "Those seeking sophisticated, unique presentation",
    ],
    notRecommendedFor: [
      "Corporate enterprise presentations",
      "Minimalist design preferences",
      "Traditional business portfolios",
      "Users who prefer bright, modern themes",
      "Simple, single-focus portfolios",
      "Those requiring fast loading on very slow connections",
    ],
    available: false, // Form not available yet
    isPreviewOnly: true,
  },
  {
    id: "templateEight",
    title: "CyberSentinel Security Portfolio",
    category: "Cybersecurity Professional",
    description:
      "A sophisticated cybersecurity portfolio with hacker aesthetic and advanced interactive elements for security professionals",
    longDescription:
      "CyberSentinel is a cutting-edge cybersecurity portfolio template designed specifically for security researchers, penetration testers, and cyber defense professionals. Featuring an immersive terminal-inspired interface with matrix animations, interactive security visualizations, and comprehensive sections for CTF competitions and vulnerability writeups. The premium dark theme with vibrant green and gold accents creates a professional yet authentic hacker aesthetic perfect for showcasing security credentials to top-tier employers.",
    templatePath: "templateEight",
    goal: "Create a specialized portfolio platform for cybersecurity professionals that demonstrates technical expertise, security research, and practical defensive capabilities while maintaining an authentic hacker aesthetic.",
    features: [
      "Matrix code animation background effects",
      "Interactive security statistics dashboard",
      "CTF competition tracker with detailed breakdowns",
      "Vulnerability writeup showcase with severity ratings",
      "Security project portfolio with categorization",
      "PGP key integration for secure communications",
      "Advanced terminal-style typography and design",
      "Animated security skill visualizations",
      "Responsive design with mobile optimization",
      "Achievement and certification showcase",
      "Elegant dark theme with security-focused color scheme",
      "Comprehensive security experience timeline",
    ],
    challenges: [
      "Creating authentic terminal-inspired interface without compromising usability",
      "Implementing efficient matrix animation effects for background",
      "Designing information architecture for complex security projects and writeups",
      "Balancing professional presentation with hacker aesthetic",
      "Optimizing performance with multiple animation effects",
      "Creating responsive design that maintains terminal feel across devices",
    ],
    learned: [
      "Advanced CSS animation techniques for matrix effects",
      "Interactive data visualization for security statistics",
      "Optimal information architecture for security portfolios",
      "Performance optimization for animation-heavy interfaces",
      "Specialized typography for terminal-inspired designs",
      "Accessibility considerations for dark-themed interfaces",
    ],
    technologies: [
      "Next.js 14+",
      "React 18",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Lucide Icons",
      "Context API for state management",
      "Custom animations",
      "CSS Grid and Flexbox",
      "Responsive design patterns",
    ],
    images: [
      "/TemplateEightPreview.png",
      "/templateEight-2.png",
      "/templateEight-3.png",
      "/templateEight-4.png",
      "/templateEight-5.png",
      "/templateEight-6.png"
    ],
    liveUrl: "/allTemplates/templateEight",
    githubUrl: "https://github.com/example/template-eight",
    type: "web",
    targetAudience:
      "Cybersecurity professionals, penetration testers, security researchers, red team operators, bug bounty hunters, security engineers",
    industry:
      "Cybersecurity, Information Security, Digital Forensics, Vulnerability Research",
    designStyle:
      "Terminal-inspired, Hacker Aesthetic, Professional Dark Theme, Matrix-style",
    colorScheme:
      "Dark backgrounds (#0F1115, #1C1E26) with cyber green (#355E3B) and gold (#D4AF37) accents and light text (#F4ECD8)",
    layout:
      "Single-page application with specialized sections for security projects and CTFs",
    responsive: true,
    animations: true,
    darkMode: true,
    sections: [
      "Hero with Matrix Background",
      "About with Security Experience",
      "Projects with Security Categories",
      "CTF Competition Showcase",
      "Security Writeups with Severity Ratings",
      "Contact with PGP Key Integration",
    ],
    bestFor: [
      "Penetration testers",
      "Security researchers",
      "Bug bounty hunters",
      "Red team operators",
      "Security engineers",
      "CTF competitors",
      "Cyber defense professionals",
      "Digital forensics experts",
    ],
    notRecommendedFor: [
      "Non-technical professionals",
      "Traditional business roles",
      "Design-focused portfolios",
      "Bright, colorful presentation needs",
      "Corporate executive profiles",
    ],
    available: true,
    isPreviewOnly: false,
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
