import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar"; // Using the consistent Navbar
import mandalaimg from '../assets/images/mandalaart.png'; // Import the background image

// --- Helper Icons for the UI ---
const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

const KathaAIAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" fill="#FFDDBB"/><path d="M16 34C16 30 20 28 24 28C28 28 32 30 32 34" stroke="#A0522D" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="24" r="2" fill="#A0522D"/><circle cx="28" cy="24" r="2" fill="#A0522D"/><path d="M22 20C22.6667 19.3333 24 19 26 20" stroke="#A0522D" strokeWidth="2" strokeLinecap="round"/><path d="M24 10C26 8 29 8 31 10L33 14C33.5 15.5 32 17 30 17H18C16 17 14.5 15.5 15 14L17 10C19 8 22 8 24 10Z" fill="#2962FF"/><circle cx="24" cy="12" r="2" fill="#40E0D0"/></svg>
    </div>
);

export default function ImageCaptioner() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [captionData, setCaptionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // --- NEW: State for the story options on the right panel ---
    const [length, setLength] = useState("Medium");
    const [tone, setTone] = useState("Poetic");

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCaptionData(null);
            setError("");
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCaptionGenerate = async () => {
        if (!imageFile) {
            setError("Please upload a product photo first.");
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
            const rawOutput = res.data.raw_output;
            const jsonString = rawOutput.replace(/```json\n|```/g, "").trim();
            const parsedData = JSON.parse(jsonString);
            setCaptionData(parsedData);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || err.message || "Failed to generate caption.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Helper to generate hashtags from labels
    const generateHashtags = (labels) => {
        if (!labels) return '';
        return labels.slice(0, 3).map(label => `#${label.replace(/\s+/g, '')}`).join(' ');
    };

    return (
        <div className="flex flex-col font-serif min-h-screen p-4 md:p-6 lg:p-6 text-gray-800" style={{ backgroundImage: `url(${mandalaimg})` }}>
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">Craft Your Story: AI Caption Generator</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Interaction Window */}
                        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <KathaAIAvatar />
                                    <span className="font-semibold text-lg">Kala-Sarthi</span>
                                </div>
                                <div className="p-2 rounded-full hover:bg-gray-200/50 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>

                            {/* Upload and Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-50/50 transition-colors h-52">
                                    <CameraIcon />
                                    <span className="mt-2 font-semibold text-gray-600">Upload Product Photo</span>
                                </label>
                                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                
                                <div className="bg-gray-100 rounded-2xl h-52 flex items-center justify-center">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg"/>
                                    ) : (
                                        <div className="text-gray-500">Image Preview</div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Generated Captions */}
                            {isLoading && <div className="text-center py-10 font-bold text-lg animate-pulse">Generating Content...</div>}
                            {error && <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-xl">{error}</div>}

                            {captionData && (
                                <div className="space-y-4">
                                    <h3 className="font-serif text-2xl font-bold">Generated Instagram Content</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(Object.keys(captionData.captions)).map(key => (
                                            <div key={key} className="bg-white/80 p-4 rounded-xl shadow-sm border border-gray-200 transform ">
                                                <p className="text-gray-700">{captionData.captions[key]}</p>
                                                <p className="mt-2 text-teal-600 font-semibold text-sm">{generateHashtags(captionData.analysis?.labels)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            )}

                        </div>

                        {/* Story Options Panel */}
                        <div className="space-y-6">
                            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 space-y-4">
                                <h3 className="font-serif text-xl font-bold text-gray-700">Story Options</h3>
                                <div>
                                    <label className="font-semibold text-gray-600">Length</label>
                                    <div className="flex gap-2 mt-2">
                                        {["Short", "Medium", "Long"].map(l => (
                                            <button key={l} onClick={() => setLength(l)} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${length === l ? 'bg-amber-800 text-white' : 'bg-white border hover:bg-gray-100'}`}>{l}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="font-semibold text-gray-600">Tone</label>
                                    <div className="flex gap-2 mt-2">
                                        {["Poetic", "Formal", "Casual"].map(t => (
                                            <button key={t} onClick={() => setTone(t)} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${tone === t ? 'bg-amber-800 text-white' : 'bg-white border hover:bg-gray-100'}`}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={handleCaptionGenerate}
                                    disabled={isLoading || !imageFile}
                                    className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-bold shadow-md hover:from-amber-700 hover:to-amber-800 disabled:from-gray-400 disabled:to-gray-500 transition-all"
                                >
                                    {isLoading ? "Generating..." : "Generate Story"}
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Chat Button */}
            <div className="fixed bottom-8 right-8 z-20">
                <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                     <KathaAIAvatar />
                </button>
            </div>
        </div>
    );
}
