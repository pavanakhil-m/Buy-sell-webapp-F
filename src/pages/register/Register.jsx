import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Routes"; // Ensure this path is correct

const Register = () => {
    const errCtx = useContext(ErrorContext);
    const navigate = useNavigate();

    // Refs for input fields
    const userNameRef = useRef(null);
    const ntIdRef = useRef(null);
    const phoneNoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);

    function onRegister(e) {
        e.preventDefault();
        setGeneralError(null); // Reset general error
        setFieldErrors({}); // Reset field-specific errors

        // Get values from refs
        const userName = userNameRef.current.value;
        const ntId = ntIdRef.current.value;
        const phoneNo = phoneNoRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Validation for empty fields
        const errors = {};
        if (!userName) errors.userName = "User Name is required";
        if (!ntId) errors.ntId = "NT ID is required";
        if (!phoneNo) errors.phoneNo = "Phone Number is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        // If there are errors, set them to display and stop form submission
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Construct the registration data
        const registerData = {
            userName,
            ntId,
            phoneNo,
            email,
            password
        };

        // Send the registration request
        axios.post("http://localhost:8080/register", registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            const { token, userName, ntId } = response.data;

            if (token) {
                // Store the token and user details in localStorage
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_name', userName);
                localStorage.setItem('nt_id', ntId);
                navigate('/demo'); // Redirect to demo page
            } else {
                setGeneralError("No token received");
                errCtx.setErrorInfo("No token received");
                navigate('/error');
            }
        })
        .catch((error) => {
            // Display specific error message from backend
            const errorMessage = error.response?.data?.message || "Error registering. Please try again.";
            setGeneralError(errorMessage);
        });
    }

    return (
        <section className="h-screen flex flex-col justify-center items-center space-y-10 my-2 mx-5 md:mx-0">
            <h1 className="text-3xl font-bold mb-4 text-center">CIEC Buy Sell</h1>

            {/* General error message display at top-right corner */}
            {generalError && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                    {generalError}
                </div>
            )}

            <div className="md:w-1/3 max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="User Name"
                    ref={userNameRef}
                />
                {fieldErrors.userName && <p className="text-red-600 text-sm">{fieldErrors.userName}</p>}

                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="NT ID"
                    ref={ntIdRef}
                />
                {fieldErrors.ntId && <p className="text-red-600 text-sm">{fieldErrors.ntId}</p>}

                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Email Address"
                    ref={emailRef}
                />
                {fieldErrors.email && <p className="text-red-600 text-sm">{fieldErrors.email}</p>}

                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Phone Number"
                    ref={phoneNoRef}
                />
                {fieldErrors.phoneNo && <p className="text-red-600 text-sm">{fieldErrors.phoneNo}</p>}

                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                {fieldErrors.password && <p className="text-red-600 text-sm">{fieldErrors.password}</p>}

                <div className="text-center">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                        onClick={onRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Register;
