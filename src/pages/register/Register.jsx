import React, { useRef, useState } from "react";
import { request } from "../../utils/axios_helper";

const Register = () => {

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const ntIdRef = useRef(null);
    const phoneNoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const loginData = {
    //         username: firstNameRef.current.value + " " + lastNameRef.current.value,
    //         ntId: ntIdRef.current.value,
    //         phoneno:phoneNoRef.current.value,
    //         email: emailRef.current.value,
    //         password: passwordRef.current.value,
    //     };

    //     try {
    //         const response = await axios.post('http://localhost:8080/api/v1/register', loginData);
    //         console.log('Registered successfully:', response.data);

    //     } catch (err) {
    //         console.error('registration failed:', err.response || err.message);
    //         setError('Registration failed. Please try again.');
    //     }
    // }
    const onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();
        request("POST", "/register", {
            firstName: firstName,
            lastName: lastName,
            login: username,
            password: password
        })
        .then((response) => {
            setAuthHeader(response.data.token);
            setComponentToShow("messages");
        })
        .catch((error) => {
            setAuthHeader(null);
            setComponentToShow("welcome");
        });
    };

    return (
        <section className="h-screen flex flex-col justify-center items-center space-y-10 my-2 mx-5 md:mx-0">
       
            <h1 className="text-3xl font-bold mb-4 text-center">Menumate</h1>
            
            <div className="md:w-1/3 max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="First Name"
                    ref={firstNameRef}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Last Name"
                    ref={lastNameRef}
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
