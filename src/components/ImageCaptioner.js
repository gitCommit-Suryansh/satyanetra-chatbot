import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCaptioner() {
  const navigate = useNavigate();
  
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  // --- UPDATED: State to hold the entire parsed JSON object ---
  const [captionData, setCaptionData] = useState(null);
  const [activeCaptionTab, setActiveCaptionTab] = useState('short'); // To control which caption is shown
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCaptionData(null); // Reset previous results
      setError("");
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCaptionGenerate = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setCaptionData(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        apiUrl + "/caption/image-caption", 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // --- NEW: Logic to parse the string response ---
      let rawOutput = res.data.raw_output;
      
      // Clean the string by removing markdown fences
      const jsonString = rawOutput.replace(/```json\n|```/g, "").trim();
      
      // Parse the cleaned string into a JSON object
      const parsedData = JSON.parse(jsonString);
      
      setCaptionData(parsedData);
      setActiveCaptionTab('short'); // Default to the short caption view

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.detail || err.message || "Failed to generate or parse caption.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#F4EFE9] font-mono text-gray-800 p-6 overflow-y-auto">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-10 border-b-2 border-gray-200 pb-4">
          <div className="text-left">
            <h1 className="font-handwriting text-5xl font-bold text-gray-900 mb-1">
              Image Describer
            </h1>
            <p className="text-gray-600">Give your pictures a voice.</p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="font-semibold text-gray-600 hover:text-black transition-colors duration-300 group flex items-center space-x-2">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Back to Journal</span>
          </button>
        </motion.div>

        {/* Main upload card */}
        <motion.div variants={itemVariants} className="relative bg-white p-8 shadow-lg rounded-sm border border-gray-200 mb-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-300/50 backdrop-blur-sm border-l border-r border-yellow-400/60 transform rotate-1"></div>
          
          {!previewUrl && (
            <div className="text-center">
              <label htmlFor="image-upload" className="cursor-pointer block p-8 border-4 border-dashed border-gray-200 hover:border-gray-400 transition-colors rounded-md">
                <p className="font-handwriting text-2xl text-gray-600">Tap to select an image</p>
                <p className="text-gray-400 mt-2">Let's see what we're working with.</p>
              </label>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          )}

          {previewUrl && (
            <div className="mb-6">
              <p className="font-handwriting text-2xl text-gray-800 mb-4">Your selected image:</p>
              <img src={previewUrl} alt="Selected preview" className="w-full max-h-96 object-contain rounded-sm shadow-inner border border-gray-200 p-2 bg-gray-50"/>
            </div>
          )}
          
          {previewUrl && (
            <div className="flex justify-center mt-6">
              <button onClick={handleCaptionGenerate} disabled={isLoading} className="bg-gray-800 hover:bg-black disabled:bg-gray-400 text-white px-10 py-3 rounded-sm font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-md transform hover:-translate-y-0.5 disabled:transform-none">
                {isLoading ? "Analyzing..." : "Generate Caption"}
              </button>
            </div>
          )}
        </motion.div>

        {error && ( <motion.div variants={itemVariants} className="mb-8 p-4 bg-red-100 border border-red-300 text-red-800 rounded-sm">{error}</motion.div> )}

        {/* --- NEW: Result display for the detailed JSON response --- */}
        {captionData && (
          <motion.div variants={itemVariants} className="bg-white p-8 shadow-lg rounded-sm border border-gray-200">
            <h3 className="font-handwriting text-3xl text-gray-800 mb-4 border-b-2 border-dashed pb-2">The AI Muse's Findings</h3>
            
            {/* Caption Tabs */}
            <div className="mb-4">
              <div className="flex space-x-2 border-b-2 border-gray-200">
                <button onClick={() => setActiveCaptionTab('short')} className={`py-2 px-4 font-bold rounded-t-md transition-colors ${activeCaptionTab === 'short' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>Short</button>
                <button onClick={() => setActiveCaptionTab('medium')} className={`py-2 px-4 font-bold rounded-t-md transition-colors ${activeCaptionTab === 'medium' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>Medium</button>
                <button onClick={() => setActiveCaptionTab('long')} className={`py-2 px-4 font-bold rounded-t-md transition-colors ${activeCaptionTab === 'long' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>Long</button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCaptionTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-gray-50 rounded-b-md text-gray-700 text-base leading-relaxed"
                >
                  "{captionData.captions[activeCaptionTab]}"
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Analysis Labels */}
            {captionData.analysis?.labels && (
              <div>
                <h4 className="font-handwriting text-2xl text-gray-800 mt-6 mb-3">Identified Labels:</h4>
                <div className="flex flex-wrap gap-2">
                  {captionData.analysis.labels.map((label, index) => (
                    <span key={index} className="bg-stone-200 text-stone-700 text-xs font-bold px-3 py-1 rounded-full">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}