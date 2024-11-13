import React, { useState } from 'react';
import axios from 'axios';

export const SellForm = ({ onCrossSelect, onNewProductAdded }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('auth_token');
        const ntId = localStorage.getItem('nt_id'); 
        
        if (!token || !ntId) {
            console.error("No token or ntId found. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append('ntId', ntId);  
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('purchaseDate', purchaseDate);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Product added:', response.data);
            onNewProductAdded(response.data); // Notify parent component of new product
            onCrossSelect();  
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
                <button onClick={onCrossSelect} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
                <form className="w-full" onSubmit={handleSubmit}>
                    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900">
                    </label>
                    <select
                        id="categories"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Ticket">Ticket</option>
                        <option value="Rentals">Rentals</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                    <div className="mb-5 mt-4">
                        <input type="text" id="productName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    </div>
                    <div className="mb-5 mt-4">
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="mb-5 mt-4">
                        <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="mb-4 mt-4">
                        <input type="date" id="purchaseDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Manufacture Date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
                    </div>
                    <label className="text-sm font-medium text-gray-900">Upload Image</label>
                    <input type="file" id="user_avatar" className="block w-full text-sm mt-2 mb-6 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                    <div className="form-buttons">
                        <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-blue-950 group-hover:from-purple-500 group-hover:to-blue-950 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
