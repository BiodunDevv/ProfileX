"use client";
import React from 'react';
import URLCopyButton from './URLCopyButton';
import { Globe, Shield } from 'lucide-react';

interface SlugPreviewProps {
  customUrl?: string;
  defaultUrl?: string;
  hasCustomSlug: boolean;
}

const SlugPreview: React.FC<SlugPreviewProps> = ({
  customUrl,
  defaultUrl,
  hasCustomSlug
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={20} className="text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Your Portfolio URLs</h3>
      </div>

      {hasCustomSlug && customUrl && (
        <URLCopyButton
          url={customUrl}
          label="🎯 Custom URL (Primary)"
          type="custom"
        />
      )}

      {defaultUrl && (
        <URLCopyButton
          url={defaultUrl}
          label={hasCustomSlug ? "🔄 Default URL (Fallback)" : "🌐 Your Portfolio URL"}
          type="default"
        />
      )}

      {!hasCustomSlug && !defaultUrl && (
        <div className="bg-amber-600/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Shield size={16} />
            <span className="text-sm font-medium">No Public URL Yet</span>
          </div>
          <p className="text-amber-300 text-sm">
            Create a custom slug below to make your portfolio publicly accessible.
          </p>
        </div>
      )}

      <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-3">
        <h4 className="text-blue-300 text-sm font-medium mb-2">🛡️ Global Protection</h4>
        <p className="text-blue-200 text-xs leading-relaxed">
          Your slug is protected globally across all portfolio types. No other user can access 
          your portfolio, ensuring complete privacy and security.
        </p>
      </div>
    </div>
  );
};

export default SlugPreview;