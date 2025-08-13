"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { usePortfolioOneStore } from '../../../../store/portfolioOneStore';
import { toast } from 'react-toastify';
import { Loader2, Edit3, UserCheck, Trash2, AlertCircle, Check } from 'lucide-react';
import SlugSuggestions from './SlugSuggestions';

// Simple debounce function to replace lodash
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

interface SlugEditorProps {
  portfolioId: string;
  onSlugChange: (slugData: any) => void;
}

const SlugEditor: React.FC<SlugEditorProps> = ({ portfolioId, onSlugChange }) => {
  const [mode, setMode] = useState<'name' | 'custom'>('name');
  const [preferredName, setPreferredName] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [slugError, setSlugError] = useState('');

  const { manageSlug, getSlugSuggestions } = usePortfolioOneStore();

  // Debounced function to get suggestions
  const debouncedGetSuggestions = useCallback(
    debounce(async (base: string) => {
      if (!base.trim() || base.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const result = await getSlugSuggestions(portfolioId, base);
        if (result?.success && result?.data?.suggestions) {
          setSuggestions(result.data.suggestions);
        }
      } catch (error) {
        console.error('Error getting suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 500),
    [portfolioId, getSlugSuggestions]
  );

  // Get suggestions when inputs change
  useEffect(() => {
    const base = mode === 'name' ? preferredName : customSlug;
    if (base) {
      debouncedGetSuggestions(base);
    } else {
      setSuggestions([]);
    }
  }, [preferredName, customSlug, mode, debouncedGetSuggestions]);

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
  };

  const handleCreateFromName = async () => {
    if (!preferredName.trim()) {
      toast.error('Please enter your preferred name');
      return;
    }

    setProcessing(true);
    try {
      const result = await manageSlug(portfolioId, 'create', { preferredName });
      if (result.success) {
        toast.success(result.message || 'Slug created successfully!');
        onSlugChange(result.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create slug');
      if (error.message.includes('already taken') && error.suggestedAlternatives) {
        setSuggestions(error.suggestedAlternatives.map((slug: string) => ({ slug, available: true })));
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateWithCustom = async () => {
    if (!validateSlug(customSlug)) {
      return;
    }

    setProcessing(true);
    try {
      const result = await manageSlug(portfolioId, 'update', { customSlug });
      if (result.success) {
        toast.success(result.message || 'Slug updated successfully!');
        onSlugChange(result.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update slug');
      if (error.message.includes('already taken') && error.suggestedAlternatives) {
        setSuggestions(error.suggestedAlternatives.map((slug: string) => ({ slug, available: true })));
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveSlug = async () => {
    if (!confirm('Are you sure you want to remove your custom slug? Your portfolio will revert to the default URL.')) {
      return;
    }

    setProcessing(true);
    try {
      const result = await manageSlug(portfolioId, 'remove');
      if (result.success) {
        toast.success(result.message || 'Custom slug removed successfully!');
        onSlugChange(result.data);
        setCustomSlug('');
        setPreferredName('');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove slug');
    } finally {
      setProcessing(false);
    }
  };

  const handleSuggestionSelect = (slug: string) => {
    if (mode === 'name') {
      setPreferredName(slug);
    } else {
      setCustomSlug(slug);
      validateSlug(slug);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex gap-2 p-1 bg-[#1A1D2E] rounded-lg border border-[#2E313C]">
        <button
          onClick={() => setMode('name')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            mode === 'name'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#2E313C]'
          }`}
        >
          <UserCheck size={16} className="inline mr-2" />
          From Name
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            mode === 'custom'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#2E313C]'
          }`}
        >
          <Edit3 size={16} className="inline mr-2" />
          Custom Slug
        </button>
      </div>

      {/* Form Content */}
      {mode === 'name' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Preferred Name
            </label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              placeholder="e.g., John Doe Senior Developer"
              className="w-full bg-[#1E2132] border border-[#2E313C] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll automatically generate a clean, professional slug from your name
            </p>
          </div>

          <button
            onClick={handleCreateFromName}
            disabled={processing || !preferredName.trim()}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {processing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Check size={16} />
            )}
            {processing ? 'Creating...' : 'Create from Name'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Slug
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#2E313C] bg-[#1E2132] text-gray-400 text-sm">
                {typeof window !== 'undefined' ? window.location.origin : ''}/portfolio/
              </span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="your-custom-slug"
                className="flex-1 bg-[#1E2132] border border-[#2E313C] rounded-r-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-500"
              />
            </div>
            {slugError && (
              <div className="flex items-center text-red-400 text-sm mt-1">
                <AlertCircle size={14} className="mr-1" />
                {slugError}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleUpdateWithCustom}
              disabled={processing || !customSlug || !!slugError}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {processing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {processing ? 'Updating...' : 'Update Slug'}
            </button>

            <button
              onClick={handleRemoveSlug}
              disabled={processing}
              className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <SlugSuggestions
          suggestions={suggestions}
          loading={loadingSuggestions}
          onSelectSuggestion={handleSuggestionSelect}
          currentSlug={mode === 'name' ? preferredName : customSlug}
        />
      )}
    </div>
  );
};

export default SlugEditor;