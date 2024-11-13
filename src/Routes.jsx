import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Demo from './Demo';
import ErrorPage  from './pages/error/ErrorPage';
import  Register  from './pages/register/Register';

export const ErrorContext = createContext();


import ListedItemsPage from './components/MyListedProducts';


const AppRoutes = () => {

    const [errorInfo, setErrorInfo] = useState('');
    
    return (
        <ErrorContext.Provider value={{errorInfo, setErrorInfo}}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/error" element={<ErrorPage/>} />
            <Route path="/mylistedproducts" element={<ListedItemsPage />} /> {/* Updated to match ProfilePane */}
        </Routes>
        </ErrorContext.Provider>
    );
};

export default AppRoutes;
