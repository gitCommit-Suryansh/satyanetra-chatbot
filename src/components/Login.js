import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://genaibackend-r809.onrender.com/login",
        null,
        {
          params: {
            email: form.email,
            password: form.password,
          },  
        }
      );
      setMessage(res.data.message);
      setError("");
      
      // If login is successful, store user_id and call onLoginSuccess
      if (res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("email", form.email);
        onLoginSuccess();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || "Login failed";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
