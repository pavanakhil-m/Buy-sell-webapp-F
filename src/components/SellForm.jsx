export const SellForm = ({ onCrossSelect }) => {


    // const NtId = localStorage.getItem("NtId");
    function handleSubmit() {

        

        onCrossSelect();

        
    }
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
                <button
                    onClick={onCrossSelect}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <form className="w-full ">
                    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900">
                        Select your category
                    </label>
                    <select
                        id="categories"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option>Vehicles</option>
                        <option>Electronics</option>
                        <option>Tickets</option>
                        <option>Rentals</option>
                        <option>Fashion</option>
                    </select>

                    <div class="mb-5 mt-4">

                        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Ntid" />
                    </div>

                    <div className="mb-5 mt-4">
                        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Product name" />
                    </div>

                    <div className="mb-5 mt-4">
                        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="price" />
                    </div>

                    <div className="mb-4 mt-4">
                        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="manufacture date" />

                    </div>

                    <label class=" text-sm font-medium text-gray-900"
                       >Upload pic</label>

                    <input class="block w-full text-sm mt-2 mb-6 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-blue-950 group-hover:from-purple-500 group-hover:to-blue-950 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 ">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0"
                            onSubmit={handleSubmit}>
                            Submit
                        </span>
                    </button>

                </form>
            </div>
        </div>
    );
};
