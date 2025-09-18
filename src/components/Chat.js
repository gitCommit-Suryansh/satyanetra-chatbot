import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import artists3 from "../assets/images/artists3.png";


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Demo user_id check - replace with your localStorage check
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("Please login first");
      return;
    }

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    

    
    try {
      const res = await axios.post(
        apiUrl + `/chats/${user_id}`,
        null,
        {
          params: {
            message: userMessage,
          },
        }
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
    // Replace with your actual logout logic
    console.log("Logout clicked - implement your localStorage removal here");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // ✅ navigate to dashboard
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Animation variants for consistency
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    // THEME: Main container with paper background and themed fonts
    <div className="flex flex-col h-screen bg-[#F4EFE9] font-mono text-gray-800 overflow-hidden">
      {/* THEME: Decorative image */}
      <motion.img src={artists3} alt="Decorative sketch" className="absolute top-4 left-4 w-32 h-auto hidden lg:block z-0 opacity-50" style={{ rotate: '10deg' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.5, scale: 1, transition: { delay: 0.5, duration: 0.7 } }} />

      {/* THEME: Themed Header */}
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white/80 backdrop-blur-sm border-b-2 border-gray-200 p-4 shadow-sm z-20">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-handwriting text-2xl">A</div>
            <h1 className="font-handwriting text-3xl font-bold text-gray-900">Artisan Assistant</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={goToDashboard} className="font-semibold text-gray-600 hover:text-black transition-colors duration-300">
              Back to Journal
            </button>
            <button onClick={handleLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-sm font-bold transition-colors text-sm">
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* THEME: Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <motion.div 
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-12 text-gray-500">
              <p className="font-handwriting text-4xl mb-2">Ready for a chat?</p>
              <p>Ask for ideas, feedback, or just a little inspiration.</p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`flex items-end gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && <div className="font-handwriting text-2xl w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center self-start">A</div>}
                <div
                  className={`p-4 rounded-lg max-w-lg shadow-sm border ${
                    msg.sender === "user"
                      ? "bg-stone-200 border-stone-300 rounded-br-none"
                      : "bg-white border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div variants={itemVariants} className="flex items-end gap-3 justify-start">
              <div className="font-handwriting text-2xl w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center self-start">A</div>
              <div className="bg-white border-gray-200 rounded-lg rounded-bl-none p-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Thinking</span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* THEME: Themed Input Area */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white/80 backdrop-blur-sm border-t-2 border-gray-200 p-4 shadow-sm z-20">
        <div className="max-w-3xl mx-auto flex space-x-4">
          <input
            type="text"
            value={input}
            placeholder="Jot down your thoughts..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
            className="flex-1 p-3 bg-stone-100 border-2 border-dashed border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 text-gray-700 placeholder-gray-400 disabled:cursor-not-allowed transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gray-800 hover:bg-black disabled:bg-gray-400 text-white px-8 py-3 rounded-sm font-bold transition-colors shadow-md transform hover:-translate-y-0.5"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}