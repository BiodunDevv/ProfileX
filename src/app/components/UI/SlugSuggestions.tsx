"use client";
import React from 'react';
import { Check, X, Loader2 } from 'lucide-react';

interface SlugSuggestion {
  slug: string;
  available: boolean;
}

interface SlugSuggestionsProps {
  suggestions: SlugSuggestion[];
  loading: boolean;
  onSelectSuggestion: (slug: string) => void;
  currentSlug: string;
}

const SlugSuggestions: React.FC<SlugSuggestionsProps> = ({
  suggestions,
  loading,
  onSelectSuggestion,
  currentSlug
}) => {
  if (loading) {
    return (
      <div className="bg-[#1E2132] border border-[#2E313C] rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Getting suggestions...</span>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1E2132] border border-[#2E313C] rounded-lg p-4">
      <h4 className="text-sm font-medium text-white mb-3">Suggested Alternatives</h4>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => suggestion.available && onSelectSuggestion(suggestion.slug)}
            disabled={!suggestion.available || suggestion.slug === currentSlug}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left
              ${suggestion.available && suggestion.slug !== currentSlug
                ? 'border-[#3E4152] hover:border-purple-500/50 hover:bg-purple-600/5 cursor-pointer'
                : 'border-[#2E313C] cursor-not-allowed opacity-50'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-gray-300">{suggestion.slug}</code>
              {suggestion.slug === currentSlug && (
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {suggestion.available ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <X size={16} className="text-red-400" />
              )}
              <span className={`text-xs ${suggestion.available ? 'text-green-400' : 'text-red-400'}`}>
                {suggestion.available ? 'Available' : 'Taken'}
              </span>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        💡 These suggestions are globally unique across all portfolio types
      </p>
    </div>
  );
};

export default SlugSuggestions;