import React, { useContext } from 'react';
import { ErrorContext } from '../../Routes';
 
const ErrorPage = () => {
 
    const errCtx = useContext(ErrorContext);
 
    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-10 my-2 mx-5 md:mx-0">
            <h1 className="text-3xl font-bold mb-4 text-center">CIEC BUY SELL</h1>
            <div className="md:w-1/3 max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-4">Error</h1>
                <p className="text-red-600">An error occurred. Please try again later.</p>
                <p className="text-red-600">{errCtx.errorInfo}</p>
            </div>
        </div>
    );
}
 
export default ErrorPage;