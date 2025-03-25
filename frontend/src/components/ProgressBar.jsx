"use client";

import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-[90%] bg-gray-300 rounded-full h-6 overflow-hidden">
      <div
        className="bg-blue-500 h-full text-white text-center text-sm font-bold flex items-center justify-center transition-all duration-300"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
