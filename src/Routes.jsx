// src/Routes.js
//import React from 'react';
import React, { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Demo from './Demo';
import ErrorPage  from './pages/error/ErrorPage';
import  Register  from './pages/register/Register';

export const ErrorContext = createContext();

const AppRoutes = () => {
    const [errorInfo, setErrorInfo] = useState('');

    return (
        <ErrorContext.Provider value={{errorInfo, setErrorInfo}}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/error" element={<ErrorPage/>} />
        </Routes>
        </ErrorContext.Provider>
    );
};


export default AppRoutes;

 

 