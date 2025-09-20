import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
    </svg>
);

export default function Navbar() {
    const navigate = useNavigate();

    // This function can be updated to handle actual logout logic
    const handleLoginClick = () => {
        // For now, it navigates to the root, which is your auth page
        navigate("/");
    };

    return (
        <header className="w-full  backdrop-blur-lg shadow-lg sticky top-0 z-30 border-b border-gray-200/80">
            <nav className="max-w-6xl  mx-auto py-3 px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="font-serif text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    Artisan AI
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/dashboard" className="text-gray-600 hover:text-black font-medium transition-colors relative group py-2">
                        <span>Home</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                    <Link to="/chat" className="text-gray-600 hover:text-black font-medium transition-colors relative group py-2">
                        <span>Chat</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                    <Link to="/tools/generate-story" className="text-gray-600 hover:text-black font-medium transition-colors relative group py-2">
                        <span>Story</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                    <Link to="/ImageCaptioner" className="text-gray-600 hover:text-black font-medium transition-colors relative group py-2">
                        <span>Captioner</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                    <Link to="/community" className="text-gray-600 hover:text-black font-medium transition-colors relative group py-2">
                        <span>Community</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                </div>

                {/* Call to Action Button */}
                <button onClick={handleLoginClick} className="flex items-center space-x-2 bg-amber-800 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-amber-900 transition-all duration-300 transform hover:scale-105">
                    <span>Login</span>
                    <LockIcon />
                </button>
            </nav>
        </header>
    );
}
