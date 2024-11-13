import React from 'react';
import { useNavigate } from 'react-router-dom';
import userPng from '../assets/images/userpng.png';

export const ProfilePane = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const empName = localStorage.getItem('user_name');

    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('nt_id');
        localStorage.removeItem('user_name');
        navigate("/");
    }

    const goToMyListedItems = () => {
        navigate('/mylisteditems');
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose} 
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 bg-slate-600 z-50 transition-transform duration-500 ${
                    isOpen ? 'translate-x-0 w-1/4 h-screen' : 'translate-x-0 w-1/8 h-1/2'
                }`}
                style={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.75)',
                    width: isOpen ? '25%' : '12.5%',
                    height: isOpen ? '100%' : '50%',
                    overflow: 'hidden',
                }}
            >
                <div className={`flex flex-col justify-center items-center mb-8 transition-all duration-300 ${!isOpen ? 'scale-90' : ''}`}>
                    <img
                        src={userPng}
                        alt="User"
                        className={`rounded-full mt-8 mb-4 ${isOpen ? 'w-24 h-24' : 'w-16 h-16'}`}
                    />
                    <h1 className={`text-white ${isOpen ? 'text-2xl' : 'text-sm'}`}>
                        {empName}
                    </h1>
                </div>

                <div className="flex flex-col justify-center items-center space-y-2 transition-all duration-300">
                    <div className={`flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 ${isOpen ? 'w-80 h-12 text-xl' : 'w-40 h-8 text-sm'}`}>
                        Update Profile
                    </div>
                    <div
                        onClick={goToMyListedItems}
                        className={`flex justify-center items-center bg-slate-300 text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-800 ${isOpen ? 'w-80 h-12 text-xl' : 'w-40 h-8 text-sm'}`}
                    >
                        My Listed Items
                    </div>
                    <button
                        onClick={handleLogout}
                        className={`flex justify-center items-center bg-red-600 text-slate-300 rounded-md hover:bg-red-700 hover:text-slate-200 ${isOpen ? 'w-80 h-12 text-xl' : 'w-40 h-8 text-sm'}`}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
