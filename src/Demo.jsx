import { useState } from "react";
import { Card } from "./components/Card";
import { Category } from "./components/Category";
import { CategorySelect } from "./components/CategorySelect";
import { NavBar } from "./components/NavBar";
import { SlideShow } from "./components/SlideShow";
import { CardData } from "./data/CardData";
import { SellForm } from "./components/SellForm";

function Demo() {
    const [category, setCategory] = useState({
        Vehicles: false,
        Electronics: false,
        Tickets: false,
        Clothing: false,
        Furniture: false,
        Other: false,
        Rentals: false,
    });

    const [formSlected, setFormSelected] = useState(false);

    function onFormSelect() {
        setFormSelected(true);
    }

    function onCrossSelect() {
        setFormSelected(false);
    }

    const [selectedCategory, setSelectedCategory] = useState(null);

    function handleCategorySelect(selectedCategory) {
        setCategory((prev) => {
            const isCurrentlySelected = prev[selectedCategory];

            const newCategoryState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === selectedCategory ? !isCurrentlySelected : false;
                return acc;
            }, {});

            setSelectedCategory(isCurrentlySelected ? null : selectedCategory);

            return newCategoryState;
        });
    }

    const isCategorySelected = selectedCategory !== null;

    return (
        <div className="relative">
            <NavBar onFormSelect={onFormSelect} />
            {formSlected && <SellForm onCrossSelect={onCrossSelect} />}
            <SlideShow />

            <div className="pt-8 pb-8 flex justify-center"> 
                <Category onHandleSelect={handleCategorySelect} categoryName={category}/>
            </div>

            {!isCategorySelected ? (
                <div className="flex flex-wrap justify-center gap-8">
                    {CardData.map((card, index) => (
                        <Card key={index} props={card} />
                    ))}
                </div>
            ) : (
                <CategorySelect categoryName={selectedCategory} />
            )}

            <div>
                {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className={`p-2 h-24 ${i % 2 === 0 ? 'bg-red-300' : 'bg-blue-300'}`}>
                        Content Line {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Demo;
