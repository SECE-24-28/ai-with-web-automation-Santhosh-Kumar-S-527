import React, { useState } from "react";

export default function DiseaseInfoCard({ diseaseInfo }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!diseaseInfo) return null;

  const tabs = [
    { id: "overview", label: "🌿 Overview & Causes", icon: "📖" },
    { id: "symptoms", label: "⚠️ Symptoms", icon: "🔍" },
    { id: "treatments", label: "🛡️ Treatment Methods", icon: "💊" },
    { id: "prevention", label: "🔒 Prevention Rules", icon: "🛑" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden max-w-4xl mx-auto my-8 transition-all duration-300">
      
      {/* Navigation Tabs Header */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold tracking-wide border-b-2 transition-all duration-300 whitespace-nowrap focus:outline-none ${
              activeTab === tab.id
                ? "border-emerald-600 text-emerald-800 bg-white"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Display Panels */}
      <div className="p-6 sm:p-8 min-h-[300px]">
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2.5">Disease Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {diseaseInfo.description}
              </p>
            </div>
            
            {diseaseInfo.causes && diseaseInfo.causes.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Core Disease Causes</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {diseaseInfo.causes.map((cause, index) => (
                    <li key={index} className="flex items-start bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                      <span className="text-emerald-600 mr-2.5 mt-0.5 text-base">📌</span>
                      <span className="text-gray-600 text-sm">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "symptoms" && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Key Identification Symptoms</h3>
            {diseaseInfo.symptoms && diseaseInfo.symptoms.length > 0 ? (
              <ul className="space-y-3.5">
                {diseaseInfo.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start bg-red-50/30 rounded-xl p-4 border border-red-100/50">
                    <span className="text-red-500 mr-3 mt-0.5 text-lg">💡</span>
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{symptom}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No specific active symptoms reported.</p>
            )}
          </div>
        )}

        {activeTab === "treatments" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-emerald-800 mb-3">Actionable Remediation Solutions</h3>
              {diseaseInfo.treatments && diseaseInfo.treatments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {diseaseInfo.treatments.map((treatment, index) => (
                    <div key={index} className="flex items-start bg-emerald-50/30 rounded-xl p-4 border border-emerald-100/50">
                      <span className="text-emerald-600 mr-3 mt-0.5 text-lg">🛡️</span>
                      <div>
                        <span className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">
                          {treatment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No immediate chemical treatments required. Focus on standard maintenance.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "prevention" && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Future Protection & Prevention Rules</h3>
            {diseaseInfo.prevention && diseaseInfo.prevention.length > 0 ? (
              <ul className="space-y-3.5">
                {diseaseInfo.prevention.map((prev, index) => (
                  <li key={index} className="flex items-start bg-[#F4F9F4] rounded-xl p-4 border border-emerald-100">
                    <span className="text-emerald-600 mr-3 mt-0.5 text-lg">🔒</span>
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{prev}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No special prevention strategies defined.</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
