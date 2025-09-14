import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Authentication({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        </div>
  
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg p-8 text-center border-b border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-2xl">🎨</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Artisan Assistant</h1>
              <p className="text-purple-200 font-light">Connect with your creative community</p>
            </div>
  
            {/* Tabs */}
            <div className="flex border-b border-white/20">
              <button
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative ${
                  activeTab === "login"
                    ? "text-white bg-white/10"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("login")}
              >
                {activeTab === "login" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </div>
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative ${
                  activeTab === "register"
                    ? "text-white bg-white/10"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("register")}
              >
                {activeTab === "register" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Register</span>
                </div>
              </button>
            </div>
  
            {/* Content */}
            <div className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeTab === "login" ? "Welcome Back!" : "Join Artisan"}
                </h2>
                <p className="text-purple-200 text-sm">
                  {activeTab === "login" 
                    ? "Sign in to access your creative dashboard" 
                    : "Create your account to start creating"
                  }
                </p>
              </div>
  
              {activeTab === "login" ? (
                <Login onLoginSuccess={onLoginSuccess} />
              ) : (
                <Register />
              )}
  
              {/* Additional Options */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <p className="text-purple-200 text-sm mb-4">
                    {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <button
                    onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                    className="text-white font-semibold hover:text-purple-200 transition-colors duration-300 underline decoration-purple-400 hover:decoration-white"
                  >
                    {activeTab === "login" ? "Create a new account" : "Sign in instead"}
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-purple-300/70 text-sm">
              Powered by AI ✨ Built with creativity 🎨
            </p>
          </div>
        </div>
      </div>
    
  );
}
