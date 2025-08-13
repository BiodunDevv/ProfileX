'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { Eye, Edit, Trash2, ExternalLink, Plus, Share2, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface Portfolio {
  id: string;
  type: string;
  templateType: string;
  title: string;
  brandName?: string;
  name?: string;
  devName?: string;
  slug: string;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  apiEndpoint: string;
  editEndpoint: string;
  publicUrl: string;
}

interface PortfolioStats {
  totalPortfolios: number;
  totalViews: number;
  publicPortfolios: number;
  privatePortfolios: number;
  mostRecentUpdate: string;
  oldestPortfolio: string;
  portfolio1Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
  portfolio2Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const { token, getAllUserPortfolios, getPortfolioStats } = useAuthStore();

  useEffect(() => {
    fetchPortfolios();
    fetchStats();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await getAllUserPortfolios();
      
      if (response && response.success) {
        setPortfolios(response.data.portfolios || []);
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      toast.error('Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getPortfolioStats();
      if (response && response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio stats:', error);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Portfolio link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const getTemplateDisplayName = (type: string) => {
    switch (type) {
      case 'template1':
        return 'Modern Pro';
      case 'template2':
        return 'Minimalist';
      default:
        return 'Template';
    }
  };

  const getTemplateRoute = (type: string, slug: string) => {
    switch (type) {
      case 'template1':
        return `/allTemplates/templateOne/${slug}`;
      case 'template2':
        return `/allTemplates/templateTwo/${slug}`;
      default:
        return `/portfolio/${slug}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#171826] to-[#0D0F1A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Replace motion.div with regular div */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            My Portfolios
          </h1>
          <p className="text-gray-400">
            Manage and share your portfolio creations
          </p>
        </div>

        {/* Stats Cards - Replace motion.div with regular div */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl p-6 border border-[#2E313C]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Portfolios</p>
                  <p className="text-2xl font-bold text-white">{stats.totalPortfolios}</p>
                </div>
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl p-6 border border-[#2E313C]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
                </div>
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <Eye className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl p-6 border border-[#2E313C]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Public</p>
                  <p className="text-2xl font-bold text-white">{stats.publicPortfolios}</p>
                </div>
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Share2 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl p-6 border border-[#2E313C]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Private</p>
                  <p className="text-2xl font-bold text-white">{stats.privatePortfolios}</p>
                </div>
                <div className="p-3 bg-amber-600/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolios Grid */}
        {portfolios.length === 0 ? (
          <div className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl border border-[#2E313C] p-12 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No portfolios yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first portfolio to get started
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className="bg-[#1E2132]/70 backdrop-blur-sm rounded-xl border border-[#2E313C] overflow-hidden hover:border-[#3E4154] transition-all duration-300 group"
              >
                <div className="p-6">
                  {/* Portfolio Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {portfolio.title || portfolio.brandName || portfolio.name || 'Untitled Portfolio'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {getTemplateDisplayName(portfolio.type)}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      portfolio.isPublic 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-amber-600/20 text-amber-400'
                    }`}>
                      {portfolio.isPublic ? 'Public' : 'Private'}
                    </div>
                  </div>

                  {/* Portfolio Stats */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{portfolio.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {formatDate(portfolio.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Portfolio Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={getTemplateRoute(portfolio.type, portfolio.slug)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                    
                    <Link
                      href={portfolio.editEndpoint || `/edit/${portfolio.type}/${portfolio.id}`}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() => copyToClipboard(portfolio.publicUrl)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create New Portfolio Button */}
        {portfolios.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolios;
