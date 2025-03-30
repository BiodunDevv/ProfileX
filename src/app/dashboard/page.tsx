import React from "react";
import Navbar from "../components/UI/Navbar";

const page = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your dashboard!</p>
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">Your Stats</h2>
          <p className="mt-2 text-gray-600">Here you can view your stats.</p>
          {/* Add your stats components here */}
        </div>
      </div>
    </div>
  );
};

export default page;
