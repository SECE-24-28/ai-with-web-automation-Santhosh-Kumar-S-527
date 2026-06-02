import React, { useState, useRef } from "react";

export default function ImageUploader({ onImageSelected, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Basic validations
    if (!file.type.startsWith("image/")) {
      alert("Invalid file format. Please upload an image file (JPEG, PNG, WebP).");
      return;
    }
    
    // Preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    
    onImageSelected(file);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClear = () => {
    setPreviewUrl(null);
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      {!previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`border-3 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-emerald-500 bg-emerald-50 scale-[1.01] shadow-emerald-100"
              : "border-gray-300 bg-white hover:border-emerald-400 hover:bg-[#F8FFF8] hover:shadow-md"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleChange}
            disabled={isAnalyzing}
          />
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
            <span className="text-4xl text-emerald-600">📸</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Upload Plant Leaf Image
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
            Drag and drop your leaf photograph here, or click to browse files from your device.
          </p>
          
          <button
            type="button"
            className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#205823] text-white font-medium text-sm transition-all duration-300 hover:shadow-md active:scale-95"
            disabled={isAnalyzing}
          >
            Select Image File
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            Supports JPEG, JPG, PNG, and WebP formats. Max 10MB file size.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg transition-all duration-300">
          <div className="relative aspect-video bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
            <img
              src={previewUrl}
              alt="Leaf Preview"
              className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[1px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-600 text-lg">📁</span>
              <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                Leaf image selected
              </span>
            </div>
            
            <button
              onClick={handleClear}
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 font-medium text-xs transition-colors duration-200"
              disabled={isAnalyzing}
            >
              Change Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
