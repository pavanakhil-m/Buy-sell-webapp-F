import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

export const CategorySelect = ({ categoryName, onProdClick }) => {
    const token = localStorage.getItem("auth_token");

    const [resCardData, setResCardData] = useState([]); // Initial array []
    const [sortOption, setSortOption] = useState("all");

    useEffect(() => {
        getDataFromServer(sortOption);
    }, [categoryName, sortOption]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const getDataFromServer = async (sortType) => {
        let URI = "";
        let reqParams = "";
        let fullURL = "";

        if (sortType === "all") {
            // Fetch products by category only
            URI = `http://localhost:8080/products/category/${categoryName}`;
            fullURL = URI;
        } else if (sortType === "lowToHigh") {
            // Fetch products in the category, sorted low to high
            URI = 'http://localhost:8080/products/category/sort';
            reqParams = `?category=${encodeURIComponent(categoryName)}&order=asc`;
            fullURL = `${URI}${reqParams}`;
        } else if (sortType === "highToLow") {
            // Fetch products in the category, sorted high to low
            URI = 'http://localhost:8080/products/category/sort';
            reqParams = `?category=${encodeURIComponent(categoryName)}&order=desc`;
            fullURL = `${URI}${reqParams}`;
        }

        try {
            const response = await axios.get(fullURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setResCardData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <select
                    onChange={handleSortChange}
                    value={sortOption}
                    className="p-2 rounded-md bg-slate-500 text-white"
                >
                    <option value="all">All Products</option>
                    <option value="recent">Newest Arrivals</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-4">
                {resCardData.length > 0 ? (
                    resCardData.map((card, index) => (
                        <Card key={index} props={card} onProdClick={() => onProdClick(card)} />
                    ))
                ) : (
                    <div className="text-center text-2xl bg-black text-slate-300">
                        No items found!
                    </div>
                )}
            </div>
        </>
    );
};
