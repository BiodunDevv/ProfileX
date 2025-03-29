"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

import Template from "./components/LandingPage/Template";
import Sphere from "./components/LandingPage/Sphere";
import Navbar from "./components/LandingPage/Navbar";
import HeroSection from "./components/LandingPage/HeroSection";
import FeaturesSection from "./components/LandingPage/FeaturesSection";
import Footer from "./components/LandingPage/Footer";

const page = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A] text-white min-h-screen overflow-hidden">
      {/* Background Images */}
      <Sphere />

      {/* Main Content */}
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Template />

      {/* Call to Action */}
      <section className="relative z-10 px-6 py-16 md:py-24 bg-[#272932]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
            Start Your Professional Journey Today
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Create a portfolio that opens doors, showcases your talents, and
            sets you apart in today&apos;s competitive landscape.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#711381] to-purple-600 px-6 py-3 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all flex items-center"
            >
              Create Your Portfolio
              <Star className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#711381]/10 to-purple-500/10 opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default page;
