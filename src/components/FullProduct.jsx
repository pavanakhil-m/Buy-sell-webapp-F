import logoPng from '../assets/images/bgdrop.png';

export const FullProduct = ({ product, onClose }) => {
    if (!product) return null;

    function handleInterested() {
        console.log("I'm Intrested");
    }

    function handleFavourite() {
        console.log("Add to favourites");
    }
    
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} 
        >
            <div
                className="relative w-2/3 max-h-screen overflow-y-auto bg-white p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()} 
            >
                <button className="absolute top-2 right-2 p-2 text-gray-600" onClick={onClose}>
                    ✕
                </button>
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-800 mb-2">Posted by: {product.ntId}</p>
                <p className="text-gray-500 mb-4">{product.datePosted}</p>
                <img src={product.image || logoPng} alt="Product" className="w-full h-80 object-cover rounded-md" />
                <p className="mt-4 text-gray-700">{product.description}</p>

                <div className='flex justify-around items-center mt-4'>
                    <button className='bg-green-600 text-slate-200 hover:bg-green-500 hover:text-black w-3/5 py-4 rounded-md '
                            onClick={handleInterested}>
                                I'm Intrested</button>
                    <button className='bg-red-600 text-slate-200 hover:bg-red-500 hover:text-black w-1/5 py-4 rounded-md '
                            onClick={handleFavourite}>
                                Add to favourites</button>
                </div>
            </div>
        </div>
    );
};
