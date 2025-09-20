import React, { useState } from "react";
import axios from "axios";

// --- SVG Icons for Social Login ---
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.217-11.283-7.666l-6.57 4.82A20.007 20.007 0 0 0 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303a12.04 12.04 0 0 1-4.087 7.583l6.19 5.238C44.473 36.231 48 30.453 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.693c.734 0 1.325-.59 1.325-1.325V1.325C24 .59 23.409 0 22.675 0z"/>
    </svg>
);

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
    <div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">Journey Back In</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
            <input
                name="email"
                type="email"
                placeholder="Email or Username"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="text-right">
                <a href="#" className="text-sm text-gray-600 hover:text-black hover:underline">Forgot Password?</a>
            </div>
            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-amber-700 hover:to-amber-600 transition-all transform hover:scale-105"
            >
                Login
            </button>
        </form>

        {message && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center gap-4">
            <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <GoogleIcon />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FacebookIcon />
            </button>
        </div>
    </div>
  );
}
