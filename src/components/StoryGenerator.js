import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion
import artists1 from "../assets/images/artists1.jpg";
import artists4 from "../assets/images/artists2.jpg";

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
      setError("Please enter a message describing the story you want to generate");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setStory("");
    setAudioBase64("");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setError("Please login first");
        setIsLoading(false);
        return;
      }
  
      const formData = new URLSearchParams();
      formData.append("user_id", user_id);
      formData.append("message", message.trim());
  
      const res = await axios.post(
        apiUrl + "/voice/generate-story",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      setStory(res.data.story_text);
      setAudioBase64(res.data.story_audio);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to generate story";
      setError(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
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

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const progress = e.target.value / 100;
      audioRef.current.currentTime = progress * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    // THEME: Main container with paper background and themed fonts
    <div className="min-h-screen bg-[#F4EFE9] font-mono text-gray-800 overflow-hidden">
      
      {/* THEME: Decorative images for consistency */}
      <motion.img src={artists1} alt="Decorative artist hands" className="absolute top-0 right-0 w-48 h-auto border-4 border-white shadow-lg hidden lg:block z-0" style={{ top: '2rem', right: '2rem', rotate: '8deg' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.7 } }} />
      <motion.img src={artists4} alt="Decorative inspiration" className="absolute bottom-0 left-0 w-40 h-auto border-4 border-white shadow-lg hidden lg:block z-0" style={{ bottom: '2rem', left: '2rem', rotate: '-5deg' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.7 } }} />

      <div className="relative z-10 p-6">
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* THEME: Themed Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-10 border-b-2 border-gray-200 pb-4">
            <div className="text-left">
              <h1 className="font-handwriting text-5xl font-bold text-gray-900 mb-1">
                Story Weaver
              </h1>
              <p className="text-gray-600">
                Let's write a new page together.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="font-semibold text-gray-600 hover:text-black transition-colors duration-300 group flex items-center space-x-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span>Back to Journal</span>
            </button>
          </motion.div>

          {/* THEME: Input card styled like a pasted note */}
          <motion.div variants={itemVariants} className="relative bg-white p-8 shadow-lg rounded-sm border border-gray-200 mb-8" style={{ transform: 'rotate(-1deg)' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-300/50 backdrop-blur-sm border-l border-r border-yellow-400/60 transform rotate-1"></div>
            <h3 className="font-handwriting text-3xl font-bold text-gray-800 mb-4">Craft Your Prompt</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A brave knight in a forest of whispers..."
              className="w-full p-4 bg-stone-50 border-2 border-dashed border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 text-gray-700 placeholder-gray-400 resize-none text-base transition-all duration-300"
              rows={4}
              disabled={isLoading}
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={generateStory}
                disabled={isLoading || !message.trim()}
                className="bg-gray-800 hover:bg-black disabled:bg-gray-400 text-white px-10 py-3 rounded-sm font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-md transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Weaving...</span>
                  </>
                ) : (
                  <span>Generate Story</span>
                )}
              </button>
            </div>
          </motion.div>

          {/* THEME: Themed Error Message */}
          {error && (
            <motion.div variants={itemVariants} className="mb-8 p-4 bg-red-100 border border-red-300 text-red-800 rounded-sm">
              {error}
            </motion.div>
          )}

          {/* THEME: Story result card */}
          {story && (
            <motion.div variants={itemVariants} className="bg-white p-8 shadow-lg rounded-sm border border-gray-200 mb-8" style={{ transform: 'rotate(1deg)' }}>
              <h2 className="font-handwriting text-3xl font-bold text-gray-800 mb-4">Your Unfolded Tale</h2>
              
              {/* THEME: Themed Audio Player */}
              {audioBase64 && (
                <div className="mb-6 p-4 bg-stone-50 rounded-sm border-2 border-dashed border-stone-200">
                  <audio ref={audioRef} src={`data:audio/mp3;base64,${audioBase64}`} preload="metadata" />
                  <div className="flex items-center space-x-4">
                    <button onClick={toggleAudio} className="bg-gray-800 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300">
                      {isPlaying ? '❚❚' : '►'}
                    </button>
                    <div className="flex-1 flex items-center space-x-3">
                      <span className="text-gray-500 text-sm min-w-[40px]">{formatTime(currentTime)}</span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0" max="100" value={progress}
                          onChange={handleSeek}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          style={{ background: `linear-gradient(to right, #333 ${progress}%, #ddd ${progress}%)` }}
                        />
                      </div>
                      <span className="text-gray-500 text-sm min-w-[40px]">{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap tracking-wide">
                {story}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* THEME: Custom styles for the audio slider to match the new theme */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #333; /* Themed thumb color */
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #333; /* Themed thumb color */
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}