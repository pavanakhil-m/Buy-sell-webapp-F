// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Demo from './Demo';
import ListedItemsPage from './components/MyListedProducts';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/mylistedproducts" element={<ListedItemsPage />} /> {/* Updated to match ProfilePane */}
        </Routes>
    );
};

export default AppRoutes;
