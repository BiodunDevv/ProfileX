"use client";
import React from "react";
import { LayoutGrid } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] py-2 sm:py-4 px-2 sm:px-4">
      <div>
        <div className="text-center mb-10 opacity-100 translate-y-0 transition-all duration-500">
          <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
            <LayoutGrid size={14} className="mr-1.5" />
            Template Editor
          </div>
          <h1 className="text-[28px] font-bold text-white mb-4">
            Customize Your Profile
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Personalize your portfolio by providing the information below. All
            fields can be customized to showcase your unique skills and
            projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
