import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // Import the shared Navbar
import mandalaimg from '../assets/images/mandalaart.png'; // Import the background image


export default function StoryGenerator() {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [story, setStory] = useState("");
    const [audioBase64, setAudioBase64] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    // --- NEW: Data for the popular prompts section ---
    const popularPrompts = [
        "A lost city found in the Himalayas",
        "The diary of a time-traveling artist",
        "A friendly robot who wants to learn painting",
        "A story about a magical spice market"
    ];
    
    // --- NEW: Function to handle clicking a popular prompt ---
    const handlePopularPromptClick = (prompt) => {
        setMessage(prompt);
    };

    useEffect(() => {
        if (audioBase64 && audioRef.current) {
            const audio = audioRef.current;
            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);
            const handleEnd = () => setIsPlaying(false);
            
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleEnd);
            
            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleEnd);
            };
        }
    }, [audioBase64]);

    const generateStory = async () => {
        if (!message.trim()) {
            setError("Please enter a message describing the story.");
            return;
        }
        setIsLoading(true);
        setError("");
        setStory("");
        setAudioBase64("");
        try {
            const user_id = localStorage.getItem("user_id");
            if (!user_id) {
                setError("Please login first.");
                setIsLoading(false);
                return;
            }
            const formData = new URLSearchParams();
            formData.append("user_id", user_id);
            formData.append("message", message.trim());
            const res = await axios.post(
                apiUrl + "/voice/generate-story",
                formData,
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            setStory(res.data.story_text);
            setAudioBase64(res.data.story_audio);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || err.message || "Failed to generate story";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = (e.target.value / 100) * duration;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

    return (
        <div className="flex flex-col h-screen text-gray-800 p-4 md:p-6 lg:p-6 font-serif" style={{ backgroundImage: `url(${mandalaimg})` }}>
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className=" text-5xl md:text-6xl font-bold text-gray-800">The Artisan's AI Master Guide</h1>
                        <p className="text-gray-600 mt-2 text-lg">Weave your narratives with the power of AI</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Interaction Window */}
                        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6">
                            {/* Input Section */}
                            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                                <h3 className=" text-3xl font-bold text-gray-700 mb-4">Describe Your Story</h3>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="e.g., A heartwarming tale about a friendship between mystical creatures..."
                                    className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                                    rows={4}
                                    disabled={isLoading}
                                />
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={generateStory}
                                        disabled={isLoading || !message.trim()}
                                        className="bg-amber-800 hover:bg-amber-900 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md transform hover:scale-105"
                                    >
                                        {isLoading ? "Weaving Magic..." : "Generate Story"}
                                    </button>
                                </div>
                            </motion.div>
                            
                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-xl">
                                    {error}
                                </motion.div>
                            )}

                            {/* Story Result Section */}
                            {story && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-6 border-t border-gray-300/80">
                                    <h3 className="font-serif text-3xl font-bold text-gray-700 mb-4">Your Unfolded Tale</h3>
                                    {audioBase64 && (
                                        <div className="mb-6 p-4 bg-gray-100/80 rounded-xl">
                                            <audio ref={audioRef} src={`data:audio/mp3;base64,${audioBase64}`} preload="metadata" />
                                            <div className="flex items-center space-x-4">
                                                <button onClick={toggleAudio} className="bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors text-xl">
                                                    {isPlaying ? '❚❚' : '►'}
                                                </button>
                                                <div className="flex-1 flex items-center space-x-3">
                                                    <span className="text-gray-600 text-sm min-w-[40px]">{formatTime(currentTime)}</span>
                                                    <input
                                                        type="range"
                                                        min="0" max="100" value={progress}
                                                        onChange={handleSeek}
                                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                                                        style={{ background: `linear-gradient(to right, #0d9488 ${progress}%, #d1d5db ${progress}%)` }}
                                                    />
                                                    <span className="text-gray-600 text-sm min-w-[40px]">{formatTime(duration)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto pr-2">
                                        {story}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Popular Prompts */}
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl font-bold text-gray-700">Popular Prompts</h3>
                            {popularPrompts.map((q, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => handlePopularPromptClick(q)}
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
            </main>
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none; appearance: none;
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: #0d9488;
                    cursor: pointer;
                }
                .slider::-moz-range-thumb {
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: #0d9488;
                    cursor: pointer; border: none;
                }
            `}</style>
        </div>
    );
}
