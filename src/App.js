import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import StoryGenerator from "./components/StoryGenerator";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={localStorage.getItem("user_id") ? <Navigate to="/dashboard" replace /> : <Authentication onLoginSuccess={() => window.location.href = "/dashboard"} />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tools/generate-story" 
          element={
            <ProtectedRoute>
              <StoryGenerator />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
