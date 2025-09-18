import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion, AnimatePresence } from "framer-motion";
import artists1 from "../assets/images/artists1.jpg";


export default function Authentication({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  
  return (
    // THEME: Main container with paper background and themed fonts
    <div className="min-h-screen bg-[#F4EFE9] font-mono text-gray-800 flex items-center justify-center p-4 overflow-hidden">
      
      {/* THEME: Decorative image in the corner */}
      <motion.img 
        src={artists1} 
        alt="Artist's hands" 
        className="absolute bottom-0 right-0 w-64 h-auto border-8 border-white shadow-2xl hidden lg:block"
        style={{ bottom: '-2rem', right: '-3rem', rotate: '15deg' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
      />
      
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* THEME: The main card styled as a pasted piece of paper */}
        <div className="relative bg-white shadow-2xl rounded-sm border border-gray-200" style={{ transform: 'rotate(-1deg)' }}>
          {/* THEME: Decorative tape element */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-300/50 backdrop-blur-sm border-l border-r border-yellow-400/60 transform rotate-2"></div>

          {/* THEME: Themed Header */}
          <div className="p-8 text-center border-b-2 border-dashed border-gray-200">
            <h1 className="font-handwriting text-5xl font-bold text-gray-900 mb-2">
              Artisan Assistant
            </h1>
            <p className="text-gray-500">The start of a new chapter.</p>
          </div>
          
          {/* THEME: Themed Tabs styled like notebook tabs */}
          <div className="relative flex justify-center -mb-px">
            <button
              className={`py-3 px-8 font-bold transition-colors duration-300 border-gray-200 rounded-t-md ${
                activeTab === "login"
                  ? "bg-white border-t-2 border-x-2 z-10 text-gray-800"
                  : "bg-gray-100 border-b-2 text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`py-3 px-8 font-bold transition-colors duration-300 border-gray-200 rounded-t-md ${
                activeTab === "register"
                  ? "bg-white border-t-2 border-x-2 z-10 text-gray-800"
                  : "bg-gray-100 border-b-2 text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Content */}
          <div className="p-8 bg-white border-t-2 border-gray-200">
             <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "login" ? (
                  <Login onLoginSuccess={onLoginSuccess} />
                ) : (
                  <Register />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Switch Tabs Link */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <button
                onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                className="text-gray-600 font-semibold hover:text-black transition-colors duration-300 underline"
              >
                {activeTab === "login" ? "Need to create an account?" : "Already have an account?"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}