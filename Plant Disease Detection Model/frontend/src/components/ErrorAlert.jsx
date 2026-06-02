import React from "react";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 my-6 shadow-md transition-all duration-300 max-w-xl mx-auto">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-3xl" role="img" aria-label="error">⚠️</span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-red-800">Diagnostics Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message || "An unexpected error occurred while analyzing the leaf image. Please check your image format and try again."}</p>
          </div>
          
          <div className="mt-4 flex space-x-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 border border-red-600 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Try Again
              </button>
            )}
            
            <a
              href="file:///e:/Model/README.md"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
