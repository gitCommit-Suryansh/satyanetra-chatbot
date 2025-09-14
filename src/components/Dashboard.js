import React from "react";
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
  const navigate = useNavigate();

  const tools = [
    {
      id: "chatbot",
      title: "Chat with Assistant",
      description: "Get help and guidance from your AI artisan assistant",
      icon: "💬",
      route: "/chat",
      color: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/20"
    },
    {
      id: "story-generator",
      title: "Story Generator",
      description: "Generate creative stories with audio narration",
      icon: "📚",
      route: "/tools/generate-story",
      color: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/20"
    }
  ];

  const handleNavigate = (route) => {
    console.log(`Navigate to: ${route}`);
    navigate(route);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-xl">
                <span className="text-2xl">🎨</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
                Artisan Dashboard
              </h1>
              <p className="text-lg text-purple-200 font-light max-w-2xl mx-auto">Choose your creative tool and unleash your imagination</p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                onClick={() => handleNavigate(tool.route)}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden border border-white/20 hover:border-white/40"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 ${tool.bgGlow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>
                
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${tool.color}`}></div>
                
                <div className="relative p-6">
                  {/* Icon container */}
                  <div className={`w-14 h-14 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300">
                    {tool.title}
                  </h3>
                  <p className="text-purple-200 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                    {tool.description}
                  </p>
                  
                  {/* Call to action */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${tool.color} group-hover:bg-clip-text transition-all duration-300`}>
                      <span>Get Started</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Tool number indicator */}
                    <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* User Actions */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 inline-block">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Welcome back!</div>
                    <div className="text-purple-200 text-sm">Ready to create?</div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-purple-300/70 text-sm">
              Powered by AI ✨ Built with creativity 🎨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}