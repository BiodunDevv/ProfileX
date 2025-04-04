import React from "react";
import { Globe, Layout, Palette, Share2 } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Globe className="text-[#711381]" size={40} />,
      title: "Global Reach",
      description: "Create a portfolio that stands out worldwide",
    },
    {
      icon: <Layout className="text-[#711381]" size={40} />,
      title: "Stunning Layouts",
      description: "Choose from professional, modern design templates",
    },
    {
      icon: <Palette className="text-[#711381]" size={40} />,
      title: "Custom Branding",
      description: "Personalize every aspect of your portfolio",
    },
    {
      icon: <Share2 className="text-[#711381]" size={40} />,
      title: "Easy Sharing",
      description: "Share your portfolio with a single click",
    },
  ];

  return (
    <section id="features" className="relative z-10 px-2 sm:px-6 py-16 md:py-24 bg-[#272932]/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
            Why Choose ProfileX?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We provide everything you need to create a portfolio that truly
            represents you.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2E313C] p-6 rounded-lg hover:scale-105 transition-transform"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
