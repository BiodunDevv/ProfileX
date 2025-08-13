"use client";
import React, { useState, useEffect } from 'react';
import { usePortfolioOneStore } from '../../../../../store/portfolioOneStore';
import { useAuthStore } from '../../../../../store/useAuthStore'; // Fixed import path
import { toast } from 'react-toastify';
import { Loader2, Settings, Globe, ArrowLeft } from 'lucide-react';
import SlugEditor from '../../../components/UI/SlugEditor';
import SlugPreview from '../../../components/UI/SlugPreview';
import { useRouter } from 'next/navigation';

const SlugManagementPage = () => {
  const router = useRouter();
  const [slugInfo, setSlugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);

  const { getMyPortfolio, getCustomSlugInfo } = usePortfolioOneStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadPortfolioAndSlugInfo();
  }, [isAuthenticated]);

  const loadPortfolioAndSlugInfo = async () => {
    setLoading(true);
    try {
      // First get the user's portfolio
      const portfolio = await getMyPortfolio();
      if (!portfolio) {
        toast.error('No portfolio found. Please create a portfolio first.');
        router.push('/allTemplates/templateOne/useTemplate');
        return;
      }

      const id = portfolio.id || portfolio._id;
      if (id) {
        setPortfolioId(id);

        // Then get slug information
        const slugData = await getCustomSlugInfo(id);
        if (slugData?.success) {
          setSlugInfo(slugData.data);
        }
      } else {
        toast.error('Portfolio ID not found');
      }
    } catch (error: any) {
      console.error('Error loading portfolio/slug info:', error);
      toast.error('Failed to load portfolio information');
    } finally {
      setLoading(false);
    }
  };

  const handleSlugChange = (newSlugData: any) => {
    setSlugInfo({
      hasCustomSlug: !!newSlugData.portfolio?.newSlug,
      customSlug: newSlugData.portfolio?.newSlug || null,
      defaultSlug: newSlugData.portfolio?.defaultSlug,
      links: newSlugData.links
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading portfolio information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Settings size={24} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Slug Management</h1>
              <p className="text-gray-400">Customize your portfolio URL</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Slug Editor */}
          <div className="space-y-6">
            <div className="bg-[#171826] border border-[#2E313C] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe size={20} className="text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Manage Your Slug</h2>
              </div>

              {portfolioId ? (
                <SlugEditor
                  portfolioId={portfolioId}
                  onSlugChange={handleSlugChange}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Portfolio ID not found</p>
                  <button
                    onClick={loadPortfolioAndSlugInfo}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Help Section */}
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-blue-300 font-semibold mb-3">💡 How it works</h3>
              <div className="space-y-2 text-blue-200 text-sm">
                <p><strong>From Name:</strong> We automatically create a clean slug from your full name, removing job titles and special characters.</p>
                <p><strong>Custom Slug:</strong> Set your own unique identifier with full control over the URL.</p>
                <p><strong>Global Protection:</strong> Your slug is protected across all portfolio types - no one else can use it.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div className="bg-[#171826] border border-[#2E313C] rounded-xl p-6">
              <SlugPreview
                customUrl={slugInfo?.links?.customUrl}
                defaultUrl={slugInfo?.links?.defaultUrl}
                hasCustomSlug={slugInfo?.hasCustomSlug || false}
              />
            </div>

            {/* Current Status */}
            <div className="bg-[#171826] border border-[#2E313C] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#2E313C]">
                  <span className="text-gray-400">Has Custom Slug:</span>
                  <span className={`font-medium ${slugInfo?.hasCustomSlug ? 'text-green-400' : 'text-gray-400'}`}>
                    {slugInfo?.hasCustomSlug ? 'Yes' : 'No'}
                  </span>
                </div>
                {slugInfo?.customSlug && (
                  <div className="flex justify-between items-center py-2 border-b border-[#2E313C]">
                    <span className="text-gray-400">Custom Slug:</span>
                    <code className="text-purple-400 bg-purple-600/10 px-2 py-1 rounded text-sm">
                      {slugInfo.customSlug}
                    </code>
                  </div>
                )}
                {slugInfo?.defaultSlug && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Default Slug:</span>
                    <code className="text-gray-400 bg-gray-600/10 px-2 py-1 rounded text-sm">
                      {slugInfo.defaultSlug}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-green-300 font-semibold mb-3">🛡️ Security & Privacy</h3>
              <div className="space-y-2 text-green-200 text-sm">
                <p>✅ Your portfolio is protected from unauthorized access</p>
                <p>✅ Slugs are globally unique across all users</p>
                <p>✅ Only you can manage your portfolio URLs</p>
                <p>✅ Automatic fallback to default URL if needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlugManagementPage;