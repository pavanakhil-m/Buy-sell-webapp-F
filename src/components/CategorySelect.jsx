import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { CardData } from "../data/CardData";

// setHeading
export const CategorySelect = ({ categoryName, onProdClick }) => {
    //setting heading name as category name
    // setHeading(categoryName);

    const [resCardData, setResCardData] = useState(CardData); //initial array []
    const [sortOption, setSortOption] = useState("all"); 

    const getDataFromServer = async (sortType) => {
        try {
            const response = await axios.get(`our endpoint localhost`, {
                params: {
                    //need to check from backend and modify!
                }
            });
            setResCardData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getDataFromServer(sortOption);
    }, [categoryName, sortOption]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
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
                    <option value="recent">Recently Added</option>
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
