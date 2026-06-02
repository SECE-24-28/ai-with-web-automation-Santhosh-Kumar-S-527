import React from "react";

export default function About() {
  const supportedCrops = [
    { name: "Apple", icon: "🍎", diseases: "Apple Scab, Black Rot, Cedar Apple Rust, Healthy" },
    { name: "Blueberry", icon: "🫐", diseases: "Healthy" },
    { name: "Cherry", icon: "🍒", diseases: "Powdery Mildew, Healthy" },
    { name: "Corn", icon: "🌽", diseases: "Gray Leaf Spot, Common Rust, Northern Leaf Blight, Healthy" },
    { name: "Grape", icon: "🍇", diseases: "Black Rot, Esca (Black Measles), Leaf Blight, Healthy" },
    { name: "Orange", icon: "🍊", diseases: "Citrus Greening (Huanglongbing)" },
    { name: "Peach", icon: "🍑", diseases: "Bacterial Spot, Healthy" },
    { name: "Pepper Bell", icon: "🫑", diseases: "Bacterial Spot, Healthy" },
    { name: "Potato", icon: "🥔", diseases: "Early Blight, Late Blight, Healthy" },
    { name: "Raspberry", icon: "🍓", diseases: "Healthy" },
    { name: "Soybean", icon: "🌱", diseases: "Healthy" },
    { name: "Squash", icon: "🎃", diseases: "Powdery Mildew" },
    { name: "Strawberry", icon: "🍓", diseases: "Leaf Scorch, Healthy" },
    { name: "Tomato", icon: "🍅", diseases: "Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Spot, Spider Mites, Target Spot, Yellow Leaf Curl, Mosaic Virus, Healthy" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 transition-all duration-300">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          About the{" "}
          <span className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">
            FloraCare AI Project
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          A production-ready offline agricultural diagnostic dashboard designed to assist farmers, botanists, and gardeners with instant agronomic treatments.
        </p>
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Core Concept Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2 text-xl">🧬</span> Neural Architecture
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The core diagnostic system leverages a fine-tuned deep **Convolutional Neural Network (CNN)** based on the industry-standard **VGG19** model configuration.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The neural weights are contained locally within `best_model.h5` inside the FastAPI backend. By passing the leaf image through 16 convolutional feature extraction layers and max-pooling filters, the network maps the spatial leaf damage characteristics to one of 38 biological classes.
          </p>
          <div className="bg-[#F4F9F4] rounded-xl p-4 border border-emerald-100 flex items-start space-x-3">
            <span className="text-2xl text-emerald-600 mt-0.5">🔒</span>
            <div>
              <h4 className="font-bold text-emerald-800 text-sm">100% Offline Capability</h4>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Both the CNN model inference and the comprehensive agronomic recommendation catalog operate entirely locally on the server. No internet access, external LLMs, or cloud API dependencies are used, ensuring rapid response times and perfect field reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="bg-[#1B4332] rounded-2xl text-white shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2 text-lg">🛠️</span> Tech Stack Specs
            </h2>
            <ul className="space-y-3.5 text-sm text-gray-200">
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>FastAPI:</strong> High-performance async Python backend
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>TensorFlow / Keras:</strong> CNN model loading & inference
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>Pillow (PIL) & NumPy:</strong> High-speed image pre-processing
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>React.js & Vite:</strong> Single-Page Frontend Client
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>React Query (TanStack):</strong> Server state management
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                <strong>Tailwind CSS:</strong> Rich, modern responsive styles
              </li>
            </ul>
          </div>
          <div className="mt-6 border-t border-emerald-800 pt-4 text-xs text-gray-300 text-center">
            FloraCare AI System • Version 1.0.0
          </div>
        </div>

      </div>

      {/* Supported crops and diseases catalog section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🍀 Supported Crops & Leaf Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportedCrops.map((crop, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4">
              <div className="text-3xl p-3 bg-gray-50 rounded-xl">{crop.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{crop.name}</h3>
                <p className="text-xs text-emerald-800 font-semibold mb-1">Diagnoses covered:</p>
                <p className="text-gray-500 text-xs leading-relaxed">{crop.diseases}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
