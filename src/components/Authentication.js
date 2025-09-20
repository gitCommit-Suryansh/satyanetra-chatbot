import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion, AnimatePresence } from "framer-motion";
import mandlabg from "../assets/images/mandalaart.png";

// Import the background image - make sure the path is correct
import artisanBackground from '../assets/images/artists4.jpg';

export default function Authentication({ onLoginSuccess }) {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: `url(${mandlabg})` }}>
            <div className="relative w-full max-w-4xl h-[700px] flex rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Left Side - Image */}
                <div className="w-1/2 h-full hidden lg:block">
                    <img 
                        src={artisanBackground} 
                        alt="Artisan working with pottery"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 h-full bg-[#F3EFEA] p-8 md:p-12 flex flex-col justify-center relative">
                    {/* Background SVG Decoration */}
                    <div className="absolute top-4 right-4 text-teal-800 opacity-10">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2"/>
                            <path d="M50 5L50 95" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 50L95 50" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>

                    <div className="relative z-10 w-full">
                        <h2 className="font-serif text-2xl font-bold text-teal-800 mb-4">ArtisanAI</h2>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLoginView ? 'login' : 'register'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isLoginView ? (
                                    <Login onLoginSuccess={onLoginSuccess} />
                                ) : (
                                    <Register onRegisterSuccess={() => setIsLoginView(true)} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                        
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="text-sm text-gray-600 hover:text-black hover:underline"
                            >
                                {isLoginView
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
