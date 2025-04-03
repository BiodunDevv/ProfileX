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
    <div className="bg-gradient-to-br from-[#17181E] via-[#1F2029] to-[#2A2D3A] text-white min-h-screen">
      {/* Background Images */}
      <Sphere />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Template />
      <Developers />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default page;
