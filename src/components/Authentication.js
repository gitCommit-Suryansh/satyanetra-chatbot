import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
// Framer Motion imports are not used in this specific component, but keeping them
import { motion, AnimatePresence } from "framer-motion";
import artisanBackground from '../assets/images/authenticationBG.jpg';


export default function Authentication({ onLoginSuccess }) {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
       
        <div 
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${artisanBackground})` }}
        >
            {/* 2. This new div is an overlay for the blur and brightness effect. */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md"></div>

            {/* 3. This new wrapper handles the centering and padding for the card. */}
            <div className="relative min-h-screen w-full flex items-center justify-center p-4">
                
                {/* Login/Register Card (No changes needed inside this) */}
                <div className="w-full max-w-4xl h-auto flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-black/20">
                    
                    {/* Left Side - Clear Image */}
                    <div className="w-full lg:w-1/2 h-48 lg:h-auto hidden lg:block">
                        <img 
                            src={artisanBackground} 
                            alt="Artisan working with pottery"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-1/2 bg-black/40 backdrop-blur-lg p-8 md:p-12 flex flex-col justify-center">
                        <div className="text-center mb-6">
                             <h2 className="text-white text-5xl font-serif font-bold tracking-widest">ArtisanAI</h2>
                        </div>

                        {isLoginView ? (
                            <Login onLoginSuccess={onLoginSuccess} />
                        ) : (
                            <Register onRegisterSuccess={() => setIsLoginView(true)} />
                        )}

                        <div className="text-center mt-6">
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="text-sm text-gray-400 hover:text-white hover:underline"
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