"use client";
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  Loader2, 
  X, 
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { toast } from 'react-toastify';
import { usePortfolioOneStore } from '../../../../store/portfolioOneStore';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: string;
  portfolioTitle: string;
  onPublishSuccess: (customUrl: string) => void;
}

const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  portfolioId,
  portfolioTitle,
  onPublishSuccess
}) => {
  const [customSlug, setCustomSlug] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const [slugError, setSlugError] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentSlug, setCurrentSlug] = useState('');

  const {
    createCustomSlug,
    updateCustomSlug,
    getSlugSuggestions,
    publishPortfolio,
    getPortfolioInfo
  } = usePortfolioOneStore();

  // Extract actual name from title, removing developer roles
  const extractUserName = (title: string): string => {
    // Remove common developer roles and titles
    let cleanName = title
      .replace(/\b(full[\s-]*stack|frontend|backend|web|software|mobile|senior|junior|lead)\s*(developer|engineer|dev)\b/gi, '')
      .replace(/\b(developer|engineer|programmer|coder|dev)\b/gi, '')
      .replace(/\b(mr|mrs|ms|dr|prof|professor)\b/gi, '')
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // If nothing meaningful left, try to extract from email or use fallback
    if (!cleanName || cleanName.length < 2) {
      // You could extract from email or other fields here
      cleanName = 'portfolio-user';
    }

    return cleanName;
  };

  // Generate base slug from extracted user name
  const generateBaseSlug = (title: string): string => {
    const userName = extractUserName(title);
    
    return userName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .substring(0, 50);
  };

  // Load existing slug and suggestions when modal opens
  useEffect(() => {
    if (isOpen && portfolioId) {
      loadPortfolioInfo();
      loadSlugSuggestions();
    }
  }, [isOpen, portfolioId]);

  const loadPortfolioInfo = async () => {
    try {
      const info = await getPortfolioInfo(portfolioId, 'template1');
      if (info?.customSlug) {
        setCurrentSlug(info.customSlug);
        setCustomSlug(info.customSlug);
        setCustomUrl(`${window.location.origin}/portfolio/${info.customSlug}`);
      }
    } catch (error) {
      console.error('Error loading portfolio info:', error);
    }
  };

  const loadSlugSuggestions = async () => {
    try {
      // Use the extracted user name for suggestions, not the full title
      const userName = extractUserName(portfolioTitle);
      const baseSlug = generateBaseSlug(userName);
      
      console.log('Generating suggestions for user:', userName, 'Base slug:', baseSlug);
      
      const suggestions = await getSlugSuggestions(portfolioId, baseSlug);
      if (suggestions?.suggestions) {
        setSlugSuggestions(suggestions.suggestions);
        if (!customSlug) {
          setCustomSlug(suggestions.suggestions[0] || baseSlug);
        }
      }
    } catch (error) {
      console.error('Error loading slug suggestions:', error);
      const baseSlug = generateBaseSlug(portfolioTitle);
      setCustomSlug(baseSlug);
    }
  };

  // Validate slug format
  const validateSlug = (slug: string): boolean => {
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slug) {
      setSlugError('Slug is required');
      return false;
    }
    if (slug.length < 3) {
      setSlugError('Slug must be at least 3 characters long');
      return false;
    }
    if (slug.length > 50) {
      setSlugError('Slug must be less than 50 characters');
      return false;
    }
    if (!slugRegex.test(slug)) {
      setSlugError('Slug can only contain lowercase letters, numbers, and hyphens');
      return false;
    }
    if (slug.startsWith('-') || slug.endsWith('-')) {
      setSlugError('Slug cannot start or end with a hyphen');
      return false;
    }
    setSlugError('');
    return true;
  };

  const handleSlugChange = (value: string) => {
    const formattedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-');
    
    setCustomSlug(formattedSlug);
    validateSlug(formattedSlug);
    
    if (formattedSlug) {
      setCustomUrl(`${window.location.origin}/portfolio/${formattedSlug}`);
    }
  };

  const handlePublish = async () => {
    if (!validateSlug(customSlug)) {
      return;
    }

    setIsPublishing(true);
    try {
      // Create or update the custom slug
      let slugResult;
      if (currentSlug) {
        slugResult = await updateCustomSlug(portfolioId, customSlug);
      } else {
        slugResult = await createCustomSlug(portfolioId, customSlug);
      }

      if (!slugResult) {
        throw new Error('Failed to set custom slug');
      }

      // Publish the portfolio
      const publishResult = await publishPortfolio(portfolioId);
      if (!publishResult) {
        throw new Error('Failed to publish portfolio');
      }

      const finalUrl = `${window.location.origin}/portfolio/${customSlug}`;
      toast.success('Portfolio published successfully!');
      onPublishSuccess(finalUrl);
      onClose();
    } catch (error: any) {
      console.error('Error publishing portfolio:', error);
      toast.error(error.message || 'Failed to publish portfolio');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(customUrl);
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCustomSlug(suggestion);
    validateSlug(suggestion);
    setCustomUrl(`${window.location.origin}/portfolio/${suggestion}`);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#171826] border border-[#2E313C] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-semibold text-white flex items-center">
                    <Globe className="mr-2 text-purple-400" size={20} />
                    Publish Portfolio
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Portfolio Info */}
                  <div className="bg-[#1E2132] rounded-lg p-4 border border-[#2E313C]">
                    <h3 className="font-medium text-white mb-1">{portfolioTitle}</h3>
                    <p className="text-sm text-gray-400">Template One</p>
                  </div>

                  {/* Custom URL Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom URL
                      <span className="text-xs text-gray-500 ml-2">
                        (Use your name, not job title)
                      </span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#2E313C] bg-[#1E2132] text-gray-400 text-sm">
                          {window.location.origin}/portfolio1/
                        </span>
                        <input
                          type="text"
                          value={customSlug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          className="flex-1 bg-[#1E2132] border border-[#2E313C] rounded-r-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-500"
                          placeholder="john-doe"
                        />
                      </div>
                      
                      {slugError && (
                        <div className="flex items-center text-red-400 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {slugError}
                        </div>
                      )}

                      {customUrl && !slugError && (
                        <div className="flex items-center justify-between bg-[#1E2132] rounded-lg p-3 border border-[#2E313C]">
                          <span className="text-sm text-gray-300 truncate mr-2">
                            {customUrl}
                          </span>
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggestions */}
                  {slugSuggestions.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Sparkles size={16} className="text-purple-400 mr-1" />
                        <span className="text-sm font-medium text-gray-300">
                          Suggestions
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slugSuggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 bg-[#2E313C] hover:bg-[#3E4154] text-gray-300 rounded-lg text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 bg-[#2E313C] hover:bg-[#3E4154] text-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublish}
                      disabled={isPublishing || !!slugError || !customSlug}
                      className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Globe size={16} className="mr-2" />
                          Publish Portfolio
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Add helpful tip */}
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-blue-300 text-sm font-medium mb-1">Tip</p>
                      <p className="text-blue-200 text-xs">
                        Use your actual name (e.g., "john-doe") instead of job titles for a more professional URL.
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PublishModal;