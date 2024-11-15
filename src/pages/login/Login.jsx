import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Reset error

        // Make the POST request to the backend
        axios.post("http://localhost:8080/login", {
            email, // use state for email
            password, // use state for password
        })
        .then((response) => {
        console.log(response)

            const { token, userName, ntId} = response.data; // Destructure the token, userName from the response
            if (token) {
                // Store the token, userName in localStorage
                console.log("Token received:", token);
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_name', userName);  // Storing userName
                localStorage.setItem('nt_id', ntId);
                console.log("Login successful:", response.data);
                navigate('/demo');  // Redirect to demo page after login
            } else {
                setError('No token received');
            }
        })
        .catch((error) => {
            setError('Invalid email or password');
            console.error("Login failed:", error.response || error.message);
        })
        .finally(() => {
            setLoading(false); // Stop loading
        });
    };

    const handleForgotPassword = () => {
        // Handle forgotten password functionality (if necessary)
        setError('This feature is coming soon!');
        setTimeout(() => setError(''), 1000);
    };

    return (
        <div className="h-screen w-screen bg-slate-400">
        <section className=" flex flex-col justify-center items-center absolute top-1/4 left-1/3 p-8 bg-slate-700 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center text-white">Comcast Buy & Sell</h1>
            <div className="w-full max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-4 text-white">Login</h1>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="email" // Change type to 'email' for better validation
                    placeholder="Email Address"
                    value={email} // Bind to state
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                    required
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    value={password} // Bind to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                    required
                />
                {error && <p className="text-red-400">{error}</p>} {/* Display error */}
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <button
                        className="text-slate-300 hover:text-slate-200 hover:underline hover:underline-offset-4 text-left"
                        onClick={handleForgotPassword} // Handle forgot password
                    >
                        Forgot Password?
                    </button>
                </div>
                <div className="text-center">
                    <button
                        className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                        onClick={onLogin}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Logging in...' : 'Lets Go!'} {/* Show loading text */}
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-300">
                    Don&apos;t have an account?{" "}
                    <a className="text-red-300 hover:underline hover:underline-offset-4 cursor-pointer" onClick={()=>{navigate('/register')} }>
                        Register
                    </a>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Login;
