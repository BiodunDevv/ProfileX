"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TemplateOne from '../../components/TemplateOne/TemplateOne';
import { usePortfolioOneStore } from '../../../../store/portfolioOneStore';
import Preloader from '../../components/UI/Preloader';
import { toast } from 'react-toastify';

interface ComponentPortfolioData {
  hero: {
    DevName: string;
    title: string;
    description: string;
    heroImage: string;
    Companies: string[];
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    skills: any[];
    education: any[];
  };
  projects: Array<{
    id: number;
    type: string;
    typeColor: string;
    name: string;
    description: string;
    image: string;
    sourceLink: string;
    demoLink: string;
  }>;
  contact: {
    email: string;
    phone: string;
    socialLinks: any[];
  };
}

interface PortfolioViewerProps {
  slug: string;
}

const PortfolioViewer: React.FC<PortfolioViewerProps> = ({ slug }) => {
  const [portfolioData, setPortfolioData] = useState<ComponentPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioInfo, setPortfolioInfo] = useState<any>(null);

  const { getPortfolioBySlug } = usePortfolioOneStore();

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        console.log('Fetching portfolio with slug:', slug);
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        
        const portfolio = await getPortfolioBySlug(slug);
        
        if (portfolio) {
          console.log('Portfolio data received:', portfolio);
          setPortfolioInfo(portfolio);

          // Transform the API data to match your component structure
          const transformedData: ComponentPortfolioData = {
            hero: {
              DevName: portfolio.personalInfo?.fullName || portfolio.brandName || 'Portfolio Owner',
              title: portfolio.personalInfo?.tagline || portfolio.title || 'Welcome to My Portfolio',
              description: portfolio.description || portfolio.personalInfo?.bio || '',
              heroImage: portfolio.heroImage || '',
              Companies: portfolio.companies || []
            },
            about: {
              title: portfolio.sectionAbout || 'About Me',
              subtitle: portfolio.sectionSubtitle || 'Professional Background',
              description: portfolio.aboutMeDescription || portfolio.personalInfo?.bio || '',
              skills: portfolio.skills?.map((skill: any) => ({
                name: skill.name,
                level: skill.level || 3,
                color: skill.color || 'bg-purple-500'
              })) || [],
              education: portfolio.education?.map((edu: any) => ({
                degree: edu.degree,
                institution: edu.institution,
                year: edu.years || edu.year,
                description: edu.description
              })) || []
            },
            projects: portfolio.projects?.map((project: any, index: number) => ({
              id: index + 1,
              type: project.technologies?.[0] || project.type || 'Project',
              typeColor: ['blue', 'purple', 'green', 'amber'][index % 4],
              name: project.name || project.title || 'Untitled Project',
              description: project.description || '',
              image: project.imageUrl || project.image || '',
              sourceLink: project.repoUrl || project.githubUrl || project.sourceLink || '#',
              demoLink: project.liveUrl || project.demoLink || '#'
            })) || [],
            contact: {
              email: portfolio.contactInfo?.[0]?.emailAddress || portfolio.personalInfo?.email || '',
              phone: portfolio.contactInfo?.[0]?.phoneNumber || portfolio.personalInfo?.phone || '',
              socialLinks: portfolio.socialLinks?.map((link: any) => ({
                platform: link.platform,
                icon: link.icon,
                url: link.url
              })) || []
            }
          };

          setPortfolioData(transformedData);
          
          // Update page title
          if (typeof document !== 'undefined') {
            document.title = `${transformedData.hero.DevName} - Portfolio`;
          }
        } else {
          setError('Portfolio not found');
        }
      } catch (err: any) {
        console.error('Error fetching portfolio:', err);
        setError(err.message || 'Failed to load portfolio');
        
        // Only show toast for unexpected errors
        if (!err.message?.includes('not found')) {
          toast.error('Failed to load portfolio');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug, getPortfolioBySlug]);

  if (loading) {
    return (
      <Preloader
        loadingText="Loading Portfolio..."
        loadingSubtitle="Please wait while we fetch the portfolio data."
      />
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-12 h-12 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.513-1.007-6-2.709M15 11V9a6 6 0 10-12 0v2m0 0v2a6 6 0 0012 0v-2" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Portfolio Not Found</h1>
          <p className="text-gray-400 mb-8">
            The portfolio you're looking for doesn't exist or is not publicly accessible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Go Home
            </a>
            <a
              href="/templates"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Create Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TemplateOne portfolioData={portfolioData} isPublicView={true} />
      
      {/* Public Portfolio Footer */}
      <div className="bg-[#0B0E1A] py-8 border-t border-[#2E313C]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm mb-4">
            This portfolio was created with{' '}
            <a 
              href="/" 
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              ProfileX
            </a>
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span>Portfolio ID: {portfolioInfo?.id || portfolioInfo?._id}</span>
            <span>•</span>
            <span>Template: {portfolioInfo?.templateType}</span>
            <span>•</span>
            <span>Slug: {slug}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioViewer;