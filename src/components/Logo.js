import React from 'react';
// 1. Import your logo image from your assets folder
import logoImage from '../assets/images/logo.png';

// This component now renders your imported logo image.
export default function Logo() {
    return (
        // 2. Use a standard <img> tag to display the logo
        <img 
            src={logoImage} 
            alt="Kala Sarthi Logo" 
            // 3. Added classes to control the size of the logo. 
            // You can adjust 'h-10' (height) to make it bigger or smaller.
            className="h-16 w-auto" 
        />
    );
}

