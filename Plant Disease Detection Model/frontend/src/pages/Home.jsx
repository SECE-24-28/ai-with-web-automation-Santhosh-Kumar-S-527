import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { analyzeDisease } from "../api/predictionApi";
import ImageUploader from "../components/ImageUploader";
import PredictionResult from "../components/PredictionResult";
import DiseaseInfoCard from "../components/DiseaseInfoCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Set up mutation for the async file POST to the analyze endpoint
  const mutation = useMutation({
    mutationFn: (file) => analyzeDisease(file),
    onSuccess: (data) => {
      console.log("Analysis success:", data);
    },
    onError: (err) => {
      console.error("Analysis error:", err);
    }
  });

  const handleImageSelected = (file) => {
    setSelectedFile(file);
    if (file) {
      mutation.mutate(file);
    } else {
      mutation.reset();
    }
  };

  const handleRetry = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-all duration-300">
      {/* Hero Welcome Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-none">
          Automated Plant Disease{" "}
          <span className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">
            Diagnostics Engine
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Upload clear close-up photographs of affected plant leaves to run neural inference and receive immediate, database-driven organic and chemical remediation treatments offline.
        </p>
      </div>

      {/* Main interaction deck */}
      <div className="space-y-8">
        <ImageUploader 
          onImageSelected={handleImageSelected} 
          isAnalyzing={mutation.isPending} 
        />

        {/* Dynamic State Layouts */}
        {mutation.isPending && <LoadingSpinner />}

        {mutation.isError && (
          <ErrorAlert 
            message={
              mutation.error?.response?.data?.detail || 
              "Failed to reach the local diagnostics server. Please make sure the FastAPI backend is running on port 8000."
            } 
            onRetry={handleRetry}
          />
        )}

        {mutation.isSuccess && mutation.data && (
          <div className="space-y-6 animate-fadeIn">
            <PredictionResult 
              predictedClass={mutation.data.predicted_class} 
              confidence={mutation.data.confidence} 
              diseaseInfo={mutation.data.disease_info}
            />
            
            <DiseaseInfoCard 
              diseaseInfo={mutation.data.disease_info} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
