import React, { useState } from "react";
import axios from "axios";

// --- SVG Icons (no changes needed here) ---



export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(apiUrl + "/login", null, {
            params: { email: form.email, password: form.password }
        });
        setMessage(res.data.message);
        setError("");
        if (res.data.user_id) {
            localStorage.setItem("user_id", res.data.user_id);
            localStorage.setItem("email", form.email);
            onLoginSuccess();
        }
    } catch (err) {
        const errorMessage = err.response?.data?.detail || err.message || "Login failed";
        setError(errorMessage);
        setMessage("");
    }
  };

  return (
    // The parent div is removed, as styling is handled by the Authentication component
    <>
      <h1 className="font-serif text-xl font-bold text-white mb-6 text-center">Journey Back In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="email"
                type="email"
                placeholder="Email or Username"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <div className="text-right">
                <a href="#" className="text-sm text-gray-400 hover:text-white hover:underline">Forgot Password?</a>
            </div>
            <button 
                type="submit"
                className="w-full mt-2 py-3 font-bold text-black bg-gradient-to-r from-yellow-400 to-amber-600 rounded-md hover:from-yellow-500 hover:to-amber-700 transition-all duration-300"
            >
                Login
            </button>
      </form>

      {message && <div className="mt-4 p-2 text-center bg-green-900/50 text-green-300 rounded-md">{message}</div>}
      {error && <div className="mt-4 p-2 text-center bg-red-900/50 text-red-300 rounded-md">{error}</div>}

      <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600"/>
          {/* <span className="mx-4 text-gray-400 text-sm">Or continue with</span> */}
          <hr className="flex-grow border-gray-600"/>
      </div>

      
    </>
  );
}