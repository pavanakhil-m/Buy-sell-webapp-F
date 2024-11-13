import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Routes";

const Register = () => {

    const errCtx = useContext(ErrorContext);

    const navigate = useNavigate();

    const userNameRef = useRef(null);
    const ntIdRef = useRef(null);
    const phoneNoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);


    function onRegister(e) {
        e.preventDefault();
        setError(null);

        const userName = userNameRef.current.value;
        const ntId = ntIdRef.current.value;
        const phoneNo = phoneNoRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        //create a json object to send to the server
        const registerData = new FormData();
        registerData.append('userName', userName);
        registerData.append('ntId', ntId);
        registerData.append('phoneNo', phoneNo);
        registerData.append('email', email);
        registerData.append('password', password);


        if (!userName || !ntId || !phoneNo || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try{
       const response = axios.post("http://localhost:8080/register", registerData,{
            headers: {
                'Content-Type': 'application/json',
            }
       }).then((response) => {
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
                errCtx.setErrorInfo(error);
                navigate('/error');
            }
        })
    
    }catch(error){
        console.error("Error registering:", error.response?.data || error.message);
        const errMessage = error.response?.data?.message || "Error registering";
        setError(errMessage);
    }
}

        return (
            <section className="h-screen flex flex-col justify-center items-center space-y-10 my-2 mx-5 md:mx-0">

                <h1 className="text-3xl font-bold mb-4 text-center">CIEC Buy Sell</h1>
                
                    <div className="md:w-1/3 max-w-sm text-center">
                        <h1 className="text-2xl font-semibold mb-4">Register</h1>
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="User Name"
                            ref={userNameRef}
                        />

                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="NT ID"
                            ref={ntIdRef}
                        />

                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="Email Address"
                            ref={emailRef}
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="phone Number"
                            ref={phoneNoRef}
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />

                        <div className="text-center flex justify-around">
                            <button
                                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                                type="submit"
                                onClick={onRegister}
                            >
                                Register
                            </button>
                            <button
                                className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                                type="submit"
                                onClick={() => navigate('/')}
                            >
                                Back to Login
                            </button>
                        </div>
                        {error && <p className="text-red-600">{error}</p>}
                    </div>
                
            </section>


        );
    };



export default Register;
