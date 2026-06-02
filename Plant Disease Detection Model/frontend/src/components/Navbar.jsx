import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1B4332] text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">🌿</span>
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#52B788] to-[#74C69D] bg-clip-text text-transparent">
                FloraCare AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                isActive("/") 
                  ? "text-[#52B788] border-b-2 border-[#52B788] pb-1" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Diagnostics Dashboard
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                isActive("/about") 
                  ? "text-[#52B788] border-b-2 border-[#52B788] pb-1" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About Project
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#2D6A4F] focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#2D6A4F] shadow-inner">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive("/") 
                ? "bg-[#1B4332] text-white" 
                : "text-gray-200 hover:bg-[#1B4332] hover:text-white"
            }`}
          >
            Diagnostics Dashboard
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive("/about") 
                ? "bg-[#1B4332] text-white" 
                : "text-gray-200 hover:bg-[#1B4332] hover:text-white"
            }`}
          >
            About Project
          </Link>
        </div>
      </div>
    </nav>
  );
}
