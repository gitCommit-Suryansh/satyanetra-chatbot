import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; // Assuming you have this shared component
import mandlabg from "../assets/images/mandalaart.png";
import AddProductModal from './AddProductModal'; // <-- 1. IMPORT THE MODAL


// --- Helper Icons for the UI ---
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);


// --- Product Card Sub-component ---
const ProductCard = ({ product, index }) => {
    // Fallback image in case image_url is "nan" or invalid
    const imageUrl = product.image_url === "nan" 
        ? `https://placehold.co/600x400/F3EFEA/A0522D?text=${product.product_name}` 
        : product.image_url;

    return (
        <motion.div
            // Removed the static `scale-[80%]` class.
            // Framer Motion will now handle the scale animation.
            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20, scale: 0.8 }} // Start at 80% scale
            animate={{ opacity: 1, y: 0, scale: 1 }}   // Animate to 100% scale
            transition={{ delay: index * 0.05, duration: 0.3 }} // Added duration for smoother scale transition
        >
            <div className="relative">
                <img src={imageUrl} alt={product.product_name} className="w-full h-56 object-cover" />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/50 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-colors">
                    <HeartIcon />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-serif text-xl font-bold text-gray-800 truncate">{product.product_name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                <p className="text-sm text-gray-500">{product.price}</p> {/* Example static data */}
            </div>
        </motion.div>
    );
};


// --- Filters Sidebar Sub-component ---
const FiltersSidebar = () => {
    const categories = ["Pottery", "Paintings", "Woodwork", "Bengal", "Odisha"];
    
    return (
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 space-y-6 h-fit">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
                <div className="absolute top-0 left-0 h-full flex items-center pl-3">
                    <SearchIcon />
                </div>
            </div>
            <div>
                <h4 className="font-serif text-lg font-bold text-gray-700 mb-3 border-b pb-2">Categories</h4>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center space-x-3 text-gray-600">
                            <input type="checkbox" className="rounded border-gray-300 text-amber-700 focus:ring-amber-600" />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-serif text-lg font-bold text-gray-700 mb-3 border-b pb-2">Price Range</h4>
                {/* Price range filter can be added here */}
            </div>
        </div>
    );
};


// --- Main Community Component ---
export default function Community() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isModalOpen, setIsModalOpen] = useState(false); // <-- 2. ADD STATE FOR MODAL

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(apiUrl + "/products/products");
                setProducts(res.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Could not fetch products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    const handleProductAdded = (newProduct) => {
        // Add the new product to the top of the list for immediate feedback
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-800 p-4 md:p-6 lg:p-6"  style={{ backgroundImage: `url(${mandlabg})` }}
> 
            <Navbar />
            
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-800">Discover Unique Indian Crafts</h1>
                        <p className="text-gray-600 mt-2 text-lg">Love is the Your Indian Crafts</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="hidden lg:block">
                            <FiltersSidebar />
                        </aside>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {isLoading && <p className="text-center">Loading products...</p>}
                            {error && <p className="text-center text-red-500">{error}</p>}
                            
                            {!isLoading && !error && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {products.map((product, index) => (
                                        <ProductCard key={product.product_id} product={product} index={index} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 bg-amber-700 text-white p-4 rounded-full shadow-lg hover:bg-amber-800 transition-colors flex items-center gap-2"
            >
                <PlusIcon />
                <span className="hidden md:block font-bold">Add Product</span>
            </button>

            {/* 5. RENDER THE MODAL COMPONENT */}
            <AddProductModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={handleProductAdded}
            />
        </div>
    );
}