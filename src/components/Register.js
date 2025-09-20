import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    craft: "",
    experience: "",
    location: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(apiUrl + "/register", null, {
            params: form
        });
        setMessage(res.data.message + " You can now login.");
        setError("");
        if (onRegisterSuccess) {
            onRegisterSuccess();
        }
    } catch (err) {
        const errorMessage = err.response?.data?.detail || err.message || "Registration failed";
        setError(errorMessage);
        setMessage("");
    }
  };

  return (
    <div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">Begin Your Journey</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="craft"
                    type="text"
                    placeholder="Your Craft (e.g., Pottery)"
                    value={form.craft}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                    name="experience"
                    type="text"
                    placeholder="Years of Experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>
             <input
                name="location"
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-amber-700 hover:to-amber-600 transition-all transform hover:scale-105"
            >
                Sign Up
            </button>
        </form>

        {message && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
    </div>
  );
}
