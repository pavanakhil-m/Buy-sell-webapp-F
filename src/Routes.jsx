// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Demo from './Demo';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/demo" element={<Demo />} />
        </Routes>
    );
};

export default AppRoutes;
