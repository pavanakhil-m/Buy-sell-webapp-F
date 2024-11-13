import React, { useState } from 'react';

import { request, setAuthHeader } from '../helpers/axios_helper';

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent';
import PrimaryPage from '../Primary/Primary';
import { useNavigate } from 'react-router-dom';

const AppContent = () => {

    // const navigate = useNavigate();
    // const logout = () => {
    //     setAuthHeader(null);
    //     navigate("/");
        
    // }

    const logout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("nt_id");
        localStorage.removeItem("user_name");
        navigate("/");  // Redirect to the login page
    };


    return (
        <>
            <h1>Welcome to home page bro!</h1>
            <button onSubmit={logout}>logout</button>
        </>
    );
};

export default AppContent;
