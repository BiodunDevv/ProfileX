"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/UI/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuthStore();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  if (!isAuthenticated) {
    return null; // Or a loading state
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your dashboard{user?.name ? `, ${user.name}` : ''}!</p>
        
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">Your Stats</h2>
          <p className="mt-2 text-gray-600">Here you can view your stats.</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;