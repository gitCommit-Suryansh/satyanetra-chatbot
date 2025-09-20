import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import StoryGenerator from "./components/StoryGenerator";
import ImageCaptioner from "./components/ImageCaptioner";
import "./App.css";
import AddProduct from "./components/AddProduct";
import ProductChatbot from "./components/ProductChatbot";
import Community from "./components/Community";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={localStorage.getItem("user_id") ? <Navigate to="/dashboard" replace /> : <Authentication onLoginSuccess={() => window.location.href = "/dashboard"} />} 
        />
        
        {/* Simplified Routes (formerly Protected) */}
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />
        
        <Route 
          path="/chat" 
          element={<Chat />} 
        />
        <Route 
          path="/AddProduct" 
          element={<AddProduct />} 
        />
        <Route 
          path="/ProductChatbot" 
          element={<ProductChatbot />} 
        />
        
        <Route 
          path="/tools/generate-story" 
          element={<StoryGenerator />} 
        />
        <Route 
          path="/ImageCaptioner" 
          element={<ImageCaptioner />} 
        />
        <Route 
          path="/Community" 
          element={<Community />} 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />

        

      </Routes>
    </Router>
  );
}

export default App;

