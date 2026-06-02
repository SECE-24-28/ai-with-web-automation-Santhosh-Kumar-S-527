import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

// Create Query Client for React Query caching & state orchestration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F8FFF8] text-[#1B1B1B] flex flex-col font-sans antialiased">
          
          {/* Brand Header Navbar */}
          <Navbar />
          
          {/* Main content viewport */}
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          {/* Clean Agriculture-centric Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
            <div className="max-w-7xl mx-auto px-4">
              <p className="mb-1">
                🌿 <strong>FloraCare AI Plant Diagnostics Dashboard</strong>
              </p>
              <p>
                Powered by a completely local VGG19 CNN Inference Engine & FastAPI Offline Catalog.
              </p>
              <p className="mt-2 text-gray-400">
                &copy; {new Date().getFullYear()} FloraCare Inc. All rights reserved.
              </p>
            </div>
          </footer>
          
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
