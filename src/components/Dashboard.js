import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RotatingPot from "./RotatingPot"; // <-- IMPORT the new 3D component
import RotatingVase from "./RotatingVase"; // <-- IMPORT the new Vase component
import RotatingPots from "./RotatingPots";

// Image imports
import artists1 from "../assets/images/artists1.jpg";
import artists2 from "../assets/images/artists2.jpg";
import artists3 from "../assets/images/artists3.png";
import artists4 from "../assets/images/artists4.jpg";
import mandlabg from "../assets/images/mandalaart.png";
import Navbar from "./Navbar";

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
      id: "chatbot",
      title: "Chat with Assistant",
      description: "Get help and guidance from your AI artisan assistant",
      icon: "💬",
      route: "/chat",
      rotation: "-rotate-2",
    },
    {
      id: "story-generator",
      title: "Story Generator",
      description: "Generate creative stories with audio narration",
      icon: "📚",
      route: "/tools/generate-story",
      rotation: "rotate-1",
    },
    {
      id: "image-captioner",
      title: "Image Captioner",
      description: "Generate captions for your images",
      icon: "🖼️",
      route: "/ImageCaptioner",
      rotation: "rotate-1",
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

  const handleNavigate = (toolId, route) => {
    setExitingCard(toolId);
    setTimeout(() => {
      navigate(route);
    }, 600);
  };

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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      rotate: 0,
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    exit: {
      rotateY: 90,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };
  const scrapbookItemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, type: "spring", stiffness: 260, damping: 20 },
    },
    hover: {
      scale: 1.1,
      zIndex: 10,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div
      className="min-h-screen relative font-serif text-gray-800 bg-cover bg-fixed bg-center p-4 md:p-6 lg:p-6"
      style={{ backgroundImage: `url(${mandlabg})` }}
    >
      
      <Navbar/>

      {/* --- NEW: Render the 3D Pot on the left side --- */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 w-96 h-96 z-0 hidden lg:block">
        {/* <RotatingVase /> */}
        {/* <RotatingPots /> */}
      </div>

      <div className="absolute top-1/4 -right-16 w-96 h-96 z-0 hidden lg:block">
        {/* <RotatingVase /> */}
      </div>

      <div className="relative z-10 py-12 px-4 bg-transparent">
        {/* <-- ADJUSTED max-width for a more compact layout --> */}
        <motion.div
          className="max-w-3xl mx-auto relative bg-transparent"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* AI Daily Suggestion Note */}
          {/* <motion.div
          
            className="absolute bottom-4 -left-8 w-56 p-4 bg-slate-50 shadow-lg border-t-4 border-slate-300 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 1.2, duration: 0.8 },
            }}
            style={{ rotate: "-4deg" }}
          >
            <p className="text-sm font-semibold text-slate-500 mb-2">
              A Note from Your AI Muse:
            </p>
            <p className="text-slate-700 h-24 text-sm">
              {" "}
            
              {typedSuggestion}
              <span className="animate-ping">_</span>
            </p>
          </motion.div> */}

          {/* Decorative Images */}
          <motion.img
            src={artists1}
            alt="An artist's hands"
            className="absolute top-0 right-0 w-32 h-auto border-4 border-white shadow-xl hidden lg:block"
            style={{ top: "-2rem", right: "-4rem" }}
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 8,
              transition: { delay: 0.8, duration: 0.7 },
            }}
          />
          {/* <motion.img
            src={artists2}
            alt="Hand-drawn arrow"
            className="absolute -top-10 left-1/4 w-20 h-auto opacity-60 pointer-events-none hidden md:block"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 0.8,
              transition: { delay: 1, duration: 0.5 },
            }}
          /> */}

          {scrapbookItems.map((item) => (
            <motion.div
              key={item.id}
              variants={scrapbookItemVariants}
              whileHover="hover"
              className={`absolute w-40 p-2 bg-white shadow-lg border-2 border-gray-100 hidden lg:block ${item.position} ${item.rotation}`}
            >
              <div className="w-full h-28 bg-gray-200 mb-2">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-handwriting text-base text-gray-700">
                {item.caption}
              </p>
            </motion.div>
          ))}

          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="font-handwriting text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              My Creative Journal
            </h1>
            <p className="text-gray-600">A space for ideas and inspiration.</p>
          </motion.div>

          {/* Tools Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20"
            style={{ perspective: "1200px" }}
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={cardVariants}
                animate={exitingCard === tool.id ? "exit" : "visible"}
                whileHover="hover"
                className={`cursor-pointer transform ${tool.rotation}`}
                onClick={() => handleNavigate(tool.id, tool.route)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-300/50 backdrop-blur-sm border-l border-r border-yellow-400/60 transform rotate-1"></div>
                <div className="bg-white p-6 shadow-lg bg-white/60 backdrop-blur-sm   rounded-sm border border-gray-200">
                  <div className="text-3xl mb-4">{tool.icon}</div>
                  <h3 className="font-handwriting text-3xl font-bold text-gray-800 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {tool.description}
                  </p>
                  <span className="font-bold text-gray-700 group-hover:text-black">
                    Start Creating →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* User Actions */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="inline-block relative">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-sm font-bold shadow-md hover:bg-red-600 transition-colors duration-300 transform hover:-translate-y-0.5"
              >
                Pack Up
              </button>
              <p className="font-handwriting text-sm text-gray-500 mt-3">
                (Logged in as Artisan)
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
