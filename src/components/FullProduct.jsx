import logoPng from '../assets/images/bgdrop.png';
import axios from 'axios';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContext } from '../Demo';

export const FullProduct = ({ product, onClose }) => {
    if (!product) return null;

    const token = localStorage.getItem('auth_token');

    const toastCtx = useContext(ToastContext);


    const { id, ntId, productName, description, purchaseDate, dateListed, category, image, price } = product;
    console.log(product)
    // const numId = (id);

    let truncatedDate = purchaseDate.substring(0, 11);
    let name = productName.toUpperCase();

    // const successToast = () => {
    //     console.log("Toast triggered"); 
    //     toast.success("Notified Seller successfully!");
    // };

    // function closingTime(){
    //     setTimeout(() => {
    //         onClose();
    //     }, 3000);
    // }

    async function handleInterested() {
        console.log("I'm Interested");
        const fromDetails = new FormData();
        fromDetails.append('ntId', ntId);
        fromDetails.append('prodId', id);
        // successToast();
        // onClose();
        // closingTime();
       // http://localhost:8080/notifications/send-interest

        try {
            
            toastCtx.triggerToast("Notified Seller successfully!");
            // successToast();
            // closingTime();
            onClose();
            const response = await axios.post('http://localhost:8080/notifications/send-interest', fromDetails, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            console.log(response.data);

        } catch (error) {
            console.error('Error sending interest:', error);
        }
    }

    function handleFavourite() {
        console.log("Add to favourites");
    }

    return (
        <>
            

            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={onClose}
            >
                <div
                    className="relative w-2/3 max-h-screen overflow-y-auto bg-slate-200 p-6 rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="absolute top-2 right-2 p-2 text-gray-600" onClick={onClose}>
                        ✕
                    </button>
                    <div className='flex justify-center mb-6 px-16 py-4 bg-slate-300 shadow-md'>
                        <h1 className='text-lg font-semibold px-12'>Category: {category}</h1>
                        <h1 className='text-lg font-medium'>Listed on: {truncatedDate}</h1>
                    </div>

                    <div className='flex justify-around'>
                        <div className='bg-slate-300'>
                            <img src={image} alt={productName} className='w-full h-80 object-fit' />
                        </div>
                        <div className='flex-col flex items-start justify-around bg-slate-300 rounded-md p-8'>
                            <h1 className='text-2xl font-semibold'>Product: {name}</h1>
                            <p className='text-lg font-medium'>Price: ₹ {price}</p>
                            <p className='text-lg font-medium'>Purchase Date: {purchaseDate}</p>
                            <p className='text-lg font-medium'>Added by: {ntId}</p>
                        </div>
                    </div>
                    <div className='py-4'>
                        <h1 className='text-lg font-medium pb-4'>Description :</h1>
                        <p>{description}</p>
                    </div>

                    <div className='flex justify-around items-center mt-4'>
                        <button className='bg-green-600 text-slate-200 hover:bg-green-500 hover:text-black w-3/5 py-4 rounded-md'
                            onClick={handleInterested}>
                            I'm Interested</button>
                        
                        <button className='bg-red-600 text-slate-200 hover:bg-red-500 hover:text-black w-1/5 py-4 rounded-md'
                            onClick={handleFavourite}>
                            Add to favourites</button>
                    </div>
                </div>
            </div>
        </>
    );
};
