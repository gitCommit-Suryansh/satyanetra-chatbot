import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import mandalaimg from '../assets/images/mandalaart.png'; // Import the background image
import Navbar from "./Navbar";

// --- NEW: A simple SVG for the lock icon in the nav ---
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
    </svg>
);

// --- NEW: SVG for the GuruAI avatar ---
const GuruAvatar = () => (
    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-200 shadow-md">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* This is a simplified representation of the GuruAI avatar */}
            <circle cx="24" cy="24" r="22" fill="#FFDDBB"/>
            <path d="M16 34C16 30 20 28 24 28C28 28 32 30 32 34" stroke="#A0522D" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="24" r="2" fill="#A0522D"/>
            <circle cx="28" cy="24" r="2" fill="#A0522D"/>
            <path d="M22 20C22.6667 19.3333 24 19 26 20" stroke="#A0522D" strokeWidth="2" strokeLinecap="round"/>
            <path d="M24 10C26 8 29 8 31 10L33 14C33.5 15.5 32 17 30 17H18C16 17 14.5 15.5 15 14L17 10C19 8 22 8 24 10Z" fill="#2962FF"/>
            <circle cx="24" cy="12" r="2" fill="#40E0D0"/>
        </svg>
    </div>
);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // --- NEW: Data for the popular questions ---
  const popularQuestions = [
    "Funding opportunities?",
    "Marketing tips?",
    "Marketing?",
    "Pricing strategies",
    "Legal advice?"
  ];
  
  // --- NEW: Function to handle clicking a popular question ---
  const handlePopularQuestionClick = (question) => {
    setInput(question);
    sendMessage(question); // Immediately send the message
  };

  // --- UPDATED: `sendMessage` can now optionally take a message directly ---
  const sendMessage = async (messageToSend) => {
    const userMessage = (typeof messageToSend === 'string' ? messageToSend : input).trim();
    if (!userMessage || isLoading) return;

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
        alert("Please login first");
        return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    if (typeof messageToSend !== 'string') {
        setInput("");
    }
    setIsLoading(true);

    try {
        const res = await axios.post(
            apiUrl + `/chats/${user_id}`,
            null,
            { params: { message: userMessage } }
        );
        setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || "Error fetching response";
        const displayError = typeof errorMessage === 'string' ? errorMessage : "Error fetching response";
        setMessages((prev) => [...prev, { sender: "bot", text: displayError }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    navigate("/");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    // THEME: Main container with background image
    <div 
        className="min-h-screen font-mono text-gray-800 relative bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${mandalaimg})` }}
    >
        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0   z-0" />

        {/* All content is now in a relative container to sit on top of the overlay */}
        <div className="relative z-10 p-4 md:p-6 lg:p-6">
            {/* THEME: Themed Navigation */}
            <Navbar/>

            {/* THEME: Main content area */}
            <div className="max-w-6xl mx-auto mt-2">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className=" text-5xl md:text-6xl font-bold text-gray-800">The Artisan's AI Master Guide</h1>
                    <p className="text-gray-600 mt-2 text-lg">Sophistication AI your taklet</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Chat Window */}
                    <div className="lg:col-span-2 bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex flex-col h-[70vh]">
                        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                            <AnimatePresence>
                                {/* Initial Greeting */}
                                {messages.length === 0 && (
                                    <motion.div variants={itemVariants} className="flex items-start gap-4">
                                        <GuruAvatar />
                                        <div className="bg-gray-200 p-4 rounded-xl rounded-tl-none max-w-md shadow-sm">
                                            <p>Namaste! How may I guide your journey today?</p>
                                        </div>
                                    </motion.div>
                                )}
                                
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial="hidden"
                                        animate="visible"
                                        variants={itemVariants}
                                        className={`flex items-start gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.sender === "bot" && <GuruAvatar />}
                                        <div
                                            className={`p-4 rounded-xl max-w-md shadow-sm text-white ${
                                                msg.sender === "user"
                                                ? "bg-teal-600 rounded-br-none"
                                                : "bg-gray-500 rounded-tl-none text-gray-800"
                                            }`}
                                        >
                                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div variants={itemVariants} className="flex items-start gap-4">
                                        <GuruAvatar />
                                        <div className="bg-gray-200 p-4 rounded-xl rounded-tl-none shadow-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </AnimatePresence>
                        </div>
                        {/* Input Area */}
                        <div className="mt-6 flex gap-4">
                            <input
                                type="text"
                                value={input}
                                placeholder="Type your question..."
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                disabled={isLoading}
                                className="flex-1 p-4 bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={isLoading || !input.trim()}
                                className="bg-amber-800 hover:bg-amber-900 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md"
                            >
                                Ask GuruAI
                            </button>
                        </div>
                    </div>

                    {/* Popular Questions */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold text-gray-700">Popular Questions</h3>
                        {popularQuestions.map((q, i) => (
                            <motion.button
                                key={i}
                                onClick={() => handlePopularQuestionClick(q)}
                                className="w-full text-left p-4 bg-white/70 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 hover:bg-white hover:border-amber-400 transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {q}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

