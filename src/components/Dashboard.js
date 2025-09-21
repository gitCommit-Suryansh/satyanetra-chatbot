import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RotatingPot from "./RotatingPot"; // <-- IMPORT the new 3D component
import RotatingVase from "./RotatingVase"; // <-- IMPORT the new Vase component
import RotatingPots from "./RotatingPots";

import artists3 from "../assets/images/artists3.png";
import artists4 from "../assets/images/artists4.jpg";
import mandlabg from "../assets/images/mandalaart.png";
import Navbar from "./Navbar";
import logo1 from '../assets/images/logo1.jpg';
import logo2 from '../assets/images/logo2.jpg';
import logo3 from '../assets/images/logo3.jpg';
import WaterRipplesFilter from "./WaterRipplesFilter";


// A custom hook for the typewriter effect
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [exitingCard, setExitingCard] = useState(null);

  const aiSuggestions = [
    "Try creating something using only primary colors today.",
    "Write a short story that starts with the last sentence you spoke.",
    "Find an everyday object and draw it from memory.",
    "Listen to a new genre of music and paint what you feel.",
    "The best art is born from the strongest emotions.",
    "Combine two unlikely materials in your next piece.",
    "Don't be afraid to make mistakes; they are portals of discovery.",
    "Challenge: Create something meaningful in under 10 minutes.",
  ];

  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const dailySuggestion = aiSuggestions[dayOfYear % aiSuggestions.length];
  const typedSuggestion = useTypewriter(dailySuggestion, 70);

  const tools = [
    {
      id: "assistant-chat",
      title: "Chat with Assistant",
      description: "Chat with the your personal ArtisanAI assistant",
      IconComponent: logo1, // Placeholder Name
      route: "/chat",
    },
    {
      id: "story-generator",
      title: "Story Generator",
      description: "Craft compelling narratives for your products",
      IconComponent: logo2, // Placeholder Name
      route: "/tools/generate-story",
    },
    {
      id: "caption-creator",
      title: "Caption Creator",
      description: "Engage for audience with perfect Instagram captions",
      IconComponent: logo3, // Placeholder Name
      route: "/ImageCaptioner", // Assuming this is the correct route
    },
    
    
  ];
  

  const scrapbookItems = [
    // <-- ADJUSTED size and position
    {
      id: "item1",
      image: artists3,
      caption: "Sketches",
      position: "top-[13%] -left-24",
      rotation: "rotate-6",
    },
    {
      id: "item2",
      image: artists4,
      caption: "Inspiration...",
      position: "top-[60%] -right-32",
      rotation: "-rotate-3",
    },
  ];


  const handleLogout = () => {
    // Clear the user's session data from local storage
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");

    // Force a full page reload to the root URL
    // This ensures all application state is cleared
    window.location.href = "/";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  return (
    // Use this main div as a positioning container
    <div className="relative min-h-screen w-full overflow-x-hidden font-serif text-[#333] bg-[#F5F1EC]">

      {/* 2. RENDER THE SVG FILTER (IT'S HIDDEN) */}
      <WaterRipplesFilter />

      {/* 3. DEDICATED BACKGROUND DIV WITH THE FILTER APPLIED */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${mandlabg})`,
          filter: 'url(#waterRippleEffect)' // This applies the magic!
        }}
      ></div>

      {/* Your content is now safely on top of the rippling background */}
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
              Your AI Artisan Toolkit
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Sophistication at your fingertips.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tools.map((tool) => (
              <Link to={tool.route} key={tool.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/40 backdrop-blur-lg rounded-xl shadow-md p-8 text-center flex flex-col items-center cursor-pointer border border-gray-200/50 h-full"
                  style={{scale:0.89}}
                >
                  <div className="mb-6">
                    <img 
                      src={tool.IconComponent} 
                      alt={`${tool.title} icon`} 
                      className="w-16 h-20 rounded-full object-cover shadow-sm" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 mb-6 flex-grow">
                    {tool.description}
                  </p>
                  <button className="mt-auto bg-[#D4B996] text-white font-bold py-2 px-8 rounded-lg hover:bg-[#c5a881] transition-colors duration-300">
                    Use Tool
                  </button>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
