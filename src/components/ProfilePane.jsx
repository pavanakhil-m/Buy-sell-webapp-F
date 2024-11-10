import React from 'react';
import userPng from '../assets/images/userpng.png';

export const ProfilePane = ({ isOpen, onClose }) => {

    //getting the username from local storage
    const userName = localStorage.getItem('userName');
    // const userName = 'Akhil';

    function handleLogout() {
        //removing the username and token from local storage for login
        localStorage.removeItem('userName');
        localStorage.removeItem('auth_token');
        window.location.reload();

    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose} 
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-screen w-1/4 bg-slate-600 z-50 transition-transform duration-500 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                
                <div className='flex flex-col justify-center items-center mb-8'>
                    <img src={userPng} alt="User" className="w-24 h-24 rounded-full mt-8 mb-4" />
                    <h1 className="text-white text-2xl">{userName}</h1>
                </div>

                <div className='flex flex-col justify-center items-center'>

                    <div className='flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 w-80 h-12 text-xl mb-4'>
                        Update Profile</div>
                    <div className='flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 w-80 h-12 text-xl mb-4'>
                        My Listed Items</div>
                    <button onClick={handleLogout} className='flex justify-center items-center bg-red-600 text-slate-300 rounded-md hover:bg-red-700 hover:text-slate-200 w-80 h-12 text-xl'>
                        Logout</button>
                </div>
                
            </div>
        </>
    );
};
