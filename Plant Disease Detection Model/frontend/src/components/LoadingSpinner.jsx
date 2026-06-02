import React, { useState, useEffect } from "react";

export default function LoadingSpinner() {
  const [loadingText, setLoadingText] = useState("Uploading leaf image...");

  const texts = [
    "Uploading leaf image...",
    "Scanning leaf margins and veins...",
    "Running deep neural networks...",
    "Comparing features with PlantVillage dataset...",
    "Compiling agronomic treatments..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Animated Spinner Outer Ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Pulsing Central Leaf Icon */}
        <span className="text-4xl animate-pulse">🌿</span>
      </div>
      
      {/* Loading descriptive text */}
      <p className="mt-6 text-lg font-medium text-emerald-800 text-center animate-bounce">
        {loadingText}
      </p>
      
      <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
        This takes only a moment as our local neural engine processes your plant leaf.
      </p>
    </div>
  );
}
