"use client";
import React from "react";

import Template from "./components/LandingPage/Template";
import Sphere from "./components/LandingPage/Sphere";
import HeroSection from "./components/LandingPage/HeroSection";
import FeaturesSection from "./components/LandingPage/FeaturesSection";
import Footer from "./components/LandingPage/Footer";
import Navbar from "./components/LandingPage/Navbar";
import CallToAction from "./components/LandingPage/CallToAction";
import Developers from "./components/LandingPage/Developers";

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
      <Developers />
      <CallToAction />
      <Footer />

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#711381]/10 to-purple-500/10 opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default page;
