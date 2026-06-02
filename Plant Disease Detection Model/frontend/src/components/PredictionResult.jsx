import React from "react";

export default function PredictionResult({ predictedClass, confidence, diseaseInfo }) {
  // Parsing standard names
  const cleanName = diseaseInfo?.name || predictedClass.replace("___", " ").replace(/_/g, " ");
  const plantName = diseaseInfo?.plant || cleanName.split(" ")[0];
  const severity = diseaseInfo?.severity || "Medium";

  // Classify severity colors
  const getSeverityStyles = (level) => {
    switch (level.toLowerCase()) {
      case "healthy":
        return {
          bg: "bg-green-50 border-green-200",
          text: "text-green-800",
          badge: "bg-green-500 text-white",
          label: "Optimal Health",
        };
      case "medium":
      case "moderate":
        return {
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-800",
          badge: "bg-amber-500 text-white",
          label: "Moderate Threat",
        };
      case "high":
      case "severe":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          badge: "bg-red-500 text-white",
          label: "High Danger",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          text: "text-gray-800",
          badge: "bg-gray-500 text-white",
          label: "Unknown Status",
        };
    }
  };

  const styles = getSeverityStyles(severity);

  // Classify confidence dial colors
  const getConfidenceColor = (score) => {
    if (score >= 90) return "text-emerald-500 stroke-emerald-500";
    if (score >= 70) return "text-amber-500 stroke-amber-500";
    return "text-red-500 stroke-red-500";
  };

  const strokeColor = getConfidenceColor(confidence);

  return (
    <div className={`border rounded-2xl p-6 shadow-md transition-all duration-300 ${styles.bg} max-w-2xl mx-auto my-6`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* Class name and details */}
        <div className="flex-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${styles.badge}`}>
            {styles.label}
          </span>
          <h2 className={`text-2xl font-bold tracking-tight mb-1 ${styles.text}`}>
            {cleanName}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
            <div>
              <span className="font-semibold text-gray-800">Crop Host: </span>
              {plantName}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div>
              <span className="font-semibold text-gray-800">Diagnoses: </span>
              {diseaseInfo?.disease_type || "N/A"}
            </div>
          </div>
        </div>

        {/* Circular Confidence Meter */}
        <div className="flex items-center space-x-4 sm:flex-col sm:space-x-0 sm:space-y-1 justify-center">
          <div className="relative w-20 h-20">
            {/* SVG Circle Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200 stroke-gray-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`transition-all duration-1000 ease-out ${strokeColor}`}
                strokeWidth="3.2"
                strokeDasharray={`${confidence}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-gray-800">{confidence}%</span>
              <span className="text-[8px] font-semibold text-gray-500 uppercase tracking-widest leading-none">Conf</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
