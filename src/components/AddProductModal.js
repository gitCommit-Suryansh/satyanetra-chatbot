import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const artisanId = localStorage.getItem('user_id');
        if (!artisanId) {
            setError('Could not find user ID. Please log in again.');
            setIsSubmitting(false);
            return;
        }

        // We use FormData for file uploads
        const formData = new FormData();
        formData.append('artisan_id', artisanId);
        formData.append('product_name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const res = await axios.post(`${apiUrl}/products/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onProductAdded(res.data); // Pass the new product back to the parent
            onClose(); // Close the modal
            // Reset form
            setProductName('');
            setDescription('');
            setPrice('');
            setImage(null);
        } catch (err) {
            console.error("Error uploading product:", err);
            setError(err.response?.data?.detail || 'Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Creation</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600" />
                            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 h-24" />
                            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600" />
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
                                <input type="file" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200" />
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-amber-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-amber-800 transition-colors disabled:bg-gray-400">
                                {isSubmitting ? 'Uploading...' : 'Add Product'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}