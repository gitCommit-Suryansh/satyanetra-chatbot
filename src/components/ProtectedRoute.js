import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user_id = localStorage.getItem("user_id");
  
  if (!user_id) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
