import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center">
        {/* Spinner */}
        <div className="border-t-4 border-green border-solid w-24 h-24 rounded-full animate-spin mb-4"></div>
        {/* Loading Text */}
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

