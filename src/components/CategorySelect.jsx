import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { CardData } from "../data/CardData";

// setHeading
export const CategorySelect = ({ categoryName, onProdClick }) => {
    //setting heading name as category name
    // setHeading(categoryName);

    const token = localStorage.getItem("auth_token");

    const [resCardData, setResCardData] = useState([]); //initial array []
    const [sortOption, setSortOption] = useState("all"); 

    useEffect(() => {
        getDataFromServer(sortOption);
    }, [categoryName, sortOption]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const getDataFromServer = async (sortType) => {
        let URI = "";
        let reqParams = {};
        let fullURL="";

        if(sortType === "all") {
             URI = `http://localhost:8080/products/category/${categoryName}`;
             fullURL = URI;
        }else if(sortType === "lowToHigh") {
             URI = 'http://localhost:8080/products/category/sort';
             reqParams = `?category=${encodeURIComponent(categoryName)}&order=asc`;
             fullURL = `${URI}${reqParams}`;
        }else if(sortType === "highToLow") {
             URI = 'http://localhost:8080/products/category/sort';
             reqParams = `?category=${encodeURIComponent(categoryName)}&order=desc`;
             fullURL = `${URI}${reqParams}`;
        }
            
        try {
            //In axios 2nd parameter input is for configs like params and headers.
            const response = await axios.get(fullURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            //write logic to get data and save the json obj data which matchs to category name
            setResCardData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
        }
        
    };

    return (
        <>
           
            <div className="flex justify-center ">
                <select
                    onChange={handleSortChange}
                    value={sortOption}
                    className="p-2 rounded-md bg-slate-500 text-white"
                >
                    <option value="all">All Products</option>
                    <option value="recent">Recently Listed</option>
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
