import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Welcome to the dashboard!</p>
      <div className="mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          User Statistics
        </h2>
        {/* Add your user statistics components here */}
      </div>
    </div>
  );
};

export default page;
