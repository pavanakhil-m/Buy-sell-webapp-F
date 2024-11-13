import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardData } from '../data/CardData';
import { FullProduct } from './FullProduct';

export const NavBar = ({ onFormSelect, onProfileSelect }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);//[{title : "no results found"}] //CardData
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const userName = localStorage.getItem("user_name");

  // Function to handle search form submission with Axios
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(`endpoint`, {
        // params: 
      });
      
      setSearchResults(response.data);

    } catch (err) {
      console.error("Error fetching search:", err);
    }
  };

  // Function to close the search results
  const handleCloseResults = () => {
    setSearchResults([]);
  };

  function handleSelect(id) {

    // try {
    //   const res = axios.get(`endpoint`, {
    //     // params: 
    //   });
    //   setSelectedProductDetails(res.data);
    // } catch (err) {
    //   console.error("Error fetching search:", err);
    // }
    setSelectedProductDetails(CardData.find((product) => product.productId === id));
  };

  return (
    <>
      <div className={`p-2 bg-slate-400 fixed left-1/2 transform transition-all duration-300 ease-in-out z-50 ${isShrunk ? '-translate-x-1/2 w-1/2 h-16 top-2 rounded-md' : '-translate-x-1/2 w-[calc(100%-1rem)] h-16 top-0 rounded-sm'}`}>
        <div className="flex items-center h-full px-4">
          <div className="text-white font-bold w-1/6">LOGO</div>

          <form onSubmit={handleSearchSubmit} className="flex items-center w-1/2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-1">
              Search
            </button>
          </form>

          <div className="flex items-center w-2/6 justify-between pl-16">
            <button>❤️</button>
            <button className="bg-slate-300 text-slate-700 rounded-lg px-4 py-2" onClick={onFormSelect}>
              SELL
            </button>
            {!isShrunk && (
              <button onClick={onProfileSelect} className="text-white">
                {userName}
              </button>
            )}
          </div>
        </div>

        {/* Display search results in a scrollable component */}
        {CardData.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-2 absolute w-full max-w-lg left-1/3 ml-20 transform -translate-x-1/2 z-40 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">Search Results</h3>
              <button
                onClick={handleCloseResults}
                className="text-gray-500 hover:text-gray-700 font-medium text-sm px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
            <ul>
              {CardData.map((result, index) => (
                <li key={index} className="p-2 border-b last:border-b-0"
                  onClick={() => handleSelect(result.productId)}>
                  {result.title} - {result.tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      { selectedProductDetails && (
        <FullProduct product={selectedProductDetails} onClose={() => setSelectedProductDetails(null)} />
      )

      }
    </>
  );
};
