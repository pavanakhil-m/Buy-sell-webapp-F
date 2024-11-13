import { useState, useEffect } from 'react';
import axios from 'axios';
import { FullProduct } from './FullProduct';
import logo from '../assets/images/logo-cbs.png';

export const NavBar = ({ onFormSelect, onProfileSelect }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);//[{title : "no results found"}] //CardData
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const userName = localStorage.getItem("user_name");

  // Debounce function to limit API calls during typing
  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setNoResultsMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      const response = await axios.get(`http://localhost:8080/products/search`, {
        params: { keyword: query },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
        setNoResultsMessage(""); // Clear message when products are found
      } else {
        setSearchResults([]);
        setNoResultsMessage("No product exists with the provided keyword.");
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setSearchResults([]);
      setNoResultsMessage("No products exist");
    }
  };

  // Function to handle search form submission with Axios
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(searchQuery);
  };

  const handleSearchChange = debounce((query) => fetchSearchResults(query), 300);

  const handleSelect = async (productId) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get(`http://localhost:8080/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedProductDetails(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleCloseResults = () => {
    setSearchResults([]);
    setNoResultsMessage("");
  };

  useEffect(() => {
    handleSearchChange(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className={`p-2 bg-slate-400 fixed left-1/2 transform transition-all duration-300 ease-in-out z-50 ${isShrunk ? '-translate-x-1/2 w-1/2 h-16 top-2 rounded-md' : '-translate-x-1/2 w-[calc(100%-1rem)] h-16 top-0 rounded-sm'}`}>
        <div className="flex items-center h-full px-4">
          <div className="text-white font-bold w-1/6">
            <div className='w-20 h-22 object-fill'>
              <img src={logo} alt='CIEC Buy Sell' />
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center w-1/2">
            <div className="relative w-full">
              <input
                type="search"
                className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

       {/* Display search results or "No results" message */}
       {noResultsMessage ? (
          <div className="bg-white shadow-md rounded-lg p-4 mt-2 absolute w-full max-w-lg left-1/3 ml-20 transform -translate-x-1/2 z-40 text-gray-600">
            <p>{noResultsMessage}</p>
          </div>
        ) : (
          searchResults.length > 0 && (
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
                {searchResults.map((result, index) => (
                  <li key={index} className="p-2 border-b last:border-b-0 cursor-pointer" onClick={() => handleSelect(result.id)}>
                    {result.productName}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {/* Show full product details if selected */}
      {selectedProductDetails && (
        <FullProduct product={selectedProductDetails} onClose={() => setSelectedProductDetails(null)} />
      )}
    </>
  );
};

