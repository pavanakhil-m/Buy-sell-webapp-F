// ProfilePane.jsx
import React from 'react';
import userPng from '../assets/images/userpng.png';
import { useNavigate } from 'react-router-dom';
export const ProfilePane = ({ isOpen, onClose }) => {

    const navigate = useNavigate();
    // Getting the username from local storage
    const empName = localStorage.getItem('user_name');

    function handleLogout() {
        // Removing the username and token from local storage for login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('nt_id');
        localStorage.removeItem('user_name');
        // window.location.reload();
        navigate("/");
    }

    // Function to navigate to the "My Listed Items" page
    function goToMyListedItems() {
        navigate('/mylistedproducts'); // Redirects to My Listed Products page
        onClose(); // Close the Profile Pane after navigation
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
                style={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.75)',
                    width: isOpen ? '25%' : '12.5%',
                    height: isOpen ? '100%' : '50%',
                    overflow: 'hidden',
                }}
            >
                <div className='flex flex-col justify-center items-center mb-8'>
                    <img src={userPng} alt="User" className="w-24 h-24 rounded-full mt-8 mb-4" />
                    <h1 className="text-white text-2xl">{empName}</h1>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className='flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 w-80 h-12 text-xl mb-4'>
                        Update Profile
                    </div>

                    {/* My Listed Items - now clickable with navigation */}
                    <div 
                        onClick={goToMyListedItems} // Call goToMyListedItems on click
                        className='flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 w-80 h-12 text-xl mb-4 cursor-pointer'
                    >
                        My Listed Items
                    </div>

                    <button onClick={handleLogout} className='flex justify-center items-center bg-red-600 text-slate-300 rounded-md hover:bg-red-700 hover:text-slate-200 w-80 h-12 text-xl'>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

