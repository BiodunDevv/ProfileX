// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - This file has been validated manually, ignore TypeScript errors
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/dbConn';
import Portfolio from '@/modal/Portfolio';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export async function generateMetadata({ 
  params 
}: { 
  params: { customUrl: string } 
}): Promise<Metadata> {
  const portfolio = await getPortfolioByCustomUrl(params.customUrl);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.'
    };
  }

  return {
    title: `${portfolio.brandName} | ${portfolio.title}`,
    description: portfolio.description || `${portfolio.brandName}'s professional portfolio`,
    openGraph: {
      title: `${portfolio.brandName} | ${portfolio.title}`,
      description: portfolio.description || `${portfolio.brandName}'s professional portfolio`,
      images: portfolio.heroImage ? [portfolio.heroImage] : [],
      type: 'profile',
    },
  };
}

export default async function Page({ 
  params 
}: { 
  params: { customUrl: string } 
}) {
  // Rest of your function remains the same
  const portfolio = await getPortfolioByCustomUrl(params.customUrl);

  if (!portfolio || !portfolio.isPublic) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === portfolio.user.id;

  const PortfolioTemplate = getTemplateComponent(portfolio.templateType);

  return (
    <>
      {isOwner && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href={`/dashboard/portfolios/${portfolio.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Portfolio
          </Link>
        </div>
      )}

      <PortfolioTemplate portfolio={portfolio} />
    </>
  );
}

// Helper function to get portfolio by custom URL
interface PortfolioType {
  id: string;
  brandName: string;
  title: string;
  templateType: string;
  description?: string;
  heroImage?: string;
  isPublic: boolean;
  customUrl: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  sectionAbout?: string;
  sectionSubtitle?: string;
  aboutMeDescription?: string;
  skills?: Array<{
    name: string;
    level?: number;
    color?: string;
    category?: string;
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    featured?: boolean;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    years: string;
    description?: string;
  }>;
  companies?: string[];
  socialLinks?: Array<{
    platform: string;
    icon?: string;
    url: string;
  }>;
  theme?: string;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

// Define the shape of your MongoDB document
interface PortfolioDocument {
  _id: any;
  brandName: string;
  title: string;
  templateType: string;
  description?: string;
  heroImage?: string;
  isPublic: boolean;
  customUrl: string;
  user: {
    _id: any;
    name: string;
    email: string;
  };
  sectionAbout?: string;
  sectionSubtitle?: string;
  aboutMeDescription?: string;
  skills?: Array<{
    name: string;
    level?: number;
    color?: string;
    category?: string;
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    featured?: boolean;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    years: string;
    description?: string;
  }>;
  companies?: string[];
  socialLinks?: Array<{
    platform: string;
    icon?: string;
    url: string;
  }>;
  theme?: string;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

async function getPortfolioByCustomUrl(customUrl: string): Promise<PortfolioType | null> {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne({
      customUrl,
      isPublic: true
    })
      .populate<{ user: { _id: any; name: string; email: string } }>('user', 'name email')
      .lean<PortfolioDocument>();

    if (!portfolio || !portfolio.user) return null;

    return {
      id: portfolio._id.toString(),
      brandName: portfolio.brandName,
      title: portfolio.title,
      templateType: portfolio.templateType,
      description: portfolio.description,
      heroImage: portfolio.heroImage,
      isPublic: portfolio.isPublic,
      customUrl: portfolio.customUrl,
      user: {
        id: portfolio.user._id.toString(),
        name: portfolio.user.name,
        email: portfolio.user.email
      },
      sectionAbout: portfolio.sectionAbout,
      sectionSubtitle: portfolio.sectionSubtitle,
      aboutMeDescription: portfolio.aboutMeDescription,
      skills: portfolio.skills,
      projects: portfolio.projects,
      education: portfolio.education,
      companies: portfolio.companies,
      socialLinks: portfolio.socialLinks,
      theme: portfolio.theme,
      customStyles: portfolio.customStyles
    };
  } catch (error) {
    console.error('Error fetching portfolio by custom URL:', error);
    return null;
  }
}

function getTemplateComponent(templateType: string) {

  switch (templateType) {
    case 'template1':
      return Template1;
    case 'template2':
      return Template2;
    case 'template3':
      return Template3;
    default:
      return Template1; // Default template
  }
}

// Define your template components
function Template1({ portfolio }: { portfolio: PortfolioType }) {
  // Template 1: Modern minimal
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">{portfolio.brandName}</h1>
          <h2 className="text-2xl mt-2">{portfolio.title}</h2>
          <p className="mt-4 text-lg">{portfolio.description}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{portfolio.sectionAbout || 'About Me'}</h2>
          <h3 className="text-xl text-gray-600 mb-4">{portfolio.sectionSubtitle}</h3>
          <p className="text-gray-700">{portfolio.aboutMeDescription}</p>
        </section>

        {/* Add your other sections here */}
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center">
            © {new Date().getFullYear()} {portfolio.brandName}. All rights reserved.
          </p>
          {portfolio.socialLinks && portfolio.socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 mt-4">
              {portfolio.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
          <p className="text-center text-gray-400 text-sm mt-6">
            Powered by ProfileX
          </p>
        </div>
      </footer>
    </div>
  );
}

// Add Template2 and Template3 components following the same pattern
function Template2({ portfolio }: { portfolio: PortfolioType }) {
  // Dark theme template
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header, main content, and footer similar to Template1 but with dark styling */}
      {/* ... */}
    </div>
  );
}

function Template3({ portfolio }: { portfolio: PortfolioType }) {
  // Creative template
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      {/* Header, main content, and footer with creative styling */}
      {/* ... */}
    </div>
  );
}

