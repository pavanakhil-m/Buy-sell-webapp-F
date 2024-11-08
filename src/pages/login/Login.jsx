import React, { useRef, useState } from "react";
import { request, setAuthHeader } from '../../utils/axios_helper';


const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [soon, setSoon] = useState(false);


    const onLogin = (e) => {
        e.preventDefault();
        request("POST", "/login", {
            login: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then((response) => {
            setAuthHeader(response.data.token);
            console.log("Login successful:", response.data);
            
        })
        .catch((error) => {
            setAuthHeader(null);
            console.error("Login failed:", error.response || error.message);
        });
    };


    const handleForgotPassword = () => {

        setSoon(true)
        const soonTimer = setTimeout(() => {
            setSoon(false);
        }, 1000);

        return () => clearTimeout(soonTimer);
    }

    return (
        <section className="h-screen flex flex-col justify-center items-center space-y-10 my-2 mx-5 md:mx-0">
            
            <h1 className="text-3xl font-bold mb-4 text-center">Menumate</h1>

            
            <div className="md:w-1/3 max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Email Address"
                    ref={emailRef}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <button
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 text-left"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                    { soon && <p className="text-red-600">Coming soon!</p>}

                </div>
                <div className="text-center">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                        onClick={onLogin}
                    >
                        Get my Menu!
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <a className="text-red-300 hover:underline hover:underline-offset-4" href="http://localhost:5173/register">
                        Register
                    </a>
                </div>
            </div>
        </section>


    );
};

export default Login;
