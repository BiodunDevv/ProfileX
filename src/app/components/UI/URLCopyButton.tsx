"use client";
import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

interface URLCopyButtonProps {
  url: string;
  label: string;
  type?: 'custom' | 'default';
  className?: string;
}

const URLCopyButton: React.FC<URLCopyButtonProps> = ({ 
  url, 
  label, 
  type = 'default', 
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(`${label} URL copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const openInNewTab = () => {
    window.open(url, '_blank');
  };

  const typeStyles = {
    custom: 'bg-purple-600/10 border-purple-500/30 text-purple-400',
    default: 'bg-gray-600/10 border-gray-500/30 text-gray-400'
  };

  return (
    <div className={`rounded-lg border p-4 ${typeStyles[type]} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="hover:text-white" />
            )}
          </button>
          <button
            onClick={openInNewTab}
            className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={16} className="hover:text-white" />
          </button>
        </div>
      </div>
      <div className="bg-black/20 rounded-md p-2 border border-white/5">
        <code className="text-xs font-mono text-white break-all">{url}</code>
      </div>
    </div>
  );
};

export default URLCopyButton;